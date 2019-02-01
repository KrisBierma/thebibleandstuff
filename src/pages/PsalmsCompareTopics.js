import React, { Component } from 'react';
// import Footer from '../components/Footer';
// import { Container, Row, Button } from 'reactstrap';
// import PsHeader from '../components/PsHeader';
// import ReactTable from "react-table";
// import { Link } from 'react-router-dom';
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';
// import firebase from '../components/Firebase/firebase';
import axios from 'axios';

class PsalmsCompareTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      wordToFind: ''
    }
    this.renderTable=this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.renderTable();
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