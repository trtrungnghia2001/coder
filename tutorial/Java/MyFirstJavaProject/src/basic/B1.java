package basic;

import java.util.Scanner;


public class B1 {


    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhap chieu dai: ");
        float chieudai = scanner.nextFloat();
        System.out.print("Nhap chieu rong: ");
        float chieurong = scanner.nextFloat();

        float dientich = chieudai * chieurong;
        float chuvi = (chieudai + chieurong) * 2;

        System.out.println("Chu vi: " + chuvi);
        System.out.println("Dien tich: " + dientich);

        scanner.close();
    }
}
