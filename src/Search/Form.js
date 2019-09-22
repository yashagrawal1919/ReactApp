import React, { Component } from 'react'
import { connect } from 'react-redux'

class Form extends Component {
  state = {
    formVal: this.props.formVal
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setVal(this.state.formVal);
  }

  handleChange = (e) => {
    this.setState({formVal: e.target.value});
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="search" placeholder="Search for mutual funds..." value={this.state.formVal} onChange={this.handleChange} />
          <input type="submit" value="Search" />
        </form>    
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formVal: state.formVal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVal: (search) => {dispatch({type: 'UPDATE_SEARCH', search: search})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);