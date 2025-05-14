"use client";

import { Provider } from "react-redux";
import { setupStore } from "@/store/";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore()}>{children}</Provider>;
}
