import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface RoleCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

export default function RoleCard({ title, subtitle, icon: Icon, color, href }: RoleCardProps) {
  return (
    <Link 
      href={href}
      className="block bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
    >
      <div className={`h-16 w-16 ${color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{subtitle}</p>
    </Link>
  );
}