import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  messages: [],
  isLoading: false,
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload; 
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload); 
    },

    updateMessage: (state, action) => {
      state.messages = state.messages.map((msg) =>
        msg._id === action.payload._id ? action.payload : msg
      );
    },

    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload
      );
    },
  },
});

const { actions, reducer } = slice;
export const {
  setLoading,
  setUsers,
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} = actions;

export default reducer;
