const KEY = "active-visitors";
const ACTIVE_WINDOW_MS = 90_000;

export async function onRequestPost(context) {
  let body = {};
  try {
    body = await context.request.json();
  } catch (_) {}

  const sessionId = String(body.sessionId || "").slice(0, 120);
  if (!sessionId) {
    return Response.json({ online: 1, configured: false }, { status: 400 });
  }

  // Without KV binding we return only the current visitor, never a fake number.
  if (!context.env.VISITORS) {
    return Response.json(
      { online: 1, configured: false, message: "Bind a Cloudflare KV namespace as VISITORS." },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const now = Date.now();
  let sessions = {};
  try {
    sessions = (await context.env.VISITORS.get(KEY, "json")) || {};
  } catch (_) {}

  // Remove visitors without a heartbeat in the last 90 seconds.
  for (const [id, lastSeen] of Object.entries(sessions)) {
    if (!Number.isFinite(Number(lastSeen)) || now - Number(lastSeen) > ACTIVE_WINDOW_MS) {
      delete sessions[id];
    }
  }

  sessions[sessionId] = now;

  // Keep the payload bounded.
  const entries = Object.entries(sessions)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 5000);
  sessions = Object.fromEntries(entries);

  await context.env.VISITORS.put(KEY, JSON.stringify(sessions), {
    expirationTtl: 300
  });

  return Response.json(
    { online: Object.keys(sessions).length, configured: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function onRequestGet(context) {
  if (!context.env.VISITORS) {
    return Response.json({ online: 1, configured: false });
  }

  const now = Date.now();
  const sessions = (await context.env.VISITORS.get(KEY, "json")) || {};
  const online = Object.values(sessions).filter(
    lastSeen => now - Number(lastSeen) <= ACTIVE_WINDOW_MS
  ).length;

  return Response.json(
    { online: Math.max(1, online), configured: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}
