//Bài 01: Tính tổng 2 số nguyên
//Bài 02: Tính diện tích hình tròn
//Bài 03: Kiểm tra số chẵn / lẻ   
//Bài 04: So sánh hai số nguyên
//Bài 05: Xếp loại học lực

class B1
{
    public static void Main()
    {
        Console.WriteLine("a= "); int a = int.Parse(Console.ReadLine());
        Console.WriteLine("b= "); int b = int.Parse(Console.ReadLine());
        Console.WriteLine("Sum= "+ (a+b));


        Console.WriteLine("r= "); float r = float.Parse(Console.ReadLine());
        Console.WriteLine("Dien tich hinh tron= " + (Math.PI* r*r));

        Console.WriteLine("so= "); int so = int.Parse(Console.ReadLine());
        Console.WriteLine(so + " la so " + (so % 2 == 0 ? "chan" : "le"));


        Console.WriteLine("so1= "); int so1 = int.Parse(Console.ReadLine());
        Console.WriteLine("so2= "); int so2 = int.Parse(Console.ReadLine());
        Console.WriteLine(so1 + (so1>so2? " lon hon ":" nho hon ") +so2);

        Console.WriteLine("diem= "); float diem = float.Parse(Console.ReadLine());
        string xepLoai = "";
        if (diem >= 8) xepLoai = "Gioi";
        else if (diem >= 6.5) xepLoai = "Kha";
        else if (diem >= 5) xepLoai = "Trung Binh";
        else  xepLoai = "Yeu";
        Console.WriteLine(xepLoai);
    }
}


