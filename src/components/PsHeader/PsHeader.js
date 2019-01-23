import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './PsHeader.css';

// make header sticky?

const PsHeader = (props) => (
  <div>
     <Row className='header--psalms'>
      <Col>
        <Link to='/'>
        <img className='img--logo--small' alt='The Bible and Stuff logo' src={require('../../assets/images/bibleandstuffLOGO.png')}></img>
        </Link>
      </Col>
      <Col>
        <Link to='/psalms'><h1>{props.heading}</h1></Link>
      </Col>
      <Col>
      <Row className='content__button-div content__button-div--psalms'>
        {/* <ul className='header__list'> */}
          {/* <li><Link to='/psalms'>Return to Psalms Home</Link></li> */}
          {/* combine faq with main about page */}
          {/* <li><Link to='/PsalmsFAQ'>FAQs</Link></li> */}
          {/* add portfolio link to main about page */}
          <Button tag={Link} to='krisbierma.com'>Kris's Portfolio</Button>
          {/* <li><Link to="/">Kris's Portfolio</Link></li> */}
        {/* </ul> */}
        </Row>
      </Col>
     </Row>
   </div>
);

export default PsHeader;
