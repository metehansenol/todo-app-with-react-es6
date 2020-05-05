import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      title: ''
    };

    this.todoApiUrl = 'http://localhost:5000';

    this.createNewItem = this.createNewItem.bind(this);
  }

  componentDidMount() {
    fetch(`${this.todoApiUrl}/items`)
      .then(response => response.json())
      .then(items => this.setState({items}));
  }

  createNewItem() {
    fetch(`${this.todoApiUrl}/items`, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json; charset=utf-8'}),
      body: JSON.stringify({title: this.state.title})
    }).then(response => {
      if (!response.ok) {
        alert('An error occurred while creating new item');
      } else {
        return response.json();
      }
    }).then(createdItem => {
      this.setState(prevState => ({
        items: [...prevState.items, {id: createdItem.id, title: createdItem.title}],
        title: ''
      }));
    });
  }

  render() {
    return (
        <div className="app-container">
          <h1>Todo List</h1>

          <ul>
            {
              this.state.items.map(item => <li key={item.id}>{item.title}</li>)
            }
          </ul>

          <div>
            Title: <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
            <button onClick={this.createNewItem}>Add New</button>
          </div>
        </div>
    );
  }
}

export default App;
