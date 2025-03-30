// src/redux/slice/CommentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  comments: {}, // Changed to an object to store comments by blog ID
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setComments: (state, action) => {
      const { blogId, comments } = action.payload;
      state.comments[blogId] = comments; // Store comments by blog ID
    },
    addComment: (state, action) => {
      const { blog_id, comment } = action.payload;
      if (!state.comments[blog_id]) {
        state.comments[blog_id] = [];
      }
      state.comments[blog_id].push(comment);
    },
    deleteComment: (state, action) => {
      const payload = action.payload;
      if (state.comments[payload.blogId]) {
        state.comments[payload.blogId] = state.comments[payload.blogId].filter(
          (comment) => comment._id !== payload.commentId
        );
      }
    },
    updateComment: (state, action) => {
      const payload = action.payload;
      const blogId = payload.blogId;
      const commentId = payload.commentId;
      const newContent = payload.newContent;
      if (state.comments[blogId]) {
        const commentIndex = state.comments[blogId].findIndex(
          (comment) => comment._id === commentId
        );

        if (commentIndex !== -1) {
          // Update the comment's content
          state.comments[blogId][commentIndex].content = newContent;
        }
      }
    },
  },
});

export const {
  setLoading,
  setComments,
  addComment,
  deleteComment,
  updateComment,
} = commentSlice.actions;

export default commentSlice.reducer;
