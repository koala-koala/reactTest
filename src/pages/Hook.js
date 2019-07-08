import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`clicked ${count} times`);
    return () => {
      console.log(`unclicked ${count} times`);
    };
  }, []);

  return (
    <div>
      <Link to="/">首页</Link>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          // 还是异步的
          setTimeout(() => {
            setCount(count + 1);
            console.log(count);
          }, 0);
        }}
      >
        Click me
      </button>
    </div>
  );
}
