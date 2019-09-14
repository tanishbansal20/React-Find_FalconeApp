import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DestinationVehicals.scss';
import Planets from '.././planets/Planets.jsx';
import {dvHelpers} from '../.././helper.js';

export default class DestinationVehicals extends Component {

  static propTypes = {
    planetSelect: PropTypes.func.isRequired,
    vehicalSelect: PropTypes.func.isRequired,
  }
  render() {
    const {self} = this.props;
    const {selectedVehical1, selectedPlanet1,selectedVehical2, selectedPlanet2,selectedVehical3, selectedPlanet3,selectedVehical4, selectedPlanet4 } = this.props.self.state;
    debugger
    return (
      <div>
        <Planets
          destination='Destination1'
          vehicalClass='vehicalRadioButton1'
          selectedVehical={selectedVehical1}
          options={dvHelpers.planetObject(selectedPlanet1, self)}
          vehicals={selectedPlanet1 ? dvHelpers.getFilteredVehicals('Destination1', self) : []}
          allProps={this.props}
        />
        <Planets
          destination='Destination2'
          vehicalClass='vehicalRadioButton2'
          selectedVehical={selectedVehical2}
          options={dvHelpers.planetObject(selectedPlanet2, self)}
          vehicals={selectedPlanet2 ? dvHelpers.getFilteredVehicals('Destination2', self) : []}
          allProps={this.props}
        />
        <Planets
          destination='Destination3'
          vehicalClass='vehicalRadioButton3'
          selectedVehical={selectedVehical3}
          options={dvHelpers.planetObject(selectedPlanet3, self)}
          vehicals={selectedPlanet3 ? dvHelpers.getFilteredVehicals('Destination3', self) : []}
          allProps={this.props}
        />
        <Planets
          destination='Destination4'
          vehicalClass='vehicalRadioButton4'
          selectedVehical={selectedVehical4}
          options={dvHelpers.planetObject(selectedPlanet4, self)}
          vehicals={selectedPlanet4 ? dvHelpers.getFilteredVehicals('Destination4', self) : []}
          allProps={this.props}
        />
        <div className="count"><h2>Time Taken: {dvHelpers.getCount(self.state)} </h2></div>
      </div>
    );
  }
}
