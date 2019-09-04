import React, {Component} from 'react';
import Select from 'react-select';
import ReactRadioButtonGroup from 'react-radio-button-group';
import PropTypes from 'prop-types';
import './DestinationVehicals.scss';

export default class DestinationVehicals extends Component {

  static propTypes = {
    destination: PropTypes.string.isRequired,
    planets: PropTypes.array.isRequired,
    vehicalClass: PropTypes.string.isRequired,
    vehicals: PropTypes.array.isRequired,
    planetSelect: PropTypes.func.isRequired,
    selectedVehical: PropTypes.string.isRequired,
    vehicalSelect: PropTypes.func.isRequired,
    selectDisable: PropTypes.bool.isRequired,
  }

  render() {
    const {destination, planets, vehicalClass, vehicals, selectedVehical, selectDisable} = this.props;
    return (
      <div>
        <h4>{destination}</h4>
        <Select
          name={"select"+vehicalClass}
          options={planets}
          onChange={ (event) => this.props.planetSelect(event, destination)}
          isDisabled={selectDisable}
        />
        <div className={vehicalClass}>
          <ReactRadioButtonGroup
            name={vehicalClass}
            options={vehicals}
            value={selectedVehical}
            onChange={ (event) => this.props.vehicalSelect(event, destination)}
          />
        </div>
      </div>
    );
  }
}
