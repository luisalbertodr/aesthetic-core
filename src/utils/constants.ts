
/**
 * Constantes para la aplicación de la clínica
 */

// Configuración de sesión
export const SESSION_CONFIG = {
  INACTIVITY_TIMEOUT: 30 * 60 * 1000, // 30 minutos en millisegundos
  WARNING_TIME: 5 * 60 * 1000, // Mostrar advertencia 5 minutos antes
} as const;

// Estados de citas
export const CITA_ESTADOS = {
  PROGRAMADA: 'programada',
  EN_PROGRESO: 'en_progreso',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
  NO_ASISTIO: 'no_asistio'
} as const;

// Familias de artículos común en medicina estética
export const FAMILIAS_ARTICULOS = {
  BOTOX: 'botox',
  FILLERS: 'fillers',
  EQUIPAMIENTO: 'equipamiento',
  CONSUMIBLES: 'consumibles',
  PRODUCTOS_CUIDADO: 'productos_cuidado'
} as const;

// Roles de empleados
export const ROLES_EMPLEADO = {
  MEDICO: 'medico',
  ENFERMERO: 'enfermero',
  ESTETICISTA: 'esteticista',
  RECEPCIONISTA: 'recepcionista',
  ADMINISTRADOR: 'administrador'
} as const;

// Días de la semana para horarios
export const DIAS_SEMANA = {
  LUNES: 'lunes',
  MARTES: 'martes',
  MIERCOLES: 'miercoles',
  JUEVES: 'jueves',
  VIERNES: 'viernes',
  SABADO: 'sabado',
  DOMINGO: 'domingo'
} as const;

// Duraciones de tratamientos típicos (en minutos)
export const DURACIONES_TRATAMIENTO = {
  CONSULTA: 30,
  BOTOX: 45,
  FILLERS: 60,
  LIMPIEZA_FACIAL: 90,
  LASER: 45,
  MESOTERAPIA: 60
} as const;
