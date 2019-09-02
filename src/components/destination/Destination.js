import React, { Component } from 'react';
import axios from 'axios';
import './Destination.scss';
import DestinationVehicals from '.././destinationVehicals/DestinationVehicals.jsx';
export default class Destination extends Component {

	constructor(props) {
		super(props);
		this.getFilteredVehicals = this.getFilteredVehicals.bind(this);
		this.postFind = this.postFind.bind(this);
		this.planetSelect = this.planetSelect.bind(this);
		this.vehicalSelect = this.vehicalSelect.bind(this);
		this.state = {
			count: 0,
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
		}
	}

	postFind() {
		const headers = {
		  'Content-Type': 'application/json',
		  'Accept' : 'application/json'
		}
		axios.post('https://findfalcone.herokuapp.com/token', {} , {headers: headers})
			.then((response) => {
				axios.post('https://findfalcone.herokuapp.com/find', {"token": response.token, "planet_names": [], "vehical_names": []}, {headers: headers
				})
					.then((response) => {
					})
			})
			.catch((error) => {
			})
	}

	componentDidMount() {
		axios.get('https://findfalcone.herokuapp.com/planets')
			.then((response) => {
				this.setState ({
					planets: response.data
				});
			})
			.catch((error) => {

			});

		axios.get('https://findfalcone.herokuapp.com/vehicles')
			.then((response) => {
				this.setState ({
					vehicals: response.data
				});
			})
			.catch((error) => {

			});
	}

	getFilteredVehicals(destination) {
		switch(destination){
			case 'Destination1':
				break;
			case 'Destination2':
				break;
			case 'Destination3':
				break;
			case 'Destination4':
				break;
			default:
		}
	  return this.state.vehicals.map(vehical => ({value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}));
	}

	planetSelect(event, destination) {
		switch(destination) {
			case 'Destination1':
				this.setState ({
					selectedPlanet1: event.value,
				});
				break;
			case 'Destination2':
				this.setState ({
					selectedPlanet2: event.value,
				});
				break;
			case 'Destination3':
				this.setState ({
					selectedPlanet3: event.value,
				});
				break;
			case 'Destination4':
				this.setState ({
					selectedPlanet4: event.value,
				});
				break;
			default:
				break;
		}
	}

	vehicalSelect (event, destination) {
		switch (destination) {
			case 'Destination1':
				this.setState ({
					selectedVehical1: event,
				});
				break;
			case 'Destination2':
				this.setState ({
					selectedVehical2: event,
				});
				break;
			case 'Destination3':
				this.setState ({
					selectedVehical3: event,
				});
				break;
			case 'Destination4':
				this.setState ({
					selectedVehical4: event,
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
			  <h1>Finding Falcone! </h1>
				<p>Select planets you want to search in: </p>
				<div className="des_select">
					<span>
						<DestinationVehicals
							destination='Destination1'
							planets={planets}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.state.selectedPlanet1 ? this.getFilteredVehicals('Destination1') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical1}
							vehicalSelect={this.vehicalSelect}
							/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination2'
							planets={planets}
							vehicalClass='vehicalRadioButton2'
							vehicals={this.state.selectedPlanet2 ? this.getFilteredVehicals('Destination2') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical2}
							vehicalSelect={this.vehicalSelect}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination3'
							planets={planets}
							vehicalClass='vehicalRadioButton3'
							vehicals={this.state.selectedPlanet3 ? this.getFilteredVehicals('Destination3') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical3}
							vehicalSelect={this.vehicalSelect}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination4'
							planets={planets}
							vehicalClass='vehicalRadioButton4'
							vehicals={this.state.selectedPlanet4 ? this.getFilteredVehicals('Destination4') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical4}
							vehicalSelect={this.vehicalSelect}
						/>
					</span>
				  <span><h2>Time Taken: {this.state.count} </h2></span>
				</div>
			</div>
		);
	}
}
