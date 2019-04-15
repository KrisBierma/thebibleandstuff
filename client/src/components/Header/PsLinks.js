import React from 'react';
import { Link } from 'react-router-dom';

export const PsLinks = (props) => (
  <ul className='header__list'>
    <li><a title="Go to Kris Bierma/'s Portfolio Website" target='_blank' rel="noopener noreferrer" href='http://krisbierma.com'>Kris' Portfolio</a></li>
    <li><Link to='/PsalmsFAQ'>Psalms FAQs</Link></li>
  </ul>
)
