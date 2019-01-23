import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import PsalmsLanding from './pages/PsalmsLanding';
import IndividualPsalm from './pages/IndividualPsalm';
import PsalmsComparison from './pages/PsalmsComparison';
import PsalmsCompareAll from './pages/PsalmsCompareAll';
import PsalmsCompareAuthor from './pages/PsalmsCompareAuthor';
import PsalmsCompareTopic from './pages/PsalmsCompareTopics';
import psalmsFAQ from './pages/PsalmsFAQ';
import LandingPage from './pages/BibleStuffLanding';
import About from './pages/About';
import RandomThoughts from './pages/RandomThoughts';
import Studies from './pages/Studies';

class App extends Component {
  render() {   
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/studies' component={Studies} />
          <Route exact path='/randomThoughts' component={RandomThoughts} />
          <Route exact path='/about' component={About} />
          <Route exact path='/psalms' component={PsalmsLanding} />
          <Route exact path='/psalmsCompare/:psalmId' component={PsalmsComparison} />
          <Route exact path='/psalmsCompareAll' component={PsalmsCompareAll} />
          <Route exact path='/psalmsCompareAuthors' component={PsalmsCompareAuthor} />
          <Route exact path='/psalmsCompareTopics' component={PsalmsCompareTopic} />
          <Route exact path='/psalm/:chapterNum' component={IndividualPsalm} /> 
          <Route exact path='/psalmsFAQ' component={psalmsFAQ} />
          <Route path='*' component={PsalmsLanding} />
        </Switch>      
      </BrowserRouter>
    )
  }
}

export default App;
