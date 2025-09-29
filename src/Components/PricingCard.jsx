import React from 'react';
import { Zap } from 'lucide-react';

// PricingPlan Card Component
const PricingCard = ({ plan, color }) => {
  // FIX: Added defensive check to prevent TypeError if 'plan' is undefined during rendering
  if (!plan) return null; 

  // Determine card background and text colors based on highlight status and version color
  const bgColor = plan.highlight ? color : 'bg-white';
  const textColor = plan.highlight ? 'text-white' : 'text-gray-900';
  const featureIconColor = plan.highlight ? 'text-white' : 'text-blue-500';
  const featureTextColor = plan.highlight ? 'text-white' : 'text-gray-600';
  const baseClasses = 'flex flex-col p-6 shadow-xl rounded-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200';
  const highlightClasses = plan.highlight ? `${bgColor} text-white` : 'bg-white';

  return (
    <div className={`${baseClasses} ${highlightClasses}`}>
      
      <div className='flex justify-between items-start'>
          <h3 className={`text-2xl font-bold ${textColor}`}>{plan.name}</h3>
          {plan.highlight && <Zap className='w-6 h-6' />}
      </div>
      
      <p className={`mt-4 text-4xl font-extrabold ${textColor}`}>{plan.price}</p>
      
      <ul className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <svg className={`flex-shrink-0 w-5 h-5 ${featureIconColor}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={`ml-3 ${featureTextColor}`}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;