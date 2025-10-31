import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'
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
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyListing />} />
          <Route path="/verify" element={<ProtectedRoute><DocumentVerification /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/bidding" element={<ProtectedRoute><Bidding /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><PropertyComparison /></ProtectedRoute>} />
          <Route path="/loan-calculator" element={<ProtectedRoute><LoanCalculator /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendations /></ProtectedRoute>} />
          <Route path="/competitor-analytics" element={<ProtectedRoute><CompetitorAnalytics /></ProtectedRoute>} />
          <Route path="/price-prediction" element={<ProtectedRoute><PricePrediction /></ProtectedRoute>} />
          <Route path="/geo-analysis" element={<ProtectedRoute><GeoDemographicAnalysis /></ProtectedRoute>} />
          <Route path="/ar-tours" element={<ProtectedRoute><ARPropertyTours /></ProtectedRoute>} />
          <Route path="/government-guidelines" element={<GovernmentGuidelines />} />
          <Route path="/heat-map" element={<ProtectedRoute><HeatMap /></ProtectedRoute>} />
          <Route path="/property-trends-extended" element={<ProtectedRoute><PropertyTrendsExtended /></ProtectedRoute>} />
          <Route path="/urgent-sale-value" element={<ProtectedRoute><UrgentSaleValue /></ProtectedRoute>} />
          <Route path="/asset-management" element={<ProtectedRoute><AssetManagement /></ProtectedRoute>} />
          <Route path="/market-reports" element={<MarketReports />} />
          <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
          <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
          <Route path="/property/:id" element={<ProtectedRoute><PropertyDetails /></ProtectedRoute>} />
          <Route path="/post-property" element={<ProtectedRoute><PostProperty /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </Layout>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App