import React, { Component } from "react";
import Header from "./Header";
import HeaderSecondary from "./HeaderSecondary";


class CustomHeader extends Component{
    render(){
        return (
            <div className="header-bg">
                <Header />
                <HeaderSecondary>
                    {this.props.children}
                </HeaderSecondary>
            </div>
        )
    }
}

export default CustomHeader;