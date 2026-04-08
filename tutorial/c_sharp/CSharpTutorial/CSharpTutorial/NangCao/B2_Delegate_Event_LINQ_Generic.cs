//delegate là biến tham chiếu đến phương thức, cho phép bạn truyền hàm như một đối tượng.

//event dùng để kích hoạt các hành động khi một điều kiện xảy ra.
//  event sử dụng delegate bên trong
//  += để đăng ký hàm xử lý sự kiện
//  .Invoke() để kích hoạt

//LINQ Dùng để lọc, tìm kiếm, sắp xếp nhanh trong danh sách

delegate float MathOperation(float a, float b); // Khai báo delegate

class User
{
    public event EventHandler OnLogin;

    public void Login()
    {
        OnLogin.Invoke(this, EventArgs.Empty);
    }
}

class Student
{
    public string Ten { get; set; }
    public float Diem { get; set; }
    public Student(string name, float diem)
    {
        this.Ten = name;
        this.Diem = diem;
    }
}

class Storage <T>{
    private List<T> Items = new List<T>();

    public void AddItem(T item) {
        this.Items.Add(item);
    }
    public void GetAll() {
        foreach (var item in Items)
        {
            Console.WriteLine(item); // not obj
        }
    }
}


class B2_Delegate_Event_LINQ_Generic
{
    static float Add(float a, float b) => a + b;
    static float Sub(float a, float b) => a - b;
    static float Multip(float a, float b) => a * b;
    static float Div(float a, float b)
    {
        try
        {
            return a / b;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return 0;
        }
        ;
    }
    
    static void User_OnLogin(object sender, EventArgs e)
    {
        Console.WriteLine("User has logged in");
    }

    public static void Main()
    {
        MathOperation mo;
        mo = Add;
        Console.WriteLine("a+b= " + mo(3, 4));
        mo = Sub;
        Console.WriteLine("a-b= " + mo(3, 4));
        mo= Multip;
        Console.WriteLine("a*b= " + mo(3, 4));
        mo= Div;
        Console.WriteLine("a/b= " + mo(3, 4));

        List<Student> students = new List<Student>()
        {
            new Student("Nghia",10),
            new Student("Phuong",8),
            new Student("Anh",4),
            new Student("Quynh",6),
        };
        var studentsGreaterThan7 = students.Where(s => s.Diem > 7).ToList();
        foreach (var item in studentsGreaterThan7)
        {
            Console.WriteLine($"{item.Ten}\t{item.Diem}");
        }
        var countStudentsGreaterThan7 = students.Count(s => s.Diem > 8);
        Console.WriteLine("Count: "+ countStudentsGreaterThan7);

        var user = new User();
        user.OnLogin += User_OnLogin;
        user.Login();


        Storage<int> storage = new Storage<int>();
        storage.AddItem(1);
        storage.AddItem(2);
        storage.AddItem(3);
        storage.GetAll();
    }
}