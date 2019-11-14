import React, { Component } from "react";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    fetch("/news/topNews")
      .then(result => result.json())
      .then(result => {
        this.setState({ news: result });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const newsArray = [];
    for (let i = 0; i < this.state.news.length; i++) {
      newsArray.push(
        <div className="article">
          <a href={this.state.news[i].url} key={"key " + i}>
            {this.state.news[i].title}
          </a>
          <div>{this.state.news[i].content}</div>
        </div>
      );
    }

    return (
      <div className="news-div">
        <h2 className="news-div-title">News</h2>
        <div className="news-div-links" id="newsFeed">{newsArray}</div>
      </div>
    )
  }
}

export default News;
