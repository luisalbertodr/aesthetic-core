
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const InactivityOverlay: React.FC = () => {
  const { isInactive, resetSession, logout } = useAuth();

  if (!isInactive) return null;

  return (
    <div className="fixed inset-0 z-50 overlay-blur flex items-center justify-center p-4">
      <Card className="w-full max-w-md medical-shadow animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Sesión Inactiva</CardTitle>
          <CardDescription>
            Tu sesión ha estado inactiva. Por seguridad, hemos pausado tu actividad.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={resetSession}
            className="w-full clinic-gradient text-white hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Continuar Sesión
          </Button>
          <Button 
            onClick={logout}
            variant="outline"
            className="w-full"
          >
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InactivityOverlay;
