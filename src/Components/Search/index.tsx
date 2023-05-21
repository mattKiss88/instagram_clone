import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Header,
  RightSide,
  ScrollCtn,
  SearchContainer,
  SearchResultsCtn,
  UserItem,
} from "./styles";
import {
  SearchContainer as SearchBarCtn,
  Search as SearchBar,
} from "../Navbar/styles";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  fetchUsers,
  resetUsers,
  searchResult,
} from "../../Redux/searchUsersSlice";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";

interface SearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean | null>>;
  showSearch: boolean | null;
}

const Search: React.FC<SearchProps> = ({ setShowSearch, showSearch }) => {
  const [showSearchIcon, setShowSearchIcon] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const searchResults = useAppSelector(searchResult);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debouncedSearchTerm: string = useDebounce(search, 500); // debounce delay is 500 milliseconds
  const ref = useRef(null);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

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

  if (showSearch === null) {
    return null;
  }

  return (
    <SearchContainer showAnimation={!!showSearch} ref={ref}>
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
        <ScrollCtn>
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
        </ScrollCtn>
      </SearchResultsCtn>
    </SearchContainer>
  );
};

export default Search;
