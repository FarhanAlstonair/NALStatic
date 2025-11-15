import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import Home from './pages/Home'
import PropertyListing from './pages/PropertyListing'
import DocumentVerification from './pages/DocumentVerification'
import UserProfile from './pages/UserProfile'
import Bidding from './pages/Bidding'
import PropertyComparison from './pages/PropertyComparison'
import LoanCalculator from './pages/LoanCalculator'
import About from './pages/About'
import Contact from './pages/Contact'
import AIRecommendations from './pages/AIRecommendations'
import CompetitorAnalytics from './pages/CompetitorAnalytics'
import PricePrediction from './pages/PricePrediction'
import GeoDemographicAnalysis from './pages/GeoDemographicAnalysis'
import ARPropertyTours from './pages/ARPropertyTours'
import PropertyDetails from './pages/PropertyDetails'
import PostProperty from './pages/PostProperty'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GovernmentGuidelines from './pages/GovernmentGuidelines'
import HeatMap from './pages/HeatMap'
import PropertyTrendsExtended from './pages/PropertyTrendsExtended'
import UrgentSaleValue from './pages/UrgentSaleValue'
import AssetManagement from './pages/AssetManagement'
import MarketReports from './pages/MarketReports'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import PropertyAds from './pages/PropertyAds'
import DocumentRepository from './pages/DocumentRepository'
import BookingManagement from './pages/BookingManagement'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyListing />} />
          <Route path="/verify" element={<DocumentVerification />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bidding" element={<Bidding />} />
          <Route path="/compare" element={<PropertyComparison />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/competitor-analytics" element={<CompetitorAnalytics />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/geo-analysis" element={<GeoDemographicAnalysis />} />
          <Route path="/ar-tours" element={<ARPropertyTours />} />
          <Route path="/government-guidelines" element={<GovernmentGuidelines />} />
          <Route path="/heat-map" element={<HeatMap />} />
          <Route path="/property-trends-extended" element={<PropertyTrendsExtended />} />
          <Route path="/urgent-sale-value" element={<UrgentSaleValue />} />
          <Route path="/asset-management" element={<AssetManagement />} />
          <Route path="/market-reports" element={<MarketReports />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/property-ads" element={<PropertyAds />} />
          <Route path="/document-repository" element={<DocumentRepository />} />
          <Route path="/booking-management" element={<BookingManagement />} />
          </Routes>
          </Layout>
        </FavoritesProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App