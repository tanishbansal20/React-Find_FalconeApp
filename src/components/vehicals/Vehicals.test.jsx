import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Vehicals from "./Vehicals.jsx";

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

let propObject = {
  destination:"Destination1",
  vehicalClass:"vehicalRadioButton1",
  vehicals: [{value:"Space pot", label:"Space pot (2)"},{ value:"Rocket", label:"Rocket (1)"}],
  selectedVehical: "Rocket"
}

it("renders successfully with props", () => {

  act(() => {
    render(<Vehicals
      vehicalSelectFun={() => {}}
      allProps={propObject} />, container);
  });
  expect(container).toMatchSnapshot();
});
