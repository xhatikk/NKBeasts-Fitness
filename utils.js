window.NKUtils = {
  escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  },
  number(id) {
    return Number(document.getElementById(id)?.value) || 0;
  }
};
