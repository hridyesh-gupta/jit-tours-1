import React, { useState, useEffect } from 'react';
import { INDIAN_CITIES, calculateRoadDistance } from '../data/indianCities';
import { OWNER_WHATSAPP_NUMBER, OWNER_PHONE_DISPLAY } from '../data/fleetData';
import { generateBookingPDF } from '../utils/generateBookingPDF';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Car, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Download, 
  MessageCircle, 
  FileText,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function BookingWizard({ isOpen, onClose, initialRoute = null, initialCar = null }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    pickupCity: 'prayagraj',
    dropCity: 'varanasi',
    tripType: 'Outstation Round-Trip',
    passengers: '4 Pax',
    carType: '7-Seater Luxury MPV (Toyota Innova Crysta)',
    driverPreference: 'With Professional Chauffeur',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    pickupTime: '08:00 AM',
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Handle pre-filled triggers from hero/fleet/attractions
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

  const handleDownloadPDF = () => {
    generateBookingPDF({
      bookingId: submitResult?.bookingId || 'JIT-REF',
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      pickupCity: pickupCityObj?.name || formData.pickupCity,
      dropCity: dropCityObj?.name || formData.dropCity,
      calculatedDistance: `${distanceInfo.distanceKm} km`,
      carType: formData.carType,
      passengers: formData.passengers,
      driverPreference: formData.driverPreference,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      pickupTime: formData.pickupTime,
      notes: formData.notes
    });
    setPdfDownloaded(true);
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

  // WhatsApp confirmation text for the consumer
  const getConsumerConfirmationWhatsAppText = () => {
    const refId = submitResult?.bookingId || 'JIT-REF';
    const msg = `Hello Jit Tours and Travels, I have reviewed my booking voucher data for Ref ID: *${refId}*.\n\n` +
      `🚘 *Vehicle:* ${formData.carType}\n` +
      `📍 *Route:* ${pickupCityObj?.name.split(',')[0]} to ${dropCityObj?.name.split(',')[0]} (~${distanceInfo.distanceKm} km)\n` +
      `📅 *Date:* ${formData.pickupDate} (${formData.pickupTime})\n` +
      `👥 *Passengers:* ${formData.passengers}\n\n` +
      `Everything looks fine and accurate from my side. Please confirm my reservation and assign the chauffeur!`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              0{step}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-outfit">Jit Tours and Travels &bull; Booking Inquiry</h3>
              <span className="text-xs text-slate-400 block">Prayagraj, UP &bull; MP Outstation & Local Sightseeing</span>
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
          <div className="w-full bg-slate-950 h-1.5 flex flex-shrink-0">
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
        <div className="p-6 space-y-6 overflow-y-auto flex-grow">
          
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
                  <span>Step 1: Select UP / MP Route & Distance Check</span>
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
                    <optgroup label="Uttar Pradesh">
                      {INDIAN_CITIES.filter(c => c.state === 'Uttar Pradesh').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Madhya Pradesh">
                      {INDIAN_CITIES.filter(c => c.state === 'Madhya Pradesh').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination City</label>
                  <select
                    value={formData.dropCity}
                    onChange={(e) => handleChange('dropCity', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <optgroup label="Uttar Pradesh">
                      {INDIAN_CITIES.filter(c => c.state === 'Uttar Pradesh').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Madhya Pradesh">
                      {INDIAN_CITIES.filter(c => c.state === 'Madhya Pradesh').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Trip Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Outstation Round-Trip', 'Outstation One-Way', 'Local Sightseeing Tour'].map((tType) => (
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
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
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
                    { title: 'Maruti Suzuki Dzire (5 Seater)', sub: 'Best for 1-5 passengers, local sightseeing & outstation' },
                    { title: 'Maruti Suzuki Ertiga (7 Seater)', sub: 'Spacious 7-seater MPV for family trips with roof AC' },
                    { title: 'Toyota Innova Crysta (7 Seater)', sub: 'King of comfort, captain seats & luxury long tours' },
                    { title: 'Mahindra Scorpio-N (7 Seater 4x4)', sub: 'Best for hill stations, waterfalls & rough roads' },
                    { title: 'Toyota Fortuner 4x4 (7 Seater VIP)', sub: 'VIP executive, celebrity & grand wedding travel' }
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
                  {['05:00 AM', '06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'].map(t => (
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
                  <span>Step 4: Contact Details (For PDF Voucher & Confirmation)</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requests / Sightseeing Spots</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need child safety seat, 4 bags, visit Sangam and Lete Hanuman Mandir..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Your booking request will generate an official PDF voucher and automated email alert.</span>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE WITH PDF VOUCHER & CONSUMER CONFIRMATION BUTTON */}
          {step === 5 && submitResult && (
            <div className="py-2 space-y-6">
              
              {/* Top Success Badge */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h4 className="text-2xl font-bold text-white">Booking Request Recorded!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Voucher Reference: <strong className="text-amber-400">{submitResult.bookingId}</strong> &bull; An official receipt has been dispatched to your email!
                </p>
              </div>

              {/* PDF VOUCHER DOWNLOAD & WHATSAPP CONFIRMATION ACTIONS BANNER */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-amber-500/15 border border-amber-500/40 rounded-2xl p-5 space-y-4">
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Your Official PDF Booking Voucher Is Ready</h5>
                    <p className="text-[11px] text-slate-300">Download your booking document with all trip details, vehicle specs & terms.</p>
                  </div>
                </div>

                {/* ACTION BUTTONS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* 1. Download PDF Button */}
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 text-xs cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>{pdfDownloaded ? 'Download PDF Again' : 'Download PDF Booking Voucher'}</span>
                  </button>

                  {/* 2. Consumer Confirmation on WhatsApp Button */}
                  <a
                    href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${getConsumerConfirmationWhatsAppText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center space-x-2 text-xs cursor-pointer shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirm My Reservation on WhatsApp</span>
                  </a>

                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>By clicking <strong>"Confirm My Reservation"</strong>, you verify that everything is fine from your side and we can assign the chauffeur right away.</span>
                </div>

              </div>

              {/* Visual Booking Summary Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                <div className="font-bold text-white border-b border-slate-800 pb-2 flex justify-between">
                  <span>Trip Summary</span>
                  <span className="text-amber-400">{submitResult.bookingId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-slate-300">
                  <div>🚘 <strong>Vehicle:</strong> {formData.carType}</div>
                  <div>👥 <strong>Passengers:</strong> {formData.passengers}</div>
                  <div>📍 <strong>Pickup:</strong> {pickupCityObj?.name.split(',')[0]}</div>
                  <div>🏁 <strong>Destination:</strong> {dropCityObj?.name.split(',')[0]}</div>
                  <div>📅 <strong>Pickup Date:</strong> {formData.pickupDate} ({formData.pickupTime})</div>
                  <div>🔄 <strong>Return Date:</strong> {formData.returnDate}</div>
                  <div>👤 <strong>Name:</strong> {formData.fullName}</div>
                  <div>📞 <strong>Phone:</strong> {formData.phone}</div>
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-between items-center flex-shrink-0">
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
                    <span>Generating Voucher & Emailing...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Submit & Generate PDF Voucher</span>
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
