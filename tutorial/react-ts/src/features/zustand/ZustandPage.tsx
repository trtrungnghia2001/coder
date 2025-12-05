import React, { type ChangeEvent } from "react";
import { useCounterStore } from "./store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ZustandPage = () => {
  // Sử dụng hook để lấy trạng thái và action
  const { count, increment, decrement, reset, setCount } = useCounterStore();

  // State cục bộ để nhập giá trị mới
  const [inputValue, setInputValue] = React.useState(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.target.value, 10) || 0);
  };
  return (
    <div className="space-y-4">
      <h1>Bộ Đếm Zustand</h1>
      <p>Giá trị hiện tại: {count}</p>

      <div className="flex w-full max-w-xl items-center space-x-2">
        <Button onClick={increment}>Tăng</Button>
        <Button onClick={decrement}>Giảm</Button>
        <Button onClick={reset}>Đặt lại</Button>
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button onClick={() => setCount(inputValue)}>Đặt giá trị</Button>
      </div>
    </div>
  );
};

export default ZustandPage;
