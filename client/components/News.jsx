import React, { Component } from "react";
import Axios from "axios";

class News extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("IS PICKED", this.props.isPicked);
    fetch("/news/topNews")
      .then(result => result.json())
      .then(result => {
        console.log("in fetch", result);
        this.props.newsChangeHandler(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.props.isPicked == true) {
      console.log(this.props.companyName);
      fetch("/news/currentNews", {
        method: "POST",
        body: JSON.stringify(this.props.companyName)
      })
        .then(result => result.json())
        .then(result => {
          console.log("in fetch", result);
          this.props.newsChangeHandler(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    console.log("props on render", this.props);
    const newsArray = [];
    for (let i = 0; i < this.props.news.length; i++) {
      newsArray.push(
        <div key={"key " + i} className="article">
          <a href={this.props.news[i].url}>{this.props.news[i].title}</a>
          <div>{this.props.news[i].content}</div>
        </div>
      );
    }

    return <div id="newsFeed">{newsArray}</div>;
  }
}

export default News;
