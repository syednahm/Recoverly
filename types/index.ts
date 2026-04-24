export * from "./recovery";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  disabled?: boolean;
}
