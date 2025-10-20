import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "transferAmount",
  initialState: {
    editingTransferAmount: null,
    deletingTransferAmount: null,
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
    handleEditingTransferAmount: (state, action) => {
      state.editingTransferAmount = action.payload;
    },
    handleDeletingTransferAmount: (state, action) => {
      state.deletingTransferAmount = action.payload;
    },
    onCancel: (state) => {
      state.createAndEditForm = false;
      state.editingTransferAmount = null;
    },
  },
});

export const {
  handleCreateAndEdit,
  handleDeleteModal,
  handleEditingTransferAmount,
  handleDeletingTransferAmount,
  onCancel,
} = slice.actions;

export default slice.reducer;

// [
//   TransferAmounts:[

//   ],
//   isAuthenticated:false,
//   activeTransferAmount:{}
// ]




// {

//   reducers: function-ka camal uma shaqeeyaan,
//              what they do: they mutate state,
//               they take two arguments: state, action,
//               they return the new state

//               what they don't do,
//               they don't return values

// }