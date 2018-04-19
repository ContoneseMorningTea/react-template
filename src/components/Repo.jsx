import React, { Component }  from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import Repos from 'store/repo';

@observer
class Repo extends Component {
  @computed get repos() {
    return Repos.repos;
  }

  constructor(props) {
    super(props);
    Repos.myRepos();
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
        <li key={repo.id} className="level">
          <div className="level-left">
            <div className="control level-item">
              <div className="tags has-addons">
                <span className="tag is-dark">start</span>
                <span className="tag is-info">{repo.stars}</span>
              </div>
            </div>
            <span onClick={() => this.onClick(repo.id)} className="level-item"
              style={{cursor: 'pointer', marginRight: '5px'}}>{repo.name}</span>
            <a href={repo.url} className="level-item">{repo.url}</a>
          </div>
        </li>
        )}
      </ul>
    );
  }
};

export default Repo;
