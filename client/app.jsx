import React, { Component } from "react";

import HomePage from "./container/HomePage";
import Header from "./components/header";

const App = props => {
  return (
    <div>
      <Header></Header>
      <HomePage></HomePage>
    </div>
  );
};

export default App;
