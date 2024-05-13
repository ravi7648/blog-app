import { ChangeEvent, MouseEventHandler } from "react";

export default function SearchButton({
  searchFilter,
  setSearchFilter,
  handleSearch,
}: {
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
  handleSearch: MouseEventHandler<HTMLButtonElement>;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  return (
    <form className="d-flex mb-4 gap-2">
      <input
        id="search-filter"
        name="search-filter"
        className="form-control mr-sm-2"
        type="search"
        defaultValue={searchFilter}
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
   );
}
