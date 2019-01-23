import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing/index.js';

const RandomThoughts = () => (
  <Container>
    <Header></Header>
    <PageStillGrowing text='Random Thoughts'></PageStillGrowing>
    <Footer></Footer>    
  </Container>
)

export default RandomThoughts;
