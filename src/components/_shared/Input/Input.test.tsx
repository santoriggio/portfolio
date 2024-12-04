import { render } from "@/utils";
import { Input } from "./Input";

describe("<Input />", () => {
  it("renders correcly", () => {
    const tree = render(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
