/* Login / Signup page — 3D flip card (jQuery) */
$(function () {
  if (new URLSearchParams(location.search).get("mode") === "signup") $("#flipCard").addClass("flipped");

  $(".to-signup").on("click", function () { $("#flipCard").addClass("flipped"); $(".msg").text(""); });
  $(".to-login").on("click", function () { $("#flipCard").removeClass("flipped"); $(".msg").text(""); });

  $(".auth-form").on("submit", function (e) {
    e.preventDefault();
    var $f = $(this), mode = $f.data("mode");
    var $btn = $f.find("button[type=submit]").prop("disabled", true);
    var $msg = $f.find(".msg").removeClass("text-danger green").text("");
    var data = { mode: mode };
    $f.serializeArray().forEach(function (p) { data[p.name] = p.value; });

    $.ajax({ url: "/api/auth", method: "POST", contentType: "application/json", data: JSON.stringify(data) })
      .done(function (j) {
        localStorage.setItem("alberto_user", j.name);
        $msg.addClass("green").text("Welcome, " + j.name + "! Redirecting…");
        setTimeout(function () { location.href = "../index.html"; }, 1000);
      })
      .fail(function (x) {
        $msg.addClass("text-danger").text((x.responseJSON && x.responseJSON.error) || "Something went wrong");
      })
      .always(function () { $btn.prop("disabled", false); });
  });
});
