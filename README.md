## Ruler Marking Web Demo

Ứng dụng web mô phỏng cách chia vạch trên thước đo sử dụng các thuật toán đánh dấu vạch chia khác nhau. Phù hợp cho việc học toán, dạy học và kiểm chứng các ý tưởng thuật toán.

### 🎯 Mục tiêu

- **Giáo dục**: Hỗ trợ việc dạy và học các khái niệm về chia tỷ lệ, đo lường
- **Trực quan hóa**: Giúp hiểu rõ cách hoạt động của các thuật toán đánh dấu
- **Nghiên cứu**: Kiểm chứng và so sánh hiệu quả của các phương pháp khác nhau

### ✨ Tính năng chính

### 🔧 Điều khiển linh hoạt
- **Chiều dài thước**: 1-100cm với bước nhảy 0.5cm
- **Độ chia nhỏ nhất**: 1cm, 0.5cm, 0.25cm, 0.1cm (mm)
- **Kiểu đánh dấu**: 3 thuật toán khác nhau

### 🎨 Hiển thị trực quan
- **SVG rendering**: Độ chính xác cao, có thể scale
- **Phân biệt vạch**: Màu sắc và độ dày khác nhau theo mức độ
- **Responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Số đánh dấu**: Hiển thị rõ ràng tại các vạch cm

### 🧮 Thuật toán được hỗ trợ

#### 1. **Thước chuẩn (Standard)**
Quy tắc: Vạch chia theo thước đo thông thường
- Vạch lớn: Mỗi cm (35px)
- Vạch trung: Mỗi 0.5cm (25px)  
- Vạch nhỏ: Mỗi 0.25cm (20px)
- Vạch mini: Mỗi 0.1cm (15px)

#### 2. **Đệ quy - Divide & Conquer**
Thuật toán:
1. Đánh dấu hai đầu thước (0 và length)
2. Tìm điểm giữa: mid = (start + end) / 2
3. Đệ quy cho [start, mid] và [mid, end]
4. Dừng khi khoảng cách ≤ minDivision

#### 3. **Chia nhị phân (Binary Division)**
Thuật toán:
1. Đánh dấu các vạch cm chính
2. Chia mỗi cm theo lũy thừa của 2:
   - Level 1: 1/2 (0.5cm)
   - Level 2: 1/4 (0.25cm)  
   - Level 3: 1/8 (0.125cm)
   - ...
3. Dừng khi step < minDivision

### 🚀 Cài đặt và sử dụng

#### Yêu cầu hệ thống
- **Trình duyệt**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6+ support
- **SVG**: Hỗ trợ SVG 1.1

#### Cách 1: Chạy trực tiếp
##### Clone hoặc download project
```bash
git clone https://github.com/thanhtam712/CS112_Ruler_Making.git
cd CS112_Ruler_Making

# Mở file index.html trong trình duyệt
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```
#### Cách 2: Sử dụng Live Server
##### Với VS Code + Live Server extension Right-click index.html → "Open with Live Server"
##### Hoặc sử dụng Python
```bash
python -m http.server 8000
```
Truy cập: http://localhost:8000
##### Hoặc sử dụng Node.js
```bash
npx http-server
```
Truy cập: http://localhost:8080

#### Cách 3: Deploy online
- **GitHub Pages**: Push code lên GitHub và enable Pages
- **Netlify**: Drag & drop folder vào netlify.com
- **Vercel**: Import project từ GitHub

### 📖 Hướng dẫn sử dụng

#### Bước 1: Cài đặt thông số
1. **Nhập chiều dài thước** (1-100cm)
2. **Chọn độ chia nhỏ nhất** từ dropdown
3. **Chọn kiểu đánh dấu** (Standard/Recursive/Binary)

#### Bước 2: Vẽ thước
1. Nhấn nút **"Vẽ thước đo"**
2. Xem kết quả SVG hiển thị bên dưới
3. Sử dụng nút **"Xóa"** để reset

#### Bước 3: Phân tích kết quả
- **Quan sát** sự khác biệt giữa các thuật toán
- **So sánh** mật độ vạch chia
- **Đánh giá** tính thẩm mỹ và thực dụng

### 🏗️ Cấu trúc project

CS112_Ruler_Making/
├── index.html          # Cấu trúc HTML chính
├── styles.css          # Styling và responsive design  
├── script.js           # Logic và thuật toán
└── README.md           # Tài liệu này

⭐ **Nếu project này hữu ích, hãy cho một star!** ⭐
