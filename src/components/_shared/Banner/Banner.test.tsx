import { render, waitFor } from "@/utils";
import { Banner } from "./Banner";

describe("<Banner />", () => {
  it("renders correcly", () => {
    const tree = render(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("has icon", async () => {
    const { getByTestId } = render(<Banner icon="info" />);

    await waitFor(() => {
      const icon = getByTestId("icon");
      expect(icon).toBeTruthy();
    });
  });
  it("not has icon", async () => {
    const { queryByTestId } = render(<Banner />);
    await waitFor(() => {
      const icon = queryByTestId("icon");
      expect(icon).toBeNull();
    });
  });
  it("has message", () => {
    const { getByText } = render(<Banner>Test</Banner>);
    expect(getByText("Test")).toBeTruthy();
  });
});
