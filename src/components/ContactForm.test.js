import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "./ContactForm";

it("Can render the form without crashing", () => {
  render(<ContactForm />);
});

it("Can type in the expected input boxes", async () => {
  act(() => {
    render(<ContactForm />);
  });

  const elements = {
    firstName: {
      element: screen.getByLabelText(/first name/i),
      toInput: "Nicole",
    },
    lastName: {
      element: screen.getByLabelText(/last name/i),
      toInput: "Tilbe",
    },
    email: {
      element: screen.getByLabelText(/email/i),
      toInput: "nicolecali2406@outlook.com",
    },
    message: {
      element: screen.getByLabelText(/message/i),
      toInput: "Test message",
    }
  };

  for (const key in elements) {
    fireEvent.change(elements[key].element, {
      target: { value: elements[key].toInput },
    });
    expect(elements[key].element.value).toBe(elements[key].toInput);
    await act(async () => {
      fireEvent.blur(elements[key].element);
    });
  }
  const errors = screen.queryByText(/looks like there was an error/i);
  expect(errors).not.toBeInTheDocument();
});