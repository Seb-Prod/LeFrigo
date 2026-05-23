"use client";

import { useState } from "react";
import styles from "./AuthForm.module.css";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm/RegisterForm";

export function AuthForm() {
  const [isLogin, setisLogin] = useState(false);

  return (
    <section className={styles.wrapper}>
      <RegisterForm onToggle={() => setisLogin(false)} active={!isLogin} />
      <div className={`${styles.formLogin} ${isLogin ? styles.active : ""}`}>
        <LoginForm onToggle={() => setisLogin(true)} active={isLogin}/>
      </div>
    </section>
  );

  // return (
  //   <section className={`${styles.wrapper} ${login ? styles.active : ""}`}>
  //     {/* register */}
  //     <div className={`${styles.form} ${styles.signup}`}>
  //       <header onClick={handleToggle}>Register</header>
  //       <form>
  //         <input
  //           className={styles.input}
  //           type="text"
  //           placeholder="Full name"
  //           required
  //         />
  //         <input
  //           className={styles.input}
  //           type="text"
  //           placeholder="Email Address"
  //           required
  //         />
  //         <input
  //           className={styles.input}
  //           type="password"
  //           placeholder="password"
  //           required
  //         />
  //         <div className={styles.checkbox}>
  //           <input className={styles.input} type="checkbox" id="signupcheck" />
  //           <label htmlFor="signupcheck">
  //             i accept all terms and conditions
  //           </label>
  //         </div>
  //         <button type="submit" className={styles.input}>
  //           signup
  //         </button>
  //       </form>
  //     </div>
  //     {/* login */}
  //     <div className={`${styles.form} ${styles.login}`}>
  //       <header onClick={handleToggle}>Login</header>
  //       <form>
  //         <input
  //           className={styles.input}
  //           type="text"
  //           placeholder="Email Adress"
  //           required
  //         />
  //         <input
  //           className={styles.input}
  //           type="password"
  //           placeholder="password"
  //           required
  //         />
  //         <a>Forgot password</a>
  //         <button type="submit" className={styles.input}>
  //           login
  //         </button>
  //       </form>
  //     </div>
  //   </section>
  // );
}
