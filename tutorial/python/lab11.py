class User:
    def __init__(self,id,name,email):
        self.id=id
        self.name=name
        self.email=email
    def to_dirct(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }

u1 = User(1,'Nghia','nghia@gmail.com')
u2 = User(2,'Phuong','phuong@gmail.com')

print(u1.to_dirct())
print(u2.to_dirct())

# =======================================================
class Product:
    def __init__(self,name,price):
        self.name=name 
        self.price=price 
    def price_after_tax(self,tax):
        return self.price*(1+tax/100)

p1=Product('pro1',2000)
print(p1.price_after_tax(20))

# =======================================================
class BankAccount:
    def __init__(self,balance=0):
        self.__balance = balance 

    def deposit(self,many):
         if many <= 0:
            raise ValueError("Số tiền không hợp lệ")
         self.__balance-=many

    def withdraw(self, many):
        if many > self.__balance:
            raise ValueError("Số dư không đủ")
        self.__balance -= many
        return self.__balance
    
bank1 = BankAccount(1000)
bank1.deposit(2000)
print(bank1.withdraw(500))
print(bank1.withdraw(300))

# =======================================================
class User:
    def __init__(self,name):
        self.name=name
    def speak(self):
        pass

class Admin(User):
    def __init__(self, name,stk):
        super().__init__(name)
        self.stk=stk
    def speak(self):
        return f"Hello, my name {self.name}, stk:{self.stk}"

admin1=Admin('nghia',12345)
print(admin1.speak())