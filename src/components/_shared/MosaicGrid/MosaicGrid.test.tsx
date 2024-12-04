import { render } from "@/utils";
import { MosaicGrid } from "./MosaicGrid";

describe("<MosaicGrid />", () => {
  it("renders correcly", () => {
    const tree = render(<MosaicGrid />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
