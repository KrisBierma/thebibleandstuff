import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Psalms.css';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
import firebase from '../components/Firebase/firebase'; // delete later
// import PsalmsCompareAll from './PsalmsCompareAll';
// import {history} from '../components/history';
// import { createBrowserHistory } from 'history';
// import { browserHistory } from 'react-router';


class PsalmsLanding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      book: '',
      firstVerse: '',
      headings: '',
      chapterNum: '',
      summary: '',
      topic: '',
      wordCount: '',
      psalm1: '',
      psalm2: '',
      invalidMsg: '',
      changePage: ''
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.changePage = this.changePage.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.location);
    console.log(prevProps)
    // const locationChanged = this.props.location !== prevProps.location;
  }

  // comapre two forms submission button
  submitForm(e) {
    e.preventDefault();

    // check for validity
    if (this.state.psalm1 < 1 || this.state.psalm1 > 150 || this.state.psalm2 < 1 || this.state.psalm2 > 150) {
      this.setState({
        invalidMsg: 'Choose a psalm between 1 and 150.',
        psalm1: '',
        psalm2: ''
      })
    }
    else if (this.state.psalm1 === this.state.psalm2) {
      this.setState({
        invalidMsg: 'Choose two different psalms to compare.',
        psalm1: '',
        psalm2: ''
      })
    }
    // pass the requested psalms as props and switch to comparision page
    else {
      // this.setState({changePage: e.target.value});
      const location = `/psalmsCompare/${this.state.psalm1}&${this.state.psalm2}`;
      console.log(location);
      // const history = createBrowserHistory();
      // history.push(location);
      // console.log(history)
      this.props.history.push(location);

    }
  }

  // after each keystroke, update state with value of form
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    // get name from input box and value from user input
    this.setState({[name]: value});
  }

  // after submitting psalm info on form, push to db
  handleSubmit(event) {
    event.preventDefault();
    const db = firebase.database();
    db.ref('psalms').push({
      author: this.state.author, 
      book: this.state.book, 
      firstVerse: this.state.firstVerse, 
      headings: this.state.headings, 
      chapterNum: this.state.chapterNum, 
      summary: this.state.summary, 
      topic: this.state.topic,
      wordCount: this.state.wordCount
    });
    // reset form
    this.setState({
      author: '',
      book: '',
      firstVerse: '',
      headings: '',
      chapterNum: '',
      summary: '',
      topic: '',
      wordCount: ''
    });
  }

  // set value from clicked button's id so the render redirect knows where to go
  // changePage(e) {
  //   this.setState({changePage: e.target.value})
  // }

  render() {
    const psalms = [];
    for (let i=1; i<151; i++) {
      psalms.push(i);
    };

    return(
      <Container>
        <PsHeader heading="Psalms" />
        <Row className='content-wrapper'>
          {/* <Col className='mainCol'> */}
            <div className='content'>
              <h3><u>Click a Psalm to see the deets.</u></h3>
              <ul>
                {psalms.map((psalm) => {
                  return(
                    <li
                    id={`psalm${psalm}`}
                    key={psalm}
                    className='content__list'
                    >
                    <Link to={`/psalm/${psalm}`}>{psalm}</Link>
                    </li>     
                  )})}
              </ul>
            </div>
            <div>
              {/* compare all psalms */}
              <div className='content content--flex'>
                <Row className='content__button-row content__button-row--bordered'>
                  <Button tag={Link} to={'/psalmsCompareAll'}>Compare All Psalms</Button>
                  <Button tag={Link} to={'/psalmsCompareAuthors'}>Compare Authors</Button>
                  <Button tag={Link} to={'/psalmsCompareTopics'}>Compare Topics</Button>
                </Row>
                <Row>
                <Form className='content__form'>
                  <h3><u>Compare two Psalms.</u></h3>

                    <FormGroup row className='content__form--group'>
                      <Col className='content__form--group-col'>
                        <Label for='psalm1'>Psalm #1</Label>
                        <Input type='number' name='psalm1' value={this.state.psalm1} onChange={this.handleChange} placeholder='44' />
                      </Col>
                      <Col className='content__form--group-col'>
                        <Label for='psalm2'>Psalm #2</Label>
                        <Input type='number' name='psalm2' value={this.state.psalm2} onChange={this.handleChange} placeholder='131' title='A psalm between 1 and 150' />
                      </Col>
                    </FormGroup>
                    <p id='invalidMsg'>{this.state.invalidMsg}</p>
                    {/* <Button tag={Link} to={`/psalmsCompare/${this.state.psalm1}&${this.state.psalm2}`}>Compare these Two</Button> */}
                    <button type='submit' 
                    value='compareTwo' className='btn' onClick={this.submitForm}>Compare these two</button>
                  </Form>
                </Row>

                <img className='fern' alt='fern' src={require('../assets/images/fern2.png')}></img>
              </div>
            </div>
            {/* just for data entry */}
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Input type='string' name='author' value={this.state.author} onChange = {this.handleChange} placeholder='Author' />
                <Input type='string' name='book' value={this.state.book} onChange = {this.handleChange} placeholder='Book' />
                <Input type='string' name='firstVerse' value={this.state.firstVerse} onChange= {this.handleChange} placeholder='first verse' />
                <Input type='string' name='headings' value={this.state.headings} onChange= {this.handleChange} placeholder='headings' />
                <Input type='number' name='chapterNum' value={this.state.chapterNum} onChange= {this.handleChange} placeholder='chapter' />
                <Input type='string' name='summary' value={this.state.summary} onChange= {this.handleChange} placeholder='summary' />
                <Input type='string' name='topic' value={this.state.topic} onChange= {this.handleChange} placeholder='topic' />
                <Input type='number' name='wordCount' value={this.state.wordCount} onChange= {this.handleChange} placeholder='word count' />

                <button type='submit' value='Submit'>Submit Data</button>
              </Form>
            </div>
          {/* </Col> */}
        </Row>
        <Footer></Footer>
      </Container>
    )    
  }
};

export default PsalmsLanding;
