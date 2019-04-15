import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
// import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
// import NavbarComponent from '../components/navBar';
import Header from '../components/Header';
import PageStillGrowing from '../components/PageStillGrowing';
import './mainSite.css';

class LandingPage extends Component {
  render () {
    return(
      <Container>
        <Header></Header>
        <Row className='content-wrapper__main'>
          <div className='content'>
            <p>I like the Bible. It's comforting, gives great advice, and shows the way.</p>
            <p>It's full of stories that are sometimes funny, sometimes gross and full of relateable people.</p>
            <p>I hope you find something on here that's interesting to you.</p>
            <ul className='list__mainSite'>
              <li>Comfort: </li>
            </ul>
          </div>
        </Row>
        {/* <PageStillGrowing text='Landing Page'></PageStillGrowing> */}
        <Footer></Footer>
      </Container>
    )
  }
}

export default LandingPage;
