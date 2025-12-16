# Bảng cửu chương
# Tổng 1 → n

n = int(input("nhap n: "))

for i in range(1,11):
    print(i,'*',n,"=",i*n)

sum=0
for i in range(1,n+1):
    sum+=i
print('sum 1->n: ', sum)