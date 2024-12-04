import { render } from "@/utils";
import Button from "./Button";

describe("<Button />", () => {
  it("renders correcly", () => {
    const tree = render(<Button onPress={jest.fn} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
