"use client";

import { useDevice } from "@/contexts/device.context";
import { SplashScreen } from "../SplashScreen";
import { useEffect, useState } from "react";

type AppBootstrapProps = {
  children: React.ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const { ready } = useDevice();
  // const [ready, setReady] = useState(false);
  const [showApp, setShowApp] = useState(false);

  // useEffect(() => {
  //   const duration = 10000 + Math.random() * 30000;

  //   const timer = setTimeout(() => {
  //     setReady(true);
  //   }, duration);

  //   return () => clearTimeout(timer);
  // }, []);

  if (!showApp) {
    return <SplashScreen ready={ready} onFinished={() => setShowApp(true)} />;
  }

  return <>{children}</>;
}
