// Logic trang hướng dẫn: nhớ học viên, vẽ trang con, gửi "Đã xong" về Google Sheet.
(function () {
  var DIA_CHI_NHAN = window.DIA_CHI_NHAN_TIEN_DO; // link Apps Script, khai ở cau-hinh.js
  var KHOA = 'vu-huong-dan-v2'; // v2: nhận diện bằng email
  var TEN_BUOC = {
    '1-kiem-tra-may': 'Kiểm tra máy', '2-cai-dat': 'Cài đặt',
    '3-dang-nhap': 'Đăng nhập', '4-giao-viec-dau-tien': 'Giao việc đầu tiên'
  };

  function doc() {
    try { return JSON.parse(localStorage.getItem(KHOA)) || {}; } catch (e) { return {}; }
  }
  function ghi(s) {
    try { localStorage.setItem(KHOA, JSON.stringify(s)); } catch (e) { /* trình duyệt chặn: vẫn chạy */ }
  }
  var trangThai = doc();
  if (!trangThai.maMay) {
    trangThai.maMay = Math.random().toString(36).slice(2, 12).padEnd(8, '0');
    ghi(trangThai);
  }
  // Dấu ✓ lưu THEO EMAIL (máy dùng chung / sửa email không lẫn tiến độ người khác)
  if (!trangThai.theoEmail || typeof trangThai.theoEmail !== 'object') trangThai.theoEmail = {};
  function daXongCua() {
    if (!trangThai.email) return {};
    return trangThai.theoEmail[trangThai.email] || (trangThai.theoEmail[trangThai.email] = {});
  }
  // Khoá 1 ô = bước + công cụ + máy (đổi công cụ thì Bước 2-4 tính lại)
  function khoaO(buoc, congCu, may) { return [buoc, congCu || '', may || ''].join('|'); }
  function buocDaXong(buoc) {
    var ds = daXongCua();
    return Object.keys(ds).some(function (k) { return k.split('|')[0] === buoc; });
  }
  function huongDanList() { return (window.NOI_DUNG && window.NOI_DUNG.huongDan) || {}; }

  function chuanEmail(s) { return String(s || '').trim().toLowerCase(); }
  // Gõ nhầm đuôi Gmail hay gặp → email sai thì Ban tổ chức không khớp được với danh sách đăng ký
  var DUOI_GO_NHAM = ['gmail.con', 'gmail.co', 'gmai.com', 'gmial.com', 'gmal.com', 'gmail.vn', 'gamil.com'];

  function veTienDo() {
    document.querySelectorAll('[data-tien-do]').forEach(function (el) {
      var tiep = Object.keys(TEN_BUOC).filter(function (k) { return !buocDaXong(k); })[0]; // bước nên làm tiếp
      el.innerHTML = Object.keys(TEN_BUOC).map(function (k) {
        var da = buocDaXong(k);
        return '<button type="button" data-den="' + k + '" class="' + (da ? 'da' : k === tiep ? 'tiep' : '') + '"' +
          (k === tiep ? ' title="Việc nên làm tiếp"' : '') + '>' + (da ? '✓ ' : '') + TEN_BUOC[k] + '</button>';
      }).join('');
      el.querySelectorAll('button').forEach(function (b) { b.onclick = function () { denBuoc(b.dataset.den); }; });
    });
    var chao = document.getElementById('chao');
    if (chao) chao.textContent = trangThai.ten ? 'Chào ' + trangThai.ten + ' — tiến độ của bạn:' : '';
  }

  function veODaXong() {
    document.querySelectorAll('.o-xong').forEach(function (o) {
      var buoc = o.dataset.buoc;
      var da = daXongCua()[khoaO(buoc, o.dataset.congCu, o.dataset.may)];
      o.innerHTML =
        '<p class="mo">' + (o.dataset.goiY || 'Làm xong phần này thì bấm nút để Ban tổ chức biết bạn đã qua.') + '</p>' +
        '<button class="nut' + (da ? ' xong' : '') + '" type="button"' + (da ? ' disabled' : '') + '>' + (da ? '✓ Đã ghi nhận' : 'Tôi đã làm xong') + '</button>' +
        '<div class="thong-bao" role="status"></div>';
      o.querySelector('button').onclick = function () { baoXong(o, buoc); };
    });
  }

  function baoXong(o, buoc) {
    var nut = o.querySelector('button'), tb = o.querySelector('.thong-bao');
    if (!trangThai.ten || !trangThai.email) { hoiDanhTinhTaiCho(o, buoc); return; }
    nut.disabled = true; nut.textContent = 'Đang gửi…'; tb.textContent = '';
    var goi = {
      ten: trangThai.ten, email: trangThai.email, buoc: buoc,
      congCu: o.dataset.congCu || '', may: o.dataset.may || '', maMay: trangThai.maMay
    };
    fetch(DIA_CHI_NHAN, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(goi) })
      .then(function (r) { return r.json(); })
      .then(function (kq) {
        if (!kq.ok) throw new Error(kq.loi || 'that-bai');
        daXongCua()[khoaO(buoc, goi.congCu, goi.may)] = new Date().toISOString();
        ghi(trangThai); veODaXong(); veTienDo();
      })
      .catch(function () {
        nut.disabled = false; nut.textContent = 'Tôi đã làm xong';
        tb.className = 'thong-bao loi';
        tb.textContent = 'Chưa gửi được. Kiểm tra mạng rồi bấm lại giúp mình nhé.';
      });
  }

  // Kiểm tra + lưu tên/email. Trả về câu báo lỗi, hoặc '' nếu lưu được.
  function luuDanhTinh(tenNhap, emailNhap) {
    var ten = String(tenNhap || '').trim(), email = chuanEmail(emailNhap);
    if (!ten) return 'Bạn nhập họ tên giúp mình.';
    if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Email chưa đúng (ví dụ ten.ban@gmail.com).';
    if (DUOI_GO_NHAM.indexOf(email.split('@')[1]) >= 0) return 'Đuôi email hình như gõ nhầm, bạn kiểm tra lại (thường là @gmail.com).';
    trangThai.ten = ten.slice(0, 80); trangThai.email = email; ghi(trangThai);
    var f = document.getElementById('form-danh-tinh');
    if (f) { f.ten.value = trangThai.ten; f.email.value = trangThai.email; }
    return '';
  }

  // Chưa có tên/email mà bấm "Đã xong" → hỏi ngay tại chỗ, không bắt quay về trang chủ.
  function hoiDanhTinhTaiCho(o, buoc) {
    var tb = o.querySelector('.thong-bao');
    o.querySelector('button').hidden = true; // 1 nút chính duy nhất: "Lưu và ghi nhận"
    tb.className = 'thong-bao';
    tb.innerHTML = '<span style="color:var(--than)">Cho Ban tổ chức biết bạn là ai (chỉ nhập 1 lần):</span>' +
      '<form class="danh-tinh" novalidate onsubmit="return false"><label>Họ và tên<input name="ten" autocomplete="name" maxlength="80" placeholder="Nguyễn Văn A"></label>' +
      '<label>Email đã dùng khi đăng ký<input name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="ten.ban@gmail.com"></label>' +
      '<button class="nut" type="submit">Lưu và ghi nhận</button></form><span class="thong-bao loi"></span>';
    var f = tb.querySelector('form');
    f.ten.focus();
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var loi = luuDanhTinh(f.ten.value, f.email.value);
      if (loi) { tb.querySelector('.loi').textContent = loi; return; }
      veODaXong(); veTienDo();
      if (!daXongCua()[khoaO(buoc, o.dataset.congCu, o.dataset.may)]) baoXong(o, buoc); // email này đã ghi bước này rồi thì không gửi trùng
    };
  }

  function ganFormDanhTinh() {
    var f = document.getElementById('form-danh-tinh');
    if (!f) return;
    f.ten.value = trangThai.ten || '';
    f.email.value = trangThai.email || '';
    f.onsubmit = function (ev) {
      ev.preventDefault();
      var tb = document.getElementById('tb-danh-tinh'), loi = luuDanhTinh(f.ten.value, f.email.value);
      if (loi) { tb.className = 'thong-bao loi'; tb.textContent = loi; return; }
      tb.className = 'thong-bao'; tb.textContent = '✓ Đã lưu. Bắt đầu Bước 1 bên dưới nhé.';
      veODaXong(); veTienDo();
    };
  }

  // Bấm 1 nút tiến độ → nhảy tới đúng phần đó (khác trang thì chuyển trang rồi cuộn tới).
  var cuonToiSau = '';
  function cuonToi(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function denBuoc(buoc) {
    var maHienTai = location.hash.replace(/^#\/?/, '');
    var dangOTrangCon = !document.getElementById('trang-con').hidden;
    var dich, trang;
    if (buoc === '1-kiem-tra-may') { trang = ''; dich = 'buoc-1'; }
    else if (dangOTrangCon) { trang = maHienTai; dich = 'phan-' + buoc; }
    else if (trangThai.huongDanCuoi && huongDanList()[trangThai.huongDanCuoi]) { trang = trangThai.huongDanCuoi; dich = 'phan-' + buoc; }
    else { trang = ''; dich = 'buoc-2'; } // chưa chọn công cụ → về chỗ chọn
    if (trang === maHienTai || (!trang && !dangOTrangCon)) { cuonToi(dich); return; }
    cuonToiSau = dich;
    location.hash = '#/' + trang;
  }

  function dieuHuong() {
    var ma = (location.hash.replace(/^#\/?/, '') || '').split('?')[0];
    var trangChu = document.getElementById('trang-chu'), trangCon = document.getElementById('trang-con');
    var ds = huongDanList();
    var hd = Object.prototype.hasOwnProperty.call(ds, ma) ? ds[ma] : null;
    if (hd) {
      trangChu.hidden = true; trangCon.hidden = false;
      trangCon.innerHTML = window.veHuongDan(ma, hd);
      document.title = hd.tieuDe + ' — Trợ lý AI Vườn Ươm';
      trangThai.huongDanCuoi = ma; ghi(trangThai); // nhớ công cụ đang theo để nút tiến độ ở trang chủ dẫn đúng chỗ
    } else {
      if (ma && !Object.keys(ds).length) {
        var bao = document.getElementById('loi-noi-dung') || trangChu.insertBefore(document.createElement('p'), trangChu.firstChild);
        bao.id = 'loi-noi-dung'; bao.className = 'thong-bao loi';
        bao.textContent = 'Chưa tải được nội dung hướng dẫn. Tải lại trang; vẫn lỗi thì báo Ban tổ chức trong nhóm Zalo.';
      }
      trangChu.hidden = false; trangCon.hidden = true; trangCon.innerHTML = '';
      document.title = 'Cài AI Agent — Khóa Trợ lý AI Vườn Ươm';
    }
    veODaXong(); veTienDo();
    if (cuonToiSau) { var id = cuonToiSau; cuonToiSau = ''; window.scrollTo(0, 0); setTimeout(function () { cuonToi(id); }, 30); }
    else window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', dieuHuong);
  document.addEventListener('DOMContentLoaded', function () {
    // Nút + tiến độ vẽ trước; phần nội dung lỗi cũng không kéo sập phần này
    veODaXong(); veTienDo(); ganFormDanhTinh();
    try { dieuHuong(); } catch (e) { veODaXong(); veTienDo(); }
  });
})();
