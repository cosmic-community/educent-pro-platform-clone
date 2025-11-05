import { getStudents, getNotices, getAttendanceRecords } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import AttendanceStreak from '@/components/AttendanceStreak'
import RewardEligibility from '@/components/RewardEligibility'
import AcademicPerformance from '@/components/AcademicPerformance'
import NoticeBoard from '@/components/NoticeBoard'
import { GraduationCap } from 'lucide-react'

export default async function StudentDashboard() {
  const [students, notices, attendance] = await Promise.all([
    getStudents(),
    getNotices(),
    getAttendanceRecords()
  ]);

  // Get first student for demo
  const currentStudent = students[0];
  const activeNotices = notices.filter(n => n.metadata?.active && 
    (n.metadata?.target_audience?.includes('Students') || n.metadata?.target_audience?.includes('All Users'))
  );

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">No student data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-pink-600" />
            Student Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {currentStudent.title}!</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Streak */}
            <AttendanceStreak 
              currentStreak={currentStudent.metadata?.current_streak || 0}
              totalPresent={currentStudent.metadata?.total_present_days || 0}
              totalAbsent={currentStudent.metadata?.total_absent_days || 0}
              attendancePercentage={currentStudent.metadata?.attendance_summary?.attendance_percentage || 0}
            />

            {/* Academic Performance */}
            <AcademicPerformance 
              overallGrade={currentStudent.metadata?.academic_performance?.overall_grade || 'N/A'}
              subjects={currentStudent.metadata?.academic_performance?.subjects || {}}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Reward Eligibility */}
            <RewardEligibility 
              eligible={currentStudent.metadata?.reward_eligibility || false}
              currentStreak={currentStudent.metadata?.current_streak || 0}
              requiredStreak={60}
            />

            {/* Notice Board */}
            <NoticeBoard notices={activeNotices} />
          </div>
        </div>
      </div>
    </div>
  )
}