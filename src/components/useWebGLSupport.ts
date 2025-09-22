"use client";

import { useEffect, useState } from "react";

export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch (error) {
      setSupported(false);
    }
  }, []);

  return supported;
}
