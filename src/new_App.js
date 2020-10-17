import React, { Component } from "react";
import "./assets/styles/app.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import HomePage from "./pages/home/index";
import EventPage from './pages/event'
import MemberPage from './pages/members/index'
import Payment from './pages/payment/payment'
import Payment_History from './pages/pay_history'



// NAVS
import UserOnTop from "./layouts/nav/user_on_top";
import NavOptions from "./layouts/nav/nav_options";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.onShow = this.onShow.bind(this);
  }
  onShow() {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    let { show } = this.state;
    return (
      <Router>
        <UserOnTop />
        <div className="sort_app ">
          <div className="sticker over_hide ">
            <div className="flex text-center hide_over sm-show-flex  flex sticky member_status text-white py-3">
              <div className="my-col-2 mt-1   tone m-0">DASHBOARD</div>
              <div className="flex-2 down_ed  pr-md-5 mr-md-5">
                <span className="font-light">Membership Status:</span>
                <span className="smaller pl-1"> ACTIVE</span>
              </div>
            </div>
            <div className="blacko h-100 sticky z-depth-1">
              <div
                className={`sort_nav mt-0 p-0 pb-1 mx-0 over_hide sticker text-center ${show}`}
              >
                <div className="falo ">
                  <NavOptions />
                </div>
              </div>
            </div>
            <div
              className="heart  z-depth-1 show-more sm-show py-3   pointer"
              onClick={this.onShow}
            >
              <div className="rali mr-1 ralo"> Show More</div>{" "}
              <div className="fa fa-angle-down" />
            </div>
          </div>
          <div className="sort_page flex-2 mx-auto mt-md-5 mt-4">
            <>
              <Switch>
                <Route path="/create-event" component={HomePage} />
                <Route path="/event_page" component={EventPage} />
                <Route path="/invite" component={EventPage} />
                <Route path="/edit_event" component={EventPage} />
                <Route path="/payment_history" component={Payment_History} />
                <Route path="/members" component={MemberPage} />
                <Route path="/payment" component={Payment} />
                <Route path="/" component={HomePage} />
              </Switch>
            </>
          </div>
        </div>
        {/* {this.props.nav && <Footer />} */}
      </Router>
    );
  }
}


const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps
)(App);
