'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail } from 'lucide-react';

// Define a type for the error
type AuthError = {
  message: string;
  status?: number;
};

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUnconfirmedEmail(null);
    setResendSuccess(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Check if the error is about email not confirmed
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setUnconfirmedEmail(formData.email);
          throw new Error(
            'Please confirm your email address before logging in. Check your inbox for the confirmation link.',
          );
        }
        throw error;
      }

      // Get user type to redirect appropriately
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();

      if (profile?.user_type === 'admin') {
        router.push('/dashboard/admin');
      } else if (profile?.user_type === 'landlord') {
        router.push('/dashboard/landlord');
      } else {
        router.push('/dashboard/renter');
      }
    } catch (error: unknown) {
      // Type assertion for the error
      const authError = error as AuthError;
      setError(authError.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendConfirmation() {
    if (!unconfirmedEmail) return;

    setResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unconfirmedEmail,
      });

      if (error) throw error;

      setResendSuccess(true);
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(authError.message || 'Failed to resend confirmation email');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Log in to your SwaziRent account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resendSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <Mail className="h-4 w-4 text-green-600 mr-2" />
                  <AlertDescription className="text-green-800">
                    Confirmation email sent! Please check your inbox.
                  </AlertDescription>
                </Alert>
              )}

              {unconfirmedEmail && !resendSuccess && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertDescription className="space-y-2">
                    <p className="text-yellow-800">
                      This email hasn&apos;t been confirmed yet.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResendConfirmation}
                      disabled={resending}
                      className="bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
                    >
                      {resending ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Resend Confirmation Email'
                      )}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              <Link
                href="/auth/forgot-password"
                className="text-primary hover:underline block mb-2"
              >
                Forgot your password?
              </Link>
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
