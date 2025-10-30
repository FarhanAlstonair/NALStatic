import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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

function App() {
  return (
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
      </Routes>
    </Layout>
  )
}

export default App