jest.mock("../App", () => "div");

describe("ReactDOM render test", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);

    require("../index");
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders the document body correctly", () => {
    expect(document.body).toMatchSnapshot();
  });
});
