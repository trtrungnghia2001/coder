// Bài tập 1: Quản lý sách trong thư viện
class Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}

class Library {
  private books: Book[];

  constructor() {
    this.books = [];
  }

  addBook(book: Book): void {
    const checkIsbn = this.books.find((item) => item.isbn === book.isbn);

    if (checkIsbn) {
      console.log(`Error: Book with ISBN "${book.isbn}" already exists.`);
      return;
    }

    this.books.push(book);
    console.log(`Added book: "${book.title}" by ${book.author}`);
    return;
  }

  removeBook(isbn: string): boolean {
    this.books = this.books.filter((item) => item.isbn !== isbn);

    const checkBook = this.books.find((item) => (item.isbn = isbn));

    if (checkBook) {
      console.log(`Error: Book with ISBN "${isbn}" not found.`);
      return false;
    } else {
      console.log(`Removed book with ISBN: ${isbn}`);
      return true;
    }
  }

  borrowBook(isbn: string): boolean {
    const checkBook = this.books.find((item) => (item.isbn = isbn));

    if (!checkBook) {
      console.log(`Error: Book with ISBN "${isbn}" not found.`);
      return false;
    }

    if (!checkBook.isAvailable) {
      console.log(`Book "${checkBook.title}" is currently not available.`);
      return false;
    }

    this.books = this.books.map((item) =>
      item.isbn === isbn ? { ...item, isAvailable: false } : item
    );

    return true;
  }

  returnBook(isbn: string): boolean {
    const checkBook = this.books.find((item) => (item.isbn = isbn));

    if (!checkBook) {
      console.log(`Error: Book with ISBN "${isbn}" not found.`);
      return false;
    }

    this.books = this.books.map((item) =>
      item.isbn === isbn ? { ...item, isAvailable: true } : item
    );

    return true;
  }

  listAllBooks(): void {
    this.books.forEach((item) => {
      console.log(
        `Title: ${item.title}, Author: ${item.author}, ISBN: ${
          item.isbn
        }, Available: ${item.isAvailable ? "Yes" : "No"}`
      );
    });
  }

  findBookByTitle(title: string): Book[] {
    const results = this.books.filter((item) =>
      item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    );
    return results;
  }
}

// Bài tập 2: Hệ thống đăng ký khóa học

class Person {
  private id: string;
  private name: string;

  constructor(name: string) {
    this.id = Date.now().toString();
    this.name = name;
  }

  displayPersonInfo(): void {
    console.log(`Info Person`);
  }
}
class Instructor extends Person {
  taughtCourses: Course[];
  constructor(name: string) {
    super(name);
    this.taughtCourses = [];
  }
  assignCourse(course: Course): void {
    const check = this.taughtCourses.find((item) => item.code === course.code);
    if (check) {
      console.log(`already assignCourse`);
      return;
    } else {
      console.log(`assignCourse successfully`);
      this.taughtCourses.push(course);
      return;
    }
  }
  override displayPersonInfo(): void {
    console.log(`Info Instructor`);
  }
}
class Student extends Person {
  enrolledCourses: Course[];
  constructor(name: string) {
    super(name);
    this.enrolledCourses = [];
  }

  enroll(course: Course): void {
    const check = this.enrolledCourses.find(
      (item) => item.code === course.code
    );
    if (check) {
      console.log(`already enrolledCourses`);
      return;
    } else {
      console.log(`enrolledCourses successfully`);
      this.enrolledCourses.push(course);
      return;
    }
  }
  override displayPersonInfo(): void {
    console.log(`Info Student`);
  }
}
class Course {
  title: string;
  code: string;
  instructor: Instructor;

  constructor(title: string, code: string, instructor: Instructor) {
    this.title = title;
    this.code = code;
    this.instructor = instructor;
  }

  setInstructor(instructor: Instructor): void {
    this.instructor = instructor;
  }
}

// Bài tập 3: Động vật trong vườn thú (Nâng cao hơn)
abstract class Animal {
  name: string;
  age: number;
  sound: string;

  constructor(name: string, age: number, sound: string) {
    this.name = name;
    this.age = age;
    this.sound = sound;
  }

  abstract makeSound(): void;
}

class Lion extends Animal {
  maneSize: string;
  constructor(name: string, age: number, sound: string, maneSize: string) {
    super(name, age, sound);
    this.maneSize = maneSize;
  }
  makeSound(): void {
    console.log(`makeSound: Lion`);
  }
}
class Elephant extends Animal {
  trunkLength: number;
  constructor(name: string, age: number, sound: string, trunkLength: number) {
    super(name, age, sound);
    this.trunkLength = trunkLength;
  }
  makeSound(): void {
    console.log(`makeSound: Elephant`);
  }
}
class Snake extends Animal {
  isPoisonous: boolean;
  constructor(name: string, age: number, sound: string, isPoisonous: boolean) {
    super(name, age, sound);
    this.isPoisonous = isPoisonous;
  }
  makeSound(): void {
    console.log(`makeSound: Snake`);
  }
}
interface Swimmer {
  swim(): void;
}
class Duck extends Animal implements Swimmer {
  constructor(name: string, age: number, sound: string) {
    super(name, age, sound);
  }
  makeSound(): void {
    console.log(`makeSound: Snake`);
  }
  swim(): void {
    console.log(`swim`);
  }
}

class Zoo {
  animals: Animal[];

  constructor() {
    this.animals = [];
  }
  addAnimal(animal: Animal): void {
    this.animals.push(animal);
  }
  makeAllAnimalsSound(): void {
    this.animals.forEach((item) => {
      item.makeSound();
    });
  }
  listSwimmers(): void {
    this.animals.forEach((item) => {
      if ((item as any).swim) {
        console.log(item.name + ` is a swimmer`);
      }
    });
  }
}
