import { formatDate } from "./formatDate";
import { DateFormat } from "./formatDate.types";

describe("formatDate", () => {
  it("accept new Date()", () => {
    const res = formatDate(DateFormat.LLL, new Date("2024-11-24 23:25"));
    expect(res).toBe("24 nov 2024, 23:25");
  });
});
