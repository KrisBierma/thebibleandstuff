import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Psalms.css';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
import firebase from '../components/Firebase/firebase'; // delete later
// import { start } from 'repl';
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
      // headings: '',
      chapterNum: '',
      summary: '',
      // topic: '',
      wordCount: '',
      psalm1: '',
      psalm2: '',
      invalidMsg: '',
      changePage: '',
      praise: false,
      thanksgiving: false,
      triumphVictory: false,
      instructionProverbs: false,
      confessionRepentance: false,
      lawCommands: false,
      nature: false,
      endurance: false,
      aBlessing: false,
      goodEvil: false,
      cryForHelp: false,
      ungodliness: false,
      enemies: false,
      protectionDeliverance: false,
      comfort: false,
      provision: false,
      natureOfGod: false,
      songOfAscents: false
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    // this.changePage = this.changePage.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.location);
    // console.log(prevProps)
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
    // console.log(e.target.value)
    // get name from input box and value from user input
    this.setState({[name]: value});
  }

  handleCheckboxChange(e) {
    // console.log(e.target)
    const value = e.target.type === 'checkbox' ? e.target.checked: e.target.value;
    const name = e.target.name;
    // console.log(name, value);
    this.setState({[name]: value})
  }

  // after submitting psalm info on form, push to db
  handleSubmit(event) {
    event.preventDefault();
    const db = firebase.database();
    console.log(this.state)
    // see if the chapter is already in the db
    if (this.state.chapterNum !== '') {
      let flag = false;
      let key = '';
      const that = this;
      db.ref('psalms').orderByChild('chapterNum').equalTo(this.state.chapterNum).on('child_added', function(s){
        // console.log(s.val())
        // console.log(s.key)
        flag=true;
        // key=s.key;
        // get the data that's not ''
        const obj = that.state;
        let dataToUpdate = {};
        const stateArr = ['author', 'book', 'firstVerse', 'summary'];
        // const 
        Object.entries(obj).map(i => {
          const key1 = i[0];
          const value = i[1];
          if (value !== '' && stateArr.includes(key1)){
            dataToUpdate[key1] = value;
          }
          console.log(value);
          if (value) dataToUpdate[key1] = value;
        })
        console.log(dataToUpdate)
        check(dataToUpdate);

      });
      // if it is, update data
      function check(dataToUpdate) {
        if (flag) {
          db.ref('psalms/'+key).update(dataToUpdate)
        }
        // if not, push data
        else {
          console.log('push data')
          // db.ref('psalms').push({
          //   author: this.state.author, 
          //   book: this.state.book, 
          //   firstVerse: this.state.firstVerse, 
          //   chapterNum: this.state.chapterNum, 
          //   summary: this.state.summary, 
          //   topic: this.state.topic,
          //   wordCount: this.state.wordCount,
          //   praise: this.state.praise,
          //   thanksgiving: this.state.thanksgiving,
          //   triumphVictory: this.state.triumphVictory,
          //   instructionProverbs: this.state.instructionProverbs,
          //   confessionRepentance: this.state.confessionRepentance,
          //   lawCommands: this.state.lawCommands,
          //   nature: this.state.nature,
          //   endurance: this.state.endurance,
          //   aBlessing: this.state.aBlessing,
          //   goodEvil: this.state.goodEvil,
          //   cryForHelp: this.state.cryForHelp,
          //   ungodliness: this.state.ungodliness,
          //   enemies: this.state.enemies,
          //   protectionDeliverance: this.state.protectionDeliverance,
          //   comfort: this.state.comfort,
          //   provision: this.state.provision,
          //   natureOfGod: this.state.natureOfGod,
          //   songOfAscents: this.state.songOfAscents
          // });
        }  
      // resetForm();

      }
      function resetForm() {
        this.setState({
          author: '',
          book: '',
          firstVerse: '',
          // headings: '',
          chapterNum: '',
          summary: '',
          topic: '',
          wordCount: '',
          praise: false,
          thanksgiving: false,
          triumphVictory: false,
          instructionProverbs: false,
          confessionRepentance: false,
          lawCommands: false,
          nature: false,
          endurance: false,
          aBlessing: false,
          goodEvil: false,
          cryForHelp: false,
          ungodliness: false,
          enemies: false,
          protectionDeliverance: false,
          comfort: false,
          provision: false,
          natureOfGod: false,
          songOfAscents: false
        }); 
      }      
    }

    // reset form

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

                {/* <img className='fern' alt='fern' src={require('../assets/images/fern2.png')}></img> */}
              </div>
            </div>
            {/* just for data entry */}
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Input type='string' name='author' value={this.state.author} onChange = {this.handleChange} placeholder='Author' />
                <Input type='string' name='book' value={this.state.book} onChange = {this.handleChange} placeholder='Book' />
                <Input type='string' name='firstVerse' value={this.state.firstVerse} onChange= {this.handleChange} placeholder='first verse' />
                {/* <Input type='string' name='headings' value={this.state.headings} onChange= {this.handleChange} placeholder='headings' /> */}
                <Input type='number' name='chapterNum' value={this.state.chapterNum} onChange= {this.handleChange} placeholder='chapter' />
                <Input type='string' name='summary' value={this.state.summary} onChange= {this.handleChange} placeholder='summary' />

                <FormGroup check>
                  <Label check>
                    <Input type='checkbox' name='praise' value='praise' onChange={this.handleCheckboxChange}/>Praise
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='thanksgiving' value='thanksgiving' onChange={this.handleCheckboxChange}/>thanksgiving    
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='triumphVictory' value='triumph-victory' onChange={this.handleCheckboxChange}/>triumph-victory
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='instructionProverbs' value='instruction-proverbs' onChange={this.handleCheckboxChange}/>instruction-proverbs                
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='confessionRepentance' value='confession-repentance' onChange={this.handleCheckboxChange}/>confession-repentance                
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='lawCommands' value='law-commands' onChange={this.handleCheckboxChange}/>law-commands
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='nature' value='nature' onChange={this.handleCheckboxChange}/>nature
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='endurance' value='endurance' onChange={this.handleCheckboxChange}/>endurance
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='aBlessing' value='aBlessing' onChange={this.handleCheckboxChange}/>aBlessing
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='goodEvil' value='good-evil' onChange={this.handleCheckboxChange}/>good-evil
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='cryForHelp' value='cryForHelp' onChange={this.handleCheckboxChange}/>cryForHelp
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='ungodliness' value='ungodliness' onChange={this.handleCheckboxChange}/>ungodliness
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='enemies' value='enemies' onChange={this.handleCheckboxChange}/>enemies
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='protectionDeliverance' value='protection-deliverance' onChange={this.handleCheckboxChange}/>protection-deliverance                
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='comfort' value='comfort' onChange={this.handleCheckboxChange}/>comfort
                  </Label>
                  <Label check>
                  <Input type='checkbox' name='provision' value='provision' onChange={this.handleCheckboxChange}/>provision   
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='natureOfGod' value='natureOfGod' onChange={this.handleCheckboxChange}/>natureOfGod
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='songOfAscents' value='songOfAscents' onChange={this.handleCheckboxChange}/>song-of-ascents
                  </Label>
                </FormGroup>


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
