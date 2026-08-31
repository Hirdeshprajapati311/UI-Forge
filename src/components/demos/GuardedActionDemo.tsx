import React, { useState } from "react";
import GuardedAction from "../ui/GuardedAction";

export default function GuardedActionDemo() {
  const [deleted, setDeleted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  if (deleted) {
    return React.createElement(
      "div",
      { className: "guarded-demo guarded-demo-complete" },
      React.createElement("span", { className: "guarded-demo-icon", "aria-hidden": "true" }, "✓"),
      React.createElement("div", null,
        React.createElement("p", { className: "guarded-demo-eyebrow" }, "Action complete"),
        React.createElement("h3", { className: "guarded-demo-title" }, "Project deleted"),
        React.createElement("p", { className: "guarded-demo-description" }, "The demo state has been cleared successfully."),
      ),
      React.createElement("button", { type: "button", className: "guarded-demo-reset", onClick: () => { setDeleted(false); setResetKey((value) => value + 1); } }, "Reset demo")
    );
  }

  return React.createElement(
    "div",
    { className: "guarded-demo" },
    React.createElement("div", { className: "guarded-demo-header" },
      React.createElement("div", { className: "guarded-demo-project-icon", "aria-hidden": "true" }, "F"),
      React.createElement("div", null,
        React.createElement("p", { className: "guarded-demo-eyebrow" }, "Project settings"),
        React.createElement("h3", { className: "guarded-demo-title" }, "ForgeXUI dashboard")
      )
    ),
    React.createElement("div", { className: "guarded-demo-danger" },
      React.createElement("p", { className: "guarded-demo-danger-title" }, "Danger Zone"),
      React.createElement("p", { className: "guarded-demo-description" }, "Deleting this project removes its settings and data permanently."),
      React.createElement("div", { className: "guarded-demo-footer" },
        React.createElement("span", { className: "guarded-demo-warning" }, "Hold to confirm"),
        React.createElement(GuardedAction, { key: resetKey, onConfirm: () => setDeleted(true), duration: 1350, warning: "Keep holding to delete this project.", confirmLabel: "Hold to delete", successLabel: "Deleted" }, "Delete Project")
      )
    )
  );
}
