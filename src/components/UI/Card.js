import React from 'react';

const Card = (props) => {
  const classes = "p-5 bg-white rounded-lg shadow " + props.className;

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
}
 
export default Card;