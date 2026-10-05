// Google Antigravity — nguồn: antigravity.google/download, /docs/getting-started, /docs/faq, /pricing (tra 2/10/2026).
(function () {
  var loiChung = [
    { hoi: 'Không đăng nhập được bằng email công ty', dap: 'Antigravity dành cho tài khoản Google cá nhân. Đăng xuất, đăng nhập lại bằng địa chỉ <b>@gmail.com</b> của bạn.' },
    { hoi: 'Đăng nhập xong trên trình duyệt mà phần mềm vẫn ở màn Sign in', dap: 'Bạn chưa bấm <b>Open</b> ở hộp hỏi của trình duyệt. Quay lại tab trình duyệt, bấm dòng <b>Click here</b> trên trang "You have successfully authenticated". Vẫn không được thì tắt hẳn Antigravity rồi mở lại.' },
    { hoi: 'Báo chưa xác minh tuổi (age unverified)', dap: 'Phải từ 18 tuổi. Vào tài khoản Google của bạn, xác minh ngày sinh rồi đăng nhập lại.' },
    { hoi: 'Báo hết lượt dùng', dap: 'Gói miễn phí có giới hạn theo tuần, tự nạp lại hằng tuần. Chờ đến tuần sau, hoặc dùng công cụ khác bạn đã có.' },
    { hoi: 'Máy không chịu vào chế độ ngủ', dap: 'Bình thường: khi AI Agent đang làm việc, Antigravity giữ máy thức để không bị ngắt giữa chừng.' }
  ];
  function huongDan(may) {
    var mac = may === 'mac';
    return {
      congCu: 'antigravity', may: may, tenCongCu: 'Google Antigravity',
      tomTat: mac ? 'Tải, kéo vào Applications, đăng nhập Gmail. Miễn phí. 10 phút.' : 'Tải, cài, đăng nhập Gmail. Miễn phí. 10 phút.',
      nhan: 'Antigravity · ' + (mac ? 'Mac' : 'Windows') + ' · Miễn phí · 10 phút',
      tieuDe: 'Cài Google Antigravity lên máy ' + (mac ? 'Mac' : 'Windows'),
      canCo: 'Cần: ' + (mac ? '<b>macOS 12 trở lên</b>' : '<b>Windows 10 (64-bit) trở lên</b>') +
        ', có mạng, và 1 tài khoản <b>Gmail cá nhân</b> (không dùng email công ty). Không cần thẻ, không mất phí.',
      phan: [
        { chu: 'A', tieuDe: 'Tải và cài Antigravity', buoc: '2-cai-dat', cacBuoc: [
          { tieuDe: 'Mở trình duyệt, vào địa chỉ này', ma: 'antigravity.google/download' },
          mac
            ? { tieuDe: 'Chọn đúng loại máy rồi bấm tải', noiDung: 'Bấm quả táo  → <b>About This Mac</b>. Dòng <b>Chip</b> ghi "Apple M1/M2/M3…" thì bấm <b>Download for Apple Silicon</b>. Dòng <b>Processor</b> ghi "Intel" thì bấm <b>Download for Intel</b>.' }
            : { tieuDe: 'Bấm Download for x64', noiDung: 'Hầu hết máy Windows dùng bản <b>x64</b>. Chỉ chọn <b>ARM64</b> nếu máy bạn ghi rõ chip Snapdragon/ARM.' },
          mac
            ? { tieuDe: 'Mở file vừa tải, kéo biểu tượng Antigravity vào thư mục Applications', noiDung: 'Nếu máy hỏi <b>Keep Both</b> hay <b>Replace</b> thì chọn <b>Replace</b>. Lần đầu mở, nếu máy hỏi "Are you sure you want to open it?" → bấm <b>Open</b>.' }
            : { tieuDe: 'Mở file vừa tải, bấm Next cho tới khi cài xong', noiDung: 'Nếu Windows hỏi "Do you want to allow this app to make changes?" → bấm <b>Yes</b>. Cài xong, mở Antigravity từ menu Start.' }
        ] },
        { chu: 'B', tieuDe: 'Đăng nhập và mở dự án đầu tiên', buoc: '3-dang-nhap', cacBuoc: [
          { tieuDe: 'Bấm Continue with Google', noiDung: 'Màn hình <b>Welcome to Antigravity</b> hiện ra. Bấm nút xanh <b>Continue with Google</b> (đừng chọn "Use business account"). Trình duyệt sẽ mở trang đăng nhập Google: chọn tài khoản <b>@gmail.com</b> cá nhân của bạn và đồng ý.',
            anh: { src: 'anh/antigravity-dang-nhap.jpg', alt: 'Màn hình Welcome to Antigravity: bấm Continue with Google' } },
          { tieuDe: 'Trình duyệt hỏi mở Antigravity → bấm Open', noiDung: 'Trình duyệt báo <b>"You have successfully authenticated"</b> và hiện hộp hỏi <b>"This site is trying to open Antigravity"</b>. Tick ô <b>Always allow…</b> rồi bấm <b>Open</b>: nút <b>nhạt màu</b>, đừng bấm nhầm nút Cancel đậm màu. Chrome ghi là <b>Open Antigravity</b>, Safari ghi là <b>Allow</b>. Bạn sẽ được đưa về phần mềm, đã đăng nhập xong.',
            anh: { src: 'anh/antigravity-bam-open.jpg', alt: 'Hộp hỏi mở Antigravity: bấm Open' },
            dat: 'quay về phần mềm Antigravity, không còn màn hình Sign in. Lỡ bấm Cancel hoặc không thấy gì → bấm dòng <b>Click here</b> trên trang trình duyệt, hoặc tắt hẳn Antigravity rồi mở lại.' },
          { tieuDe: 'Các màn hình chào hỏi tiếp theo', noiDung: 'Nếu Antigravity hỏi thêm vài lựa chọn (giao diện, cài đặt…), cứ để mặc định và bấm tiếp.' },
          window.buocTaoThuMuc(may),
          { tieuDe: 'Mở thư mục Thu-AI trong Antigravity', noiDung: 'Ở thanh bên trái, bấm biểu tượng <b>thư mục có dấu +</b> → <b>New Project</b> → <b>Add Folder</b>, chọn thư mục <code>Thu-AI</code> → <b>Create</b>.' },
          { tieuDe: 'Nếu được hỏi chế độ làm việc, chọn Local mode', dat: 'màn hình Antigravity có ô chat để gõ yêu cầu, bên trái là thư mục Thu-AI.' }
        ] },
        window.phanGiaoViecDauTien('ô chat của Antigravity')
      ],
      loi: loiChung
    };
  }
  window.NOI_DUNG.huongDan['antigravity-mac'] = huongDan('mac');
  window.NOI_DUNG.huongDan['antigravity-windows'] = huongDan('windows');
})();
