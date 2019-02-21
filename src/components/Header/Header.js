// header of theBibleandStuff (not Psalms)

import React from 'react';
import { Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <div className='header--main'>
    <Link to='/'>
      <img className='img--logo' alt='The Bible and Stuff logo' src={require('../../assets/images/bibleandstuffLOGO.png')}></img>
    </Link>
    <Row className='content__button-div content__button-div--main'>
      <Button tag={Link} to={'/studies'}>Studies</Button>
      <Button tag={Link} to={'/psalms'}>Psalms</Button>
      <Button tag={Link} to={'/randomThoughts'}>Random Thoughts</Button>
      <Button tag={Link} to={'/about'}>About</Button>
    </Row>
  </div>
)

export default Header;