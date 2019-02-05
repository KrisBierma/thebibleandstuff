import React from 'react';
import Footer from '../Footer';
import { Container, Row, Button } from 'reactstrap';
import PsHeader from '../PsHeader';
import { Link } from 'react-router-dom';

const PsalmsCompareWrapper = (props) => (
  <Container>
    <PsHeader heading={props.heading}></PsHeader>
    <Row className='content-wrapper'>
      <Row className={`content__button-row content__button-row--bordered ${props.className}`}>
        {props.para}
        <Button tag={Link} to={props.compare1Link}>{props.compare1Title}</Button>
        <Button tag={Link} to={props.compare2Link}>{props.compare2Title}</Button>
      </Row> 
      <Row className={`content ${props.className2}`}>
        {props.children}
      </Row>        
    </Row>

    <Footer></Footer>        
  </Container>
)

export default PsalmsCompareWrapper;