import React, { Component } from 'react';
import XLSX from 'xlsx';

class ImportData extends Component {
  render() {
    return (
      <div className="modal fade" id="importDataModal" tabIndex="-1" role="dialog" aria-labelledby="importDataModallLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header black white-text">
              <h5 className="modal-title" id="importDataModallLabel">Import Data</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="white-text">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                TODO
              </div>
              <div className="modal-footer blue-grey lighten-5">
                <button type="button" className="btn btn-secondary waves-effect" data-dismiss="modal">Cancel</button>
                <input type="submit" className="btn btn-primary waves-effect" value="Import" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImportData;
