// Dữ liệu chung cho các trang con. Mỗi công cụ khai riêng ở noi-dung-<cong-cu>.js.
window.NOI_DUNG = { huongDan: {} };

// Phần C dùng chung: giao việc đầu tiên — kết quả là 1 file thật xuất hiện trên máy.
window.phanGiaoViecDauTien = function (tenNoiGo) {
  return {
    chu: 'C', tieuDe: 'Giao việc đầu tiên cho AI Agent', buoc: '4-giao-viec-dau-tien',
    cacBuoc: [
      { tieuDe: 'Gõ câu này vào ' + tenNoiGo + ' rồi bấm Enter',
        noiDung: 'Chép nguyên văn câu dưới (bấm vào khung để chọn hết, rồi Copy).',
        ma: 'Tạo giúp tôi file ke-hoach-tuan.txt trong thư mục này, liệt kê 5 việc quan trọng nhất của một nhân viên văn phòng trong tuần, mỗi việc 1 dòng, viết bằng tiếng Việt.' },
      { tieuDe: 'Cho phép AI Agent làm',
        noiDung: 'AI Agent có thể hỏi xin phép trước khi tạo file. Đọc qua, thấy đúng việc mình giao thì bấm đồng ý (Accept / Allow / Approve).' },
      { tieuDe: 'Mở thư mục Thu-AI trên Desktop để xem',
        noiDung: 'Một file mới tên <b>ke-hoach-tuan.txt</b> xuất hiện. Mở ra xem nội dung.',
        dat: 'thấy file <b>ke-hoach-tuan.txt</b> có 5 dòng tiếng Việt. Bạn vừa giao việc cho AI Agent và nó tự làm trên máy bạn. Xong phần chuẩn bị, hẹn bạn ở buổi học 06/10!' }
    ]
  };
};

// Bước chuẩn bị thư mục làm việc, dùng chung.
window.buocTaoThuMuc = function (may) {
  return { tieuDe: 'Tạo 1 thư mục trống tên Thu-AI trên Desktop',
    noiDung: may === 'mac'
      ? 'Ra màn hình Desktop, bấm chuột phải vào chỗ trống → <b>New Folder</b>, đặt tên <code>Thu-AI</code>. AI Agent sẽ làm việc trong thư mục này.'
      : 'Ra màn hình Desktop, bấm chuột phải vào chỗ trống → <b>New</b> → <b>Folder</b>, đặt tên <code>Thu-AI</code>. AI Agent sẽ làm việc trong thư mục này.' };
};
