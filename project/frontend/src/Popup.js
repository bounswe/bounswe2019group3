import React from 'react';
import './SignUp.css';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;