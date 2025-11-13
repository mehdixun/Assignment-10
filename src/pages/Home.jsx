import React, { useState, useEffect } from "react";
import { FaPaw, FaBone, FaShoppingBag, FaMedkit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RecentListings from "../components/RecentListings";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";


const banners = [
  "https://i.ibb.co/JRQYnsJy/Happy-owners.jpg",
  "https://i.ibb.co/S4Dj7J1B/Pets-adoptions.jpg",
  "https://i.ibb.co/B2LbJcHV/Petss.jpg"
  ];

const taglines = [
  "Find Your Furry Friend Today!",
  "Adopt, Don’t Shop — Give a Pet a Home.",
  "Because Every Pet Deserves Love and Care.",
];

const categories = [
  { name: "Pets", icon: <FaPaw size={40} className="text-indigo-500" /> },
  { name: "Pet Food", icon: <FaBone size={40} className="text-indigo-500" /> },
  { name: "Accessories", icon: <FaShoppingBag size={40} className="text-indigo-500" /> },
  { name: "Pet Care Products", icon: <FaMedkit size={40} className="text-indigo-500" /> },
];

const petHeroes = [
  { name: "Alice Johnson", role: "Pet Adopter", image: "https://i.ibb.co/zWSPbBwg/images.jpg" },
  { name: "Michael Smith", role: "Pet Caregiver", image: "https://i.ibb.co/79RDnmf/download-2.jpg" },
  { name: "Sophie Lee", role: "Pet Adopter", image: "https://i.ibb.co/zVLgmKcJ/download-1.jpg" },
  { name: "David Kim", role: "Pet Caregiver", image: "https://i.ibb.co/CK4rB2zD/download.jpg" },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home | Pawmart";
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category-filtered-product/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-base-200 pb-20">

      {/* Banner Section */}
      <div className="relative container mx-auto mt-4 rounded-2xl shadow-2xl overflow-hidden h-[400px] md:h-[500px]">
        {banners.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
            className={`absolute w-full h-full top-0 left-0 ${index === current ? "z-10" : "z-0"}`}
          >
            <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

            {index === current && (
              <div className="absolute inset-0 flex flex-col justify-center items-start md:pl-20 px-6 text-white space-y-5">
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl md:text-5xl font-bold drop-shadow-lg"
                >
                  <Typewriter
                    words={[taglines[index]]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </motion.h2>
              </div>
            )}
          </motion.div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-indigo-500 hover:scale-110 transition-transform text-white rounded-full p-2 hover:bg-indigo-700 z-20"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-indigo-500/70 text-white rounded-full p-2 hover:bg-indigo-700 z-20"
        >
          &#10095;
        </button>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? "bg-indigo-600 scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>


      {/* Category Section */}
      <div className="my-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-700 text-center">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Recent Listings */}
      <RecentListings></RecentListings>


      {/* Why Adopt Section */}
      <div className="py-20 container mx-auto px-4 bg-indigo-50 p-10 rounded-xl shadow-lg mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Adopt from PawMart?
        </h2>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
          Adopting pets helps save lives, reduces stray animals, and gives loving homes to pets in need.
          Every adoption makes a difference — be a hero for a furry friend!
        </p>
      </div>

      {/* Pet Heroes */}
      <div className="my-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Meet Our Pet Heroes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {petHeroes.map((hero, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center bg-indigo-50 hover:bg-indigo-100 p-6 rounded-xl shadow-lg"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{hero.name}</h3>
              <p className="text-gray-600">{hero.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
