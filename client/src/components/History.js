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
        <div className="card-header purple-gradient white-text">History</div>
        {history.length ? (
          <div className="card-body p-0">
            <div class="table-wrapper">
              <table className="table table-striped table-sm mb-0">
                <tbody>
                {history.map((history, index) => 
                  <tr key={index}>
                    <td>{history.list}</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="empty-text">No Items</div>
          </div>
        )}
      </section>
    );
  }
}

export default History;
