'use client'

import { useState } from 'react'
import { Class, Student, AttendanceRecord } from '@/types'
import { Users, QrCode, Save, Calendar } from 'lucide-react'
import QRCode from 'react-qr-code'

interface AttendancePanelProps {
  currentClass?: Class;
  students: Student[];
  attendanceRecords: AttendanceRecord[];
}

export default function AttendancePanel({ currentClass, students, attendanceRecords }: AttendancePanelProps) {
  const [showQR, setShowQR] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, 'present' | 'absent'>>({});

  if (!currentClass) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center">No class selected</p>
      </div>
    );
  }

  // Filter students by class
  const classStudents = students.filter(student => {
    const studentClass = student.metadata?.class;
    const classId = typeof studentClass === 'object' ? studentClass.id : studentClass;
    return classId === currentClass.id;
  });

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceMarked(prev => ({ ...prev, [studentId]: status }));
  };

  const qrData = JSON.stringify({
    classId: currentClass.id,
    date: new Date().toISOString(),
    timestamp: Date.now()
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Attendance Panel
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowQR(!showQR)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <QrCode className="h-4 w-4 mr-2" />
            {showQR ? 'Hide' : 'Show'} QR Code
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </button>
        </div>
      </div>

      {showQR && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-4">Students can scan this QR code to mark attendance</p>
          <div className="inline-block p-4 bg-white rounded-lg">
            <QRCode value={qrData} size={200} />
          </div>
          <p className="text-xs text-gray-500 mt-4">Valid for 30 minutes</p>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>Class: {currentClass.metadata?.class_name} {currentClass.metadata?.section}</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {classStudents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No students found in this class</p>
        ) : (
          <div className="space-y-2">
            {classStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-semibold text-pink-600">
                      {student.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{student.title}</p>
                    <p className="text-xs text-gray-500">Roll: {student.metadata?.roll_number}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMarkAttendance(student.id, 'present')}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      attendanceMarked[student.id] === 'present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleMarkAttendance(student.id, 'absent')}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      attendanceMarked[student.id] === 'absent'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}