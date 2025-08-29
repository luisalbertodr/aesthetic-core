
import { account, ID } from '@/lib/appwrite';
import { OAuthProvider } from 'appwrite';
import type { Models } from 'appwrite';

export interface AuthUser extends Models.User<Models.Preferences> {}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

class AuthService {
  /**
   * Obtiene la sesión actual del usuario
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await account.get();
      console.log('Usuario actual obtenido:', user.email);
      return user;
    } catch (error) {
      console.log('No hay usuario autenticado:', error);
      return null;
    }
  }

  /**
   * Inicia sesión con email y contraseña
   */
  async login({ email, password }: LoginCredentials): Promise<AuthUser> {
    try {
      console.log('Intentando login con:', email);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      console.log('Login exitoso:', user.email);
      return user;
    } catch (error: any) {
      console.error('Error en login:', error);
      if (error.code === 401) {
        throw new Error('Credenciales inválidas');
      } else if (error.code === 500) {
        throw new Error('Error de conexión con el servidor');
      }
      throw new Error('Error al iniciar sesión');
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async register({ email, password, name }: RegisterCredentials): Promise<AuthUser> {
    try {
      console.log('Intentando registro con:', email);
      await account.create(ID.unique(), email, password, name);
      return await this.login({ email, password });
    } catch (error: any) {
      console.error('Error en registro:', error);
      if (error.code === 409) {
        throw new Error('El usuario ya existe');
      } else if (error.code === 500) {
        throw new Error('Error de conexión con el servidor');
      }
      throw new Error('Error al crear la cuenta');
    }
  }

  /**
   * Inicia sesión con Google OAuth
   */
  async loginWithGoogle(): Promise<void> {
    try {
      const successUrl = `${window.location.origin}/dashboard`;
      const failureUrl = `${window.location.origin}/login`;

      account.createOAuth2Session(
        OAuthProvider.Google,
        successUrl,
        failureUrl
      );
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw new Error('Error al iniciar sesión con Google');
    }
  }

  /**
   * Cierra la sesión actual
   */
  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error en logout:', error);
      throw new Error('Error al cerrar sesión');
    }
  }

  /**
   * Verifica si hay una sesión activa
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await account.get();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Prueba la conexión con Appwrite
   */
  async testConnection(): Promise<boolean> {
    try {
      await account.get();
      console.log('Conexión con Appwrite: OK');
      return true;
    } catch (error: any) {
      console.error('Error de conexión con Appwrite:', error);
      if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch')) {
        console.error('Error de red - Verificar endpoint y conectividad');
      }
      return false;
    }
  }
}

export const authService = new AuthService();
