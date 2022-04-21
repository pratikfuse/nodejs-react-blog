class AuthHandler extends EventTarget {}

const authHandler = new AuthHandler();

const eventListener = () => {
  console.log("asd");
};

const authListener = (navigate: (path: string) => void) => {
  authHandler.addEventListener("auth", eventListener);
};

const removeAuthListener = (navigate: (path: string) => void) => {
  authHandler.removeEventListener("auth", console.log);
};

export { authHandler, authListener, removeAuthListener };
