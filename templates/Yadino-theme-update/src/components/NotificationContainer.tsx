import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Notification from './Notification';

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-24 right-4 z-50">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="mb-2"
          style={{ 
            transform: `translateY(${index * 70}px)`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            isVisible={true}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default NotificationContainer;
