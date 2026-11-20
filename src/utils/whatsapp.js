/**
 * Centralized WhatsApp Integration Utility for AANGAN DOORS
 * Primary Inquiry Channel: WhatsApp
 * Default Number: +91 7879626597 (Bhopal, MP, India)
 */

export const DEFAULT_WHATSAPP_NUMBER = '917879626597';

/**
 * Clean phone number to digits only for wa.me links
 */
export const sanitizePhoneNumber = (phone) => {
  if (!phone) return DEFAULT_WHATSAPP_NUMBER;
  const digits = String(phone).replace(/\D/g, '');
  // Default to 91 country code for 10-digit Indian numbers if missing
  if (digits.length === 10) return `91${digits}`;
  return digits || DEFAULT_WHATSAPP_NUMBER;
};

/**
 * Open WhatsApp in a new tab with prefilled, formatted message
 */
export const openWhatsApp = (message, phone = DEFAULT_WHATSAPP_NUMBER) => {
  const cleanPhone = sanitizePhoneNumber(phone);
  const encoded = encodeURIComponent(message.trim());
  const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Generate Product Inquiry message
 */
export const createProductInquiry = (product, phone = DEFAULT_WHATSAPP_NUMBER) => {
  const message = `Hello AANGAN DOORS,

I am interested in learning more about this door design:

• Product: ${product.name}
• Product ID: ${product.id}
• Category: ${product.category}
• Material: ${product.material || 'Solid Wood'}
• Finish: ${product.finish || 'Natural Wood'}

Please share pricing, dimensions availability, and custom design possibilities.

Thank you!`;

  openWhatsApp(message, phone);
};

/**
 * Generate Wishlist Inquiry message
 */
export const createWishlistInquiry = (products, phone = DEFAULT_WHATSAPP_NUMBER) => {
  if (!products || products.length === 0) return;

  const productList = products
    .map((p, index) => `${index + 1}. ${p.name} — ${p.id} (${p.category})`)
    .join('\n');

  const message = `Hello AANGAN DOORS,

I have selected the following wooden door designs from your digital showroom catalog:

${productList}

Please share pricing estimates, timber options, availability, and customization details for these models.

Thank you!`;

  openWhatsApp(message, phone);
};

/**
 * Generate Custom Design Inquiry message
 */
export const createCustomDesignInquiry = (phone = DEFAULT_WHATSAPP_NUMBER) => {
  const message = `Hello AANGAN DOORS,

I am looking for a custom wooden door design tailored to our architectural specifications.

I would like to discuss:
• Door Type (Main Entrance / Interior / CNC Designer / Double Door)
• Custom Dimensions & Timber preferences
• CNC Carving & Finishing details

Looking forward to discussing the design possibilities.`;

  openWhatsApp(message, phone);
};

/**
 * Generate Contact Form Inquiry message
 */
export const createContactInquiry = (formData, phone = DEFAULT_WHATSAPP_NUMBER) => {
  const { name, phone: customerPhone, productInterest, message } = formData;

  const inquiryText = `Hello AANGAN DOORS,

New business inquiry from website:

• Customer Name: ${name || 'Prospective Client'}
• Contact Number: ${customerPhone || 'Not provided'}
${productInterest ? `• Interested In: ${productInterest}\n` : ''}
• Message:
${message || 'I would like to know more about your wooden door collection and manufacturing services.'}

Please connect with me regarding pricing and catalog.`;

  openWhatsApp(inquiryText, phone);
};
