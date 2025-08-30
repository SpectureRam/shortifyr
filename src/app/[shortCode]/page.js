'use client'

import { useEffect, useState } from "react";

export default function RedirectPage({ params }) {
  const { shortCode } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortCode}`);
        if (!res.ok) throw new Error("Link not found");

        const data = await res.json();
        if (!data || !data.originalUrl) throw new Error("Invalid response");

        window.location.href = data.originalUrl;
      } catch (err) {
        console.error(err);
        setError("Link not found or backend error");
      } finally {
        setLoading(false);
      }
    };

    redirect();
  }, [shortCode]);

  if (loading) return <p>Redirecting...</p>;
  if (error) return <h1>{error}</h1>;
  return null;
}
