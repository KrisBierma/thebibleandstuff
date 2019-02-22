import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
// import {PsButton} from '../components/PsButton';
// import { Link } from 'react-router-dom';
import './Psalms.css';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';

// fix link className
// add contact me form

class PsalmsFaq extends Component {

  render() {
    return(
      <Container>
        <PsHeader heading="FAQs" />
        <Row className='content-wrapper'>
          <Col>
            <Row>
              <h2>What is this site?</h2>
              <p>How cool would it be, I thought, to graph the words from a psalm. I wanted to know if a particular psalm was God-centric or self-centric, and I thought an actual word count would help with that.</p>
            </Row>
            <Row>
              <h2>What translation are you using?</h2>
              <p>I like the English Standard Version (ESV) because it takes out verse numbers and other references from the chapter. This makes it read like a normal book of poetry. <a title="Go to the ESV website" target='_blank' rel="noopener noreferrer" href='https://www.esv.org/' className='psalmLink'>This</a> is the website I used.</p>
            </Row>
            <Row>
              <h2>Do you have copyright information?</h2>
              <p>Why, yes, I do. Just kidding, no one asks this, but I do need to include it since they've been so generous to let me use it.</p>
              <p>Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. You may not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.</p>              
            </Row>
            <Row>
              <h2>I have another question/comment/idea.</h2>
              <p>Awesome! Contact me here.</p>
            </Row>
          </Col>
        </Row>
        <Footer></Footer>
      </Container>
    )    
  }
};

export default PsalmsFaq;
