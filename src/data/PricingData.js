// --- Pricing Data for Blue and Green Versions ---

export const BLUE_PRICING = {
    version: 'BLUE',
    color: 'bg-blue-600',
    plans: [
        {
            name: 'Basic',
            price: '$10',
            highlight: false,
            features: [
                '5 Users',
                '2GB Storage (New)',
                'Community Support',
                'Basic Analytics',
            ],
        },
        {
            name: 'Pro (Recommended)',
            price: '$29',
            highlight: true,
            features: [
                'Unlimited Users',
                '10GB Storage',
                'Priority Email Support',
                'Advanced Analytics',
            ],
        },
    ],
};

export const GREEN_PRICING = {
    version: 'GREEN',
    color: 'bg-green-600',
    plans: [
        {
            name: 'Starter',
            price: '$9', // Cheaper Price
            highlight: false,
            features: [
                '5 Users',
                '5GB Storage (Updated)',
                'Community Forum Access',
                'Basic Analytics',
            ],
        },
        {
            name: 'Premium (Recommended)',
            price: '$35', // Higher Price
            highlight: true,
            features: [
                'Unlimited Users',
                'Unlimited Storage',
                '24/7 Phone Support',
                'Real-time Reporting',
            ],
        },
    ],
};
