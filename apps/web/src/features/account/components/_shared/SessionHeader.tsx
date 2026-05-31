import { UserSession } from "@lefrigo/shared";
import { Text } from "@/components/ui";
import {
  formatLastActivity,
  parseBrowser,
  parseDevice,
} from "../../utils/session.utils";

type Props = {
  session: UserSession;
  isCurrent?: boolean;
  size?: number;
  layout?: "row" | "column";
};


/**
 * Affiche l'icone d'appareil, le nom du navigateur et la durée depuis la dernière activité.
 */
export function SessionHeader({ session, isCurrent = false, size = 18, layout = "row" }: Props) {
  const ua = session.userAgent ?? "";
  const browser = parseBrowser(ua);

  if (layout === "column") {
    return (
      <>
        <div>{parseDevice(ua, size)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {browser.icon}
          <Text size="lg">{browser.name}</Text>
        </div>
        <Text variant="muted">
          {formatLastActivity(new Date(session.lastActivityAt))}
        </Text>
      </>
    );
  }

  return (
    <>
      {isCurrent && <span aria-hidden="true" />}
      {parseDevice(ua, size)}
      {browser.icon}
      <Text size="lg">{browser.name}</Text>
      <Text variant="muted">
        {formatLastActivity(new Date(session.lastActivityAt))}
      </Text>
    </>
  );
}
