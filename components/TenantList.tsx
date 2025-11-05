import { Tenant } from '@/types'
import { Building2, Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react'

interface TenantListProps {
  tenants: Tenant[];
}

export default function TenantList({ tenants }: TenantListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Institute
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tenants.map((tenant) => (
            <tr key={tenant.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tenant.metadata?.institute_name}</p>
                  <p className="text-xs text-gray-500">{tenant.metadata?.campus_code}</p>
                  <p className="text-xs text-gray-500">{tenant.metadata?.board?.value}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {tenant.metadata?.contact_email}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {tenant.metadata?.contact_phone}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {tenant.metadata?.subscription_plan?.value}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {tenant.metadata?.active_status ? (
                  <span className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center text-xs text-red-600">
                    <XCircle className="h-4 w-4 mr-1" />
                    Inactive
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}