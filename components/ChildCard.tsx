import { Student } from '@/types'
import { User, BookOpen, Award, TrendingUp } from 'lucide-react'

interface ChildCardProps {
  student: Student;
}

export default function ChildCard({ student }: ChildCardProps) {
  const attendance = student.metadata?.attendance_summary?.attendance_percentage || 0;
  const currentStreak = student.metadata?.current_streak || 0;
  const isEligible = student.metadata?.reward_eligibility || false;
  
  // Get class info
  const classInfo = typeof student.metadata?.class === 'object' 
    ? `${student.metadata.class.metadata?.class_name} ${student.metadata.class.metadata?.section}`
    : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-pink-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{student.title}</h3>
            <p className="text-sm text-gray-600">Roll No: {student.metadata?.roll_number}</p>
          </div>
        </div>
        {isEligible && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Reward Eligible
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <BookOpen className="h-5 w-5 text-gray-400 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Class</p>
          <p className="text-sm font-semibold text-gray-900">{classInfo}</p>
        </div>
        
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Attendance</p>
          <p className="text-sm font-semibold text-blue-600">{attendance.toFixed(1)}%</p>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <Award className="h-5 w-5 text-orange-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Streak</p>
          <p className="text-sm font-semibold text-orange-600">{currentStreak} days</p>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Award className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Grade</p>
          <p className="text-sm font-semibold text-green-600">
            {student.metadata?.academic_performance?.overall_grade || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}