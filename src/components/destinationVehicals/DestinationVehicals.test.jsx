import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DestinationVehicals from "./DestinationVehicals.jsx";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
let dummyObject = {
  state: {
    selectedVehical1: "",
    selectedVehical2: "",
    selectedVehical3: "",
    selectedVehical4: "",
    selectedPlanet1: "Earth",
    selectedPlanet2: "Mars",
    selectedPlanet3: "",
    selectedPlanet4: "Leoine",
    planets: [{name: "Mangal", label: "Mangal"},{name: "Earth", label: "Earth"}, {name: "Leoine", label: "Leoine"}],
    vehicals: [{value:"Space pot", label:"Space pot (2)"},{ value:"Rocket", label:"Rocket (1)"}],
    planetDistance: {"Earth": 200}
  }
}

it("renders successfully with props", () => {

  act(() => {
    render(<DestinationVehicals
      self={dummyObject}
      planetSelect={() => {}}
      vehicalSelect={() => {}}
      />, container);
  });
  expect(container).toMatchSnapshot();
});
