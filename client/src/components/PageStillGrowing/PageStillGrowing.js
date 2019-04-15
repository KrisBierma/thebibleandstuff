import React from 'react';
import './PageStillGrowing.css';

const PageStillGrowing = (props) => (
  <div className='content content--centered'>
    <div className='img-container'> 
      <img className='img--tomato' alt='close up of tomato plant with yellow flowers and one tiny, green tomato' src={require('../../assets/images/pageStillGrowing.png')}></img>
      <div className='img-container__text--top'>This page is still growing!</div>
      <div className='img-container__text--bottom'>{`${props.text} Coming Soon`}</div>
    </div>  
  </div>
)

export default PageStillGrowing;
