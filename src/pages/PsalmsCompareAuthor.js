import React, { Component } from 'react';
import firebase from '../components/Firebase/firebase';
import { PieChart } from 'react-easy-chart';
import ReactTable from "react-table";
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';

class PsalmsCompareAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everything: [],
      authorArray: [],
      psalmsChapters: [],
      columns: [],
      rowWidth: ''
    }
    this.getInfo=this.getInfo.bind(this);
    this.sortInfo=this.sortInfo.bind(this);
    this.makeTableHeaders=this.makeTableHeaders.bind(this);
  }

  componentDidMount() {
    this.getInfo();
    var w =document.getElementById('tableRow').clientWidth;
    // console.log(w)
    w-=40; // minus padding
    // set row width for table before making them
    this.setState({rowWidth: w}, () => {
      this.makeTableHeaders();
    })
  }

  // get data from firebase db
  getInfo() {
    let that = this; // 'this' doesn't work inside functions
    const db = firebase.database();

    db.ref('psalms').on('value', function(s){
      // console.log(that.state.everything)
      s.forEach(function(childsnap){
        const c = childsnap.val();

        // save data from db one chapter at a time
        let data = {
          chapter: c.chapterNum,
          author: c.author,
          topics: c.topic,
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
      // if false new data is pushed into authorArray
      let flag=true;
      // loop through author Array once for each value of massive data array
      for (let j=0; j<authorArray.length; j++) {
        flag=true;
        // if the author from everything array equals the author in the authorArr, update the value and add the chapterNum 
        if (authorArray[j].key === everything[i].author) {
          authorArray[j].value++;
          psalmsChapters[j].chapter.push(', ' + everything[i].chapter);
          flag = false;
          break;
        }
      }
      // if flag is true, the author wasn't already in the authorArr, so push it
      if (flag) {
        const data = {key:everything[i].author, value:1};
        const data2 = {author:everything[i].author, chapter:[everything[i].chapter]};
        authorArray.push(data);
        psalmsChapters.push(data2);
      }
    }
    this.setState({authorArray:authorArray, psalmsChapters: psalmsChapters})
  }

  makeTableHeaders() {
    this.setState({
      columns:[
        {Header: 'Author', accessor: 'author', id: 'Author', minWidth: 150},
        {Header: 'Chapters', id: 'chapters', accessor: d => d.chapter, width: this.state.rowWidth-150, style: {'whiteSpace': 'unset'}}
      ]
    })
  }

  render() {
    // console.log(this.state.columns)
    console.log(this.state.psalmsChapters);
    // console.log(this.state.rowWidth)

    return(
      <PsalmsCompareWrapper
        heading='Compare Authors'
        // className='content__button-row--fullWidth'
        compare1Link='/psalmsCompareAll'
        compare1Title='Compare All Psalms'
        compare2Link='/psalmsCompareTopics'
        compare2Title='Compare Topics'     
        className2='content--fullWidth content__pieChart'   
      >
        <div className='content--centered'>
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
        </div>
        <div id='tableRow' className='content content--fullWidth'>
          <ReactTable
            data={this.state.psalmsChapters}
            columns={this.state.columns}
            showPagination={false}
            minRows={0}
            className='-highlight table--centered'
            // sorted={[{id: 'Author', desc: true}]}
            />
        </div>      
      </PsalmsCompareWrapper>
    )
  }
}

export default PsalmsCompareAuthor;