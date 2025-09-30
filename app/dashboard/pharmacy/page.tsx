import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  Pill, 
  Package, 
  FileText, 
  BarChart3, 
  Users, 
  Shield,
  LogOut,
  User,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';

export default function PharmacyDashboard() {
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
      icon: Package,
      title: 'Inventory Management',
      description: 'Manage medicine stock and supplies',
      color: 'blue',
      href: '/dashboard/pharmacy/inventory'
    },
    {
      icon: FileText,
      title: 'Prescriptions',
      description: 'Process and verify prescriptions',
      color: 'green',
      href: '/dashboard/pharmacy/prescriptions'
    },
    {
      icon: ShoppingCart,
      title: 'Dispensing',
      description: 'Medicine dispensing records',
      color: 'purple',
      href: '/dashboard/pharmacy/dispensing'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Patient and customer records',
      color: 'orange',
      href: '/dashboard/pharmacy/customers'
    },
    {
      icon: BarChart3,
      title: 'Sales Analytics',
      description: 'Pharmacy performance metrics',
      color: 'red',
      href: '/dashboard/pharmacy/analytics'
    },
    {
      icon: AlertTriangle,
      title: 'Stock Alerts',
      description: 'Low stock and expiry notifications',
      color: 'indigo',
      href: '/dashboard/pharmacy/alerts'
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
              <div className="bg-orange-600 p-2 rounded-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MediTouch</h1>
                <p className="text-sm text-gray-500">Pharmacy Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">City Pharmacy</p>
                <p className="text-xs text-gray-500">License: PHA-98765 • 24/7 Service</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-orange-600" />
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-orange-100">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Pill className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Welcome, City Pharmacy!</h2>
              <p className="text-gray-600">Managing medications and patient care.</p>
            </div>
          </div>
          
          {/* Pharmacy Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Total Inventory</p>
              <p className="text-lg font-semibold text-gray-900">1,247 items</p>
              <p className="text-xs text-gray-500">Categories: 28</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Today's Prescriptions</p>
              <p className="text-lg font-semibold text-gray-900">34</p>
              <p className="text-xs text-gray-500">Pending: 8</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-medium">Low Stock Items</p>
              <p className="text-lg font-semibold text-gray-900">12</p>
              <p className="text-xs text-gray-500">Need reorder</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">Expiring Soon</p>
              <p className="text-lg font-semibold text-gray-900">5</p>
              <p className="text-xs text-gray-500">Within 30 days</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, href }) => (
            <button
              key={title}
              onClick={() => router.push(href)}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow border border-gray-200 hover:border-orange-200"
            >
              <div className={`bg-${color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Prescription Verified</p>
                <p className="text-xs text-gray-500">Dr. Smith • Amoxicillin 500mg</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">10 min ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Medicine Dispensed</p>
                <p className="text-xs text-gray-500">Patient: John Doe • 2 items</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">25 min ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                <p className="text-xs text-gray-500">Paracetamol 500mg • Only 15 left</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
