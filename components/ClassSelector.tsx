import { Class } from '@/types'
import { BookOpen, Users, DoorOpen } from 'lucide-react'

interface ClassSelectorProps {
  classes: Class[];
}

export default function ClassSelector({ classes }: ClassSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Classes</h3>
      
      {classes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No classes assigned</p>
      ) : (
        <div className="space-y-3">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {cls.metadata?.class_name} {cls.metadata?.section}
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600 flex items-center">
                      <DoorOpen className="h-3 w-3 mr-1" />
                      Room {cls.metadata?.room_number}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {cls.metadata?.current_enrollment}/{cls.metadata?.maximum_capacity} students
                    </p>
                  </div>
                </div>
                <BookOpen className="h-5 w-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}