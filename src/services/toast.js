import { createToaster } from "@meforma/vue-toaster";
const toastr = createToaster({
  position: "bottom-left",
});

const toast = {
  toastrSuccess(message) {
    toastr.success(message);
  },
  toastrError(message) {
    toastr.error(message);
  },
};

export default toast;
