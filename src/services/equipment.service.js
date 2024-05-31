import $api from ".";

class EquipmentService {
  async getAll() {
    const response = await $api.get(`/product`);
    return response.data;
  }

  async create() {
    const response = await $api.post(`/product/create`);
    return response.data;
  }

  async update(data) {
    const response = await $api.put(`/product/${data.id}`, data.data);
    return response.data;
  }

  async remove(id) {
    const response = await $api.delete(`/product/${id}`);
    return response.data;
  }
}

export default new EquipmentService();
