import { LucideIcon } from 'lucide-react'

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface QuickStatsProps {
  stats: Stat[];
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color} mr-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}