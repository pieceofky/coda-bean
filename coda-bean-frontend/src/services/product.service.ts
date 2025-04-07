import axios from "axios";

export interface ProductDto {
  id: number;
  category: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
}

class ProductService {
  private apiUrl = "http://localhost:8080/api/products"; // Added http://

  async getAllProducts(): Promise<ProductDto[]> {
    try {
      const response = await axios.get<ProductDto[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductDetail(id: number): Promise<ProductDto> {
    try {
      const response = await axios.get<ProductDto>(
        `${this.apiUrl}/product/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product detail:", error);
      throw error;
    }
  }

  async createProduct(
    productDto: ProductDto,
    imageFile?: File,
  ): Promise<string> {
    try {
      const formData = new FormData();

      // Create a plain object without methods for stringification
      const productData = {
        id: productDto.id,
        category: productDto.category,
        productName: productDto.productName,
        description: productDto.description,
        price: productDto.price,
        imageUrl: productDto.imageUrl || "",
      };

      // Append as Blob with proper content type
      formData.append(
        "productDto",
        new Blob([JSON.stringify(productData)], {
          type: "application/json",
        }),
      );

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const endpoint =
        productDto.id === 0
          ? `${this.apiUrl}/new-product`
          : `${this.apiUrl}/edit-product`;

      const response = await axios.post<string>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating/updating product:", error);
      throw error;
    }
  }

  async updateProduct(
    productDto: ProductDto,
    imageFile?: File,
  ): Promise<string> {
    try {
      const formData = new FormData();

      // Send productDto as JSON string under the key "productDto"
      formData.append(
        "productDto",
        new Blob([JSON.stringify(productDto)], { type: "application/json" }),
      );

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await axios.post<string>(
        `${this.apiUrl}/edit-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<string> {
    try {
      const response = await axios.delete<string>(
        `${this.apiUrl}/delete-product/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
