import { Notification as BaseNotification } from 'react-notification-system';

export type Notification = BaseNotification;

export interface CsrfResponse {
  token: string;
}

export type State = {
  readonly theme: string;
  readonly csrfToken: string | null;
  readonly notifications: Notification[];
  readonly sidebarOpen: boolean;
};
