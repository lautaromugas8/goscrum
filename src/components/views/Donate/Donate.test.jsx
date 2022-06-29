import { render, screen } from "@testing-library/react";
import { Donate } from "./Donate";

describe("renderizado en Donate", () => {
  it("renderiza un h1", () => {
    render(<Donate />);

    expect(
      screen.getAllByRole("heading", {
        level: 1,
        name: "Colaborá con el proyecto",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a con href", () => {
    render(<Donate />);

    expect(screen.getAllByRole("link")).toHaveAttribute(
      "href",
      "https://mpago.la/343CThM"
    );
  });

  it("renderiza un a con target _blank", () => {
    render(<Donate />);

    expect(screen.getAllByRole("link")).toHaveAttribute("target", "_blank");
  });
});
