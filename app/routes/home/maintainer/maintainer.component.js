import React, { PropTypes, PureComponent } from 'react';


export class Maintainer extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    return (
      <li className="maintainer">
        {this.props.data.get('title')}
      </li>
    );
  }
}
