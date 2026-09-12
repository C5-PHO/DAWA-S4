document.addEventListener("DOMContentLoaded", () => {
  const sidenavs = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenavs, { edge: "left" });
});
