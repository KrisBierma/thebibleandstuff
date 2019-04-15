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
      versesFound: [],
      resultsClassName: '',
      invalidMsg: ''
    }
    this.renderTable=this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getData = this.getData.bind(this);
    this.openNewTab = this.openNewTab.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
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

  // when the user clicks on a chapter from the topics table
  openNewTab(url) {
    console.log(url)
    window.open(url, '_blank')
  }

  // changeResultsClassname() {
  //   this.setState({resultsClassName: 'results--columns'});
  // }

  // api call to ESV to get verses with user's word
  submitForm(e) {
    e.preventDefault();
    const word = this.state.wordToFind;
    // reset everything
    this.setState({
      wordToFind: '', 
      invalidMsg: '', 
      versesFound: []
    });

    // don't allow blank submission
    if (word === '') {
      this.setState({invalidMsg: 'Please enter a word.'});
      return false;
    };
    // validate user-entered word; take out anything with 1 or 2 letters and words on the list below
    const wordsToAvoid = ['god', 'lord'];
    // console.log('here')
    let versesFound = [];
    // console.log(versesFound)
    if (word.length < 3) {
      versesFound.push('This word is too short.');
      this.setState({versesFound:versesFound})
    }
    else if (wordsToAvoid.includes(word.toLowerCase())) {
      // console.log(versesFound, word, word.toLowerCase())
      versesFound.push('This word is used so frequently our search engine got dizzy. Please try another word.');
      this.setState({versesFound:versesFound})
    }
    else this.sendQuery(word);

console.log('here')
    // let page = 1;
    // const queryURL = 'https://api.esv.org/v3/passage/search/';
    // const booksAfterPsalms = ['Proverbs', 'Ecclesiastes', 'Song', 'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi', 'Matthew','Mark','Luke','John','Acts','Romans','Corinthians','Thessalonians','Galatians','Ephesians','Philippians','Colossians','Titus','Philemon','Hebrews','James','Timothy', 'Peter', 'John', 'Jude','Revelation'];
    // let flag = false; // not done checking the results
    // this.setState({resultsClassName: '', results: ''}); // reset results to one column

    // set func as const and call afterward to bind this
//     const sendQuery = (page) => {
//       // console.log("page "+page)
//       const config = {
//         headers: {
//           'Authorization': process.env.REACT_APP_ESV_API_KEY
//         },
//         params : {
//           'q': word,
//           'page-size': 100,
//           'page': page
//         }
//       };   
//       const timeout = 5000;
//       axios.get(queryURL, config, timeout)
//       .then((res) => {
//         // console.log(res.data.results);
//         // all results from Bible on specified page
//         const results = res.data.results;
//         // console.log("results length: "+results.length)

//         // if no results, stop function altogether
//         if (results.length === 0) {
//           return
//         };

//         let versesFound = [];
//         results.forEach(p => {
//           const str = p.reference;
//           let book = str.split(' ');
//           // if the book is a number book, book = the second word, ie. Peter, Timothy
//           if (book[0] === '1' || book[0] === '2' || book[0] === '3') {
//             book = book[1];
//           }
//           else {
//             book = book[0]; // else it's the first word, ie Genesis, Exodus, Song
//           }
//           // if the results include books after Psalms, stop function
//           if (booksAfterPsalms.includes(book)) {
//             flag = true; // done checking results
//             return;
//           }
//           // if results have psalms, push reference into versesFound
//           else if (str.startsWith('Psalm')){
//             versesFound.push(p.reference)
//           }

//         })
// console.log(versesFound.length, page, flag)
//         // if less than 100 results and none in Psalms (or the results start in any book after the psalms) then return 'wasn't found' msg
//         if (versesFound.length === 0 && results.length < 100 && flag) {
//           versesFound.push('This word wasn\'t found in the Psalms.');
//           this.setState({versesFound:versesFound})
//         }
//         // if 100 results but not in psalms, send query again until psalms found
//         else if (versesFound.length === 0 && page < 6 && !flag) {
//           page++;
//           sendQuery(page)
//           versesFound.push('Searching...');
//           this.setState({versesFound:versesFound})
//         }
//         else if (versesFound.length > 0) {
//           // set columns to display results
//           this.setState({
//             resultsClassName: 'results--columns',
//             versesFound:versesFound
//           });
//         }
//         // if no verses were found and the flag signals finding a book after psalms, the word wasn't found
//         else if (versesFound.length === 0 && flag) {
//           versesFound.push('This word wasn\'t found in the Psalms.');
//           this.setState({versesFound:versesFound})          
//         }
//       })
//       .catch(error => {
//         console.log(error)
//       })
//     }
    // // validate user-entered word; take out anything with 1 or 2 letters and words on the list below
    // const wordsToAvoid = ['god', 'lord'];
    // console.log('here')
    // let versesFound;
    // if (word.length < 3) {
    //   versesFound.push('This word is too short.');
    //   this.setState({versesFound:versesFound})
    // }
    // else if (wordsToAvoid.includes(word.toLowerCase())) {
    //   versesFound.push('This word is used so frequently our search engine got dizzy. Please try another word.');
    //   this.setState({versesFound:versesFound})
    // }
    // else sendQuery(page);
  }

  sendQuery(word) {
    console.log(word)
    let page = 1;
    const queryURL = 'https://api.esv.org/v3/passage/search/';
    const booksAfterPsalms = ['Proverbs', 'Ecclesiastes', 'Song', 'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi', 'Matthew','Mark','Luke','John','Acts','Romans','Corinthians','Thessalonians','Galatians','Ephesians','Philippians','Colossians','Titus','Philemon','Hebrews','James','Timothy', 'Peter', 'John', 'Jude','Revelation'];
    let flag = false; // not done checking the results
    this.setState({resultsClassName: '', results: ''}); // reset results to one column
    // console.log("page "+page)
    const sendQueryToo = (page) => {
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
        // console.log(res.data.results);
        // all results from Bible on specified page
        const results = res.data.results;
        console.log("results length: "+results.length)
  console.log(results)
        // if no results, stop function altogether
        if (results.length === 0) {
          return
        };

        let versesFound = [];
        results.forEach(p => {
          const str = p.reference;
          let book = str.split(' ');
          // if the book is a number book, book = the second word, ie. Peter, Timothy
          if (book[0] === '1' || book[0] === '2' || book[0] === '3') {
            book = book[1];
          }
          else {
            book = book[0]; // else it's the first word, ie Genesis, Exodus, Song
          }
          // if the results include books after Psalms, stop function
          if (booksAfterPsalms.includes(book)) {
            flag = true; // done checking results
            return;
          }
          // if results have psalms, push reference into versesFound
          else if (str.startsWith('Psalm')){
            versesFound.push(p.reference)
          }

        })
  console.log(versesFound.length, page, flag)
        // if less than 100 results and none in Psalms (or the results start in any book after the psalms) then return 'wasn't found' msg
        if (versesFound.length === 0 && results.length < 100 && flag) {
          versesFound.push('This word wasn\'t found in the Psalms.');
          this.setState({versesFound:versesFound})
        }
        // if 100 results but not in psalms, send query again until psalms found
        else if (versesFound.length === 0 && page < 6 && !flag) {
          page++;
          sendQueryToo(page); // recursively call this const func
          versesFound.push('Searching...');
          this.setState({versesFound:versesFound})
        }
        else if (versesFound.length > 0) {
          // set columns to display results
          this.setState({
            resultsClassName: 'results--columns',
            versesFound:versesFound
          });
        }
        // if no verses were found and the flag signals finding a book after psalms, the word wasn't found
        else if (versesFound.length === 0 && flag) {
          versesFound.push('This word wasn\'t found in the Psalms.');
          this.setState({versesFound:versesFound})          
        }
      })
      .catch(error => {
        console.log(error)
      })
    } // end sendQuery2
  sendQueryToo(page); // call the const function above
  }

  getData() {
    const db = firebase.database();
    const topicsArr = ['praise', 'thanksgiving', 'triumphVictory', 'remembrance', 'mercy', 'confessionRepentance', 'godlinessRighteousness', 'instructionProverbs', 'lawCommands', 'ungodliness', 'enemies', 'lament', 'cryForHelp', 'protectionDeliverance', 'comfort', 'provision', 'restoration', 'healing', 'dependence', 'nature', 'aBlessing', 'natureOfGod', 'songOfAscents'];
    const topicsObj = [{'topic': 'praise', 'chapter':[]}, {'topic': 'thanksgiving', 'chapter': []}, {'topic': 'triumphVictory', 'chapter': []}, {'topic': 'remembrance', 'chapter': []}, {'topic': 'mercy', 'chapter': []}, {'topic': 'confessionRepentance', 'chapter': []}, {'topic': 'godlinessRighteousness', 'chapter': []}, {'topic': 'instructionProverbs', 'chapter': []}, {'topic': 'lawCommands', 'chapter': []}, {'topic': 'ungodliness', 'chapter': []}, {'topic': 'enemies', 'chapter': []}, {'topic': 'lament', 'chapter': []}, {'topic': 'cryForHelp', 'chapter': []}, {'topic': 'protectionDeliverance', 'chapter': []}, {'topic': 'comfort', 'chapter': []}, {'topic': 'provision', 'chapter': []}, {'topic': 'restoration', 'chapter': []}, {'topic': 'healing', 'chapter': []}, {'topic': 'dependence', 'chapter': []}, {'topic': 'nature', 'chapter': []}, {'topic': 'aBlessing', 'chapter': []}, {'topic': 'natureOfGod', 'chapter': []}, {'topic': 'songOfAscents', 'chapter': []}];
    const that = this;
    
    db.ref('psalms').once('value', function(snapshot) {
      // console.log(snapshot.val())
      const data = snapshot.val();
      // loop through each psalm from db
      const newData = Object.values(data);
      for (let h=0; h<newData.length; h++) {
        for (const prop in newData[h]) {
          // lop off 'topic-' from the prop
          const newProp = prop.slice(6);
          // check if the prop is a topic/ in the topics array
          if (topicsArr.includes(newProp)) {
            // if so, push check if it's the first entry
            for (let i = 0; i<topicsObj.length; i++) {
              // find where in the topicsObj the newProp is
              if (topicsObj[i].topic === newProp) {
                topicsObj[i].chapter.push(newData[h].chapterNum)
                break;
              }
            }
          }
        }
      }
    })
    .then(function() {
      changeName();
      that.setState({newTopicsObj: topicsObj})
    });

    function changeName() {
      for (let i=0; i<topicsObj.length; i++) {
        let topic = topicsObj[i].topic;
        let name;
        switch (topic) {
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
            name='Song of Ascents****';
            break;
          default:
            console.log('none found');
            break;
        }
        topicsObj[i].topic=name;
      }
    } //end func changeName
  }

  // make chart wth 2 headings: topics, psalms
  renderTable() {
    this.setState({
      columns:[
        {Header: 'Topic', accessor: 'topic', id: 'topic', minWidth: 125, style: {whiteSpace: 'normal'}},
        {
          Header: 'Chapters', 
          accessor: 'chapter',
          Cell: props => {
            let chapterLinks=[];
            props.value.map(d => {
              chapterLinks.push(<a href={`/psalm/${d}`} key={props.original.topic+d} onClick={(e) => {this.openNewTab(`/psalm/${d}`)}}>{d}</a>);
              chapterLinks.push(', ');
            })
            return(chapterLinks)
          },
          id: 'chapter', 
          minWidth: 300,
          style: {
            whiteSpace: 'normal'
          }
        },
      ]
    });
  }

  render() {
    return(
      <PsalmsCompareWrapper
        heading='Compare Topics'
        compare1Link='/psalmsCompareAll'
        compare1Title='Compare All Psalms'
        compare2Link='/psalmsCompareAuthors'
        compare2Title='Compare Authors'
      >
      <ReactTable
        data={this.state.newTopicsObj}
        columns={this.state.columns}
        showPagination={false}
        className='-highlight table--centered'
        defaultPageSize={23}
        // getNoDataProps={(state, row)=>
        //   {
        //     console.log(state);
        //     console.log(row);
        //   }}
        // getTrProps={(state,rowInfo, column, instance) => (
        //   console.log('here')
        // )}
        // getTrProps={(state, rowInfo, column, instance) => ({
        //   onClick: e => {
        //     e.preventDefault();
        //     // console.log(rowInfo)
        // }})}
      />

      <div className='footnote'>
        <p>* They all have an element of praise somewhere in them, but some Psalms are focused on praising God and some are a cry to God.</p>
        <p>** Similar words: law, statute, precept, decree, command, word, way</p>
        <p>** <a href='https://biblehub.com/parallel/psalms/119-1.htm' target='_balnk' rel='noopener noreferer'>This</a> is a good resource for finding the original Hebrew meaning of these words and its meaning.</p>
        <p>*** These psalms mention healing, but it isn't a topic.</p>
        <p>**** Song of ascents: <a href='https://en.wikipedia.org/wiki/Song_of_Ascents' target='_balnk' rel='noopener noreferer'>Information</a> and <a href='http://www.shoshanim.de/pages/maalot-en.html' target='_balnk' rel='noopener noreferer'>music</a>.</p>   
        {/* <p>Random facts:</p>
        <p>how many start with 'praise the Lord'?</p> */}
      </div>

      <div className='form__wordSearch'>
        <form onSubmit={this.submitForm}>
          <input type='text' name='wordToFind' value={this.state.wordToFind} onChange={this.handleChange} placeholder='Search for a specific word.'></input>
          <input type='submit' value='Submit' className='form__wordSearch__button'></input>
        </form>
        <p id='invalidMsg'>{this.state.invalidMsg}</p>
        <div id='results' className={this.state.resultsClassName}>
          {this.state.versesFound.map((v) => {
            return(
              <p key={v}>{v}</p>
            )
          })}        
        </div>
      </div>
      </PsalmsCompareWrapper>
    )
  }
}

export default PsalmsCompareTopic;