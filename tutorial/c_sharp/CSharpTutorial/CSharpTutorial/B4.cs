//Bài tập tổng hợp: Quản lý điểm học sinh
//Mô tả:
//Nhập số lượng học sinh n

//Tạo mảng điểm ngẫu nhiên cho từng học sinh (0 đến 10)

//Viết hàm nhập mảng, xuất mảng, tìm điểm cao nhất, thấp nhất

//Tính điểm trung bình

//Đếm số học sinh đạt (>=5) và không đạt (<5)

//Sắp xếp điểm theo thứ tự giảm dần

//In ra kết quả cuối cùng

using System;

class B4
{
    static void nhap(float[] a)
    {
        Random random = new Random();
        for (int i = 0; i < a.Length; i++)
        {
            a[i] = (float)Math.Round(random.NextDouble() * (10 - 1),1);
        }
    }
    static void xuat(float[] a)
    {
        foreach (var item in a)
        {
            Console.Write(item + "\t");
        }
        Console.WriteLine();
        
    }
    static void minMax(float[] a)
    {
        float min = a[0], max = a[0];
        foreach (var item in a)
        {
            if (item < min) min = item;
            if (item > max) max = item;
        }

        Console.WriteLine("Min: " + min);
        Console.WriteLine("Max: " + max);

    }
    static void DTB(float[] a)
    {
        float dtb = 0;
        foreach (var item in a)
        {
            dtb += item;
        }

        Console.WriteLine("DTB: " + Math.Round(dtb / a.Length, 1));

    }
    static void demDatVaKhongDat(float[] a)
    {
        int soDat = 0;
        int soKhongDat = 0;

        foreach (var item in a)
        {
            if (item >= 5) soDat++;
            else soKhongDat++;
        }

        Console.WriteLine("So dat: " + soDat);
        Console.WriteLine("So khong dat: " + soKhongDat);

    }
    static void sapXep(float[] a)
    {
        for (int i = 0; i < a.Length; i++)
        {
            for ( int j = 0; j < a.Length - i -1; j++)
            {
                if (a[j]> a[j+1])
                {
                    float temp = a[j];
                    a[j] = a[j+1];
                    a[j+1] = temp;
                }
            }
        }

    }
    public static void Main()
    {
        Random random = new Random();

        int n = 5;

        float[] a = new float[n];

        
        nhap(a);
        xuat(a);
        minMax(a);
        DTB(a);
        demDatVaKhongDat(a);
        sapXep(a);
        xuat(a);
    }
}