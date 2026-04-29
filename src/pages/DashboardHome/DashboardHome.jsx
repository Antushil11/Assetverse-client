import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, Activity, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
    const stats = [
        { label: 'Total Assets', value: '1,284', icon: Activity, color: 'text-blue-500' },
        { label: 'Active Coverage', value: '94%', icon: Shield, color: 'text-green-500' },
        { label: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: 'text-purple-500' },
        { label: 'Locations', value: '64', icon: MapPin, color: 'text-orange-500' },
    ];

    const coverageUpdates = [
        { area: 'Dhaka North', status: 'Enhanced', date: '2 hours ago' },
        { area: 'Chittagong Port', status: 'New Center', date: '5 hours ago' },
        { area: 'Sylhet Metro', status: 'Upgraded', date: '1 day ago' },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Manager</h1>
                <p className="text-gray-500 text-lg">Here's what's happening with your assets today.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center"
                    >
                        <div className={`p-4 rounded-xl bg-gray-50 ${stat.color} mr-4`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* New Coverage Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">New Coverage Distribution</h2>
                        <button className="text-primary font-bold hover:underline">View Map</button>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic">
                        [Interactive Map Placeholder - Integration Pending]
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Coverage</h2>
                    <div className="space-y-6">
                        {coverageUpdates.map((update, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0">
                                <div>
                                    <p className="font-bold text-gray-800">{update.area}</p>
                                    <p className="text-sm text-gray-500">{update.date}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">
                                    {update.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
                    >
                        Add New Coverage
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;