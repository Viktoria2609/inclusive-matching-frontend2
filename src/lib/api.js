export const API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

export async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try { const j = await res.json(); if (j?.detail) detail = j.detail; } catch {}
    throw new Error(detail);
  }
  return res.json();
}