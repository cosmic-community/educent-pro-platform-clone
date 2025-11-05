import Link from 'next/link'
import { getTenants, getUsersByRole, getDashboardStats } from '@/lib/cosmic'
import { GraduationCap, Users, BookOpen, Home, ChevronRight, Award, Clock, CheckCircle, BarChart3 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import RoleCard from '@/components/RoleCard'
import MetricCard from '@/components/MetricCard'

export default async function HomePage() {
  const [tenants, stats] = await Promise.all([
    getTenants(),
    getDashboardStats()
  ]);

  const activeTenants = tenants.filter(t => t.metadata?.active_status);

  const roles = [
    {
      title: 'Student Portal',
      subtitle: 'Track attendance, view grades, request rewards',
      icon: GraduationCap,
      color: 'bg-pink-500',
      href: '/student'
    },
    {
      title: 'Parent Dashboard',
      subtitle: 'Monitor child\'s progress and attendance',
      icon: Home,
      color: 'bg-yellow-500',
      href: '/parent'
    },
    {
      title: 'Lecturer Panel',
      subtitle: 'Mark attendance, manage classes, verify rewards',
      icon: BookOpen,
      color: 'bg-green-500',
      href: '/lecturer'
    },
    {
      title: 'Principal Dashboard',
      subtitle: 'Institute management and oversight',
      icon: Users,
      color: 'bg-blue-500',
      href: '/principal'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Educent Pro Platform
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Comprehensive multi-tenant institute management with real-time attendance tracking, 
                reward systems, and role-based dashboards for educational excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  Admin HQ
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                >
                  See Demo
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <RoleCard key={role.title} {...role} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Active Institutes"
              value={activeTenants.length.toString()}
              icon={Home}
              trend="up"
              trendValue="+12%"
            />
            <MetricCard
              title="Total Students"
              value={stats.totalStudents.toString()}
              icon={GraduationCap}
              trend="up"
              trendValue="+8%"
            />
            <MetricCard
              title="Avg Attendance"
              value={`${stats.averageAttendance}%`}
              icon={CheckCircle}
              trend="up"
              trendValue="+3%"
            />
            <MetricCard
              title="Active Notices"
              value={stats.activeNotices.toString()}
              icon={BarChart3}
              trend="neutral"
              trendValue="0%"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Attendance</h3>
              <p className="text-gray-600">QR code and manual attendance marking with instant updates across all dashboards.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reward System</h3>
              <p className="text-gray-600">Automated eligibility based on 60-day attendance streaks with approval workflow.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Tenant Architecture</h3>
              <p className="text-gray-600">Complete tenant isolation with campus-specific data and settings management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Tenants Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Active Institutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTenants.map((tenant) => (
              <div key={tenant.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tenant.metadata?.institute_name}</h3>
                    <p className="text-sm text-gray-600">{tenant.metadata?.campus_code}</p>
                  </div>
                  <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full">
                    {tenant.metadata?.subscription_plan?.value || 'Active'}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Board: {tenant.metadata?.board?.value}</p>
                  <p>Email: {tenant.metadata?.contact_email}</p>
                  <p>Phone: {tenant.metadata?.contact_phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}