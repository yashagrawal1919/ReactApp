import React from 'react'
import { connect } from 'react-redux'

const Basic = props => {
  const details = {
    Name: 'name',
    Category: 'category',
    Rating: 'rating',
    'Minimum-Subscription': 'minimum_subscription',
    '3 Year Return': 'return_3yr',
    Risk: 'riskometer',
    'Asset-Aum': 'asset_aum',
    Benchmark: 'benchmark_text'
  };

  const values = props.values;

  let op = [];

  for(let key in details) {
    let node = (
      <div key={key} className="row">
        <div className="head">{key}</div>
        {
          values.map(value => {
            let d = value[details[key]];
            let b = null;
            if(key === 'Name') {
              b = <button title="Click to Remove" className="remove-compare" onClick={() => props.remove(value['scheme_details_id'])}>X</button>
            }
            if(key === '3 Year Return') {
              d = d+'%';
            }
            return (
              <div key={d+Math.random()}>{d} {b}</div>
            );
          })
        }
      </div>
    );
    op.push(node);
  }

  return op;
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch({type: 'REMOVE', id: id})
  }
};

export default connect(false, mapDispatchToProps)(Basic);