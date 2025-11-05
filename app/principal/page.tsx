import { getTenants, getClasses, getUsersByRole, getDashboardStats, getNotices } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import InstituteOverview from '@/components/InstituteOverview'
import StaffManagement from '@/components/StaffManagement'
import PolicyControls from '@/components/PolicyControls'
import { Users, Building, Settings, TrendingUp } from 'lucide-react'

export default async function PrincipalDashboard() {
  const [tenants, classes, users, stats, notices] = await Promise.all([
    getTenants(),
    getClasses(),
    getUsersByRole(),
    getDashboardStats(),
    getNotices()
  ]);

  // Get first tenant for demo
  const currentTenant = tenants[0];
  
  // Filter users by current tenant
  const tenantUsers = users.filter(user => {
    const userTenant = user.metadata?.tenant;
    const tenantId = typeof userTenant === 'object' ? userTenant.id : userTenant;
    return tenantId === currentTenant?.id;
  });

  const lecturers = tenantUsers.filter(u => u.metadata?.role?.value === 'Lecturer');
  const students = tenantUsers.filter(u => u.metadata?.role?.value === 'Student');

  const principalStats = [
    {
      label: 'Total Staff',
      value: lecturers.length.toString(),
      icon: Users,
      change: 'No change'
    },
    {
      label: 'Total Classes',
      value: classes.length.toString(),
      icon: Building,
      change: '+1 this term'
    },
    {
      label: 'Active Students',
      value: students.length.toString(),
      icon: TrendingUp,
      change: '+15 this month'
    },
    {
      label: 'Active Notices',
      value: notices.filter(n => n.metadata?.active).length.toString(),
      icon: Settings,
      change: '+2 today'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="mr-3 h-8 w-8 text-blue-600" />
            Principal Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            {currentTenant?.metadata?.institute_name} Management
          </p>
        </div>

        {/* Institute Overview */}
        <InstituteOverview tenant={currentTenant} stats={principalStats} />

        {/* Management Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff Management */}
          <StaffManagement staff={lecturers} />

          {/* Policy Controls */}
          <PolicyControls tenant={currentTenant} />
        </div>
      </div>
    </div>
  )
}