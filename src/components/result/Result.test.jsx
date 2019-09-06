import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Result from "./Result.jsx";

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
    render(<Result count={200} planetName="Earth" />, container);
  });
  expect(container).toMatchSnapshot();
});
