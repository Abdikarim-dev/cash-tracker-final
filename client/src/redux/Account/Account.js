import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "account",
  initialState: {
    editingAccount: null,
    deletingAccount: null,
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
    handleEditingAccount: (state, action) => {
      state.editingAccount = action.payload;
    },
    handleDeletingAccount: (state, action) => {
      state.deletingAccount = action.payload;
    },
    onCancel: (state) => {
      state.createAndEditForm = false;
      state.editingAccount = null;
    },
  },
});

export const {
  handleCreateAndEdit,
  handleDeleteModal,
  handleEditingAccount,
  handleDeletingAccount,
  onCancel,
} = slice.actions;

export default slice.reducer;

// [
//   Accounts:[

//   ],
//   isAuthenticated:false,
//   activeAccount:{}
// ]




// {

//   reducers: function-ka camal uma shaqeeyaan,
//              what they do: they mutate state,
//               they take two arguments: state, action,
//               they return the new state

//               what they don't do,
//               they don't return values

// }