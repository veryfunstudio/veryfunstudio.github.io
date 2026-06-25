import { startTransition } from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  ReactDOM.hydrateRoot(document, <HydratedRouter />);
});
