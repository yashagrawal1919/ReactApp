import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Display from './Search/Display'
import Compare from './Compare/Compare'
import Navbar from './Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div>
          <Route path='/ReactApp' component={Display} exact />
          <Route path='/ReactApp/compare' component={Compare} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
