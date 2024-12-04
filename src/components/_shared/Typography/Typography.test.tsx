import { render } from "@/utils";
import { Typography } from "./Typography";

describe("<Typography />", () => {
  it("renders correcly", () => {
    const tree = render(<Typography />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("has text", () => {
    const { getByText } = render(<Typography>Test</Typography>);
    expect(getByText("Test")).toBeTruthy();
  });
});
