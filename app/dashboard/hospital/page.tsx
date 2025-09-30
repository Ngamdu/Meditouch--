import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  Building, 
  Users, 
  Bed, 
  Calendar, 
  BarChart3, 
  Shield,
  LogOut,
  User,
  Stethoscope,
  Ambulance
} from 'lucide-react';

export default function HospitalDashboard() {
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
      title: 'Staff Management',
      description: 'Manage doctors, nurses, and hospital staff',
      color: 'blue',
      href: '/dashboard/hospital/staff'
    },
    {
      icon: Bed,
      title: 'Bed Management',
      description: 'Monitor bed availability and admissions',
      color: 'green',
      href: '/dashboard/hospital/beds'
    },
    {
      icon: Stethoscope,
      title: 'Patient Records',
      description: 'Access hospital-wide patient data',
      color: 'purple',
      href: '/dashboard/hospital/patients'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Manage hospital scheduling system',
      color: 'orange',
      href: '/dashboard/hospital/appointments'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Hospital performance and insights',
      color: 'red',
      href: '/dashboard/hospital/analytics'
    },
    {
      icon: Ambulance,
      title: 'Emergency Dept',
      description: 'Emergency cases and triage',
      color: 'indigo',
      href: '/dashboard/hospital/emergency'
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
              <div className="bg-red-600 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MediTouch</h1>
                <p className="text-sm text-gray-500">Hospital Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">General Hospital</p>
                <p className="text-xs text-gray-500">License: HOS-54321 • 500 Beds</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-red-100">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Building className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome, General Hospital!</h2>
              <p className="text-gray-600">Managing healthcare delivery for our community.</p>
            </div>
          </div>
          
          {/* Hospital Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Total Beds</p>
              <p className="text-lg font-semibold text-gray-900">500</p>
              <p className="text-xs text-gray-500">Available: 45</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Medical Staff</p>
              <p className="text-lg font-semibold text-gray-900">287</p>
              <p className="text-xs text-gray-500">Doctors: 85, Nurses: 202</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">Current Patients</p>
              <p className="text-lg font-semibold text-gray-900">455</p>
              <p className="text-xs text-gray-500">Admitted today: 12</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 font-medium">Emergency Cases</p>
              <p className="text-lg font-semibold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Waiting: 3</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, href }) => (
            <button
              key={title}
              onClick={() => router.push(href)}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow border border-gray-200 hover:border-red-200"
            >
              <div className={`bg-${color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Stethoscope className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Cardiology</p>
              <p className="text-sm text-gray-600">32 patients</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Pediatrics</p>
              <p className="text-sm text-gray-600">28 patients</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Surgery</p>
              <p className="text-sm text-gray-600">15 patients</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Ambulance className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Emergency</p>
              <p className="text-sm text-gray-600">8 cases</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
