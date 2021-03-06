import React, { Component } from 'react'
import { useState } from 'react'

const Header = ({ first, second, third, fourth, action, classx }) => (

  <div className={`header p-4 z-depth-1 ${classx}`}>
    <div className="head">
      {first}
    </div>
    <div className="head">
      {second}
    </div>
    <div className="head">
      {third}
    </div>
    <div className="head toon">
      {fourth}
    </div>
  </div>
)

export default Header