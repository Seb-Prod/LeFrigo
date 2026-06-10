"use client";

import { useDevice } from "@/contexts/device.context";
import { SplashScreen } from "../SplashScreen";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function AppBootstrap({ children }: Props) {
  const { ready } = useDevice();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {children}

      {showSplash && (
        <SplashScreen
          ready={ready}
          onFinished={() => {
            setShowSplash(false);
          }}
        />
      )}
    </>
  );
}
