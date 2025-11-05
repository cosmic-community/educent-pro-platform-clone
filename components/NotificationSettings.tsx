import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'

interface NotificationSettingsProps {
  preferences: {
    email?: boolean;
    sms?: boolean;
    app?: boolean;
  };
}

export default function NotificationSettings({ preferences }: NotificationSettingsProps) {
  const settings = [
    { key: 'email', label: 'Email Notifications', icon: Mail, enabled: preferences.email },
    { key: 'sms', label: 'SMS Alerts', icon: MessageSquare, enabled: preferences.sms },
    { key: 'app', label: 'App Notifications', icon: Smartphone, enabled: preferences.app },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-gray-600" />
        Notification Preferences
      </h3>
      
      <div className="space-y-3">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div key={setting.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Icon className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700">{setting.label}</span>
              </div>
              <div className={`w-10 h-6 rounded-full ${setting.enabled ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`absolute top-1 ${setting.enabled ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`} />
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="mt-4 w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
        Update Preferences
      </button>
    </div>
  );
}