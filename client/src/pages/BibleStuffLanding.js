import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Footer from '../components/Footer';
import { Header, MainSiteLinks } from '../components/Header';
import './mainSite.css';

class LandingPage extends Component {
  render () {
    return(
      <Container>
        <Header headerClass='header--main'
        links = {<MainSiteLinks />}></Header>
        <Row className='content-wrapper__main'>
          <img className='img--logo--main' alt='The Bible and Stuff logo' src={require('../assets/images/bibleandstuffLOGO.png')}></img>
          <div className='content'>
            <p>I like the Bible. It's comforting, gives great advice, and shows the way.</p>
            <p>It's full of stories that are sometimes funny, sometimes gross and full of relateable people.</p>
            <p>I hope you find something on here that's interesting to you.</p>
            <ul className='list__mainSite'>
              <li>Comfort: The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged. (Deut. 31:8)</li>
              <li>Truth: "I am the way and the truth and the life." ~ Jesus (John 14:6)</li>
              <li>Advice: A hot-tempered man stirs up dissension, but a patient man calms a quarrel. (Pro. 15:18)</li>
            </ul>
          </div>
        </Row>
        <Footer></Footer>
      </Container>
    )
  }
}

export default LandingPage;
