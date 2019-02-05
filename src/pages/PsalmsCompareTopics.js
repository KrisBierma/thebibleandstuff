import React, { Component } from 'react';
import PsalmsCompareWrapper from '../components/PsalmsCompareWrapper/PsalmsCompareWrapper';
import firebase from '../components/Firebase/firebase';
import axios from 'axios';
import ReactTable from 'react-table';

class PsalmsCompareTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      wordToFind: '',
      topicsObj: [],
      topicsObj2: [],
      newTopicsObj: [],
      loading: true,
      page: '',
      pageSize: '',
      sorted: '',
      filtered: '',
      versesFound: ''
    }
    this.renderTable=this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.renderTable();
    this.setState({
      topicsObj2: [{topic:'hi', chapter:['2', '3', '4']}, {topic:'hi2', chapter:['2','3']}]
    })
  }

  // gets the value fron the word search input box
  handleChange(e) {
    const value = e.target.value;
    this.setState({wordToFind: value})
  }



  // api call to ESV to get verses with user's word
  submitForm(e) {
    console.log('here')
    e.preventDefault();
    const word = this.state.wordToFind;
    const page = 1;
    const queryURL = 'https://api.esv.org/v3/passage/search/';
    const config = {
      headers: {
        'Authorization': process.env.REACT_APP_ESV_API_KEY
      },
      params : {
        'q': word,
        'page-size': 100,
        'page': page
      }
    };   
    const timeout = 5000;
    axios.get(queryURL, config, timeout)
    .then((res) => {
      console.log(res.data.results);
      const results = res.data.results;
      let versesFound = [];
      results.forEach(p => {
        const str = p.reference;
        if (str.startsWith('Psalm')){
          console.log(p)
          versesFound.push(`${p.reference}, `)
        }
      })
      console.log(versesFound);
      this.setState({versesFound:versesFound})
    })
    .catch(error => {
      console.log(error)
    })
  }

  getData() {
    const db = firebase.database();
    const topicsArr = ['praise', 'thanksgiving', 'triumphVictory', 'remembrance', 'mercy', 'confessionRepentance', 'godlinessRighteousness', 'instructionProverbs', 'lawCommands', 'ungodliness', 'enemies', 'lament', 'cryForHelp', 'protectionDeliverance', 'comfort', 'provision', 'restoration', 'healing', 'dependence', 'nature', 'aBlessing', 'natureOfGod', 'songOfAscents'];
    const topicsObj = {praise:[], thanksgiving: [], triumphVictory: [], remembrance: [], mercy: [], confessionRepentance: [], godlinessRighteousness: [], instructionProverbs: [], lawCommands: [], ungodliness: [], enemies: [], lament: [], cryForHelp: [], protectionDeliverance: [], comfort: [], provision: [], restoration: [], healing: [], dependence: [], nature: [], aBlessing: [], natureOfGod: [], songOfAscents: []};

    db.ref('psalms').on('child_added', function(snapshot) {
      const data = snapshot.val();
      // loop through each psalm from db
      for (const prop in data) {
        // lop off 'topic-' from the prop
        const newProp = prop.slice(6);
        // check if the prop is a topic/ in the topics array
        if (topicsArr.includes(newProp)) {
          // if so, push check if it's the first entry
          if (topicsObj[newProp].length === 0 ) {
            topicsObj[newProp].push(data.chapterNum);
          }
          // else push the chapterNum + a comma into the topicsObj array
          else {
            // console.log(topicsObj[newProp])
            topicsObj[newProp].push(`, ${data.chapterNum}`);
          }
        }
      }
    });
    let newTopicsObj = [];

    for (let props in topicsObj) {
      let name;

      switch (props) {
        case 'praise':
          name = 'Praise*';
          break;
        case 'thanksgiving':
          name = 'Thanksgiving';
          break;
        case 'triumphVictory':
          name = 'Triumph, victory';
          break;
        case 'remembrance':
          name = 'Remembrance, recall, history';
          break;
        case 'mercy':
          name = 'Mercy';
          break;
        case 'confessionRepentance':
          name = 'Confession, repentence, forgiveness';
          break;
        case 'godlinessRighteousness':
          name = 'Godliness, righteousness';
          break;
        case 'instructionProverbs':
          name = 'Instruction, proverbs';
          break;
        case 'lawCommands':
          name = 'Law, commands**';
          break;
        case 'ungodliness':
          name = 'Ungodliness, wickedness';
          break;
        case 'enemies':
          name = 'Enemies';
          break;
        case 'lament':
          name = 'Lament';
          break;
        case 'cryForHelp':
          name = 'Cry for Help';
          break;
        case 'protectionDeliverance':
          name = 'Protection, deliverance';
          break;
        case 'comfort':
          name = 'Comfort';
          break;
        case 'provision':
          name = 'Provision';
          break;
        case 'restoration':
          name = 'Restoration';
          break;
        case 'healing':
          name = 'Healing***';
          break;
        case 'dependence':
          name = 'Dependence on, desire for God';
          break;
        case 'nature':
          name = 'Nature';
          break;
        case 'aBlessing':
          name = 'Blessing';
          break;
        case 'natureOfGod':
          name = 'Nature of God';
          break;
        case 'songOfAscents':
          name='**** Song of Ascents';
          break;
        default:
          console.log('none found');
          break;
      }

      const data = {topic: name, chapter:topicsObj[props]}
      newTopicsObj.push(data);
    }
    // console.log(this.state.topicsObj)
    this.setState({newTopicsObj: newTopicsObj});
    // this.setState({newTopicsObj: [{topic:'hi', chapter:['2', '3', '4']}, {topic:'hi2', chapter:['2','3']}]})
  }

  // make chart wth 2 headings: topics, psalms
  renderTable() {
    // console.log(this.state.newTopicsObj)
    this.setState({
      columns:[
        {Header: 'Topic', accessor: 'topic', id: 'topic', width: 300},
        {Header: 'Chapters', accessor: d => d.chapter, id: 'chapter', minWidth: 500}
      ]
    })
    // const obj = this.state.newTopicsObj;
    // const obj = JSON.parse(JSON.stringify(this.state.newTopicsObj));
    // console.log(obj, obj.length)
    // obj.forEach(d => {
    //   console.log(d.topic, d.chapter.join(' '))
    // })

    // return(
    //   <tbody>
    //     {this.state.newTopicsObj.map(d => (
    //       <tr>
    //         <td>{d.topic}</td>
    //         {/* {d.chapter.map(c => ( */}
    //           <td>{d.chapter.map(c => (c.chapter))}</td>
    //         {/* ))} */}
    //       </tr>
    //     ))}
    //   </tbody>
    // )
  }

  render() {
    return(
      <PsalmsCompareWrapper
        className=''
        heading='Compare Topics'
        compare1Link='/psalmsCompareAll'
        compare1Title='Compare All Psalms'
        compare2Link='/psalmsCompareAuthors'
        compare2Title='Compare Authors'
        className2='content__table--compareTopics'
      >

      <ReactTable
        data={this.state.newTopicsObj}
        columns={this.state.columns}
        showPagination={false}
        className='-highlight table--centered'
        defaultPageSize={23}
        // getNoDataProps={(state, rowInfo, column, instance) => {
        //   console.log(state.data)
        // }}
      />

      {/* {this.renderTable()} */}
      <div className='footnote'>
        {/* <p>Is it centered on God, his people, or is it an individual cry for help?</p> */}
        <p>* They all have an element of praise somewhere in them, but some Psalms are focused on praising God and some are a cry to God.</p>
        <p>** Similar words: law, statute, precept, decree, command, word, way</p>
        <p>** <a href='https://biblehub.com/parallel/psalms/119-1.htm'>This</a> is a good resource for finding the Hebrew of these words and its meaning.</p>
        <p>*** These psalms mention healing, but it isn't a topic.</p>
        <p>**** Song of ascents: <a href='https://en.wikipedia.org/wiki/Song_of_Ascents'>Information</a> and <a href='http://www.shoshanim.de/pages/maalot-en.html'>music</a>.</p>   
        {/* <p>Random facts:</p>
        <p>how many start with 'praise the Lord'?</p> */}
      </div>

      <div>
        <form onSubmit={this.submitForm}>
          {/* <label>Search for a specific word.  */}
            <input type='text' name='wordToFind' value={this.state.wordToFind} onChange={this.handleChange} placeholder='Serch for a specific word.'></input>
          {/* </label> */}
          <input type='submit' value='Submit'></input>
        </form>
        <p id='results'>{this.state.versesFound}</p>
      </div>
      </PsalmsCompareWrapper>
    )
  }
}

export default PsalmsCompareTopic;