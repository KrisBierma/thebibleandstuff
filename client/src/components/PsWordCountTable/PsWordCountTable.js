// gets array of words from sibling component PsChap.js (via parent individualPsalm's state) to put into table
import React, { Component } from 'react';

class PsWordCountTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      freq: this.props.freq,
      freq2: this.props.freq2
    }
    this.flag = this.flag.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
  }  

  // this triggers function in parent IndividualPsalm to group/ungroup, rerender based on freq/freq2
  flag() {
    this.props.onClick();
  }

  // if flag, render word count w/o grouping; if !flag, render word table with grouping
  renderTableBody() {
    if (this.props.flag) {
      return(
        <tbody>
          {this.props.freq2.map((row, i) => (
            <tr key={`${row.wordle}.${i}`}>
              <td className='table--word__data'>{row.wordle}</td>
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
              <td className='table--word__data'>{row.wordle}</td>
              <td>{row.value}</td>
            </tr>
            ))
          }   
        </tbody>      
      )
    }
  }

  render() {
    // console.log(this.props)
    return(
      <div className='content  content--border content--centered content__table'>
        <table className='table--word'>
          <thead>
            <tr>
              <th><u>Word</u></th>
              <th><u>Count</u></th>
            </tr>
          </thead>
          {this.renderTableBody()}              
        </table>  
        <button className='btn' onClick={this.flag}>{this.props.buttonWords}</button>
      </div>
    )
  }
}

export default PsWordCountTable;
 