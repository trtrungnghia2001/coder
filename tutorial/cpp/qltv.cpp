#include <iostream>
#include <cstring>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Book{
	public:
		string id, title, author;
		int year;
		float price;
	public:
		Book(string id, string title, string author, int year, float price){
			this->id=id;
			this->title=title;
			this->author=author;
			this->year=year;
			this->price=price;
		}
		~Book(){
		}
		display(){
			cout<<id<<"\t";
			cout<<title<<"\t";
			cout<<author<<"\t";
			cout<<year<<"\t";
			cout<<price<<endl;
		}
		
};

class QLTV{
	protected:
		vector<Book> books;
	
	public:
		QLTV(){
			cout<<"Khoi tao thanh cong!"<<endl;
		}
		~QLTV(){
			cout<<"Bi huy thanh cong!"<<endl;
		}
		
		input(){
			Book b1("b1","King", "Author1", 1999, 23000.1);
			Book b2("b2","Death", "Author2", 2001, 63000.2);
			Book b3("b3","Victory", "Author3", 1994, 43000.3);
			Book b4("b4","Kingdom", "Author4", 1897, 2000.6);
			
			books.push_back(b1);
			books.push_back(b2);
			books.push_back(b3);
			books.push_back(b4);
			
			cout<<"Nhap thanh cong!"<<endl;
			
		}
		
		display(vector<Book> books={}){
			cout<<"Id"<<"\t";
			cout<<"Title"<<"\t";
			cout<<"Author"<<"\t";
			cout<<"Year"<<"\t";
			cout<<"Price"<<endl;
			
			if(books.size()){
				for(int i=0; i< books.size(); i++){
					books[i].display();
				}
			}else{
				for(int i=0; i< this->books.size(); i++){
					this->books[i].display();
				}
			}
		
		}
		
		findByTitle(string keyword){
			vector<Book> books_find;
			
			for(int i=0; i< books.size(); i++){
				if(books[i].title.find(keyword)!= string::npos){
					books_find.push_back(books[i]);
				}
			}
			
			if(books_find.size()){
				this->display(books_find);
			}else{
				cout<<"Khong tim thay!"<<endl;
			}
		}
		
		sortByPriceAsc(){
			for(int i=0; i< books.size(); i++){
				for(int j=0; j< books.size(); j++){
					if(books[i].price<books[j].price){
						Book temp = books[i];
						books[i] = books[j];
						books[j] = temp;
					}
				}	
			}
			
			cout<<"Sap xep thanh cong!"<<endl;
			this->display();
		}
		
		totalPrice(){
			float total =0;
			for(int i=0; i< books.size(); i++){
				total += books[i].price;
			}
			cout<<"Total price: "<<total<<endl;
		}
		
		void deleteBookById(const string& id) {
		    auto it = remove_if(books.begin(), books.end(), [&](const Book& b) {
		        return b.getId() == id;
		    });
		
		    if (it != books.end()) {
		        books.erase(it, books.end());
		        cout << "? Xoa thanh cong!\n";
		    } else {
		        cout << "? Khong tim thay sach co ID: " << id << endl;
		    }
		}
};


int main(){
	QLTV qltv;
	qltv.input();
	qltv.findByTitle("King");
	qltv.sortByPriceAsc();
	qltv.totalPrice();
}
