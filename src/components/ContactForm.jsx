import React, { useState, useEffect } from 'react';
import { VEHICLE_FLEET, OWNER_PHONE, OWNER_PHONE_DISPLAY, OWNER_WHATSAPP_NUMBER } from '../data/fleetData';
import { LOCAL_ATTRACTIONS } from '../data/localAttractionsData';
import { FEATURED_DESTINATIONS, MORE_DESTINATIONS } from '../data/destinationsData';
import {
  X,
  Check,
  Car,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  AlertCircle,
  MessageCircle,
  PhoneCall,
  Send
} from 'lucide-react';

const ALL_DESTINATIONS = [...FEATURED_DESTINATIONS, ...MORE_DESTINATIONS];
const UP_DESTINATIONS = ALL_DESTINATIONS.filter(d => d.state.includes('Uttar Pradesh'));
const MP_DESTINATIONS = ALL_DESTINATIONS.filter(d => !d.state.includes('Uttar Pradesh') && d.state.includes('Madhya Pradesh'));
const KNOWN_PLACE_NAMES = new Set([
  ...LOCAL_ATTRACTIONS.map(p => p.name),
  ...ALL_DESTINATIONS.map(d => d.name)
]);
const KNOWN_CAR_NAMES = new Set(VEHICLE_FLEET.map(c => c.name));

export default function ContactForm({ isOpen, onClose, initialCar = null, initialPlace = null }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carType: '',
    place: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        carType: initialCar || prev.carType,
        place: initialPlace || prev.place
      }));
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen, initialCar, initialPlace]);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please fill in your name, email, and phone number.');
      return;
    }
    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send your enquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try calling or WhatsApp us instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white font-outfit">Jit Tours and Travels &bull; Enquiry</h3>
            <span className="text-xs text-slate-400 block">We'll email you back and reach out shortly</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-grow">

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contact Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferred Car</span>
                </label>
                <select
                  value={formData.carType}
                  onChange={(e) => handleChange('carType', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Not Sure / Recommend for Me</option>
                  {formData.carType && !KNOWN_CAR_NAMES.has(formData.carType) && (
                    <option value={formData.carType}>{formData.carType}</option>
                  )}
                  {VEHICLE_FLEET.map(car => (
                    <option key={car.id} value={car.name}>{car.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Where Are You Headed?</span>
                </label>
                <select
                  value={formData.place}
                  onChange={(e) => handleChange('place', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Not Sure / Other</option>
                  {formData.place && !KNOWN_PLACE_NAMES.has(formData.place) && (
                    <option value={formData.place}>{formData.place}</option>
                  )}
                  <optgroup label="Prayagraj Local Sightseeing">
                    {LOCAL_ATTRACTIONS.map(place => (
                      <option key={place.id} value={place.name}>{place.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Popular Destinations — Uttar Pradesh">
                    {UP_DESTINATIONS.map(dest => (
                      <option key={dest.id} value={dest.name}>{dest.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Popular Destinations — Madhya Pradesh">
                    {MP_DESTINATIONS.map(dest => (
                      <option key={dest.id} value={dest.name}>{dest.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Message (optional)</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Travel dates, number of passengers, or any special requests"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition cursor-pointer shadow-lg shadow-amber-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Your Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 pt-1 text-xs text-slate-400">
                <a href={`tel:${OWNER_PHONE}`} className="flex items-center space-x-1.5 hover:text-amber-400 transition">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{OWNER_PHONE_DISPLAY}</span>
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Jit Tours and Travels, I would like to enquire about a trip.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-emerald-400 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="py-4 space-y-5 text-center">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Enquiry Sent!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mt-2">
                  Thanks, <strong className="text-amber-400">{formData.fullName}</strong>! We've emailed you a confirmation, and our team has been notified. We'll reach out on <strong className="text-slate-200">{formData.phone}</strong> shortly.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                <a
                  href={`tel:${OWNER_PHONE}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Us Now</span>
                </a>
                <a
                  href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Jit Tours and Travels, I just submitted an enquiry (${formData.fullName}). Following up here.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
