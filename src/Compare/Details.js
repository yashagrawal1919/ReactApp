import React from 'react'

const Details = props => {
  let details = props.details;
  let op = [];
  for(let i = 1; i <= 5; i++) {
    let key = 100*Math.random();
    let node = (
      <div key={key} className="row">
        <div className="head">#{i}</div>
        {
          details.map(detail => {
            let d = '-';
            let k = Math.random() + i*Math.random();
            if(detail[i-1] !== undefined) {
              d = detail[i-1].script || detail[i-1].sector;
              k = d + i + Math.random();
            }
            return (
              <div key={k}>{d}</div>
            )
          })
        }
      </div>
    );
    op.push(node);
  }
  return op;
};

export default Details;