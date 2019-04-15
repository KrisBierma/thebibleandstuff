import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Header.css';

// make header sticky?

export const Header = (props) => (
  <header>
     <Row className={`header ${props.headerClass}`}>
      <Col className='header__column'>
        <Link to='/'>
        <img className='img--logo--small' alt='The Bible and Stuff logo' src={require('../../assets/images/bibleandstuffLOGO.png')}></img>
        </Link>
      </Col>
      <Col className='header__column header__column--center'>
        {props.link}
      </Col>
      <Col className='header__column'>
        {/* <Row className='content__button-div content__button-div--psalms'> */}
        <Row>
          {props.links}
          {/* <ul className='header__list'>
            <li><a title="Go to Kris Bierma/'s Portfolio Website" target='_blank' rel="noopener noreferrer" href='http://krisbierma.com'>Kris' Portfolio</a></li>
            <li><Link to='/PsalmsFAQ'>Psalms FAQs</Link></li>
          </ul> */}
          </Row>
      </Col>
     </Row>
   </header>
);
