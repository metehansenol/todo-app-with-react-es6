import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.todoApiUrl = 'http://localhost:5000';
  }

  componentDidMount() {
    fetch(`${this.todoApiUrl}/items`)
      .then(response => response.json())
      .then(items => this.setState({items}))
  }

  render() {
    return (
        <div className="app-container">
          <h1>Todo List</h1>

          <ul>
            {
              this.state.items.map(item => <li>{item.title}</li>)
            }
          </ul>
        </div>
    );
  }
}

export default App;
