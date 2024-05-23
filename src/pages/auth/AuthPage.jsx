import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { setLocalStorage } from "../../hooks/localStorage.helper";

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [authData, setAuthData] = useState();
  const navigation = useNavigate()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-base"],
    mutationFn: async (data) => authService.login(data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        phoneNumber: phoneNumber,
        password: password,
      };
      const res = await mutateAsync(data);
      setAuthData(res);
      // Здесь можно выполнить дополнительные действия после успешного входа
      if (res.role === "admin") {
        setIsError(false);
        setLocalStorage(res.token);
        navigation('/adminHome')
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="w-screen h-[450px] max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            type="number"
            id="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:bg-blue-600"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Вход..." : "Войти"}
        </button>
      </form>
      {isError ? <p>Данный пользователь не является админом!</p> : null}
    </div>
  );
};

export default AuthPage;
