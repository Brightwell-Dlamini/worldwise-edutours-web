// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Home,
  Search,
  User,
  LogIn,
  LogOut,
  Menu,
  LayoutDashboard,
  PlusCircle,
  Clock,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function Header() {
  const router = useRouter();
  const { user, userType, signOut, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    'verified' | 'pending' | null
  >(null);
  const [checkingVerification, setCheckingVerification] = useState(false);

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  const getDashboardLink = () => {
    switch (userType) {
      case 'admin':
        return '/dashboard/admin';
      case 'landlord':
        return '/dashboard/landlord';
      default:
        return '/dashboard/renter';
    }
  };

  // Check landlord verification status when user is a landlord
  useEffect(() => {
    async function checkLandlordVerification() {
      if (!user || userType !== 'landlord') {
        setVerificationStatus(null);
        return;
      }

      setCheckingVerification(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_verified')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setVerificationStatus(data.is_verified ? 'verified' : 'pending');
      } catch (error) {
        console.error('Error checking verification:', error);
        setVerificationStatus('pending');
      } finally {
        setCheckingVerification(false);
      }
    }

    checkLandlordVerification();
  }, [user, userType]);

  const handleListProperty = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Not logged in - redirect to signup with landlord type
      router.push('/auth/signup?type=landlord');
      toast.info('Create a landlord account to list properties', {
        duration: 4000,
      });
      setMobileMenuOpen(false);
      return;
    }

    // Handle different user types
    switch (userType) {
      case 'landlord':
        // Check verification status before allowing access
        if (checkingVerification) {
          toast.loading('Checking account status...', {
            duration: 2000,
          });
          return;
        }

        if (verificationStatus === 'verified') {
          // Verified landlord - can add property
          router.push('/dashboard/landlord/add-property');
        } else {
          // Unverified landlord - show pending message and redirect to dashboard
          toast.error('Account Pending Verification', {
            description:
              'Your landlord account is being verified. You will be able to list properties once approved.',
            duration: 6000,
            action: {
              label: 'View Status',
              onClick: () => router.push('/dashboard/landlord'),
            },
          });
          // Still redirect to dashboard so they can see the pending screen
          router.push('/dashboard/landlord');
        }
        break;

      case 'admin':
        // Admin can create properties directly (bypass verification)
        router.push('/dashboard/admin/properties/new');
        break;

      case 'renter':
        // Renter - show message about needing landlord account
        toast.error('Landlord Account Required', {
          description:
            'You need a landlord account to list properties. Please sign out and create a landlord account.',
          duration: 6000,
          action: {
            label: 'Sign Out',
            onClick: () => signOut(),
          },
        });
        break;

      default:
        router.push('/auth/signup?type=landlord');
    }

    setMobileMenuOpen(false);
  };

  // Helper to get the right label/icon for List Property based on state
  const getListPropertyButtonContent = () => {
    if (!user) {
      return { icon: PlusCircle, text: 'List Property', color: 'text-primary' };
    }

    if (userType === 'landlord') {
      if (checkingVerification) {
        return { icon: Clock, text: 'Checking...', color: 'text-gray-500' };
      }
      if (verificationStatus === 'pending') {
        return {
          icon: Clock,
          text: 'Verification Pending',
          color: 'text-yellow-600',
        };
      }
      if (verificationStatus === 'verified') {
        return {
          icon: PlusCircle,
          text: 'List Property',
          color: 'text-primary',
        };
      }
    }

    return { icon: PlusCircle, text: 'List Property', color: 'text-primary' };
  };

  const buttonContent = getListPropertyButtonContent();
  const ButtonIcon = buttonContent.icon;

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SwaziRent</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/search"
            className="flex items-center space-x-1 hover:text-primary transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Link>

          {/* List Property Link - Desktop */}
          <button
            onClick={handleListProperty}
            disabled={userType === 'landlord' && checkingVerification}
            className={`flex items-center space-x-1 transition-colors font-medium cursor-pointer ${
              buttonContent.color
            } ${
              userType === 'landlord' && checkingVerification
                ? 'opacity-50 cursor-wait'
                : 'hover:opacity-80'
            }`}
          >
            <ButtonIcon className="h-4 w-4" />
            <span>{buttonContent.text}</span>
          </button>

          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-3">
          {!isLoading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {userType}
                        </p>
                        {userType === 'landlord' &&
                          verificationStatus === 'pending' && (
                            <p className="text-xs text-yellow-600 font-medium mt-1">
                              ⏳ Pending Verification
                            </p>
                          )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={getDashboardLink()}
                        className="cursor-pointer"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={signOut}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">
                      <User className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/search"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search className="h-5 w-5" />
                  <span>Search Properties</span>
                </Link>

                {/* List Property in Mobile Menu */}
                <button
                  onClick={handleListProperty}
                  disabled={userType === 'landlord' && checkingVerification}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors w-full text-left ${
                    buttonContent.color
                  } ${
                    userType === 'landlord' && checkingVerification
                      ? 'opacity-50 cursor-wait'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <ButtonIcon className="h-5 w-5" />
                  <span>{buttonContent.text}</span>
                </button>

                <Link
                  href="/about"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>About Us</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Contact</span>
                </Link>

                {!user && (
                  <div className="border-t pt-4 mt-4">
                    <Button className="w-full mb-2" asChild>
                      <Link
                        href="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link
                        href="/auth/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
