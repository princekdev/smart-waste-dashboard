import { useState } from "react";
import { Trash2, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Field from "../components/Field";

export default function LoginPage() {
  const { login } = useAuth();
  const toast = useToast();
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("Admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      toast("Please fill in all fields", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({ name: name || email.split("@")[0] || "Operator", role, email });
      toast(`Welcome${name ? `, ${name}` : ""} — signed in as ${role}`, "success");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-page__inner">
        <div className="login-page__brand">
          <div className="login-page__brand-mark">
            <Trash2 size={19} color="#0B2E25" strokeWidth={2.2} />
          </div>
          <div>
            <div className="login-page__brand-name">CleanGrid</div>
            <div className="login-page__brand-tag">Civic Ops Console</div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card__tabs">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                className={`login-card__tab ${mode === m ? "is-active" : ""}`}
                onClick={() => setMode(m)}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="login-card__form">
            {mode === "signup" && (
              <Field icon={User} placeholder="Full name" value={name} onChange={setName} />
            )}
            <Field icon={Mail} placeholder="Email address" value={email} onChange={setEmail} type="email" />
            <Field
              icon={Lock}
              placeholder="Password"
              value={password}
              onChange={setPassword}
              type={showPw ? "text" : "password"}
              endIcon={showPw ? EyeOff : Eye}
              onEndIconClick={() => setShowPw((s) => !s)}
            />

            <div className="login-card__role">
              <label>Role</label>
              <div className="login-card__role-options">
                {["Admin", "Operator"].map((r) => (
                  <button
                    type="button"
                    key={r}
                    className={`login-card__role-btn ${role === r ? "is-active" : ""}`}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn--primary login-card__submit" disabled={loading}>
              {loading ? "Signing in…" : mode === "login" ? "Sign in" : "Create account"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>
        </div>

        <p className="login-page__disclaimer">
          Mock authentication for demo purposes. Any email and password will work.
        </p>
      </div>
    </div>
  );
}
