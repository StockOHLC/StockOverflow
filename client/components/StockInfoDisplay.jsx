import React, { useState, useEffect } from "react";

const StockInfoDisplay = props => {
  let name;
  let symbol;
  const [numberOfShare, updateShare] = useState(0);
  const [stockPriceAndDate, updatePrice] = useState({
    price: 0,
    date: "2018-01-01"
  });

  if (props.stockName) {
    name = props.stockName;
    symbol = props.stockSymbol;
  }

  const saveNumberOfShares = e => {
    console.log("save number of shares");
    if (Number(e.target.value) === "NaN") alert("Please type the number!");
    else {
      updateShare(Number(e.target.value));
      console.log(numberOfShare);
    }
  };

  const saveDate = e => {
    let newDate = e.target.value;
    console.log("save data: ".props.data);
    let newPrice;
    for (let i = 0; i < props.data.changes.length; i++) {
      if (Object.values(props.data.changes[i])[0] !== undefined) {
        newPrice = Object.values(props.data.changes[i])[0];
        break;
      }
    }
    console.log("new price", newPrice);
    updatePrice({
      date: e.target.value,
      price: Number(newPrice)
    });
  };

  const handleBuy = () => {
    if (!props.userName) alert("please sign in!");
    else {
      fetch("/stocks/buys/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_address: props.userName,
          boughtStockId: symbol,
          purchasedPrice: stockPriceAndDate.stockPrice,
          numberOfShare: numberOfShare
        })
      }).catch(err => console.log(err));
    }
  };
  console.log(stockPriceAndDate.stockPrice);
  return (
    <div id="stockBuyInfo">
      <p>What date do you want to buy?</p>
      <input type="date" onChange={saveDate}></input>
      <p>Price: {stockPriceAndDate.stockPrice}</p>
      <p>How many shares?</p>
      <input type="text" onChange={saveNumberOfShares}></input>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default StockInfoDisplay;
