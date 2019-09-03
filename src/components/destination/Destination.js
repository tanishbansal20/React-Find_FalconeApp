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
		this.increaseVehicalNumber = this.increaseVehicalNumber.bind(this);
		this.decreaseVehicalNumber = this.decreaseVehicalNumber.bind(this);
		this.getSelectedPlanetDistance = this.getSelectedPlanetDistance.bind(this);
		this.getVehicalsObject = this.getVehicalsObject.bind(this);
		this.getCount = this.getCount.bind(this);

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
					vehicals: response.data,
				});
			})
			.catch((error) => {

			});
	}

	getSelectedPlanetDistance(selectedPlanet) {
		return this.state.planets.filter(planet => { if(planet.name === selectedPlanet){ return planet}})[0].distance;
	}

	getVehicalsObject(destinationVehicals, selectedPlanet, selectedVehical) {
		return destinationVehicals.map(vehical => {
			if(vehical.max_distance < this.getSelectedPlanetDistance(selectedPlanet) || (vehical.total_no === 0 && vehical.name !== selectedVehical)) {
				return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`, itemClassName:"disabled" }
			} else {
				return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}
			}
		});
	}

	getFilteredVehicals(destination) {
		switch(destination) {
			case 'Destination1':
				return this.getVehicalsObject(this.state.destination1Vehicals, this.state.selectedPlanet1, this.state.selectedVehical1);
			case 'Destination2':
				return this.getVehicalsObject(this.state.destination2Vehicals, this.state.selectedPlanet2, this.state.selectedVehical2);
			case 'Destination3':
				return this.getVehicalsObject(this.state.destination3Vehicals, this.state.selectedPlanet3, this.state.selectedVehical3);
			case 'Destination4':
				return this.getVehicalsObject(this.state.destination4Vehicals, this.state.selectedPlanet4, this.state.selectedVehical4);
			default:
				return this.state.vehicals.map(vehical => ({value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}));
		}
	}

	getCount(destination) {
		let count = 0;
		switch(destination) {
			case 'Destination4':
				count += this.getSpeed(this.state.selectedVehical4);
			case 'Destination3':
				count += this.getSpeed(this.state.selectedVehical3);
			case 'Destination2':
				count += this.getSpeed(this.state.selectedVehical2);
			case 'Destination1':
				count += this.getSpeed(this.state.selectedVehical1);
			default:
		}
		return count;
	}

	planetSelect(event, destination) {
		switch(destination) {
			case 'Destination1':
				this.setState ({
					selectedPlanet1: event.value,
					destination1Vehicals: this.state.vehicals.map(vehical => { return {...vehical}}),
					selectedVehical1: '',
					count: 0,
				});
				break;
			case 'Destination2':
				this.setState ({
					selectedPlanet2: event.value,
					destination2Vehicals: this.state.destination1Vehicals.map(vehical => { return {...vehical}}),
					selectedVehical2: '',
					count: this.getCount('Destination1'),
				});
				debugger;
				break;
			case 'Destination3':
				this.setState ({
					selectedPlanet3: event.value,
					destination3Vehicals: this.state.destination2Vehicals.map(vehical => { return {...vehical}}),
					selectedVehical3: '',
					count: this.getCount('Destination2'),
				});
				break;
			case 'Destination4':
				this.setState ({
					selectedPlanet4: event.value,
					destination4Vehicals: this.state.destination3Vehicals.map(vehical => { return {...vehical}}),
					selectedVehical4: '',
					count: this.getCount('Destination3'),
				});
				break;
			default:
				break;
		}
	}

	increaseVehicalNumber(vehicals, vehicalName) {
		 return vehicals.map(vehical => { if(vehical.name === vehicalName) { vehical.total_no +=1;} return vehical});
	}

	decreaseVehicalNumber(vehicals, vehicalName) {
		return vehicals.map(vehicalObj => { if(vehicalObj.name === vehicalName) { vehicalObj.total_no -=1;} return vehicalObj});
	}

	getSpeed(selectedVehical) {
		if(selectedVehical.length) {
			return this.state.vehicals.filter(vehical => { if(vehical.name === selectedVehical) { return vehical}})[0].speed
		}
		return 0;
	}

	vehicalSelect (event, destination) {
		let count = this.getSpeed(event);
		switch (destination) {
			case 'Destination1':
				if(this.state.selectedVehical1.length) {
					this.setState ({
					  destination1Vehicals: this.increaseVehicalNumber(this.state.destination1Vehicals, this.state.selectedVehical1),
						selectedVehical2: '',
						selectedVehical3: '',
						selectedVehical4: '',
						selectedPlanet2: '',
						selectedPlanet3: '',
						selectedPlanet4: '',
					});
				}
				this.setState ({
					selectedVehical1: event,
					destination1Vehicals: this.decreaseVehicalNumber(this.state.destination1Vehicals, event),
					count: count,
				});
				break;
			case 'Destination2':
				count += this.getCount('Destination1');
				if(this.state.selectedVehical2.length) {
					this.setState ({
					  destination2Vehicals: this.increaseVehicalNumber(this.state.destination2Vehicals, this.state.selectedVehical2),
						selectedVehical3: '',
						selectedVehical4: '',
						selectedPlanet3: '',
						selectedPlanet4: '',
					});
				}
				this.setState ({
					selectedVehical2: event,
					destination2Vehicals: this.decreaseVehicalNumber(this.state.destination2Vehicals, event),
					count: count,
				});
				break;
			case 'Destination3':
				count += this.getCount('Destination2');
				if(this.state.selectedVehical3.length) {
					this.setState ({
					  destination3Vehicals: this.increaseVehicalNumber(this.state.destination3Vehicals, this.state.selectedVehical3),
						selectedVehical4: '',
						selectedPlanet4: '',
					});
				}
				this.setState ({
					selectedVehical3: event,
					destination3Vehicals: this.decreaseVehicalNumber(this.state.destination3Vehicals, event),
					count: count,
				});
				break;
			case 'Destination4':
				count += this.getCount('Destination3');
				if(this.state.selectedVehical4.length) {
					this.setState ({
					  destination4Vehicals: this.increaseVehicalNumber(this.state.destination4Vehicals, this.state.selectedVehical4),
					});
				}
				this.setState ({
					selectedVehical4: event,
					destination4Vehicals: this.decreaseVehicalNumber(this.state.destination4Vehicals, event),
					count: count,
				});
				break;
			default:
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
							selectDisable={false}
							/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination2'
							planets={planets}
							vehicalClass='vehicalRadioButton2'
							vehicals={this.state.selectedPlanet2 && this.state.selectedVehical1 ? this.getFilteredVehicals('Destination2') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical2}
							vehicalSelect={this.vehicalSelect}
							selectDisable={this.state.selectedVehical1.length ? false : true}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination3'
							planets={planets}
							vehicalClass='vehicalRadioButton3'
							vehicals={this.state.selectedPlanet3 && this.state.selectedVehical2 ? this.getFilteredVehicals('Destination3') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical3}
							vehicalSelect={this.vehicalSelect}
							selectDisable={this.state.selectedVehical2.length ? false: true}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination4'
							planets={planets}
							vehicalClass='vehicalRadioButton4'
							vehicals={this.state.selectedPlanet4 && this.state.selectedVehical3 ? this.getFilteredVehicals('Destination4') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical4}
							vehicalSelect={this.vehicalSelect}
							selectDisable={this.state.selectedVehical3.length ? false : true}
						/>
					</span>
				  <span><h2>Time Taken: {this.state.count} </h2></span>
				</div>
			</div>
		);
	}
}
