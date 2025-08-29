
import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Configuración de Appwrite
const client = new Client();

client
  .setEndpoint('https://appwrite.lipoout.com/v1')
  .setProject('68a8bb45000adadfb279');

// Servicios de Appwrite
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// IDs de la base de datos y colecciones (configurar en Appwrite)
export const DATABASE_ID = 'clinic_database';

export const COLLECTIONS = {
  CLIENTES: 'clientes',
  EMPLEADOS: 'empleados', 
  CITAS: 'citas',
  ARTICULOS: 'articulos'
} as const;

// IDs de Storage Buckets
export const BUCKETS = {
  DOCUMENTOS_CLIENTE: 'documentos_cliente',
  FOTOS_ANTES_DESPUES: 'fotos_antes_despues'
} as const;

export { ID, client };
