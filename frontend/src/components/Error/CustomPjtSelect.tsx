import { useState, useEffect } from "react";

interface ProjectList {
  options: string[];
  selectedOption: string;
  handleSelectProject: (project: string) => void;
}

const CustomPjtSelect = ({
  options,
  selectedOption,
  handleSelectProject,
}: ProjectList) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(options, "이거는 옵션,,");
    // 아무것도 선택되지 않았을 때 자동으로 맨 처음 프로젝트 선택
    if (!selectedOption && options.length > 0) {
      handleSelectProject(options[0]);
      console.log("이거는 useEffect", options[0]);
    }
    console.log("이거는 useEffect", selectedOption);
  }, [selectedOption, options, handleSelectProject]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (isOpen) setIsOpen(false);
    }, 100);
  };

  const handleOptionClick = (option: string) => {
    console.log("이거는 handleOptionClick", option);
    handleSelectProject(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-1 inline-block">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
            className="inline-flex w-72 justify-between rounded-2xl border-[1px] border-gray-400 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            {selectedOption || (options.length > 0 && options[0])}
            <img
              className="h-6 w-6"
              alt="Dropdown_Icon"
              src={isOpen ? "/icons/SelectUp.png" : "/icons/SelectDown.png"}
            />
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-72 origin-top-left rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPjtSelect;
