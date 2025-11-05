import { Trophy, Gift, Lock, ChevronRight } from 'lucide-react'

interface RewardEligibilityProps {
  eligible: boolean;
  currentStreak: number;
  requiredStreak: number;
}

export default function RewardEligibility({ eligible, currentStreak, requiredStreak }: RewardEligibilityProps) {
  const daysRemaining = Math.max(0, requiredStreak - currentStreak);

  return (
    <div className={`rounded-lg p-6 ${eligible ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Reward Status</h3>
        {eligible ? (
          <Trophy className="h-6 w-6 text-yellow-500" />
        ) : (
          <Lock className="h-6 w-6 text-gray-400" />
        )}
      </div>

      {eligible ? (
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-white rounded-lg">
            <Gift className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">You're eligible!</p>
              <p className="text-xs text-gray-600">Request your reward now</p>
            </div>
          </div>
          <button className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors flex items-center justify-center">
            Request Reward
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Maintain perfect attendance for {requiredStreak} consecutive days to unlock rewards.
          </p>
          <div className="bg-white rounded-lg p-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Days remaining</span>
              <span className="font-semibold text-gray-900">{daysRemaining} days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                style={{ width: `${Math.min((currentStreak / requiredStreak) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}