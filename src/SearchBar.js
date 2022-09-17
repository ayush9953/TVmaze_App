import "./index.css";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";

function SearchBar({ getData }) {
  const [data, onChange] = useState({ type: "", name: "" });

  function pass(e) {
    getData(data);
  }

  return (
    <div className="search">
      <div className="area">
        <h2>Search for Movie or Actor</h2>
        <div className="radio">
          <input
            type="radio"
            onClick={() => onChange({ ...data, type: "Movie" })}
            id="Movie"
            name="grp"
            value="Movie"
          />
          Movie
          <input
            type="radio"
            onClick={() => onChange({ ...data, type: "Actor" })}
            id="Actor"
            name="grp"
            value="Actor"
            defaultChecked
          />
          Actor
        </div>
        <div>
          <input
            id="textF"
            type="search"
            placeholder="Enter the title i.e Friends"
            onChange={(e) => onChange({ ...data, name: e.target.value })}
          />
          <button onClick={pass} id="icons">
            <i>
              <FaSearch />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
