import { Link } from "react-router-dom";
import { LogoApp } from "../../../assets";

const Logo = () => {
  return (
    <Link
      to="/document/create"
      className="flex flex-shrink-0 justify-center items-center w-10 h-10 hover:bg-gray-100"
    >
      <img src={LogoApp} />
    </Link>
  );
};

export default Logo;
