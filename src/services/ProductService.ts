import { serverApi } from "../libs/config";
import axios from "axios";
import { Product, ProductInquiry } from "../libs/types/products";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;

      const { data } = await axios.get(url);

      return data;
    } catch (err) {
      console.log("ERR: getProducts:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (err) {
      console.log("ERR getProduct", err);
      throw err;
    }
  }
}

export default ProductService;
