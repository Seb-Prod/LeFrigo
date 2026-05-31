import { UserSession } from "@lefrigo/shared";
import { Text } from "@/components/ui"
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { cleanIp } from "../../utils/session.utils";

type Props = { session: UserSession };

/**
 * Affiche les métadonnées d'une session : Ip, date d'activité, expiration, indentifiant.
 */
export function SessionMeta({ session }: Props) {
  return (
    <>
      <Text size="sm">
        <FiMapPin /> {cleanIp(session.ip ?? "")}
      </Text>
      <Text size="sm">
        <FiClock /> {new Date(session.lastActivityAt).toLocaleString("fr-FR")}
      </Text>
      <Text size="sm">
        <FiCalendar /> Expire le{" "}
        {new Date(session.expiresAt).toLocaleDateString("fr-FR")}
      </Text>
      <Text size="sm" variant="muted">
        {session.sessionIdentifier}
      </Text>
    </>
  );
}
