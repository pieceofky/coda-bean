import React, { useState, useEffect } from "react";
import {
  FilmIcon,
  MusicalNoteIcon,
  HeartIcon,
  CalendarIcon,
  BookOpenIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const HomePage: React.FC = () => {
  const photos = [
    { src: "codaBean01.jpg"},
    { src: "codaBean02.jpg"},
    { src: "codaBean03.jpg"},
    { src: "codaBean04.jpg"},
    { src: "codaBean05.jpg"},
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="min-h-screen relative bg-[#f9f7f2] bg-opacity-50" style={{
        backgroundImage: 'radial-gradient(#D4A96A 0.5px, transparent 0.5px), radial-gradient(#D4A96A 0.5px, #f9f7f2 0.5px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[600px] flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MusicalNoteIcon className="h-[400px] w-[400px] text-[#D4A96A] rotate-12 opacity-30" />
            <FilmIcon className="h-[400px] w-[400px] text-[#4A6B57] -rotate-12 opacity-30 absolute" />
          </motion.div>

          <div className="relative z-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold mb-6 text-[#4A6B57]"
            >
              The Coda Bean
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-2xl mb-4 text-[#191a19]">
                Where Coffee Meets Culture
              </p>
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg font-medium font-mono text-[#2e312e] max-w-2xl mx-auto bg-white/70 p-4 rounded-lg backdrop-blur-sm"
              >
                A sanctuary for coffee connoisseurs, music lovers, and film enthusiasts.
                Savor artisanal brews while immersed in classical melodies or our curated cinema nights.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/menu"
                className="bg-[#4A6B57] text-[#F7F4F0] py-3 px-8 rounded-lg font-semibold transition-all duration-300 hover:bg-[#2e2a22] shadow-lg"
              >
                Explore Our Menu
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/events"
                className="bg-white text-[#4A6B57] border-2 border-[#4A6B57] py-3 px-8 rounded-lg font-semibold transition-all duration-300 hover:bg-[#4A6B57]/10 shadow-lg"
              >
                View Events
              </motion.a>
            </motion.div>

            {/* Animated divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 1.2, duration: 1 }}
              className="h-1 bg-gradient-to-r from-[#4A6B57] via-[#D4A96A] to-[#4A6B57] rounded-full mx-auto mt-12"
            ></motion.div>
          </div>

          {/* Floating elements at bottom */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 opacity-80"
          >
            <FilmIcon className="h-8 w-8 text-[#4A6B57]" />
            <MusicalNoteIcon className="h-8 w-8 text-[#D4A96A]" />
            <BookOpenIcon className="h-8 w-8 text-[#4A6B57]" />
            <HeartIcon className="h-8 w-8 text-[#D4A96A]" />
          </motion.div>
        </section>

        {/* Features Section - Cards Layout
        <section className="container mx-auto py-16 px-4 my-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-[#4A6B57]"
          >
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/80 p-6 rounded-lg shadow-lg border border-[#D4A96A]/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center space-x-2 mb-4">
                  {feature.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`${i === 0 ? 'bg-[#4A6B57] text-[#F7F4F0]' : 'bg-[#D4A96A] text-[#3E3E3E]'} px-3 py-1 rounded-full text-sm`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <feature.icon className="h-12 w-12 text-[#4A6B57] mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-[#4A6B57]">
                  {feature.title}
                </h3>
                <p className="text-lg text-[#6E7C6E] mb-4">{feature.description}</p>
                <a
                  href={feature.link}
                  className="bg-[#4A6B57] text-[#F7F4F0] py-2 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#6E7C6E] hover:scale-105 inline-block"
                >
                  {feature.buttonText}
                </a>
              </motion.div>
            ))}
          </div>
        </section> */}

        <section className="py-20 my-8 bg-gradient-to-br from-[#4A6B57] to-[#2e2a22] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/coffee.png')"
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-16"
            >
              <ShoppingBagIcon className="h-12 w-12 text-[#D4A96A] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-[#F7F4F0] mb-4">Our Signature Brews</h2>
              <p className="text-xl text-[#D4A96A]">Handcrafted with care, enjoyed with passion</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/90 rounded-xl overflow-hidden shadow-2xl"
                >
                  <div className="h-65 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-[#4A6B57]">{product.name}</h3>
                      <span className="bg-[#D4A96A] text-[#3E3E3E] px-3 py-1 rounded-full text-sm font-semibold">${product.price}</span>
                    </div>
                    <p className="text-[#6E7C6E] mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#4A6B57] font-medium">{product.origin}</span>
                      <button className="bg-[#4A6B57] text-[#F7F4F0] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2e2a22] transition-colors">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="/menu"
                className="inline-block bg-[#D4A96A] text-[#3E3E3E] font-semibold py-3 px-8 rounded-lg hover:bg-[#F7F4F0] transition-colors"
              >
                View Full Menu
              </a>
            </motion.div>
          </div>
        </section>

        {/* Photo Carousel Section */}
        <section className="py-16 px-4 my-8">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#4A6B57]"
            >
              Our Coffee Haven
            </motion.h2>

            <div className="relative h-[60vh] max-h-[600px] rounded-xl overflow-hidden shadow-lg border-2 border-[#4A6B57]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={photos[currentIndex].src}
                    alt={photos[currentIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#D4A96A] w-6" : "bg-white/70"
                      }`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 text-center px-4"
              >
                <p className="text-lg md:text-xl font-medium text-white drop-shadow-md">
                  {photos[currentIndex].alt}
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-[#6E7C6E] text-center mt-12 max-w-2xl mx-auto"
            >
              Every corner of The Coda Bean tells a story—from the aroma of freshly ground beans to the hushed reverence of a film’s climax, or the way a classical melody lingers in the air like steam from a perfect pour.
            </motion.p>
          </div>
        </section>

        <section className="py-20 my-8 bg-[#F7F4F0] relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <MusicalNoteIcon className="h-12 w-12 text-[#4A6B57] mb-4" />
                <h2 className="text-4xl font-bold text-[#4A6B57] mb-6">Classical Evenings</h2>
                <p className="text-xl text-[#6E7C6E] mb-8">
                  Immerse yourself in the timeless beauty of live classical music performed by talented local musicians in our intimate setting.
                </p>
                <div className="space-y-6">
                  {musicians.map((musician, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${musician.image})` }}></div>
                      <div>
                        <h4 className="text-lg font-bold text-[#4A6B57]">{musician.name}</h4>
                        <p className="text-[#6E7C6E]">{musician.instrument}</p>
                        <p className="text-sm text-[#D4A96A]">{musician.nextPerformance}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="/music-schedule"
                  className="inline-block mt-8 bg-[#4A6B57] text-[#F7F4F0] font-semibold py-3 px-8 rounded-lg hover:bg-[#2e2a22] transition-colors"
                >
                  View Performance Schedule
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#4A6B57] mb-4">Upcoming Performances</h3>
                  <div className="space-y-4">
                    {performances.map((performance, index) => (
                      <div key={index} className="border-b border-[#D4A96A]/30 pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-[#4A6B57]">{performance.title}</h4>
                            <p className="text-[#6E7C6E]">{performance.musician}</p>
                          </div>
                          <span className="bg-[#D4A96A] text-[#3E3E3E] px-3 py-1 rounded-full text-sm font-semibold">
                            {performance.date}
                          </span>
                        </div>
                        <p className="text-sm text-[#6E7C6E] mt-2">{performance.description}</p>
                        <a
                          href={performance.link}
                          className="inline-block mt-2 text-sm text-[#4A6B57] font-semibold hover:underline"
                        >
                          Learn more →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Film Screenings Section - Dark Theme */}
        <section className="py-20 my-8 bg-[#2e2a22] text-[#F7F4F0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png')"
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-2">Curated Cinema Nights</h1>
              <h2 className="text-2xl text-[#D4A96A] mb-3">
                Film, Food & Discussion
              </h2>
              <p className="text-lg italic text-gray-300">
                Special Projector Nights • Themed Snacks (only for the night) • Post-Screening Chats
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {films.map((film, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#3E3E3E]/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${film.image})` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-xl font-bold">{film.title}</h3>
                      <p className="text-sm text-[#D4A96A]">{film.director}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-[#D4A96A]">{film.date}</span>
                      <span className="text-sm bg-[#D4A96A] text-[#3E3E3E] px-2 py-1 rounded">{film.rating}</span>
                    </div>
                    <p className="text-sm text-[#F7F4F0]/80 mb-4">{film.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#D4A96A]">{film.runtime}</span>
                      <a
                        href={film.link}
                        className="text-sm font-semibold text-[#F7F4F0] hover:text-[#D4A96A] transition-colors"
                      >
                        Reserve Seats
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="/film-schedule"
                className="inline-block bg-[#D4A96A] text-[#3E3E3E] font-semibold py-3 px-8 rounded-lg hover:bg-[#F7F4F0] transition-colors"
              >
                View Full Screening Schedule
              </a>
            </motion.div>
          </div>
        </section>

        {/* Event Venue Section - Split Layout */}
        <section className="py-20 my-8 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="h-96 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="codaBean06.jpg"
                    alt="Event venue at The Coda Bean"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <CalendarIcon className="h-12 w-12 text-[#4A6B57] mb-4" />
                <h2 className="text-4xl font-bold text-[#4A6B57] mb-6">Host Your Event With Us</h2>
                <p className="text-lg text-[#6E7C6E] mb-8">
                  Our charming space is perfect for intimate gatherings, creative workshops, and special celebrations. Let us help you create unforgettable memories.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {venueFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-[#D4A96A] text-[#3E3E3E] p-2 rounded-lg">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#4A6B57]">{feature.title}</h4>
                        <p className="text-sm text-[#6E7C6E]">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/venue-booking"
                    className="bg-[#4A6B57] text-[#F7F4F0] font-semibold py-3 px-8 rounded-lg hover:bg-[#2e2a22] transition-colors"
                  >
                    Book Now
                  </a>
                  <a
                    href="/venue-gallery"
                    className="bg-transparent border-2 border-[#4A6B57] text-[#4A6B57] font-semibold py-3 px-8 rounded-lg hover:bg-[#4A6B57]/10 transition-colors"
                  >
                    View Gallery
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Coffee Blog Section - Card Grid */}
        <section className="py-20 my-8 bg-[#f8f4e9] relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BookOpenIcon className="h-12 w-12 text-[#4A6B57] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-[#4A6B57] mb-4">From Our Blog</h2>
              <p className="text-xl text-[#6E7C6E] max-w-3xl mx-auto">
                Discover the world of coffee through our stories and guides
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs font-semibold text-[#D4A96A]">{post.category}</span>
                      <span className="text-xs text-[#6E7C6E]">•</span>
                      <span className="text-xs text-[#6E7C6E]">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4A6B57] mb-3">{post.title}</h3>
                    <p className="text-[#6E7C6E] mb-4">{post.excerpt}</p>
                    <a
                      href={post.link}
                      className="text-sm font-semibold text-[#4A6B57] hover:text-[#2e2a22] transition-colors flex items-center"
                    >
                      Read more <span className="ml-1">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="/blog"
                className="inline-block bg-[#4A6B57] text-[#F7F4F0] font-semibold py-3 px-8 rounded-lg hover:bg-[#2e2a22] transition-colors"
              >
                Visit Our Blog
              </a>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - Carousel */}
        <section className="py-20 my-8 bg-[#4A6B57] text-[#F7F4F0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-3.png')"
          }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SparklesIcon className="h-12 w-12 text-[#D4A96A] mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-[#D4A96A] max-w-3xl mx-auto">
                Hear from our wonderful community of coffee lovers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#3E3E3E]/50 p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-cover bg-center mr-4" style={{ backgroundImage: `url(${testimonial.authorImage})` }}></div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-[#D4A96A]">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg mb-4">"{testimonial.text}"</p>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#D4A96A] fill-current' : 'text-[#6E7C6E]'}`} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 my-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-96 rounded-lg overflow-hidden shadow-lg border-2 border-[#4A6B57]">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f4c0bb!2sThe%20Coda%20Bean!5e0!3m2!1sen!2sus!4v1633023226783!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-6 text-[#4A6B57]">
                  Join Us Here!
                </h2>
                <p className="text-xl mb-8 text-[#6E7C6E]">
                  Visit us at our cozy spot in the heart of the neighborhood.
                </p>
                <div className="mb-8">
                  <p className="text-lg text-[#4A6B57] font-semibold">
                    📍 Address
                  </p>
                  <p className="text-lg text-[#6E7C6E]">
                    123 Coffee Lane, Neighborhood City, NC 12345
                  </p>
                </div>
                <div className="mb-8">
                  <p className="text-lg text-[#4A6B57] font-semibold">📞 Phone</p>
                  <p className="text-lg text-[#6E7C6E]">(123) 456-7890</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/directions"
                    className="bg-[#4A6B57] text-[#F7F4F0] py-3 px-10 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#6E7C6E] hover:scale-105 inline-block"
                  >
                    Get Directions
                  </a>
                  <a
                    href="/contact"
                    className="bg-transparent border-2 border-[#4A6B57] text-[#4A6B57] py-3 px-10 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#4A6B57]/10 hover:scale-105 inline-block"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#4A6B57] text-[#F7F4F0] py-12 text-center relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">The Coda Bean</h3>
                <p className="mb-4">Where coffee meets culture in perfect harmony.</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-[#D4A96A] transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-[#D4A96A] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-[#D4A96A] transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7am - 9pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>8am - 10pm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>8am - 8pm</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/menu" className="hover:text-[#D4A96A] transition-colors">Menu</a></li>
                  <li><a href="/events" className="hover:text-[#D4A96A] transition-colors">Events</a></li>
                  <li><a href="/gallery" className="hover:text-[#D4A96A] transition-colors">Gallery</a></li>
                  <li><a href="/blog" className="hover:text-[#D4A96A] transition-colors">Blog</a></li>
                  <li><a href="/about" className="hover:text-[#D4A96A] transition-colors">Our Story</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="mb-4">Subscribe to our newsletter for updates and special offers.</p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-lg w-full text-[#3E3E3E] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#D4A96A] text-[#3E3E3E] px-4 py-2 rounded-r-lg hover:bg-[#F7F4F0] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-8 border-t border-[#6E7C6E]/30">
              <p className="text-sm">© 2025 The Coda Bean. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Star icon component for ratings
const StarIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


const products = [
  {
    name: "Ethiopian Yirgacheffe",
    description: "Bright and floral with notes of lemon and jasmine. Our most popular single-origin.",
    price: "4.50",
    origin: "Ethiopia",
    image: "ethiopian_coffee.jpg"
  },
  {
    name: "Seasonal Special",
    description: "Rotating selection of rare and limited coffees from around the world.",
    price: "5.50",
    origin: "Varies",
    image: "seasonal_coffee.jpg"
  },
  {
    name: "Coda Signature Blend",
    description: "Our house blend with chocolatey depth and a hint of citrus. Perfect for espresso.",
    price: "4.75",
    origin: "Multiple Origins",
    image: "coda_bean_signature.jpg"
  },  
];

const musicians = [
  {
    name: "Elena Petrov",
    instrument: "Classical Piano",
    nextPerformance: "Performing Chopin this Friday",
    image: "musician1.jpg"
  },
  {
    name: "David Chen",
    instrument: "Cello",
    nextPerformance: "Bach Cello Suites on 12/15",
    image: "musician2.jpg"
  },
  {
    name: "Sophia Rodriguez",
    instrument: "Classical Guitar",
    nextPerformance: "Spanish guitar night on 12/20",
    image: "musician3.jpg"
  }
];

const performances = [
  {
    title: "Moonlight Sonata Evening",
    musician: "Elena Petrov",
    date: "Apr 25, 7pm",
    description: "An intimate performance of Beethoven's iconic piano sonata.",
    link: "/event/moonlight-sonata"
  },
  {
    title: "Bach Cello Suites",
    musician: "David Chen",
    date: "May 2, 6:30pm",
    description: "All six suites performed with masterful interpretation.",
    link: "/event/bach-cello"
  },
  {
    title: "Flamenco Night",
    musician: "Sophia Rodriguez",
    date: "May 9, 8pm",
    description: "Spanish classics and original compositions.",
    link: "/event/flamenco-night"
  }
];

const films = [
  {
    title: "The Darjeeling Limited",
    director: "Wes Anderson",
    date: "Apr 26, 7pm",
    rating: "R",
    runtime: "91 min",
    description: "🚂 Wes Anderson’s Colorful Odyssey — Experience this whimsical journey, pair with our house-made masala chai and spiced samosas. Stay after for a ‘Symmetry in Anderson’s Films’ visual discussion!",
    image: "darjeeling_limited.png",
    link: "/film/darjeeling-limited"
  },
  {
    title: "The Secret Life of Walter Mitty",
    director: "Ben Stiller",
    date: "May 3, 7pm",
    rating: "PG",
    runtime: "114 min",
    description: "🏔️ Adventure Under the Projector’s Glow — Icelandic landscapes beam across our silver screen. Try expedition-inspired trail mix and share your ‘dream escapes’ in the post-film chat.",
    image: "walter_mitty.jpg",
    link: "/film/walter-mitty"
  },
  {
    title: "Amélie",
    director: "Jean-Pierre Jeunet",
    date: "May 10, 7pm",
    rating: "R",
    runtime: "122 min",
    description: "🍒 Parisian Whimsy Night — Candlelit seating, the hum of our classic projector, and crème brûlée. We’ll debate: ‘Can small acts of kindness change the world?’ Our answer is 'Oui!'",
    image: "amelie.jpg",
    link: "/film/amelie"
  },
  {
    title: "Singin' in the Rain",
    director: "Stanley Donen & Gene Kelly",
    date: "May 17, 7pm",
    rating: "G",
    runtime: "103 min",
    description: "☕️ Tap-Dancing with Your Latte — Celebrate Hollywood’s most joyful musical with our special ‘Cloudy Day’ espresso blend. Post-film chat: ‘What modern actor could pull off Gene Kelly’s rain dance?’",
    image: "singing_in_the_rain.jpg",
    link: "/film/singing-in-the-rain"
  }
];

const venueFeatures = [
  {
    icon: UserGroupIcon,
    title: "Capacity",
    description: "Up to 50 guests for seated events"
  },
  {
    icon: MusicalNoteIcon,
    title: "Audio Equipment",
    description: "Premium sound system available"
  },
  {
    icon: FilmIcon,
    title: "Projector & Screen",
    description: "HD projection for presentations"
  },
  {
    icon: SparklesIcon,
    title: "Custom Decor",
    description: "We'll help set the perfect mood"
  },
  {
    icon: ShoppingBagIcon,
    title: "Catering Options",
    description: "Full coffee bar & food menu"
  },
  {
    icon: CalendarIcon,
    title: "Flexible Booking",
    description: "Daytime and evening availability"
  }
];

const blogPosts = [
  {
    title: "The Art of Latte: A Barista's Journey",
    excerpt: "Discover how our head barista perfected the craft of latte art over years of practice and passion.",
    category: "Coffee Culture",
    date: "Nov 15, 2025",
    image: "latte-coffee-art.jpg",
    link: "/blog/latte-art"
  },
  {
    title: "Bean to Cup: Tracing Coffee's Journey",
    excerpt: "Follow the fascinating path from coffee farms to your morning cup at The Coda Bean.",
    category: "Sustainability",
    date: "Oct 28, 2025",
    image: "bean-to-cup.jpg",
    link: "/blog/bean-to-cup"
  },
  {
    title: "5 Classical Pieces to Enjoy with Coffee",
    excerpt: "Our curated playlist of classical masterpieces that pair perfectly with different coffee styles.",
    category: "Music",
    date: "Oct 12, 2025",
    image: "music-coffee.jpg",
    link: "/blog/classical-coffee"
  }
];

const testimonials = [
  {
    text: "The best coffee and atmosphere in town! I come here every weekend for their film nights and board game tournaments.",
    author: "Jane Doe",
    role: "Regular Customer",
    rating: 5,
    authorImage: "testimonial1.jpg"
  },
  {
    text: "The Coda Bean is my happy place. The coffee is amazing, and the classical music evenings are so relaxing.",
    author: "John Smith",
    role: "Music Lover",
    rating: 5,
    authorImage: "testimonial2.jpg"
  },
  {
    text: "I love the community vibe here. It's the perfect spot to work, read, or just enjoy a great cup of coffee.",
    author: "Emily Johnson",
    role: "Freelance Writer",
    rating: 4,
    authorImage: "testimonial3.jpg"
  },
  {
    text: "The board game tournaments are so much fun! I've made so many friends here while playing my favorite games.",
    author: "Michael Brown",
    role: "Game Enthusiast",
    rating: 5,
    authorImage: "testimonial4.jpg"
  },
  {
    text: "The Coda Bean is more than a coffee shop—it's a cultural hub. I always leave feeling inspired and refreshed.",
    author: "Sarah Lee",
    role: "Local Artist",
    rating: 5,
    authorImage: "testimonial5.jpg"
  },
  {
    text: "As a musician, I appreciate the intimate setting and attentive audience at their classical evenings. A wonderful venue!",
    author: "David Chen",
    role: "Cellist",
    rating: 5,
    authorImage: "testimonial6.jpg"
  }
];

export default HomePage;