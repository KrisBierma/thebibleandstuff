import React from 'react';
// import './PsButton.css';

export const PsButton = (props) => {
  return (
    <button className='btn' id={props.id} onClick={() => props.changePage(props.id)}>
    {props.children}</button>
  )
}
