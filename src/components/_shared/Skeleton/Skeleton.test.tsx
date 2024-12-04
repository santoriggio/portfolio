import { render } from "@/utils";
import { Skeleton } from "./Skeleton";

describe("<Skeleton />", () => {
  it("renders correcly", () => {
    const tree = render(<Skeleton />);
    expect(tree).toMatchSnapshot();
  });
});
