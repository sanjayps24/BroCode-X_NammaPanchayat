# BroCode-X_NammaPanchayat
# Namma Panchayat (ನಮ್ಮ ಪಂಚಾಯತ್ - ನಿಮ್ಮ ಧ್ವನಿ)

**Namma Panchayat** is a high-accessibility Progressive Web App (PWA) designed to bridge the digital divide in rural Karnataka. By prioritizing vernacular language support, voice-first interactions, and high-contrast visual design, the platform empowers villagers to engage with governance, education, and essential services without technical barriers.

## 🌟 Key Features

### 1. The Explanation Hub (Pre-Login)
* **Visual Onboarding:** Interactive carousel with high-quality icons and multilingual audio guidance (Kannada & English).
* **Persistent Language Toggle:** A floating UI element allowing users to switch between ಕನ್ನಡ and English instantly.

### 2. Dual-Portal Authentication
* **Citizen Access:** Frictionless Mobile OTP-based login tailored for rural users.
* **Admin/Official Access:** Secure Email/Password authentication for Panchayat Development Officers (PDOs).

### 3. "The 360-Village Life" (User Dashboard)
A color-coded, tile-based interface providing essential services:
* **Education (Namma Shale):** Track school repairs, mid-day meal quality, and scholarship alerts.
* **Utilities:** Simplified KEB (Electricity) and Water bill payments with high-visibility fonts.
* **Voice Grievance:** A "Massive Microphone" feature. Users record voice notes for local issues; the system uses AI to transcribe and geotag the complaint.
* **Prosperity:** Real-time Mandi prices for regional crops (Ragi, Tomato, Silk) and local MGNREGA job boards.
* **Welfare:** Searchable database for schemes like *Gruha Lakshmi* and *Anna Bhagya* with eligibility checks.
* **Emergency (Suraksha):** One-touch emergency dialing for 108, 100, and local officials.

### 4. Admin Command Center
* **Automated Ticket Routing:** AI-driven categorization and instant forwarding to KEB, PWD, or Education departments.
* **Village Broadcasting:** Send localized voice or text alerts regarding water timings or health drives.
* **Resolution Tracking:** Analytics dashboard to monitor the "Success Rate" of resolved grievances.

## 🛠️ Tech Stack

* **Frontend:** `React.js` / `Next.js` for a fast, SEO-friendly, and responsive PWA experience.
* **Styling:** `Tailwind CSS` with high-contrast, earthy tones (Greens/Browns) optimized for outdoor visibility.
* **Backend:** `Node.js` providing a scalable REST API.
* **Database:** `PostgreSQL` for robust and structured data management.
* **AI Integration:** `Gemini API` for Natural Language Processing (NLP) to handle Kannada/English transcriptions and translations.

## ♿ Accessibility First
* **Audio-Augmented UI:** Every text element is accompanied by a **"Listen" icon**, enabling illiterate or visually impaired users to hear information read aloud.
* **Iconography-Driven:** Minimalist text usage, relying on culturally relevant icons to guide navigation.

---

## 🚀 Future Roadmap
* Integration of offline-first capabilities for areas with spotty 2G/3G connectivity.
* Direct WhatsApp integration for grievance status updates.
* Expansion of the Mandi price tracker to include historical price analytics for farmers.

---

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/[your-username]/namma-panchayat.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

*Developed with ❤️ for the rural communities of Karnataka.*
