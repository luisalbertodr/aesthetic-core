import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Configuración de Appwrite
export const endpoint = 'https://appwrite.lipoout.com:4443/v1';
export const projectID = '68a3408b002f26b39ccd';

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectID);

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

