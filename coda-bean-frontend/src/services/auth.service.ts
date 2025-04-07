import axios from "axios";

export interface LoginDto {
  username: string;
  password: string;
}

export interface AdminDto {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export interface CustomerDto {
  username: string;
  password: string;
  email: string;
  fullName: string;
  address: string;
  phone: string;
}

class AuthService {
  private apiUrl = "http://localhost:8080/api/auth";

  async login(loginDto: LoginDto): Promise<string> {
    try {
      const response = await axios.post<string>(
        `${this.apiUrl}/login`,
        loginDto,
      );
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async registerAdmin(adminDto: AdminDto): Promise<string> {
    try {
      const response = await axios.post<string>(
        `${this.apiUrl}/register-admin`,
        adminDto,
      );
      return response.data;
    } catch (error) {
      console.error("Admin registration failed:", error);
      throw error;
    }
  }

  async registerCustomer(customerDto: CustomerDto): Promise<string> {
    try {
      const response = await axios.post<string>(
        `${this.apiUrl}/register`,
        customerDto,
      );
      return response.data;
    } catch (error) {
      console.error("Customer registration failed:", error);
      throw error;
    }
  }

  async deleteUser(username: string): Promise<string> {
    try {
      const response = await axios.delete<string>(
        `${this.apiUrl}/delete/${username}`,
      );
      return response.data;
    } catch (error) {
      console.error("User deletion failed:", error);
      throw error;
    }
  }

  async sayHello(): Promise<string> {
    try {
      const response = await axios.get<string>(`${this.apiUrl}/hello`);
      return response.data;
    } catch (error) {
      console.error("Hello test failed:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
