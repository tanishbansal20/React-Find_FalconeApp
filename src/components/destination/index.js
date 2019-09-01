import React from 'react';
//import ReactDOM from 'react-dom';
import Destination from './Destination';

const planetJson = [
				   		{
				   			"name": "Donlon",
				   			"distance": 100

					 	},
					 	{
				   			"name": "Enchai",
				   			"distance": 200

					 	},
					 	{
				   			"name": "Jebing",
				   			"distance": 300

					 	},
					 	{
				   			"name": "Sapir",
				   			"distance": 400

					 	},
					 	{
				   			"name": "Lerbin",
				   			"distance": 500

					 	},
					 	{
				   			"name": "Pingsor",
				   			"distance": 600

					 	},
				   ];


const DestinationIndex = () => (<Destination planetJson= {planetJson} />);
export default DestinationIndex;
