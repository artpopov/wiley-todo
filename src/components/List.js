import React, { useReducer, useState } from "react";
import { actions, initialListItems, todoReducer } from "../hooks";
import { Form, Input, Button, List } from "antd";
import { CheckOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialListItems);
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: actions.add, text: newTodo });
    setNewTodo("");
  };
  return (
    <Form>
      <Form.Item>
        <Input
          autoFocus
          size="large"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onPressEnter={handleSubmit}
          placeholder="Enter a todo here"
          suffix={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleSubmit}
            />
          }
        />
      </Form.Item>
      {state?.length === 0 && <h1>No todo added</h1>}
      <List
        dataSource={state}
        renderItem={({ id, text, status }) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                style={{ backgroundColor: "#52c41a", border: "none" }}
                icon={<CheckOutlined />}
                onClick={() => dispatch({ type: actions.complete, id })}
              />,
              <Button
                type="primary"
                style={{ backgroundColor: "red", border: "none" }}
                icon={<DeleteOutlined />}
                onClick={() => dispatch({ type: actions.delete, id })}
              />,
            ]}
          >
            <TodoItem
              status={status}
              handleChange={(itemText) =>
                dispatch({ type: actions.edit, id, text: itemText })
              }
              text={text}
            />
          </List.Item>
        )}
      />
    </Form>
  );
};

export default TodoList;
