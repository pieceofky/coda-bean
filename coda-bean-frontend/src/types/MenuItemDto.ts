export interface MenuItemDto {
  id: number;
  name: string;
  description: string;
  price: string; // Using string to represent BigDecimal
  available: boolean;
  imageUrl: string;
  preparationTime: number | null;
  tags: string[];
}
