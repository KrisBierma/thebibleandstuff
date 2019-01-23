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
      topic: ''
    }
  };

  componentDidMount(){
    let that = this; // 'this' doesn't work inside db.ref() functions (maybe need arrow func to bind it)
    
    const db = firebase.database();
    let key;
    
    db.ref('psalms').orderByChild('chapterNum').equalTo(this.props.chapterNum).once('child_added', function(s){
      console.log(s.key)
      key = s.key;
    })

    db.ref('psalms').once('value').then(function(s){
      console.log(s.val()); // gives everything
      console.log(s.val()[key]);

      const ps = s.val()[key];

      if (ps !== undefined) {
        that.setState({
          author: ps.author,
          book: ps.book,
          firstVerse: ps.firstVerse,
          headings: ps.headings,
          chapterNum: ps.chapterNum,
          summary: ps.summary,
          topic: ps.topic
        });        
      }
      else {
        that.setState({
          author: 'Having trouble getting data for you! Please try again later.'
        })
      }

    });
    // db.ref().once('child_added').then(function(snap){
      // console.log(key)
      // console.log(snap.val())
      // console.log(snap.key) // the psalm number
      // console.log(snap.child('chapterNum').exists()) // this is good
    // });
  }

  render() {
    console.log(this.state)
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
          <tr>
            <th>Headings</th>
            <td>{this.state.headings}</td>
          </tr>
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
