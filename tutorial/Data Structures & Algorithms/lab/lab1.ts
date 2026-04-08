// Nhóm 1: Thuật toán Sắp xếp và Tìm kiếm (Cơ bản)
// Bài tập 1: Đếm số lần xuất hiện (Tìm kiếm cơ bản)
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên và một số nguyên target. Hàm trả về số lần target xuất hiện trong mảng.
// Ví dụ:
// Input: arr = [1, 2, 2, 3, 4, 2], target = 2
// Output: 3
// Input: arr = [5, 6, 7], target = 8
// Output: 0
// Gợi ý: Sử dụng vòng lặp for để duyệt qua mảng và đếm.
function countTarget(arr: number[], target: number): number {
  let count = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === target) count++;
  }
  return count;
}
console.log(countTarget([1, 2, 2, 3, 4, 2], 2));
console.log(countTarget([5, 6, 7], 8));

// Bài tập 2: Tìm giá trị lớn nhất/nhỏ nhất (Tìm kiếm cơ bản)
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên. Hàm trả về giá trị lớn nhất (hoặc nhỏ nhất) trong mảng.
// Ví dụ:
// Input: arr = [10, 5, 20, 8, 15]
// Output (lớn nhất): 20
// Output (nhỏ nhất): 5
// Gợi ý: Khởi tạo một biến max_val (hoặc min_val) bằng phần tử đầu tiên của mảng, sau đó duyệt qua các phần tử còn lại để
// so sánh và cập nhật.
function finMinMax(array: number[]): number[] {
  let min = array[0];
  let max = array[0];

  for (let index = 0; index < array.length; index++) {
    if (min > array[index]) min = array[index];
    if (max < array[index]) max = array[index];
  }
  return [min, max];
}
console.log(finMinMax([10, 5, 20, 8, 15]));

// Bài tập 3: Sắp xếp Mảng Số nguyên (Bubble Sort hoặc Selection Sort)
// Mô tả: Viết một hàm nhận vào một mảng các số nguyên. Sắp xếp mảng đó theo thứ tự tăng dần mà không sử dụng hàm
// sắp xếp sẵn có của ngôn ngữ (ví dụ: sort() của JavaScript).
// Ví dụ:
// Input: arr = [5, 2, 8, 1, 9]
// Output: [1, 2, 5, 8, 9]
// Gợi ý: Thực hiện Bubble Sort hoặc Selection Sort như đã học.
function BubbleSort(array: number[]): number[] {
  // Bubble Sort sẽ so sánh từng cặp phần tử liền kề, nếu sai thứ tự thì đổi chỗ (swap).
  // Sau mỗi vòng lặp, phần tử lớn nhất sẽ bị đẩy xuống cuối mảng, giống như bong bóng.
  for (let i = 0; i < array.length - 1; i++) {
    // Mỗi lần lặp, phần tử lớn nhất sẽ nổi lên cuối
    for (let j = 0; j < array.length - 1 - i; j++) {
      // Đổi chỗ nếu sai thứ tự
      if (array[j] > array[j + 1]) {
        let swap = array[j];
        array[j] = array[j + 1];
        array[j + 1] = swap;
      }
    }
  }
  return array;
}
function SelectionSort(array: number[]): number[] {
  // Selection Sort tìm phần tử nhỏ nhất trong đoạn chưa sắp xếp rồi đưa nó về đầu.
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    // Tìm vị trí phần tử nhỏ nhất từ i đến cuối
    for (let j = i + 1; j < array.length - 1; j++) {
      if (array[minIndex] > array[j]) minIndex = j;
    }

    // Đổi chỗ phần tử nhỏ nhất với phần tử ở vị trí i
    let swap = array[i];
    array[i] = array[minIndex];
    array[minIndex] = swap;
  }
  return array;
}
console.log(BubbleSort([5, 2, 8, 1, 9]));
console.log(SelectionSort([5, 2, 8, 1, 9]));
