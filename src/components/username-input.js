import { UserStore } from "../store";

const usernameInput = () => {
  return new UserStore().get()?.username
    ? `<input name="username" id="username" type="hidden" value="${new UserStore().get().username}"/>`
    : "";
};

export default usernameInput;
