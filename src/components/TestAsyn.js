import React, { useEffect, useState } from "react";
import axios from "axios";

const TestAsyn = () => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const { data } = resp;
      setTodo(data);
      console.log(data);
    };
    fetch();
  }, []);
  const funcAsyn = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("llamado 2");
        resolve();
      }, 1000);
    });
  };

  const func1 = async () => {
    console.log("llamado 1");
    await funcAsyn();
    console.log("llamado 3");
    console.log("llamado 4");
  };
  //func1();

  return (
    <div>
      <p>Soy un componente</p>
      <div>{JSON.stringify(todo)}</div>
    </div>
  );
};

export default TestAsyn;
