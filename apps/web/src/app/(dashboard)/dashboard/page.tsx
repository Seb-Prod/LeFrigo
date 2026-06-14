"use client";

import { useAuth } from "@/contexts/auth.context";
import { useDevice } from "@/contexts/device.context";
import {
  CurrentSessionCard,
  OtherSessionsList,
  UserProfileCard,
} from "@/features/account/components";
import { authService } from "@/features/auth/services/auth.service";
import { authStorage } from "@/lib/auth";
import { UserSession } from "@lefrigo/shared";
import { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {


  return (
    <main className={styles.main}>
     
    </main>
  );
}
