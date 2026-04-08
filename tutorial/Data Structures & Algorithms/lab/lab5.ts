// Nhóm 5: Thuật toán về Chuỗi (String Algorithms)
// Các thuật toán này tập trung vào việc xử lý, phân tích hoặc thao tác với chuỗi ký tự.

// Bài tập 10: Kiểm tra Chuỗi Palindrome
// Mô tả: Viết một hàm nhận vào một chuỗi (ví dụ: s). Hàm trả về true nếu chuỗi đó là
// palindrome, ngược lại trả về false. Một chuỗi palindrome là chuỗi đọc xuôi hay ngược
// đều giống nhau (ví dụ: "madam", "racecar"). Bỏ qua chữ hoa/thường và các ký tự không
// phải chữ cái/số.
// Ví dụ:
// Input: "A man, a plan, a canal: Panama" -> Output: true
// Input: "race a car" -> Output: false
// Input: "level" -> Output: true
// Gợi ý:
// Đầu tiên, chuẩn hóa chuỗi: chuyển tất cả về chữ thường và loại bỏ các ký tự không phải chữ cái/số.
// Sử dụng hai con trỏ, một ở đầu chuỗi và một ở cuối chuỗi, di chuyển vào giữa để so sánh từng cặp ký tự.
function Palindrome(str: string) {
  let srtCode = "";
  for (let index = 0; index < str.length; index++) {
    const element = str[index].toLocaleUpperCase();
    if (element.charCodeAt(0) >= 65 && element.charCodeAt(0) <= 90)
      srtCode += element;
  }
  for (let index = 0; index < srtCode.length / 2; index++) {
    if (srtCode[index] !== srtCode[srtCode.length - 1 - index]) return false;
  }
  return true;
}
console.log(Palindrome("A man, a plan, a canal: Panama"));
console.log(Palindrome("race a car"));
console.log(Palindrome("level"));

// Bài tập 11: Tìm Ký tự đầu tiên không lặp lại
// Mô tả: Viết một hàm nhận vào một chuỗi (ví dụ: s). Hàm trả về ký tự đầu tiên xuất hiện trong chuỗi mà nó không bị lặp lại ở bất kỳ vị trí nào khác trong chuỗi.
// Nếu không có ký tự như vậy, trả về một giá trị đặc biệt (ví dụ: null hoặc một chuỗi rỗng).
// Ví dụ:
// Input: "leetcode" -> Output: "l"
// Input: "loveleetcode" -> Output: "v"
// Input: "aabb" -> Output: null (hoặc "")
// Gợi ý:
// Sử dụng một Hash Map (hoặc đối tượng/array để đếm tần suất) để lưu trữ số lần xuất hiện của mỗi ký tự.
// Sau khi đếm xong, duyệt lại chuỗi gốc và kiểm tra tần suất của từng ký tự theo thứ tự xuất hiện.
function kyTuDauTienKhongLapLai(str: string) {
  let obj: { [key: string]: number } = {};

  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    if (element in obj) {
      obj[element] += 1;
    } else {
      obj[element] = 1;
    }
  }

  const char = Object.keys(obj).find((item) => obj[item] === 1);

  return char ?? null;
}
console.log(kyTuDauTienKhongLapLai("leetcode"));
console.log(kyTuDauTienKhongLapLai("loveleetcode"));
console.log(kyTuDauTienKhongLapLai("aabb"));

// Nhóm 6: Thuật toán về Mảng/Danh sách (Nâng cao hơn)
// Bài tập 12: Di chuyển số 0 về cuối mảng
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên nums. Di chuyển tất cả các số 0 về cuối mảng trong khi vẫn giữ nguyên thứ tự tương đối của các phần tử khác 0. Thực hiện tại chỗ (in-place) nếu có thể, tức là không tạo ra một bản sao của mảng.
// Ví dụ:
// Input: nums = [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
// Input: nums = [0]
// Output: [0]
// Gợi ý:
// Sử dụng hai con trỏ: một con trỏ để theo dõi vị trí hiện tại của phần tử không-0 và một con trỏ để duyệt toàn bộ mảng.
// Khi bạn gặp một số khác 0, hãy hoán đổi nó với vị trí của con trỏ không-0 và tăng cả hai con trỏ.
// Khi bạn gặp số 0, chỉ tăng con trỏ duyệt toàn bộ mảng.
function diChuyenSo(nums: number[]) {
  const arr0 = [];
  const arr1 = [];
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if (element !== 0) arr1.push(element);
    if (element === 0) arr0.push(element);
  }

  return [...arr1, ...arr0];
}
console.log(diChuyenSo([0, 1, 0, 3, 12]));
console.log(diChuyenSo([0]));

// Bài tập 13: Xóa phần tử trùng lặp khỏi mảng đã sắp xếp
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên đã được sắp xếp nums. Xóa các phần tử trùng lặp khỏi mảng đó sao cho mỗi phần tử chỉ xuất hiện một lần.
// Hàm trả về độ dài mới của mảng. Không sử dụng không gian phụ để tạo mảng mới, hãy sửa đổi mảng đầu vào tại chỗ (in-place) với O(1) không gian phụ.
// Ví dụ:
// Input: nums = [1, 1, 2]
// Output: 2, và nums trở thành [1, 2, _] (gạch dưới biểu thị phần tử không quan trọng sau độ dài mới).
// Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
// Output: 5, và nums trở thành [0, 1, 2, 3, 4, _, _, _, _, _]
// Gợi ý:
// Sử dụng hai con trỏ. Một con trỏ i để duyệt qua mảng, và một con trỏ j để theo dõi vị trí của phần tử duy nhất tiếp theo.
// Nếu nums[i] khác nums[i-1], thì nó là một phần tử duy nhất mới, hãy gán nums[j] = nums[i] và tăng j.
function xoaPhanTuTrungLap(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] !== nums[j]) {
        console.log(nums[i], nums[j]);
      }
    }
  }
  return nums;
}
console.log(xoaPhanTuTrungLap([1, 1, 2]));

// Nhóm 7: Thuật toán Tổng hợp/Tư duy (Trung bình/Khó)
// Bài tập 14: Hai tổng (Two Sum)
// Mô tả: Cho một mảng các số nguyên nums và một số nguyên target. Trả về các chỉ số của hai số sao cho tổng của chúng bằng target. Giả định rằng mỗi đầu vào sẽ có chính xác một giải pháp, và bạn không được sử dụng cùng một phần tử hai lần.
// Ví dụ:
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] (vì nums[0] + nums[1] == 9)
// Input: nums = [3, 2, 4], target = 6
// Output: [1, 2] (vì nums[1] + nums[2] == 6)
// Gợi ý:
// Vét cạn: Dùng hai vòng lặp lồng nhau (O(n
// 2
//  )).
// Tối ưu hơn: Sử dụng Hash Map (hoặc đối tượng trong JS). Duyệt qua mảng một lần. Đối với mỗi số num, tính complement = target - num. Kiểm tra xem complement có trong Hash Map không. Nếu có, bạn đã tìm thấy cặp. Nếu không, thêm num và chỉ số của nó vào Hash Map. (O(n) thời gian, O(n) không gian).
// Bài tập 15: Kiểm tra Dấu ngoặc hợp lệ
// Mô tả: Viết một hàm nhận vào một chuỗi s chỉ chứa các ký tự '(', ')', '{', '}', '[' và ']'. Hàm trả về true nếu chuỗi ngoặc là hợp lệ, ngược lại trả về false.
// Một chuỗi ngoặc hợp lệ nếu:
// Các dấu ngoặc mở phải được đóng bằng cùng loại dấu ngoặc.
// Các dấu ngoặc mở phải được đóng theo đúng thứ tự.
// Mọi dấu ngoặc đóng đều có một dấu ngoặc mở tương ứng cùng loại.
// Ví dụ:
// Input: "()" -> Output: true
// Input: "()[]{}" -> Output: true
// Input: "(]" -> Output: false
// Input: "([{}])" -> Output: true
// Input: "{[]}" -> Output: true
// Gợi ý:
// Sử dụng cấu trúc dữ liệu Stack.
// Duyệt qua từng ký tự trong chuỗi:
// Nếu là dấu ngoặc mở ((, {, [), đẩy nó vào stack.
// Nếu là dấu ngoặc đóng (), }, ]):
// Kiểm tra xem stack có rỗng không. Nếu rỗng, không có dấu mở tương ứng, trả về false.
// Lấy phần tử trên cùng của stack ra. Nếu nó không phải là dấu ngoặc mở tương ứng, trả về false.
// Sau khi duyệt hết chuỗi, nếu stack rỗng, chuỗi là hợp lệ. Ngược lại, có dấu ngoặc mở chưa được đóng, trả về false.
