"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/navigation";
import styles from "./NavLink.module.css";
import { useRipple } from "@/hooks/useRipple";
import { RippleLayer } from "../RippleLayer";
import { Color, Size, Variant } from "@/components/types";

type Props = {
  href: string;
  label: string;
  activeStyle?: boolean;
  color?: Color;
  size?: Size;
  variant?: Variant;
};

/**
 * NavLink
 */
export function NavLink({ href, label, activeStyle = false, color= "primary", size="md", variant="ghost" }: Props) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href) || activeStyle;

  const { ripples, addRipple } = useRipple();

  return (
    <Link
      href={href}
      onClick={addRipple}
      className={clsx(styles.link, active && styles.active, "trigger")}
      data-color={color}
      data-component="button"
      data-size={size}
      data-variant={variant}
      data-active={active}
    >
      <RippleLayer ripples={ripples} />

      <span className={styles.label}>{label}</span>
    </Link>
  );
}
