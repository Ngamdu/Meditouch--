'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Mock user data - in real app, this would come from Firestore
const mockUserData = {
  role: 'patient', // This would be dynamic
  name: 'John Doe',
  isVerified: true
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Route to appropriate dashboard based on user role
  const userRole = mockUserData.role;

  if (userRole === 'patient') {
    router.push('/dashboard/patient');
  } else if (userRole === 'doctor') {
    router.push('/dashboard/doctor');
  } else if (userRole === 'nurse') {
    router.push('/dashboard/nurse');
  } else if (userRole === 'hospital') {
    router.push('/dashboard/hospital');
  } else if (userRole === 'pharmacy') {
    router.push('/dashboard/pharmacy');
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-800">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
