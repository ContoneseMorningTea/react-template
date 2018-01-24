import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import User from 'model/user';
import Repo from '@/Repo';

@observer
class App extends Component {
  user = null;

  constructor(props) {
    super(props);
    new User('huangstomach').then(user => {
      this.user = user;
      console.log(this.user)
    });

  }

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
          </div>
          <Route path="/repo" component={Repo} />
        </div>
      </section>
    );
  }
};

export default App;
