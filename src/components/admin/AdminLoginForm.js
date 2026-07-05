'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browserClient';

export default function AdminLoginForm({ passwordLoginEnabled, errorCode }) {
  const [password, setPassword] = useState('');

  const signInWithGoogle = async () => {
    const supabase = createSupabaseBrowserClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`
      }
    });
  };

  const onPasswordSubmit = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      location.href = '/admin';
    } else {
      alert('Wrong password');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="h3">Login to Access Admin Dashboard</h2>

      {errorCode === 'not_authorized' && (
        <p className="text-red-600">This account is not authorized.</p>
      )}
      {errorCode === 'oauth' && (
        <p className="text-red-600">Sign in failed, please try again.</p>
      )}

      <button onClick={signInWithGoogle} className="btn btn-primary">
        Sign in with Google
      </button>

      {passwordLoginEnabled && (
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            placeholder="Admin password"
            className="admin-field-input"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onPasswordSubmit();
              }
            }}
          />
          <button onClick={onPasswordSubmit} className="btn btn-primary">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
