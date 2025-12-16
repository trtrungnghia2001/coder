# Số nguyên tố
# Đảo chuỗi
# Giai thừa
import math

n=5
str='abcdefgh'

def is_prime(n):
    if n<2:
        return False
    for i in range(2, int(math.sqrt(n))+1):
        if n%i==0: 
            return False
        return True
print(n,"is prime:", is_prime(n))
# ==================

def reverse_string(s):
    return s[::-1]
print("reverse string:", reverse_string(str))
# ==================

def factorial(n):
    result = 1
    for i in range(1,n+1):
        result*=i
    return result
def factorial(n):
    if(n==1): return 1
    print(n)
    return n * factorial(n-1)
print("factorial:", factorial(n))