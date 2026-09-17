export type PricingType = "FIXED" | "STARTING_FROM" | "CUSTOM_QUOTE" | "ENQUIRY";

export type OrderStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_DISCUSSION"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "ARCHIVED";

export type EmailStatus = "PENDING" | "SENT" | "FAILED";

export type AdminRole = "ADMIN" | "MANAGER";

export interface ServiceFeatureDTO {
  id?: string;
  featureText: string;
  isIncluded: boolean;
  displayOrder: number;
}

export interface ServiceFAQDTO {
  id?: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface ServiceImageDTO {
  id?: string;
  imageUrl: string;
  altText?: string | null;
  displayOrder: number;
}

export interface CategoryDTO {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  displayOrder: number;
  active: boolean;
}

export interface ServiceDTO {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  category?: CategoryDTO;
  price: number;
  originalPrice?: number | null;
  pricingType: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  thumbnail?: string | null;
  deliveryTime?: string | null;
  revisions?: string | null;
  hostingInfo?: string | null;
  supportInfo?: string | null;
  warrantyPeriod?: string | null;
  tags?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  features?: ServiceFeatureDTO[];
  faqs?: ServiceFAQDTO[];
  images?: ServiceImageDTO[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem {
  serviceId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  thumbnail?: string | null;
  deliveryTime?: string | null;
  quantity: number;
}

export interface CustomerInput {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  companyName?: string;
  websiteUrl?: string;
  requirements?: string;
  agreeContact: boolean;
}

export interface OrderItemDTO {
  id: string;
  serviceId?: string | null;
  serviceName: string;
  serviceSlug: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    country: string;
    companyName?: string | null;
    websiteUrl?: string | null;
  };
  subtotal: number;
  discount: number;
  total: number;
  requirements?: string | null;
  preferredContact: string;
  status: OrderStatus;
  internalNotes?: string | null;
  emailStatus: EmailStatus;
  emailError?: string | null;
  whatsappLinkGenerated?: string | null;
  items: OrderItemDTO[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface GeneralFAQDTO {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  active: boolean;
}

export interface BusinessSettings {
  businessName: string;
  businessEmail: string;
  adminEmail: string;
  whatsappNumber: string;
  phoneNumber: string;
  businessAddress: string;
  websiteTitle: string;
  websiteDescription: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  telegramUrl?: string;
}

export interface ChatbotConfig {
  systemPrompt: string;
  businessInstructions: string;
  restrictions: string;
  tone: string;
  welcomeMessage: string;
  fallbackMessage: string;
  isEnabled: boolean;
}
