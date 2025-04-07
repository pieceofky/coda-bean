import { MenuItemDto } from "./MenuItemDto";

export interface MenuCategoryDto {
  id: number;
  name: string;
  description: string;
  iconEmoji: string;
  items: MenuItemDto[];
}
