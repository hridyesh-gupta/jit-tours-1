import React, { useState, useEffect } from 'react';
import { INDIAN_CITIES, calculateRoadDistance } from '../data/indianCities';
import { X, Check, ArrowRight, ArrowLeft, Car, Calendar, User, CheckCircle2, AlertCircle, Loader2, Mail, ShieldCheck } from 'lucide-react';

export default function BookingWizard({ isOpen, onClose, initialRoute = null, initialCar = null }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    pickupCity: 'mumbai',
    dropCity: 'goa',
    tripType: 'Outstation Round-Trip',
    passengers: '4',
    carType: '7-Seater MPV (Innova Crysta / Ertiga)',
    driverPreference: 'With Professional Chauffeur',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    pickupTime: '08:00 AM',
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Handle pre-filled triggers from hero/fleet
  useEffect(() => {
    if (initialRoute) {
      const pFound = INDIAN_CITIES.find(c => c.name.toLowerCase().includes(initialRoute.pickupCity?.toLowerCase()));
      const dFound = INDIAN_CITIES.find(c => c.name.toLowerCase().includes(initialRoute.dropCity?.toLowerCase()));
      setFormData(prev => ({
        ...prev,
        pickupCity: pFound ? pFound.id : prev.pickupCity,
        dropCity: dFound ? dFound.id : prev.dropCity
      }));
    }
    if (initialCar) {
      setFormData(prev => ({
        ...prev,
        carType: initialCar
      }));
    }
  }, [initialRoute, initialCar]);

  if (!isOpen) return null;

  const distanceInfo = calculateRoadDistance(formData.pickupCity, formData.dropCity);
  const pickupCityObj = INDIAN_CITIES.find(c => c.id === formData.pickupCity);
  const dropCityObj = INDIAN_CITIES.find(c => c.id === formData.dropCity);

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setErrorMsg('');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!distanceInfo.isWithinLimit) {
        setErrorMsg('Trip distance exceeds our 1,500 km limit. Please pick a closer destination.');
        return;
      }
    }
    if (step === 4) {
      if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
        setErrorMsg('Please complete your Full Name, Phone Number, and Email Address.');
        return;
      }
      if (!formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    }
    setErrorMsg('');
    setStep(prev => prev + 1);
  };

  const handleSubmitInquiry = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        pickupCity: pickupCityObj?.name || formData.pickupCity,
        dropCity: dropCityObj?.name || formData.dropCity,
        calculatedDistance: `${distanceInfo.distanceKm} km`
      };

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry.');
      }

      setSubmitResult(data);
      setStep(5); // Success step
    } catch (err) {
      console.error('Error submitting booking inquiry:', err);
      setErrorMsg(err.message || 'Error connecting to Gmail server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              0{step}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-outfit">Car Rental Booking Inquiry</h3>
              <span className="text-xs text-slate-400 block">Outstation Intra-India Trips &bull; Max 1,500 km</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="w-full bg-slate-950 h-1.5 flex">
            {[1, 2, 3, 4].map(sNum => (
              <div
                key={sNum}
                className={`h-full flex-1 transition-all duration-300 ${
                  sNum <= step ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: ROUTE & DISTANCE */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>Step 1: Select Route & Distance Check</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup City (Origin)</label>
                  <select
                    value={formData.pickupCity}
                    onChange={(e) => handleChange('pickupCity', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    {INDIAN_CITIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination City</label>
                  <select
                    value={formData.dropCity}
                    onChange={(e) => handleChange('dropCity', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    {INDIAN_CITIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Trip Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Outstation Round-Trip', 'Outstation One-Way', 'Local City Tour'].map((tType) => (
                    <button
                      type="button"
                      key={tType}
                      onClick={() => handleChange('tripType', tType)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        formData.tripType === tType
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Distance Meter Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-400">Calculated Distance:</span>
                  <span className="text-amber-400 font-bold text-sm">~{distanceInfo.distanceKm} km</span>
                </div>
                <div className="text-slate-400">{distanceInfo.note}</div>
              </div>
            </div>
          )}

          {/* STEP 2: CAR & PASSENGERS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>Step 2: Passenger & Vehicle Preference</span>
                </h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Number of Passengers</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1 - 3 Pax', '4 Pax', '5 - 7 Pax', '8+ Pax'].map(pCount => (
                    <button
                      type="button"
                      key={pCount}
                      onClick={() => handleChange('passengers', pCount)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        formData.passengers === pCount
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {pCount}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Car Category</label>
                <div className="space-y-2">
                  {[
                    { title: '4-Seater Executive Sedan (Dzire / Etios)', sub: 'Ideal for 1-4 passengers & lightweight luggage' },
                    { title: '7-Seater MPV (Innova Crysta / Ertiga)', sub: 'Ideal for 5-7 passengers with ample luggage space' },
                    { title: '7-Seater Tough SUV (Scorpio N / XUV700)', sub: 'Best for mountain roads & rough hill terrain' },
                    { title: 'Luxury VIP SUV (Fortuner 4x4)', sub: 'VIP executive outstation travel' }
                  ].map((carOpt) => (
                    <div
                      key={carOpt.title}
                      onClick={() => handleChange('carType', carOpt.title)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex justify-between items-center ${
                        formData.carType === carOpt.title
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <strong className="block text-sm text-white">{carOpt.title}</strong>
                        <span className="text-xs text-slate-400">{carOpt.sub}</span>
                      </div>
                      {formData.carType === carOpt.title && (
                        <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Driving Preference</label>
                <div className="grid grid-cols-2 gap-3">
                  {['With Professional Chauffeur', 'Self-Drive Rental'].map(dOpt => (
                    <button
                      type="button"
                      key={dOpt}
                      onClick={() => handleChange('driverPreference', dOpt)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        formData.driverPreference === dOpt
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {dOpt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DATES & SCHEDULE */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Step 3: Travel Schedule & Pickup Time</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pickup Date</label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange('pickupDate', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Return Date</label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Pickup Time</label>
                <select
                  value={formData.pickupTime}
                  onChange={(e) => handleChange('pickupTime', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  {['06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & DETAILS */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Step 4: Contact Details (For Gmail Alert)</span>
                </h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requests / Luggage Count</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need child safety seat, 4 large suitcases, carrier required..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Your request will be dispatched directly to our Gmail system.</span>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {step === 5 && submitResult && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-bold text-white">Booking Inquiry Confirmed!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Ref ID: <strong className="text-amber-400">{submitResult.bookingId}</strong> &bull; {submitResult.emailSent ? 'Confirmation email sent! Our travel desk will contact you shortly.' : 'Your booking details are recorded. Our travel desk will call / WhatsApp you within 15 minutes!'}
              </p>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-300">
                <div>🚘 <strong>Car:</strong> {formData.carType}</div>
                <div>📍 <strong>Route:</strong> {pickupCityObj?.name.split(',')[0]} ➔ {dropCityObj?.name.split(',')[0]} (~{distanceInfo.distanceKm} km)</div>
                <div>📅 <strong>Pickup Date:</strong> {formData.pickupDate} ({formData.pickupTime})</div>
                <div>📞 <strong>Contact:</strong> {formData.phone}</div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Close & Return to Home
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md shadow-amber-500/20"
              >
                <span>Continue Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmitInquiry}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-amber-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Sending Gmail Alert...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Submit Inquiry to Gmail</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
