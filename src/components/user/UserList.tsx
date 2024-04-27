import HoverTable from "../shared/HoverTable";
import SearchButton from "../shared/buttons/SearchButton";
import "./UserList.css";
import User from "../../models/user";
import useSearchFilter from "../../hooks/useSearchFilter";
import useUserFilterState from "../../hooks/useUserState";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";

export default function UserList() {
  const columns = ["id", "name", "username", "email", "phone", "website"];
  const location = useLocation();
  const [initialUsers, filteredUsers, setFilteredUsers] = useUserFilterState();
  const { searchFilter, setSearchFilter, handleSearch } = useSearchFilter<User>(
    filterUsers,
    setFilteredUsers
  );

  useEffect(() => {
    if (!searchFilter) handleSearch(null as unknown as Event);
  }, [searchFilter]);

  function filterUsers(searchFilter: string) {
    return initialUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchFilter.toLowerCase())
      );
    });
  }

  return (
    <div className="d-flex flex-column w-100 p-4">
      <Outlet />
      {location.pathname === APP_ROUTES.USERS && (
        <>
          <SearchButton
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            handleSearch={handleSearch}
          />
          <HoverTable columns={columns} dataSource={filteredUsers} />
        </>
      )}
    </div>
  );
}