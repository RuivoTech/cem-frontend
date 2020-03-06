export const TOKEN_KEY = "@testes";
export const estaAutenticado = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const login = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};
export const logout = async () => {
    await window.location.assign("/");

    sessionStorage.removeItem(TOKEN_KEY);
};

export const getSession = () => {
    const jwt = sessionStorage.getItem(TOKEN_KEY);
    let session;
    try {
      if (jwt) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        session = JSON.parse(window.atob(base64));
      }
    } catch (error) {
      console.log(error);
    }
    return session;
  }