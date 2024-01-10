import { useState } from "react";

const DocumentSearchbar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={`${isFocused ? "bg-white shadow-xl" : "bg-gray-100"} 
    w-full max-w-2xl rounded-md h-12 flex items-center text-gray-500 mr-4`}
    >
      <div className="flex justify-center px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        className={`${
          isFocused ? "bg-white" : "bg-gray-100"
        } w-full h-fullpr-4 font-medium`}
        placeholder="Search"
        name=""
        id=""
      />
    </div>
  );
};

export default DocumentSearchbar;
