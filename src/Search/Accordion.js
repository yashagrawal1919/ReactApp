import React, { Fragment } from 'react'

const Accordion = props => {
  let { name, open,
    category, asset_aum,
    return_3yr, riskometer,
    minimum_investment, rating 
  } = props.details;

  category = category[0].toUpperCase()+category.slice(1);

  riskometer = riskometer.split('_');
  riskometer = riskometer.map(str => str[0].toUpperCase()+str.slice(1));
  riskometer = riskometer.join(' ');

  const collapse = open ? '-' : '+';
  let classes = '';
  if(open) {
    classes = 'show';
  }

  return (
    <Fragment>
      <div className="accordion">
        <div className="name">
          {name}
          <span onClick={props.toggle} style={{cursor: 'pointer'}}>{collapse}</span>
        </div>
        <div className={classes} id="hidden">
          <div className="detail-wrapper">
            <div className="details">
              Category - {category}
            </div>
            <div className="details">
              Minimum Subscription - Rs.{minimum_investment}
            </div>
            <div className="details">
              3 Year Return - {return_3yr}%
            </div>
            <div className="details">
              Risk - {riskometer}
            </div>
            <div className="details">
              Asset_Aum - {asset_aum}
            </div>
            <div className="details">
              Rating - {rating}
            </div>
          </div>
          <div className="btn-wrapper"> 
            {props.children}
          </div>
          </div>
      </div>
    </Fragment>
  )
};

export default Accordion;