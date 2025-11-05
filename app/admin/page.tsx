import { getTenants, getDashboardStats, getAuditLogs, getUsersByRole } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import StatsGrid from '@/components/StatsGrid'
import TenantList from '@/components/TenantList'
import AuditTable from '@/components/AuditTable'
import { Shield, Building2, Users, FileCheck } from 'lucide-react'

export default async function AdminDashboard() {
  const [tenants, stats, auditLogs, admins] = await Promise.all([
    getTenants(),
    getDashboardStats(),
    getAuditLogs(),
    getUsersByRole('Main Admin')
  ]);

  const adminStats = [
    {
      label: 'Total Institutes',
      value: tenants.length.toString(),
      icon: Building2,
      change: '+2 this month'
    },
    {
      label: 'Total Users',
      value: (stats.totalStudents + stats.totalTeachers).toString(),
      icon: Users,
      change: '+45 this week'
    },
    {
      label: 'System Admins',
      value: admins.length.toString(),
      icon: Shield,
      change: 'No change'
    },
    {
      label: 'Audit Events',
      value: auditLogs.length.toString(),
      icon: FileCheck,
      change: '+128 today'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-3 h-8 w-8 text-purple-600" />
            Admin HQ Dashboard
          </h1>
          <p className="text-gray-600 mt-2">System-wide management and monitoring</p>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={adminStats} />

        {/* Tenant Management */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Institute Management</h2>
            </div>
            <TenantList tenants={tenants} />
          </div>
        </div>

        {/* Audit Logs */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Audit Events</h2>
            </div>
            <AuditTable auditLogs={auditLogs.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  )
}