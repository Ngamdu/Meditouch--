'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  User, 
  Users, 
  FileText, 
  Activity, 
  Clock, 
  Shield,
  LogOut,
  Heart,
  AlertTriangle
} from 'lucide-react';

export default function NurseDashboard() {
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
      title: 'Patient Rounds',
      description: 'Manage daily patient visits and care',
      color: 'blue',
      href: '/dashboard/nurse/rounds'
    },
    {
      icon: Activity,
      title: 'Vital Signs',
      description: 'Record and monitor patient vitals',
      color: 'green',
      href: '/dashboard/nurse/vitals'
    },
    {
      icon: FileText,
      title: 'Nursing Notes',
      description: 'Document patient care and observations',
      color: 'purple',
      href: '/dashboard/nurse/notes'
    },
    {
      icon: Heart,
      title: 'Medication Admin',
      description: 'Manage medication schedules',
      color: 'red',
      href: '/dashboard/nurse/medications'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Cases',
      description: 'Handle urgent patient situations',
      color: 'orange',
      href: '/dashboard/nurse/emergency'
    },
    {
      icon: Clock,
      title: 'Shift Handover',
      description: 'Coordinate with nursing team',
      color: 'indigo',
      href: '/dashboard/nurse/shift-handover'
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
              <div className="bg-purple-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MediTouch</h1>
                <p className="text-sm text-gray-500">Nurse Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Nurse Johnson</p>
                <p className="text-xs text-gray-500">RN • Ward 3B • License: NUR-67890</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome, Nurse Johnson!</h2>
              <p className="text-gray-600">Ready for today's patient care activities.</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Assigned Patients</p>
              <p className="text-lg font-semibold text-gray-900">12</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Medications Due</p>
              <p className="text-lg font-semibold text-gray-900">8</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">Vitals to Record</p>
              <p className="text-lg font-semibold text-gray-900">5</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">Priority Cases</p>
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
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow border border-gray-200 hover:border-purple-200"
            >
              <div className={`bg-${color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>

        {/* Current Shift Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Shift Tasks</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Room 301 - Vitals Check</p>
                <p className="text-xs text-gray-500">Patient: John Doe • Due: 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Heart className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Medication Round</p>
                <p className="text-xs text-gray-500">Ward 3B • 8 medications scheduled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <FileText className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Documentation</p>
                <p className="text-xs text-gray-500">3 nursing notes pending</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
