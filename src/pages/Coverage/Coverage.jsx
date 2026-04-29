import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { Search, MapPin, Globe, Filter, Navigation } from "lucide-react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const [map, setMap] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters?.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district && map) {
      const coord = [district.latitude, district.longitude];
      map.flyTo(coord, 12, {
        duration: 2
      });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#021A1D]">
      {/* Page Hero */}
      <section className="py-32 rounded-b-[80px] relative overflow-hidden mb-20 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full text-white/80 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md border border-white/5">
            <Globe size={14} className="text-primary" /> Operational Network
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            Global <br /> <span className="text-primary">Coverage.</span>
          </h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Ensuring your assets are governed and managed across all 64 districts with precision and speed.
          </p>
        </div>
      </section>

      {/* Map Content */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Search Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl space-y-8 h-fit sticky top-32 backdrop-blur-xl">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <Search size={20} />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">Navigation</h3>
                    </div>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <input
                            name="location"
                            type="search"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-bold text-sm text-white placeholder:text-white/20"
                            placeholder="District name..."
                        />
                        <button className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3">
                            Search Region <Navigation size={14} />
                        </button>
                    </form>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-6">Network Health</h4>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 font-bold text-sm">Active Districts</span>
                            <span className="text-xl font-black text-white">64</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 font-bold text-sm">Hub Points</span>
                            <span className="text-xl font-black text-white">120+</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white/40 font-bold text-sm">SLA Uptime</span>
                            <span className="text-xl font-black text-primary">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 border-[12px] border-white/5 bg-white/5 rounded-[60px] shadow-2xl overflow-hidden h-[800px] relative z-0"
          >
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-full w-full"
              ref={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenters?.map((center, index) => (
                <Marker key={index} position={[center.latitude, center.longitude]}>
                  <Popup className="custom-popup-dark">
                    <div className="p-4 space-y-3 bg-[#021A1D] text-white rounded-2xl border border-white/10 shadow-2xl">
                      <h4 className="font-black text-xl text-primary tracking-tight">{center.district}</h4>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest italic leading-relaxed">Authorized Hub.</p>
                      <div className="flex flex-wrap gap-2">
                        {center.covered_area.map((area, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 text-white/60 text-[9px] rounded-full uppercase font-black tracking-widest border border-white/5">{area}</span>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </section>
    </div>


  );
};

export default Coverage;


