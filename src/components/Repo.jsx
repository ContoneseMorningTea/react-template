import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import mRepo from 'model/repo';

@observer
class Repo extends Component {
  @observable repos = [];

  constructor(props) {
    super(props);
    mRepo.find([]).then(repos => {
      this.repos = repos;
    });
  }

  onClick(id) {
    const location = {
      pathname: `/repo/${id}`,
    }
    this.props.history.push(location)
  }

  render() {
    return (
      <ul>
        {this.repos.map(repo => 
        <li key={repo.id} onClick={() => this.onClick(repo.id)}>{repo.name}</li>
        )}
      </ul>
    );
  }
};

export default Repo;
