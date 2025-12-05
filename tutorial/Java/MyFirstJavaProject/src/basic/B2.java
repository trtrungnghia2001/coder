package basic;

import java.util.Scanner;

public class B2 {

    static float tinhDiemTrungBinh(float[] arr) {
        float dtb = 0;

        for (int i = 0; i < arr.length; i++) {
            dtb += arr[i];
        }

        return Math.round(dtb / arr.length);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int n = 5;
        float[] arr = new float[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Nhap diem: ");
            arr[i] = scanner.nextFloat();
        }

        System.out.println("DTB: " + tinhDiemTrungBinh(arr));
        scanner.close();
    }

}
