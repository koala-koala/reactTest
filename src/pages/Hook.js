import React, { useState, useEffect, useRef, useReducer, createContext, useContext } from "react";
import { Link } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
const TodosDispatch = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateName':
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state;
  }
}

function SubHook({name}) {
  const dispatch = useContext(TodosDispatch);
  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: 'updateName',
          payload: 'koala',
        })
      }}>修改{name}</button>
    </div>
  )
}

export default function Example() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  const [state, dispatch] = useReducer(reducer, {
    name: 'zhangsan',
  });

  useEffect(() => {
    console.log(`clicked ${count} times`);
    return () => {
      console.log(`unclicked ${count} times`);
    };
  }, []);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <Link to="/">首页</Link>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          // 还是异步的
          setCount(count + 1);
        }}
      >
        Click me {prevCount}
      </button>
      <button onClick={() => {
        setTimeout(() => {
          alert(count);
        }, 3000)
      }}>show alert</button>
      <SubHook name={state.name} />
    </TodosDispatch.Provider>
  );
}
