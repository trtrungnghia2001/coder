#include <iostream>
#include <cstring>
#include <string>
using namespace std;

class Car{
private:
	string brand;
	string model;
	int year;
	int speed;

public:	
	Car(string b, string m, int y){
		brand =b;
		model=m;
		year=y;
		speed=0;
	}
	void accelerate(int amount){
		speed += amount;
		cout<<"Toc do: "<<speed<<endl;
	}
	void brake(int amount){
		speed -= amount;
		cout<<"Toc do: "<<speed<<endl;
	}
	void displayInfo(){
		cout<<brand<<"\t";
		cout<<model<<"\t";
		cout<<year<<"\t";
		cout<<speed<<endl;
	}
};

class Dog{
private:
	string name;
	string breed;
	int age;
	
public:
	Dog(string n, string b, int a){
		name=n;
		breed=b;
		age=a;
	}	
	bark(){
		cout<<name<<" dang sua: Woof! Woof!"<<endl;
	}
	displayInfo(){
		cout<<name<<"\t";
		cout<<breed<<"\t";
		cout<<age<<endl;
	}
};

class BankAccount{
	private:
		string accountNumber;
		string accountHolderName;
		double balance;
	public:
		BankAccount(string aN, string aHN, double b){
			accountNumber=aN;
			accountHolderName=aHN;
			if(b<0){
				balance=0;
			}else{
				balance=b;
			}
			cout<<"Tai khoan "<<accountNumber<<" cua "<<accountHolderName<<" da duoc tao"<<endl;
		}
		~BankAccount(){
			cout<<"Tai khoan "<<accountNumber<<" da bi huy"<<endl;
		}
		deposit(double amount){
			if(amount<0){
				cout<<"ERROR. Khong thay doi so du"<<endl;
			}else{
				balance += amount;
			}
		}
		withdraw(double amount){
			if(amount<0){
				cout<<"ERROR. Khong thay doi so du"<<endl;
			}else if(amount>balance){
				cout<<"ERROR. So du khong du."<<endl;
			}else{
				balance += amount;
			}
		}
		string getAccountNumber(){
			return accountNumber;
		}
		string getAccountHolderName(){
			return accountHolderName;
		}
		double getBalance(){
			return balance;	
		}
		displayAccountInfo(){
			cout<<"STK: "<<accountNumber<<endl;
			cout<<"Ten: "<<accountHolderName<<endl;
			cout<<"So du: "<<balance<<endl;
		}
};

class Shape{
	protected:
		string color;
	public:
	Shape(string color){
		this->color = color;
		cout<<"Shape da duoc tao"<<endl;
	}
	~Shape(){
		cout<<"Shape da duoc huy"<<endl;
	}
	displayColor(){
		cout<<this->color<<endl;
	}
};

class Circle: public Shape{
	private:
		double radius;
	public:
		Circle(string color, double radius ):Shape(color){
			this->radius = radius;
			cout<<"Circle da duoc tao"<<endl;
		}
		~Circle(){
			cout<<"Circle da duoc huy"<<endl;
		}
		calculateArea(){
			const double PI = 3.14159;
			cout<<"Area: "<< PI*radius*radius<<endl;
		}
};

class Rectangle: public Shape{
	private:
		double w;
		double h;
	public:
		Rectangle(string color, double w, double h ):Shape(color){
			this->w = w;
			this->h= h;
			cout<<"Rectangle da duoc tao"<<endl;
		}
		~Rectangle(){
			cout<<"Rectangle da duoc huy"<<endl;
		}
		calculateArea(){
			cout<<"Area: "<< w*h<<endl;
		}
};

class Animal{
	protected:
		string name;
	public:
		Animal(string name){
			this->name=name;
			cout << "Animal Constructor: " << this->name << " da duoc tao."<<endl;
		}
		virtual ~Animal(){
			this->name=name;
			cout << "Animal Destructor: " << this->name << " da bi huy."<<endl;
		}
		virtual void makeSound(){
			cout<<this->name<<" phat ra mot am thanh chung chung."<<endl;
		}
		string getName(){
			return this->name;
		}
};

class Duck: public Animal{
	public:
	Duck(string n):Animal(n){
		std::cout << "Duck Constructor: " << name << " da duoc tao."<<endl;
	}
	~Duck() override {
        std::cout << "Duck Destructor: " << name << " da bi huy."<<endl;
    }
    void makeSound() override{
    	cout<< this->name << ": Quac, quac, ..."<<endl;
	}
    
};

int main(){
	
	Car myCar("Toyota", "Camry", 2022);
	myCar.accelerate(14);
	myCar.brake(4);
	myCar.displayInfo();
	
	Dog myDog("Phuong", "Cho", 24);
	myDog.bark();
	myDog.displayInfo();
	
	BankAccount myBankAccount("113","Tran Trung Nghia", 100000);
	myBankAccount.displayAccountInfo();
	myBankAccount.deposit(-1000);
	myBankAccount.deposit(1000);
	myBankAccount.displayAccountInfo();
	myBankAccount.withdraw(100000000);
	myBankAccount.withdraw(3000);
	myBankAccount.displayAccountInfo();
	
	Shape myShape("red");
	myShape.displayColor();

	Circle myCircle("red",3);
	myCircle.calculateArea();
	Rectangle myRectangle("blue", 4,3);
	myRectangle.calculateArea();
	
	Animal myAnimal("animal");
	myAnimal.makeSound();
	Duck myDuck("duck");
	myDuck.makeSound();
}
