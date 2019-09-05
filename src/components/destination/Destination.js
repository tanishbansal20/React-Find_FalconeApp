import React, { Component } from 'react';
import './Destination.scss';
import {dvHelpers} from '../.././helper.js';
import DestinationVehicals from '.././destinationVehicals/DestinationVehicals.jsx';

export default class Destination extends Component {
	constructor(props) {
		super(props);
		this.planetSelect = this.planetSelect.bind(this);
		this.vehicalSelect = this.vehicalSelect.bind(this);
		this.state = {
			planets: [],
			vehicals: [],
			selectedPlanet1: '',
			selectedPlanet2: '',
			selectedPlanet3: '',
			selectedPlanet4: '',
			selectedVehical1: '',
			selectedVehical2: '',
			selectedVehical3: '',
			selectedVehical4: '',
			destination1Vehicals: [],
			destination2Vehicals: [],
			destination3Vehicals: [],
			destination4Vehicals: [],
			vehicalsSpeed: {},
			planetDistance: {},
		}
	}

	componentDidMount() {
		dvHelpers.getDestinationAndVehicalsJson(this);
	}

	vehicalSelect (event, destination) {
		switch (destination) {
			case 'Destination1':
				dvHelpers.updateVehicalObject('selectedVehical1', 'destination1Vehicals', event, this);
				break;
			case 'Destination2':
				dvHelpers.updateVehicalObject('selectedVehical2', 'destination2Vehicals', event, this);
				break;
			case 'Destination3':
				dvHelpers.updateVehicalObject('selectedVehical3', 'destination3Vehicals', event, this);
				break;
			case 'Destination4':
				dvHelpers.updateVehicalObject('selectedVehical4', 'destination4Vehicals', event, this);
				break;
			default:
		}
	}

	planetSelect(event, destination) {
		let vehicals = dvHelpers.setOriginalVehical(this.state.vehicals);
		switch(destination) {
			case 'Destination1':
				this.setState ({
					selectedPlanet1: event.value,
					destination1Vehicals: vehicals,
					selectedVehical1: '',
				});
				break;
			case 'Destination2':
				this.setState ({
					selectedPlanet2: event.value,
					destination2Vehicals: vehicals,
					selectedVehical2: '',
				});
				break;
			case 'Destination3':
				this.setState ({
					selectedPlanet3: event.value,
					destination3Vehicals: vehicals,
					selectedVehical3: '',
				});
				break;
			case 'Destination4':
				this.setState ({
					selectedPlanet4: event.value,
					destination4Vehicals: vehicals,
					selectedVehical4: '',
				});
				break;
			default:
				break;
		}
	}

	render() {
		const planets = this.state.planets.map(planet => ({value: planet.name, label: planet.name}) );
		return (
			<div id='main'>
				<div className="header">
			  	<span>
						<h1>Finding Falcone! </h1>
						<div className="reset">
							<span onClick={() => window.location.reload()}>Reset</span>
							<span>  |  </span>
							<span onClick={() => dvHelpers.geekTrustHome()}> Geeks Trust Home </span>
						</div>
					</span>
					<p>Select planets you want to search in: </p>
				</div>
				<div className="des_select">
					<span>
						<DestinationVehicals
							destination='Destination1'
							planets={planets}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.state.selectedPlanet1 ? dvHelpers.getFilteredVehicals('Destination1', this) : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical1}
							vehicalSelect={this.vehicalSelect}
							selectDisable={false}
							/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination2'
							planets={planets}
							vehicalClass='vehicalRadioButton2'
							vehicals={this.state.selectedPlanet2 ? dvHelpers.getFilteredVehicals('Destination2', this) : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical2}
							vehicalSelect={this.vehicalSelect}
							selectDisable={ false}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination3'
							planets={planets}
							vehicalClass='vehicalRadioButton3'
							vehicals={this.state.selectedPlanet3 ? dvHelpers.getFilteredVehicals('Destination3', this) : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical3}
							vehicalSelect={this.vehicalSelect}
							selectDisable={ false}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination4'
							planets={planets}
							vehicalClass='vehicalRadioButton4'
							vehicals={this.state.selectedPlanet4 ? dvHelpers.getFilteredVehicals('Destination4', this) : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical4}
							vehicalSelect={this.vehicalSelect}
							selectDisable={ false }
						/>
					</span>
				  <span><h2>Time Taken: {dvHelpers.getCount(this.state)} </h2></span>
				</div>
				<div className="footer">
					<button type="button" onClick={() => dvHelpers.submitJson(this)} >Find Falcone!</button>
				</div>
			</div>
		);
	}
}
