# Blue-Green Pricing 
This project demonstrates a crucial software deployment strategy: Blue-Green Deployment applied to a pricing page. It uses a modular React frontend and simulates a backend API layer to dynamically serve two distinct versions of pricing data ('Blue' and 'Green') based on configurable routing rules.

##  Core Concepts: Blue-Green Routing
This application simulates how a live environment (e.g., production) can safely test new features (Green) against the stable version (Blue).

### Version          |       Features                                        |                     Simulates

Blue            |   Stable, older pricing/features.                              |      Stable, older pricing/features

Green          | New pricing/features (e.g., higher price, better plans).       |    The newly deployed version under test (30% traffic).


The routing logic is executed in the simulated API (src/services/pricingApi.js) before serving data to the React client.

✅ Implemented Requirements
Pricing Data: Separate BLUE_PRICING and GREEN_PRICING objects (in src/data/pricingData.js) simulate JSON data.

Configurable Routing: Rules are externalized in src/config/routingConfig.js.

Routing Rules: The simulated API supports:

Percentage Split: (e.g., 70% Blue, 30% Green)

Header-based Routing: Manual override via the UI input (simulating the X-Version header).

Sticky Routing: The user receives a consistent version across sessions, stored via localStorage (simulating cookies).

Logging: Console logging shows which version was served and why (routingReason).

Frontend: A fully responsive React application displays the received pricing data.

## Project Structure
The project is designed to be highly modular, separating concerns into distinct folders:

### my-react-app/src/
#### components/
    PricingCard.jsx   # Reusable UI for a single pricing plan (Responsive)
 #### config/
routingConfig.js  # Defines traffic percentages and key names
#### data/
pricingData.js    # Holds BLUE_PRICING and GREEN_PRICING datasets
#### services/
 pricingApi.js     # CORE LOGIC: Implements sticky session, header, and split rules.
App.jsx               # Main application component and UI structure (Responsive)

## Getting Started
#### Prerequisites
Node.js and npm (or yarn/pnpm)

A Vite/React project setup (as requested by the assignment)

### Installation
Clone the repository or ensure you have created the Vite app and file structure (as listed above).

#### Install dependencies (including lucide-react for icons):

npm install lucide-react

(Optional but Recommended for Styling): If you haven't already, set up Tailwind CSS in your Vite project for correct aesthetics.

#### Running the App
Run the development server:

npm run dev

 ## How to Test Routing
The application provides a "Routing Control Panel" to test the logic:

Default Split Test:

Click "Clear Sticky Session & Reload".

Check the "Version" pill (top right). Based on the 70/30 split, the version will randomly be set to BLUE or GREEN.

The "Routing Logic Applied" box will show: Percentage Split (70% Blue).

The version will remain sticky for subsequent reloads.

## Header Override Test:

In the "Simulate Header Override" field, type GREEN.

Click "Apply & Fetch Pricing".

The version will instantly switch to GREEN, overriding the sticky session.

The "Routing Logic Applied" box will show: Header Override (X-Version).
