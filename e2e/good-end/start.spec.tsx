import React from "react";
import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../src/app";

describe("Good end - Start", () => {
  it.skip("should be able to start the game", async () => {
    render(<App />);
    const buttons = await within(screen.getByTestId("toolbar")).findAllByRole(
      "button"
    );
    // should have 4 initial buttons
    expect(buttons.length).toBe(4);

    const contentArea = await screen.findByTestId("main-content");
    expect(contentArea.textContent).toBe(
      "You wake up.\nToday is Monday.\nYou have to go to school.\nYou go to school.\nYou have a normal day at school.You're back at your house, you walk up the stairs and get in your room. You have the rest of the day free, what do you want to do?"
    );
  });
});
