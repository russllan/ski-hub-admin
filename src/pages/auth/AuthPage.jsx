import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { setLocalStorage } from "../../hooks/localStorage.helper";
import { toast } from "react-toastify"

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [authData, setAuthData] = useState();
  const navigation = useNavigate();

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
      console.log(res);
      if (res.role === "superAdmin") {
        setIsError(false);
        setLocalStorage(res.token);
        toast.success("Success login!")
        navigation("/adminHome");
        localStorage.setItem("superAdmin", true)
      } else if (res.role === "admin") {
        setIsError(false);
        setLocalStorage(res.token);
        toast.success("Success login!")
        navigation("/adminHome");
        localStorage.setItem("superAdmin", false)
      }
      else {
        setIsError(true);
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.error("Ошибка входа:", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center text-gray-800">Вход</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="phoneNumber"
            >
              Номер телефона
            </label>
            <input
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Вход..." : "Войти"}
            </button>
          </div>
        </form>
        {isError && (
          <p className="mt-4 text-center text-red-600">
            Данный пользователь не является админом!
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
