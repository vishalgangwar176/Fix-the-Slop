export type PageTab = 'home' | 'admin' | 'blog' | 'contact' | 'tools';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}
