// Thanh menu tiến độ dính đầu màn hình: hiện khi hàng nút tiến độ trong trang đã cuộn khuất lên trên.
// Nút trong thanh do app.js vẽ chung (mọi phần tử [data-tien-do] đều được vẽ + gắn sự kiện).
(function () {
  var thanh, cho = false;

  function hangNutTrongTrang() {
    var ds = document.querySelectorAll('main [data-tien-do]');
    for (var i = 0; i < ds.length; i++) if (ds[i].offsetParent) return ds[i]; // hàng của trang đang hiện
    return null;
  }

  function capNhat() {
    cho = false;
    var hang = hangNutTrongTrang();
    var hien = !!hang && hang.getBoundingClientRect().bottom < 0;
    thanh.classList.toggle('hien', hien);
    thanh.setAttribute('aria-hidden', hien ? 'false' : 'true');
  }

  function henCapNhat() {
    if (!cho) { cho = true; requestAnimationFrame(capNhat); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    thanh = document.getElementById('thanh-menu');
    if (!thanh) return;
    window.addEventListener('scroll', henCapNhat, { passive: true });
    window.addEventListener('resize', henCapNhat);
    window.addEventListener('hashchange', function () { setTimeout(henCapNhat, 60); });
    henCapNhat();
  });
})();
