// gets array of words from sibling component PsChap.js (via parent individualPsalm's state) to put into table
import React, { Component } from 'react';

class PsWordCountTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      freq: this.props.freq,
      freq2: this.props.freq2,
      flag: false,
      buttonWords: 'Group like words'
    }
    this.flag = this.flag.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
  }  // console.log(this.props)

  // the 'group like words' button toggles the flag state and button words
  flag() {
    this.setState({
      flag:!this.state.flag,
      buttonWords: 'Ungroup like words'
    });
  }

  // if flag, render word count w/o grouping; if !flag, render word table with grouping
  renderTableBody() {
    // console.log(this.state.flag)
    // console.log(this.props.freq)
    if (this.state.flag) {
      return(
        <tbody>
          {this.props.freq2.map((row, i) => (
            <tr key={`${row.wordle}.${i}`}>
              <td>{row.wordle}</td>
              <td>{row.value}</td>
            </tr>
            ))
          }   
        </tbody>      
      )
    }
    else {
      return(
        <tbody>
          {this.props.freq.map((row, i) => (
            <tr key={`${row.wordle}.${i}`}>
              <td>{row.wordle}</td>
              <td>{row.value}</td>
            </tr>
            ))
          }   
        </tbody>      
      )
    }
  }

  render() {
    return(
      <div className='content content--centered content__table'>
        <table className='table--word'>
          <thead>
            <tr>
              <th><u>Word</u></th>
              <th><u>Count</u></th>
            </tr>
          </thead>
          {this.renderTableBody()}              
        </table>  
        <button className='btn' onClick={this.flag}>{this.state.buttonWords}</button>
      </div>
    )
  }
}

export default PsWordCountTable;
 