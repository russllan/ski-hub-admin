import React from "react";
import { Link, useLocation } from "react-router-dom";
import { data } from "./constants";

export default function NavBar() {

  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="w-[300px] h-screen bg-slate-50 shadow-lg">
      <div className="h-full flex flex-col items-center gap-5 pt-10 px-2">
        {data.map((item) => (
          <Link to={item.link}>
            <div
              key={item.name}
              className={location.pathname == item.link ? " transition-all w-60 rounded-[5px] py-2 px-5 bg-sky-950 text-white" : "w-60 rounded-[5px] py-2 px-5 hover:bg-sky-950 hover:text-white transition-all"}
            >
              <h3>{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div >
  );
}
