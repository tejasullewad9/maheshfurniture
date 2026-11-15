// File: src/lib/whatsapp.ts
export function getWhatsAppUrl(phone: string, productName: string, sku: string): string {
  const cleanPhone = phone.replace(/\D/g, "") || "919657451376";
  const message = `Hello Mahesh Furniture! I am interested in *${productName}* (Ref: ${sku}). Please share its price, availability, and further details.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "") || "919657451376";
  const message = "Hello Mahesh Furniture! I would like to inquire about your furniture collection and showroom in Bhainsa.";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}