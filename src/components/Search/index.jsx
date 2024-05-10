import React from "react";
import styles from "./Search.module.scss";
import { FaSearch } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

function Search({ searchValue, setSearchValue }) {
  return (
    <div className={styles.root}>
      <FaSearch className={styles.icon} />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <IoCloseOutline
          onClick={() => setSearchValue("")}
          className={styles.close}
        />
      )}
    </div>
  );
}

export default Search;
