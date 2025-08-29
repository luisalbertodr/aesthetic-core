
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { dbService } from '@/services/dbService';

interface ConnectionStatus {
  auth: boolean | null;
  database: boolean | null;
  isLoading: boolean;
}

const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    auth: null,
    database: null,
    isLoading: false
  });

  const testConnections = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));

    try {
      // Test auth connection
      const authStatus = await authService.testConnection();
      setStatus(prev => ({ ...prev, auth: authStatus }));

      // Test database connection
      const dbStatus = await dbService.testConnection();
      setStatus(prev => ({ ...prev, database: dbStatus }));

      // Check collections if database is connected
      if (dbStatus) {
        await dbService.checkCollections();
      }
    } catch (error) {
      console.error('Error en test de conexiones:', error);
    } finally {
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    testConnections();
  }, []);

  const StatusIcon = ({ status }: { status: boolean | null }) => {
    if (status === null) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    return status ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Estado de Conexión</CardTitle>
        <CardDescription>
          Verificando conexión con Appwrite
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Autenticación:</span>
          <StatusIcon status={status.auth} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Base de datos:</span>
          <StatusIcon status={status.database} />
        </div>

        <Button 
          onClick={testConnections}
          disabled={status.isLoading}
          className="w-full"
        >
          {status.isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Probando...
            </>
          ) : (
            'Probar Conexión'
          )}
        </Button>

        {(status.auth === false || status.database === false) && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
            <p><strong>Acciones requeridas:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Verificar que el proyecto existe en Appwrite Console</li>
              <li>Crear base de datos 'clinic_database'</li>
              <li>Crear colecciones: clientes, empleados, citas, articulos</li>
              <li>Configurar permisos de lectura/escritura</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionTest;
