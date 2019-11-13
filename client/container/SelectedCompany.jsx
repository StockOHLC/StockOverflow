import React from "react";
import StockPopUp from "../components/StockPopup";

const SelectedCompany = props => {
  return (
    <div>
      {props.isPicked ? (
        <StockPopUp
          userName={props.userName}
          symbol={props.companySymbol}
          companyName={props.companyName}
          closePopup={props.togglePopup}
        />
      ) : null}
      />
    </div>
  );
};

export default SelectedCompany;
