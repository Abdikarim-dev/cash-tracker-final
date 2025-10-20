import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "transaction",
  initialState: {
    editingTransaction: null,
    deletingTransaction: null,
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
    handleEditingTransaction: (state, action) => {
      state.editingTransaction = action.payload;
    },
    handleDeletingTransaction: (state, action) => {
      state.deletingTransaction = action.payload;
    },
    onCancel: (state) => {
      state.createAndEditForm = false;
      state.editingTransaction = null;
    },
  },
});

export const {
  handleCreateAndEdit,
  handleDeleteModal,
  handleEditingTransaction,
  handleDeletingTransaction,
  onCancel,
} = slice.actions;

export default slice.reducer;

// [
//   Transactions:[

//   ],
//   isAuthenticated:false,
//   activeTransaction:{}
// ]




// {

//   reducers: function-ka camal uma shaqeeyaan,
//              what they do: they mutate state,
//               they take two arguments: state, action,
//               they return the new state

//               what they don't do,
//               they don't return values

// }