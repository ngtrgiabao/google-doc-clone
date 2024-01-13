import { useState } from "react";

interface IconButtonProps {
  icon: JSX.Element;
  tooltip: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
}

const IconButton = ({ icon, tooltip, onClick }: IconButtonProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative flex justify-center items-center"
    >
      <button
        className="text-gray-600 flex justify-center items-center w-7 h-7 rounded hover:bg-gray-100"
        onClick={() => onClick && onClick()}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute top-full flex-col flex items-center">
          <div className="arrow-up border-b-gray-700"></div>
          <div className="relative -top-[1px] bg-gray-700 text-white text-xs font-medium text-center py-1 px-2 rounded-sm">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconButton;
