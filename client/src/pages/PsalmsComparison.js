// compares two psalms
import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import PsHeader from '../components/PsHeader';
import Footer from '../components/Footer';
import PsChap from '../components/PsChap';
import PsalmTableData from '../components/psalmTableData';
import PsWordCountTable from '../components/PsWordCountTable';

class PsalmsComparison extends Component {
  constructor(props){
    super(props);
    this.state = {
      psalm1: this.props.match.params.psalmId.split('&')[0],
      psalm2: this.props.match.params.psalmId.split('&')[1],
      buttonWords1: 'Group like words',
      buttonWords2: 'Group like words',
      flag1: false,
      flag2: false
    }
    this.getPsWordCount = this.getPsWordCount.bind(this);
    this.groupWordsParent = this.groupWordsParent.bind(this);
    this.frequentPhrases = this.frequentPhrases.bind(this);
    this.flag = this.flag.bind(this);
  }

  // callback for child (psChap) to call to get data from it, save it here (the parent) and have another child (psWordCount) call it
  getPsWordCount(params, chap){
    let key = 'freq' + chap;
    this.setState({
      [key]: params[0]
    })
  }
  groupWordsParent(params, chap) {
    let key = 'freq' + chap + chap;
    this.setState({
      [key]: params
    })
  }

  // empty but must be here bc it's called in PsChap (which is used in individualPsalm)
  frequentPhrases(params) {
    // console.log(params)
  }

  // for child PsWordCountTable to rerender button when changing page
  flag(whichFlag, whichButtonWords) {
    let buttonWords; 
    this.state[whichFlag] ? buttonWords = 'Group like words' : buttonWords = 'Ungroup like words';
    this.setState({
      [whichFlag]:!this.state[whichFlag],
      [whichButtonWords]: buttonWords
    });
  }

  render() {
    // get dynamically created state for the two psalms that the user entered
    const x =(`freq${this.state.psalm1}`);
    const y = (`freq${this.state.psalm2}`);
    let freq1 = this.state[x];
    let freq2 = this.state[y];  
    const xx =(`freq${this.state.psalm1}${this.state.psalm1}`);
    const yy = (`freq${this.state.psalm2}${this.state.psalm2}`);
    let freq11 = this.state[xx];
    let freq22 = this.state[yy];

    // during first renderings, give them blank arrays
    if (typeof freq1 === 'undefined') {
      freq1 = [];
    }
    if (typeof freq2 === 'undefined') {
      freq2 = [];
    }
    if (typeof freq11 === 'undefined') {
      freq11 = [];
    }
    if (typeof freq22 === 'undefined') {
      freq22 = [];
    }
    // if (freq1.length !== 0 && freq2.length !== 0) {
    //   console.log(freq1)
    //   console.log(freq2);      
    // }
    // if (freq11.length !== 0 && freq22.length !== 0) {
    //   console.log(freq11)
    //   console.log(freq22);      
    // }

    return(
    <Container>
      <PsHeader heading={`Psalms ${this.state.psalm1} and ${this.state.psalm2}`} />

      <Row className='content-wrapper'>
        <Col>
          <Row>
            <Col>
              <h2>Psalm {this.state.psalm1}</h2>
              <PsChap 
                chapterNum={this.state.psalm1} 
                getPsWordCount={this.getPsWordCount} 
                groupWordsParent={this.groupWordsParent}
                frequentPhrases={this.frequentPhrases} 
                className='content content--displayLineBreaks' />
            </Col>
            <Col>
              <h2>Psalm {this.state.psalm2}</h2>
              <PsChap 
                chapterNum={this.state.psalm2} 
                getPsWordCount={this.getPsWordCount} 
                groupWordsParent={this.groupWordsParent} 
                frequentPhrases={this.frequentPhrases} 
                className='content content--displayLineBreaks' />
            </Col>
          </Row>
          <Row>
            <Col className='content--centered'>
              {/* <PsWordCountTable freq={freq1}/> */}
              <PsWordCountTable freq={freq1} freq2={freq11} onClick={() => this.flag('flag1', 'buttonWords1')} buttonWords={this.state.buttonWords1} flag={this.state.flag1}/>
            </Col>
            <Col className='content--centered'>
              {/* <PsWordCountTable freq={freq2}/> */}
              <PsWordCountTable freq={freq2} freq2={freq22} onClick={() => this.flag('flag2', 'buttonWords2')} buttonWords={this.state.buttonWords2} flag={this.state.flag2}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <PsalmTableData chapterNum={this.state.psalm1} />
            </Col>
            <Col>
              <PsalmTableData chapterNum={this.state.psalm2} />
            </Col>
          </Row>       
          {/* Footnotes */}
          <div className='footnote'>
            <p>The word count only shows words with a frequency of 2 or more.</p>
            <p>Grouping words takes out passive verbs, conjunctions, and articles, and it combines like terms.</p>
            <p>All Bible passages are from the <a href='https://www.esv.org/' target='_blank' rel='noopener noreferrer'>"ESV."</a></p>
          </div>      
        </Col>
      </Row>
      <Footer></Footer>
  </Container>
  )
}
};

export default PsalmsComparison;
