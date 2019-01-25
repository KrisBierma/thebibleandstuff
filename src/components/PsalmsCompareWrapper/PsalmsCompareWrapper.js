import React from 'react';
import Footer from '../Footer';
import { Container, Row, Button } from 'reactstrap';
import PsHeader from '../PsHeader';
// import ReactTable from "react-table";
import { Link } from 'react-router-dom';

const PsalmsCompareWrapper = (props) => (
  <Container>
    <PsHeader heading={props.heading}></PsHeader>
    <Row className='content-wrapper'>
      <Row className='content__button-row  content__button-row--bordered'>
        <Button tag={Link} to={'/psalmsCompareAll'}>Compare All Psalms</Button>
        <Button tag={Link} to={'/psalmsCompareAuthors'}>Compare Authors</Button>
      </Row>
      <div className='content'>
        {props.children}
      </div>        
    </Row>

    <Footer></Footer>        
  </Container>
)

export default PsalmsCompareWrapper;