/* eslint-disable react-hooks/exhaustive-deps */
////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////
// Packages
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Application files
import {
  setOrderOptions,
  setFilterOptions,
  setStoredPage,
  setClearSearch,
  getCountries,
} from "../../redux/actions";

// CSS
import landing from "../../styles/components/LandingPage/LandingPage.module.css";
import planeButton from "../../styles/images/planeButton.png";

////////////////////////////////////////////////////////////////////////////
// Code
////////////////////////////////////////////////////////////////////////////
// Component: prepares data and leads to the main function Home
export function LandingPage() {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.allCountries);

  // Reset filters, pagination, and gets data from db
  useEffect(() => {
    if (!allCountries.length) dispatch(getCountries());
    dispatch(setOrderOptions([]));
    dispatch(
      setFilterOptions({
        continent: "",
        activity: "",
      })
    );
    dispatch(setClearSearch(true));
    dispatch(setStoredPage(1));
  }, []);

  // Alien surprise
  const handleKeyboard = (e) => {
    e.preventDefault();
    if (e.repeat) return;

    // Handle both, `ctrl` and `meta`.
    if (e.metaKey || e.ctrlKey) console.log(e.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  });

  //////////////////////////////////////////////////////////////////////////
  // Render
  //////////////////////////////////////////////////////////////////////////
  return (
    <div className={`${landing.bgColor}`}>
      <div className={`${landing.bgImage}`} />
      <div className={`${landing.enter}`}>
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={planeButton}
            alt="Enter Button"
            style={{ width: "100%" }}
            // className={`${landing.enter}`}
          />
        </Link>
      </div>
    </div>
  );
}
