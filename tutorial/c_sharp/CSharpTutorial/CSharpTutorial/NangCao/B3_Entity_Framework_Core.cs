using Microsoft.EntityFrameworkCore;
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public int PublishedYear { get; set; }
    public bool IsAvailable { get; set; } = true;
}
public class BookDTO
{
    public string Title { get; set; }
    public string Author { get; set; }
    public int PublishedYear { get; set; }
    public bool IsAvailable { get; set; } = true;
}
public class Member
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime JoinDate { get; set; } = DateTime.Now;
}

public class LibraryContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Member> Members { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=LibraryDb;Trusted_Connection=True;");
    }
}




class QLSV
{

    private readonly LibraryContext db;
    public QLSV(LibraryContext db)
    {
        this.db = db;
    }
    public void addBook(Book book)
    {

        db.Books.Add(book);

        Console.WriteLine("Added successfully!");
        db.SaveChanges();
    }
    public void updateId(int Id, BookDTO book)
    {
        var data = db.Books.FirstOrDefault(i => i.Id == Id);
        if (data == null)
        {
            Console.WriteLine("Result Not Found");
            return;
        }

        data.Title = book.Title;
        data.Author = book.Author;
        data.PublishedYear = book.PublishedYear;

        Console.WriteLine("Updated successfully!");
        db.SaveChanges();
    }
    public void deleteId(int Id)
    {
        var data = db.Books.FirstOrDefault(i => i.Id == Id);
        if (data == null)
        {
            Console.WriteLine("Result Not Found");
            return;
        }

        db.Books.Remove(data);

        Console.WriteLine("Deleted successfully!");
        db.SaveChanges();
    }
    public void getId(int Id)
    {
        var data = db.Books.FirstOrDefault(i => i.Id == Id);
        if (data == null)
        {
            Console.WriteLine("Result Not Found");
            return;
        }

        Console.WriteLine($"{data.Id}: {data.Title} - {data.Author} ({data.PublishedYear})");
    }
    public void getAll()
    {
        foreach (var item in db.Books)
        {
            Console.WriteLine($"{item.Id}: {item.Title} - {item.Author} ({item.PublishedYear})");
        }
        {
        }
    }
}

class B3_Entity_Framework_Core
{
    public static void Main() {

        using var db = new LibraryContext();
        var qlsv = new QLSV(db);

        var book1 = new Book
        {
            Title = "Lập trình C# cơ bản",
            Author = "Nguyễn Văn A",
            PublishedYear = 2023
        };
        var book2 = new Book
        {
            Title = "Lập trình Java cơ bản",
            Author = "Nguyễn Văn B",
            PublishedYear = 2023
        };
        qlsv.addBook(book1);
        qlsv.addBook(book2);

        qlsv.getAll();
    }
}