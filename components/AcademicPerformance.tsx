import { BookOpen, TrendingUp, Award } from 'lucide-react'

interface AcademicPerformanceProps {
  overallGrade: string;
  subjects: Record<string, number>;
}

export default function AcademicPerformance({ overallGrade, subjects }: AcademicPerformanceProps) {
  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Academic Performance</h2>
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <span className="text-2xl font-bold text-gray-900">Grade {overallGrade}</span>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(subjects).map(([subject, score]) => (
          <div key={subject} className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <BookOpen className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700 capitalize flex-1">
                {subject.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className={`text-sm font-semibold px-2 py-1 rounded ${getGradeColor(score)}`}>
                {score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}