import React, { useState, useEffect } from "react";

const StockBox = props => {
  let name;
  let symbol;
  if (props.stockName) {
    name = props.stockName;
    symbol = props.stockSymbol;
  }
  return (
    <div
      className="stock-div"
      // className="grow"
      // onClick={() => props.toggleCompanyPage(name, symbol)}
      onClick={() => props.togglePopup(name, symbol)}
    >
      <p className="individual-stock">{name}</p>
    </div>
  );
};

export default StockBox;
