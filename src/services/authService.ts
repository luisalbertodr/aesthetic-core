// authService.ts

import { account, ID, client } from '@/lib/appwrite';
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
      return await account.get();
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
      await account.createEmailPasswordSession(email, password);
      return await account.get();
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales inválidas');
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async register({ email, password, name }: RegisterCredentials): Promise<AuthUser> {
    try {
      await account.create(ID.unique(), email, password, name);
      return await this.login({ email, password });
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error('Error al crear la cuenta');
    }
  }

  /**
   * Inicia sesión con Google OAuth
   */
  async loginWithGoogle(): Promise<void> {
    try {
      // Usamos client.getURL().origin para obtener la URL de redirección correcta
      const successUrl = client.getURL().origin + '/dashboard';
      const failureUrl = client.getURL().origin + '/login';

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
}

export const authService = new AuthService();
