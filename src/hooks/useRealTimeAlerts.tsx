
import { useEffect } from 'react';
import { toast } from "sonner";
import { simulateRealtimeAlert } from '@/utils/alertUtils';

export const useRealTimeAlerts = (alertsEnabled: boolean) => {
  useEffect(() => {
    if (!alertsEnabled) return;
    
    // Simulate real-time alerts
    const alertInterval = setInterval(() => {
      // Only show alerts 20% of the time to avoid overwhelming the user
      if (Math.random() > 0.8) {
        simulateRealtimeAlert();
      }
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(alertInterval);
  }, [alertsEnabled]);

  const toggleAlerts = (currentState: boolean) => {
    const newState = !currentState;
    
    toast.info(
      newState 
        ? "Real-time alerts enabled" 
        : "Real-time alerts disabled"
    );
    
    return newState;
  };

  return { toggleAlerts };
};
