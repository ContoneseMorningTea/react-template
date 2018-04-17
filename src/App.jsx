import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import User from '@/User';
import Repo from '@/Repo';
import Links from '@/Links';

@observer
class App extends Component {
  render() {
    return (
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Gini React Templdate
            </h1>
            <h2 className="subtitle">
              基理react模板
            </h2>
            <Links/>
            <Route exact path="/" component={User}/>
            <Route path="/user" component={User}/>
            <Route path="/repos" component={Repo}/>
          </div>
        </div>
      </section>
    );
  }
};

export default App;
