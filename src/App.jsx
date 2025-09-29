import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Zap, Settings, Info } from 'lucide-react';

// Importing services and components
import { fetchPricing } from './services/PricingApi'; 
import PricingCard from './Components/PricingCard';

const App = () => {
  const [pricing, setPricing] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [headerValue, setHeaderValue] = useState(''); 
  const [error, setError] = useState(null);

  // Determine color based on version
  const getVersionColor = (version) => {
    if (version === 'BLUE') return 'bg-blue-600';
    if (version === 'GREEN') return 'bg-green-600';
    return 'bg-gray-700';
  };

  // Fetch pricing data
  const loadPricing = useCallback(async (simulatedHeader = '') => {
    setIsLoading(true);
    setPricing(null);
    setError(null);
    try {
      const data = await fetchPricing(simulatedHeader.toUpperCase());
      setPricing(data);
    } catch (err) {
      console.error("Failed to fetch pricing:", err);
      setError("Pricing data could not be fetched. Check console for logs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPricing();
  }, [loadPricing]);

  const handleFetchClick = () => {
    loadPricing(headerValue);
  };

  const handleClearAndReload = () => {
    localStorage.removeItem('pricing_version_override');
    loadPricing();
  };

  const versionColorClass = pricing ? getVersionColor(pricing.version) : 'bg-gray-400';

  const versionPill = pricing ? (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs sm:text-sm font-semibold rounded-full text-white ${versionColorClass} shadow-lg`}
    >
      Version: {pricing.version}
    </span>
  ) : null;

  const routingInfo = pricing ? (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
      <p className="font-medium flex items-center">
        <Info className="w-4 h-4 mr-2" /> Routing Logic Applied:
      </p>
      <p className="mt-1 ml-6">{pricing.routingReason}</p>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="py-4 sm:py-6 shadow-md bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center text-center sm:text-left">
            <Zap className="w-6 h-6 mr-2 text-indigo-600" />
            Modular Blue-Green Pricing Demo
          </h1>
          {versionPill}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 text-center mb-8">
          Pricing Plans for Current User Session
        </h2>

        {/* Routing Control Panel */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-10 border border-indigo-100">
          <h3 className="text-base sm:text-lg font-bold text-indigo-700 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Routing Control Panel (Simulated Client)
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            {/* Input Field */}
            <div className="flex-grow w-full">
              <label
                htmlFor="header-override"
                className="block text-sm font-medium text-gray-700"
              >
                Simulate Header Override ('BLUE' or 'GREEN')
              </label>
              <input
                id="header-override"
                type="text"
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value.toUpperCase())}
                placeholder="Enter BLUE or GREEN"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <button
              onClick={handleFetchClick}
              className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              disabled={isLoading}
            >
              {isLoading ? 'Fetching...' : 'Apply & Fetch Pricing'}
            </button>

            <button
              onClick={handleClearAndReload}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 flex items-center justify-center"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Session & Reload
            </button>
          </div>
        </div>

        {/* Routing Info */}
        {routingInfo}

        {/* Pricing Display Area */}
        <div className="mt-8 sm:mt-12">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !pricing && (
            <div className="flex justify-center items-center h-32 sm:h-48">
              <p className="text-base sm:text-lg font-medium text-indigo-600 text-center">
                Loading pricing data... Routing logic in progress...
              </p>
            </div>
          )}

          {/* Pricing Cards */}
          {pricing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {pricing.plans.map((plan, index) => (
                <PricingCard
                  key={index}
                  plan={plan}
                  color={versionColorClass}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

