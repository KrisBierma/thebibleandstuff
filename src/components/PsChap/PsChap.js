import React, { Component } from 'react';
// import { Col, Row } from 'reactstrap';
import axios from 'axios';

class PsChap extends Component {
  constructor(props){
    super(props);
    this.state = {
      chapterNum: this.props.chapterNum,
      passage: `Psalm ${this.props.chapterNum}`,
      wholeChapeter: '',
      freq: [],
      // newFreq2: [],
      count: '',
      groupedFreq: [],
      data2: []
    }
    this.getPsalm = this.getPsalm.bind(this);
    this.getWords = this.getWords.bind(this);
    this.countFreqOfWords = this.countFreqOfWords.bind(this);
    this.sortWords = this.sortWords.bind(this);
    this.groupWords = this.groupWords.bind(this);
    this.recurringLines = this.recurringLines.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.match.params);
    // console.log(this.props.chapterNum)
    this.getPsalm();
  }

  componentDidUpdate() {
    // to refresh the component when clicking next psalm
    if (this.state.chapterNum !== this.props.chapterNum) {
      this.setState({
        chapterNum: this.props.chapterNum,
        passage: `Psalm ${this.props.chapterNum}`
      }, () => {
        this.getPsalm();
      });
    }
  }

  // api to api.esv.org to get the current psalm
  getPsalm() {
    // let apiKey = process.env.REACT_APP_ESV_API_KEY;
    // console.log(process.env.REACT_APP_ESV_API_KEY)
    // let passage = `Psalm ${this.state.chapterNum}`;
    // console.log(this.state.passage)
    const passage = this.state.passage;
    const queryURL = 'https://api.esv.org/v3/passage/text/';
    const config = {
      headers: {
        'Authorization': process.env.REACT_APP_ESV_API_KEY
      },
      params : {
        'q': passage,
        'include-headings': false,
        'include-footnotes': false,
        'include-verse-numbers': false,
        'include-short-copyright': false,
        'include-passage-references': false,
        'indent-poetry': false,
        'indent-paragraphs': 0
      }
    };

    // build in resiliency: setTimeout, fallback, error msgs
    const timeout = 5000;
    // console.log('-----------------------------------')
    axios.get(queryURL, config, timeout)
    .then((res) =>{
      // console.log(res.data);
      // console.log(res.data.passages[0]);
      this.setState({wholeChapeter: res.data.passages[0]});
      this.getWords(this.state.wholeChapeter);
      this.recurringLines();
    })
    .catch(error => {
      console.log(error);
      this.setState({wholeChapeter: "There was an error getting this chapter from ESV. Please try again later!"})
    });

    // just gets first verse
    const passage2 = `Psalm ${this.state.chapterNum}:1`;
    const config2 = {
      headers: {
        'Authorization': process.env.REACT_APP_ESV_API_KEY
      },
      params : {
        'q': passage2,
        'include-headings': false,
        'include-footnotes': false,
        'include-verse-numbers': false,
        'include-short-copyright': false,
        'include-passage-references': false,
        'indent-poetry': false,
        'indent-paragraphs': 0
      }
    };
    axios.get(queryURL, config2).then((res) =>{
      // console.log(res.data);
      console.log(res.data.passages[0]);
    });
  }

  // put api result into array, filter out unwanted words 
  // also counts words to find length of psalm
  getWords(string) {
    // replace . with spaces. Split string at spaces into individual words in an array. Start a new array of objects to hold words and their frequency.
    const words = string.replace(/[.,;:!?“”‘\b’\b]/g, '').split(/\s/);
    // console.log(words)

    // put all to lowerCase except select words
    const wordsNotLowercase = ['I', 'Lord', 'LORD', 'God', 'O', 'Israel', 'Selah', 'Jerusalem', 'Babylon', 'Zion'];
    for (let i=0; i<words.length; i++) {
      if (!wordsNotLowercase.includes(words[i])) {
        words[i] = words[i].toLowerCase();
      }
    }

    // filter out articles, conjunctions
    const dontCount = ['and', 'or', 'but', 'the', 'by', 'a', 'an', 'on', 'to', 'is', 'are', 'am', 'was', 'were', 'in', 'for', 'are', 'of', '', 'with', 'as', 'at', 'be', 'do', 'shall', 'let', 'has', 'have', 'had', 'from', 'beside', 'then', 'that', 'get', 'also', 'which'];

    // loop through each dontCount word
    dontCount.forEach(function(noWord){
      // loop through each word from the psalm array
      for (let i=0; i<words.length; i++){
        // set var to catch blank space with ascii code NaN
        let blankSpace = words[i].charCodeAt(0);

        // if the psalm array word is equal to the dontCount word, remove the psalm word from the array
        if (noWord === words[i] || isNaN(blankSpace)) {
          words.splice(i, 1)
        }
      }
    }
  )
    // console.log(words)
    this.setState({
      freq: words,
      count: string.split(' ').length
    });
    this.countFreqOfWords();
  }

  // count the frequency of words in the psalm
  countFreqOfWords() {
    const words = this.state.freq;
    const frequency=[];
    let amount = 1;
    let flag;

    // add first word to array
    if (frequency[0]===undefined){
      flag=false;
      var obj = {wordle:words[0], value:0};
      frequency.push(obj);
    }

    // once first word is added, cycle through all the other words
    if (frequency[0]!==undefined) {
      words.forEach(function(w){
        flag=false;
        let place, truePlace;
        // cycle through array of obj, compare word from array with word from psalm
        for (let i=0; i<amount; i++){
          place=i;
            // if find current word in the array, flag true
            if (frequency[i].wordle===w){
              flag=true;
              truePlace = i;
            } 
        }

        // if word is already there, ++ to value
        if (flag){
          frequency[truePlace].value+=1;  
        }
        // else push the new word obj to the array
        else {
          var obj = {wordle:w, value:0};
          frequency.push(obj);
          frequency[place+1].value+=1;  
              amount++;
        }
      })
    }
    this.setState({freq: frequency});
    this.sortWords();
  }

  // find recurring lines of 3+ words
  recurringLines() {
    // change psalm to array
    const arr = this.state.wholeChapeter.replace(/[.,;!?“”"‘/b’/b]/g, '').split(/\s/).filter(word => word !== '');
    // console.log(arr)
    let tempArr = [];
    let phrases = [];
    let indexOfPhrases = [];
    // loop through all once, comparing each word to all the others
    for (let i=0; i<arr.length; i++) {
      // loop all second time to find matches
      for (let j=0; j<arr.length; j++) {
        // check if three words in a row match and that the word isn't checking itself
        if (i!== j && arr[i] === arr[j] && arr[i+1] === arr[j+1] && arr[i+2] === arr[j+2]) {
          tempArr = [];
          let t2 = [];

          // a match of 3 words in a row gets pushed to tempArr
          tempArr.push(arr[i], arr[i+1], arr[i+2]);

          // check to see if 4 or more words match and push to tempArr if so
          let k = 3;
          while (arr[i+k] === arr[j+k]) {
            tempArr.push(arr[i+k]);
            k++;
          }          
          t2 = tempArr.join(' ');

          // check if the phrase is already included and if the index of either of them are already included
          function check() {
            if (phrases.indexOf(t2) === -1 && indexOfPhrases.includes(i) === false && indexOfPhrases.includes(j) === false) {
              return true;
            }
          }
          if (check()) {phrases.push(t2)}; 

          // if the index of the word wasn't already there, it gets pushed to indexOfPhrases to know which words were already included
          for (let l = 0; l < 3; l++) {
            if (indexOfPhrases.includes(i + l) === false) {
              indexOfPhrases.push(i + l);
            }
          }
          for (let l = 0; l < 3; l++) {
            if (indexOfPhrases.includes(j + l) === false) {
              indexOfPhrases.push(j + l);
            }
          }
          }
      }
    }
    console.log(phrases); 
    // call the func in the parent 'individualPsalm' component to pass the data to it so it can get displayed
    this.props.frequentPhrases(phrases);
  }

  // filters out words that only show up once in the psalm; sorts from greatest to least; displays in the table
  sortWords(){
    const freq = this.state.freq;
    const newFreq=[]; // new array to hold updated list

    // filter out any words that only show up once
    for (let i=0; i<freq.length;i++){
      if (freq[i].value > 1){
        newFreq.push(freq[i]);
      }
    }

    // sort words from greatest to least and alphabetically
    newFreq.sort(function(a,b){
      return b.value-a.value || ((a.wordle.toLowerCase() < b.wordle.toLowerCase())?-1: (a.wordle.toLowerCase() >b.wordle.toLowerCase())? 1 : 0)
    });
    // call this function in the parent (individualPsalm) which sends the freq array back to parent to use in pswordCount
    const data = [newFreq, this.state.count];
    this.props.getPsWordCount(data);

    // deep clone of array of obj from MDN
    const d = data[0];
    let clone = JSON.parse(JSON.stringify(d)); 

    this.setState({data2: clone});
    this.groupWords(freq);
  }

  // for use in parent IndividualPsalm when 'group words' is clicked (this data goes through parent IndividualPsalm to child PsWordCount)
  groupWords(freq) {
    // get all words (even if they're in there only once) so they get included in 'group words' count
    // deep clone it so it doesn't change the original array
    const data2 = JSON.parse(JSON.stringify(freq));
    const newFreq2 = [];
    // these are the words to consolidate (not really synonyms, but that's what we're calling them)
    const synonyms = [['God', 'LORD'], ['he', 'him', 'his', 'himself'], ['nor', 'not'], ['I', 'me', 'my', 'mine'], ['you', 'your'], ['their', 'they', 'them'], ['commands', 'command', 'commandment', 'commandments', 'precepts', 'statutes', 'law', 'decrees', 'decress', 'rules'], ['faith', 'faithful', 'faithfulness'], ['woman', 'women'], ['man', 'men'], ['who', 'whose'], ['child', 'children'], ['we', 'us', 'our'], ['mighty', 'mightier'], ['true', 'truth'], ['false', 'falsehood'], ['meditate', 'meditates', 'meditation']];

    // loop through the words frequency array (twice) for each pair of words
    synonyms.forEach(s => {
      // start with first word in the synonyms array
      let s1 = s[0];
      let firstSynIndex = '';
      // loop through data2 array to see if s1 is in there
      for (let i=0; i<data2.length; i++) {
        // if s1 is there
        if (data2[i].wordle === s1) {
          // holds index of first word in the synonym array
          firstSynIndex = data2.indexOf(data2[i]);
          // start arrays to hold the synonyms found and their locations
          let tempArr = [{'wordle': s[0], 'value': data2[i].value}];
          let locations = [data2.indexOf(data2[i])];

          // loop through whole array x times to find if all the words are there. x is the length of the specific synonyms array
          for (let j=1; j<s.length; j++) {
            s1 = s[j];

            for (let k=0; k<data2.length; k++){
              // if more synonyms are found, add to temp arrays
              if (data2[k].wordle === s1) {
                tempArr.push(data2[k]);
                locations.push(data2.indexOf(data2[k]));
              }
            }
          }
          // consolidate all the found synonyms and values into once index (the first one of the synonyms array) of the data2 array and remove the other locations/values
          let tempValue = tempArr.reduce(function(prev, cur) {
            return prev + cur.value;
          }, 0);
          let tempWords = tempArr[0].wordle;
          for (let i = 1; i<tempArr.length; i++) {
            tempWords += `, ${tempArr[i].wordle}`
          }      

          // set the new word and value
          data2[firstSynIndex].wordle = tempWords;
          data2[firstSynIndex].value = tempValue;

          locations.sort(function(a,b){return b-a;});
          
          // order locations array in descending order so the splicing happens from back to front
          for (let i=0; i<tempArr.length; i++){
            if (locations[i] !== firstSynIndex) {
              data2.splice(locations[i], 1);
            }
          }

          // stop the first loop once once the first synonym is found
          break;
        }
      }

    })

    // combine singular and plurals
    // first check to see if it's a singual word or grouped word already
    let skipped = [];
    data2.forEach(w => {
      if (w.wordle.includes(",")) {
        skipped.push(data2.indexOf(w));
      }      
    })


    // check all the ungrouped words for plurals (just adding -s, -es, -ness)
    sortingFunctions(1, 's');
    sortingFunctions(2, 'es');
    sortingFunctions(3, 'ing');
    sortingFunctions(4, 'ness');

    function sortingFunctions(difference, toFind) {
      for (let i=0; i<data2.length; i++) {
        // if data is grouped, skip it
        while (skipped.indexOf(i) !== -1) {
            i = i+1;
        }      

        for (let j=0; j<data2.length; j++) {
          // don't compare word to itself or word to grouped words
          if (j === i && j !== data2.length-1) {
              j = j+1;
          }     
          // only continue if the difference of lengths is 1, etc (var difference)
          let d1 = data2[i].wordle.length;
          let d2 = data2[j].wordle.length;
          // console.log(-difference)
          if (d1 - d2 === difference || d1 - d2 === -difference) {
            let w1 = data2[i].wordle;
            let w2 = data2[j].wordle;
            let l1 = w1.length;
            let l2 = w2.length;
            let greater, lesser;
// console.log(w1, w2)
            // find the greater and lesser number
            function findThem() {
              return l1 > l2 ? (greater = w1, lesser = w2) : (greater = w2, lesser = w1)
            };
            findThem();

            // compare data[i] to data[j]
            // check if the last letter(s) of the greater is s,ness,etc (var toFind)
            // let last = greater.length-1;
            const start = greater.length-difference;
            // console.log(start);
            // console.log(greater.slice(start, greater.length), toFind);
            if (greater.slice(start, greater.length) == toFind) {
            // if (greater[last] === toFind) {
              let greaterObj, lesserObj, greaterIndex, lesserIndex;
              function findThem2() {
                return l1 > l2 ? (greaterObj = data2[i], lesserObj = data2[j], greaterIndex = data2.indexOf(data2[i]), lesserIndex = data2.indexOf(data2[j])) : (greaterObj = data2[j], lesserObj = data2[i], greaterIndex = data2.indexOf(data2[j]), lesserIndex = data2.indexOf(data2[i]))
              };
              findThem2();
// console.log(i,j, w1, w2)

              // compare letter by letter
              let flagCount = 0;
              for (let k=0; k<lesser.length; k++) {
                if (lesser[k].toLowerCase() === greater[k].toLowerCase()) {
                  flagCount++;
                  // console.log(lesser, greater, lesser[k].toLowerCase(), greater[k].toLowerCase())
                }
              }
              let tempArr = [];
              let locations = [];
              // if all the letters match add to tempArr, change value
              if (flagCount === lesser.length) {
                // console.log('---------------------------------------')
                // console.log(lesser, greater)

                tempArr.push(lesserObj, greaterObj);
                locations.push(greaterIndex, lesserIndex);

                // consolidate all the found synonyms and values into once index (the first one of the synonyms array) of the data2 array and remove the other locations/values
                let tempValue = tempArr.reduce(function(prev, cur) {
                  return prev + cur.value;
                }, 0);
                let tempWords = tempArr[0].wordle + `(${toFind})`; 

                // set the new word and value
                data2[lesserIndex].wordle = tempWords;
                data2[lesserIndex].value = tempValue;
// console.log(tempArr, tempValue, tempWords)
                locations.sort(function(a,b){return b-a;});
// console.log(data2)                 
                // order locations array in descending order so the splicing happens from back to front
                for (let i=0; i<tempArr.length; i++){
                  if (locations[i] !== lesserIndex) {
                    data2.splice(locations[i], 1);
                  }
                }
              }
            }
          }  
        }
      }
    }

    // sort data by value then alphabet
    data2.sort(function(a,b){
      return b.value-a.value || ((a.wordle.toLowerCase() < b.wordle.toLowerCase())?-1: (a.wordle.toLowerCase()>b.wordle.toLowerCase())? 1 : 0)
    });

    // filter out any words that only show up once
    for (let i=0; i<data2.length;i++){
      if (data2[i].value > 1){
        newFreq2.push(data2[i]);
      }
    }
    // call the func in the parent 'individualPsalm' component to pass the data to it so it can then go to PsWordCount
    this.props.groupWordsParent(newFreq2);
  }

  render() {
    // console.log(this.props)
    // console.log(this.state.wholeChapeter)
    return(
      <p className={this.props.className}>{this.state.wholeChapeter}</p>
    )
  }
}

export default PsChap;
