// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "process";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/relay-g1u1",
      ui_host: "https://us.posthog.com",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
