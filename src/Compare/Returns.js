import React from 'react'

const Returns = props => {
  const details = {
    From: 'fromdate',
    To: 'todate',
    Percent: 'percent_change',
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
            if(key === 'Percent') {
              d = d.toFixed(2) + '%';
            }
            return (
              <div key={d+Math.random()}>{d}</div>
            );
          })
        }
      </div>
    );
    op.push(node);
  }

  return op;
};

export default Returns;