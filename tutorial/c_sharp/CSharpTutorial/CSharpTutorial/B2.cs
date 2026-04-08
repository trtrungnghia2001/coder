//In va tinh tong các số từ 1 đến n
//Nhập nhiều số cho đến khi gặp số âm
class B2
{
    public static void Main()
    {
        int n = 3;
        int sum = 0;
        for (int i = 1; i <= n; i++)
        {
            sum += i;
        }
        Console.WriteLine("Sum: "+ sum);

        int so;
        do
        {
            Console.WriteLine("Nhap so: ");
            so = int.Parse(Console.ReadLine());
        }
        while (so>=0);
    }
}




