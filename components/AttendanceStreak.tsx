import { Flame, TrendingUp, Calendar, Award } from 'lucide-react'

interface AttendanceStreakProps {
  currentStreak: number;
  totalPresent: number;
  totalAbsent: number;
  attendancePercentage: number;
}

export default function AttendanceStreak({ 
  currentStreak, 
  totalPresent, 
  totalAbsent, 
  attendancePercentage 
}: AttendanceStreakProps) {
  const isEligible = currentStreak >= 60;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak Display */}
        <div className={`p-4 rounded-lg ${isEligible ? 'bg-gradient-to-br from-orange-50 to-red-50' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Current Streak</span>
            <Flame className={`h-6 w-6 ${isEligible ? 'text-orange-500 animate-pulse-slow' : 'text-gray-400'}`} />
          </div>
          <p className={`text-3xl font-bold ${isEligible ? 'text-orange-600' : 'text-gray-900'}`}>
            {currentStreak} days
          </p>
          {isEligible && (
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Eligible for rewards!
            </p>
          )}
        </div>

        {/* Attendance Stats */}
        <div className="p-4 rounded-lg bg-blue-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Overall Attendance</span>
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{attendancePercentage.toFixed(1)}%</p>
          <div className="mt-2 text-xs text-gray-600">
            <span className="text-green-600">{totalPresent} present</span> • 
            <span className="text-red-600 ml-1">{totalAbsent} absent</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress to 60-day goal</span>
          <span>{Math.min(currentStreak, 60)}/60 days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((currentStreak / 60) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}