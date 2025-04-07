export const ContactPage = () => {
    return (
        <div className="container mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <form className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                    <input className="w-full p-2 border rounded-md" type="text" id="name" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input className="w-full p-2 border rounded-md" type="email" id="email" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                    <textarea className="w-full p-2 border rounded-md" id="message" rows={4} />
                </div>
                <button className="button w-full" type="submit">Send Message</button>
            </form>
        </div>
    );
};