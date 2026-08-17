"use client";

interface LoginDataProp {
  email: string;
  password: string;
}

import style from "./loginPage.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setISLoading] = useState<boolean>(false);

  const [isAlert, setIsAlert] = useState(false);

  const [loginData, setLoginData] = useState<LoginDataProp>({
    email: "",
    password: "",
  });

  // HANDLE INPUT CHNAGE
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle submit
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setISLoading(true);

    try {
      const response = await axios.post(`/api/authentication/login`, loginData);
      router.push("/employee");
    } catch (error) {
      console.log(error);
      setIsAlert(true);
    } finally {
      setISLoading(false);
      setTimeout(() => {
        setIsAlert(false);
      }, 3000);
    }
  };

  return (
    <main className={style.login_container}>
      {isAlert && (
        <div
          className="
      fixed
      top-5 right-5
      z-50
      w-[calc(100%-2rem)]
      max-w-md
      animate-[fadeUp_0.4s_ease-out]
    "
        >
          <Alert
            severity="error"
            variant="filled"
            className="rounded-2xl shadow-2xl"
          >
            Invalid email or password. Please try again.
          </Alert>
        </div>
      )}
      <section className={style.login_card}>
        {/* BRAND */}
        <div className={style.brand_section}>
          <div className={style.logo}>WF</div>

          <h1>WorkFlowOS</h1>

          <p>Employee Operations & Business Workflow Platform</p>
        </div>

        {/* LOGIN HEADER */}
        <div className={style.login_header}>
          <h2>Welcome back</h2>

          <p>Sign in to continue to your workspace</p>
        </div>

        {/* LOGIN FORM */}
        <form className={style.login_form} onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className={style.input_group}>
            <label htmlFor="email">Email Address</label>

            <TextField
              id="email"
              type="email"
              placeholder="you@example.com"
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              onChange={handleInput}
            />
          </div>

          {/* PASSWORD */}
          <div className={style.input_group}>
            <div className={style.password_header}>
              <label htmlFor="password">Password</label>

              <Link href="/forgot-password">Forgot password?</Link>
            </div>

            <TextField
              id="password"
              type="password"
              placeholder="Enter your password"
              variant="outlined"
              fullWidth
              size="small"
              name="password"
              onChange={handleInput}
            />
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={style.login_button}
          >
            {isLoading ? "Approving.." : "Sign In"}
          </Button>
        </form>

        {/* ADMIN LOGIN */}
        <div className={style.admin_section}>
          <span>Need administrator access?</span>

          <Link href="/admin">Admin Panel</Link>
        </div>

        {/* FOOTER */}
        <div className={style.footer}>
          <span>© 2026 WorkFlowOS</span>
          <span>•</span>
          <span>Secure Workspace</span>
        </div>
      </section>
    </main>
  );
}
