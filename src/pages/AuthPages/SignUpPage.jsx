import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";

const inputClasses =
  "mt-2 w-full rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-900 outline-none transition placeholder:text-blue-400 focus:border-blue-900 focus:bg-blue-100";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const { register } = useAuth(); const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); if (form.password.length < 8) return setError("Password must have at least 8 characters."); setError(""); setBusy(true); try { await register(form); navigate("/products", { replace: true }); } catch (err) { setError(err.message || "Unable to create your account."); } finally { setBusy(false); } };
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-blue-800">
        Create a NU Bulldog Gear account for faster checkout, order updates, and
        special offers.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
        <Alert>{error}</Alert>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-blue-900"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
            autoComplete="given-name"
            className={inputClasses}
            value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-blue-900"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
            autoComplete="family-name"
            className={inputClasses}
            value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-blue-900"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-blue-900"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength="8"
          />
          <p className="mt-2 text-xs leading-5 text-blue-700">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          {busy ? "Creating…" : "Create Account"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign Up with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-blue-200 pt-6 text-sm text-blue-800">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-blue-900 transition hover:text-blue-800"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
