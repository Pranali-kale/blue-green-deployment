

export const ROUTING_CONFIG = {
    // Percentage split: 70% traffic goes to BLUE, 30% to GREEN (when no other rule applies)
    PERCENTAGE_BLUE: 70, 

    // Header key used for forced routing (e.g., QA testing)
    HEADER_KEY: 'X-Version', 

    // Local storage key used for sticky sessions (simulating cookies)
    STICKY_SESSION_KEY: 'pricing_version_override',
};

