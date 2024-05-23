import $api from ".";

class BaseService {
  async getOne(id) {
    const response = await $api.get(`/bases/${id}`);
    return response.data;
  }
  async getAll() {
    const response = await $api.get(`/bases/getAll`);
    return response.data;
  }
  async create(data) {
    const response = await $api.post(`/bases/create`);
    return response.data;
  }
  async patch(data) {
    const response = await $api.patch(`/bases/${data.id}`, data.data);
    return response.data;
  }
}

export default new BaseService();
