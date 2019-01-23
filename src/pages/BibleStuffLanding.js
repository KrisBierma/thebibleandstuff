import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
import NavbarComponent from '../components/navBar';
import Header from '../components/Header/Header.js';
import PageStillGrowing from '../components/PageStillGrowing';

class LandingPage extends Component {
  render () {
    return(
      <Container>
        <Header></Header>
        <PageStillGrowing text='Landing Page'></PageStillGrowing>
        <Footer></Footer>
      </Container>
    )
  }
}

export default LandingPage;
