import React, { Component } from 'react';
import firebase from '../components/Firebase/firebase';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';

class PsalmsCompareAll extends Component {
  constructor(props){
    super(props);
      this.state = {
        everything:[],
        columns:[],
        data:[],
        chapterNum:'',
        id:''
      }
    this.renderTable=this.renderTable.bind(this);
  }

  componentDidMount(){
    this.renderTable();
  }

  // get all data from firebase db, input to table
  renderTable() {
    let that = this; // 'this' doesn't work inside functions
    const db = firebase.database();

    db.ref('psalms').on('value', function(s){
      s.forEach(function(childsnap){
        const c = childsnap.val();

        // save data from db one chapter at a time; chap and count need to be type number for table sorting
        let data = {
          chapter: parseInt(c.chapterNum),
          book: c.book,
          author: c.author,
          firstV: c.firstVerse,
          topics: c.topic,
          // headings: c.headings,
          wordCount: parseInt(c.wordCount)
        };

        if (typeof data.author === 'object') {
          // console.log(data.author)
          data.author = data.author[0] + ', ' + data.author[1]
        }
        // push the data into the array of all chapters
        let x = that.state.everything;
        x.push(data);
        that.setState({everything: x});
      })

      // set the columns names inside this func (outside and the rows don't populate correctly)
      that.setState({
        columns:[
          {Header: 'Chapter', accessor:'chapter', minWidth:65, maxWidth:75, id: 'row'},
          {Header: 'Book', accessor:'book', minWidth:65, maxWidth:75},
          {Header: 'Author', accessor:'author', maxWidth: 150, style: {whiteSpace: 'normal'}},
          {Header: 'First Verse', accessor:'firstV', minWidth:100, maxWidth:550,
            style:{
              width: "100%",
              height: "100%",
              whiteSpace: 'normal'
          }},
          // {Header: 'Topics', accessor:'topics', style:{whiteSpace: 'normal'}},
          {Header: 'Word Count', accessor:'wordCount', maxWidth: 100},    
        ]
      })
    });
  }
// make frozen true for top header row

  render(){
    return(
      <PsalmsCompareWrapper
        heading='Compare all the Psalms'
        compare1Link='/psalmsCompareAuthors'
        compare1Title='Compare Authors'
        compare2Link='/psalmsCompareTopics'
        compare2Title='Compare Topics'
        para={<u className='content__button-row__p'>Click a table heading to sort or...</u>}
      >
      <ReactTable 
        data={this.state.everything} 
        columns={this.state.columns} 
        // showPagination={false}
        // showPaginationTop={true} 
        defaultPageSize= {150}
        width={700}
        minRows={0} 
        isExpanded={true} 
        className='-highlight -striped'
        getTableProps={(state,rowInfo, column, instance, row, indexKey) => {
          return {
            // onScroll: e => {
            //   if (this.tableScrollTop === e.target.scrollTop) {
            //     let left = e.target.scrollLeft > 0 ? e.target.scrollLeft : 0;
            //     // $(".ReactTable .rt-tr .frozen").css({ left: left });
            //   } else {
            //     this.tableScrollTop = e.target.scrollTop;
            //   }
            // }
          };
        }}
        // getTdProps={(state, rowInfo, column, instance) => {
        //   return {
        //     onClick: (e) => {
        //       console.log(rowInfo.original.chapter)
        //       const chapterNum = rowInfo.original.chapter;
        //       this.setState({chapterNum:chapterNum, changePage:true, id:'specificPsalm'})
        //     }
        //   }
        // }}
      />

      {/* Footnotes */}
      <div className='footnote--compareAll'>
        <p>All Bible passages are from the <a href='https://www.esv.org/' target='_blank' rel='noopener noreferrer'>"ESV."</a></p>
      </div>
      </PsalmsCompareWrapper>
    )
  }
};

export default PsalmsCompareAll;
