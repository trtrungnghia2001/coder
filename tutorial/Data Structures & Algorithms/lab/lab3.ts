// Nhóm 3: Thuật toán Dữ liệu và Chuỗi (Trung bình)
// Bài tập 6: Đảo ngược chuỗi
// Mô tả: Viết một hàm nhận vào một chuỗi. Hàm trả về chuỗi đó sau khi đã đảo ngược thứ tự các ký tự.
// Ví dụ:
// Input: "hello"
// Output: "olleh"
// Input: "Angular"
// Output: "ralugnA"
// Gợi ý: Bạn có thể duyệt từ cuối chuỗi về đầu và thêm các ký tự vào một chuỗi mới, hoặc dùng các phương thức của chuỗi/mảng trong ngôn ngữ của bạn (nhưng mục tiêu là rèn luyện thuật toán, nên tự code vòng lặp sẽ tốt hơn).
function daonguocChuoi(str: string): string {
  let str1 = "";
  for (let index = str.length - 1; index >= 0; index--) {
    const element = str[index];
    str1 += element;
  }
  return str1;
}
console.log(daonguocChuoi("hello"));
console.log(daonguocChuoi("Angular"));

// Bài tập 7: Kiểm tra số nguyên tố
// Mô tả: Viết một hàm nhận vào một số nguyên dương num. Hàm trả về true nếu num là số nguyên tố,
// ngược lại trả về false. (Số nguyên tố là số lớn hơn 1 và chỉ chia hết cho 1 và chính nó).
// Ví dụ:
// Input: num = 7 -> Output: true
// Input: num = 4 -> Output: false
// Input: num = 1 -> Output: false
// Gợi ý:
// Các trường hợp đặc biệt: num <= 1 không phải số nguyên tố.
// Duyệt từ 2 đến căn bậc hai của num. Nếu num chia hết cho bất kỳ số nào trong khoảng đó, nó không phải số nguyên tố.
function checkSNT(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let index = 3; index < Math.sqrt(n); index = index + 2) {
    if (n % index === 0) return false;
    console.log(index);
  }
  return true;
}
console.log(checkSNT(7));
console.log(checkSNT(4));
console.log(checkSNT(1));
