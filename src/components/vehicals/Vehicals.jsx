import React, {Component} from 'react';
import ReactRadioButtonGroup from 'react-radio-button-group';

export default class Vehicals extends Component {

  render() {
    const {destination, vehicalClass, vehicals, selectedVehical} = this.props.allProps;
    return (
      <div className={vehicalClass}>
        <ReactRadioButtonGroup
          name={vehicalClass}
          options={vehicals}
          value={selectedVehical}
          onChange={ (event) => this.props.vehicalSelectFun(event, destination)}
        />
      </div>
    )
  }
}
