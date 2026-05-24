# Messenger Sidebar Toggle

Ẩn/hiện thanh danh sách Chats bên trái trên Facebook Messenger — giúp khung chat chiếm toàn màn hình.

![Before](/assets/img/firefox_zT3vwWmBgH.png)
![After](/assets/img/firefox_3mCtSaVjaP.png)

## Features

- **Ẩn/hiện** cột danh sách Chats bên trái chỉ với 1 click
- **Khung chat tự mở rộng** chiếm toàn bộ phần còn lại khi ẩn sidebar
- **Phím tắt** `Alt + Q`
- Hoạt động trên cả **Chrome** và **Firefox**
- Nhẹ, không tracking, không gửi dữ liệu đi đâu

## Installation

### Chrome / Edge

1. Tải và giải nén repo này
2. Vào `chrome://extensions/`
3. Bật **Developer mode** (góc trên phải)
4. Bấm **"Load unpacked"** → chọn thư mục vừa giải nén

### Firefox (tạm thời)

1. Vào `about:debugging` → **This Firefox**
2. Bấm **"Load Temporary Add-on..."**
3. Chọn file `manifest.json` trong thư mục repo

> **Lưu ý:** Firefox bản Stable yêu cầu extension phải có chữ ký của Mozilla nên chỉ load được tạm thời (mất sau khi tắt Firefox). Dùng **Firefox Developer Edition** để load vĩnh viễn.

### Firefox Developer Edition (vĩnh viễn)

1. Vào `about:config` → set `xpinstall.signatures.required` = `false`
2. Vào `about:addons` → ⚙️ → **"Install Add-on From File..."**
3. Chọn file `.zip` hoặc `manifest.json`


| Hành động | Cách dùng |
|-----------|-----------|
| Ẩn/hiện sidebar | Click nút 🔲 ở cạnh trái màn hình |
| Phím tắt | `Alt + Q` |

## Tree

```
messenger-sidebar-toggle/
├── manifest.json   # Cấu hình extension (MV3, Chrome + Firefox)
├── content.js      # Logic ẩn/hiện sidebar
├── style.css       # Style cho nút toggle
├── icon.png        # Icon extension
└── README.md
```

## Cách hoạt động

Extension inject một nút nhỏ vào cạnh trái trang Messenger. Khi bấm:

1. Tìm cột danh sách Chats qua DOM (heading `<h1>Chats</h1>`)
2. Set `width: 0` + `overflow: hidden` để ẩn sidebar
3. Set `flex: 1 1 100%` cho khung chat để mở rộng tự động

## License

MIT
