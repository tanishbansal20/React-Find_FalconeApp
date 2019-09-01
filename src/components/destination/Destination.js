import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import './Destination.scss';

export default class Destination extends Component { // eslint-disable-line
	static propTypes = {
		planetJson: PropTypes.array.isRequired,
	}

	constructor(props) {
		super(props);
		this.createOption = this.createOption.bind(this);
		this.state = {
			count: 0
		}
	}

	createOption(){
		return this.props.planetJson.map(planet => ({value: planet.name, label: planet.name}) );
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
