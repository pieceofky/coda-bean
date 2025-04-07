import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CreditCardIcon, BanknotesIcon, TruckIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

// Define types
type Product = {
    id: string;
    productName: string;
    price: number;
    imageUrl?: string;
};

type CartItem = Product & {
    quantity: number;
};

type ShippingOption = {
    id: string;
    name: string;
    price: number;
    estimated: string;
};

type PaymentMethod = {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
};

const CheckoutPage = () => {
    // Cart state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        shippingMethod: 'standard',
        paymentMethod: 'credit',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
        saveInfo: false,
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Shipping and payment options
    const shippingOptions: ShippingOption[] = [
        { id: 'standard', name: 'Standard Shipping', price: 5.99, estimated: '3-5 business days' },
        { id: 'express', name: 'Express Shipping', price: 12.99, estimated: '2-3 business days' },
        { id: 'priority', name: 'Priority Shipping', price: 19.99, estimated: '1-2 business days' },
    ];

    const paymentMethods: PaymentMethod[] = [
        { id: 'credit', name: 'Credit Card', icon: CreditCardIcon },
        { id: 'paypal', name: 'PayPal', icon: BanknotesIcon },
        { id: 'cod', name: 'Cash on Delivery', icon: TruckIcon },
    ];

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Update cart totals and save to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0));
        setCartTotal(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    }, [cart]);

    // Cart manipulation functions
    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            return existingItem
                ? prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    // Form handling
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip', 'country'];
        requiredFields.forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Phone validation
        if (formData.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Credit card validation if selected
        if (formData.paymentMethod === 'credit') {
            if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (!formData.cardName) newErrors.cardName = 'Name on card is required';
            if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
            if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsProcessing(true);

            // Simulate API call
            setTimeout(() => {
                const newOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
                setOrderId(newOrderId);
                setOrderSuccess(true);
                setIsProcessing(false);
                clearCart();
            }, 2000);
        }
    };

    if (orderSuccess) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-lg text-gray-600 mb-6">Thank you for your purchase.</p>
                    <p className="text-gray-700 mb-8">
                        Your order <span className="font-semibold">{orderId}</span> has been placed successfully.
                        We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-4">
                                            <img src={item.imageUrl || '/placeholder-product.jpg'} alt={item.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>
                                    {shippingOptions.find(s => s.id === formData.shippingMethod)?.price.toFixed(2) || '0.00'}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>
                                    ${(cartTotal + (shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 0)).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-[#4A6B57] text-white rounded-lg hover:bg-[#3a5a47] transition-colors"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => window.location.href = '/orders'}
                            className="px-6 py-3 border border-[#4A6B57] text-[#4A6B57] rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            View Order Details
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Floating Cart Button */}
            {/* <motion.button
                onClick={() => setIsCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 bg-[#4A6B57] text-white p-4 rounded-full shadow-lg z-40 flex items-center justify-center"
                aria-label="Shopping cart"
            >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-[#D4A96A] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                    >
                        {cartItemCount}
                    </motion.span>
                )}
            </motion.button> */}

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsCartOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50"
                        >
                            <div className="h-full flex flex-col">
                                <div className="bg-[#4A6B57] text-white p-4 flex justify-between items-center">
                                    <h2 className="text-xl font-bold">
                                        Your Cart ({cartItemCount})
                                    </h2>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-white hover:text-[#D4A96A] transition-colors"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="flex-grow overflow-y-auto p-4">
                                    {cart.length === 0 ? (
                                        <div className="text-center py-8">
                                            <ShoppingCartIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                            <p className="text-gray-500">Your cart is empty</p>
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {cart.map((item) => (
                                                <li key={item.id} className="py-4">
                                                    <div className="flex justify-between">
                                                        <div className="flex items-center">
                                                            <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                                                                <img
                                                                    src={item.imageUrl || "/placeholder-product.jpg"}
                                                                    alt={item.productName}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium text-[#4A6B57]">
                                                                    {item.productName}
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    ${item.price.toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center border border-gray-300 rounded-md mr-2">
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity(item.id, item.quantity - 1)
                                                                    }
                                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-2">{item.quantity}</span>
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity(item.id, item.quantity + 1)
                                                                    }
                                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <XMarkIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="border-t border-gray-200 p-4">
                                    <div className="flex justify-between mb-4">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-[#D4A96A]">
                                            ${cartTotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            window.scrollTo(0, 0);
                                        }}
                                        className={`w-full py-3 rounded-lg ${cart.length > 0 ? "bg-[#4A6B57] hover:bg-[#3a5a47]" : "bg-gray-400 cursor-not-allowed"} text-white transition-colors`}
                                        disabled={cart.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Form */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column - Form */}
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Customer Information */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 text-[#4A6B57]">Customer Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 text-[#4A6B57]">Shipping Address</h2>

                                <div className="mt-4">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="col-span-1">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                            State/Province *
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                                            ZIP/Postal Code *
                                        </label>
                                        <input
                                            type="text"
                                            id="zip"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 border rounded-md ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                        Country *
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-md ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                        <option value="DE">Germany</option>
                                    </select>
                                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                </div>
                            </div>

                            {/* Shipping Method */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 text-[#4A6B57]">Shipping Method</h2>

                                <div className="space-y-4">
                                    {shippingOptions.map((option) => (
                                        <div key={option.id} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`shipping-${option.id}`}
                                                name="shippingMethod"
                                                value={option.id}
                                                checked={formData.shippingMethod === option.id}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-[#4A6B57] focus:ring-[#4A6B57] border-gray-300"
                                            />
                                            <label htmlFor={`shipping-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                                                <div className="flex justify-between w-full">
                                                    <span>{option.name}</span>
                                                    <span>${option.price.toFixed(2)}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">{option.estimated}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 text-[#4A6B57]">Payment Method</h2>

                                <div className="space-y-4">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <div key={method.id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`payment-${method.id}`}
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={formData.paymentMethod === method.id}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-[#4A6B57] focus:ring-[#4A6B57] border-gray-300"
                                                />
                                                <label htmlFor={`payment-${method.id}`} className="ml-3 block text-sm font-medium text-gray-700 flex items-center">
                                                    <Icon className="h-5 w-5 mr-2" />
                                                    {method.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Credit Card Details (shown only if credit card selected) */}
                                {formData.paymentMethod === 'credit' && (
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                placeholder="1234 5678 9012 3456"
                                                className={`w-full px-3 py-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name on Card *
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardExpiry"
                                                    name="cardExpiry"
                                                    value={formData.cardExpiry}
                                                    onChange={handleChange}
                                                    placeholder="MM/YY"
                                                    className={`w-full px-3 py-2 border rounded-md ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardCvv"
                                                    name="cardCvv"
                                                    value={formData.cardCvv}
                                                    onChange={handleChange}
                                                    placeholder="123"
                                                    className={`w-full px-3 py-2 border rounded-md ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.cardCvv && <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Order Notes */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4 text-[#4A6B57]">Additional Information</h2>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                        Order Notes
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Special instructions, delivery notes, etc."
                                    />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="saveInfo"
                                            name="saveInfo"
                                            checked={formData.saveInfo}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-[#4A6B57] focus:ring-[#4A6B57] border-gray-300 rounded"
                                        />
                                        <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right column - Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-semibold mb-6 text-[#4A6B57]">Order Summary</h2>

                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-4">
                                                <img src={item.imageUrl || '/placeholder-product.jpg'} alt={item.productName} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>
                                        {formData.shippingMethod ?
                                            `$${shippingOptions.find(s => s.id === formData.shippingMethod)?.price.toFixed(2)}` :
                                            'Calculated at next step'}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>
                                        ${(cartTotal + (shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 0)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isProcessing || cart.length === 0}
                                className={`w-full mt-6 py-3 rounded-lg ${isProcessing || cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4A6B57] hover:bg-[#3a5a47]'} text-white transition-colors`}
                            >
                                {isProcessing ? 'Processing...' : 'Complete Order'}
                            </button>

                            <p className="text-xs text-gray-500 mt-4">
                                By placing your order, you agree to our <a href="#" className="text-[#4A6B57] hover:underline">Terms of Service</a> and <a href="#" className="text-[#4A6B57] hover:underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AnimatePresence component for the cart sidebar
const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default CheckoutPage;