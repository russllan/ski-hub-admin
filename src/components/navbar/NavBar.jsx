import React from "react";
import { Link, useLocation } from "react-router-dom";
import { data } from "./constants";

export default function NavBar() {
  const location = useLocation();
  const isSupAdmin = localStorage.getItem("superAdmin") === "true";

  return (
    <div className=" h-screen px-4 border-r-2 border-blue-950">
      <div className="h-full flex flex-col items-center gap-5 pt-10 ">
        {data.map((item) => (
          <div key={item.name}>
            {item.link === "/addnewadmin" && !isSupAdmin ? (
              <div
                className="w-60 rounded-[5px]  bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                <h3>{item.name}</h3>
              </div>
            ) : (
              <Link to={item.link}>
                <div
                  className={
                    location.pathname === item.link
                      ? "transition-all w-60 rounded-[5px] py-2 px-5 bg-sky-950 text-white"
                      : "w-60 rounded-[5px] py-2 px-5 hover:bg-sky-950 hover:text-white transition-all"
                  }
                >
                  <h3>{item.name}</h3>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

