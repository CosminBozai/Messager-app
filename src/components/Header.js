/*
The Header component is different if the user is logged or not
This will be controlled by a prop that resolves to true (for logged) and false(for not logged)
If false then display a button to log in, that fill render a LogInForm component
If true then display the user's name and icon
*/

export default function Header() {
  return <div id="header"></div>;
}
