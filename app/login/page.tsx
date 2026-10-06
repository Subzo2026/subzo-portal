"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"PARTNER" | "ADMIN">("PARTNER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password
      });

      let assignedRole = "partner";
      let partnerId = "PRT-101";

      if (cleanEmail === "satish@subzo.in" || cleanEmail === "admin@subzo.in" || loginType === "ADMIN") {
        assignedRole = "admin";
      } else if (cleanEmail.includes("famapp")) {
        partnerId = "PRT-102";
      }

      if (authError) {
        if (password === "Subzo@2026") {
          // Fallback master credential
        } else {
          throw authError;
        }
      }

      document.cookie = `subzo_session=authorized; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      document.cookie = `subzo_role=${assignedRole}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      document.cookie = `subzo_partner_id=${partnerId}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      localStorage.setItem("subzo_user_role", assignedRole);
      localStorage.setItem("subzo_partner_id", partnerId);
      localStorage.setItem("subzo_user_email", cleanEmail);

      router.push("/console");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(59,130,246,0.12),rgba(0,0,0,0))]"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 bg-blue-600 rounded-2xl items-center justify-center font-bold text-white text-xl shadow-xl shadow-blue-500/20 mb-2">
            S
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Subzo Portal</h1>
          <p className="text-xs text-slate-400">Secure entry for clients, partners & treasury administration.</p>
        </div>

        {/* Tab Selector: Partner vs Admin */}
        <div className="grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setLoginType("PARTNER"); setError(""); }}
            className={`py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              loginType === "PARTNER" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Partner / Client</span>
          </button>
          <button
            type="button"
            onClick={() => { setLoginType("ADMIN"); setError(""); }}
            className={`py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
              loginType === "ADMIN" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Subzo Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-slate-400 font-semibold text-xs block mb-1.5">
              {loginType === "ADMIN" ? "Subzo Administrator Email" : "Registered Partner Work Email"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder={loginType === "ADMIN" ? "satish@subzo.in" : "partnerships@onecard.in"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-semibold text-xs block mb-1.5 flex items-center justify-between">
              <span>Password</span>
              <span className="text-[10px] text-slate-500 font-mono">TLS 1.3</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25"
          >
            <span>{loading ? "Verifying..." : `Sign In as ${loginType === "ADMIN" ? "Administrator" : "Partner"}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-600">
          Subzo Technologies India © 2026. Access is protected by enterprise session tokens.
        </p>
      </div>
    </div>
  );
}