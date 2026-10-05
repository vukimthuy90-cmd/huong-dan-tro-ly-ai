// Vẽ 1 trang con hướng dẫn (công cụ × hệ điều hành) từ dữ liệu trong noi-dung*.js.
// Nội dung là chữ do Ban tổ chức soạn sẵn (tin cậy), không có dữ liệu người dùng nhập.
window.veHuongDan = function (ma, hd) {
  function buoc(b, i) {
    return '<div class="buoc"><div class="so">' + (i + 1) + '</div><div>' +
      '<h3>' + b.tieuDe + '</h3>' +
      (b.noiDung ? '<p class="mo">' + b.noiDung + '</p>' : '') +
      (b.ma ? '<div class="ma">' + b.ma + '</div>' : '') +
      (b.anh ? '<figure class="anh-buoc"><img src="' + b.anh.src + '" alt="' + b.anh.alt + '" loading="lazy"><figcaption>' + b.anh.alt + '</figcaption></figure>' : '') +
      (b.dat ? '<div class="dat"><b>Đạt:</b> ' + b.dat + '</div>' : '') +
      '</div></div>';
  }
  function phan(p) {
    return '<hr><h2' + (p.buoc ? ' id="phan-' + p.buoc + '"' : '') + '><em>' + p.chu + '.</em> ' + p.tieuDe + '</h2>' +
      p.cacBuoc.map(buoc).join('') +
      (p.buoc ? '<div class="o-xong" data-buoc="' + p.buoc + '" data-cong-cu="' + hd.congCu +
        '" data-may="' + hd.may + '"></div>' : '');
  }
  var loi = (hd.loi || []).map(function (l) {
    return '<details><summary>' + l.hoi + '</summary><p>' + l.dap + '</p></details>';
  }).join('');

  return '<p class="duong-dan"><a href="#/">Trang chọn</a> › ' + hd.tieuDe + '</p>' +
    '<section class="hero"><span class="nhan">' + hd.nhan + '</span>' +
    '<h1>' + hd.tieuDe + ',<br><em>từng bước một</em></h1></section>' +
    '<p>' + hd.canCo + '</p>' +
    (hd.tiep ? '<p class="mo">' + hd.tiep.nhan + ': <a href="' + hd.tiep.link + '" target="_blank" rel="noopener">' + hd.tiep.link.replace(/^https:\/\//, '') + '</a></p>' : '') +
    (loi ? '<p class="mo">Bị kẹt giữa chừng? <a href="#/' + ma + '" onclick="document.getElementById(\'loi-thuong-gap\').scrollIntoView({behavior:\'smooth\'});return false">Xem lỗi thường gặp ↓</a></p>' : '') +
    '<div class="tien-do" data-tien-do style="margin-top:16px"></div>' +
    hd.phan.map(phan).join('') +
    (loi ? '<hr><h2 id="loi-thuong-gap">Bị kẹt? <em>Lỗi thường gặp</em></h2>' + loi : '') +
    '<div class="cuoi-trang"><a class="nut vien" href="#/">← Về trang chọn</a>' +
    '</div>';
};
