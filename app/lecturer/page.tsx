import { getClasses, getAttendanceRecords, getUsersByRole, getStudents } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import AttendancePanel from '@/components/AttendancePanel'
import ClassSelector from '@/components/ClassSelector'
import QuickStats from '@/components/QuickStats'
import { BookOpen, Users, CheckCircle, Clock } from 'lucide-react'

export default async function LecturerDashboard() {
  const [classes, attendance, lecturers, students] = await Promise.all([
    getClasses(),
    getAttendanceRecords(),
    getUsersByRole('Lecturer'),
    getStudents()
  ]);

  // Get first lecturer for demo
  const currentLecturer = lecturers[0];
  
  // Get classes assigned to this lecturer
  const assignedClasses = classes.filter(cls => {
    const teacher = cls.metadata?.class_teacher;
    const teacherId = typeof teacher === 'object' ? teacher.id : teacher;
    return teacherId === currentLecturer?.id;
  });

  const todayAttendance = attendance[0];
  
  const stats = [
    {
      label: 'Classes Today',
      value: assignedClasses.length.toString(),
      icon: BookOpen,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Total Students',
      value: students.length.toString(),
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Present Today',
      value: todayAttendance?.metadata?.total_present?.toString() || '0',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      label: 'Pending Verifications',
      value: '0',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen className="mr-3 h-8 w-8 text-green-600" />
            Lecturer Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome, {currentLecturer?.metadata?.full_name || 'Lecturer'}
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class Selector */}
          <div className="lg:col-span-1">
            <ClassSelector classes={assignedClasses} />
          </div>

          {/* Attendance Panel */}
          <div className="lg:col-span-2">
            <AttendancePanel 
              currentClass={assignedClasses[0]}
              students={students}
              attendanceRecords={attendance}
            />
          </div>
        </div>
      </div>
    </div>
  )
}