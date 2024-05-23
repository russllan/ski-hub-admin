export const getLocalStorage = () => {
  try {
    const token = localStorage.getItem("key");
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.log("Ошибка при получении токена", error);
  }
};

export const setLocalStorage = async (data) => {
    try {
       return localStorage.setItem("key", JSON.stringify(data));
    } catch (error) {
        console.log("Ошибка при добавлении токена", error);
    }
}

export const removeLocalStorage = () => {
  try {
    localStorage.removeItem('key');
  } catch (error) {
    console.log("Ошибка при удалении токена", error);
  }
};