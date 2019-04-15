import React from 'react';
import { Container } from 'reactstrap';
import { Header, MainSiteLinks } from '../components/Header';
import Footer from '../components/Footer';
import PageStillGrowing from '../components/PageStillGrowing';

const Studies = () => (
  <Container>
    <Header headerClass='header--main' links = {<MainSiteLinks />}></Header>
    <PageStillGrowing text='Studies'></PageStillGrowing>

    <Footer></Footer>
  </Container>
)

export default Studies;
