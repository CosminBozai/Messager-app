import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { useState } from "react";
import LoginModal from "../LoginModal";

function MockLoginButton() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <button onClick={() => setShowLogin(true)}>Log in</button>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
    </>
  );
}

describe("Login Modal", () => {
  it("clicking the sign up button should render the sign up modal", () => {
    render(<MockLoginButton />);
    const singupBtn = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(singupBtn);
    const createAccBtn = screen.getByRole("button", { name: "Create account" });
    expect(createAccBtn).toBeInTheDocument();
  });
});
