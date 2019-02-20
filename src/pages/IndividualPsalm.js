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
      chapterNum: this.props.match.params.chapterNum,
      freq:[],
      freq2:[],
      frequentPhrases: [],
      frequentPhrasesTitle: '',
      whichPsalm: false,
      next: '',
      changePage: false,
      buttonWords: 'Group like words',
      flag: false
    }
    this.getPsWordCount = this.getPsWordCount.bind(this);
    this.groupWordsParent = this.groupWordsParent.bind(this);
    this.frequentPhrases = this.frequentPhrases.bind(this);
    this.whichPsalm = this.whichPsalm.bind(this);
    this.RenderFrequentPhrases = this.RenderFrequentPhrases.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.flag = this.flag.bind(this);

  }

  // callback here in parent, sent as props to PsChap child to get freq array to bring back here to state to then send to child pswordcount
  getPsWordCount(params) {
    // console.log(params) // used for data entry
    this.setState({
      freq: params[0],
      count: params[1]
    })
  }

  groupWordsParent(params, chap) {
    console.log(params, chap)
    this.setState({
      freq2: params
    })
  }

  frequentPhrases(params) {
    // console.log('here')
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
      // data below goes to PsWordCountTable to ungroup words
      changePage: true,
      buttonWords: 'Group like words',
      flag: false
    });
  }

  // for child PsWordCountTable to rerender button when changing page
  flag() {
    console.log('change flag button words')
    let buttonWords; 
    this.state.flag ? buttonWords = 'Group like words' : buttonWords = 'Ungroup like words';
    this.setState({
      flag:!this.state.flag,
      buttonWords: buttonWords
    });
    console.log(buttonWords)
  }

  // only rend the area if there are frequent phrases
  RenderFrequentPhrases(){
    if (this.state.frequentPhrases.length===0) {
      return(null)
    }
    else {
      return(
        <div className='content content--fullWidth'>
          <h3>{this.state.frequentPhrasesTitle}</h3>
          <div className='content--columns'>

          {this.state.frequentPhrases.map((f) => {
            return(
            <p key={f[0]+f[1]+'-'+f[5]+f[6]+f[10]+''+ f.length}>{f}</p>
            )})}
            </div>
        </div>      
      )      
    }
  }

  // puts 'next psalm' and 'previous psalm' buttons at bottom
  /* Using the reactStrap Button tag links to the url so it changes and giving it an onClick func forces a refreshed state so component completely rerenders. The component does not unmount */
  renderButtons() {
    const next = parseInt(this.props.match.params.chapterNum) + 1;
    const previous = parseInt(this.props.match.params.chapterNum) - 1;
    // if it's psalm 150 or over don't render 'next psalm'
    if (next > 150) {
      return(
        <div className='content__button-row content__button-row--fullWidth'>
          <Button tag={Link} to={`/psalm/${previous}`} onClick={() => this.whichPsalm(previous)}>Previous Psalm</Button>
        </div>
      )
    }
    // if it's psalm 1 or under, don't render 'previous psalm'
     else if (previous < 1) {
      return (
        <div className='content__button-row content__button-row--fullWidth'>
          <Button tag={Link} to={`/psalm/${next}`} onClick={() => this.whichPsalm(next)}>Next Psalm</Button>
        </div>
     )
    }
    // otherwise render both
    else {
      return(
        <div className='content__button-row content__button-row--fullWidth'>
          <Button tag={Link} to={`/psalm/${previous}`} onClick={() => this.whichPsalm(previous)}>Previous Psalm</Button>
          <Button tag={Link} to={`/psalm/${next}`} onClick={() => this.whichPsalm(next)}>Next Psalm</Button>
        </div>
      )      
    }
  }

  render() {
    // console.log(this.state.changePage)
    return(
      <Container>
        <PsHeader heading={`Psalm ${this.state.chapterNum}`} />
        
        <Row className='content-wrapper'>
          {/* The actual chapter */}
          <PsChap 
            chapterNum={this.state.chapterNum} 
            getPsWordCount={this.getPsWordCount} 
            groupWordsParent={this.groupWordsParent} 
            frequentPhrases={this.frequentPhrases}
            className='content--widthLarger content content--displayLineBreaks' />

          {/* Word count */}
          <PsWordCountTable freq={this.state.freq} freq2={this.state.freq2} onClick={this.flag} buttonWords={this.state.buttonWords} flag={this.state.flag}/>

          {/* Frequent Phrases */}
          {this.RenderFrequentPhrases()}

          {/* Psalm data */}
          <div className='content' style={{marginLeft: '0px'}}>
            <PsalmTableData chapterNum={this.state.chapterNum} />
          </div>              

          {/* Footnotes */}
          <div className='footnote'>
            <p>The word count only shows words with a frequency of 2 or more.</p>
            <p>Grouping words takes out passive verbs, conjunctions, and articles, and it combines like terms.</p>
          </div>

          {this.renderButtons()}

        </Row>
        <Footer></Footer>
      </Container>
    )  
  }
}

export default IndividualPsalm;
