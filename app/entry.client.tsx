import { startTransition } from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { AGENT_404_RECOVERY_ID } from "@/lib/constants";

startTransition(() => {
  ReactDOM.hydrateRoot(document, <HydratedRouter />);
});

// 404.html ships a static markdown recovery block for agents and no-JS
// visitors (see src/lib/seo-content.ts). Drop it as soon as the SPA boots so
// visitors get the designed NotFound page; running this synchronously also
// removes the node before React hydrates, avoiding a hydration mismatch.
document.getElementById(AGENT_404_RECOVERY_ID)?.remove();
