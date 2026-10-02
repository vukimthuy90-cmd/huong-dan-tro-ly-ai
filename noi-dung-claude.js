// Claude Code trong ứng dụng Claude — nguồn: trang anh Tuấn (Mac, 16/9/2026) + code.claude.com/docs/en/desktop-quickstart (Windows), tra 2/10/2026.
(function () {
  var loiChung = [
    { hoi: 'Bấm tab Code thì báo cần nâng cấp, hoặc lỗi 403', dap: 'Claude Code cần gói <b>Claude Pro</b>. Kiểm tra gói còn hạn, rồi đăng xuất và đăng nhập lại (cách sửa hay gặp nhất). Vẫn lỗi thì thoát hẳn phần mềm và mở lại.' },
    { hoi: 'Màn hình trắng hoặc đứng khi mở', dap: 'Thoát hẳn phần mềm, mở lại và chờ phần mềm tự cập nhật. Đang dùng mạng công ty thì thử mạng nhà/4G.' },
    { hoi: 'Windows báo "Git is required"', dap: 'Cập nhật Claude lên bản mới nhất (bản mới không bắt buộc Git). Vẫn báo thì cài Git for Windows tại <code>git-scm.com/downloads/win</code>, bấm Next tới hết, rồi mở lại Claude.' },
    { hoi: 'Báo "Failed to load session"', dap: 'Chọn lại thư mục khác hoặc khởi động lại phần mềm.' }
  ];
  function huongDan(may) {
    var mac = may === 'mac';
    return {
      congCu: 'claude', may: may, tenCongCu: 'Claude Code',
      tomTat: mac ? 'Tải Claude, kéo vào Applications, đăng nhập, mở Claude Code. 10 phút.' : 'Tải Claude, bấm đúp cài, đăng nhập, mở Claude Code. 10 phút.',
      nhan: 'Claude Code · ' + (mac ? 'Mac' : 'Windows') + ' · 10 phút',
      tieuDe: 'Cài Claude Code lên máy ' + (mac ? 'Mac' : 'Windows'),
      canCo: 'Claude Code nằm sẵn trong phần mềm <b>Claude</b>. Cần: ' +
        (mac ? '<b>macOS 11 trở lên</b>' : '<b>Windows 10 trở lên</b>') +
        ', có mạng, email (Gmail là dễ nhất), và gói <b>Claude Pro</b>.',
      phan: [
        { chu: 'A', tieuDe: 'Tải và cài phần mềm Claude', buoc: '2-cai-dat', cacBuoc: [
          { tieuDe: 'Mở trình duyệt, vào địa chỉ này', ma: 'claude.ai/download',
            noiDung: mac ? 'Bấm <b>Download for macOS</b>. File khoảng 200 MB, mạng bình thường mất 1–3 phút.' : 'Bấm nút tải bản cho Windows.' },
          mac
            ? { tieuDe: 'Mở file Claude.dmg, kéo biểu tượng Claude thả vào thư mục Applications',
                noiDung: 'Sau đó bấm <code>⌘</code> + <code>Space</code>, gõ <code>Claude</code>, bấm Enter. Nếu máy hỏi "Are you sure you want to open it?" → bấm <b>Open</b>.' }
            : { tieuDe: 'Bấm đúp file vừa tải để cài, xong mở Claude từ menu Start',
                noiDung: 'Nếu báo "another installation in progress" → bấm chuột phải vào file cài → <b>Run as administrator</b>.' }
        ] },
        { chu: 'B', tieuDe: 'Đăng nhập và mở Claude Code', buoc: '3-dang-nhap', cacBuoc: [
          { tieuDe: 'Đăng nhập: chọn Continue with Google', noiDung: 'Có Gmail thì chọn Gmail của mình là xong. Không có Gmail: gõ email, Claude gửi một <b>mã 6 số</b> vào email, chép mã đó vào ô trên màn hình. Điền tên, chọn "I\'m 18 or older", bấm tiếp tục. Trình duyệt hỏi "Open Claude?" → bấm <b>Open</b>.' },
          window.buocTaoThuMuc(may),
          { tieuDe: 'Mở Claude Code', noiDung: mac
              ? 'Ở góc trên bên trái có nút <b>&lt;/&gt;</b>, bấm vào đó. Chọn thư mục <code>Thu-AI</code> làm nơi làm việc.'
              : 'Bấm tab <b>Code</b> ở giữa phía trên. Chọn <b>Local</b> → <b>Select folder</b> → chọn thư mục <code>Thu-AI</code>.',
            dat: 'màn hình Claude Code có ô gõ yêu cầu, đang mở thư mục Thu-AI.' }
        ] },
        window.phanGiaoViecDauTien('ô gõ của Claude Code')
      ],
      loi: loiChung,
      tiep: { nhan: 'Chưa có gói Pro? Mua tại', link: 'https://claude.ai/upgrade' }
    };
  }
  window.NOI_DUNG.huongDan['claude-mac'] = huongDan('mac');
  window.NOI_DUNG.huongDan['claude-windows'] = huongDan('windows');
})();
