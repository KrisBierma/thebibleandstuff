import React, { Component } from 'react';
import Footer from '../components/Footer';
import { Container, Row, Button } from 'reactstrap';
import PsHeader from '../components/PsHeader';
import firebase from '../components/Firebase/firebase';
import { PieChart } from 'react-easy-chart';
import ReactTable from "react-table";
import { Link } from 'react-router-dom'

class PsalmsCompareAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everything: [],
      authorArray: [],
      psalmsChapters: [],
      columns: []
    }
    this.getInfo=this.getInfo.bind(this);
    this.sortInfo=this.sortInfo.bind(this);
    this.makeTableHeaders=this.makeTableHeaders.bind(this);
  }

  componentDidMount() {
    this.getInfo();
    this.makeTableHeaders();
  }

  // get data from firebase db
  getInfo() {
    let that = this; // 'this' doesn't work inside functions
    const db = firebase.database();

    db.ref('psalms').on('value', function(s){
      // console.log(s.val()); // gives everything
      // that.setState({everything: s.val()});

      // console.log(that.state.everything)
      s.forEach(function(childsnap){
        // console.log(childsnap.key)
        // console.log(childsnap.val())
        const c = childsnap.val();

        // save data from db one chapter at a time
        let data = {
          chapter: c.chapterNum,
          // book: c.book,
          author: c.author,
          // firstV: c.firstVerse,
          topics: c.topic,
          // headings: c.headings
        };

        // push the data into the array of all chapters
        let x = that.state.everything;
        x.push(data);
        that.setState({everything: x});

      })
      that.sortInfo();

    });
  }

  // sort author info: how many psalms each author wrote and which ones they are; what are the top topics for each author
  sortInfo() {
    const everything = this.state.everything;
    let authorArray=[{key:everything[0].author, value:1}];
    let psalmsChapters=[{author:everything[0].author, chapter:[everything[0].chapter]}];

    // loop through and compare the massive list of authors to a new array of obj, adding up the times an author wrote a psalm 
    for (let i=1; i<everything.length; i++) {
      // if false new data isn't pushed into authorArray
      let flag=false;

      // loop through author Array once for each value of massive data array
      for (let j=0; j<authorArray.length; j++) {
        flag=false;
        if (authorArray[j].key === everything[i].author) {
          authorArray[j].value++;
          psalmsChapters[j].chapter.push(', ' + everything[i].chapter);
          flag = true;
          break;
        }
      }
      if (!flag) {
        const data = {author:everything[i].author, value:1};
        const data2 = {author:everything[i].author, chapter:everything[i].chapter};
        authorArray.push(data);
        psalmsChapters.push(data2);
      }
    }
    this.setState({authorArray:authorArray, psalmsChapters: psalmsChapters})
  }

  makeTableHeaders() {
    this.setState({
      columns:[
        {Header: 'Author', accessor: 'author'},
        {Header: 'Chapters', id: 'chapters', accessor: d => d.chapter}
      ]
    })
  }

  render() {
    console.log(this.state.authorArray)
    // console.log(this.state.psalmsChapters);
    // console.log(this.props.location)

    return(
      <Container>
        <PsHeader heading='Compare Authors'></PsHeader>
        <Row className='content-wrapper'>

          <Row className='content content--centered content--fullWidth content__pieChart'>
            <PieChart
              labels
              data={this.state.authorArray}
              styles={{
                '.chart_text': {
                  fontSize: '1em',
                  fill: '#fff'
                }
              }}
            />

            <div className='content'>
              <ReactTable
                data={this.state.psalmsChapters}
                columns={this.state.columns}
                showPagination={false}
                minRows={0}
                className='-highlight'
                />
            </div>
          </Row>

          <Row className='content__button-row content__button-row--fullWidth'>
            <Button tag={Link} to={'/psalmsCompareAll'}>Compare All Psalms</Button>
            <Button tag={Link} to={'/psalmsCompareTopics'}>Compare Topics</Button>
          </Row>

        </Row>
        <Footer></Footer>        
      </Container>

    )
  }
}

export default PsalmsCompareAuthor;