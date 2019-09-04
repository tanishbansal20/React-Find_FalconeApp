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
			vehicalsSpeed: {},
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

	setTotalVehicals(data) {
		const vehicalsSpeed = {};
		data.forEach((obj) => { vehicalsSpeed[obj.name] = obj.speed });
		return vehicalsSpeed;
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
					vehicalsSpeed: this.setTotalVehicals(response.data),
				});
			})
			.catch((error) => {

			});
	}

	getSelectedPlanetDistance(selectedPlanet) {
		if(selectedPlanet.length) {
			return this.state.planets.filter(planet => { if(planet.name === selectedPlanet){ return planet}})[0].distance;
		}
		return 0;
	}

	getSpeed(selectedVehical) {
		if(selectedVehical.length) {
			return this.state.vehicals.filter(vehical => { if(vehical.name === selectedVehical) { return vehical}})[0].speed
		}
		return 0;
	}

	getCount() {
		let count = 0;
		const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = this.state;
		if(selectedVehical1) {
			count += this.state.vehicalsSpeed[selectedVehical1];
		}
		if(selectedVehical2) {
			count += this.state.vehicalsSpeed[selectedVehical2];
		}
		if(selectedVehical3) {
			count += this.state.vehicalsSpeed[selectedVehical3];
		}
		if(selectedVehical4) {
			count += this.state.vehicalsSpeed[selectedVehical4];
		}
		return count;
	}

	increaseVehicalNumber(vehicals, vehicalName) {
		const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = this.state;
		 return vehicals.map(vehical => {
			 if(vehical.name === vehicalName) {
				 vehical.total_no +=1;
			 }
			 if(vehical.name === selectedVehical1) {
				 vehical.total_no -=1;
			 }
			 if(vehical.name === selectedVehical2) {
				 vehical.total_no -=1;
			 }
			 if(vehical.name === selectedVehical3) {
				 vehical.total_no -=1;
			 }
			 if(vehical.name === selectedVehical4) {
				 vehical.total_no -=1;
			 }

			 return {...vehical}
		 });
	}

	resetDestinationVehicals(destinationVehicals, selectedVehical){
		this.setState ({
			[destinationVehicals]: this.state.vehicals.map(vehical => {return {...vehical}}),
			[selectedVehical]: '',
		});
	}

	decreaseVehicalNumber(vehicals, vehicalName) {
		const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = this.state;
		return vehicals.map(vehicalObj => {
			if(vehicalObj.name === vehicalName) {
				vehicalObj.total_no -=1;
			}
			if(vehicalObj.name === selectedVehical1){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					this.resetDestinationVehicals('destination1Vehicals', 'selectedVehical1');
				}
			}
			if(vehicalObj.name === selectedVehical2){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					this.resetDestinationVehicals('destination2Vehicals', 'selectedVehical2');
				}
			}
			if(vehicalObj.name === selectedVehical3){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					this.resetDestinationVehicals('destination3Vehicals', 'selectedVehical3');
				}
			}
			if(vehicalObj.name === selectedVehical4){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					this.resetDestinationVehicals('destination4Vehicals', 'selectedVehical4');
				}
			}
			return vehicalObj
		});
	}



	async vehicalSelect (event, destination) {
		switch (destination) {
			case 'Destination1':
				if(this.state.selectedVehical1.length) {
					await this.setState ({
						destination1Vehicals: this.state.vehicals.map(vehical => { return {...vehical}}),
						selectedVehical1: '',
					});
				}
				this.setState ({
					selectedVehical1: event,
					destination1Vehicals: this.decreaseVehicalNumber(this.state.destination1Vehicals, event),
				});
				break;
			case 'Destination2':
				if(this.state.selectedVehical2.length) {
					await this.setState ({
						destination2Vehicals: this.state.vehicals.map(vehical => { return {...vehical}}),
						selectedVehical2: '',
					});
				}
				this.setState ({
					selectedVehical2: event,
					destination2Vehicals: this.decreaseVehicalNumber(this.state.destination2Vehicals, event),
				});
				break;
			case 'Destination3':
				if(this.state.selectedVehical3.length) {
					await this.setState ({
						destination3Vehicals: this.state.vehicals.map(vehical => { return {...vehical}}),
						selectedVehical3: '',
					});
				}
				this.setState ({
					selectedVehical3: event,
					destination3Vehicals: this.decreaseVehicalNumber(this.state.destination3Vehicals, event),
				});
				break;
			case 'Destination4':
				if(this.state.selectedVehical4.length) {
					await this.setState ({
						destination4Vehicals: this.state.vehicals.map(vehical => { return {...vehical}}),
						selectedVehical4: '',
					});
				}
				this.setState ({
					selectedVehical4: event,
					destination4Vehicals: this.decreaseVehicalNumber(this.state.destination4Vehicals, event),
				});
				break;
			default:
		}
	}

	getVehicalsObject (destinationVehicals, selectedPlanet, selectedVehical) {
		if(selectedVehical.length) {
			return destinationVehicals.map(vehical => {
				if(vehical.max_distance < this.getSelectedPlanetDistance(selectedPlanet) || (vehical.total_no === 0 && vehical.name !== selectedVehical)) {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`, itemClassName:"disabled" }
				} else {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}
				}
			});
		} else {
			const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = this.state;
			return this.state.vehicals.map(vehicall => {
				const vehical = {...vehicall};
				if(selectedVehical1 === vehical.name) {
					vehical.total_no -= 1;
				}
				if(selectedVehical2 === vehical.name) {
					vehical.total_no -= 1;
				}
				if(selectedVehical3 === vehical.name) {
					vehical.total_no -= 1;
				}
				if(selectedVehical4 === vehical.name) {
					vehical.total_no -= 1;
				}

				if(vehical.max_distance < this.getSelectedPlanetDistance(selectedPlanet) || vehical.total_no === 0) {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`, itemClassName:"disabled" }
				} else {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})` }
				}
			});
		}
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

	planetSelect(event, destination) {
		let vehicals = this.state.vehicals.map(vehical => { return {...vehical}});
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
							vehicals={this.state.selectedPlanet2 ? this.getFilteredVehicals('Destination2') : []}
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
							vehicals={this.state.selectedPlanet3 ? this.getFilteredVehicals('Destination3') : []}
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
							vehicals={this.state.selectedPlanet4 ? this.getFilteredVehicals('Destination4') : []}
							planetSelect={this.planetSelect}
							selectedVehical={this.state.selectedVehical4}
							vehicalSelect={this.vehicalSelect}
							selectDisable={ false }
						/>
					</span>
				  <span><h2>Time Taken: {this.state.count} </h2></span>
				</div>
			</div>
		);
	}
}
