import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  Heart, 
  FileText, 
  Pill, 
  Calendar, 
  MapPin, 
  Video, 
  Shield,
  LogOut,
  User,
  Activity,
  Bell,
  Settings
} from 'lucide-react';

export default function PatientDashboard() {
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
      icon: FileText,
      title: 'Medical Records',
      description: 'View your complete medical history',
      color: 'blue',
      href: '/dashboard/patient/records'
    },
    {
      icon: Pill,
      title: 'Medications',
      description: 'Manage prescriptions and drug interactions',
      color: 'green',
      href: '/dashboard/patient/medications'
    },
    {
      icon: Activity,
      title: 'Lab Results',
      description: 'Access test results and analysis',
      color: 'purple',
      href: '/dashboard/patient/labs'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Schedule and manage consultations',
      color: 'orange',
      href: '/dashboard/patient/appointments'
    },
    {
      icon: Video,
      title: 'Telemedicine',
      description: 'Online consultations with doctors',
      color: 'red',
      href: '/dashboard/patient/telemedicine'
    },
    {
      icon: MapPin,
      title: 'Find Care',
      description: 'Locate hospitals and pharmacies',
      color: 'indigo',
      href: '/dashboard/patient/find-care'
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
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MediTouch</h1>
                <p className="text-sm text-gray-500">Patient Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, Patient</p>
                <p className="text-xs text-gray-500">Secure Access</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
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

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            <span>Emergency Mode: Hospitals can access your critical data with your consent</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome to MediTouch!</h2>
              <p className="text-gray-600">Your health information is secure and accessible.</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Health Status</p>
              <p className="text-lg font-semibold text-gray-900">Good</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900">Today</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">Records</p>
              <p className="text-lg font-semibold text-gray-900">Complete</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, href }) => (
            <button
              key={title}
              onClick={() => router.push(href)}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-200"
            >
              <div className={`bg-${color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-200">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Your Data is Protected</h3>
              <p className="text-blue-700 text-sm mt-1">
                All your medical information is encrypted and secure. Only authorized healthcare providers can access your records with your permission.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
