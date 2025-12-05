#include <iostream>
#include <cstring>
#include <string>
#include <vector>
using namespace std;

class Person{
	protected:
		string name;
		int age;
		bool sex;
	public:
		Person(string name, int age, bool sex){
			this->name=name;
			this->age=age;
			this->sex=sex;
		}
		~Person(){
		}
		virtual void input()=0;
		virtual void display()=0;
};

class Student: public Person{
	private:
		string msv;
		float toan, ly, hoa;
	public:
		Student(string name, int age, bool sex, string msv, float toan, float ly, float hoa)
		:Person(name, age,sex){
			this->msv=msv;
			this->toan=toan;
			this->ly=ly;
			this->hoa=hoa;
		}
		~Student(){
		}
		float dtb(){
			return (toan+ly+hoa)/3;
		}
		void input(){
			cout<<"Name: "; cin>> this->name;
			cout<<"Age: "; cin>> this->age;
			cout<<"Sex: "; cin>> this->sex;
			cout<<"Msv: "; cin>> this->msv;
			cout<<"Toan: "; cin>> this->toan;
			cout<<"Ly: "; cin>> this->ly;
			cout<<"Hoa: "; cin>> this->hoa;
		}
		void display(){
			cout<<this->name<<"\t";
			cout<<this->age<<"\t";
			cout<<this->sex<<"\t";
			cout<<this->msv<<"\t";
			cout<<this->toan<<"\t";
			cout<<this->ly<<"\t";
			cout<<this->hoa<<"\t";
			cout<<this->dtb()<<endl;
		}
};

int main(){
	
	vector<Student> sv;
	
	Student sv1("Tuan",14,1,"SV1",4,3.4,7);
	Student sv2("Hung",14,1,"SV2",4,4,2);
	Student sv3("Mai",14,0,"SV3",4,7,7);
	Student sv4("Phuong",14,0,"SV4",4,9,7);
	Student sv5("Anh",14,0,"SV5",6,3,9);
	
	sv.push_back(sv1);
	sv.push_back(sv2);
	sv.push_back(sv3);
	sv.push_back(sv4);
	sv.push_back(sv5);
	
	
	for (int i = 0; i < sv.size(); ++i) {
	   for( int j=0; j< sv.size(); j++){
	   		if(sv[i].dtb()<sv[j].dtb()){
	   			Student temp = sv[i];
	   			sv[i] = sv[j];
	   			sv[j] = temp;
			}
	   }
	}
	
	float max_dtb=-1;
	int idx =-1;
	for (int i = 0; i < sv.size(); ++i) {
	    sv[i].display(); 
	    
		if(max_dtb< sv[i].dtb()) {
	    	max_dtb= sv[i].dtb();
	    	idx = i;
		}
	}
	
	
	
	if(idx!=-1){
		cout<<"===============Max DTB==============="<<endl;
		sv[idx].display();
	}
	
	
}
