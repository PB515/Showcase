"use client";

/* Decides whether to skip the WebGL hero/shader and show the static panel.
   We gate on what actually matters — does the device have WebGL, and has the
   user asked to save data — NOT on navigator.deviceMemory (Chrome privacy-caps
   it, commonly reporting 4 on capable desktops, which wrongly suppressed the
   3D/shader on perfectly able machines). Only genuinely tiny devices (≤2 cores)
   or no-WebGL get the static fallback. */

import { useEffect, useState } from "react";

export function useLite() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      setLite(true);
      return;
    }
    const cores = navigator.hardwareConcurrency ?? 8;
    if (cores <= 2) {
      setLite(true);
      return;
    }
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) setLite(true);
    } catch {
      setLite(true);
    }
  }, []);

  return lite;
}
