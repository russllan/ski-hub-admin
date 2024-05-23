import $api from ".";

class AuthService {
  async login(data) {
    const response = await $api.post(`/auth/login`, data);
    return response.data;
  }

  async profile() {
    const response = await $api.get(`/auth/profile`);
    return response.data;
  }
}

export default new AuthService();
