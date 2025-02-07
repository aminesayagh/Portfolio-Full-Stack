

import type { ReactNode } from "react";
import React, {
  Suspense
} from "react";

import Preloader from "./Preloader";

export function LoadingProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}

