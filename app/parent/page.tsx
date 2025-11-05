import { getStudents, getUsersByRole, getNotices } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import ChildCard from '@/components/ChildCard'
import NotificationSettings from '@/components/NotificationSettings'
import NoticeBoard from '@/components/NoticeBoard'
import { Home, Bell } from 'lucide-react'

export default async function ParentDashboard() {
  const [students, parents, notices] = await Promise.all([
    getStudents(),
    getUsersByRole('Parent'),
    getNotices()
  ]);

  // Get first parent and their linked children for demo
  const currentParent = parents[0];
  const linkedChildren = students.filter(student => {
    const linkedParents = student.metadata?.linked_parents;
    if (Array.isArray(linkedParents)) {
      return linkedParents.some(parent => {
        if (typeof parent === 'object' && parent !== null) {
          return parent.id === currentParent?.id;
        }
        return parent === currentParent?.id;
      });
    }
    return false;
  });

  const activeNotices = notices.filter(n => n.metadata?.active && 
    (n.metadata?.target_audience?.includes('Parents') || n.metadata?.target_audience?.includes('All Users'))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Home className="mr-3 h-8 w-8 text-yellow-600" />
            Parent Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome, {currentParent?.metadata?.full_name || 'Parent'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Children Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Children</h2>
              {linkedChildren.length > 0 ? (
                <div className="space-y-4">
                  {linkedChildren.map((child) => (
                    <ChildCard key={child.id} student={child} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-6 text-center text-gray-600">
                  <p>No linked children found. Please use the parent connection code to link your child's account.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <NotificationSettings 
              preferences={currentParent?.metadata?.metadata?.notification_preferences || {
                email: true,
                sms: true,
                app: true
              }}
            />

            {/* Notice Board */}
            <NoticeBoard notices={activeNotices} />
          </div>
        </div>
      </div>
    </div>
  )
}