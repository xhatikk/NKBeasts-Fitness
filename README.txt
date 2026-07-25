NKBEASTS COMPLETE STATIC SITE
=============================

Përfshin:
- Ushtrime me video dhe filtra
- Program 3-javor
- Nutrition dhe NK Gear
- BMI, kalori dhe proteinë calculators
- Radio live me stacione nga Kosova/Shqipëria (Radio Browser)
- Lajme RSS me Cloudflare Pages Function
- SQ / DE / EN për elementet kryesore
- Cookie banner, Privacy, Impressum dhe Kontakt placeholders
- Responsive për telefon dhe desktop

DEPLOY NË CLOUDFLARE PAGES
1. Ngarko krejt përmbajtjen e këtij folderi.
2. Mos e fshi folderin functions — ai e bën RSS-in live.
3. Ndrysho emailin placeholder te app.js.
4. Plotëso Impressum dhe Privacy me të dhënat e tua reale para AdSense.
5. Radioja varet nga stream-et e stacioneve; jo çdo stream punon në çdo browser.


ONLINE VISITORS — AKTIVIZIMI REAL
=================================
Numëruesi është futur në header dhe në telefon.

Pa konfigurim shtesë shfaq 1 (vizitori aktual), jo numër të sajuar.
Për numër real të vizitorëve aktivë:

1. Hape Cloudflare Dashboard.
2. Shko te Storage & Databases > KV.
3. Krijo namespace, p.sh. NKBEASTS_VISITORS.
4. Hape projektin Cloudflare Pages > Settings > Bindings.
5. Shto KV namespace binding:
   Variable name: VISITORS
   Namespace: NKBEASTS_VISITORS
6. Bëj redeploy faqen.

Vizitori llogaritet online kur ka dërguar heartbeat brenda 90 sekondave.
Ky numër është afërsisht real; KV mund të ketë vonesë të vogël kur shumë
vizitorë hyjnë në të njëjtën sekondë.
