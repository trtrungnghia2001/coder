# Chẵn / lẻ
# Năm nhuận

number = int(input('Nhap so: '))
if number%2==0:
    print('chan')
else:
    print('le')

year = int(input("Nhap nam: "))
if year%400==0 or (year%4==0 and year%100!=0):
    print("Nam nhuan")
else:
    print("Nam khong nhuan")