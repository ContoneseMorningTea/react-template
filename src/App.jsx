// import 'public/stylus/reset.styl';
// import './App.styl'
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Tea from 'model/tea';
// import RouterMap from './router'

@observer
class App extends Component {
  @observable tea;

  constructor(props) {
    super(props);
    this.tea = new Tea();
  }

  click() {
    this.tea.id = 2;
    this.tea.name = '虾饺';
  }

  submit() {
    this.tea.save()
    .then(r => {
      if (r) {
        alert(`保住了我的早茶:${r.name}`);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          看起来这里的早茶应该是{this.tea.name}ID为{this.tea.id}
        </p>
        <button onClick={() => this.click()}>
          一键切换虾饺
        </button>
        <button onClick={() => this.submit()}>
          保存哥的虾饺！
        </button>
      </div>
    );
  }
};

export default App;
