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
  it("Should display username  if the prop is true", async () => {
    render(<Header logStatus={true} />);
    let username = await screen.findByText(/Terry/i);
    expect(username).toBeInTheDocument();
  });
  it("Should display icon if the prop is true", async () => {
    render(<Header logStatus={true} />);
    let icon = await screen.findByTestId("profile-icon");
    expect(icon).toBeInTheDocument();
  });
  it("clicking the log in button should display the username and icon", async () => {
    render(<MockApp />);
    let loginBtn = screen.getByRole("button", { name: "Log in" });
    fireEvent.click(loginBtn);
    let username = await screen.findByText(/Terry/i);
    let icon = await screen.findByTestId("profile-icon");
    expect(username).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
