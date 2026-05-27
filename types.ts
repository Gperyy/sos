export interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  isNew?: boolean;
}

export interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  location: string;
  action: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  alt: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}