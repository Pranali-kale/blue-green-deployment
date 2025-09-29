


import { BLUE_PRICING, GREEN_PRICING } from '../data/PricingData';
import { ROUTING_CONFIG } from '../Config/RoutingConfig';

// --- Backend API Simulation Logic ---
// This file decides which pricing version to serve based on rules.



// Simple delay function to simulate network latency
const simulateNetworkDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates a Backend API call to /pricing, applying Blue-Green routing logic.
 * @param {string} simulatedHeaderValue - Value of the X-Version header (e.g., 'BLUE' or 'GREEN').
 * @returns {Promise<object>} The pricing data object (BLUE or GREEN version).
 */
export const fetchPricing = async (simulatedHeaderValue) => {
    // Simulate a typical network delay of 500ms
    await simulateNetworkDelay(500); 

    const random = Math.random() * 100; // Generate a random number for percentage split
    let selectedPricing = null;
    let routingReason = 'Percentage Split'; // Default reason

    // 1. Header-based Routing (Highest Priority Override)
    // If the user manually provided 'BLUE' or 'GREEN' in the input field (simulating a header)
    if (simulatedHeaderValue === 'BLUE' || simulatedHeaderValue === 'GREEN') {
        routingReason = `Header Override (${ROUTING_CONFIG.HEADER_KEY})`;
        selectedPricing = simulatedHeaderValue === 'BLUE' ? BLUE_PRICING : GREEN_PRICING;
    }

    // 2. Cookie/Sticky Session Routing (High Priority)
    // Check local storage (simulating a cookie) for a previously served version
    if (!selectedPricing) {
        const stickyVersion = localStorage.getItem(ROUTING_CONFIG.STICKY_SESSION_KEY);
        if (stickyVersion === 'BLUE' || stickyVersion === 'GREEN') {
            routingReason = 'Sticky Session (localStorage)';
            selectedPricing = stickyVersion === 'BLUE' ? BLUE_PRICING : GREEN_PRICING;
        }
    }

    // 3. Percentage Traffic Split (Default Routing)
    // If no override or sticky session exists, use the configured percentage split
    if (!selectedPricing) {
        if (random < ROUTING_CONFIG.PERCENTAGE_BLUE) {
            selectedPricing = BLUE_PRICING;
        } else {
            selectedPricing = GREEN_PRICING;
        }
        routingReason = `Percentage Split (${ROUTING_CONFIG.PERCENTAGE_BLUE}% Blue)`;
    }

    // Mandatory: Set the sticky session for the version that was served
    localStorage.setItem(ROUTING_CONFIG.STICKY_SESSION_KEY, selectedPricing.version);

    // Logging Requirement: Log which version was served and why
    console.log(`[API LOG] Serving Version: ${selectedPricing.version} | Reason: ${routingReason}`);

    return {
        ...selectedPricing,
        // Send the reason back to the frontend for display/debugging
        routingReason: routingReason,
    };
};