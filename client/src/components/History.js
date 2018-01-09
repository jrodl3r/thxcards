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
        <div className="card-header history-header white-text">History</div>
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
                {history.map((item, index) => 
                  <tr key={item._id}>
                    <td className="date">Date</td>
                    <td className="info">{item.list}</td>
                    <td className="action">
                      <a href="" title="View" data-toggle="modal" data-target="#viewHistoryModal">
                        <i className="fas fa-lg fa-eye blue-grey-text"></i>
                      </a>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="viewHistoryModal" tabIndex="-1" role="dialog"
              aria-labelledby="viewHistoryModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="viewHistoryModalLabel">View History</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    View History
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
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
