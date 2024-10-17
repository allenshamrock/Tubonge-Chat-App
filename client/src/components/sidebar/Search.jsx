import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../common/Input";
import Error from "../common/Error";
import { searchFriendsAction } from "../../reduxStore/actions/friendsActions";
import { CLEAR_SEARCH_FREINDS } from "../../reduxStore/constants/friendsConstant";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const searchFriends = useSelector((state) => state.friends.searchFriends);
  const dispatch = useDispatch();
  const location = useLocation();

  const debouncedSearch = () =>
    useCallback(
      debounce((value) => {
        setIsSearching(true);
        dispatch(searchFriendsAction(value)).finally(() => {
          setIsSearching(false);
          setSearchCompleted(true);
        });
      }, 800)[dispatch]
    );

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputValue(value);
    setSearchCompleted(false);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setInputValue("");
    searchCompleted(false);
    setIsSearching(false);
  };

  useEffect(() => {
    return () => {
      clearSearch();
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    clearSearch();
    dispatch({
      type: CLEAR_SEARCH_FREINDS,
    });
  }, [location, dispatch]);

  return (
    <>
      <Input
        onChange={handleChange}
        placeholder="Search friends by username"
        value={inputValue}
      />
      {!isSearching &&
        searchCompleted &&
        inputValue !== "" &&
        !searchFriends && <Error errorMessage="No results found" />}
    </>
  );
};

export default Search;
