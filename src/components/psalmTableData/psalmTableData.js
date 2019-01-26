// gets data (author, headings, etc) from Firebase db
// puts data into table
// component goes to IndividualPsalm and PsalmsComparison

import React, { Component } from 'react';
import './psalmTableData.css';
import firebase from '../Firebase/firebase';

class PsalmTableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      book: '',
      firstVerse: '',
      headings: '',
      chapterNum: this.props.chapterNum,
      summary: '',
      topic: '',
      key: ''
    }
    this.getData = this.getData.bind(this);
    // this.getit = this.getit.bind(this);
    // this.getKey = this.getKey.bind(this);
  };

  componentDidMount() {
    this.getData();
  }
  
  componentDidUpdate() {
    // console.log(this.props.chapterNum, this.state.chapterNum)
    if (this.props.chapterNum !== this.state.chapterNum){
      this.setState({
        chapterNum: this.props.chapterNum
      }, () => {
        // console.log('here')
        this.getData();
      })
    }
  }

  getData(){
    let that = this; // 'this' doesn't work inside db.ref() functions (maybe need arrow func to bind it)
    // console.log('---------------------------')
    // console.log(this.props.chapterNum)
    const db = firebase.database();
    // let key;
    // console.log(this.props.chapterNum)
    // this.getKey();
    db.ref('psalms').orderByChild('chapterNum').equalTo(this.props.chapterNum).on('child_added', function(s){
      // db.ref('psalms').once('value').then(function(s){
        // console.log(s)
    // console.log(s.key)
      that.state.key = s.key;
        //  that.getData();
  
    })

    // db.ref().off('value', getKey);

    

    // db.ref('psalms').once('child_added').then(function(snap){
    //   // console.log(key)
    //   console.log(snap.val())
    //   console.log(snap.key) // the psalm number
    //   console.log(snap.child('chapterNum').exists()) // this is good
    // });
  // }

  // getData() {
    // const db = firebase.database();
    // let that = this;
    db.ref('psalms').once('value').then(function(s){
      // console.log(s.val()); // gives everything
      // console.log(that)
      if (that.state.key !== undefined) {

      // console.log(s.val()[that.state.key]);

      const ps = s.val()[that.state.key];

      if (ps !== undefined) {
        that.setState({
          author: ps.author,
          book: ps.book,
          firstVerse: ps.firstVerse,
          headings: ps.headings,
          // chapterNum: ps.chapterNum,
          summary: ps.summary,
          topic: ps.topic
        });        
      }
      else {
        that.setState({
          author: 'Having trouble getting data for you! Please try again later.'
        })
      }
    }

    });
  }

  render() {
    // console.log(this.state)
    return(
      <table>
        {/* <tbody className='content__table'> */}
        <tbody className='table--word'>
          <tr>
            <th>Author</th>
            <td>{this.state.author}</td>
          </tr>
          <tr>
            <th>Book</th>
            <td>{this.state.book}</td>
          </tr>
          {/* <tr>
            <th>Headings</th>
            <td>{this.state.headings}</td>
          </tr> */}
          <tr>
            <th>First Verse</th>
            <td>{this.state.firstVerse}</td>
          </tr>
          <tr>
            <th>Topic</th>
            <td>{this.state.topic}</td>
          </tr>
          <tr>
            <th>Summary</th>
            <td>{this.state.summary}</td>
          </tr>
        </tbody>
      </table>
    )
  }

};

export default PsalmTableData;
