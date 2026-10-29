/* Order / Buy Now page (jQuery) */
$(function () {
  var q = new URLSearchParams(location.search);
  var w = WATCHES.find(function (x) { return x.id === Number(q.get("id")); }) || WATCHES[0];
  var mode = q.get("mode") === "order" ? "order" : "buy";
  var qty = 1;

  $("#wImg").attr("src", imgUrl(IMG[w.id - 1], 800, 1000));
  $("#wName").text(w.name);
  $("#wMeta").text(w.material + " · " + w.size);
  $("#wBadge").text(mode === "buy" ? "⚡ Buy Now" : "🛒 Place Order");
  $("#submitBtn").text(mode === "buy" ? "Buy Now" : "Confirm Order");
  document.title = w.name + " — Alberto";

  function update() { $("#qty").text(qty); $("#total").text(money(w.price * qty)); }
  update();
  $("#minus").on("click", function () { qty = Math.max(1, qty - 1); update(); });
  $("#plus").on("click", function () { qty = Math.min(10, qty + 1); update(); });

  $("#orderForm").on("submit", function (e) {
    e.preventDefault();
    var $f = $(this), $btn = $("#submitBtn").prop("disabled", true);
    var data = { watchId: w.id, qty: qty };
    $f.serializeArray().forEach(function (p) { data[p.name] = p.value; });
    $.ajax({ url: "/api/orders", method: "POST", contentType: "application/json", data: JSON.stringify(data) })
      .done(function (j) {
        $("#orderNo").text("#" + j.orderId);
        $("#orderTotal").text(money(j.total));
        $f.slideUp(250, function () { $("#success").fadeIn(300); });
      })
      .fail(function (x) { $("#orderErr").text((x.responseJSON && x.responseJSON.error) || "Error"); })
      .always(function () { $btn.prop("disabled", false); });
  });
});
