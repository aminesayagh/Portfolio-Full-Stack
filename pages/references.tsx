import React, { useEffect } from "react";

import useSafePush from "@/hook/SafePush";

function References() {
  const push = useSafePush();
  useEffect(() => {
    // start a download file on the client side when the page is loaded
    const downloadFile = async () => {
      const response = await fetch("/references.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "references.pdf";
      a.click();
      a.remove();
    };
    downloadFile().then(() => {
      push.safePush("/");
    });
  }, [push]);
  return <div className="h-screen"></div>;
}

export default References;
