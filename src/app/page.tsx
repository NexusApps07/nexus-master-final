"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, ShoppingBag, Edit3, Trash2, X, ChevronRight, 
  CheckCircle, Bell, User, Plus, Heart, Dog, Download, 
  Smartphone 
} from 'lucide-react';
import { getAssetPath } from '@/lib/utils'; // Utility we created earlier

// --- TYPES ---
interface Booking { id: number; service: string; price: string; date: string; time: string; }
interface Pet { id: number; name: string; breed: string; notes: string; }

export default function NexusMasterPortal() {
  const [activeTab, setActiveTab] = useState('experience');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  // UI State
  const [isScheduling, setIsScheduling] = useState<{id?: number, name: string, price: string} | null>(null); 
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', notes: '' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // --- PERSISTENCE ---
  useEffect(() => {
    setIsMounted(true);
    const savedBookings = localStorage.getItem('nexus_vault_data');
    const savedPets = localStorage.getItem('nexus_pet_data');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedPets) setPets(JSON.parse(savedPets));
  }, []);

  // --- COMPILER-OPTIMIZED LOGIC ---
  // Note: No useMemo here. The React Compiler automatically memoizes this array.
  const getAvailableDates = () => {
    const days = [];
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toLocaleDateString('en-US', options));
    }
    return days;
  };

  const handleSaveBooking = (date: string, time: string) => {
    if (!isScheduling) return;
    const updated = isScheduling.id 
      ? bookings.map(b => b.id === isScheduling.id ? { ...b, date, time } : b)
      : [{ id: Date.now(), service: isScheduling.name, price: isScheduling.price, date, time }, ...bookings];
    
    setBookings(updated);
    localStorage.setItem('nexus_vault_data', JSON.stringify(updated));
    setToast(isScheduling.id ? "Schedule Updated" : "Booking Confirmed");
    setIsScheduling(null);
    setTimeout(() => setToast(null), 3000);
  };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="max-w-md mx-auto min-h-screen pb-32 relative bg-background text-neutral-200 font-sans selection:bg-nexusBlue/30">
      
      {/* LUXURY AMBIANCE */}
      <div className="fixed top-[-5%] left-[-10%] w-72 h-72 bg-nexusBlue/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-tight italic">Nexus Master</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mt-1">Premium Client Portal</p>
        </div>
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white relative active:scale-90 transition-all"
        >
          <Bell size={18} />
          <div className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-nexusBlue rounded-full shadow-[0_0_8px_#38bdf8]" />
        </button>
      </header>

      <main className="px-6 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'experience' && (
            <motion.div key="exp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="relative w-full h-60 overflow-hidden rounded-[2.5rem] border border-white/5">
                <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-2 py-1 bg-nexusBlue text-black text-[8px] font-black uppercase tracking-widest rounded">Member Access</span>
                  <h2 className="text-white text-2xl font-serif mt-2 italic">Refined Care.</h2>
                </div>
              </div>

              <ServiceCard name="Essential Session" price="$65" onSelect={() => setIsScheduling({name: "Essential Session", price: "$65"})} />
              <ServiceCard name="Full Grooming" price="$95" onSelect={() => setIsScheduling({name: "Full Grooming", price: "$95"})} />
            </motion.div>
          )}

          {activeTab === 'vault' && (
             <motion.div key="vlt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {bookings.map(b => (
                  <div key={b.id} className="bg-neutral-900/40 border border-white/5 p-6 rounded-[2rem] flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-nexusBlue uppercase tracking-widest mb-1">{b.date} • {b.time}</p>
                      <h4 className="text-white font-medium">{b.service}</h4>
                    </div>
                    <button onClick={() => setBookings(bookings.filter(x => x.id !== b.id))} className="text-red-500/50 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-8 left-6 right-6 z-50">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 flex justify-between shadow-2xl">
          <NavBtn active={activeTab === 'experience'} icon={<ShoppingBag size={18}/>} label="Book" onClick={() => setActiveTab('experience')} />
          <NavBtn active={activeTab === 'vault'} icon={<History size={18}/>} label="Vault" onClick={() => setActiveTab('vault')} />
          <NavBtn active={activeTab === 'family'} icon={<User size={18}/>} label="Family" onClick={() => setActiveTab('family')} />
        </div>
      </nav>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-28 left-6 right-6 bg-white text-black p-4 rounded-2xl flex items-center gap-3 shadow-2xl z-[100]">
            <CheckCircle size={18} className="text-green-600" />
            <p className="text-xs font-bold uppercase tracking-tight">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function ServiceCard({ name, price, onSelect }: any) {
  return (
    <div onClick={onSelect} className="bg-neutral-900/40 p-6 rounded-[2rem] border border-white/5 flex justify-between items-center group active:scale-[0.98] transition-all">
      <div>
        <h4 className="text-white font-medium text-lg tracking-tight">{name}</h4>
        <p className="text-neutral-500 text-xs mt-1">Premium service included.</p>
      </div>
      <div className="text-right">
        <span className="text-white font-light text-xl block mb-2">{price}</span>
        <div className="flex items-center gap-1 text-nexusBlue text-[9px] font-black uppercase tracking-widest">Reserve <ChevronRight size={12} /></div>
      </div>
    </div>
  );
}

function NavBtn({ active, icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full transition-all duration-300 ${active ? 'bg-white text-black scale-105' : 'text-neutral-500'}`}>
      {icon}
      {active && <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>}
    </button>
  );
}