import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { BsExclamationTriangle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// import { addAuditLog } from "../redux/Audit/Audit";
import deleteObject from "../apicalls/dynamicDelete";

{
  // open,
  // setOpen,
  // onDelete,
  // user,
}

export default function DeleteConfirmationModal({
  getNewData,
  setGetNewData,
  name,
  title,
  modalState,
  onCancel,
  object,
}) {
  const dispatch = useDispatch();

//   const authUser = useSelector((state) => state.auth.activeUser);

  const handleDelete = async () => {
    // switch (title) {
    //   case "user": {
    //     const auditLog = {
    //       title: "User Deleted",
    //       desc: `${authUser.name} has deleted a user (${object.username})`,
    //       user: `${authUser.name}(${authUser.phone})`,
    //     };
    //     dispatch(addAuditLog(auditLog));
    //     break;
    //   }
    //   default:
    //     console.error("Invalid title provided for delete confirmation modal");
    //     break;
    // }
    const objectToBeDeleted = {
      id: object.id,
      title,
    };

    const response = await deleteObject(objectToBeDeleted);

    if (response.success) {
      setGetNewData(!getNewData);
      toast.success(response.message);
      dispatch(onCancel(false));
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Dialog
      open={modalState} // the state that opens the modal
      onClose={() => dispatch(onCancel(false))} // On cancel
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <BsExclamationTriangle
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Delete {title} {/* Title */}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to this {title}:{name}? <br /> This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleDelete()}
                // Oncancel
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => dispatch(onCancel(false))}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
