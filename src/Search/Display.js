import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import Accordion from './Accordion'
import Loader from '../Loader'

class Display extends Component {
  state = {
    data: [],
    selected: [...this.props.selected],
    count: 0,
    num: 10,
    error: null,
    loading: false
  }

  clearErrorMsg = () => {
    setTimeout(() => {
      this.setState({error: null});
    }, 3000);
  }

  clearAll = () => {
    this.setState({selected: []});
    this.props.clear();
  }

  toggle = id => {
    let newData = [...this.state.data];
    let index = newData.findIndex(obj => obj.details_id === id);
    newData[index].open = !newData[index].open;
    this.setState({data: [...newData]});
  }

  add = id => {
    if(this.state.selected.length < 5) {
      this.setState({selected: [...this.state.selected, id]});
      this.props.toAdd(id);
    } else {
      this.setState({error: 'Cannot compare more than 5 funds!!!'});
      setTimeout(() => {
        this.setState({error: null});
      }, 3000);
    }
  }

  remove = id => {
    let newSelected = [...this.state.selected];
    let index = newSelected.indexOf(id);
    newSelected.splice(index, 1);
    this.setState({selected: [...newSelected]});
    this.props.toRemove(id);
  }

  getData = val => {
    if(val === '') {
      this.setState({data: []});
      return;
    }

    const data = {
      search: val,
      rows: 1,
      offset: 1
    };

    this.setState({
      error: null,
      loading: true
    });

    fetch('https://api.piggy.co.in/v2/mf/search/', {
      method: 'POST',
      authorization: 'a41d2b39e3b47412504509bb5a1b66498fb1f43a',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    }).then(res => res.json())
      .then(val => {
        let { data : { search_results } } = val;
        search_results = search_results.map(res => {
          return {
            ...res,
            open: false
          }
        });
        
        if(search_results.length === 0) {
          this.setState({
            data: [],
            count: 0,
            error: 'No Results Found',
            num: 10,
            loading: false
          });
          this.clearErrorMsg();
        } else {
          this.setState({
            data: [...search_results],
            count: search_results.length,
            num: 10,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: 'Some Error Occured, please try again after refreshing',
          loading: false
        });
        this.clearErrorMsg();
      });
  }

  handleClick = e => {
    e.preventDefault();
    let { count, num } = this.state;
    if(count-num < 10)
      this.setState({num: count});
    else
      this.setState({num: num+10});
  }

  componentDidMount() {
    const {formVal} = this.props;
    this.getData(formVal);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.formVal !== this.props.formVal) {
      const {formVal} = this.props;
      this.getData(formVal);
    }
  }

  render() {
    const { data, num, selected, count, error, loading } = this.state;
    let output = [...data];
    output = output.splice(0,num);

    output = output.map(obj => {
      let id = obj.details_id;
      let op = selected.filter(oid => oid === id).length;
      let btn = (<button 
        className="compare-btn add" 
        onClick={() => this.add(id)}>Add to Compare</button>)
      if(op===1) {
        btn = <button className="compare-btn remove" onClick={() => this.remove(id)}>Remove from Compare</button>
      }
      return (
        <Accordion 
          key={id} 
          details={obj} 
          toggle={() => this.toggle(id)} >{btn}</Accordion>
      )
    });

    let errorMsg = null;
    let clearAll = false;

    if(selected.length > 0) {
      clearAll = true;
    }

    if(error) {
      errorMsg = <div className="error"><p>{error}</p></div>
    }

    return (
      <div>
        <Form />
        <div className="all-purpose-btn">
          <button disabled={!clearAll} onClick={this.clearAll}>Clear Compare List</button>
        </div>
        {loading ? <Loader /> : null}
        {errorMsg}
        <div className="display">
          {output}
        </div>
        {(data.length>0 && num<count) 
          ? <div className="all-purpose-btn"><button onClick={this.handleClick}>Show More</button>
          </div>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formVal: state.formVal,
    selected: [...state.selected]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toAdd: (id) => dispatch({type: 'ADD', id: id}),
    toRemove: (id) => dispatch({type: 'REMOVE', id: id}),
    clear: () => dispatch({type: 'CLEAR'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
