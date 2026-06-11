import { Avatar, MenuItem } from "@/components/ui";
import { SafeUser } from "@lefrigo/shared";

type Props = {
  user: SafeUser;
};

export function ProfileCard({ user}: Props) {
  return (
    <MenuItem
      label={user.userName}
      description={user.email}
      icon={<Avatar username={user.userName} />}
    />
  );
}
