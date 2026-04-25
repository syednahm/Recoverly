'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  LogOut,
  Save,
  Trash2,
  LogIn,
  ArrowLeft,
  LayoutDashboard,
} from 'lucide-react';

const supabase = createClient();

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [doctor, setDoctor] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: any } }) => {
      setIsLoggedIn(!!data.user);
    });

    const { data: { subscription: listener } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => listener.unsubscribe();
  }, []);

  const showToast = (text: string, type: 'success' | 'error') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      showToast('Please enter your email and password.', 'error');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Logged in successfully!', 'success');
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Logged out successfully.', 'success');
    }
  };

  const handleUpdatePII = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      showToast('You must be logged in to update your information.', 'error');
      return;
    }
    setLoading(true);

    if (password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        showToast(`Password update failed: ${error.message}`, 'error');
        setLoading(false);
        return;
      }
    }

    const updates: Record<string, string> = {};
    if (name) updates.name = name;
    if (age) updates.age = age;
    if (doctor) updates.doctor = doctor;

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from('profiles')       // ← change to your actual table name
        .update(updates)
        .eq('id', user.id);

      if (error) {
        showToast(`Profile update failed: ${error.message}`, 'error');
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    showToast('Information updated successfully!', 'success');
    setPassword('');
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    const res = await fetch('/api/delete-account', { method: 'DELETE' });
    if (!res.ok) {
      showToast('Failed to delete account. Please contact support.', 'error');
      setLoading(false);
      setShowDeleteConfirm(false);
      return;
    }
    await supabase.auth.signOut();
    setLoading(false);
    setShowDeleteConfirm(false);
    showToast('Account deleted successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'default' }),
            'w-full sm:w-auto min-w-[220px] justify-start gap-3 border-sky-200 bg-white px-3 py-2 h-auto min-h-10',
            'text-sm font-semibold text-slate-900 shadow-sm',
            'hover:bg-sky-50 hover:border-sky-300 hover:text-sky-950',
            'focus-visible:ring-2 focus-visible:ring-sky-400/40'
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <LayoutDashboard className="size-[18px]" aria-hidden />
          </span>
          <span className="flex items-center gap-2">
            <ArrowLeft className="size-4 shrink-0 text-sky-600" aria-hidden />
            Back to dashboard
          </span>
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and personal information.</p>
        </div>

        {/* Toast */}
        {toast && (
  <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
    toast.type === 'success'
      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
      : 'bg-red-50 text-red-800 border border-red-200'
  }`}>
    {toast.type === 'success'
      ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
      : <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
    }
    {toast.text}
  </div>
)}

        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Authentication</CardTitle>
            <CardDescription>Manage your login session.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">You are currently logged in.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {loading ? 'Signing out...' : 'Log Out'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleLogin} disabled={loading}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? 'Signing in...' : 'Log In'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>Update your name, password, age, and doctor.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Input
                id="doctor"
                type="text"
                placeholder="Doctor's name"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdatePII} disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
            <CardDescription>Permanently delete your account and all associated data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This action <strong>cannot be undone</strong>. All your data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {loading ? 'Deleting...' : 'Yes, delete my account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}