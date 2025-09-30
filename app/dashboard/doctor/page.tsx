'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Calendar, 
  Video, 
  Shield,
  LogOut,
  User,
  Clock,
  Activity
} from 'lucide-react';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const features = [
    {
      icon: Users,
      title: 'My Patients',
      description: 'Access and manage your patient list',
      color: 'blue',
      href: '/dashboard/doctor/patients'
    },
    {
      icon: FileText,
      title: 'Medical Records',
      description: 'View and update patient records',
      color: 'green',
      href: '/dashboard/doctor/records'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Manage your consultation schedule',
      color: 'purple',
      href: '/dashboard/doctor/appointments'
    },
    {
      icon: Video,
      title: 'Telemedicine',
      description: 'Virtual consultations with patients',
      color: 'orange',
      href: '/dashboard/doctor/telemedicine'
    },
    {
      icon: Activity,
      title: 'Patient Monitoring',
      description: 'Track patient progress and vitals',
      color: 'red',
      href: '/dashboard/doctor/monitoring'
    },
    {
      icon: Clock,
      title: 'On-Call Schedule',
      description: 'Manage your emergency shifts',
      color: 'indigo',
      href: '/dashboard/doctor/on-call'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MediTouch</h1>
                <p className="text-sm text-gray-500">Doctor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                <p className="text-xs text-gray-500">Cardiology • License: MED-12345</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Stethoscope className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome, Dr. Smith!</h2>
              <p className="text-gray-600">Ready for today's consultations and patient care.</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Today's Appointments</p>
              <p className="text-lg font-semibold text-gray-900">8 patients</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Active Patients</p>
              <p className="text-lg font-semibold text-gray-900">142</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">Pending Reviews</p>
              <p className="text-lg font-semibold text-gray-900">3 records</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 font-medium">Urgent Cases</p>
              <p className="text-lg font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, href }) => (
            <button
              key={title}
              onClick={() => router.push(href)}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow border border-gray-200 hover:border-green-200"
            >
              <div className={`bg-${color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">09:00 AM - John Doe</p>
                <p className="text-xs text-gray-500">Follow-up consultation • Room 201</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">10:30 AM - Sarah Wilson</p>
                <p className="text-xs text-gray-500">New patient • Cardiology assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">02:15 PM - Mike Johnson</p>
                <p className="text-xs text-gray-500">Telemedicine consultation</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
