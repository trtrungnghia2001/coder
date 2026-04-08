//Tạo chương trình quản lý học sinh cho phép người dùng:

//✅ Nhập học sinh mới

//📋 Hiển thị danh sách

//🔍 Tìm theo tên

//📊 Thống kê học sinh đạt / không đạt

//📥 Ghi file

//📂 Đọc từ file

//🔁 Sắp xếp theo điểm

//❌ Thoát

class HocSinh
{
    public string Ten {  get; set; }
    public int Tuoi {  get; set; }
    public float Diem {  get; set; }

    public HocSinh(string Ten, int Tuoi, float Diem) { 
        this.Ten = Ten;
        this.Tuoi = Tuoi;
        this.Diem= Diem;
    }
    public void Nhap()
    {
        Console.Write("Ten: "); this.Ten = Console.ReadLine();
        Console.Write("Tuoi: "); this.Tuoi = int.Parse(Console.ReadLine());
        Console.Write("Diem: "); this.Diem = float.Parse(Console.ReadLine());
    }
    public  void HienThi()
    {
        Console.WriteLine($"{Ten}\t|\t{Tuoi}\t|\t{Diem}");
    }
    
}

class QLHS
{
    private List<HocSinh> list = new List<HocSinh>();

    private string fileName = "QLHS";

    public void BangDieuKhien() {

        int luaChon;
        do
        {
            this.Menu();

            Console.Write("Nhap lua chon: "); luaChon = int.Parse(Console.ReadLine());
            switch (luaChon)
            {
                case 0:
                    Console.WriteLine("Da Thoat Chuong Trinh");
                    break;
                case 1:
                    this.Nhap();
                    break;
                case 2:
                    this.HienThi();
                    break;
                case 3:
                    this.TimTheoTen();
                    break;
                case 4:
                    this.ThongKeDatKhongDat();
                    break;
                case 5:
                    this.GhiFile();
                    break;
                case 6:
                    this.DocFile();
                    break;
                case 7:
                    this.SapXepTheoDiem();
                    break;

                default:
                    Console.WriteLine("Khong co lua chon nay");
                    break;
            }
        }
        while (luaChon!=0);

        
    }
    public void Menu()
    {
        Console.WriteLine("=========== QLHS ===========");
        Console.WriteLine("1. Nhap Hs moi");
        Console.WriteLine("2. Hien Thi");
        Console.WriteLine("3. Tim theo ten");
        Console.WriteLine("4. Thong ke dat/ khong dat");
        Console.WriteLine("5. Ghi file");
        Console.WriteLine("6. Doc tu file");
        Console.WriteLine("7. Sap xep theo diem");
        Console.WriteLine("0. Thoat");
    }
    void TieuDe()
    {
        Console.WriteLine("Ten\t|\tTuoi\t|\tDiem");
    }
    public void Nhap()
    {
        HocSinh hs = new HocSinh("",0,0);
        hs.Nhap();
        this.list.Add(hs);
    }
    public void HienThi()
    {
        this.TieuDe();
        foreach (var item in this.list)
        {
            item.HienThi();
        }
    }
    public void TimTheoTen()
    {
        Console.Write("Nhap ten: "); string ten = Console.ReadLine();

        List<HocSinh> hsTimKiem = new List<HocSinh>();

        foreach (var item in this.list)
        {
            if (item.Ten.ToLower().Contains(ten.ToLower()))
            {
                hsTimKiem.Add(item);
            }
        }

        if (hsTimKiem.Count > 0)
        {
            this.TieuDe();
            foreach (var item in hsTimKiem)
            {
                item.HienThi();
            }
        }
        else
        {
            Console.WriteLine("Khong tim thay hs co ten nay");
        }
    }
    public void ThongKeDatKhongDat()
    {

        int soHsDat = 0;
        int soHsKhongDat = 0;

        foreach (var item in this.list)
        {
            if(item.Diem>=5) soHsDat++;
            else soHsKhongDat++;
        }
        Console.WriteLine("So HS dat: " + soHsDat);
        Console.WriteLine("So HS khong dat: " + soHsKhongDat);

    }
    public void GhiFile()
    {
        using (StreamWriter sw = new StreamWriter(this.fileName))
        {
            foreach (var item in this.list)
            {
                sw.WriteLine($"{item.Ten};{item.Tuoi};{item.Diem}");
            }
        }
        Console.WriteLine($"Da ghi vao File: {this.fileName}");
        Console.WriteLine($"Vi tri File: {Path.GetFullPath(this.fileName)}");


    }
    public void DocFile()
    {
        if (!File.Exists(this.fileName))
        {
            Console.WriteLine("File khong ton tai");
            return;
        }

        string[] lines = File.ReadAllLines(this.fileName);
        foreach (string line in lines) {
            string[] parts = line.Split(';');
            if (parts.Length == 3)
            {
                string ten = parts[0];
                int tuoi = int.Parse(parts[1]);
                float diem = float.Parse(parts[2]);
                this.list.Add(new HocSinh(ten, tuoi, diem));
            }
        }

        Console.WriteLine($"Da doc {lines.Length} hs tu file {this.fileName}");
    }
    public void SapXepTheoDiem()
    {
        for (int i = 0; i < this.list.Count; i++)
        {
            for (int j = 0; j < this.list.Count - i -1; j++)
            {
                if (list[j].Diem > list[j + 1].Diem)
                {
                    HocSinh temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("Sap xep thanh cong!");


    }

}
class B5
{
    public static void Main() {
        QLHS qlhs = new QLHS();
        qlhs.BangDieuKhien();
    }
}