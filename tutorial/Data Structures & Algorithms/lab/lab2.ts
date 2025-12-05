// Nhóm 2: Thuật toán Đệ quy (Cơ bản)
// Bài tập 4: Tính tổng từ 1 đến N (Đệ quy)
// Mô tả: Viết một hàm đệ quy nhận vào một số nguyên dương n. Hàm trả về tổng của các số từ 1 đến n.
// Ví dụ:
// Input: n = 3
// Output: 6 (vì 1 + 2 + 3 = 6)
// Input: n = 5
// Output: 15 (vì 1 + 2 + 3 + 4 + 5 = 15)
// Gợi ý:
// Trường hợp cơ sở (base case): Khi n = 1, tổng là 1.
// Bước đệ quy: sum(n) = n + sum(n - 1).
function tong(n: number): number {
  if (n === 1) return 1;
  return n + tong(n - 1);
}
console.log(tong(6));

// Bài tập 5: Tính số Fibonacci thứ N (Đệ quy)
// Mô tả: Viết một hàm đệ quy nhận vào một số nguyên không âm n. Hàm trả về số Fibonacci thứ n. Dãy Fibonacci bắt đầu từ F0=0, F1=1,
// và Fn=Fn−1+Fn−2 với n>1.
// Ví dụ:
// Input: n = 0 -> Output: 0
// Input: n = 1 -> Output: 1
// Input: n = 5 -> Output: 5 (Dãy: 0, 1, 1, 2, 3, 5)
// Gợi ý:
// Trường hợp cơ sở: F_0 = 0, F_1 = 1.
// Bước đệ quy: F_n = F_{n-1} + F_{n-2}.

function Fibonacci(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
console.log(Fibonacci(5));
