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
            <table className="table table-sm mb-0">
              <thead>
                <tr className="mdb-color lighten-5 blue-grey-text">
                  <th className="date">Date</th>
                  <th className="info">Info</th>
                  <th className="action"></th>
                </tr>
              </thead>
            </table>
            <div className="table-wrapper table-fixed-header">
              <table className="table table-striped table-sm mb-0">
                <tbody>
                {history.map((history, index) => 
                  <tr key={index}>
                    <td className="date">Date</td>
                    <td className="info">{history.list}</td>
                    <td className="action">
                      <a href="" data-toggle="tooltip" data-placement="left" title="View">
                        <i className="fas fa-lg fa-eye blue-grey-text"></i>
                      </a>
                    </td>
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
