import { render } from "@/utils";
import { DatePicker } from "./DatePicker";

describe("<DatePicker />", () => {
  it("renders correcly", () => {
    const tree = render(<DatePicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
