import json

users = [
    {"id": 1, "name": "A"},
    {"id": 2, "name": "B"},
]

with open('users.json','w') as f:
    json.dump(users,f)
with open("users.json", "r") as f:
    data = json.load(f)
    print(data)