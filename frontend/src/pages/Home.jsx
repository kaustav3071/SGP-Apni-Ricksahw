import React, { useState } from "react";
import { motion } from "framer-motion";
import APNI1 from "../assets/APNI1.png";
import Map from "../assets/UberAuto-Delhi.jpg";
import LocationSearchPanel from "../components/LocationSearchPanel";

const rideOptions = [
    { type: "Budget Friendly (8P)", time: 3, description: "Shared ride · Cost-effective", price: 80 },
    { type: "Shuttle (5P)", time: 2, description: "Group travel · Comfortable", price: 120 },
    { type: "Special (1P)", time: 1, description: "Premium ride · Fast & private", price: 200 },
    { type: "Mini Auto (3P)", time: 2, description: "Compact ride · Budget-friendly", price: 150 },
    { type: "Luxury Auto (2P)", time: 1, description: "Luxury experience · Extra comfort", price: 250 },
    { type: "Express Ride (1P)", time: 1, description: "No stops · Direct trip", price: 220 }
];

const Home = () => {
    const [pickupLocation, setPickupLocation] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPickupPanel, setShowPickupPanel] = useState(false);
    const [showDestinationPanel, setShowDestinationPanel] = useState(false);
    const [showAutoDetails, setShowAutoDetails] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Pickup:", pickupLocation, "Destination:", destinationLocation);
        setShowAutoDetails(true); // Show auto details
    };

    return (
        <div className="h-screen flex flex-col bg-yellow-100 relative" style={{ fontFamily: 'sans-serif' }}>
            {/* Logo */}
            <img src={APNI1} alt="Logo" className="w-16 absolute top-2 left-3 z-10" />

            {/* Map */}
            {!isExpanded && !showAutoDetails && (
                <div className="w-full h-2/3 relative">
                    <img src={Map} alt="Map" className="w-full h-full object-cover rounded-b-lg shadow-md" />
                </div>
            )}

            {/* Yellow Background when Auto Details Pop-up is open */}
            {showAutoDetails && <div className="w-full h-2/3 bg-yellow-100"></div>}

            {/* Input section (Hidden when Auto Details Pop-up is open) */}
            {!showAutoDetails && (
                <motion.div
                    initial={{ height: "33%" }}
                    animate={{ height: isExpanded ? "100vh" : "33%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-green-300 p-6 rounded-t-lg shadow-lg w-full absolute bottom-0 left-0"
                    onClick={() => setIsExpanded(true)}
                >
                    {isExpanded && (
                        <button
                            className="absolute top-4 right-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                        >
                            <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/ios/50/circled-chevron-down.png"
                                alt="collapse-icon"
                            />
                        </button>
                    )}

                    <h4 className="text-2xl font-bold text-black mb-4 text-center">
                        {isExpanded ? "Enter Trip Details" : "Find a Trip"}
                    </h4>

                    <form onSubmit={submitHandler} className="relative">
                        {/* Pickup Input */}
                        <div className="relative w-full my-4">
                            <img
                                src="https://img.icons8.com/ios-filled/50/40C057/marker.png"
                                alt="marker"
                                className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                onFocus={() => setShowPickupPanel(true)}
                                onBlur={() => setTimeout(() => setShowPickupPanel(false), 200)}
                                type="text"
                                placeholder="Add a pick-up location"
                                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pl-12"
                            />
                        </div>

                        {/* Drop Input */}
                        <div className="relative w-full my-4">
                            <img
                                src="https://img.icons8.com/ios-filled/50/FA5252/marker.png"
                                alt="marker"
                                className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                value={destinationLocation}
                                onChange={(e) => setDestinationLocation(e.target.value)}
                                onFocus={() => setShowDestinationPanel(true)}
                                onBlur={() => setTimeout(() => setShowDestinationPanel(false), 200)}
                                type="text"
                                placeholder="Enter your destination"
                                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pl-12"
                            />
                        </div>

                        {/* Find Your Saarthi Button */}
                        {isExpanded && (
                            <motion.button
                                type="submit"
                                className="w-full p-4 bg-blue-600 text-white rounded-lg mt-6 text-lg font-semibold hover:bg-blue-700 transition"
                                whileTap={{ scale: 0.95 }}
                            >
                                Find Your Saarthi
                            </motion.button>
                        )}
                    </form>

                    {/* Show Pickup Location Panel */}
                    <LocationSearchPanel
                        isVisible={showPickupPanel}
                        onSelect={(location) => {
                            setPickupLocation(location);
                            setShowPickupPanel(false);
                        }}
                    />
                    {/* Show Destination Location Panel */}
                    <LocationSearchPanel
                        isVisible={showDestinationPanel}
                        onSelect={(location) => {
                            setDestinationLocation(location);
                            setShowDestinationPanel(false);
                        }}
                    />
                </motion.div>
            )}

            {/* Auto Details Pop-up */}
            {showAutoDetails && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 w-full bg-white shadow-2xl rounded-t-lg p-6"
                >
                    <button
                        className="absolute top-4 right-4 text-gray-600"
                        onClick={() => setShowAutoDetails(false)}
                    >
                        ❌
                    </button>

                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Available Saarthi's For You</h2>

                    {rideOptions.map((ride, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-green-100 rounded-lg mb-3">
                            <div className="flex items-center gap-3">
                                <img src="https://img.icons8.com/color/48/auto-rickshaw.png" alt="auto-rickshaw" className="w-10 h-10"/>
                                <div>
                                    <h3 className="font-bold">{ride.type}</h3>
                                    <p className="text-black text-sm">{ride.time} mins away · {ride.description}</p>
                                </div>
                            </div>
                            <span className="font-bold text-lg">₹{ride.price}.00</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Home;
