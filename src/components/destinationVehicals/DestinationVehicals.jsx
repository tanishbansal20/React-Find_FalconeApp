import React, {Component} from 'react';
import Select from 'react-select';
import ReactRadioButtonGroup from 'react-radio-button-group';
import PropTypes from 'prop-types';
import './DestinationVehicals.scss';

export default class DestinationVehicals extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    destination: PropTypes.string.isRequired,
    planets: PropTypes.array.isRequired,
    vehicalClass: PropTypes.string.isRequired,
    vehicals: PropTypes.array.isRequired,
    planetSelect: PropTypes.func.isRequired,
    selectedVehical: PropTypes.string.isRequired,
    vehicalSelect: PropTypes.func.isRequired,
  }

  render() {
    const {destination, planets, vehicalClass, vehicals, selectedVehical} = this.props;
    return (
      <div>
        <h4>{destination}</h4>
        <Select
          options={planets}
          onChange={ (event) => this.props.planetSelect(event, destination)}
        />
        <div className={vehicalClass}>
          <ReactRadioButtonGroup
            name={vehicalClass}
            options={vehicals}
            value={selectedVehical}
            onChange={ (event) => this.props.vehicalSelect(event, destination)}
            fireOnMount={false}
          />
        </div>
      </div>
    );
  }
}
