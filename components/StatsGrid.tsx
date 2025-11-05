import { LucideIcon } from 'lucide-react'

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  change?: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
              {stat.change && (
                <span className="text-xs text-gray-500">{stat.change}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}