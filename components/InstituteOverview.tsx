import { Tenant } from '@/types'
import { Building2, Mail, Phone, MapPin, Settings } from 'lucide-react'
import StatsGrid from './StatsGrid'

interface InstituteOverviewProps {
  tenant?: Tenant;
  stats: any[];
}

export default function InstituteOverview({ tenant, stats }: InstituteOverviewProps) {
  if (!tenant) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Institute Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Institute Details
            </h2>
            <p className="text-sm text-gray-600 mt-1">{tenant.metadata?.campus_code}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            {tenant.metadata?.active_status ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <Mail className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Email</p>
                <p className="text-sm text-gray-900">{tenant.metadata?.contact_email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Phone</p>
                <p className="text-sm text-gray-900">{tenant.metadata?.contact_phone}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Address</p>
                <p className="text-sm text-gray-900">{tenant.metadata?.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Settings className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Plan</p>
                <p className="text-sm text-gray-900">{tenant.metadata?.subscription_plan?.value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <StatsGrid stats={stats} />
    </div>
  );
}