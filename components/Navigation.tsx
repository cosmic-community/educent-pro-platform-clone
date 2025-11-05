import Link from 'next/link'
import { Home, GraduationCap, BookOpen, Users } from 'lucide-react'

export default function Navigation() {
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/student', label: 'Student', icon: GraduationCap },
    { href: '/parent', label: 'Parent', icon: Home },
    { href: '/lecturer', label: 'Lecturer', icon: BookOpen },
    { href: '/principal', label: 'Principal', icon: Users },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Educent Pro</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}