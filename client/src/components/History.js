import React, { Component } from 'react';

class History extends Component {
  state = { history: [] }

  componentDidMount() {
    this.getHistory();
  }

  getHistory = () => {
    fetch('/api/history')
      .then(res => res.json())
      .then(history => this.setState({ history }));
  }

  render() {
    const { history } = this.state;

    return (
      <section className="card mb-5">
        <div className="card-header secondary-color white-text">History</div>
        <div className="card-body">
          {history.length ? (
            <ul>
              {history.map((item, index) =>
                <li key={index}>{item.list}</li>
              )}
            </ul>
          ) : (
            <div className="empty-text">No Items</div>
          )}
        </div>
      </section>
    );
  }
}

export default History;
