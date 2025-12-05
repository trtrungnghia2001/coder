#include <iostream>
#include <cstring>
#include <string>
using namespace std;

//b1
void dtHCN(float cd ,float cr){
	cout<<"DT: "<< cd*cr<<endl;
};
void bieuthuc(float a ,float b){
	cout<<"a+b: "<< a+b <<endl;
	cout<<"a-b: "<< a-b <<endl;
	cout<<"a*b: "<< a*b <<endl;
	cout<<"a/b: "<< a/b <<endl;
	cout<<"a>b: "<< (a>b) <<endl;
};

//b2
void chanle(int a){
	if(a%2==0){
		cout<<a<<" la so chan"<<endl;
	}else{
		cout<<a<<" la so le"<<endl;
	}
}
void bangcuuchuong(){
	for(int i=1; i<11; i++){
		for(int j=1; j<11; j++){
			cout<<j<<"*"<<i<<"="<<i*j<<'\t';
		}
		cout<<endl;
	}
}
void vohan(){
	string input ="";
	
	while(true){
		cout << "Nhap chuoi (go 'exit' de thoat): ";
		cin>>input;
		
		if(input=="exit"){
			cout << "Da thoat chuong trinh." << endl;
			break;
		}
	};
	
}

//b3
void giaithua(int n){
	int i=1;
	int result=1;
	while(i<=n){
		result *= i;
		i++;
	}
	cout<<"Giai thua: "<<result;
}
void swapByValue(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    cout << "[Trong swapByValue] x = " << x << ", y = " << y << endl;
}
void swapByReference(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
    cout << "[Trong swapByReference] x = " << x << ", y = " << y << endl;
}
void checkSwap(){
	int a=5, b=10;
	
//	tham tri, khong thay doi gia tri 
	swapByValue(a,b);
	cout<<"a: "<<a<<" ,b: "<<b<<endl;
	
//	tham chieu, thay doi gia tri
	swapByReference(a,b);
	cout<<"a: "<<a<<" ,b: "<<b<<endl;
}

//b4
void inMang(){
	int arr[] ={1,2,3,4,5};
	int size = sizeof(arr) / sizeof(arr[0]);
	for(int i=0; i<size; i++){
		cout<<arr[i]<<'\t';
	}
	cout<<endl;
}
void thayDoiGTCuaBienQuanConTro(){
	int a = 10;
    int* ptr = &a;   // ptr tro den bien a

    cout << "Gia tri ban dau cua a: " << a << endl;

    *ptr = 20;  // Thay doi gia tri cua a qua ptr

    cout << "Gia tri cua a sau khi thay doi qua con tro: " << a << endl;
    
    delete ptr;

}
void mangConTro(){
	
	int size =5;
	int *arr = new int[size];
	
	for(int i=0; i<size;i++){
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
	};
    cout << endl;
	cout << "Mang vua nhap la: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    delete[] arr;
}

//b5
void layDoDaiChuoi(){	
 	char str[] = "Hello, world!";
 	int length = strlen(str);
	cout<<"Do dai chuoi: "<<length<<endl;
}
void usingString(){
	string str1 = "Hello, world!";
	string str2 = "My name is Nghia";
	
	cout<<"Noi chuoi: "<< str1 + str2 <<endl;
	cout<<"Lay do dai: "<< str1.length() <<endl;
	cout<<"Tim kiem: "<< str1.find("world") <<endl;
}

//b6
struct Student{
	string name;
	int id;
	float gpa;
};
void usingStruct(){
	Student student2 = {"Tran Thi B", 67890, 3.92};
    std::cout << "\n--- Thong tin Sinh vien ---" << std::endl;
    std::cout << "Ten: " << student2.name << std::endl;
    std::cout << "ID: " << student2.id << std::endl;
    std::cout << "GPA: " << student2.gpa << std::endl;

}
enum TrafficLightStatus {
    RED,    // M?c d?nh RED = 0
    YELLOW, // M?c d?nh YELLOW = 1
    GREEN   // M?c d?nh GREEN = 2
};
void displayTrafficLightMessage(TrafficLightStatus status) {
    switch (status) {
        case RED:
            std::cout << "Den DO: Dung lai!" << std::endl;
            break;
        case YELLOW:
            std::cout << "Den VANG: Chuan bi dung lai hoac di chuyen!" << std::endl;
            break;
        case GREEN:
            std::cout << "Den XANH: Di chuyen!" << std::endl;
            break;
        default:
            std::cout << "Trang thai den khong hop le." << std::endl;
            break;
    }
}

//main
int main(){
	dtHCN(4,3);
	bieuthuc(12,5);
	chanle(8);
	bangcuuchuong();
	vohan();
	giaithua(5);
	checkSwap();
	inMang();
	thayDoiGTCuaBienQuanConTro();
	mangConTro();
	layDoDaiChuoi();
	usingString();
	usingStruct();
	displayTrafficLightMessage(YELLOW);
}
