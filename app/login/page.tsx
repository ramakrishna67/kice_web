"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navigation } from "@/components/navigation";
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Read user from localStorage to determine role
        const stored = localStorage.getItem("kice_auth");
        if (stored) {
          const user = JSON.parse(stored);
          if (user.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/student");
          }
        }
      } else {
        setError(result.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div
          className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ animation: "pulse 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ animation: "pulse 6s ease-in-out infinite 3s" }}
        />

        <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
                <LogIn className="w-8 h-8 text-primary" />
              </div> */}
              <h1 className="text-2xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to access your KICE dashboard
              </p>
            </div>
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border bg-white/50 py-3 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-border bg-white/50 py-3 px-4 pr-12 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>
            {/* Divider
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white/80 px-3 text-muted-foreground">
                  Demo Credentials
                </span>
              </div>
            </div>
            {/* Demo credentials hint 
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                <p className="font-semibold text-primary mb-1">Admin</p>
                <p className="text-muted-foreground">admin@kice.com</p>
                <p className="text-muted-foreground">admin123</p>
              </div>
              <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
                <p className="font-semibold text-accent mb-1">Student</p>
                <p className="text-muted-foreground">student@kice.com</p>
                <p className="text-muted-foreground">student123</p>
              </div>
            </div>*/}
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
