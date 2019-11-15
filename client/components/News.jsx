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
        <div className="article" key={"key " + i}>
          <a href={this.state.news[i].url}>
            {this.state.news[i].title}
          </a>
          <div>{this.state.news[i].content}</div>
        </div>
      );
    }

    return <div id="newsFeed">{newsArray}</div>;
  }
}

export default News;
