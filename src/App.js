import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      title: '',
      selectedItemId: null
    };

    this.todoApiUrl = 'http://localhost:5000';

    this.createNewItem = this.createNewItem.bind(this);
    this.updateSelectedItem = this.updateSelectedItem.bind(this);
    this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
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

  updateSelectedItem() {
    fetch(`${this.todoApiUrl}/items/${this.state.selectedItemId}`, {
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/json; charset=utf-8'}),
      body: JSON.stringify({title: this.state.title})
    }).then(response => {
      if (!response.ok) {
        alert('An error occurred while updating item');
      } else {
        const {items, title, selectedItemId} = this.state;
        const index = items.findIndex((item) => item.id === selectedItemId);
        items.splice(index, 1, {id: selectedItemId, title: title});
        this.setState({items: items});
      }
    });
  }

  deleteSelectedItem() {
    fetch(`${this.todoApiUrl}/items/${this.state.selectedItemId}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
        alert('An error occurred while updating item');
      } else {
        const {items, selectedItemId} = this.state;
        const index = items.findIndex((item) => item.id === selectedItemId);
        items.splice(index, 1);
        this.setState({
          items: items,
          title: '',
          selectedItemId: null
        });
      }
    });
  }

  render() {
    return (
        <div className="app-container">
          <h1>Todo List</h1>

          <ul>
            {
              this.state.items.map(item => <li key={item.id}>
                <a href='#'
                   onClick={() => this.setState({selectedItemId: item.id, title: item.title})}
                   className={this.state.selectedItemId === item.id ? 'selected' : ''}>
                  {item.title}
                </a>
              </li>)
            }
          </ul>

          <div>
            Title: <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
            <button onClick={this.createNewItem}>Add New</button>
            <button onClick={this.updateSelectedItem}>Update</button>
            <button onClick={this.deleteSelectedItem}>Delete</button>
          </div>
        </div>
    );
  }
}

export default App;
