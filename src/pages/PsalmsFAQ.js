import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
// import {PsButton} from '../components/PsButton';
import { Link } from 'react-router-dom';
import './Psalms.css';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';

// fix link className
// add contact me form

class PsalmsFaq extends Component {

  render() {
    return(
      <Container>
        <PsHeader psalmId="FAQs" />
        <Row className='content-wrapper'>
          <Col>
            <Row>
              <h2>What is this site?</h2>
              <p>How cool would it be, I thought, to graph the words from a psalm. I wanted to know if a particular psalm was God-centric or self-centric, and I though an actual word count would help with that.</p>
            </Row>
            <Row>
              <h2>What translation are you using?</h2>
              <p>I like the English Standard Version (ESV) becuase it takes out any verse or other reference from the chapter and instead reads like a normal book of poetry. <Link className='psalmLink' to='https://www.esv.org/'>This</Link> is the website I used.</p>
            </Row>
            <Row>
              <h2>I have another question/ comment/ idea.</h2>
              <p>Awesome! Contact me here, especially if you found something missing/ a mistake in the topics page.</p>
            </Row>
          </Col>
        </Row>
        <Footer></Footer>
      </Container>
    )    
  }
};

export default PsalmsFaq;
