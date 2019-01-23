import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';
import firebase from '../components/Firebase/firebase';
import Footer from '../components/Footer';
import PsHeader from '../components/PsHeader';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom';
// import { PsButton } from '../components/PsButton';

class PsalmsCompareAll extends Component {
  constructor(props){
    super(props);
      this.state = {
        everything:[],
        columns:[],
        data:[],
        // changePage:false,
        chapterNum:'',
        id:''
      }
    this.renderTable=this.renderTable.bind(this);
    // this.changePage=this.changePage.bind(this);
  }

  componentDidMount(){
    this.renderTable();
  }

  // get all data from firebase db, input to table
  renderTable() {
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
          book: c.book,
          author: c.author,
          firstV: c.firstVerse,
          topics: c.topic,
          headings: c.headings,
          wordCount: c.wordCount
        };

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
          {Header: 'Author', accessor:'author'},
          {Header: 'First Verse', accessor:'firstV', minWidth:250, maxWidth:350,
            style:{
              width: "100%",
              height: "100%",
              whiteSpace: 'normal'
          }},
          {Header: 'Topics', accessor:'topics', style:{whiteSpace: 'normal'}},
          {Header: 'Headings', accessor:'headings', style:{whiteSpace:
          'normal'}},
          {Header: 'Word Count', accessor:'wordCount'},    
        ]
      })
    });
  }
// make frozen true for top header row

  // linked to two buttons (author info and topic info)
  // changePage(props) {
  //   this.setState({changePage:true, id:props})
  // }

  render(){
    // console.log(this.state.everything)
    // console.log(this.state.columns)
    // console.log(this.state.changePage)
    // if (this.state.changePage && this.state.id==='specificPsalm') {
    //   return <Redirect to={`/psalm/${this.state.chapterNum}`} />
    // }
    // else if (this.state.changePage && this.state.id==='authors') {
    //   return <Redirect to={`/psalmsCompareAuthor`} />
    // }
    // else if (this.state.changePage && this.state.id==='topics') {
    //   return <Redirect to={`/psalmsCompareTopic`} />
    // }
    // console.log(this.props.location)

    // console.log(this.props)


    return(
      <Container>
        <PsHeader heading='Compare all the Psalms' />
        <Row className='content-wrapper'>
          <div className='content'>
            <Row className='content__button-row  content__button-row--bordered'>
              <p className='content__button-row__p'><u>Click a table heading to sort or...</u></p>
              <Button tag={Link} to={'/psalmsCompareAuthors'}>Compare Authors</Button>
              <Button tag={Link} to={'/psalmsCompareTopics'}>Compare Topics</Button>
            </Row>

            <ReactTable 
              data={this.state.everything} 
              columns={this.state.columns} 
              showPagination={false} 
              minRows={0} 
              isExpanded={true} 
              className='-highlight -striped content-table'
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
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e) => {
                    // console.log(instance);
                    console.log(rowInfo.original.chapter)
                    // console.log(column)
                    const chapterNum = rowInfo.original.chapter;
                    this.setState({chapterNum:chapterNum, changePage:true, id:'specificPsalm'})
                  }
                }
              }}
              />
          </div>
        </Row>
        <Footer></Footer>
      </Container>
    )
  }
};

export default PsalmsCompareAll;
