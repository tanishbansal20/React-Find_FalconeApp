import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Vehicals from '.././vehicals/Vehicals.jsx';

export default class Planets extends Component {
  static propTypes = {
    vehicalClass: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedVehical: PropTypes.string.isRequired,
  }

  render() {
    const {destination, vehicalClass, options} = this.props;
    const {planetSelect, vehicalSelect} = this.props.allProps;
    return (
      <div>
        <h4>{destination}</h4>
        <Select
          name={"select"+vehicalClass}
          options={options}
          onChange={ (event) => planetSelect(event, destination)}
        />
        <Vehicals vehicalSelectFun={vehicalSelect} allProps={this.props} />
      </div>
    )
  }
}
