import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './Psalms.css';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import firebase from '../components/Firebase/firebase';

class PsalmsLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      book: '',
      firstVerse: '',
      chapterNum: '',
      summary: '',
      wordCount: '',
      psalm1: '',
      psalm2: '',
      invalidMsg: '',
      changePage: '',
      praise: false,
      thanksgiving: false,
      triumphVictory: false,
      remembrance: false,
      mercy: false,
      confessionRepentance: false,
      godlinessRighteousness: false,
      instructionProverbs: false,
      lawCommands: false,
      ungodliness: false,
      enemies: false,
      lament: false,
      cryForHelp: false,
      protectionDeliverance: false,
      comfort: false,
      provision: false,
      restoration: false,
      healing: false,
      dependence: false,
      nature: false,
      aBlessing: false,
      natureOfGod: false,
      songOfAscents: false,
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate() {
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
      const location = `/psalmsCompare/${this.state.psalm1}&${this.state.psalm2}`;
      console.log(location);
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

  handleCheckboxChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked: e.target.value;
    const name = e.target.name;
    this.setState({[name]: value})
  }

  // after submitting psalm info on form, push to db
  handleSubmit(event) {
    event.preventDefault();
    const db = firebase.database();

    // make sure chapterNum isn't blank
    if (this.state.chapterNum !== '') {
      // let flag = false;
      let key = '';
      const that = this;

      // make data obj to send to db
      const obj = that.state;
      let dataToUpdate = {};
      const stateArr = ['author', 'book', 'chapterNum', 'firstVerse', 'summary', 'wordCount'];
      Object.entries(obj).forEach(i => {
        let key1 = i[0];
        const value = i[1];
        // add to arr of data to push info that's not blank and that pertains to author, book, firstVerse or summary
        if (value !== '' && stateArr.includes(key1)){
          dataToUpdate[key1] = value;
        }
        // add to arr of data to push all the topics, true or false
        if (typeof value === 'boolean' && value === true) {
          key1 = 'topic-'+i[0];
          dataToUpdate[key1] = value;
        }
      })

      // if the chapterNum is already in the db...
      db.ref('psalms').orderByChild('chapterNum').equalTo(this.state.chapterNum).once('value').then(function(s, error){
        // get the child key
        s.forEach(function(data) {
          key=data.key;
        if (error) console.log('error')
        })
        if (s.val()) {
          console.log('chapter found')
          console.log(dataToUpdate)
          db.ref('psalms/'+key).update(dataToUpdate);
        }
        else {
          console.log('chapter not found, adding new chapter')
          db.ref('psalms').push(dataToUpdate);
        }
      }) 
      this.resetForm();
      }
  }
  
  resetForm() {
    console.log(this.state);
    // reset checkboxes
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    this.setState({
      author: '',
      book: '',
      firstVerse: '',
      chapterNum: '',
      summary: '',
      topic: '',
      wordCount: '',
      praise: false,
      thanksgiving: false,
      triumphVictory: false,
      remembrance: false,
      mercy: false,
      confessionRepentance: false,
      godlinessRighteousness: false,
      instructionProverbs: false,
      lawCommands: false,
      ungodliness: false,
      enemies: false,
      lament: false,
      cryForHelp: false,
      protectionDeliverance: false,
      comfort: false,
      provision: false,
      restoration: false,
      healing: false,
      dependence: false,
      nature: false,
      aBlessing: false,
      natureOfGod: false,
      songOfAscents: false
    }); 
    } 

  render() {
    const psalms = [];
    for (let i=1; i<151; i++) {
      psalms.push(i);
    };

    return(
      <Container>
        <PsHeader heading="Psalms" />
        <Row className='content-wrapper'>
          <Col className='mainCol'>
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
                    <Button tag={Link} to={`/psalmsCompare/${this.state.psalm1}&${this.state.psalm2}`}>Compare these Two</Button>
                    {/* <button type='submit' 
                    value='compareTwo' className='btn' onClick={this.submitForm}>Compare these two</button> */}
                  </Form>
                </Row> 

                {/* <img className='fern' alt='fern' src={require('../assets/images/fern2.png')}></img> */}
              </div>
            </div>

            {/* just for data entry */}
            {/* <div>
              <Form onSubmit={this.handleSubmit}>
              <Row>
              <Col>
                <Input type='number' name='chapterNum' value={this.state.chapterNum} onChange= {this.handleChange} placeholder='chapter' />
                <Input type='string' name='author' value={this.state.author} onChange = {this.handleChange} placeholder='Author' />
                <Input type='string' name='book' value={this.state.book} onChange = {this.handleChange} placeholder='Book' />
                <Input type='number' name='wordCount' value={this.state.wordCount} onChange= {this.handleChange} placeholder='word count' />                
                <Input type='string' name='firstVerse' value={this.state.firstVerse} onChange= {this.handleChange} placeholder='first verse' />
                <Input type='string' name='summary' value={this.state.summary} onChange= {this.handleChange} placeholder='summary' />
                <button type='submit' value='Submit'>Submit Data</button>
</Col>
<Col>
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
                    <Input type='checkbox' name='remembrance' value='remembrance' onChange={this.handleCheckboxChange}/>remembrance
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='mercy' value='mercy' onChange={this.handleCheckboxChange}/>mercy
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='confessionRepentance' value='confession-repentance' onChange={this.handleCheckboxChange}/>confession-repentance-forgiveness           
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='godlinessRighteousness' value='godlinessRighteousness' onChange={this.handleCheckboxChange}/>godlinessRighteousness
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='instructionProverbs' value='instruction-proverbs' onChange={this.handleCheckboxChange}/>instruction-proverbs                
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='lawCommands' value='law-commands' onChange={this.handleCheckboxChange}/>law-commands
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='ungodliness' value='ungodliness' onChange={this.handleCheckboxChange}/>ungodliness
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='enemies' value='enemies' onChange={this.handleCheckboxChange}/>enemies
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='lament' value='lament' onChange={this.handleCheckboxChange}/>lament
                  </Label>
              
                  <Label check>
                    <Input type='checkbox' name='cryForHelp' value='cryForHelp' onChange={this.handleCheckboxChange}/>cryForHelp
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
                    <Input type='checkbox' name='restoration' value='restoration' onChange={this.handleCheckboxChange}/>restoration
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='healing' value='healing' onChange={this.handleCheckboxChange}/>healing
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='dependence' value='dependence' onChange={this.handleCheckboxChange}/>dependence
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='nature' value='nature' onChange={this.handleCheckboxChange}/>nature
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='aBlessing' value='aBlessing' onChange={this.handleCheckboxChange}/>aBlessing
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='natureOfGod' value='natureOfGod' onChange={this.handleCheckboxChange}/>natureOfGod
                  </Label>
                  <Label check>
                    <Input type='checkbox' name='songOfAscents' value='songOfAscents' onChange={this.handleCheckboxChange}/>song-of-ascents
                  </Label>
                </FormGroup>

</Col>
</Row>

              </Form>
            </div> 
             */}
            {/* end data entry */}
            
          </Col>
        </Row>
        <Footer></Footer>
      </Container>
    )    
  }
};

export default PsalmsLanding;
