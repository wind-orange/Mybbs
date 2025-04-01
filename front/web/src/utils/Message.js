import { ElMessage } from "element-plus";

const showMessage = (msg, callback, type) => {
  ElMessage({
    message: msg,
    type: type,
    duration: 2000,
    onClose: () => {
      if (callback) {
        callback();
      }
    },
  });
};

const Message = {
  success(msg, callback) {
    showMessage(msg, callback, "success");
  },
  warning(msg, callback) {
    showMessage(msg, callback, "warning");
  },
  error(msg, callback) {
    showMessage(msg, callback, "error");
  },
};

export default Message;