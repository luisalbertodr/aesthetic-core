
import { useState, useEffect, useCallback } from 'react';

interface UseSessionControlProps {
  inactivityTimeout?: number; // en millisegundos
  onSessionExpired?: () => void;
}

export const useSessionControl = ({ 
  inactivityTimeout = 30 * 60 * 1000, // 30 minutos por defecto
  onSessionExpired 
}: UseSessionControlProps = {}) => {
  const [isInactive, setIsInactive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Resetear el timer de actividad
  const resetActivityTimer = useCallback(() => {
    setLastActivity(Date.now());
    setIsInactive(false);
  }, []);

  // Manejar actividad del usuario
  const handleUserActivity = useCallback(() => {
    resetActivityTimer();
  }, [resetActivityTimer]);

  // Efecto para detectar actividad del usuario
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [handleUserActivity]);

  // Efecto para verificar inactividad
  useEffect(() => {
    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity >= inactivityTimeout && !isInactive) {
        setIsInactive(true);
        onSessionExpired?.();
      }
    };

    const interval = setInterval(checkInactivity, 1000); // Verificar cada segundo

    return () => clearInterval(interval);
  }, [lastActivity, inactivityTimeout, isInactive, onSessionExpired]);

  return {
    isInactive,
    resetActivityTimer,
    timeRemaining: Math.max(0, inactivityTimeout - (Date.now() - lastActivity))
  };
};
