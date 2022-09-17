import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar.js";
import {Player} from '@lottiefiles/react-lottie-player';
import loader from './loader.json';

import image from "./No-image.jpg";

import "./index.css";

function App() {
  const [all, setAll] = useState({
    url: false,
    type: "",
    name: "",
  });
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  function putData(some) {
    setAll({
      url: true,
      type: some.type,
      name: some.name,
    });
    isLoading(true);
  }

  useEffect(() => {
    let a;
    if (all.type === "Movie")
      a = "https://api.tvmaze.com/search/shows?q=" + all.name;
    else a = "https://api.tvmaze.com/search/people?q=" + all.name;

    setTimeout(async () => {
      if (all.url)
        await fetch(a)
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          });
      isLoading(false);
    }, 2000);
  }, [all.type, all.name, loading]);

  return (
    <div className="App">
      <SearchBar getData={putData} />
      <div className="mainData">
        {loading && (
          <Player
            src={loader}
            className="player"
            loop
            autoplay
          />
        )} 
        {all.url && !loading && data.length === 0 && <p>No data found</p>}
        {!loading &&
          data.map((item) => (
            <div className="list">
              {!loading && (
                <img
                  src={
                    "show" in item === false
                      ? item.person.image === null
                        ? image
                        : item.person.image.medium
                      : item.show.image === null
                      ? image
                      : item.show.image.medium
                  }
                  alt="No image"
                />
              )}

              <h3>
                {"show" in item === false ? item.person.name : item.show.name}
              </h3>
              <p>
                {"show" in item === false
                  ? item.person.country === null
                    ? ""
                    : item.person.country.name
                  : item.show.network === null
                  ? ""
                  : item.show.network.country.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
