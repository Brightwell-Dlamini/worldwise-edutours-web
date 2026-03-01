'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

type UserType = 'renter' | 'landlord' | 'admin' | null;

type AuthContextType = {
  user: User | null;
  userType: UserType;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUserType: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Define functions inside useEffect to avoid dependency issues
    async function fetchUserType(userId: string) {
      try {
        if (!userId) {
          console.log('No user ID provided');
          setIsLoading(false);
          return;
        }

        console.log('Fetching profile for user:', userId);

        const { data, error } = await supabase
          .from('profiles')
          .select('user_type, email, full_name')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', {
            message: error.message,
            code: error.code,
            details: error.details,
          });
        }

        if (data) {
          console.log('Profile found:', data);
          setUserType(data.user_type);
        } else {
          console.log('No profile found for user, creating one...');
          await createUserProfile(userId);
        }
      } catch (error) {
        console.error(
          'Unexpected error in fetchUserType:',
          error instanceof Error ? error.message : error,
        );
        setUserType('renter');
      } finally {
        setIsLoading(false);
      }
    }

    async function createUserProfile(userId: string) {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) {
          console.error('Error getting user data:', userError);
          return;
        }

        const userEmail = userData.user?.email;

        if (!userEmail) {
          console.error('No email found for user');
          return;
        }

        console.log(
          'Creating profile for user:',
          userId,
          'with email:',
          userEmail,
        );

        const { error: insertError } = await supabase.from('profiles').insert([
          {
            id: userId,
            email: userEmail,
            user_type: 'renter',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error('Error creating user profile:', {
            message: insertError.message,
            code: insertError.code,
            details: insertError.details,
          });

          if (insertError.code === '23505') {
            console.log('Profile might already exist, fetching again...');
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', userId)
              .single();

            if (existingProfile) {
              setUserType(existingProfile.user_type);
            }
          }
        } else {
          console.log('Default profile created for user');
          setUserType('renter');
        }
      } catch (error) {
        console.error(
          'Error in createUserProfile:',
          error instanceof Error ? error.message : error,
        );
      }
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchUserType(currentUser.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchUserType(currentUser.id);
      } else {
        setUserType(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []); // Empty dependency array is now safe because functions are defined inside

  const refreshUserType = async () => {
    if (user) {
      setIsLoading(true);
      // Re-fetch user type logic here
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserType(data.user_type);
      } catch (error) {
        console.error('Error refreshing user type:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <AuthContext.Provider
      value={{ user, userType, isLoading, signOut, refreshUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
