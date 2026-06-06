"use client";

import { useDevice } from "@/contexts/device.context";
import { ForgotPasswordDesktop, ForgotPassword} from "@/features/auth";

export default function ForgotPasswordPage() {
  const { isMobile } = useDevice();
  return <ForgotPassword />;
}