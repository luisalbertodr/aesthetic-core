
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import InactivityOverlay from '@/components/InactivityOverlay';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 clinic-gradient rounded-xl flex items-center justify-center animate-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">Cargando...</h2>
              <p className="text-muted-foreground">Verificando autenticación</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {user ? <Dashboard /> : <Login />}
      <InactivityOverlay />
    </>
  );
};

export default Index;
