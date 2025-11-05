import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Mail, User, Phone, Clock } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, formData }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black bg-opacity-50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Success Icon with Animation */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-pulse"></div>
            
            {/* Success icon */}
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-lg">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Message Sent Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for reaching out! I've received your message and will get back to you soon.
          </p>

          {/* Details Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-6 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Name</p>
                <p className="text-gray-800 font-medium truncate">{formData?.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Email</p>
                <p className="text-gray-800 font-medium truncate">{formData?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Phone</p>
                <p className="text-gray-800 font-medium">{formData?.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Sent At</p>
                <p className="text-gray-800 font-medium">
                  {new Date().toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Response Time Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Expected Response:</span> Within 24-48 hours
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Got It!
          </button>

          {/* Auto-close timer */}
          <p className="text-xs text-gray-400 mt-4">
            This dialog will close automatically in 5 seconds
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

// Demo wrapper to show the modal
export default function SuccessModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  
  const sampleFormData = {
    name: "Paresh Patil",
    email: "paresh@example.com",
    phone: "+91 98765 43210"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Success Modal Component</h1>
        <p className="text-gray-300 mb-8">Click the button below to see the success modal</p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Show Success Modal
        </button>

        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-xl font-semibold text-white mb-3">Integration Instructions:</h3>
          <div className="text-gray-300 space-y-2 text-sm font-mono">
            <p>1. Import the component:</p>
            <code className="block bg-black bg-opacity-50 p-2 rounded">
              import SuccessModal from './SuccessModal';
            </code>
            
            <p className="pt-2">2. Add state for modal:</p>
            <code className="block bg-black bg-opacity-50 p-2 rounded">
              const [showSuccess, setShowSuccess] = useState(false);
            </code>
            
            <p className="pt-2">3. Show after successful form submission:</p>
            <code className="block bg-black bg-opacity-50 p-2 rounded">
              setShowSuccess(true);
            </code>
            
            <p className="pt-2">4. Use the component:</p>
            <code className="block bg-black bg-opacity-50 p-2 rounded">
              {`<SuccessModal 
  isOpen={showSuccess}
  onClose={() => setShowSuccess(false)}
  formData={{name, email, phone}}
/>`}
            </code>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formData={sampleFormData}
      />
    </div>
  );
}