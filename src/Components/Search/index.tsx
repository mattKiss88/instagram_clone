import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Header,
  RightSide,
  SearchContainer,
  SearchResultsCtn,
  UserItem,
} from "./styles";
import {
  SearchContainer as SearchBarCtn,
  Search as SearchBar,
} from "../Navbar/styles";
import { useIsClickOutside } from "../../Hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchUsers,
  resetUsers,
  searchResult,
} from "../../Redux/searchUsersSlice";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";
// import useIsClickOutside from "../../Hooks/useIsClickOutside";

interface SearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowSearch }) => {
  const [showSearchIcon, setShowSearchIcon] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const { ref, isClickOutside } = useIsClickOutside(false);
  const searchResults = useAppSelector(searchResult);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debouncedSearchTerm: string = useDebounce(search, 500); // debounce delay is 500 milliseconds

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isClickOutside) {
      setShowSearch(false);
    }
  }, [isClickOutside]);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ): void => {
    // const id = (e.target as any).id;
    setShowSearch(false);
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    if (search) {
      dispatch(fetchUsers(search) as any);
    } else {
      dispatch(resetUsers());
    }
  }, [debouncedSearchTerm]);

  return (
    <SearchContainer showAnimation={true} ref={ref}>
      <Header>Search</Header>
      <SearchBarCtn>
        {/* {showSearchIcon && <SearchIcon style={{ width: "20px" }} />} */}
        <SearchBar
          placeholder="Search"
          onClick={() => setShowSearchIcon(false)}
          onChange={onSearchChange}
          // ref={ref}
          value={search}
        />
      </SearchBarCtn>
      <SearchResultsCtn>
        <h3>Results</h3>
        {searchResults.map((user: any, i) => {
          return (
            <UserItem
              onClick={(e) => handleClick(e, user.id)}
              id={user.id}
              key={i}
            >
              <Avatar
                src={
                  process.env.REACT_APP_S3_URL +
                  user?.Profile_picture?.mediaFileId
                }
                alt="profile"
              />
              <RightSide>
                <h4>{user.username}</h4>
                <p>{user.fullName}</p>
              </RightSide>
            </UserItem>
          );
        })}
      </SearchResultsCtn>
    </SearchContainer>
  );
};

export default Search;
