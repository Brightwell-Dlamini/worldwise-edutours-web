'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// After creating the profile, send welcome email
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { render } from '@react-email/components';
import { sendEmail } from '@/lib/email';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Building } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    userType: 'renter' as 'renter' | 'landlord',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            user_type: formData.userType,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Try to send welcome email, but don't block if it fails
        try {
          const emailHtml = await render(
            WelcomeEmail({
              name: formData.fullName,
              userType: formData.userType,
            }),
          );
          await sendEmail({
            to: formData.email,
            subject: 'Welcome to SwaziRent!',
            html: emailHtml,
          });
        } catch (emailError) {
          // Log email error but don't stop the signup process
          console.error('Failed to send welcome email:', emailError);
        }

        // Redirect based on user type
        if (formData.userType === 'landlord') {
          router.push('/dashboard/landlord/pending-verification');
        } else {
          router.push('/dashboard/renter');
        }
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during signup';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Join SwaziRent to find or list properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={
                    formData.userType === 'renter' ? 'default' : 'outline'
                  }
                  className={`h-20 flex flex-col items-center justify-center space-y-1 ${
                    formData.userType === 'renter'
                      ? 'bg-primary text-white'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, userType: 'renter' })
                  }
                >
                  <User className="h-6 w-6" />
                  <span>I&apos;m a Renter</span>
                </Button>
                <Button
                  type="button"
                  variant={
                    formData.userType === 'landlord' ? 'default' : 'outline'
                  }
                  className={`h-20 flex flex-col items-center justify-center space-y-1 ${
                    formData.userType === 'landlord'
                      ? 'bg-primary text-white'
                      : ''
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, userType: 'landlord' })
                  }
                >
                  <Building className="h-6 w-6" />
                  <span>I&apos;m a Landlord</span>
                </Button>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Thabo Dlamini"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
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

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+268 76XX XXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
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
                <p className="text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
