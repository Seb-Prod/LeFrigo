"use client";

import { useDevice } from "@/contexts/device.context";
import { SplashScreen } from "../SplashScreen";

type AppBootstrapProps = {
  children: React.ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  // const { ready } = useDevice();
  const ready = false

  if (!ready) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
