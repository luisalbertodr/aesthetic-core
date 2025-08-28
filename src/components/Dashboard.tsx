
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, 
  Users, 
  Calendar, 
  Package, 
  UserCheck, 
  Settings,
  Bell,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 clinic-gradient rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Clínica Estética</h1>
                <p className="text-sm text-muted-foreground">Panel de Control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden sm:flex">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                En línea
              </Badge>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user?.name || user?.email}
                </span>
                <Button size="sm" variant="outline">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            ¡Bienvenido, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Gestiona tu clínica de medicina estética desde este panel de control.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-shadow hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +0% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="medical-shadow hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Sin citas programadas
              </p>
            </CardContent>
          </Card>

          <Card className="medical-shadow hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empleados</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Personal registrado
              </p>
            </CardContent>
          </Card>

          <Card className="medical-shadow hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventario</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Artículos en stock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="medical-shadow">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Gestiona tu clínica con estas opciones principales
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Nuevo Cliente</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Agendar Cita</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <UserCheck className="w-6 h-6" />
                <span className="text-sm">Gestionar Personal</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Package className="w-6 h-6" />
                <span className="text-sm">Inventario</span>
              </Button>
            </CardContent>
          </Card>

          <Card className="medical-shadow">
            <CardHeader>
              <CardTitle>Estado del Sistema</CardTitle>
              <CardDescription>
                Configuración de la base de datos Appwrite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Conexión a Appwrite</span>
                <Badge variant="outline" className="text-accent">
                  ✓ Conectado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Base de Datos</span>
                <Badge variant="outline">
                  🔧 Configurar
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Buckets</span>
                <Badge variant="outline">
                  🔧 Configurar
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Base de Datos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Notice */}
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Configuración Inicial Requerida</h3>
                <p className="text-muted-foreground mt-2">
                  Para comenzar a usar la clínica, necesitas configurar las colecciones de Appwrite:
                </p>
                <ul className="text-sm text-muted-foreground mt-4 space-y-1">
                  <li>• Colección Clientes (nombre, apellidos, email, teléfono, dirección)</li>
                  <li>• Colección Empleados (nombre, apellidos, email, horario)</li>
                  <li>• Colección Citas (fecha, horas, empleado, cliente)</li>
                  <li>• Colección Artículos (nombre, precio, stock, familia)</li>
                  <li>• Buckets: documentos_cliente, fotos_antes_despues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
