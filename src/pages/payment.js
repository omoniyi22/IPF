import React, { Component } from "react";
import Dashboard from "../hoc/Dashboard";
import Axios from "axios";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
class PaymentPage extends Component {
  componentDidMount() {
    console.log(window.M);
    window.M.updateTextFields();
    this.getUserDebt();
  }
  getUserDebt = async () => {
    try {
      this.props.showLoader(true);
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get("/api/v1/pay/init-dues", {
        headers: { "x-access-token": token },
      });
      console.log(response.data);
      this.props.showLoader();
    } catch (error) {
      console.error(error.response);
      this.props.showLoader();
    }
  };
  submit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <Dashboard>
        <div className="container-fluid px-0  ">
          <form onSubmit={this.submit}>
            <div className="row mt-5 px-5">
              <div className="col-lg-12 mt-3">
                <select className="browser-default">
                  <option value="" disabled selected>
                    Pay For
                  </option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
              </div>
              <div className="col-lg-12 mb-5 mt-3">
                <div className="input-field">
                  <i className=" prefix">&#8358; </i>
                  <input id="amount" type="text" className="validate" />
                  <label htmlFor="amount">Amount</label>
                </div>
              </div>
              <div className="col-lg-12 d-flex justify-content-center">
                <button
                  class="btn waves-effect waves-light bg-yellow"
                  type="submit"
                  name="action"
                >
                  Procced
                  {/* <i class="material-icons right">check</i> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Dashboard>
    );
  }
}

export default connect(null, actions)(PaymentPage);
