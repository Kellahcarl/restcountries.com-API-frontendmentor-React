import React, { useReducer } from "react";
import Header from "./components/navbar";
import Countries from "./components/countries";
import Country from "./components/country";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useFetch from "./components/useFetch";
import { reducer } from "./reducers/searchReducer";

const initialState = {
  inputField: undefined,
  search: undefined,
  filtra: "All",
  data: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputField, search, filtra, data } = state;

  const { data: fetchData } = useFetch("https://restcountries.com/v2/all");

  // Dispatch actions to update state
  const setInputField = (value) => {
    dispatch({ type: "SET_INPUT_FIELD", payload: value });
  };

  const setSearch = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  const setFilter = (value) => {
    dispatch({ type: "SET_FILTER", payload: value });
  };

  const setData = (value) => {
    dispatch({ type: "SET_DATA", payload: value });
  };

  React.useEffect(() => {
    setData(fetchData);
  }, [fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
  };

  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearch(undefined);
    setInputField("");
  };

  const getCountryName = (code) => {
    let countryName;
    const country = data.filter((element) => {
      return element.alpha3Code === code;
    });
    countryName = country[0].name;
    return countryName;
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="inputField">
                  <input
                    type="search"
                    placeholder="Search for a country..."
                    value={inputField}
                    onChange={(e) => {
                      setInputField(e.target.value);
                      setSearch(e.target.value);
                    }}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <select id="region" name="region" onChange={handleSelect}>
                  <option value="All" defaultValue>
                    All
                  </option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">America</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </form>
            </div>
            <Countries
              filtra={filtra}
              input={search}
              numberWithCommas={numberWithCommas}
            />
          </Route>
          <Route
            path="/:countryName"
            children={
              <Country
                numberWithCommas={numberWithCommas}
                getCountryName={getCountryName}
              />
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
