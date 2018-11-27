import React from 'react';
import './delete.svg';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <table cellSpacing="0" cellPadding="0">
        <th className="col1" />
        <th className="col2" />
        {this.props.items.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td className="delte" onClick={() => this.handleClick(item.id)}>
              <i class="material-icons">delete</i>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

export default TodoList;
