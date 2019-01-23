import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing/index.js';

const About = () => (
  <Container>
    <Header></Header>
    <PageStillGrowing text='Info Page'></PageStillGrowing>
    <Footer></Footer>
  </Container>
)

export default About;
