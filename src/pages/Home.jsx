import React, { useState, useEffect } from "react";
import { FaPaw, FaBone, FaShoppingBag, FaMedkit } from "react-icons/fa";
import RecentListings from "../components/RecentListings";

const banners = [
  "https://i.ibb.co/YBwDYqK3/banner1.jpg",
  "https://i.ibb.co/hFWYf4mk/banner2.jpg",
  "https://i.ibb.co/pr9vZnjG/banner3.jpg",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="py-20 bg-base-200">
      {/* Banner Section */}
      <div className="relative container mx-auto">
        {banners.map((img, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            {/* Left side */}
            <div className="px-15 md:w-1/2 w-full h-[300px] md:h-[400px] lg:h-[400px]">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right side */}
            <div className="md:w-1/2 w-full p-5 flex items-center justify-center px-10">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
                {taglines[index]}
              </h2>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-700"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-700"
        >
          &#10095;
        </button>

        <div className="absolute mt-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-indigo-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="my-20 mt-50 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg hover:bg-indigo-100 transition hover:scale-110 cursor-pointer bg-indigo-50"
            >
              {category.icon}
              <h3 className="mt-4 text-lg font-semibold text-gray-700 text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

          {/* Recent listing section */}
      <div>
        {
          <RecentListings></RecentListings>
        }
      </div>

      {/* Why Adopt section*/}
      <div className="my-50 py-20 container mx-auto px-4 bg-indigo-50 p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Adopt from PawMart?</h2>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
          Adopting pets helps save lives, reduces stray animals, and gives loving homes to pets in need. 
          Every adoption makes a difference — be a hero for a furry friend!
        </p>
      </div>

      {/* Pet Heroes section */}
      <div className="my-30 container mx-auto px-4 mb-80">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Meet Our Pet Heroes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {petHeroes.map((hero, index) => (
            <div key={index} className="flex flex-col items-center bg-indigo-50 transition hover:scale-110 hover:bg-indigo-100 p-6 rounded-xl shadow-lg">
              <img
                src={hero.image}
                alt={hero.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{hero.name}</h3>
              <p className="text-gray-600">{hero.role}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
