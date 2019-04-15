import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing';

const Studies = () => (
  <Container>
    <Header></Header>
    <PageStillGrowing text='Studies'></PageStillGrowing>

    <Footer></Footer>
  </Container>
)

export default Studies;
