import React, { useState, useEffect } from "react";
import StockInfoDisplay from "./StockInfoDisplay.jsx";
// import ClipLoader from "react-spinners/ClipLoader";
import StockGraphDisplay from "./StockGraphDisplay.jsx";
import axios from "axios";

const StockPopup = props => {
  let price = 0;
  const [graphInfo, updateData] = useState({
    stockData: {},
    isLoading: true
    // price: 0
  });

  useEffect(() => {
    fetch(`/stocks/getAllPastStocks/${props.symbol}`)
      .then(data => data.json())
      .then(data => {
        console.log("data: ", data);
        updateData({
          stockData: data,
          isLoading: false
          // price: Object.values(data.changes[0])[0]
        });
        // console.log(Object.values(data.changes[0])[0]);
      });
  }, []);

  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  const handleSave = () => {
    props.closePopup();
  };

  const handleFav = () => {
    if (!props.userName) alert("please sign in!");
    else {
      fetch("/user/addfav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          favorites: props.favorites,
          email_address: props.userName,
          favStockId: props.symbol
        })
      })
        .then(result => result.json())
        .then(result => {
          setState({
            favorites: result.favorites
          });
        })
        .catch(err => console.log(err));
    }
  };

  // const handleUnfav = () => {
  //   if (!props.userName) alert("please sign in!");
  //   else {
  //   axios.post('/user/removefav', {
  //     body: JSON.stringify({
  //       favorites: props.favorites,
  //       removeStockId : props.symbol,
  //       email_address: props.userName,
  //     })
  //   })
  //   .then( result => result.json())
  //   .then( result => {
  //     setState({
  //       favorites:result.favorites
  //     })
  //   })}
  // }
  // console.log("this is graph Info", graphInfo);
  return (
    <div>
      {graphInfo.isLoading ? (
        // <div className="sweet-loading">
        //   <ClipLoader
        //   css={override}
        //   sizeUnit={"px"}
        //   size={150}
        //   color={'#123abc'}
        //   loading={graphInfo.isLoading}
        // />
        // </div>
        <div></div>
      ) : (
        <div>
          <p>
            {/* {props.companyName},{props.symbol} Today's Price {price}! */}
            <button onClick={handleFav}>Favorite</button>
          </p>
          <StockGraphDisplay data={graphInfo.stockData} />
          <StockInfoDisplay
            data={graphInfo.stockData}
            userName={props.userName}
            stockName={props.companyName}
            stockSymbol={props.symbol}
          />
          {/* back button instead of close button? */}
          <span className="closeButton" onClick={handleSave}>
            X
          </span>
        </div>
      )}
    </div>
  );
};

export default StockPopup;
