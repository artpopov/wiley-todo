import React from "react";

export const actions = {
  add: "add",
  edit: "edit",
  complete: "complete",
  delete: "delete",
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case actions.add: {
      return [
        ...state,
        {
          id: state[state.length - 1]?.id + 1 || 0,
          text: action.text,
          status: "undone",
        },
      ].sort((a, b) => (a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1));
    }
    case actions.complete: {
      return state
        .map((i) => {
          if (i.id === action.id) {
            return { ...i, status: i.status === "done" ? "undone" : "done" };
          }
          return i;
        })
        .sort((a, b) => (a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1));
    }
    case actions.edit: {
      return state
        .map((i) => {
          if (i.id === action.id) {
            return { ...i, text: action.text };
          }
          return i;
        })
        .sort((a, b) => (a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1));
    }
    case actions.delete: {
      return state
        .filter((e) => e.id !== action.id)
        .sort((a, b) => (a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1));
    }
    default:
      throw new Error("Unsupported action type");
  }
};

export const useLocalStorageState = (key, defaultValue = "") => {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
