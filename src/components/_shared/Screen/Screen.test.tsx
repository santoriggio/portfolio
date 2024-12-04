import { Screen } from "./Screen";
import { renderRouter, screen } from "expo-router/testing-library";

describe("<Screen />", () => {
  it("renders correcly", () => {
    const MockComponent = jest.fn(() => <Screen />);

    renderRouter({
      index: MockComponent,
    });

    expect(screen).toMatchSnapshot();
  });
});
