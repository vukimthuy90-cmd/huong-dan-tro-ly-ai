// Codex trong ứng dụng ChatGPT — nguồn: learn.chatgpt.com/docs (quickstart, auth, windows-app, pricing), tra 2/10/2026;
// đối chiếu trang "Chuẩn bị máy Agent Boss Camp" (anh Tuấn, 16/9/2026).
(function () {
  var loiChung = [
    { hoi: 'Không thấy Codex, hoặc báo cần nâng cấp', dap: 'Codex đầy đủ cần gói <b>ChatGPT Plus</b> (20 USD/tháng). Kiểm tra bạn đã đăng nhập đúng tài khoản đang có gói Plus chưa.' },
    { hoi: 'Đoạn chat đứng im, không chạy tiếp', dap: 'Xem Codex có đang chờ bạn bấm duyệt không (nút đồng ý ở dưới đoạn chat). Nếu không, mở đoạn chat mới và giao yêu cầu ngắn hơn.' },
    { hoi: 'Báo thiếu Git (không xem/hoàn tác được thay đổi)', dap: 'Không ảnh hưởng bài học đầu. Muốn hết báo: Windows mở PowerShell gõ <code>winget install Git.Git</code>; Mac làm theo hộp thoại máy gợi ý cài.' }
  ];
  function huongDan(may) {
    var mac = may === 'mac';
    return {
      congCu: 'codex', may: may, tenCongCu: 'Codex',
      tomTat: mac ? 'Tải ChatGPT, kéo vào Applications, đăng nhập, chọn Codex. 10 phút.' : 'Tải ChatGPT từ Microsoft Store, đăng nhập, chọn Codex. 10 phút.',
      nhan: 'Codex · ' + (mac ? 'Mac' : 'Windows') + ' · 10 phút',
      tieuDe: 'Cài Codex lên máy ' + (mac ? 'Mac' : 'Windows'),
      canCo: 'Codex nằm sẵn bên trong phần mềm <b>ChatGPT</b> trên máy tính. Cần: ' +
        (mac ? '<b>macOS 14 trở lên</b>' : '<b>Windows 11</b> (Windows 10 đã cập nhật đầy đủ vẫn chạy được)') +
        ', có mạng, và tài khoản ChatGPT có gói <b>Plus</b>.',
      phan: [
        { chu: 'A', tieuDe: 'Tải và cài phần mềm ChatGPT', buoc: '2-cai-dat', cacBuoc: [
          { tieuDe: 'Mở trình duyệt, vào địa chỉ này', ma: 'chatgpt.com/download',
            noiDung: mac ? 'Bấm nút tải bản cho macOS.' : 'Bấm nút tải bản cho Windows. Trang sẽ mở <b>Microsoft Store</b>, bấm <b>Get</b> / <b>Install</b>.' },
          mac
            ? { tieuDe: 'Mở file vừa tải, kéo biểu tượng vào thư mục Applications', noiDung: 'Lần đầu mở, nếu máy hỏi "Are you sure you want to open it?" → bấm <b>Open</b>.' }
            : { tieuDe: 'Cài xong, mở ChatGPT từ menu Start', noiDung: 'Bấm phím <code>Windows</code>, gõ <code>ChatGPT</code>, bấm Enter.' }
        ] },
        { chu: 'B', tieuDe: 'Đăng nhập và mở Codex', buoc: '3-dang-nhap', cacBuoc: [
          { tieuDe: 'Bấm Continue to sign in', noiDung: 'Trình duyệt mở ra trang đăng nhập ChatGPT. Đăng nhập đúng tài khoản <b>đang có gói Plus</b>, xong trình duyệt tự đưa bạn về phần mềm.' },
          window.buocTaoThuMuc(may),
          { tieuDe: 'Chọn Codex', noiDung: 'Ở menu thả xuống <b>ChatGPT</b>, chọn <b>Codex</b> → bấm <b>New chat</b>. Mở thư mục <code>Thu-AI</code> làm nơi làm việc: bấm nút thêm dự án (<b>Add new project</b>)' + (mac ? '' : ' hoặc phím tắt <code>Ctrl</code> + <code>O</code>') + ', rồi chọn thư mục <code>Thu-AI</code>.' },
          mac
            ? { tieuDe: 'Kiểm tra lại', dat: 'màn hình Codex có ô gõ yêu cầu, đang mở thư mục Thu-AI.' }
            : { tieuDe: 'Bật chế độ hỏi trước khi làm', noiDung: 'Bên dưới ô gõ, chọn <b>Ask for approval</b> để Codex xin phép bạn trước mỗi thay đổi.', dat: 'màn hình Codex có ô gõ yêu cầu, đang mở thư mục Thu-AI.' }
        ] },
        window.phanGiaoViecDauTien('ô gõ của Codex')
      ],
      loi: mac ? loiChung : loiChung.concat([
        { hoi: 'Cần quyền quản trị', dap: 'Bấm chuột phải vào ChatGPT trong menu Start → <b>Run as administrator</b>.' }
      ]),
      tiep: { nhan: 'Chưa có gói Plus? Mua tại', link: 'https://chatgpt.com/#pricing' }
    };
  }
  window.NOI_DUNG.huongDan['codex-mac'] = huongDan('mac');
  window.NOI_DUNG.huongDan['codex-windows'] = huongDan('windows');
})();
