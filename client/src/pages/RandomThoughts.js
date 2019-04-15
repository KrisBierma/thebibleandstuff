import React from 'react';
import { Container } from 'reactstrap';
import { Header, MainSiteLinks } from '../components/Header';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing/index.js';

const RandomThoughts = () => (
  <Container>
    <Header headerClass='header--main' links = {<MainSiteLinks />}></Header>
    <PageStillGrowing text='Random Thoughts'></PageStillGrowing>
    <Footer></Footer>    
  </Container>
)

export default RandomThoughts;
