print("Hello, world!")

a="Hello"
print(a)

b= """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua."""
print(b)

print(a[1])
print(a[1:4])
print(a[-5:-2])
for i in a:
    print(i)
print(len(a))
# Kiểm tra chuỗi
print("nghia" not in a)
print("He" in a)

# 
print(a.lower())
print(a.upper())
print(a.strip())
# Thay thế chuỗi
print(a.replace("Hello","Hi"))
print(a)
# Dây chia đôi
print(a.split(","))