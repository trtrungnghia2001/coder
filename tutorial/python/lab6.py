# Tìm user theo id
# Update tuổi
# Xóa user

users = [
    {"id": 1, "name": "A", "age": 20},
    {"id": 2, "name": "B", "age": 22},
]

f_u=None
for u in users:
    if u['id']==1:
        f_u=u
        break
print('find u:',f_u)

if f_u:
    f_u['age']=25
print('find u:',f_u)

users = [u for u in users if u['id']!=1]
print('users:',users)

