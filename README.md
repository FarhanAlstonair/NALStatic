# NAL India - Property Verification Platform

A modern, responsive property verification and listing platform built with React, Vite, and Tailwind CSS.

## Features Implemented (Category 1 - Must Have)

### ✅ Core Features
- **Instant Document Verification** - Upload and verify property documents with AI-powered analysis
- **Property Listing** - Comprehensive property listings with filters and search
- **Property Search** - Advanced search with intelligent filters and suggestions
- **User Profile Management** - Complete user profile with property management
- **RIBL Scorecard** - Property quality scoring system
- **Buy/Sell/Rent/Lease** - Transaction type support
- **Secure Payment Gateway** - Payment integration ready
- **Real-time Notifications** - Push notification system
- **Custom Dashboard** - Personalized user dashboards

### 🎨 Design Features
- Clean, modern design inspired by Google's Material Design
- Fully responsive layout for all devices
- Consistent spacing and typography
- Accessible color scheme and contrast
- Smooth animations and transitions

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NALProject
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout.jsx      # Main layout with navigation
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── DocumentVerification.jsx
│   ├── PropertyListing.jsx
│   ├── PropertySearch.jsx
│   └── UserProfile.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features Overview

### 🏠 Home Page
- Hero section with call-to-action
- Feature showcase
- Statistics display
- Quick action buttons

### 📄 Document Verification
- Drag & drop file upload
- Multiple document type support
- Real-time verification status
- Detailed verification results
- Security and privacy information

### 🏢 Property Listing
- Property cards with images
- Filter by type (sale/rent/lease)
- RIBL score display
- Favorite and share functionality
- Responsive grid layout

### 🔍 Property Search
- Advanced search with filters
- Popular and recent searches
- Search suggestions
- Map/List view toggle
- Price and area range sliders

### 👤 User Profile
- Profile information management
- Property management
- Favorites collection
- Activity tracking
- Account settings

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Components
Reusable component classes are defined in `src/index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card` - Card container style
- `.input-field` - Input field style

## Next Steps (Category 2 & 3 Features)

### Category 2 - Good to Have
- [ ] Bidding system
- [ ] Property comparison tool
- [ ] Loan calculator
- [ ] Video conferencing
- [ ] Campaign management
- [ ] AI recommendations

### Category 3 - Advanced Features
- [ ] Competitor analytics
- [ ] Geo-demographic analysis
- [ ] AR property tours
- [ ] Drone view integration
- [ ] Customer behavior analysis
- [ ] Dynamic pricing
- [ ] Intelligent matching
- [ ] Price prediction

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.