import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import Home from './pages/Home'
import PropertyListing from './pages/PropertyListing'
import DocumentVerification from './pages/DocumentVerification'
import PropertySearch from './pages/PropertySearch'
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

function App() {
  return (
    <FavoritesProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyListing />} />
          <Route path="/verify" element={<DocumentVerification />} />
          <Route path="/search" element={<PropertySearch />} />
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
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </FavoritesProvider>
  )
}

export default App