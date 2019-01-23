import React, { Component } from 'react';
import Footer from '../components/Footer';
import { Container, Row, Button } from 'reactstrap';
import PsHeader from '../components/PsHeader';
// import ReactTable from "react-table";
import { Link } from 'react-router-dom';
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';
// import firebase from '../components/Firebase/firebase';

class PsalmsCompareTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: []
    }
    this.renderTable=this.renderTable.bind(this);
  }

  componentDidMount() {
    this.renderTable();
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
    console.log(this.props.location)

    return(
      // <div></div>
      <PsalmsCompareWrapper
        heading='Compare Topics'
      >

            <p>Is it centered on God, his people, or is it an individual cry for help?</p>
         
</PsalmsCompareWrapper>
    )
  }
}

export default PsalmsCompareTopic;