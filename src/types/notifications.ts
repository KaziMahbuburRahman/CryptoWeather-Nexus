export type NotificationType = "price_alert" | "weather_alert";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}
