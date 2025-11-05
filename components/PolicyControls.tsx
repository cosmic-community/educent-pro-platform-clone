import { Tenant } from '@/types'
import { Settings, Shield, Clock, Gift, QrCode, Bell } from 'lucide-react'

interface PolicyControlsProps {
  tenant?: Tenant;
}

export default function PolicyControls({ tenant }: PolicyControlsProps) {
  const policies = [
    {
      icon: Clock,
      label: 'Attendance Window',
      value: `${tenant?.metadata?.settings?.attendance_window_minutes || 30} minutes`,
      enabled: true
    },
    {
      icon: Gift,
      label: 'Reward Threshold',
      value: `${tenant?.metadata?.settings?.reward_threshold_days || 60} days`,
      enabled: true
    },
    {
      icon: QrCode,
      label: 'QR Attendance',
      value: tenant?.metadata?.settings?.enable_qr_attendance ? 'Enabled' : 'Disabled',
      enabled: tenant?.metadata?.settings?.enable_qr_attendance || false
    },
    {
      icon: Bell,
      label: 'Parent Notifications',
      value: tenant?.metadata?.settings?.enable_parent_notifications ? 'Enabled' : 'Disabled',
      enabled: tenant?.metadata?.settings?.enable_parent_notifications || false
    },
    {
      icon: Shield,
      label: 'Max Prize Value',
      value: `₹${tenant?.metadata?.settings?.max_prize_value || 5000}`,
      enabled: true
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Policy Controls
      </h2>

      <div className="space-y-3">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                  policy.enabled ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-4 w-4 ${policy.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{policy.label}</span>
              </div>
              <span className={`text-sm font-semibold ${
                policy.enabled ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {policy.value}
              </span>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Update Policies
      </button>
    </div>
  );
}