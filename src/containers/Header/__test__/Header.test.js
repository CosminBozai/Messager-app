import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import Header from "../Header";
import { useState } from "react";

function MockApp() {
  const [logStatus, setLogStatus] = useState(false);
  return <Header logStatus={logStatus} setLogStatus={setLogStatus} />;
}

describe("Header", () => {
  it("Should display the button to log in if the prop is false", () => {
    render(<Header logStatus={false} />);
    let loginBtn = screen.getByRole("button", { name: "Log in" });
    expect(loginBtn).toBeInTheDocument();
  });
  it("clicking the log in button should render the Login modal", () => {
    render(<MockApp />);
    let loginBtn = screen.getByRole("button", { name: "Log in" });
    fireEvent.click(loginBtn);
    let modalLoginBtn = screen.getByTestId("modal-login-btn");
    expect(modalLoginBtn).toBeInTheDocument();
  });
});
