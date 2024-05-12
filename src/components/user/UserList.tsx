import HoverTable from "../shared/HoverTable";
import SearchButton from "../shared/buttons/SearchButton";
import "./UserList.css";
import User from "../../models/user";
import useSearchFilter from "../../hooks/useSearchFilter";
import useUserFilterState from "../../hooks/useUserFilterState";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import { CustomColumnType } from "../../types/customColumn";
import ToggleButton from "../shared/buttons/ToggleButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditUser } from "../../hooks/useReduxDispatchers";

export default function UserList() {
  const columns = ["id", "name", "username", "email", "phone", "website"];
  const navigate = useNavigate();

  const location = useLocation();
  const editUser = useEditUser();
  const [initialUsers, filteredUsers, setFilteredUsers] = useUserFilterState();
  const { searchFilter, setSearchFilter, handleSearch } = useSearchFilter<User>(
    filterUsers,
    setFilteredUsers
  );
  const customColumns: CustomColumnType<boolean>[] = [
    {
      column: "blocked",
      html: (initialState) => <ToggleButton initialState={initialState} />,
      clickHandler: ({ id }: { id: number; target: any }) =>
        handleUserBlock(id, filteredUsers),
    },
    {
      column: "account",
      html: () => <EyeButton />,
      clickHandler: ({ id }: { id: number }) => navigate(APP_ROUTES.USER(id)),
    },
  ];

  function handleUserBlock(id: number, users: User[]) {
    const user = users.find((user) => user.id === id);

    if (user) {
      const editedUser = JSON.parse(JSON.stringify(user)) as User;
      editedUser.blocked = !user?.blocked;
      editUser(editedUser);
    }
  }

  useEffect(() => {
    if (!searchFilter) handleSearch(null as unknown as Event);
  }, [searchFilter]);

  function filterUsers(searchFilter: string) {
    return initialUsers.filter((user: User) => {
      return (
        user.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchFilter.toLowerCase())
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
          <HoverTable
            columns={columns}
            dataSource={filteredUsers}
            customColumns={customColumns}
          />
        </>
      )}
    </div>
  );
}

const EyeButton = () => {
  return (
    <button className="btn btn-outline-primary">
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
};
