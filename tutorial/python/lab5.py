# Max / Min không dùng built-in
# Lọc số chẵn

nums = [3, 5, 1, 9, 2,6,8]

max_val = nums[0]
min_val = nums[0]
for i in range(0, len(nums)):
    if(max_val< nums[i]):
        max_val=nums[i]
    if(min_val>nums[i]):
        min_val=nums[i]
print('max:', max_val)
print('min:', min_val)

#==============================================
sochans = []
for x in nums:
    if(x%2==0):
        sochans.append(x)
print(sochans)

evens = [x for x in nums if x % 2 == 0]
print(evens)
