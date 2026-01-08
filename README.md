# 🌍 TripWiser - Smart Travel Planner (Frontend)

**TripWiser** is a modern, AI-powered travel planning application designed to revolutionize how travelers explore **Sri Lanka**. It combines the power of **Google Gemini AI** with real-time mapping, weather forecasting, and hotel data to create personalized, weather-aware itineraries.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, offering a seamless and responsive user experience.

---

## 🚀 Key Features

### 🤖 AI Trip Generator
- Generates custom itineraries based on budget, duration, and travel style.
- **Weather-Aware:** Automatically detects monsoon seasons in Sri Lanka and warns users or suggests alternative sunny locations.
- **Smart suggestions:** Automatically finds popular activities and hotels.

### 🗺️ Interactive Map Planner
- **Custom Itinerary Builder:** Manually search and add multiple stops (e.g., Kandy → Ella → Mirissa).
- **Auto-Centering Map:** Map flies to the location you search for.
- **Route Visualization:** View the complete trip route with connected paths on the details page.

### 🌦️ Real-Time Intelligence
- **Live Weather:** Shows real satellite forecasts for upcoming days (via OpenWeather).
- **Seasonal Predictions:** Uses historical climate logic for future trip dates.
- **Hotel & Attractions:** Fetches real hotels and tourist spots using Geoapify.

### 👤 User Experience
- **Secure Authentication:** JWT-based Login/Register + **Google OAuth**.
- **User Profile:** Update personal details and upload profile pictures (Cloudinary).
- **Responsive Design:** Fully optimized for Desktop and Mobile using Tailwind CSS.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **State Management** | React Context API |
| **Routing** | React Router DOM v6 |
| **Maps** | [React Leaflet](https://react-leaflet.js.org/) + OpenStreetMap |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |

---

## ⚙️ Environment Variables

To run this project, you need to create a `.env` file in the root of the `client` directory.

```env
# URL of your running Backend Server
VITE_API_URL=http://localhost:5000/api/v1

# Google OAuth Client ID (From Google Cloud Console)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```
---

**Note:** API Keys for Weather, Maps, and AI are secured in the Backend, so they are not needed in the Frontend `.env` file.

## 📦 Installation & Setup

Follow these steps to get the Frontend running on your local machine.

### 1. Clone the Repository
Open your terminal and run:

```bash
git clone https://github.com/yourusername/tripwiser-frontend.git
cd tripwiser-frontend
```

## 2. Install Dependencies

Install all the required packages using npm:
code
```Bash
npm install
```

## 3. Configure Environment
Create a .env file in the root folder (next to package.json) and add the variables mentioned in the Environment Variables section above.

## 4. Run the Development Server

Start the Vite server:
code
```Bash
npm run dev
```

## 5. Access the App
Open your browser and go to:
http://localhost:5173 (or the port shown in your terminal).
