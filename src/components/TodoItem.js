import React, { useState } from "react";
import { Input } from "antd";

const TodoItem = ({ text, status, handleChange }) => {
  const [editable, setEditable] = useState(false);
  const [item, setItem] = useState(text);
  const toggleEditable = () => setEditable((edit) => !edit);
  if (!editable) {
    return (
      <div
        onClick={toggleEditable}
        style={{
          display: "flex",
          width: "100%",
          cursor: "pointer",
          textDecoration: status === "done" ? "line-through" : "none",
        }}
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
