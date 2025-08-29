
import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS, ID } from '@/lib/appwrite';
import type { Models } from 'appwrite';

// Tipos de datos para las colecciones

export interface Cliente {
  $id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefonoPrincipal: string;
  direccion: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Empleado {
  $id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  horario: Record<string, any>; // JSON para horarios flexibles
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Cita {
  $id?: string;
  fecha: string; // ISO datetime
  horaInicio: string; // ISO datetime
  horaFin: string; // ISO datetime
  empleadoId: string;
  clienteId: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Articulo {
  $id?: string;
  nombre: string;
  precio: number;
  stock: number;
  familia: string;
  $createdAt?: string;
  $updatedAt?: string;
}

class DatabaseService {
  /**
   * Prueba la conexión con la base de datos
   */
  async testConnection(): Promise<boolean> {
    try {
      await databases.list();
      console.log('Conexión con base de datos: OK');
      return true;
    } catch (error: any) {
      console.error('Error de conexión con base de datos:', error);
      if (error.code === 404) {
        console.error('Base de datos no encontrada. Verificar DATABASE_ID:', DATABASE_ID);
      }
      return false;
    }
  }

  /**
   * Verifica si las colecciones existen
   */
  async checkCollections(): Promise<void> {
    try {
      const collections = await databases.listCollections(DATABASE_ID);
      const existingCollections = collections.collections.map(c => c.$id);
      
      console.log('Colecciones existentes:', existingCollections);
      
      Object.values(COLLECTIONS).forEach(collectionId => {
        if (!existingCollections.includes(collectionId)) {
          console.warn(`Colección '${collectionId}' no existe en la base de datos`);
        }
      });
    } catch (error: any) {
      console.error('Error verificando colecciones:', error);
      if (error.code === 404) {
        console.error('Base de datos no encontrada. Crear en Appwrite Console:', DATABASE_ID);
      }
    }
  }

  // === CLIENTES ===
  
  /**
   * Crear un nuevo cliente
   */
  async createCliente(cliente: Omit<Cliente, '$id' | '$createdAt' | '$updatedAt'>): Promise<Models.Document> {
    try {
      console.log('Creando cliente:', cliente.email);
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CLIENTES,
        ID.unique(),
        cliente
      );
    } catch (error: any) {
      console.error('Error creando cliente:', error);
      if (error.code === 404) {
        throw new Error('Colección de clientes no encontrada. Verificar configuración en Appwrite.');
      }
      throw new Error('Error al crear cliente');
    }
  }

  /**
   * Obtener todos los clientes
   */
  async getClientes(): Promise<Models.Document[]> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CLIENTES);
      return response.documents;
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      throw new Error('Error al obtener clientes');
    }
  }

  /**
   * Obtener un cliente por ID
   */
  async getCliente(id: string): Promise<Models.Document> {
    try {
      return await databases.getDocument(DATABASE_ID, COLLECTIONS.CLIENTES, id);
    } catch (error) {
      console.error('Error obteniendo cliente:', error);
      throw new Error('Error al obtener cliente');
    }
  }

  // === EMPLEADOS ===
  
  /**
   * Crear un nuevo empleado
   */
  async createEmpleado(empleado: Omit<Empleado, '$id' | '$createdAt' | '$updatedAt'>): Promise<Models.Document> {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.EMPLEADOS,
        ID.unique(),
        empleado
      );
    } catch (error) {
      console.error('Error creando empleado:', error);
      throw new Error('Error al crear empleado');
    }
  }

  /**
   * Obtener todos los empleados
   */
  async getEmpleados(): Promise<Models.Document[]> {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.EMPLEADOS);
      return response.documents;
    } catch (error) {
      console.error('Error obteniendo empleados:', error);
      throw new Error('Error al obtener empleados');
    }
  }

  // === CITAS ===
  
  /**
   * Crear una nueva cita
   */
  async createCita(cita: Omit<Cita, '$id' | '$createdAt' | '$updatedAt'>): Promise<Models.Document> {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CITAS,
        ID.unique(),
        cita
      );
    } catch (error) {
      console.error('Error creando cita:', error);
      throw new Error('Error al crear cita');
    }
  }

  /**
   * Obtener citas por empleado
   */
  async getCitasByEmpleado(empleadoId: string): Promise<Models.Document[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CITAS,
        [`empleadoId.equal("${empleadoId}")`]
      );
      return response.documents;
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      throw new Error('Error al obtener citas');
    }
  }

  // === ARTÍCULOS ===
  
  /**
   * Crear un nuevo artículo
   */
  async createArticulo(articulo: Omit<Articulo, '$id' | '$createdAt' | '$updatedAt'>): Promise<Models.Document> {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ARTICULOS,
        ID.unique(),
        articulo
      );
    } catch (error) {
      console.error('Error creando artículo:', error);
      throw new Error('Error al crear artículo');
    }
  }

  /**
   * Obtener artículos por familia
   */
  async getArticulosByFamilia(familia: string): Promise<Models.Document[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ARTICULOS,
        [`familia.equal("${familia}")`]
      );
      return response.documents;
    } catch (error) {
      console.error('Error obteniendo artículos:', error);
      throw new Error('Error al obtener artículos');
    }
  }

  // === STORAGE ===
  
  /**
   * Subir archivo a bucket de documentos de cliente
   */
  async uploadDocumentoCliente(file: File): Promise<Models.File> {
    try {
      return await storage.createFile(
        BUCKETS.DOCUMENTOS_CLIENTE,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Error subiendo documento:', error);
      throw new Error('Error al subir documento');
    }
  }

  /**
   * Subir foto antes/después
   */
  async uploadFotoAntesDespues(file: File): Promise<Models.File> {
    try {
      return await storage.createFile(
        BUCKETS.FOTOS_ANTES_DESPUES,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Error subiendo foto:', error);
      throw new Error('Error al subir foto');
    }
  }
}

export const dbService = new DatabaseService();
