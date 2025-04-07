package com.khai.coffeeshop.init;

import com.khai.coffeeshop.dao.RoleDao;
import com.khai.coffeeshop.dao.UserDao;
import com.khai.coffeeshop.dao.VenueDao;
import com.khai.coffeeshop.dto.MenuCategoryDto;
import com.khai.coffeeshop.dto.MenuItemDto;
import com.khai.coffeeshop.entity.Admin;
import com.khai.coffeeshop.entity.Customer;
import com.khai.coffeeshop.entity.Role;
import com.khai.coffeeshop.entity.Venue;
import com.khai.coffeeshop.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class InitApplication {
    private final UserDao userDao;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;
    private final MenuService menuService;
    private final VenueDao venueDao;

    @Bean @Transactional @Profile("dev")
    ApplicationRunner runner() {
        return args -> {
            // Check if the database is empty
            if (roleDao.count() == 0) {
                createRolesAndUsers();
                createNewVenue();
                createKivysSpecialMenu();
            }
        };
    }

    private void createRolesAndUsers() {
        Role[] roles = createRoles(); // this creates roles
        createUsers(roles[0], roles[1]); // this creates users
    }

    public Role[] createRoles() {
        // 0 for admin, 1 for customer
        Role adminRole = new Role();
        adminRole.setRoleName("ROLE_ADMIN");
        roleDao.save(adminRole);

        Role customerRole = new Role();
        customerRole.setRoleName("ROLE_CUSTOMER");
        roleDao.save(customerRole);

        return new Role[]{adminRole, customerRole};
    }

    public void createUsers(Role adminRole, Role customerRole) {
        // Create admin user
        Admin admin = new Admin();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin")); // Encrypt password
        admin.setEmail("admin@gmail.com");
        admin.setPhoneNumber("+1234567890");
        admin.setRole(adminRole);
        admin.setDepartment("selling_department");
        userDao.save(admin);

        // Create customer user
        Customer customer = new Customer();
        customer.setFirstName("customer");
        customer.setLastName("customer");
        customer.setPhoneNumber("+1234567890");
        customer.setUsername("customer");
        customer.setPassword(passwordEncoder.encode("customer")); // Encrypt password
        customer.setEmail("customer@gmail.com");
        customer.setRole(customerRole);
        customer.setAddress("Apartment of hygiene lovers");
        userDao.save(customer);
    }

    public void createKivysSpecialMenu() {
            // Signature Coffee Creations
            MenuCategoryDto coffeeCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Signature Coffee Creations",
                            "Our specialty coffee drinks", "✨", new ArrayList<>())
            );

            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Espresso Royale",
                            "A rich, double-shot espresso with a caramelized top.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Velvet Mocha",
                            "Espresso, premium dark chocolate, and steamed milk topped with whipped cream.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Honey Lavender Latte",
                            "Espresso infused with lavender syrup and honey, topped with microfoam.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Maple Cinnamon Cortado",
                            "A smooth balance of espresso, maple syrup, and cinnamon.",
                            new BigDecimal("5.50"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Tiramisu Cappuccino",
                            "Espresso with mascarpone foam, cocoa powder, and a hint of vanilla.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Butter Pecan Flat White",
                            "Velvety espresso blended with butter pecan syrup and steamed milk.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(coffeeCategory.id(),
                    new MenuItemDto(null, "Salted Caramel Affogato",
                            "A scoop of homemade vanilla gelato drowned in espresso and caramel drizzle.",
                            new BigDecimal("7.00"), true, null, 5, Set.of("coffee", "cold"))
            );

            // Artisanal Brewed Coffee
            MenuCategoryDto brewedCoffeeCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Artisanal Brewed Coffee",
                            "Carefully crafted brewed coffee selections", "🌿", new ArrayList<>())
            );

            menuService.addItemToCategory(brewedCoffeeCategory.id(),
                    new MenuItemDto(null, "Pour-Over Perfection",
                            "A single-origin coffee, brewed to order.",
                            new BigDecimal("5.00"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(brewedCoffeeCategory.id(),
                    new MenuItemDto(null, "Cold Brew Reserve",
                            "24-hour steeped cold brew with deep, chocolatey notes.",
                            new BigDecimal("5.50"), true, null, 5, Set.of("coffee", "cold"))
            );
            menuService.addItemToCategory(brewedCoffeeCategory.id(),
                    new MenuItemDto(null, "Nitro Cloud Coffee",
                            "Smooth nitro-infused cold brew with a creamy finish.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("coffee", "cold"))
            );
            menuService.addItemToCategory(brewedCoffeeCategory.id(),
                    new MenuItemDto(null, "French Press Classic",
                            "A bold and rich coffee experience.",
                            new BigDecimal("5.00"), true, null, 5, Set.of("coffee", "hot"))
            );
            menuService.addItemToCategory(brewedCoffeeCategory.id(),
                    new MenuItemDto(null, "Turkish Delight Coffee",
                            "Traditional Turkish coffee with cardamom and a sweet side of lokum.",
                            new BigDecimal("5.50"), true, null, 5, Set.of("coffee", "hot"))
            );

            // Unique Cold Drinks
            MenuCategoryDto coldDrinksCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Unique Cold Drinks",
                            "Refreshing cold beverages", "🧊", new ArrayList<>())
            );

            menuService.addItemToCategory(coldDrinksCategory.id(),
                    new MenuItemDto(null, "Coconut Cloud Cold Brew",
                            "Cold brew coffee with a coconut cream topping.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("coffee", "cold"))
            );
            menuService.addItemToCategory(coldDrinksCategory.id(),
                    new MenuItemDto(null, "Orange Vanilla Iced Latte",
                            "Espresso, orange zest, and vanilla cold foam.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "cold"))
            );
            menuService.addItemToCategory(coldDrinksCategory.id(),
                    new MenuItemDto(null, "Rose Cardamom Frappe",
                            "A creamy blend of espresso, rose, and cardamom.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "cold"))
            );
            menuService.addItemToCategory(coldDrinksCategory.id(),
                    new MenuItemDto(null, "Choco-Matcha Swirl",
                            "Layers of matcha and rich dark chocolate milk over ice.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("tea", "cold"))
            );
            menuService.addItemToCategory(coldDrinksCategory.id(),
                    new MenuItemDto(null, "Espresso Lemonade",
                            "A tangy-sweet espresso tonic with fresh citrus.",
                            new BigDecimal("5.50"), true, null, 5, Set.of("coffee", "cold"))
            );

            // Exquisite Teas
            MenuCategoryDto teasCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Exquisite Teas",
                            "Premium tea selections", "🍵", new ArrayList<>())
            );

            menuService.addItemToCategory(teasCategory.id(),
                    new MenuItemDto(null, "London Fog Luxe",
                            "Earl Grey tea, vanilla syrup, and steamed milk.",
                            new BigDecimal("5.00"), true, null, 5, Set.of("tea", "hot"))
            );
            menuService.addItemToCategory(teasCategory.id(),
                    new MenuItemDto(null, "Jasmine Pearls Green Tea",
                            "Delicate, floral green tea served hot or iced.",
                            new BigDecimal("4.50"), true, null, 5, Set.of("tea"))
            );
            menuService.addItemToCategory(teasCategory.id(),
                    new MenuItemDto(null, "Hibiscus Berry Iced Tea",
                            "Tart hibiscus tea with muddled fresh berries.",
                            new BigDecimal("5.00"), true, null, 5, Set.of("tea", "cold"))
            );
            menuService.addItemToCategory(teasCategory.id(),
                    new MenuItemDto(null, "Chai Spice Latte",
                            "Bold spiced chai with frothy steamed milk.",
                            new BigDecimal("5.50"), true, null, 5, Set.of("tea", "hot"))
            );
            menuService.addItemToCategory(teasCategory.id(),
                    new MenuItemDto(null, "Matcha Honey Latte",
                            "Premium ceremonial matcha blended with honey.",
                            new BigDecimal("6.00"), true, null, 5, Set.of("tea", "hot"))
            );

            // Unique Baked Goods
            MenuCategoryDto bakedGoodsCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Unique Baked Goods",
                            "Freshly baked treats", "🥐", new ArrayList<>())
            );

            menuService.addItemToCategory(bakedGoodsCategory.id(),
                    new MenuItemDto(null, "Earl Grey & Lemon Scones",
                            "Buttery scones infused with Earl Grey and citrus glaze.",
                            new BigDecimal("4.50"), true, null, 5, Set.of("bakery"))
            );
            menuService.addItemToCategory(bakedGoodsCategory.id(),
                    new MenuItemDto(null, "Dark Chocolate Sea Salt Croissant",
                            "Flaky croissant filled with dark chocolate and topped with sea salt.",
                            new BigDecimal("5.00"), true, null, 5, Set.of("bakery"))
            );
            menuService.addItemToCategory(bakedGoodsCategory.id(),
                    new MenuItemDto(null, "Pistachio Rose Cake",
                            "A delicate pistachio sponge cake with rose cream frosting.",
                            new BigDecimal("6.50"), true, null, 5, Set.of("bakery"))
            );
            menuService.addItemToCategory(bakedGoodsCategory.id(),
                    new MenuItemDto(null, "Brown Butter Espresso Cookies",
                            "Chewy cookies with a rich espresso kick.",
                            new BigDecimal("3.50"), true, null, 5, Set.of("bakery"))
            );
            menuService.addItemToCategory(bakedGoodsCategory.id(),
                    new MenuItemDto(null, "Matcha White Chocolate Muffins",
                            "Soft muffins with matcha and white chocolate chips.",
                            new BigDecimal("4.00"), true, null, 5, Set.of("bakery"))
            );

            // Light Snacks & Meals
            MenuCategoryDto snacksCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Light Snacks & Meals",
                            "Healthy and delicious meal options", "🥗", new ArrayList<>())
            );

            menuService.addItemToCategory(snacksCategory.id(),
                    new MenuItemDto(null, "Avocado Toast Trio",
                            "Classic, spicy mango, and smoked salmon variations.",
                            new BigDecimal("9.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(snacksCategory.id(),
                    new MenuItemDto(null, "Mediterranean Quinoa Bowl",
                            "Quinoa, olives, feta, roasted veggies, and tahini dressing.",
                            new BigDecimal("10.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(snacksCategory.id(),
                    new MenuItemDto(null, "Croissant Sandwiches",
                            "Ham & brie, turkey pesto, or caprese with fresh basil.",
                            new BigDecimal("8.50"), true, null, 5, Set.of("meal"))
            );
            menuService.addItemToCategory(snacksCategory.id(),
                    new MenuItemDto(null, "Savory Cheddar & Chive Scones",
                            "Buttery scones with sharp cheddar and chives.",
                            new BigDecimal("4.50"), true, null, 5, Set.of("bakery", "savory"))
            );
            menuService.addItemToCategory(snacksCategory.id(),
                    new MenuItemDto(null, "Smoked Salmon Bagel",
                            "With cream cheese, capers, and red onion.",
                            new BigDecimal("9.50"), true, null, 5, Set.of("meal"))
            );

            // Continue with other categories...
            // Gourmet Toasts
            MenuCategoryDto toastsCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Gourmet Toasts",
                            "Artisanal toast creations", "🥑", new ArrayList<>())
            );

            menuService.addItemToCategory(toastsCategory.id(),
                    new MenuItemDto(null, "Whipped Ricotta & Honey Toast",
                            "Thick sourdough with whipped ricotta, honey, and pistachios.",
                            new BigDecimal("8.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(toastsCategory.id(),
                    new MenuItemDto(null, "Mushroom & Truffle Toast",
                            "Sautéed wild mushrooms, truffle oil, and Parmesan on rustic bread.",
                            new BigDecimal("9.50"), true, null, 5, Set.of("meal", "vegetarian"))
            );

            // Signature Sandwiches & Wraps
            MenuCategoryDto sandwichesCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Signature Sandwiches & Wraps",
                            "Hearty sandwich options", "🥪", new ArrayList<>())
            );

            menuService.addItemToCategory(sandwichesCategory.id(),
                    new MenuItemDto(null, "Mediterranean Hummus Wrap",
                            "Spinach wrap with hummus, cucumbers, feta, olives, and sun-dried tomatoes.",
                            new BigDecimal("9.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(sandwichesCategory.id(),
                    new MenuItemDto(null, "Turkey Pesto Ciabatta",
                            "Roasted turkey, basil pesto, mozzarella, and arugula on ciabatta.",
                            new BigDecimal("10.00"), true, null, 5, Set.of("meal"))
            );
            menuService.addItemToCategory(sandwichesCategory.id(),
                    new MenuItemDto(null, "Spicy Tuna Melt",
                            "Spicy tuna salad, cheddar, and tomato grilled on sourdough.",
                            new BigDecimal("9.50"), true, null, 5, Set.of("meal"))
            );
            menuService.addItemToCategory(sandwichesCategory.id(),
                    new MenuItemDto(null, "Caprese Focaccia Sandwich",
                            "Fresh mozzarella, basil, tomato, balsamic glaze on focaccia.",
                            new BigDecimal("9.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );

            // Fresh & Hearty Bowls
            MenuCategoryDto bowlsCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Fresh & Hearty Bowls",
                            "Nutritious bowl meals", "🥗", new ArrayList<>())
            );

            menuService.addItemToCategory(bowlsCategory.id(),
                    new MenuItemDto(null, "Miso Ginger Buddha Bowl",
                            "Brown rice, avocado, pickled veggies, tofu, and sesame miso dressing.",
                            new BigDecimal("11.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(bowlsCategory.id(),
                    new MenuItemDto(null, "Protein Power Bowl",
                            "Grilled chicken, sweet potatoes, kale, chickpeas, and lemon tahini sauce.",
                            new BigDecimal("12.00"), true, null, 5, Set.of("meal"))
            );
            menuService.addItemToCategory(bowlsCategory.id(),
                    new MenuItemDto(null, "Spicy Kimchi & Rice Bowl",
                            "Jasmine rice, kimchi, fried egg, gochujang sauce, and sesame seeds.",
                            new BigDecimal("10.50"), true, null, 5, Set.of("meal"))
            );

            // Warm & Comforting Meals
            MenuCategoryDto warmMealsCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "Warm & Comforting Meals",
                            "Hearty comfort food", "🍲", new ArrayList<>())
            );

            menuService.addItemToCategory(warmMealsCategory.id(),
                    new MenuItemDto(null, "Tomato Basil Bisque & Grilled Cheese",
                            "Classic creamy tomato soup served with a melty, golden grilled cheese.",
                            new BigDecimal("9.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(warmMealsCategory.id(),
                    new MenuItemDto(null, "French Onion Soup",
                            "Rich, caramelized onion broth topped with a toasted baguette and melted Gruyère.",
                            new BigDecimal("8.50"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(warmMealsCategory.id(),
                    new MenuItemDto(null, "Creamy Mushroom & Truffle Risotto",
                            "Arborio rice slow-cooked with mushrooms, Parmesan, and truffle oil.",
                            new BigDecimal("12.00"), true, null, 5, Set.of("meal", "vegetarian"))
            );
            menuService.addItemToCategory(warmMealsCategory.id(),
                    new MenuItemDto(null, "Chicken & Waffles",
                            "Crispy buttermilk chicken over fluffy waffles with maple butter.",
                            new BigDecimal("13.00"), true, null, 5, Set.of("meal"))
            );

            // All-Day Breakfast Specials
            MenuCategoryDto breakfastCategory = menuService.createCategory(
                    new MenuCategoryDto(null, "All-Day Breakfast Specials",
                            "Breakfast served all day", "🍳", new ArrayList<>())
            );

            menuService.addItemToCategory(breakfastCategory.id(),
                    new MenuItemDto(null, "Soft Scramble Croissant",
                            "Buttery croissant filled with soft scrambled eggs, crème fraîche, and chives.",
                            new BigDecimal("8.50"), true, null, 5, Set.of("breakfast"))
            );
            menuService.addItemToCategory(breakfastCategory.id(),
                    new MenuItemDto(null, "Chorizo & Egg Breakfast Burrito",
                            "Scrambled eggs, chorizo, avocado, and chipotle aioli in a warm tortilla.",
                            new BigDecimal("9.00"), true, null, 5, Set.of("breakfast"))
            );
            menuService.addItemToCategory(breakfastCategory.id(),
                    new MenuItemDto(null, "Granola & Greek Yogurt Bowl",
                            "House-made granola, honey, and fresh seasonal fruit over Greek yogurt.",
                            new BigDecimal("7.00"), true, null, 5, Set.of("breakfast", "vegetarian"))
            );
            menuService.addItemToCategory(breakfastCategory.id(),
                    new MenuItemDto(null, "Sweet Potato & Kale Hash",
                            "Roasted sweet potatoes, kale, poached egg, and feta cheese.",
                            new BigDecimal("9.50"), true, null, 5, Set.of("breakfast", "vegetarian"))
            );
    }

//    public void createCreativeMenu() {
//        // Create categories and items
//        MenuCategoryDto coffeeCategory = menuService.createCategory(
//                new MenuCategoryDto(null, "Signature Coffee Creations",
//                        "Our specialty coffee drinks", "✨", new ArrayList<>())
//        );
//
//        menuService.addItemToCategory(coffeeCategory.id(),
//                new MenuItemDto(null, "Espresso Royale",
//                        "A rich, double-shot espresso with a caramelized top.",
//                        new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "hot"))
//        );
//
//        // **The Dawn Breakers (Our Signature Coffee Creations)**
//        MenuCategoryDto dawnBreakers = menuService.createCategory(
//                new MenuCategoryDto(null, "The Dawn Breakers",
//                        "Awaken your senses with our uniquely crafted coffee experiences.",
//                        "🌅", new ArrayList<>())
//        );
//
//        menuService.addItemToCategory(dawnBreakers.id(),
//                new MenuItemDto(null, "Midnight Bloom Espresso",
//                        "A velvety double-shot espresso, kissed with a whisper of lavender and a caramelized sugar crust. Like a secret garden at night.",
//                        new BigDecimal("7.25"), true, null, 7, Set.of("coffee", "espresso", "hot", "signature"))
//        );
//
//        menuService.addItemToCategory(dawnBreakers.id(),
//                new MenuItemDto(null, "Sunstone Cappuccino",
//                        "A harmonious blend of rich espresso and steamed milk, infused with a hint of orange zest and a dusting of golden cocoa. Liquid sunshine in a cup.",
//                        new BigDecimal("7.75"), true, null, 6, Set.of("coffee", "cappuccino", "hot", "signature"))
//        );
//
//        menuService.addItemToCategory(dawnBreakers.id(),
//                new MenuItemDto(null, "Emerald Mocha",
//                        "Dark, decadent mocha elevated with a subtle note of mint and a swirl of emerald-green white chocolate. A refreshing indulgence.",
//                        new BigDecimal("8.00"), true, null, 8, Set.of("coffee", "mocha", "hot", "signature"))
//        );
//
//        menuService.addItemToCategory(dawnBreakers.id(),
//                new MenuItemDto(null, "Astral Cold Brew",
//                        "Our slow-steeped cold brew infused with notes of cardamom and a hint of maple. Smooth, enigmatic, and out of this world.",
//                        new BigDecimal("8.50"), true, null, 9, Set.of("coffee", "cold brew", "iced", "signature"))
//        );
//
//        // **The Alchemist's Corner (Espresso & Classics, Reimagined)**
//        MenuCategoryDto alchemistsCorner = menuService.createCategory(
//                new MenuCategoryDto(null, "The Alchemist's Corner",
//                        "Familiar favorites, crafted with a touch of magic.",
//                        "🧪", new ArrayList<>())
//        );
//
//        menuService.addItemToCategory(alchemistsCorner.id(),
//                new MenuItemDto(null, "Espresso Elixir",
//                        "Our signature double-shot espresso, pulled to perfection for a bold and invigorating experience.",
//                        new BigDecimal("5.75"), true, null, 4, Set.of("coffee", "espresso", "hot", "classic"))
//        );
//
//        menuService.addItemToCategory(alchemistsCorner.id(),
//                new MenuItemDto(null, "Nimbus Latte",
//                        "A cloud of steamed milk gently embracing a shot of our rich espresso. Pure comfort.",
//                        new BigDecimal("6.25"), true, null, 5, Set.of("coffee", "latte", "hot", "classic"))
//        );
//
//        menuService.addItemToCategory(alchemistsCorner.id(),
//                new MenuItemDto(null, "Crystalline Macchiato",
//                        "Espresso marked with a delicate dollop of foamed milk, highlighting the bean's bright notes.",
//                        new BigDecimal("6.75"), true, null, 6, Set.of("coffee", "macchiato", "hot", "classic"))
//        );
//
//        menuService.addItemToCategory(alchemistsCorner.id(),
//                new MenuItemDto(null, "Polar Iced Latte",
//                        "Espresso chilled and swirled with cold milk over ice. A refreshing escape.",
//                        new BigDecimal("6.50"), true, null, 5, Set.of("coffee", "latte", "iced", "classic"))
//        );
//
//        // **The Whispering Woods (Flavored Inspirations)**
//        MenuCategoryDto whisperingWoods = menuService.createCategory(
//                new MenuCategoryDto(null, "The Whispering Woods",
//                        "Delight in our coffee infused with natural and enchanting flavors.",
//                        "🌲", new ArrayList<>())
//        );
//
//        menuService.addItemToCategory(whisperingWoods.id(),
//                new MenuItemDto(null, "Hazelnut Haven Latte",
//                        "Our classic latte infused with the warm, nutty embrace of roasted hazelnuts.",
//                        new BigDecimal("7.00"), true, null, 6, Set.of("coffee", "latte", "hot", "flavored"))
//        );
//
//        menuService.addItemToCategory(whisperingWoods.id(),
//                new MenuItemDto(null, "Caramel Cascade Macchiato",
//                        "A layered macchiato drizzled with a rich, flowing caramel. Sweet temptation.",
//                        new BigDecimal("7.50"), true, null, 7, Set.of("coffee", "macchiato", "hot", "flavored"))
//        );
//
//        menuService.addItemToCategory(whisperingWoods.id(),
//                new MenuItemDto(null, "Vanilla Bean Dream Cold Brew",
//                        "Our signature cold brew infused with the sweet, aromatic essence of real vanilla beans.",
//                        new BigDecimal("8.25"), true, null, 8, Set.of("coffee", "cold brew", "iced", "flavored"))
//        );
//
//        menuService.addItemToCategory(whisperingWoods.id(),
//                new MenuItemDto(null, "Spiced Chai Infusion Latte",
//                        "A comforting blend of chai spices and our smooth latte. A hug in a mug.",
//                        new BigDecimal("7.25"), true, null, 6, Set.of("coffee", "latte", "hot", "chai", "flavored"))
//        );
//
//        // **The Celestial Chill (Iced Coffee Delights)**
//        MenuCategoryDto celestialChill = menuService.createCategory(
//                new MenuCategoryDto(null, "The Celestial Chill",
//                        "Cool down with our invigorating iced coffee creations.",
//                        "❄️", new ArrayList<>())
//        );
//
//        menuService.addItemToCategory(celestialChill.id(),
//                new MenuItemDto(null, "Iced Espresso Shaker",
//                        "A double shot of espresso vigorously shaken with ice for a crisp and refreshing jolt.",
//                        new BigDecimal("6.75"), true, null, 5, Set.of("coffee", "espresso", "iced"))
//        );
//
//        menuService.addItemToCategory(celestialChill.id(),
//                new MenuItemDto(null, "Moonglow Iced Coffee",
//                        "Our signature iced coffee blend, subtly sweet and incredibly smooth.",
//                        new BigDecimal("6.00"), true, null, 4, Set.of("coffee", "iced"))
//        );
//
//        menuService.addItemToCategory(celestialChill.id(),
//                new MenuItemDto(null, "Milky Way Frappe",
//                        "A blended iced coffee with hints of chocolate and a swirl of whipped cream. A galactic treat.",
//                        new BigDecimal("7.75"), true, null, 7, Set.of("coffee", "iced", "blended"))
//        );
//    }

    public void createNewVenue() {
        if (venueDao.count() == 0) {
            venueDao.saveAll(List.of(
                    new Venue(null, "Grand Ballroom", "123 King Street, Downtown", 200,
                            "Elegant hall perfect for weddings and conferences.", 150.0, true,
                            "https://example.com/images/grand_ballroom.jpg"),
                    new Venue(null, "Rooftop Garden", "45 Skyview Ave, Uptown", 80,
                            "Open-air rooftop venue with scenic views.", 120.0, true,
                            "https://example.com/images/rooftop_garden.jpg"),
                    new Venue(null, "Community Hall", "10 Maple Drive, Suburbia", 100,
                            "Affordable and spacious hall for local events.", 60.0, true,
                            "https://example.com/images/community_hall.jpg"),
                    new Venue(null, "Tech Conference Room", "7 Silicon Blvd, Tech Park", 40,
                            "Modern room with AV equipment for meetings.", 90.0, true,
                            "https://example.com/images/tech_room.jpg"),
                    new Venue(null, "Art Gallery Space", "89 Canvas Lane, Arts District", 50,
                            "Minimalist space ideal for art showcases.", 110.0, true,
                            "https://example.com/images/art_gallery.jpg")
            ));
            System.out.println("✅ Sample venues seeded.");
        } else {
            System.out.println("ℹ️ Venues already exist, skipping seeding.");
        }
    }

}
