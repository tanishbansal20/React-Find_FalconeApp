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

it("renders successfully with props", () => {
  act(() => {
    render(<DestinationVehicals
      destination='Destination1'
      planets={[{value: "Mangal", label: "Mangal"},{value: "Earth", label: "Earth"}]}
      vehicalClass='vehicalRadioButton1'
      vehicals={[{value:"Space pot", label:"Space pot (2)"},{ value:"Rocket", label:"Rocket (1)"}]}
      planetSelect={() => {}}
      selectedVehical="Space pot"
      vehicalSelect={() => {}}
      selectDisable={false}
      />, container);
  });
  expect(container).toMatchSnapshot();
});
