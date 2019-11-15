import React from "react";
import StockList from "../components/StockList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import RenderList from "../components/renderList.jsx";

const CompanySearch = ({
  whichTab,
  togglePopup,
  favorites,
  buys,
  buysListChangeHandler,
  favsListChangeHandler,
  stockListChangeHandler,
  name,
  nameChangeHandler,
  email
}) => {
  let listOfCompanies;
  if (whichTab == "1") {
    listOfCompanies = <StockList name={name} togglePopup={togglePopup} />;
  } else if (whichTab == "2") {
    listOfCompanies = (
      <div>
        <RenderList list={favorites} togglePopup={togglePopup} />
      </div>
    );
  } else if (whichTab == "3") {
    listOfCompanies = (
      <div>
        <RenderList email={email} list={buys} togglePopup={togglePopup} />
      </div>
    );
  }

  console.log("WHICH TAB: ", whichTab);
  console.log("list of companies buys: ", listOfCompanies);

  return (
    <div>
      <SearchBar
        whichTab={whichTab}
        buysListChangeHandler={buysListChangeHandler}
        stockListChangeHandler={stockListChangeHandler}
        favsListChangeHandler={favsListChangeHandler}
        name={name}
        nameChangeHandler={nameChangeHandler}
      />

      {listOfCompanies}
    </div>
  );
};

export default CompanySearch;
