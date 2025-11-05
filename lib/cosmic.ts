import { createBucketClient } from '@cosmicjs/sdk';
import type { 
  Tenant, 
  User, 
  Student, 
  Class, 
  AttendanceRecord, 
  Notice, 
  AuditLog,
  RewardRecord,
  CosmicResponse,
  hasStatus 
} from '@/types';

// Initialize Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatusCode(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all tenants
export async function getTenants(): Promise<Tenant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tenants' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Tenant[];
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tenants');
  }
}

// Fetch users by role
export async function getUsersByRole(role?: string): Promise<User[]> {
  try {
    const query: Record<string, any> = { type: 'users' };
    if (role) {
      query['metadata.role.value'] = role;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    return response.objects as User[];
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch users');
  }
}

// Fetch students
export async function getStudents(): Promise<Student[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'students' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    return response.objects as Student[];
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch students');
  }
}

// Fetch classes
export async function getClasses(): Promise<Class[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'classes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    return response.objects as Class[];
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch classes');
  }
}

// Fetch attendance records
export async function getAttendanceRecords(): Promise<AttendanceRecord[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'attendance-records' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    // Manual sorting by date (newest first)
    const records = response.objects as AttendanceRecord[];
    return records.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime();
      const dateB = new Date(b.metadata?.date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch attendance records');
  }
}

// Fetch notices
export async function getNotices(): Promise<Notice[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'notices' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    // Manual sorting by created date (newest first)
    const notices = response.objects as Notice[];
    return notices.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch notices');
  }
}

// Fetch audit logs
export async function getAuditLogs(): Promise<AuditLog[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'audit-logs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    // Manual sorting by timestamp (newest first)
    const logs = response.objects as AuditLog[];
    return logs.sort((a, b) => {
      const dateA = new Date(a.metadata?.timestamp || a.created_at || '').getTime();
      const dateB = new Date(b.metadata?.timestamp || b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch audit logs');
  }
}

// Fetch reward records
export async function getRewardRecords(): Promise<RewardRecord[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reward-records' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    
    return response.objects as RewardRecord[];
  } catch (error) {
    if (hasStatusCode(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reward records');
  }
}

// Calculate dashboard statistics
export async function getDashboardStats(tenantId?: string) {
  try {
    const [students, users, attendance, notices] = await Promise.all([
      getStudents(),
      getUsersByRole('Lecturer'),
      getAttendanceRecords(),
      getNotices()
    ]);

    // Filter by tenant if provided
    const filteredStudents = tenantId 
      ? students.filter(s => {
          const userAccount = s.metadata?.user_account;
          if (typeof userAccount === 'object' && userAccount !== null) {
            const tenant = userAccount.metadata?.tenant;
            const tenantIdMatch = typeof tenant === 'object' ? tenant.id === tenantId : tenant === tenantId;
            return tenantIdMatch;
          }
          return false;
        })
      : students;

    const filteredTeachers = tenantId
      ? users.filter(u => {
          const tenant = u.metadata?.tenant;
          return typeof tenant === 'object' ? tenant.id === tenantId : tenant === tenantId;
        })
      : users;

    // Calculate present today from latest attendance record
    const todayAttendance = attendance[0];
    const presentToday = todayAttendance?.metadata?.total_present || 0;

    // Calculate average attendance
    const avgAttendance = filteredStudents.reduce((acc, student) => {
      return acc + (student.metadata?.attendance_summary?.attendance_percentage || 0);
    }, 0) / (filteredStudents.length || 1);

    // Active notices count
    const activeNotices = notices.filter(n => n.metadata?.active).length;

    return {
      totalStudents: filteredStudents.length,
      totalTeachers: filteredTeachers.length,
      presentToday,
      averageAttendance: Math.round(avgAttendance),
      pendingRewards: 0, // No reward records in current data
      activeNotices
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      totalStudents: 0,
      totalTeachers: 0,
      presentToday: 0,
      averageAttendance: 0,
      pendingRewards: 0,
      activeNotices: 0
    };
  }
}