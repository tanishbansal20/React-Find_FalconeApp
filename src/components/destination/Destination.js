import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './Destination.scss';

export default class Destination extends Component {

	constructor(props) {
		super(props);
		this.createOption = this.createOption.bind(this);
		this.state = {
			count: 0,
			planet: [],
			vehical: [],
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

	render() {
		return (
			<div id='main'>
			  <h1>Finding Falcone! </h1>
				<p>Select planets you want to search in: </p>
				<div className="des_select">
					<span> <h4>Destination 1</h4> <Select options={this.createOption()} /> </span>
					<span> <h4>Destination 2</h4> <Select options={this.createOption()} /> </span>
					<span> <h4>Destination 3</h4> <Select options={this.createOption()} /> </span>
					<span> <h4>Destination 4</h4> <Select options={this.createOption()} /> </span>
				  <span><h2>Time Taken: {this.state.count} </h2></span>
				</div>
			</div>
		);
	}
}
