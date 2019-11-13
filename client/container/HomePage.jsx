import React, { Component } from "react";

import StockList from "./StockList";
import NewsChat from "./NewsChat";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <section>
          <StockList></StockList>
        </section>

        <section>
          <NewsChat></NewsChat>
        </section>
      </div>
    );
  }
}

export default HomePage;
