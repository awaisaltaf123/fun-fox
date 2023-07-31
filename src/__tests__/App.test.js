import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
