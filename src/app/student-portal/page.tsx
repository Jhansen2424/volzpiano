"use client";

import { useEffect, useState } from "react";

// The My Music Staff login widget is a legacy script that uses document.write
// to inject its form. After-load document.write would append to <body>, which
// is why we host it inside a srcdoc iframe — the script runs during the
// iframe's initial parse where document.write works correctly.
const MMS_LOGIN_SRCDOC = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base target="_top">
    <style>
      html, body { margin: 0; padding: 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      body { padding: 16px; }
    </style>
  </head>
  <body>
    <script type="text/javascript" src="https://app.mymusicstaff.com/Widget/v2/Login.ashx"></script>
  </body>
</html>`;

export default function StudentPortalPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-zinc-900 pt-24">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #6343d4 0%, transparent 70%)",
          }}
        />
        <div className="relative z-[2] text-center px-6">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease-out 0.2s",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            Student <span className="text-brand">Portal</span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-2xl text-lg text-white/60 sm:text-xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease-out 0.5s",
            }}
          >
            Access your lesson materials, track progress, and stay connected
            with your instructor.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-[1]" />
      </section>

      {/* Portal Login — My Music Staff widget hosted in a srcdoc iframe */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 sm:px-12">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
            <iframe
              id="mms-login-widget"
              title="Volz Piano student portal login"
              srcDoc={MMS_LOGIN_SRCDOC}
              className="w-full border-0"
              style={{ height: "520px", minHeight: "440px" }}
            />
          </div>
          <p className="mt-4 text-center text-xs text-zinc-400">
            Powered by My Music Staff
          </p>
        </div>
      </section>
    </main>
  );
}
