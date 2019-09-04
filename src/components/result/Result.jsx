import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Result.scss';

export default class Result extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    planetName: PropTypes.string.isRequired,
  }

  render() {
    return (
        <div className="result">
          <h1>Finding Falcone!</h1>
          <p>Success! Congratulations for finding Falcone. King Shah is mighty pleased.</p>
          <p>Time Taken: {this.props.count}</p>
          <p>Planet Found: {this.props.planetName}</p>
          <button onClick={() => window.location.reload()}>Start Again</button>
        </div>
    );
  }
}
