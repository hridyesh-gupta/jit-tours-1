import { jsPDF } from 'jspdf';

export function generateBookingPDF({
  bookingId,
  fullName,
  phone,
  email,
  pickupCity,
  dropCity,
  calculatedDistance,
  carType,
  passengers,
  driverPreference,
  pickupDate,
  returnDate,
  pickupTime,
  notes
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Primary Colors
  const primaryColor = [217, 119, 6]; // Amber-600
  const darkBg = [15, 23, 42];        // Slate-900
  const lightBg = [248, 250, 252];    // Slate-50
  const textDark = [30, 41, 59];      // Slate-800
  const textMuted = [100, 116, 139];  // Slate-500
  const emeraldColor = [16, 185, 129]; // Emerald-500

  // 1. Header Banner
  doc.setFillColor(...darkBg);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Amber Accent Line
  doc.setFillColor(...primaryColor);
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('JIT TOURS & TRAVELS', 14, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(245, 158, 11);
  doc.text('PREMIUM CAR RENTALS & SIGHTSEEING TOURS (UP & MP)', 14, 25);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8);
  doc.text('Civil Lines / Sangam Area, Prayagraj, UP | Helpline: +91 98765 43210', 14, 32);
  doc.text('Email: jittoursandtravels@gmail.com | WhatsApp: +91 98765 43210', 14, 37);

  // Right Header: Voucher Badge
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(pageWidth - 65, 10, 52, 24, 3, 3, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING VOUCHER', pageWidth - 61, 17);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(bookingId || 'JIT-REF', pageWidth - 61, 25);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Issued: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 61, 30);

  // 2. Status Ribbon
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 49, pageWidth - 28, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...emeraldColor);
  doc.text('● STATUS: RESERVATION REQUEST RECORDED (CONFIRMATION PENDING)', 18, 55.5);

  // 3. Section 1: Customer Details
  let currentY = 66;

  doc.setFillColor(...primaryColor);
  doc.rect(14, currentY, 3, 7, 'F');
  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Passenger & Contact Information', 20, currentY + 5.5);

  currentY += 10;
  doc.setFillColor(...lightBg);
  doc.roundedRect(14, currentY, pageWidth - 28, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, currentY, pageWidth - 28, 24, 2, 2, 'D');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textMuted);
  doc.text('Passenger Name:', 18, currentY + 7);
  doc.text('Contact Phone / WhatsApp:', 18, currentY + 14);
  doc.text('Email Address:', 18, currentY + 21);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textDark);
  doc.text(fullName || 'N/A', 65, currentY + 7);
  doc.text(phone || 'N/A', 65, currentY + 14);
  doc.text(email || 'N/A', 65, currentY + 21);

  // 4. Section 2: Journey & Itinerary Details
  currentY += 30;

  doc.setFillColor(...primaryColor);
  doc.rect(14, currentY, 3, 7, 'F');
  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Travel Route & Schedule', 20, currentY + 5.5);

  currentY += 10;
  doc.setFillColor(...lightBg);
  doc.roundedRect(14, currentY, pageWidth - 28, 38, 2, 2, 'F');
  doc.roundedRect(14, currentY, pageWidth - 28, 38, 2, 2, 'D');

  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text('Pickup City (Origin):', 18, currentY + 7);
  doc.text('Destination City:', 18, currentY + 14);
  doc.text('Calculated Road Distance:', 18, currentY + 21);
  doc.text('Pickup Date & Time:', 18, currentY + 28);
  doc.text('Return Date:', 18, currentY + 35);

  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.text(pickupCity || 'N/A', 65, currentY + 7);
  doc.text(dropCity || 'N/A', 65, currentY + 14);
  doc.text(calculatedDistance || 'N/A', 65, currentY + 21);
  doc.text(`${pickupDate || 'N/A'} at ${pickupTime || '08:00 AM'}`, 65, currentY + 28);
  doc.text(returnDate || 'Same Day / Round-Trip', 65, currentY + 35);

  // 5. Section 3: Vehicle & Service Preference
  currentY += 44;

  doc.setFillColor(...primaryColor);
  doc.rect(14, currentY, 3, 7, 'F');
  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Vehicle & Service Details', 20, currentY + 5.5);

  currentY += 10;
  doc.setFillColor(...lightBg);
  doc.roundedRect(14, currentY, pageWidth - 28, 28, 2, 2, 'F');
  doc.roundedRect(14, currentY, pageWidth - 28, 28, 2, 2, 'D');

  doc.setFontSize(8.5);
  doc.setTextColor(...textMuted);
  doc.text('Allocated Car Model:', 18, currentY + 7);
  doc.text('Passenger Count:', 18, currentY + 14);
  doc.text('Driver Option:', 18, currentY + 21);
  doc.text('Special Instructions:', 18, currentY + 28);

  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.text(carType || 'Dzire 5-Seater / Ertiga / Innova Crysta', 65, currentY + 7);
  doc.text(passengers || '4 Pax', 65, currentY + 14);
  doc.text(driverPreference || 'With Professional Chauffeur', 65, currentY + 21);
  doc.setFont('helvetica', 'normal');
  doc.text(notes && notes !== 'N/A' ? notes : 'None (Standard AC Service)', 65, currentY + 28);

  // 6. Section 4: Consumer Final Confirmation Note & Instructions
  currentY += 34;

  doc.setFillColor(254, 243, 199); // Amber-100
  doc.roundedRect(14, currentY, pageWidth - 28, 30, 2, 2, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(14, currentY, pageWidth - 28, 30, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text('HOW TO CONFIRM YOUR RESERVATION (CONSUMER CONFIRMATION):', 18, currentY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textDark);
  doc.text('1. Verify that all above journey dates, passenger count, and route details are correct.', 18, currentY + 13);
  doc.text('2. Click the "Confirm Reservation on WhatsApp" button or reply to our email confirmation.', 18, currentY + 18);
  doc.text('3. Our travel coordinator will finalize your chauffeur details and vehicle registration number.', 18, currentY + 23);
  doc.text('4. For immediate booking assistance, call our 24/7 Helpline: +91 98765 43210.', 18, currentY + 28);

  // 7. Terms & Conditions Highlights
  currentY += 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Terms & Conditions:', 14, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('• Toll taxes, state border entry permits, and parking charges are payable as per actuals or included in the customized package.', 14, currentY + 4);
  doc.text('• Night driving allowance (₹400-₹500/day) applies for outstation multi-day trips.', 14, currentY + 8);
  doc.text('• 100% sanitized vehicles with GPS safety monitoring and verified chauffeurs.', 14, currentY + 12);

  // 8. Footer
  doc.setFillColor(...darkBg);
  doc.rect(0, 287, pageWidth, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Jit Tours and Travels &bull; Prayagraj, Uttar Pradesh &bull; Thank you for traveling with us!', pageWidth / 2, 293, { align: 'center' });

  // Save the PDF
  const filename = `Jit_Tours_Booking_${bookingId || 'Voucher'}.pdf`;
  doc.save(filename);
}
