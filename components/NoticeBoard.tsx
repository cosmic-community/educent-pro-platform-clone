import { Notice } from '@/types'
import { Bell, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface NoticeBoardProps {
  notices: Notice[];
}

export default function NoticeBoard({ notices }: NoticeBoardProps) {
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'Urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'Medium':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'Urgent':
        return 'border-red-200 bg-red-50';
      case 'High':
        return 'border-orange-200 bg-orange-50';
      case 'Medium':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-gray-600" />
        Notice Board
      </h3>
      
      {notices.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No active notices</p>
      ) : (
        <div className="space-y-3">
          {notices.slice(0, 3).map((notice) => (
            <div 
              key={notice.id} 
              className={`p-3 rounded-lg border ${getPriorityColor(notice.metadata?.priority?.value)}`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getPriorityIcon(notice.metadata?.priority?.value)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {notice.metadata?.notice_title || notice.title}
                  </h4>
                  <div 
                    className="text-xs text-gray-600 mt-1 line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: notice.metadata?.content?.slice(0, 150) || '' 
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}