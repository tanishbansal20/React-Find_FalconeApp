import React, { Component } from 'react';
import axios from 'axios';
import './Destination.scss';
import DestinationVehicals from '.././destinationVehicals/DestinationVehicals.jsx';
export default class Destination extends Component {

	constructor(props) {
		super(props);
		this.createOption = this.createOption.bind(this);
		this.postFind = this.postFind.bind(this);
		this.state = {
			count: 0,
			planet: [],
			vehical: [],
			value: '',
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
					planet: response.data
				});
			})
			.catch((error) => {

			});

		axios.get('https://findfalcone.herokuapp.com/vehicles')
			.then((response) => {
				this.setState ({
					vehical: response.data
				});
			})
			.catch((error) => {

			});
	}

	createOption(){
		return this.state.planet.map(planet => ({value: planet.name, label: planet.name}) );
	}

	getOptions() {
		return this.state.vehical.map(vehical => `${vehical.name} (${vehical.total_no})`);
	}

	render() {
		return (
			<div id='main'>
			  <h1>Finding Falcone! </h1>
				<p>Select planets you want to search in: </p>
				<div className="des_select">
					<span>
						<DestinationVehicals
							destination='Destination1'
							planets={this.createOption()}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.getOptions()}
							/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination2'
							planets={this.createOption()}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.getOptions()}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination3'
							planets={this.createOption()}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.getOptions()}
						/>
					</span>
					<span>
						<DestinationVehicals
							destination='Destination4'
							planets={this.createOption()}
							vehicalClass='vehicalRadioButton1'
							vehicals={this.getOptions()}
						/>
					</span>
				  <span><h2>Time Taken: {this.state.count} </h2></span>
				</div>
			</div>
		);
	}
}
