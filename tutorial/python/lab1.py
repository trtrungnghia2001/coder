# Nhập tên, tuổi → in ra:
# Xin chào {name}, bạn {age} tuổi

# Nhập 2 số → in ra tổng, hiệu, tích, thương

# Kiểm tra kiểu của từng biến

name = input("Name: ")
age = int(input("Age: "))
print(f"Xin chào {name}, bạn {age} tuổi")

a=int(input("a: "))
b=int(input("b: "))
print(f"a+b={a+b}")
print(f"a-b={a-b}")
print(f"a*b={a*b}")
print(f"a/b={a/b}")

v1=5
v2='str1'
v3=True
print(type(v1))
print(type(v2))
print(type(v3))