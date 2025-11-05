import { User } from '@/types'
import { Users, Mail, Phone, Award } from 'lucide-react'

interface StaffManagementProps {
  staff: User[];
}

export default function StaffManagement({ staff }: StaffManagementProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Staff Management
      </h2>

      {staff.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No staff members found</p>
      ) : (
        <div className="space-y-3">
          {staff.slice(0, 5).map((member) => (
            <div key={member.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.metadata?.full_name}</p>
                    <p className="text-xs text-gray-600">{member.metadata?.role?.value}</p>
                    <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.metadata?.email}
                      </span>
                    </div>
                  </div>
                </div>
                {member.metadata?.mfa_enabled && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    MFA
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Manage All Staff
      </button>
    </div>
  );
}