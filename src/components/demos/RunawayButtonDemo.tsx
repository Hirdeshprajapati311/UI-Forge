import React, { useState } from "react";
import RunawayButton from "../ui/RunawayButton";

export default function RunawayButtonDemo() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return React.createElement(
    "form",
    {
      className: "runaway-demo",
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
      },
    },
    React.createElement(
      "div",
      { className: "runaway-demo-copy" },
      React.createElement("p", { className: "runaway-demo-eyebrow" }, "Playful validation"),
      React.createElement("p", { className: "runaway-demo-label" }, agreed ? "Ready to submit." : "The button needs one thing first."),
      React.createElement(
        "label",
        { className: "runaway-demo-check" },
        React.createElement("input", { type: "checkbox", required: true, checked: agreed, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setAgreed(event.target.checked) }),
        React.createElement("span", null, "I agree to the Terms & Conditions")
      )
    ),
    React.createElement(
      "div",
      { className: "runaway-demo-action" },
      React.createElement(
        RunawayButton,
        {
          type: "submit",
          enabled: agreed,
          className: "runaway-demo-button",
        },
        submitted ? "Submitted" : "Submit"
      )
    ),
    React.createElement("p", { className: "runaway-demo-hint" }, agreed ? "The button is now a normal submit button." : "Move toward Submit to see what happens.")
  );
}
