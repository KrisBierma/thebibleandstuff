// used with pie chart on psalms compare author
import React from 'react';

const LegendCircle = (props) => {
  return (
    <div>
      <div 
        className={`legendCircle`}
        style={{backgroundColor: `${props.color}`}}
      />
      {props.children}
    </div>
  )
}

export default LegendCircle;
