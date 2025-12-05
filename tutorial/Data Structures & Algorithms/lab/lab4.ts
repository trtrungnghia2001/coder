// Nhóm 4: Bài tập tổng hợp (Trung bình)
// Bài tập 8: Tìm cặp số có tổng bằng X
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên arr và một số nguyên sum.
// Hàm trả về một cặp số (array chứa 2 số) từ arr mà tổng của chúng bằng sum. Giả sử chỉ có một cặp duy nhất.
// Ví dụ:
// Input: arr = [2, 7, 11, 15], sum = 9
// Output: [2, 7]
// Input: arr = [3, 2, 4], sum = 6
// Output: [2, 4]
// Gợi ý:
// Cách vét cạn (brute-force): Sử dụng hai vòng lặp lồng nhau (for in for) để thử tất cả các cặp có thể. Độ phức tạp O(N
// 2
//  ).
// Cách tối ưu hơn (nếu mảng lớn): Sử dụng Set (hoặc Map trong một số ngôn ngữ) để lưu trữ các số đã duyệt và kiểm tra
// xem sum - current_number có tồn tại trong Set không. Độ phức tạp O(N).
function bruteForce(array: number[], sum: number): number[] {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === sum) return [array[i], array[j]];
    }
  }
  return [];
}
console.log(bruteForce([2, 7, 11, 15], 9));
console.log(bruteForce([3, 2, 4], 6));

function useSet(array: number[], sum: number): number[] {
  const set = new Set();
  for (const element of array) {
    const sub = sum - element;
    if (set.has(sub)) {
      return [element, sub];
    }
    set.add(element);
  }
  return [];
}
console.log(useSet([2, 1, 4, 6, 1], 4));
console.log(useSet([2, 7, 11, 15], 9));
console.log(useSet([3, 2, 4], 6));

// Bài tập 9: Loại bỏ các phần tử trùng lặp
// Mô tả: Viết một hàm nhận vào một mảng các phần tử (số, chuỗi...). Hàm trả về một mảng mới chỉ chứa các phần tử duy nhất,
// giữ nguyên thứ tự xuất hiện ban đầu.
// Ví dụ:
// Input: arr = [1, 2, 2, 3, 4, 3, 5]
// Output: [1, 2, 3, 4, 5]
// Input: arr = ["apple", "banana", "apple", "orange"]
// Output: ["apple", "banana", "orange"]
// Gợi ý:
// Sử dụng một đối tượng Set (nếu ngôn ngữ hỗ trợ) hoặc một Map (hoặc một mảng tạm) để theo dõi các phần tử đã thấy.
// Duyệt qua mảng gốc, nếu phần tử chưa có trong tập hợp đã thấy, thêm nó vào mảng kết quả và đánh dấu là đã thấy.
function phanTuDuyNhat<T>(array: T[]): T[] {
  let arr: T[] = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const checkItem = arr.find((item) => item === element);
    if (checkItem) {
      continue;
    } else {
      arr.push(element);
    }
  }

  return arr;
}

console.log(phanTuDuyNhat([1, 2, 2, 3, 4, 3, 5]));
console.log(phanTuDuyNhat(["apple", "banana", "apple", "orange"]));

function useSet_B9<T>(array: T[]) {
  const set = new Set(array);
  return set;
}

console.log(useSet_B9([1, 2, 2, 3, 4, 3, 5]));
console.log(useSet_B9(["apple", "banana", "apple", "orange"]));
