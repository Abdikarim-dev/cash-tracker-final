import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    users: [],
    editingUser: null,
    deletingUser: null,
    createAndEditForm: false,
    deleteModal: false,
  },
  reducers: {
    handleCreateAndEdit: (state) => {
      state.createAndEditForm = !state.createAndEditForm;
    },
    handleDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    handleEditingUser: (state, action) => {
      state.editingUser = action.payload;
    },
    handleDeletingUser: (state, action) => {
      state.deletingUser = action.payload;
    },
    onCancel: (state) => {
      state.createAndEditForm = false;
      state.editingUser = null;
    },
  },
});

export const {
  handleCreateAndEdit,
  handleDeleteModal,
  handleEditingUser,
  handleDeletingUser,
  onCancel,
} = slice.actions;

export default slice.reducer;

// [
//   users:[

//   ],
//   isAuthenticated:false,
//   activeUser:{}
// ]




// {

//   reducers: function-ka camal uma shaqeeyaan,
//              what they do: they mutate state,
//               they take two arguments: state, action,
//               they return the new state

//               what they don't do,
//               they don't return values

// }