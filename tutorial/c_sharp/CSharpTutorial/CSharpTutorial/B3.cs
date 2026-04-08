//Nhập và in mảng
//Tính tổng các phần tử trong mảng
//Tìm phần tử lớn nhất, nhỏ nhất trong mảng
//Sắp xếp mảng theo thứ tự tăng dần

class B3 {
    public static void Main() {
        int n = 3;
        int[] a = new int[n];
        Random random = new Random();

        for (int i = 0; i < n; i++)
        {

            a[i] = random.Next(i + 1, 1000 - i);
        }


        int sum = 0;
        int max = a[0];
        int min = a[0];
        Console.WriteLine("In truoc khi sap xep");
        foreach (var item in a)
        {
            Console.WriteLine(item);
            sum += item;
            if (max < item) max= item;
            if (min > item) min = item;
        }

        Console.WriteLine("Sum: "+ sum);
        Console.WriteLine("Max: "+ max);
        Console.WriteLine("Min: "+ min);

        for (int i = 0; i < a.Length; i++)
        {
            for (int j = 0; j < a.Length-i-1; j++)
            {
                if (a[j]> a[j + 1])
                {
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }
        Console.WriteLine("In sau khi sap xep");
        foreach (var item in a)
        {
            Console.WriteLine(item);
        }

        int soNgauNhien = random.Next(1, 100);
        int soLanDoan = 0;
        int soDoan;
        do
        {
            Console.WriteLine("Nhap so: ");
            soDoan = int.Parse(Console.ReadLine());

            if (soDoan > soNgauNhien) Console.WriteLine("Giam xuong");
            if (soDoan < soNgauNhien) Console.WriteLine("Tang len");
            soLanDoan++;
        }
        while (soNgauNhien!= soDoan);

        Console.WriteLine("So lan doan: " + soLanDoan);

    }
}
