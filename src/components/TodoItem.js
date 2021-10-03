import React, { useState } from "react";
import { Input } from "antd";
import "../App.css";

const TodoItem = ({ text, status, handleChange }) => {
  const [editable, setEditable] = useState(false);
  const [item, setItem] = useState(text);
  const toggleEditable = () => setEditable((edit) => !edit);
  if (!editable) {
    return (
      <div
        className={`todo_item ${status === "done" ? "strike" : ""}`}
        onClick={toggleEditable}
      >
        {text}
      </div>
    );
  } else {
    return (
      <Input
        value={item}
        autoFocus
        onChange={(e) => setItem(e.target.value)}
        onPressEnter={() => {
          handleChange(item);
          toggleEditable();
        }}
        onBlur={toggleEditable}
      />
    );
  }
};

export default TodoItem;
