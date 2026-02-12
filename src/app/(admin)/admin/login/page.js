'use client';

import { useState } from 'react';

export default function AdminLoginPage({ params }) {
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
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
      <div className="space-y-4">
        <input
          type="password"
          value={password}
          placeholder="Admin password"
          className="admin-field-input"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
        />
        <button onClick={onSubmit} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}
