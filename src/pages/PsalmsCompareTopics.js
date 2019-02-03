import React, { Component } from 'react';
// import Footer from '../components/Footer';
// import { Container, Row, Button } from 'reactstrap';
// import PsHeader from '../components/PsHeader';
// import ReactTable from "react-table";
// import { Link } from 'react-router-dom';
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';
import firebase from '../components/Firebase/firebase';
import axios from 'axios';
import { stringify } from '@firebase/util';

class PsalmsCompareTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      wordToFind: '',
      topicsObj: {}
    }
    this.renderTable=this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.renderTable();
    this.getData();
  }

  // gets the value fron the word search input box
  handleChange(e) {
    const value = e.target.value;
    this.setState({wordToFind: value})
  }

  // api call to ESV to get verses with user's word
  submitForm(e) {
    console.log('here')
    e.preventDefault();
    const word = this.state.wordToFind;
    const queryURL = 'https://api.esv.org/v3/passage/search/';
    const config = {
      headers: {
        'Authorization': process.env.REACT_APP_ESV_API_KEY
      },
      params : {
        'q': word,
        'page-size': 100,
      }
    };   
    const timeout = 5000;
    axios.get(queryURL, config, timeout)
    .then((res) => {
      console.log(res.data.results);
      const results = res.data.results;
      results.forEach(p => {
        const str = p.reference;
        if (str.startsWith('Psalm')){
          console.log(p)
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  getData() {
    const db = firebase.database();
    const topicsArr = ['praise', 'thanksgiving', 'triumphVictory', 'remembrance', 'mercy', 'confessionRepentance', 'godlinessRighteousness', 'instructionProverbs', 'lawCommands', 'ungodliness', 'enemies', 'lament', 'cryForHelp', 'protectionDeliverance', 'comfort', 'provision', 'restoration', 'healing', 'dependence', 'nature', 'aBlessing', 'natureOfGod', 'songOfAscents'];
    const topicsObj = {praise:[], thanksgiving: [], triumphVictory: [], remembrance: [], mercy: [], confessionRepentance: [], godlinessRighteousness: [], instructionProverbs: [], lawCommands: [], ungodliness: [], enemies: [], lament: [], cryForHelp: [], protectionDeliverance: [], comfort: [], provision: [], restoration: [], healing: [], dependence: [], nature: [], aBlessing: [], natureOfGod: [], songOfAscents: []};

    db.ref('psalms').on('child_added', function(snapshot) {
      const data = snapshot.val();
      // loop through each psalm from db
      for (const prop in data) {
        // lop off 'topic-' from the prop
        const newProp = prop.slice(6);
        // check if the prop is a topic/ in the topics array
        if (topicsArr.includes(newProp)) {
          // if so, push the chapterNum into the topicsObj array
          topicsObj[newProp].push(data.chapterNum);
        }
      }
    });
    console.log(topicsObj)
    this.setState({topicsObj: topicsObj});
  }

  // make chart wth 2 headings: topics, psalms
  renderTable() {
    this.setState({
      columns:[
        {Header: 'Topics', accessor: 'topics'},
        {Header: 'Psalms', accessor: 'psalms'}
      ]
    })
  }

// fix className

  render() {
    // console.log(this.props.location)

    return(
      // <div></div>
      <PsalmsCompareWrapper
        heading='Compare Topics'
      >
      <p>Is it centered on God, his people, or is it an individual cry for help?</p>
      <p>They all have an element of praise somewhere in them, but some Psalms are focused on praising God and some are a cry to God.</p>
      <p>* Similar words: law, statute, precept, decree, command, word, way</p>
      <p>This is a good resource for finding the Hebrew of these words and its meaning.</p>
      <p>https://biblehub.com/parallel/psalms/119-1.htm</p>
      <p>Random facts:</p>
      <p>how many start with 'praise the Lord'?</p>
      <p>Song of ascents
      https://en.wikipedia.org/wiki/Song_of_Ascents
      http://www.shoshanim.de/pages/maalot-en.html 
      </p>
      <div>
        <form onSubmit={this.submitForm}>
          <label>Search for a specific word.
            <input type='text' name='wordToFind' value={this.state.wordToFind} onChange={this.handleChange} placeholder='Enter a word to find.'></input>
          </label>
        <input type='submit' value='Submit'></input>

        </form>
      </div>
</PsalmsCompareWrapper>
    )
  }
}

export default PsalmsCompareTopic;