import React from 'react';
import Footer from '../Footer';
import { Container, Row, Button } from 'reactstrap';
import { Header, PsLinks } from '../Header';
import { Link } from 'react-router-dom';

const PsalmsCompareWrapper = (props) => (
  <Container>
    <Header 
      headerClass='header--psalms' 
      link={<Link to={'/psalms'}><h1>{`${props.heading}`}</h1></Link>}
      links={<PsLinks />}
    />   
    <Row className='content-wrapper'>
    <div className='content content--border content--flex content--fullWidth'>

      <Row className='content__button-row content__button-row--bordered'>
        {props.para}
        <Button tag={Link} to={props.compare1Link}>{props.compare1Title}</Button>
        <Button tag={Link} to={props.compare2Link}>{props.compare2Title}</Button>
      </Row> 
      <div className='content__table--compare'>
        {props.children}
      </div> 
    </div>       
    </Row>

    <Footer></Footer>        
  </Container>
)

export default PsalmsCompareWrapper;