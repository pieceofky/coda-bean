import { useEffect, useState } from "react";
import { getFullMenu } from "../services/menu.service";
import { MenuCategoryDto } from "../types/MenuCategoryDto";

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getFullMenu();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F4F0] py-12 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Render menu categories and items from menuData */}
      {menuData.map((category) => (
        <div
          key={category.id}
          className="bg-white border-2 border-[#272727] rounded-lg shadow-lg p-6"
        >
          <h2 className="text-3xl font-bold text-[#4A6B57] mb-4 flex items-center">
            <span className="mr-2">{category.iconEmoji}</span>
            {category.name}
          </h2>
          <div className="space-y-4">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-[#D4A96A] pb-2"
              >
                <div>
                  <h3 className="text-xl font-mono text-[#3E3E3E]">
                    {item.name}
                  </h3>
                  <p className="text-lg text-[#6E7C6E]">{item.description}</p>
                </div>
                <p className="text-xl text-[#4A6B57] font-mono">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
