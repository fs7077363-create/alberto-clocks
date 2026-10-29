/* Dark / Light theme toggle (jQuery) */
(function () {
  if (localStorage.getItem("alberto_theme") === "light") document.documentElement.classList.add("light");
})();

$(function () {
  function sync() {
    var light = $("html").hasClass("light");
    $(".theme-toggle").toggleClass("on", light).find(".knob").text(light ? "☀️" : "🌙");
  }
  sync();
  $(document).on("click", ".theme-toggle", function () {
    $("html").toggleClass("light");
    localStorage.setItem("alberto_theme", $("html").hasClass("light") ? "light" : "dark");
    sync();
  });

  // logged-in user chip
  var user = localStorage.getItem("alberto_user");
  if (user) {
    $(".auth-links").html(
      '<span class="user-chip">✦ ' + esc(user) + '</span> <button class="btn btn-outline-gold btn-sm rounded-pill" id="logoutBtn">Logout</button>'
    );
  }
  $(document).on("click", "#logoutBtn", function () {
    localStorage.removeItem("alberto_user");
    location.reload();
  });
});
