package basic;

import java.util.Scanner;

class SanPham {
    String maSanPham;
    String tenSanPham;
    int giaBan;
    int soLuongTonKho;

    public SanPham(String maSanPham, String tenSanPham, int giaBan, int soLuongTonKho) {
        this.maSanPham = maSanPham;
        this.tenSanPham = tenSanPham;
        this.giaBan = giaBan;
        this.soLuongTonKho = soLuongTonKho;
    }

    public int tinhTongGiaTriTonKho() {
        return giaBan * soLuongTonKho;
    }

    public void hienThiThongTin() {
        System.out.println(maSanPham + "\t" + tenSanPham + "\t" + giaBan + "\t" + soLuongTonKho);
    }
}

class QuanLyCuaHang {
    SanPham[] sanPhams;

    public void Nhap() {
        Scanner scanner = new Scanner(System.in);

        int n;
        System.out.print("Nhập số lượng sản phẩm: ");
        n = scanner.nextInt();
        scanner.nextLine();

        sanPhams = new SanPham[n];

        for (int i = 0; i < sanPhams.length; i++) {
            System.out.print("Ma: ");
            String ma = scanner.nextLine();
            System.out.print("Ten: ");
            String name = scanner.nextLine();
            System.out.print("Gia: ");
            int giaBan = scanner.nextInt();
            System.out.print("Sl: ");
            int soLuong = scanner.nextInt();
            scanner.nextLine();

            SanPham sp = new SanPham(ma, name, giaBan, soLuong);

            sanPhams[i] = sp;

        }

        scanner.close();

    }

    public  void  Xuat(){
        System.out.println("Id\tTen\tGia\tSl");
        for (int i = 0; i < sanPhams.length; i++) {
            sanPhams[i].hienThiThongTin();
        }
    }

    public  void  TongTonKho(){
        int result=0;
        for (int i = 0; i < sanPhams.length; i++) {
            result += sanPhams[i].tinhTongGiaTriTonKho();
        }
        System.out.println("Tong gia tri ton kho: "+result);
    }
}


public class B3 {
    public static void main(String[] args) {
        QuanLyCuaHang qlch = new QuanLyCuaHang();

        qlch.Nhap();
        qlch.Xuat();
        qlch.TongTonKho();
    }
}
