import React, { useState, useEffect, useCallback } from "react";
import Search from "./Search.js";
import SearchResults from "./components/SearchResults/index.js";
// import SearchResults from "./SearchResults.js";
// import FakeBookings from "./data/fakeBookings.json";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    display: false,
    error: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleSearchInput = (userSearch) => {
    console.log("from Bookings.js ...");
    console.log(userSearch);
    setSearchInput(userSearch);
    console.log("booking.js search input:");
  };

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch("https://cyf-react.glitch.me");
      if (!response.ok) {
        setErrorMessage((prev) => {
          const currErrorStatus = { ...prev };
          currErrorStatus.display = true;
          currErrorStatus.error = response;
          console.log(currErrorStatus);
          return currErrorStatus;
        });
      }

      const data = await response.json();

      setBookings(data);
    } catch (error) {
      setErrorMessage((prev) => {
        const currErrorStatus = { ...prev };
        currErrorStatus.display = true;
        currErrorStatus.error = error;
        return currErrorStatus;
      });
    }
  }, []);

  useEffect(() => {
    if (bookings.length === 0) {
      // fetch("https://cyf-react.glitch.me")
      //   .then(response => response.json())
      //   .then(data => setBookings(data));
      fetchBookings();
    }

    if (bookings.length > 0 && isLoading) {
      setIsLoading(false);
    }
  }, [fetchBookings, bookings, isLoading]);

  let content;

  if (isLoading) {
    content = (
      <h4
        style={{
          background: "rgba(200, 0, 0, 0.1)",
          width: "100%",
          height: "50px",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          padding: "0.5rem 0 0 5%",
        }}
      >
        Loading...
      </h4>
    );
  }

  if (!isLoading) {
    content = (
      <div className="container">
        <Search searchVal={searchInput} handler={handleSearchInput} />
        <SearchResults
          results={
            searchInput
              ? bookings.filter(
                  (booking) =>
                    booking.firstName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) ||
                    booking.surname
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                )
              : bookings
          }
        />
      </div>
    );
  }
};

if (errorMessage.display) {
  content = (
    <h4
      style={{
        background: "rgba(200, 0, 0, 0.1)",
        width: "100%",
        height: "100px",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        padding: "1.5rem 0 0 5%",
        overflow: "hidden",
      }}
    >
      {" "}
      Sorry, it appears something is wrong, an error with code{" "}
      {errorMessage.error.status} was generated
    </h4>
  );
}

return <div className="App-content">{content}</div>;
//};
export default Bookings;
