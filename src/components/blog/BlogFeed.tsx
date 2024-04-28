import { usePosts, useUsers } from "../../hooks/useReduxSelectors";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loader from "../shared/Loader";
import BlogCard from "./BlogCard";
import "./BlogFeed.css";
import BlogForm from "./BlogForm";
import { PAGE_TITLES } from "../../constants/pageTitles";
import useTitleSetter from "../../hooks/useTitleSetter";
import { Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../constants/appRoutes";
import SearchButton from "../shared/buttons/SearchButton";
import useBlogFilterState from "../../hooks/useBlogFilterState";
import useSearchFilter from "../../hooks/useSearchFilter";
import Post from "../../models/post";
import { useEffect, useState } from "react";
import { SelectOptionType } from "../../types/selectOption";
import Dropdown from "../shared/Dropdown";
import { SORT_OPTIONS, SORT_OPTIONS_LABELS } from "../../constants/sortOptions";

export default function BlogFeed() {
  const posts = usePosts();
  const users = useUsers();
  const currentUser = useCurrentUser();
  const location = useLocation();
  const [sortValue, setSortValue] = useState<string>(SORT_OPTIONS.LATEST);
  useTitleSetter(PAGE_TITLES.BLOGS);
  const [initialBlogs, filteredBlogs, setFilteredBlogs] = useBlogFilterState();
  const { searchFilter, setSearchFilter, handleSearch } = useSearchFilter<Post>(
    filterBlogs,
    setFilteredBlogs
  );
  const sortOptions: SelectOptionType[] = [
    {
      value: SORT_OPTIONS.LATEST,
      label: SORT_OPTIONS_LABELS[SORT_OPTIONS.LATEST],
      selected: true,
    },
    {
      value: SORT_OPTIONS.OLDEST,
      label: SORT_OPTIONS_LABELS[SORT_OPTIONS.OLDEST],
    },
  ];

  const isFeed =
    location.pathname.replace(/\//g, "") ===
    APP_ROUTES.BLOGS.replace(/\//g, "");

  const getUser = (userId: number) => {
    return users.data?.find((user) => user.id === userId) || null;
  };

  function filterBlogs(searchFilter: string) {
    return initialBlogs.filter((blog: Post) => {
      return (
        blog.title
          .toLocaleLowerCase()
          .includes(searchFilter.toLocaleLowerCase()) ||
        blog.body
          .toLocaleLowerCase()
          .includes(searchFilter.toLocaleLowerCase()) ||
        getUser(blog.userId)
          ?.name.toLocaleLowerCase()
          .includes(searchFilter.toLocaleLowerCase())
      );
    });
  }

  useEffect(() => {
    if (!searchFilter) handleSearch(null as unknown as Event);

    const sortBlogs = () => {
      if (sortValue === SORT_OPTIONS.LATEST)
        return filteredBlogs
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      else
        return filteredBlogs
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
    };

    const sortedBlogs = sortBlogs();
    setFilteredBlogs(sortedBlogs);
  }, [searchFilter, sortValue]);

  return (
    <div className="posts-container w-100">
      <Outlet />
      {isFeed && (
        <>
          <div className="d-flex gap-5">
            {posts.data && (
              <SearchButton
                searchFilter={searchFilter}
                handleSearch={handleSearch}
                setSearchFilter={setSearchFilter}
              />
            )}
            <Dropdown options={sortOptions} changeHandler={setSortValue} />
          </div>
          {currentUser && <BlogForm />}

          {posts.loading ? (
            <Loader />
          ) : (
            filteredBlogs?.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                createdBy={getUser(post.userId)}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
