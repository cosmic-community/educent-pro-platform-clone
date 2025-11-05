// Comprehensive type definitions for Educent Pro

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Tenant type with metadata
export interface Tenant extends CosmicObject {
  type: 'tenants';
  metadata: {
    institute_name?: string;
    campus_code?: string;
    board?: {
      key?: string;
      value?: string;
    };
    contact_email?: string;
    contact_phone?: string;
    address?: string;
    timezone?: {
      key?: string;
      value?: string;
    };
    active_status?: boolean;
    subscription_plan?: {
      key?: string;
      value?: string;
    };
    institute_logo?: {
      url: string;
      imgix_url: string;
    };
    settings?: {
      attendance_window_minutes?: number;
      reward_threshold_days?: number;
      enable_qr_attendance?: boolean;
      enable_parent_notifications?: boolean;
      max_prize_value?: number;
    };
  };
}

// User type with role information
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    full_name?: string;
    email?: string;
    role?: {
      key?: string;
      value?: string;
    };
    tenant?: Tenant | string;
    date_of_birth?: string;
    phone_number?: string;
    active_status?: boolean;
    mfa_enabled?: boolean;
    profile_picture?: {
      url: string;
      imgix_url: string;
    };
    metadata?: any;
  };
}

// Student type with academic information
export interface Student extends CosmicObject {
  type: 'students';
  metadata: {
    user_account?: User | string;
    roll_number?: string;
    class?: Class | string;
    parent_connection_code?: string;
    linked_parents?: User[] | string[];
    attendance_summary?: {
      total_days?: number;
      present_days?: number;
      absent_days?: number;
      attendance_percentage?: number;
    };
    current_streak?: number;
    total_present_days?: number;
    total_absent_days?: number;
    reward_eligibility?: boolean;
    academic_performance?: {
      overall_grade?: string;
      subjects?: Record<string, number>;
    };
  };
}

// Class type with schedule
export interface Class extends CosmicObject {
  type: 'classes';
  metadata: {
    class_name?: string;
    section?: string;
    grade_level?: {
      key?: string;
      value?: string;
    };
    tenant?: Tenant | string;
    class_teacher?: User | string;
    subject_teachers?: User[] | string[];
    room_number?: string;
    maximum_capacity?: number;
    current_enrollment?: number;
    schedule?: Record<string, string[]>;
  };
}

// Attendance Record type
export interface AttendanceRecord extends CosmicObject {
  type: 'attendance-records';
  metadata: {
    tenant?: Tenant | string;
    class?: Class | string;
    date?: string;
    marked_by?: User | string;
    attendance_entries?: Array<{
      student_id: string;
      status: string;
      time: string | null;
    }>;
    total_present?: number;
    total_absent?: number;
    manual_overrides?: any;
    qr_code_used?: boolean;
    timestamp?: string;
  };
}

// Notice type
export interface Notice extends CosmicObject {
  type: 'notices';
  metadata: {
    notice_title?: string;
    content?: string;
    tenant?: Tenant | string;
    priority?: {
      key?: string;
      value?: string;
    };
    target_audience?: string[];
    posted_by?: User | string;
    attachments?: any[];
    active?: boolean;
    expiry_date?: string;
  };
}

// Audit Log type
export interface AuditLog extends CosmicObject {
  type: 'audit-logs';
  metadata: {
    tenant?: Tenant | string;
    user?: User | string;
    action?: {
      key?: string;
      value?: string;
    };
    entity_type?: string;
    entity_id?: string;
    before_state?: any;
    after_state?: any;
    ip_address?: string;
    user_agent?: string;
    timestamp?: string;
  };
}

// Reward Record type
export interface RewardRecord extends CosmicObject {
  type: 'reward-records';
  metadata: {
    tenant?: Tenant | string;
    student?: Student | string;
    request_date?: string;
    eligibility_window?: any;
    seed_hash?: string;
    prize_type?: {
      key?: string;
      value?: string;
    };
    prize_value?: number;
    prize_description?: string;
    status?: {
      key?: string;
      value?: string;
    };
    approval_chain?: any;
    rejection_reason?: string;
    disbursement_details?: any;
  };
}

// Type literals for select dropdowns
export type UserRole = 'Main Admin' | 'Principal' | 'Lecturer' | 'Parent' | 'Student' | 
                       'Branch Admin' | 'Treasurer' | 'Librarian' | 'Transport Manager' | 'Counselor';

export type BoardType = 'CBSE' | 'ICSE' | 'State Board' | 'International Baccalaureate';

export type SubscriptionPlan = 'Starter' | 'Professional' | 'Enterprise';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guard functions
export function isTenant(obj: CosmicObject): obj is Tenant {
  return obj.type === 'tenants';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isStudent(obj: CosmicObject): obj is Student {
  return obj.type === 'students';
}

// Helper function for type error handling
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Dashboard statistics type
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  presentToday: number;
  averageAttendance: number;
  pendingRewards: number;
  activeNotices: number;
}

// Role color mapping
export const roleColors: Record<string, string> = {
  'Main Admin': 'bg-purple-100 text-purple-800',
  'Principal': 'bg-blue-100 text-blue-800',
  'Lecturer': 'bg-green-100 text-green-800',
  'Parent': 'bg-yellow-100 text-yellow-800',
  'Student': 'bg-pink-100 text-pink-800',
  'Branch Admin': 'bg-indigo-100 text-indigo-800',
  'Treasurer': 'bg-orange-100 text-orange-800',
  'Librarian': 'bg-teal-100 text-teal-800',
  'Transport Manager': 'bg-gray-100 text-gray-800',
  'Counselor': 'bg-cyan-100 text-cyan-800',
};