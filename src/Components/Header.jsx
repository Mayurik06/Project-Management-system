import React from "react";

function Header() {
  return (
    <div>
      <div className="bg-[url('/Header-bg.svg')] h-[150px] bg-cover bg-center grid grid-cols-2 align-middle p-6">
        <div className="flex items-center gap-3">
          <img
            src="back arrow.svg"
            alt="back"
            className=" text-white font-bold"
          />
          <p className="text-xl line-clamp-[27px] text-white font-bold">
            {" "}
            Create Project
          </p>
        </div>
        <div className="flex-1 align-middle">
            <img src="Logo.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Header;