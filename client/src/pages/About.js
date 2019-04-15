import React from 'react';
import { Container } from 'reactstrap';
import { Header, MainSiteLinks } from '../components/Header';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing/index.js';

const About = () => (
  <Container>
    <Header headerClass='header--main' links = {<MainSiteLinks />}></Header>
    <PageStillGrowing text='Info Page'></PageStillGrowing>
    <Footer></Footer>
  </Container>
)

export default About;
