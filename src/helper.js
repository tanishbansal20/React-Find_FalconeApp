import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Result from './components/result/Result.jsx';

export const  dvHelpers = {
  geekTrustHome: () => {
    window.location = "https://www.geektrust.in";
  },

  planetDistanceJson: (data) => {
    const pDistance = {};
    data.forEach((obj) => {
      pDistance[obj.name] = obj.distance
    });
    return pDistance;
  },

  vehicalSpeedJson: (data) => {
    const vSpeed = {};
    data.forEach((obj) => {
      vSpeed[obj.name] = {"speed": obj.speed, "distance": obj.max_distance}
    });
    return vSpeed;
  },

  getCount: (state) => {
    let count = 0;
    const {selectedPlanet1, selectedPlanet2, selectedPlanet3, selectedPlanet4, selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4, vehicalsSpeed, planetDistance}= state;
    if(selectedVehical1) {
      count += planetDistance[selectedPlanet1] / vehicalsSpeed[selectedVehical1].speed;
    }
    if(selectedVehical2) {
      count += planetDistance[selectedPlanet2] / vehicalsSpeed[selectedVehical2].speed;;
    }
    if(selectedVehical3) {
      count += planetDistance[selectedPlanet3] / vehicalsSpeed[selectedVehical3].speed;;
    }
    if(selectedVehical4) {
      count += planetDistance[selectedPlanet4] / vehicalsSpeed[selectedVehical4].speed;;
    }
    return count;
  },

  setOriginalVehical: (vehicals) => {
    return vehicals.map(vehical => {return {...vehical}});
  },

  resetDestinationVehicals: (destinationVehicals, selectedVehical, that) => {
    that.setState ({
      [destinationVehicals]: dvHelpers.setOriginalVehical(that.state.vehicals),
      [selectedVehical]: '',
    });
  },

  decreaseVehicalNumber: (vehicals, vehicalName, that) => {
		const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = that.state;
		return vehicals.map(vehicalObj => {
			if(vehicalObj.name === vehicalName) {
				vehicalObj.total_no -=1;
			}
			if(vehicalObj.name === selectedVehical1){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					dvHelpers.resetDestinationVehicals('destination1Vehicals', 'selectedVehical1', that);
				}
			}
			if(vehicalObj.name === selectedVehical2){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					dvHelpers.resetDestinationVehicals('destination2Vehicals', 'selectedVehical2', that);
				}
			}
			if(vehicalObj.name === selectedVehical3){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					dvHelpers.resetDestinationVehicals('destination3Vehicals', 'selectedVehical3', that);
				}
			}
			if(vehicalObj.name === selectedVehical4){
				vehicalObj.total_no -=1;
				if(vehicalObj.total_no === -1){
					vehicalObj.total_no = 0;
					dvHelpers.resetDestinationVehicals('destination4Vehicals', 'selectedVehical4', that);
				}
			}
			return vehicalObj
		});
	},

  getVehicalsObject: (destinationVehicals, selectedPlanet, selectedVehical, that) => {
		if(selectedVehical.length) {
			return destinationVehicals.map(vehical => {
				if(vehical.max_distance < that.state.planetDistance[selectedPlanet] || (vehical.total_no === 0 && vehical.name !== selectedVehical)) {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`, itemClassName:"disabled" }
				} else {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}
				}
			});
		} else {
			const {selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = that.state;
			return that.state.vehicals.map(vehicall => {
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

				if(vehical.max_distance < that.state.planetDistance[selectedPlanet] || vehical.total_no === 0) {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})`, itemClassName:"disabled" }
				} else {
					return { value:vehical.name, label:`${vehical.name} (${vehical.total_no})` }
				}
			});
		}
	},

  getFilteredVehicals: (destination, that) => {
    switch(destination) {
      case 'Destination1':
        return dvHelpers.getVehicalsObject(that.state.destination1Vehicals, that.state.selectedPlanet1, that.state.selectedVehical1, that);
      case 'Destination2':
        return dvHelpers.getVehicalsObject(that.state.destination2Vehicals, that.state.selectedPlanet2, that.state.selectedVehical2, that);
      case 'Destination3':
        return dvHelpers.getVehicalsObject(that.state.destination3Vehicals, that.state.selectedPlanet3, that.state.selectedVehical3, that);
      case 'Destination4':
        return dvHelpers.getVehicalsObject(that.state.destination4Vehicals, that.state.selectedPlanet4, that.state.selectedVehical4, that);
      default:
        return that.state.vehicals.map(vehical => ({value:vehical.name, label:`${vehical.name} (${vehical.total_no})`}));
    }
  },

  submitJson: (that) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    }
    axios.post('https://findfalcone.herokuapp.com/token', {} , { headers: headers })
      .then((response) => {
        const { selectedPlanet1, selectedPlanet2, selectedPlanet3, selectedPlanet4, selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4} = that.state;
        axios.post('https://findfalcone.herokuapp.com/find',
          {
            "token": response.data.token,
            "planet_names": [selectedPlanet1, selectedPlanet2, selectedPlanet3, selectedPlanet4],
            "vehicle_names": [selectedVehical1, selectedVehical2, selectedVehical3, selectedVehical4]
          }, { headers: headers })
          .then((response) => {
            if(response.data.status === "false") {
              throw "Please send the Request again or change the Planets and vehical, Falcone didn't find"
            }
            ReactDOM.render(
              <Result count={dvHelpers.getCount(that.state)} planetName={response.data.planet_name} />, document.getElementById('new-root')
            );
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      })
  },

  getDestinationAndVehicalsJson: (that) => {
    axios.get('https://findfalcone.herokuapp.com/planets')
			.then((response) => {
  				that.setState ({
  					planets: response.data,
  					planetDistance: dvHelpers.planetDistanceJson(response.data),
  				})
			})
			.catch((error) => {
        alert(error.message);
			});

		axios.get('https://findfalcone.herokuapp.com/vehicles')
			.then((response) => {
				that.setState ({
					vehicals: response.data,
					vehicalsSpeed: dvHelpers.vehicalSpeedJson(response.data),
				});
			})
			.catch((error) => {
        alert(error.message);
			});
  },

  async updateVehicalObject(selectedVehical, destinationVehicals, event, that) {
		if(that.state[selectedVehical].length) {
			await that.setState ({
				[destinationVehicals]: dvHelpers.setOriginalVehical(that.state.vehicals),
				[selectedVehical]: '',
			});
		}
		that.setState ({
			[selectedVehical]: event,
			[destinationVehicals]: dvHelpers.decreaseVehicalNumber(that.state[destinationVehicals], event, that),
		});
	}

}
