import { Dispatch, SetStateAction } from "react";
import { SelectOptionType } from "../../types/selectOption";

export default function Dropdown({
  options,
  changeHandler,
}: {
  options: SelectOptionType[];
  changeHandler: Dispatch<SetStateAction<string>>;
}) {
  const handleSelect = (event: any) => {
    changeHandler(event.target.value);
  };

  return (
    <form className="d-flex mb-auto">
      <select
        className="form-select"
        aria-label="Select blog sort"
        onChange={handleSelect}
        defaultValue={options[0].value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
