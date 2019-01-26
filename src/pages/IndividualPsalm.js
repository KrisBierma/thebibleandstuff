import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap';
// import axios from 'axios';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
// import firebase from '../components/Firebase/firebase';
import PsalmTableData from '../components/psalmTableData';
import PsChap from '../components/PsChap';
import PsWordCountTable from '../components/PsWordCountTable';
import { Link } from 'react-router-dom';

class IndividualPsalm extends Component {
  constructor(props){
    super(props);
    this.state = {
      // author: '',
      // book: '',
      // firstVerse: '',
      // headings: '',
      chapterNum: this.props.match.params.chapterNum,
      // summary: '',
      // topic: '',
      // wholeChapeter: '',
      freq:[],
      freq2:[],
      frequentPhrases: [],
      frequentPhrasesTitle: '',
      whichPsalm: false,
      next: ''
    }
    this.getPsWordCount = this.getPsWordCount.bind(this);
    this.groupWordsParent = this.groupWordsParent.bind(this);
    this.frequentPhrases = this.frequentPhrases.bind(this);
    this.whichPsalm = this.whichPsalm.bind(this);
    this.RenderFrequentPhrases = this.RenderFrequentPhrases.bind(this);
  }

  // callback here in parent, sent as props to PsChap child to get freq array to bring back here to state to then send to child pswordcount
  getPsWordCount(params) {
    console.log(params)
    this.setState({
      freq: params[0],
      count: params[1]
    })
  }

  groupWordsParent(params) {
    // console.log(params)
    this.setState({
      freq2: params
    })
  }

  frequentPhrases(params) {
    var title = (params.length > 0) ? <u>Frequent Phrases:</u> : '';
    this.setState({
      frequentPhrases: params,
      frequentPhrasesTitle: title
    });
  }

  // works with Button link (which changes the url) to reset state with the next psalms info. the component refreshes but does not remount
  whichPsalm(whichOne) {
    this.setState({
      chapterNum: whichOne,
      wholeChapeter: '',
    });
  }

  // only rend the area if there are frequent phrases
  RenderFrequentPhrases(){
    if (this.state.frequentPhrases.length===0) {
      return(null)
    }
    else {
      return(
        <div className='content content--columns'>
          <h3>{this.state.frequentPhrasesTitle}</h3>
          {this.state.frequentPhrases.map((f) => {
            return(
            <p key={f[0]+f[1]+'-'+f[5]+f[6]+f[10]+''+ f.length}>{f}</p>
            )})}
        </div>      
      )      
    }
  }

  render() {
  const next = parseInt(this.props.match.params.chapterNum) + 1;
  const previous = parseInt(this.props.match.params.chapterNum) - 1;
  // console.log(this.state.chapterNum)
  // console.log(this.state)
    return(
      <Container>
        <PsHeader heading={`Psalm ${this.state.chapterNum}`} />
        
        <Row className='content-wrapper'>
          {/* The actual chapter */}
          <PsChap chapterNum={this.state.chapterNum} getPsWordCount={this.getPsWordCount} groupWordsParent={this.groupWordsParent} frequentPhrases={this.frequentPhrases}
            className='content--width70 content'
            />

          {/* Word count */}
          <PsWordCountTable freq={this.state.freq} freq2={this.state.freq2} />

          {/* Frequent Phrases */}
          {this.RenderFrequentPhrases()}

          {/* Psalm data */}
          <div className='content' style={{marginLeft: '0px'}}>
            <PsalmTableData chapterNum={this.state.chapterNum} />
          </div>              

          {/* Footnotes */}
          <div className='footnote'>
            <p>The word count only shows words with a frequency of 2 or more.</p>
            <p>Grouping words takes out passive verbs, conjuntions, and articles, and it combines like terms.</p>
          </div>
          <div className='content__button-row  content__button-row--bordered'>
            {/* Using the reactStrap Button tag links to the url so it changes and giving it an onClick func forces a refreshed state so component completely rerenders. The component does not unmount */}
            <Button tag={Link} to={`/psalm/${previous}`} onClick={() => this.whichPsalm(previous)}>Previous Psalm</Button>
            <Button tag={Link} to={`/psalm/${next}`} onClick={() => this.whichPsalm(next)}>Next Psalm</Button>
          </div>
        </Row>
        <Footer></Footer>
      </Container>
    )  
  }
}

export default IndividualPsalm;
