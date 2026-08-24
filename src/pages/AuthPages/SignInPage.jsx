import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";

const inputClasses =
  "mt-2 w-full rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-900 outline-none transition placeholder:text-blue-400 focus:border-blue-900 focus:bg-blue-100";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const submit = async (event) => { event.preventDefault(); setError(""); setBusy(true); try { const user = await login(form); const role = String(user.role || user.userRole || "customer").toLowerCase(); navigate(role === "admin" ? "/admin" : location.state?.from || "/products", { replace: true }); } catch (err) { setError(err.message || "Unable to sign in."); } finally { setBusy(false); } };
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-blue-800">
        Welcome back! Sign in to access your orders, saved items, and special
        offers.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
        <Alert>{error}</Alert>
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-blue-900"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-blue-900"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
          />
          <p className="mt-2 text-xs leading-5 text-blue-700">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-blue-800">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-blue-300 accent-blue-900"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-blue-900 transition hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          {busy ? "Signing in…" : "Log In"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-amber-200 pt-6 text-sm text-amber-800">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-amber-900 transition hover:text-amber-800"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
