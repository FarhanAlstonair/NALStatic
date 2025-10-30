import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Upload, MapPin, FileText, CheckCircle, User, Home, Camera, FileCheck, Eye } from 'lucide-react'

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Details
    ownerName: '',
    mobile: '',
    email: '',
    companyName: '',
    contactType: 'owner',
    
    // Property Information
    title: '',
    description: '',
    listingType: '',
    propertyType: '',
    
    // Property Specifications
    builtUpArea: '',
    carpetArea: '',
    plotArea: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    facing: '',
    furnishing: '',
    propertyAge: '',
    floorNumber: '',
    totalFloors: '',
    possessionStatus: '',
    
    // Features & Amenities
    specifications: [],
    features: [],
    amenities: [],
    highlights: [],
    
    // Conditional Pricing - SELL
    salePrice: '',
    pricePerSqFt: '',
    priceNegotiable: false,
    loanAvailability: false,
    
    // Conditional Pricing - RENT
    monthlyRent: '',
    securityDeposit: '',
    leaseTerms: '',
    
    // Conditional Pricing - URGENT SALE
    actualPrice: '',
    urgentSaleStartDate: '',
    urgentSaleStartTime: '',
    urgentSaleEndDate: '',
    urgentSaleEndTime: '',
    
    // Conditional Pricing - BIDDING
    startingBiddingPrice: '',
    minimumIncrement: '',
    reservePrice: '',
    auctionStartDate: '',
    auctionStartTime: '',
    auctionEndDate: '',
    auctionEndTime: '',
    timezone: 'Asia/Kolkata',
    
    // Conditional Pricing - LEASE
    leaseType: '',
    leaseDuration: '',
    monthlyLeaseAmount: '',
    leaseStartDate: '',
    possessionAvailability: '',
    advanceDeposit: '',
    maintenanceCharges: '',
    lockInPeriod: '',
    renewalTerms: '',
    paymentFrequency: '',
    autoRenew: false,
    
    // PG/Co-living Specific
    accommodationType: '',
    totalBedsAvailable: '',
    perBedRent: '',
    genderPreference: '',
    availabilityDate: '',
    foodAvailability: '',
    pgSecurityDeposit: '',
    pgMaintenanceCharges: '',
    roomFurnishingDetails: '',
    houseRules: '',
    guestPolicy: '',
    attachedBathroom: false,
    securityType: '',
    minimumStayDuration: '',
    bookingAmount: '',
    propertyManagerContact: '',
    pgCommonFacilities: [],
    
    // Location Details
    address: '',
    city: '',
    locality: '',
    pincode: '',
    state: '',
    landmark: '',
    latitude: '',
    longitude: '',
    
    // Media
    primaryImage: '',
    imageUrls: [],
    virtualTourUrl: '',
    threeSixtyView: '',
    housePlan: '',
    
    // Documents
    documents: [],
    
    // Final Agreement
    acceptTerms: false,
    enableAlerts: false
  })

  const steps = [
    { id: 1, title: 'Basic Info', icon: User, description: 'Personal & Property Details' },
    { id: 2, title: 'Details & Pricing', icon: Home, description: 'Specifications & Pricing' },
    { id: 3, title: 'Location & Media', icon: MapPin, description: 'Address & Images' },
    { id: 4, title: 'Documents', icon: FileCheck, description: 'Property Documents' },
    { id: 5, title: 'Review & Submit', icon: CheckCircle, description: 'Final Review' }
  ]

  const listingTypes = [
    { value: 'sell', label: 'Sell', description: 'Standard property sale' },
    { value: 'rent', label: 'Rent', description: 'Rental property' },
    { value: 'lease', label: 'Lease', description: 'Long-term commercial/residential lease' },
    { value: 'urgent-sale', label: 'Urgent Sale', description: 'Time-sensitive sale' },
    { value: 'bidding', label: 'Bidding', description: 'Auction-based sale' }
  ]

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', description: 'Flat/apartment units' },
    { value: 'villa', label: 'Villa', description: 'Independent villa' },
    { value: 'house', label: 'House', description: 'Independent house' },
    { value: 'commercial', label: 'Commercial', description: 'Office/shop/warehouse' },
    { value: 'pg-coliving', label: 'PG/Co-living', description: 'Paying guest accommodation' }
  ]

  const specifications = [
    'Air Conditioning', 'Parking', 'Balcony', 'Garden', 'Swimming Pool', 
    'Gym', 'Security', 'Elevator', 'Power Backup', 'Water Supply'
  ]

  const features = [
    'Modular Kitchen', 'Servant Room', 'Study Room', 'Pooja Room', 
    'Store Room', 'Terrace', 'Basement', 'Attic'
  ]

  const amenities = [
    'Club House', 'Children Play Area', 'Jogging Track', 'Garden', 
    'Community Hall', 'Shopping Center', 'School', 'Hospital'
  ]

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('propertyFormDraft')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('propertyFormDraft', JSON.stringify(formData))
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderBasicInfo = () => (
    <div className="space-y-8">
      {/* Personal Details Section */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChange('ownerName', e.target.value)}
              className="input-field"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="input-field"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="input-field"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="input-field"
              placeholder="Company name (optional)"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="owner"
                checked={formData.contactType === 'owner'}
                onChange={(e) => handleInputChange('contactType', e.target.value)}
                className="mr-2"
              />
              Owner
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="agent"
                checked={formData.contactType === 'agent'}
                onChange={(e) => handleInputChange('contactType', e.target.value)}
                className="mr-2"
              />
              Agent
            </label>
          </div>
        </div>
      </div>

      {/* Property Information Section */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="input-field"
              placeholder="e.g., 3BHK Luxury Apartment in Bandra West"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="input-field"
              rows={4}
              placeholder="Describe your property in detail..."
            />
          </div>
        </div>
      </div>

      {/* Listing & Property Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Listing Type *</label>
          <div className="space-y-2">
            {listingTypes.map(type => (
              <label key={type.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.listingType === type.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  value={type.value}
                  checked={formData.listingType === type.value}
                  onChange={(e) => handleInputChange('listingType', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Property Type *</label>
          <div className="space-y-2">
            {propertyTypes.map(type => (
              <label key={type.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.propertyType === type.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  value={type.value}
                  checked={formData.propertyType === type.value}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderDetailsPricing = () => (
    <div className="space-y-8">
      {/* Property Specifications */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Built-up Area (sq ft) *</label>
            <input
              type="number"
              value={formData.builtUpArea}
              onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
              className="input-field"
              placeholder="1200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq ft)</label>
            <input
              type="number"
              value={formData.carpetArea}
              onChange={(e) => handleInputChange('carpetArea', e.target.value)}
              className="input-field"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plot Area (sq ft)</label>
            <input
              type="number"
              value={formData.plotArea}
              onChange={(e) => handleInputChange('plotArea', e.target.value)}
              className="input-field"
              placeholder="1500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
            <select
              value={formData.bedrooms}
              onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
            <select
              value={formData.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Balconies</label>
            <select
              value={formData.balconies}
              onChange={(e) => handleInputChange('balconies', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facing *</label>
            <select
              value={formData.facing}
              onChange={(e) => handleInputChange('facing', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="north-east">North-East</option>
              <option value="north-west">North-West</option>
              <option value="south-east">South-East</option>
              <option value="south-west">South-West</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing *</label>
            <select
              value={formData.furnishing}
              onChange={(e) => handleInputChange('furnishing', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="fully-furnished">Fully Furnished</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Age *</label>
            <select
              value={formData.propertyAge}
              onChange={(e) => handleInputChange('propertyAge', e.target.value)}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="0-1">0-1 Years</option>
              <option value="1-5">1-5 Years</option>
              <option value="5-10">5-10 Years</option>
              <option value="10-15">10-15 Years</option>
              <option value="15+">15+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Features & Amenities */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Specifications</label>
            <div className="grid grid-cols-2 gap-2">
              {specifications.map(spec => (
                <label key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.specifications.includes(spec)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...formData.specifications, spec]
                        : formData.specifications.filter(s => s !== spec)
                      handleInputChange('specifications', updated)
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{spec}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Additional Features</label>
            <div className="grid grid-cols-2 gap-2">
              {features.map(feature => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...formData.features, feature]
                        : formData.features.filter(f => f !== feature)
                      handleInputChange('features', updated)
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Pricing Sections */}
      {formData.listingType === 'sell' && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sale Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price (₹) *</label>
              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => handleInputChange('salePrice', e.target.value)}
                className="input-field"
                placeholder="25000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per Sq Ft (₹)</label>
              <input
                type="number"
                value={formData.pricePerSqFt}
                onChange={(e) => handleInputChange('pricePerSqFt', e.target.value)}
                className="input-field"
                placeholder="20000"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.priceNegotiable}
                onChange={(e) => handleInputChange('priceNegotiable', e.target.checked)}
                className="mr-2"
              />
              Price Negotiable
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.loanAvailability}
                onChange={(e) => handleInputChange('loanAvailability', e.target.checked)}
                className="mr-2"
              />
              Bank Loan Available
            </label>
          </div>
        </div>
      )}

      {formData.listingType === 'rent' && (
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹) *</label>
              <input
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                className="input-field"
                placeholder="45000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit (₹)</label>
              <input
                type="number"
                value={formData.securityDeposit}
                onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                className="input-field"
                placeholder="90000"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Lease Terms</label>
            <textarea
              value={formData.leaseTerms}
              onChange={(e) => handleInputChange('leaseTerms', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Enter lease terms and conditions..."
            />
          </div>
        </div>
      )}

      {formData.listingType === 'urgent-sale' && (
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Urgent Sale Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actual Price (₹) *</label>
              <input
                type="number"
                value={formData.actualPrice}
                onChange={(e) => handleInputChange('actualPrice', e.target.value)}
                className="input-field"
                placeholder="30000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sale End Date</label>
              <input
                type="date"
                value={formData.urgentSaleEndDate}
                onChange={(e) => handleInputChange('urgentSaleEndDate', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      {formData.listingType === 'bidding' && (
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bidding Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Starting Bid Price (₹) *</label>
              <input
                type="number"
                value={formData.startingBiddingPrice}
                onChange={(e) => handleInputChange('startingBiddingPrice', e.target.value)}
                className="input-field"
                placeholder="20000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reserve Price (₹)</label>
              <input
                type="number"
                value={formData.reservePrice}
                onChange={(e) => handleInputChange('reservePrice', e.target.value)}
                className="input-field"
                placeholder="25000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auction Start Date</label>
              <input
                type="date"
                value={formData.auctionStartDate}
                onChange={(e) => handleInputChange('auctionStartDate', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auction End Date</label>
              <input
                type="date"
                value={formData.auctionEndDate}
                onChange={(e) => handleInputChange('auctionEndDate', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      {formData.propertyType === 'pg-coliving' && (
        <div className="bg-pink-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">PG/Co-living Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type *</label>
              <select
                value={formData.accommodationType}
                onChange={(e) => handleInputChange('accommodationType', e.target.value)}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="single">Single Sharing</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
                <option value="dormitory">Dormitory</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Beds Available *</label>
              <input
                type="number"
                value={formData.totalBedsAvailable}
                onChange={(e) => handleInputChange('totalBedsAvailable', e.target.value)}
                className="input-field"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Per Bed Rent (₹) *</label>
              <input
                type="number"
                value={formData.perBedRent}
                onChange={(e) => handleInputChange('perBedRent', e.target.value)}
                className="input-field"
                placeholder="15000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preference *</label>
              <select
                value={formData.genderPreference}
                onChange={(e) => handleInputChange('genderPreference', e.target.value)}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="male">Male Only</option>
                <option value="female">Female Only</option>
                <option value="coed">Co-ed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Availability</label>
              <select
                value={formData.foodAvailability}
                onChange={(e) => handleInputChange('foodAvailability', e.target.value)}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="no-food">No Food</option>
                <option value="breakfast">Breakfast Only</option>
                <option value="all-meals">All Meals</option>
                <option value="veg-only">Veg Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability Date *</label>
              <input
                type="date"
                value={formData.availabilityDate}
                onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderLocationMedia = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="input-field"
          rows={3}
          placeholder="Enter complete address with landmarks"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className="input-field"
            placeholder="400050"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="input-field"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="input-field"
            placeholder="Maharashtra"
          />
        </div>
      </div>

      <div className="card bg-gray-50">
        <h3 className="font-medium text-gray-900 mb-4">Property Images</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Upload property images</p>
          <p className="text-sm text-gray-500">JPG, PNG up to 10MB each</p>
          <button className="btn-primary mt-4">Choose Images</button>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="card bg-blue-50">
        <h3 className="font-medium text-gray-900 mb-4">Required Documents</h3>
        <div className="space-y-4">
          {[
            'Property Title Deed',
            'Sale Agreement',
            'Property Tax Receipt',
            'Encumbrance Certificate'
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-700">{doc}</span>
              <button className="btn-secondary text-sm">Upload</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <div className="card bg-green-50">
        <h3 className="font-medium text-gray-900 mb-4">Property Summary</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Title:</strong> {formData.propertyTitle}</p>
          <p><strong>Type:</strong> {formData.propertyType} - {formData.listingType}</p>
          <p><strong>Area:</strong> {formData.builtUpArea} sq ft</p>
          <p><strong>Configuration:</strong> {formData.bedrooms} BHK, {formData.bathrooms} Bath</p>
          {formData.salePrice && <p><strong>Price:</strong> ₹{formData.salePrice}</p>}
          {formData.monthlyRent && <p><strong>Rent:</strong> ₹{formData.monthlyRent}/month</p>}
        </div>
      </div>
      
      <div className="text-center">
        <button className="btn-primary text-lg px-8 py-3">
          Submit Property Listing
        </button>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderBasicInfo()
      case 2: return renderDetailsPricing()
      case 3: return renderLocationMedia()
      case 4: return renderDocuments()
      case 5: return renderReview()
      default: return renderBasicInfo()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Property</h1>
        <p className="text-lg text-gray-600">List your property in 5 simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  isActive ? 'bg-primary-500 border-primary-500 text-white' :
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 w-full h-0.5 -z-10 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} style={{ left: '50%', width: 'calc(100% - 48px)' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Step {currentStep}: {steps[currentStep - 1].title}
        </h2>
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        {currentStep < 5 && (
          <button onClick={nextStep} className="btn-primary">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}

export default PostProperty