function disableBtn() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

function reactivateBtn() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = false;
  });
}

export { disableBtn, reactivateBtn };
