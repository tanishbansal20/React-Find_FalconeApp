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
		return (
			<div id='main_div'>
				<div className="header">
			  		<div>
			  			<div className="title">
							<h1>Finding Falcone! </h1>
						</div>
						<div className="header-options">
							<div className="reset">
								<span onClick={() => window.location.reload()}>Reset</span>
								<span>  |  </span>
								<span className="geekspage" onClick={() => dvHelpers.geekTrustHome()}> Geeks Trust Home </span>
							</div>
						</div>
					</div>
					<div className="planet-message">
						<p>Select planets you want to search in: </p>
					</div>
				</div>

				<div className="des_select">
					<DestinationVehicals self={this} planetSelect={this.planetSelect} vehicalSelect={this.vehicalSelect} />
				</div>

				<div className="footer">
					<button type="button" onClick={() => dvHelpers.submitJson(this)} >Find Falcone!</button>
				</div>
			</div>
		);
	}
}
