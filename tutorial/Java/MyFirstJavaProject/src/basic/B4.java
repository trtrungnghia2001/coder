package basic;

import java.util.Scanner;

abstract class DongVat{
    private String ten;
    private  int tuoi;

    public DongVat(String ten, int tuoi){
        this.ten= ten;
        this.tuoi = tuoi;
    }

    public int getTuoi() {
        return tuoi;
    }

    public String getTen() {
        return ten;
    }

    public abstract void tiengKeu();

    public void an(){
        System.out.println(this.ten+ " dang an");
    }
}

interface BayDuoc{
    public void catCanh();
    public void haCanh();
}

class Cho extends DongVat{
    private String giong;


    public Cho(String ten, int tuoi, String giong) {
        super(ten,tuoi);
        this.giong = giong;
    }

    @Override
    public void tiengKeu(){
        System.out.println(this.getTen()+ " Gau gau!");
    }
}

class Chim extends DongVat implements BayDuoc{


    public Chim(String ten, int tuoi) {
        super(ten,tuoi);
    }

    @Override
    public void tiengKeu(){
        System.out.println(this.getTen()+ " đang hót líu lo!");
    }

    @Override
    public void haCanh(){
        System.out.println(this.getTen()+ " đang hạ cánh!");
    }

    @Override
    public void catCanh(){
        System.out.println(this.getTen()+ " đang cất cánh!");
    }
}

class  QuanLyDongVat{
    int n;
    DongVat[] arr;

    public void Nhap(){
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhap sl: "); n= scanner.nextInt(); scanner.nextLine();
        arr = new DongVat[n];

        for (int i = 0; i < arr.length; i++) {
            System.out.print("Nhap loai: 1.cho 2.chim "); int loai = scanner.nextInt();scanner.nextLine();
            System.out.print("Nhap ten: "); String ten = scanner.nextLine();
            System.out.print("Nhap tuoi: "); int tuoi = scanner.nextInt(); scanner.nextLine();

            if(loai == 1){
                System.out.print("Nhap giong: "); String giong = scanner.nextLine();
                Cho cho = new Cho(ten,tuoi,giong);
                arr[i] = cho;
            }else {
                Chim chim = new Chim(ten,tuoi);
                arr[i] = chim;
            }
        }

        scanner.close();
    }

    public void Xuat(){
        for (int i = 0; i < arr.length; i++) {

            if(arr[i] == null) break;;

            System.out.println(arr[i].getTen()+"\t"+arr[i].getTuoi());
            arr[i].an();
            arr[i].tiengKeu();

            if(arr[i] instanceof BayDuoc){
                BayDuoc chimBayDuoc = (BayDuoc)arr[i];

                chimBayDuoc.catCanh();
                chimBayDuoc.haCanh();
            }
        }
    }
}
public class B4 {
    public static void main(String[] args){

        QuanLyDongVat qldv = new QuanLyDongVat();

        qldv.Nhap();
        qldv.Xuat();
    }

}
