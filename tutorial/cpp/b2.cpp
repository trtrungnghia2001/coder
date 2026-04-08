#include <iostream>
#include <cstring>
#include <string>
using namespace std;

void b1(){
	int size;
	cout<<"Nhap size: ";
	cin>>size;
	
	int arr[size];
	for(int i=0; i<size;i++){
		cout<<"Nhap a["<<i<<"]= ";
		cin>>arr[i];
	}
	cout<<endl;
	
	int max= arr[0], min=arr[0];
	for(int i=0; i<size;i++){
		if(max<arr[i]) max=arr[i];
		if(min>arr[i]) min=arr[i];
		cout<<arr[i]<<", ";
	}
	cout<<endl;
	
	cout<<"max: "<<max<<endl;	
	cout<<"min: "<<min<<endl;
}
void b2(){
	int size;
	cout<<"Nhap size: ";
	cin>>size;
	
	int *arr = new int[size];
	for(int i=0; i<size;i++){
		cout<<"Nhap a["<<i<<"]= ";
		cin>>*(arr+i);
	}
	cout<<endl;
	
	for(int i=0; i<size;i++){
		cout<<arr[i]<<" - "<< *(arr+i)<<endl;			
	}
	cout<<endl;
	
	
	delete[] arr;
}
void b3(){
	char str1[50] = "Hello";
	char str2[] = " World!";
	
	strcat(str1,str2);
	cout<<"str1: "<<str1<<endl;
	cout<<"length: "<<strlen(str1)<<endl;
}
void b4(){
	string message = "Welcome to C++";
	string user;
	
	cout<<"Nhap ten: "; cin>>user;
	
	string noi = message + user;
	
	cout<<"message: "<<noi<<endl;
	cout<<"length: "<<noi.length()<<endl;
	
	string cat = noi.substr(0,5);
	cout<<"cat: "<<cat<<endl;
}

int main(){
	b1();
	b2();
	b3();
	b4();
}
