export const initialListItems = [
  { id: 0, status: "done", text: "Make a todo list for Wiley" },
];
export const actions = {
  add: "add",
  edit: "edit",
  complete: "complete",
  delete: "delete",
};

export const todoReducer = (state, action) => {
  debugger;
  switch (action.type) {
    case actions.add: {
      return [
        ...state,
        {
          id: state[state.length - 1]?.id + 1 || 0,
          text: action.text,
          status: "undone",
        },
      ];
    }
    case actions.complete: {
      return state.map((i) => {
        if (i.id === action.id) {
          return { ...i, status: i.status === "done" ? "undone" : "done" };
        }
        return i;
      });
    }
    case actions.edit: {
      return state.map((i) => {
        if (i.id === action.id) {
          return { ...i, text: action.text };
        }
        return i;
      });
    }
    case actions.delete: {
      return state.filter((e) => e.id !== action.id);
    }
    default:
      throw new Error("Unsupported action type");
  }
};
