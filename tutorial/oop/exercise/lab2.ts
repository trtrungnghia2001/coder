import readline from "readline";
// 1. Xây dựng lớp HinhChuNhat (Hình chữ nhật)
// Thuộc tính: chieuDai (chiều dài), chieuRong (chiều rộng).
// Phương thức:
// tinhDienTich(): Trả về diện tích hình chữ nhật.
// tinhChuVi(): Trả về chu vi hình chữ nhật.
// hienThiThongTin(): In ra chiều dài, chiều rộng, diện tích và chu vi.
class HinhChuNhat {
  chieuDai: number;
  chieuRong: number;

  constructor(chieuDai: number, chieuRong: number) {
    this.chieuDai = chieuDai;
    this.chieuRong = chieuRong;
  }

  tinhDienTich(): number {
    return this.chieuDai * this.chieuRong;
  }
  tinhChuVi(): number {
    return (this.chieuDai + this.chieuRong) * 2;
  }
  hienThiThongTin(): void {
    console.log(
      `chiều dài:${this.chieuDai}, chiều rộng:${
        this.chieuRong
      }, diện tích:${this.tinhDienTich()}, chu vi:${this.tinhChuVi()}`
    );
  }
}
const hcn = new HinhChuNhat(10, 7);
hcn.hienThiThongTin();
// 2. Xây dựng lớp SinhVien (Sinh viên)
// Thuộc tính: maSinhVien, hoTen, diemToan, diemLy, diemHoa.
// Phương thức:
// tinhDiemTrungBinh(): Trả về điểm trung bình của sinh viên.
// xepLoai(): Trả về xếp loại học lực (ví dụ: Giỏi, Khá, Trung bình, Yếu) dựa trên điểm trung bình.
// hienThiThongTin(): In ra tất cả thông tin của sinh viên bao gồm điểm trung bình và xếp loại.
class SinhVien {
  maSinhVien: string;
  hoTen: string;
  diemToan: number;
  diemLy: number;
  diemHoa: number;

  constructor(
    hoTen: string,
    diemToan: number,
    diemLy: number,
    diemHoa: number
  ) {
    this.maSinhVien = Date.now().toString();
    this.hoTen = hoTen;
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
  }
  tinhDiemTrungBinh(): number {
    return Number(
      ((this.diemHoa + this.diemLy + this.diemToan) / 3).toFixed(2)
    );
  }
  xepLoai(): string {
    let rank;
    if (this.tinhDiemTrungBinh() >= 8) {
      rank = `Giỏi`;
    } else if (this.tinhDiemTrungBinh() >= 6.5) {
      rank = `Khá`;
    } else if (this.tinhDiemTrungBinh() > 5) {
      rank = `Trung bình`;
    } else {
      rank = `Yếu`;
    }
    return rank;
  }
  hienThiThongTin(): void {
    console.log(
      this.maSinhVien +
        `\t` +
        this.hoTen +
        `\t` +
        this.diemToan +
        `\t` +
        this.diemLy +
        `\t` +
        this.diemHoa +
        `\t` +
        this.tinhDiemTrungBinh() +
        `\t` +
        this.xepLoai()
    );
  }
}
const sv1 = new SinhVien(`A`, 7, 6, 3);
const sv2 = new SinhVien(`B`, 7, 8, 3);
const sv3 = new SinhVien(`C`, 9, 8, 7);
const sv4 = new SinhVien(`D`, 3, 8, 5);
const sv5 = new SinhVien(`E`, 5, 7, 9);

const sv_arr = [sv1, sv2, sv3, sv4, sv5];

for (let index = 0; index < sv_arr.length; index++) {
  const element = sv_arr[index];
  element.hienThiThongTin();
}

// Bài tập nâng cao
// 3. Hệ thống quản lý thư viện (Sử dụng kế thừa)
// Xây dựng các lớp sau:
// Lớp cơ sở TaiLieu (Tài liệu):
// Thuộc tính: maTaiLieu, tenTaiLieu, nhaXuatBan.
// Phương thức: hienThiThongTin() (phương thức ảo/trừu tượng).
abstract class TaiLieu {
  maTaiLieu: string;
  tenTaiLieu: string;
  nhaXuatBan: string;
  constructor(tenTaiLieu: string, nhaXuatBan: string) {
    this.maTaiLieu = Date.now().toString();
    this.tenTaiLieu = tenTaiLieu;
    this.nhaXuatBan = nhaXuatBan;
  }
  abstract hienThiThongTin(): void;
}
// Các lớp kế thừa:
// Sach (Sách): Kế thừa từ TaiLieu.
// Thuộc tính riêng: tenTacGia, soTrang.
// Ghi đè phương thức: hienThiThongTin().
class Sach extends TaiLieu {
  tenTacGia: string;
  soTrang: number;
  constructor(
    tenTaiLieu: string,
    nhaXuatBan: string,
    tenTacGia: string,
    soTrang: number
  ) {
    super(tenTaiLieu, nhaXuatBan);
    this.tenTacGia = tenTacGia;
    this.soTrang = soTrang;
  }
  hienThiThongTin(): void {
    console.log(
      this.maTaiLieu +
        "\t" +
        this.tenTaiLieu +
        "\t" +
        this.nhaXuatBan +
        "\t" +
        this.tenTacGia +
        "\t" +
        this.soTrang
    );
  }
}
// TapChi (Tạp chí): Kế thừa từ TaiLieu.
// Thuộc tính riêng: soPhatHanh, thangPhatHanh.
// Ghi đè phương thức: hienThiThongTin().
class TapChi extends TaiLieu {
  soPhatHanh: string;
  thangPhatHanh: number;
  constructor(
    tenTaiLieu: string,
    nhaXuatBan: string,
    soPhatHanh: string,
    thangPhatHanh: number
  ) {
    super(tenTaiLieu, nhaXuatBan);
    this.thangPhatHanh = thangPhatHanh;
    this.soPhatHanh = soPhatHanh;
  }
  hienThiThongTin(): void {
    console.log(
      this.maTaiLieu +
        "\t" +
        this.tenTaiLieu +
        "\t" +
        this.nhaXuatBan +
        "\t" +
        this.soPhatHanh +
        "\t" +
        this.thangPhatHanh
    );
  }
}
// Bao (Báo): Kế thừa từ TaiLieu.
// Thuộc tính riêng: ngayPhatHanh.
// Ghi đè phương thức: hienThiThongTin().
class Bao extends TaiLieu {
  ngayPhatHanh: string;
  constructor(tenTaiLieu: string, nhaXuatBan: string, ngayPhatHanh: string) {
    super(tenTaiLieu, nhaXuatBan);
    this.ngayPhatHanh = ngayPhatHanh;
  }
  hienThiThongTin(): void {
    console.log(
      this.maTaiLieu +
        "\t" +
        this.tenTaiLieu +
        "\t" +
        this.nhaXuatBan +
        "\t" +
        this.ngayPhatHanh
    );
  }
}
// Lớp QuanLyThuVien (Quản lý thư viện):
// Thuộc tính: Danh sách các TaiLieu.
// Phương thức:
// themTaiLieu(TaiLieu taiLieu): Thêm một tài liệu vào danh sách.
// xoaTaiLieu(String maTaiLieu): Xóa tài liệu theo mã.
// timKiemTheoLoai(String loaiTaiLieu): Tìm kiếm và hiển thị các tài liệu theo loại (sách, tạp chí, báo).
class QuanLyThuVien {
  tailieus: TaiLieu[];
  constructor() {
    this.tailieus = [];
  }
  themTaiLieu(taiLieu: TaiLieu): void {
    this.tailieus.push(taiLieu);
  }
  xoaTaiLieu(maTaiLieu: string): void {
    this.tailieus = this.tailieus.filter(
      (item) => item.maTaiLieu !== maTaiLieu
    );
  }
  timKiemTheoLoai(loaiTaiLieu: "sách" | "tạp chí" | "báo") {
    if (loaiTaiLieu === "sách") {
      return this.tailieus.filter((item) => item instanceof Sach);
    }
    if (loaiTaiLieu === "tạp chí") {
      return this.tailieus.filter((item) => item instanceof TapChi);
    }
    if (loaiTaiLieu === "báo") {
      return this.tailieus.filter((item) => item instanceof Bao);
    }
  }
}
const sach1 = new Sach("sach 1", `nsb 1`, `tg 1`, 100);
const sach2 = new Sach("sach 2", `nsb 1`, `tg 2`, 90);
const sach3 = new Sach("sach 3", `nsb 2`, `tg 1`, 58);
const sach4 = new Sach("sach 4", `nsb 3`, `tg 3`, 10);

const tapchi1 = new TapChi("tapchi 1", `nsb 1`, `sph001`, 3);
const tapchi2 = new TapChi("tapchi 2", `nsb 2`, `sph001`, 4);
const tapchi3 = new TapChi("tapchi 3", `nsb 2`, `sph002`, 3);

const bao1 = new Bao("bao 1", `nsb 1`, `sph001`);

const qltv = new QuanLyThuVien();
qltv.themTaiLieu(sach1);
qltv.themTaiLieu(sach2);
qltv.themTaiLieu(sach3);
qltv.themTaiLieu(sach4);
qltv.themTaiLieu(tapchi1);
qltv.themTaiLieu(tapchi2);
qltv.themTaiLieu(tapchi3);
qltv.themTaiLieu(bao1);

console.log(qltv.timKiemTheoLoai("báo"));
console.log(qltv.xoaTaiLieu(bao1.maTaiLieu));
console.log(qltv.tailieus);

// 4. Trò chơi "Đoán số" (Sử dụng đóng gói và giao diện)
// Lớp Game:
// Thuộc tính: soBiMat (số cần đoán, được tạo ngẫu nhiên).
// Phương thức:
// taoSoBiMat(): Tạo số ngẫu nhiên.
// doanSo(int soDoan): So sánh số người chơi đoán với soBiMat và trả về kết quả (Lớn hơn, Nhỏ hơn, Chính xác).
class Game {
  soBiMat: number;
  constructor() {
    this.soBiMat = 0;
  }
  taoSoBiMat(): void {
    const max = 1000;
    const min = 100;
    this.soBiMat = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  doanSo(soDoan: number): void {
    if (this.soBiMat > soDoan) {
      console.log(`Lớn hơn`);
    } else if (this.soBiMat < soDoan) {
      console.log(`Nhỏ hơn`);
    } else {
      console.log(`Chính xác`);
    }
  }
}
// Giao diện ChoiDuoc (Có thể chơi):
// Phương thức: batDauTroChoi().
interface ChoiDuoc {
  batDauTroChoi(): void;
}
// Lớp NguoiChoi (Người chơi):
// Thuộc tính: tenNguoiChoi.
// Phương thức: datCuoc() (người chơi nhập số đoán).
// Kết hợp: Tạo một chương trình chính để mô phỏng trò chơi, trong đó người chơi liên tục đoán số cho đến khi đúng.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class NguoiChoi implements ChoiDuoc {
  tenNguoiChoi: string;
  constructor(tenNguoiChoi: string) {
    this.tenNguoiChoi = tenNguoiChoi;
  }
  datCuoc(): void {}
  batDauTroChoi(): void {
    const game = new Game();
    game.taoSoBiMat();

    let so;
    do {
      rl.question(`Nhap so: `, (answer) => {
        console.log(game.soBiMat);

        game.doanSo(Number(answer));
      });
    } while (game.soBiMat !== so);
  }
}
const ngchoi = new NguoiChoi(`Nghia`);
// ngchoi.batDauTroChoi();
