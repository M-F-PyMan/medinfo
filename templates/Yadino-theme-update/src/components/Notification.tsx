import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

function Notification({ message, type, isVisible, onClose, duration = 3000 }: NotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-white" />;
      case 'error':
        return <X className="h-5 w-5 text-white" />;
      default:
        return <Check className="h-5 w-5 text-white" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-purple-600 border-green-400';
      case 'error':
        return 'bg-red-600 border-red-400';
      default:
        return 'bg-purple-600 border-green-400';
    }
  };

  return (
    <div
      className={`${getBgColor()} rounded-lg border-2 px-4 py-3 shadow-lg transition-all duration-300 min-w-80 ${
        isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center space-x-3 space-x-reverse">
        <div className="flex-shrink-0">
          <div className="bg-green-400 rounded-full p-1">
            {getIcon()}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
