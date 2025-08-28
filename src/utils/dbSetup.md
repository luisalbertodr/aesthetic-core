
# Configuración de la Base de Datos Appwrite

## Variables de Entorno Requeridas

Añade estas variables a tu archivo `.env` en la raíz del proyecto:

```
VITE_APPWRITE_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=tu_project_id
```

## Configuración de Appwrite Console

### 1. Crear Base de Datos
- Nombre: `clinic_database`
- Database ID: `clinic_database`

### 2. Colecciones a Crear

#### Colección: `clientes`
- **nombre**: String, Required
- **apellidos**: String, Required  
- **email**: String, Required, Unique
- **telefonoPrincipal**: String, Required
- **direccion**: String, Optional

#### Colección: `empleados`
- **nombre**: String, Required
- **apellidos**: String, Required
- **email**: String, Required, Unique
- **horario**: JSON, Required (formato: `{"lunes": {"inicio": "09:00", "fin": "18:00"}}`)

#### Colección: `citas`
- **fecha**: DateTime, Required
- **horaInicio**: DateTime, Required
- **horaFin**: DateTime, Required
- **empleadoId**: String, Required (relación con empleados)
- **clienteId**: String, Required (relación con clientes)

#### Colección: `articulos`
- **nombre**: String, Required
- **precio**: Float, Required
- **stock**: Integer, Required
- **familia**: String, Required (enum: botox, fillers, equipamiento, consumibles, productos_cuidado)

### 3. Storage Buckets a Crear

#### Bucket: `documentos_cliente`
- File size limit: 50MB
- Allowed file extensions: pdf, doc, docx, jpg, jpeg, png
- Permissions: Usuarios autenticados

#### Bucket: `fotos_antes_despues`
- File size limit: 10MB  
- Allowed file extensions: jpg, jpeg, png, webp
- Permissions: Usuarios autenticados

### 4. Configuración de Autenticación

Habilitar en Authentication > Settings:
- Email/Password Authentication
- Google OAuth (opcional)
- Session Length: 30 días

## Permisos Recomendados

Para cada colección, configurar permisos para:
- **Create**: Usuarios autenticados
- **Read**: Usuarios autenticados  
- **Update**: Usuarios autenticados
- **Delete**: Solo administradores
