import React, { useRef, useState } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addMovieHandler(movie) {
    console.log(movie);
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-fe5e1-default-rtdb.firebase.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
        }
      );
      // not working when error is thrown by fetch above :/
      console.log('response: ', response)
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      setError("Something went wrong!");
    }
    setIsLoading(false);
  }

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    addMovieHandler(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
    </form>
  );
}

export default AddMovie;
