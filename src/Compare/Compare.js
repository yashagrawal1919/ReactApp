import React, { Component } from 'react'
import { connect } from 'react-redux'
import Basic from './Basic'
import Details from './Details'
import Returns from './Returns'
import Loader from '../Loader'

class Compare extends Component {
  state = {
    compare: [],
    loading: true
  }

  clearAll = () => {
    this.setState({compare: []});
    this.props.clear();
  }

  componentDidUpdate(prevProps) {
    let prev = [...prevProps.selected];
    let curr = [...this.props.selected];

    if(prev.length > curr.length) {
      let id = null;

      prev.forEach(item => {
        if(curr.indexOf(item) === -1) id = item;
      });

      let newCompare = [...this.state.compare];
      let index = newCompare.findIndex(obj => id === obj.id);
      newCompare.splice(index, 1);
      this.setState({compare: [...newCompare]});
    }
  }

  componentDidMount() {
    const { selected } = this.props;
    if(selected.length > 0) {
      let op = [];
      op = selected.map(async elem => {
        let res = await fetch(`https://api.piggy.co.in/v1/mf/?key=${elem}`);
        return res.json();
      });
      Promise.all(op)
        .then(values => {
          let newValues = values.map((value, i) => {
            let { data : { holdings, mutual_fund } } = value;
            let top_holdings = holdings.top_10_holdings.values.splice(0,5);
            let top_sectors = holdings.top_5_sectors.values.splice(0,5);
            let best_return = mutual_fund.best_return;
            let details = mutual_fund.details;
            return {
              top_holdings,
              top_sectors,
              best_return,
              details,
              id: selected[i]
            }
          });
          this.setState({compare: [...newValues], loading: false});
        }).catch(err => console.log(err));
    } else {
      this.setState({loading: false});
    }
  }

  render() {
    let { loading } = this.state;
    let data = null;
    let clearAll = false;
    if(!loading) {
      if(this.state.compare.length > 0) {
        clearAll = true;
        let { compare } = this.state;
        let values = compare.map(val => val.details);
        let holdings = compare.map(val => val.top_holdings);
        let sectors = compare.map(val => val.top_sectors);
        let returns = compare.map(val => val.best_return);
        data = (
          <div className="compare">
            <div className="headers">Basic Details</div>
            <Basic values={values} />
            <div className="headers">Best Returns</div>
            <Returns values={returns} />
            <div className="headers">Top 5 Holdings</div>
            <Details type="holdings" details={holdings} />
            <div className="headers">Top 5 Sectors</div>
            <Details type="sectors" details={sectors} />
          </div>
        )
      } else {
        data = <h2 style={{textAlign: 'center'}}>Please add some Mutual Fund Schemes to Compare</h2>;
      }
    }

    return (
      <div className="compare-wrapper">
        <div className="all-purpose-btn">
          {clearAll ? 
            <button onClick={this.clearAll}>Clear Compare List</button>
            : null
          }
        </div>
        {loading ? <Loader /> : data}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch({type: 'CLEAR'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);