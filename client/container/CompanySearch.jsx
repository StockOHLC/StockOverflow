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
      listOfCompanies = (
        <StockList name={name} togglePopup={togglePopup} />
      );
    } else if (whichTab == "2") {
      listOfCompanies = (
        <div>
          <RenderList
            list={favorites}
            togglePopup={togglePopup}
          />
        </div>
      );
    } else if (whichTab == "3") {
      listOfCompanies = (
        <div >
          <RenderList list={buys} togglePopup={togglePopup} />
        </div>
      );
    }
    
    return ( 
        <div>
            <h2 className="stocks-title">Stocks</h2>
            <hr className="searchbar-line"></hr>
            <section className="searchbar">
            <SearchBar 
                whichTab={whichTab}
                buysListChangeHandler={buysListChangeHandler}
                stockListChangeHandler={stockListChangeHandler}
                favsListChangeHandler={favsListChangeHandler}
                name={name}
                nameChangeHandler={nameChangeHandler}
            />
            </section>
            <hr className="searchbar-line"></hr>
              {listOfCompanies}
        </div>
     );
}
 
export default CompanySearch;
