import { Button, Input } from "@/components/ui";
import styles from "./RegisterForm.module.css";
import { AuthTab } from "@/features/auth/components/AuthTab/AuthTab";

type Props = { onToggle: () => void; active: boolean };

export function RegisterForm({ onToggle, active }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // logique register
  };

  return (
    <div className={styles.formSignup}>
      <AuthTab
        onToggle={onToggle}
        activeLabel="Créez un compte gratuitement" active={active} inactiveLabel={"Pas encore de compte ? Créez-en un."}      />
      <form onSubmit={handleSubmit} className={styles.fields}>
        <Input type="text" placeholder="Full name" required />
        <Input type="email" placeholder="Email address" required />
        <Input type="password" placeholder="Password" required />
        <Input type="password" placeholder="Confirm Password" required />
        <div className={styles.checkbox}>
          <input className={styles.input} type="checkbox" id="signupcheck" />
          <label htmlFor="signupcheck">i accept all terms and conditions</label>
        </div>
        <Button type="submit" className={styles.btnSignup}>
          Create account
        </Button>
      </form>
    </div>
  );
}
