import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './PsHeader.css';

// make header sticky?

const PsHeader = (props) => (
  <header>
     <Row className='header--psalms'>
      <Col className='header__column'>
        <Link to='/'>
        <img className='img--logo--small' alt='The Bible and Stuff logo' src={require('../../assets/images/bibleandstuffLOGO.png')}></img>
        </Link>
      </Col>
      <Col className='header__column header__column--center'>
        <Link to='/psalms'><h1>{props.heading}</h1></Link>
      </Col>
      <Col className='header__column'>
        <Row className='content__button-div content__button-div--psalms'>
          <ul className='header__list'>
            {/* <li><Link to='/psalms'>Return to Psalms Home</Link></li> */}
            {/* combine faq with main about page */}
            {/* add portfolio link to main about page */}
            {/* <a className='btn' target='_blank' rel="noopener noreferrer" href='http://www.krisbierma.com'>Kris' Portfolio</a> */}
            {/* <Button tag={Link} to='http://www.krisbierma.com' target='_blank'>Kris's Portfolio</Button> */}
            <li><a title="Go to Kris Bierma/'s Portfolio Website" target='_blank' rel="noopener noreferrer" href='http://krisbierma.com'>Kris' Portfolio</a></li>
            <li><Link to='/PsalmsFAQ'>Psalms FAQs</Link></li>

            {/* <li><a title="Go to Psalm FAQs" href='/PsalmsFAQ'>FAQs</a></li> */}

          </ul>
          </Row>
      </Col>
     </Row>
   </header>
);

export default PsHeader;
