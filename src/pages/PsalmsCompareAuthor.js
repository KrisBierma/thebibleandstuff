import React, { Component } from 'react';
import firebase from '../components/Firebase/firebase';
import { PieChart } from 'react-easy-chart';
import ReactTable from "react-table";
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';
import LegendCircle from '../components/LegendCircle';

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
    let authorArray=[{key:everything[0].author, value:1, color:'#2C4564'}];
    let psalmsChapters=[{author:everything[0].author, chapter:[everything[0].chapter]}];
    const colors=['#7b9139', '#98753C', '#702C5F', '#E8CA9B', '#3D4F06', '#091D36', '#3D052F', '#533607'];
    let k = 0; // starting place for colors array
    // loop through and compare the massive list of authors to a new array of obj, adding up the times an author wrote a psalm 
    for (let i=1; i<everything.length; i++) {
      // if false new data is pushed into authorArray
      let flag=true;
      let flagCount=0; // used to count author arrays
      let missingAuthor; // used for mutiple authors in author arrays
      // loop through author Array once for each value of massive data array
      for (let j=0; j<authorArray.length; j++) {
        flag=true;

        // if the author from everything array equals the author in the authorArr, update the value and add the chapterNum; check if typeof is object (indicates an array of authors)
        if (typeof everything[i].author != 'object' && authorArray[j].key === everything[i].author) {
          authorArray[j].value++;
          psalmsChapters[j].chapter.push(', ' + everything[i].chapter);
          flag = false;
          break;
        }
        else if (typeof everything[i].author === 'object') {
          flagCount = everything[i].author.length;
          for (let l=0; l<everything[i].author.length; l++) {
            if (everything[i].author[l] === authorArray[j].key) {
              authorArray[j].value++;
              psalmsChapters[j].chapter.push(', ' + everything[i].chapter);
              flag = false;
              flagCount--;
              break;              
            }
            else missingAuthor=everything[i].author[l];
          }
        }
      }
      // if flag is true, the author wasn't already in the authorArr, so push it
      if (flag && flagCount===0) {
        // console.log(everything[i].author, colors[k])
        const data = {key:everything[i].author, value:1, color:colors[k]};
        const data2 = {author:everything[i].author, chapter:[everything[i].chapter]};
        authorArray.push(data);
        psalmsChapters.push(data2);
        k++; // move to next color in colors array
      }
      else if (flag && flagCount !== 0) {
        const data = {key:missingAuthor, value:1, color:colors[k]};
        const data2 = {author:missingAuthor, chapter:[everything[i].chapter]};
        authorArray.push(data);
        psalmsChapters.push(data2);
        k++; // move to next color in colors array        
      }
    }
    // sort author array by values
    authorArray.sort(function (a,b) {
      return b.value - a.value;
    })
    this.setState({authorArray:authorArray, psalmsChapters: psalmsChapters})
  }

  makeTableHeaders() {
    this.setState({
      columns:[
        {Header: 'Author', accessor: 'author', id: 'Author', minWidth: 150},
        {Header: 'Chapters', id: 'chapters', accessor: d => d.chapter, minWidth: this.state.rowWidth-150, style: {'whiteSpace': 'unset'}}
      ]
    })
  }

  render() {
    return(
      <PsalmsCompareWrapper
        heading='Compare Authors'
        compare1Link='/psalmsCompareAll'
        compare1Title='Compare All Psalms'
        compare2Link='/psalmsCompareTopics'
        compare2Title='Compare Topics'     
        className2='content--fullWidth content__pieChart'   
      >
        <div className='content--centered content__pieChart'>
          {/* Legend */}
          <div className='content--flex content--left'>
            {this.state.authorArray.map((a) => {
              return(
                <LegendCircle color={a.color} key={a.key}>{a.key} ({a.value})</LegendCircle>
              )
            })}            
          </div>

          <PieChart
            // labels
            data={this.state.authorArray}
            styles={{
              '.chart_text': {
                fontSize: '1em',
                fill: '#fff',
                display: 'inline-block'
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