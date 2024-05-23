import React from "react";
import { Link } from "react-router-dom";
import { data } from "./constants";

export default function NavBar() {
  return (
    <div className="w-[300px] h-screen bg-slate-50 shadow-lg">
      <div className="h-full flex flex-col items-center gap-5 pt-10">
        {data?.map((item) => (
          <div
            key={item.name}
            className="w-60 rounded-[5px] py-2 px-5 hover:bg-sky-950 hover:text-white"
          >
            <Link to={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
