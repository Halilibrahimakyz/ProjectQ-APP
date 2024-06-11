export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    // Diğer kullanıcı alanları
  }
  