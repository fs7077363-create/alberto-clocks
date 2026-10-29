/* Home page logic — jQuery */
$(function () {
  // ---- 24 watch cards ----
  var html = WATCHES.map(function (w) {
    var stars = "★".repeat(Math.round(w.rating));
    return (
      '<div class="col-sm-6 col-lg-3 reveal">' +
      '  <div class="watch-card tilt h-100">' +
      '    <div class="img-wrap">' +
      '      <img src="' + w.img + '" alt="' + esc(w.name) + '" loading="lazy">' +
      '      <span class="num">N° ' + String(w.id).padStart(2, "0") + "</span>" +
      (w.badge ? '<span class="badge-gold">' + w.badge + "</span>" : "") +
      "    </div>" +
      '    <div class="p-3">' +
      '      <p class="meta mb-1">' + w.material + " · " + w.size + "</p>" +
      '      <h5 class="serif mb-1">' + esc(w.name) + "</h5>" +
      '      <div class="d-flex justify-content-between align-items-center">' +
      '        <small class="gold">' + stars + ' <span class="muted">' + w.rating.toFixed(1) + "</span></small>" +
      '        <span class="price">' + money(w.price) + "</span>" +
      "      </div>" +
      '      <div class="row g-2 mt-2">' +
      '        <div class="col-6"><a href="html/order.html?id=' + w.id + '&mode=order" class="btn btn-outline-green w-100 btn-sm rounded-pill">🛒 Order</a></div>' +
      '        <div class="col-6"><a href="html/order.html?id=' + w.id + '&mode=buy" class="btn btn-grad w-100 btn-sm rounded-pill">Buy Now</a></div>' +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      "</div>"
    );
  }).join("");
  $("#watchGrid").html(html);

  // ---- 3D tilt ----
  $(document).on("mousemove", ".tilt", function (e) {
    var r = this.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    $(this).css("transform", "perspective(900px) rotateX(" + (0.5 - y) * 12 + "deg) rotateY(" + (x - 0.5) * 12 + "deg) scale(1.02)");
  }).on("mouseleave", ".tilt", function () {
    $(this).css("transform", "");
  });

  // ---- scroll reveal ----
  function reveal() {
    var bottom = $(window).scrollTop() + $(window).height() - 60;
    $(".reveal:not(.shown)").each(function () {
      if ($(this).offset().top < bottom) $(this).addClass("shown");
    });
  }
  $(window).on("scroll resize", reveal);
  reveal();

  // ---- navbar shadow ----
  $(window).on("scroll", function () {
    $(".navbar").toggleClass("scrolled", $(window).scrollTop() > 40);
  });

  // ---- reviews ----
  function reviewCard(r) {
    return (
      '<div class="col-md-6"><div class="review-card h-100">' +
      '<div class="d-flex align-items-center gap-3">' +
      '<div class="avatar">' + esc((r.name || "?")[0].toUpperCase()) + "</div>" +
      '<div><div class="serif">' + esc(r.name) + '</div><small class="meta">' + esc(r.city || "Collector") + "</small></div>" +
      '<span class="ms-auto gold">' + "★".repeat(r.rating) + "</span></div>" +
      '<p class="muted mt-3 mb-0">“' + esc(r.text) + "”</p></div></div>"
    );
  }
  var reviews = SAMPLE_REVIEWS.slice();
  function renderReviews() { $("#reviewList").html(reviews.slice(0, 8).map(reviewCard).join("")); }
  renderReviews();
  $.getJSON("/api/reviews").done(function (rows) {
    if (rows && rows.length) { reviews = rows.concat(SAMPLE_REVIEWS); renderReviews(); }
  });

  var rating = 5;
  $("#starPick span").on("click", function () {
    rating = $(this).data("v");
    $("#starPick span").each(function () { $(this).toggleClass("active", $(this).data("v") <= rating); });
  });

  $("#reviewForm").on("submit", function (e) {
    e.preventDefault();
    var $f = $(this), $btn = $f.find("button[type=submit]").prop("disabled", true);
    $.ajax({
      url: "/api/reviews", method: "POST", contentType: "application/json",
      data: JSON.stringify({ name: $f.find("[name=name]").val(), city: $f.find("[name=city]").val(), text: $f.find("[name=text]").val(), rating: rating })
    }).done(function (r) {
      reviews.unshift(r); renderReviews(); $f[0].reset();
      $("#reviewMsg").removeClass("text-danger").addClass("green").text("Thank you! Your review has been added ✓");
    }).fail(function (x) {
      $("#reviewMsg").removeClass("green").addClass("text-danger").text((x.responseJSON && x.responseJSON.error) || "Error");
    }).always(function () { $btn.prop("disabled", false); });
  });
});
