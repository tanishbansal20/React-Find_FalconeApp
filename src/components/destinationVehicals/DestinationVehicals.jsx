import React, {Component} from 'react';
import Select from 'react-select';
import ReactRadioGroup from 'react-simple-radio-button';
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
  }

  render() {
    const {destination, planets, vehicalClass, vehicals} = this.props;
    return (
      <div>
        <h4>{destination}</h4>
        <Select options={planets} />
        <div>
          <ReactRadioGroup
            className={vehicalClass}
            defaultSelected = ''
            onChange={this.on}
            options={vehicals}
          />
        </div>
      </div>
    );
  }
}
