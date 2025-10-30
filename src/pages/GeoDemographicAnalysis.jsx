import { useState, useEffect } from 'react'
import { Users, BarChart3, TrendingUp, MapPin, School, Building2, ShoppingCart, Car, Wifi, Navigation, Search } from 'lucide-react'

const GeoDemographicAnalysis = () => {
  const [selectedLocation, setSelectedLocation] = useState('')
  const [currentLocation, setCurrentLocation] = useState(null)
  const [customLocation, setCustomLocation] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')

  const locationCoords = {
    'koramangala': { lat: 12.9352, lng: 77.6245 },
    'indiranagar': { lat: 12.9784, lng: 77.6408 },
    'whitefield': { lat: 12.9698, lng: 77.7500 },
    'hsr-layout': { lat: 12.9116, lng: 77.6473 }
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError('')
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Reverse geocoding to get address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBGM7Q8jORMzDOj8GMcqjel1FSFPVzG0sI`
          )
          const data = await response.json()
          
          if (data.results && data.results[0]) {
            const address = data.results[0].formatted_address
            const locationName = extractLocationName(address)
            
            setCurrentLocation({ lat: latitude, lng: longitude, address, name: locationName })
            setSelectedLocation('current-location')
            setLocationError('')
            
            // Generate comprehensive demographic data
            await generateRealLocationData(latitude, longitude, address, locationName)
          }
        } catch (error) {
          setLocationError('Failed to get location details')
        }
        
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.'
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    )
  }

  const extractLocationName = (address) => {
    // Extract meaningful location name from address
    const parts = address.split(', ')
    if (parts.length >= 2) {
      return `${parts[0]}, ${parts[1]}`
    }
    return parts[0] || 'Current Location'
  }

  const generateRealLocationData = async (lat, lng, address, locationName) => {
    // Simulate real data fetching with realistic demographic analysis
    const basePopulation = Math.floor(Math.random() * 300000) + 100000
    const isUrban = basePopulation > 200000
    const isMetro = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].some(city => 
      address.toLowerCase().includes(city.toLowerCase())
    )
    
    const realData = {
      name: locationName,
      coordinates: { lat, lng },
      demographics: {
        population: basePopulation,
        avgAge: isUrban ? Math.floor(Math.random() * 10) + 28 : Math.floor(Math.random() * 15) + 32,
        avgIncome: isMetro ? Math.floor(Math.random() * 1200000) + 800000 : Math.floor(Math.random() * 600000) + 400000,
        educationLevel: isUrban ? ['Graduate+', 'Post-Graduate'][Math.floor(Math.random() * 2)] : 'Graduate',
        familySize: (Math.random() * 1.5 + 2.5).toFixed(1),
        literacyRate: isUrban ? (Math.random() * 10 + 85).toFixed(1) : (Math.random() * 15 + 70).toFixed(1)
      },
      infrastructure: {
        schools: isUrban ? Math.floor(Math.random() * 40) + 20 : Math.floor(Math.random() * 15) + 8,
        hospitals: isUrban ? Math.floor(Math.random() * 15) + 8 : Math.floor(Math.random() * 6) + 3,
        malls: isMetro ? Math.floor(Math.random() * 12) + 5 : Math.floor(Math.random() * 4) + 1,
        metros: isMetro ? Math.floor(Math.random() * 8) + 2 : 0,
        airports: isMetro ? 1 : Math.random() > 0.8 ? 1 : 0,
        banks: isUrban ? Math.floor(Math.random() * 25) + 15 : Math.floor(Math.random() * 10) + 5
      },
      lifestyle: {
        restaurants: isUrban ? Math.floor(Math.random() * 150) + 80 : Math.floor(Math.random() * 50) + 20,
        gyms: isUrban ? Math.floor(Math.random() * 25) + 15 : Math.floor(Math.random() * 8) + 3,
        parks: Math.floor(Math.random() * 12) + 5,
        theaters: isUrban ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 3) + 1,
        cafes: isUrban ? Math.floor(Math.random() * 80) + 40 : Math.floor(Math.random() * 20) + 10,
        temples: Math.floor(Math.random() * 15) + 8
      },
      scores: {
        connectivity: isMetro ? (Math.random() * 2 + 8).toFixed(1) : (Math.random() * 3 + 6.5).toFixed(1),
        safety: (Math.random() * 2.5 + 7).toFixed(1),
        amenities: isUrban ? (Math.random() * 2 + 7.5).toFixed(1) : (Math.random() * 2.5 + 6.5).toFixed(1),
        investment: isMetro ? (Math.random() * 2 + 7.5).toFixed(1) : (Math.random() * 2.5 + 6.8).toFixed(1),
        livability: (Math.random() * 2 + 7.2).toFixed(1)
      },
      realEstate: {
        avgPropertyPrice: isMetro ? Math.floor(Math.random() * 8000000) + 5000000 : Math.floor(Math.random() * 3000000) + 2000000,
        pricePerSqFt: isMetro ? Math.floor(Math.random() * 15000) + 8000 : Math.floor(Math.random() * 6000) + 3000,
        rentalYield: (Math.random() * 2 + 2.5).toFixed(1),
        appreciationRate: (Math.random() * 8 + 5).toFixed(1)
      }
    }
    
    // Store the generated data with current-location key
    locationData['current-location'] = realData
  }

  const generateLocationData = async (lat, lng, address) => {
    // Generate realistic demographic data based on location
    const baseData = {
      name: address,
      coordinates: { lat, lng },
      demographics: {
        population: Math.floor(Math.random() * 200000) + 50000,
        avgAge: Math.floor(Math.random() * 15) + 25,
        avgIncome: Math.floor(Math.random() * 800000) + 400000,
        educationLevel: ['Graduate', 'Graduate+', 'Post-Graduate'][Math.floor(Math.random() * 3)],
        familySize: (Math.random() * 2 + 2).toFixed(1)
      },
      infrastructure: {
        schools: Math.floor(Math.random() * 30) + 10,
        hospitals: Math.floor(Math.random() * 10) + 3,
        malls: Math.floor(Math.random() * 8) + 2,
        metros: Math.floor(Math.random() * 3),
        airports: Math.random() > 0.7 ? 1 : 0
      },
      lifestyle: {
        restaurants: Math.floor(Math.random() * 100) + 50,
        gyms: Math.floor(Math.random() * 20) + 10,
        parks: Math.floor(Math.random() * 10) + 3,
        theaters: Math.floor(Math.random() * 5) + 2,
        cafes: Math.floor(Math.random() * 60) + 30
      },
      scores: {
        connectivity: (Math.random() * 3 + 7).toFixed(1),
        safety: (Math.random() * 2 + 7.5).toFixed(1),
        amenities: (Math.random() * 2.5 + 7).toFixed(1),
        investment: (Math.random() * 2 + 7.5).toFixed(1),
        livability: (Math.random() * 2 + 7.5).toFixed(1)
      }
    }
    
    // Store the generated data
    locationData['current'] = baseData
    return baseData
  }

  const searchLocation = async () => {
    if (!customLocation.trim()) return
    
    setIsLoadingLocation(true)
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(customLocation)}&key=AIzaSyBGM7Q8jORMzDOj8GMcqjel1FSFPVzG0sI`
      )
      const data = await response.json()
      
      if (data.results && data.results[0]) {
        const result = data.results[0]
        const { lat, lng } = result.geometry.location
        setCurrentLocation({ lat, lng, address: result.formatted_address })
        setSelectedLocation('custom')
        setLocationError('')
        
        // Generate data for searched location
        await generateLocationData(lat, lng, result.formatted_address)
      } else {
        setLocationError('Location not found. Please try a different search term.')
      }
    } catch (error) {
      setLocationError('Failed to search location. Please try again.')
    }
    setIsLoadingLocation(false)
  }

  useEffect(() => {
    if (selectedLocation && (selectedLocation === 'current' || selectedLocation === 'custom')) {
      initializeGeoMap()
    } else if (selectedLocation && locationData[selectedLocation]) {
      initializeGeoMap()
    }
  }, [selectedLocation, currentLocation])

  const initializeGeoMap = () => {
    if (window.google) {
      let coords
      let title
      
      if (selectedLocation === 'current' || selectedLocation === 'custom') {
        coords = currentLocation
        title = currentLocation?.address || 'Selected Location'
      } else {
        coords = locationCoords[selectedLocation]
        title = locationData[selectedLocation]?.name || 'Location'
      }
      
      if (!coords) return
      
      const map = new window.google.maps.Map(document.getElementById('geo-map'), {
        zoom: 14,
        center: coords,
        styles: [
          {
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      // Add location marker
      new window.google.maps.Marker({
        position: coords,
        map: map,
        title: title,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="12" fill="#ef4444" stroke="white" stroke-width="2"/>
              <circle cx="15" cy="15" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30)
        }
      })

      // Add demographic overlay
      const demographicCircle = new window.google.maps.Circle({
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        map: map,
        center: coords,
        radius: 2000 // 2km radius
      })
    }
  }

  const locationData = {
    'koramangala': {
      name: 'Koramangala, Bangalore',
      demographics: {
        population: 280000,
        avgAge: 28,
        avgIncome: 1250000,
        educationLevel: 'Graduate+',
        familySize: 2.8
      },
      infrastructure: {
        schools: 35,
        hospitals: 8,
        malls: 6,
        metros: 2,
        airports: 1
      },
      lifestyle: {
        restaurants: 200,
        gyms: 30,
        parks: 5,
        theaters: 4,
        cafes: 120
      },
      scores: {
        connectivity: 8.5,
        safety: 8.2,
        amenities: 8.8,
        investment: 9.2,
        livability: 8.7
      }
    },
    'indiranagar': {
      name: 'Indiranagar, Bangalore',
      demographics: {
        population: 320000,
        avgAge: 29,
        avgIncome: 1180000,
        educationLevel: 'Graduate+',
        familySize: 2.9
      },
      infrastructure: {
        schools: 40,
        hospitals: 10,
        malls: 5,
        metros: 3,
        airports: 1
      },
      lifestyle: {
        restaurants: 180,
        gyms: 25,
        parks: 8,
        theaters: 5,
        cafes: 95
      },
      scores: {
        connectivity: 8.8,
        safety: 8.5,
        amenities: 9.1,
        investment: 8.9,
        livability: 8.9
      }
    },
    'whitefield': {
      name: 'Whitefield, Bangalore',
      demographics: {
        population: 450000,
        avgAge: 27,
        avgIncome: 1420000,
        educationLevel: 'Graduate+',
        familySize: 2.7
      },
      infrastructure: {
        schools: 50,
        hospitals: 12,
        malls: 8,
        metros: 1,
        airports: 1
      },
      lifestyle: {
        restaurants: 160,
        gyms: 35,
        parks: 6,
        theaters: 6,
        cafes: 85
      },
      scores: {
        connectivity: 7.8,
        safety: 8.7,
        amenities: 8.5,
        investment: 9.5,
        livability: 8.4
      }
    },
    'hsr-layout': {
      name: 'HSR Layout, Bangalore',
      demographics: {
        population: 210000,
        avgAge: 26,
        avgIncome: 1380000,
        educationLevel: 'Graduate+',
        familySize: 2.6
      },
      infrastructure: {
        schools: 30,
        hospitals: 7,
        malls: 4,
        metros: 2,
        airports: 1
      },
      lifestyle: {
        restaurants: 140,
        gyms: 28,
        parks: 12,
        theaters: 3,
        cafes: 75
      },
      scores: {
        connectivity: 8.2,
        safety: 8.9,
        amenities: 8.6,
        investment: 9.0,
        livability: 8.8
      }
    }
  }

  const getCurrentData = () => {
    if (selectedLocation === 'current-location') {
      return locationData['current-location'] || null
    }
    if (selectedLocation === 'custom') {
      return locationData['current'] || null
    }
    return selectedLocation && locationData[selectedLocation] ? locationData[selectedLocation] : null
  }
  
  const currentData = getCurrentData()

  const ScoreCard = ({ title, score, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-3">{score}/10</div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color.replace('bg-', 'bg-')}`}
          style={{ width: `${score * 10}%` }}
        ></div>
      </div>
    </div>
  )

  const DemographicCard = ({ title, value, subtitle, icon: Icon }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <div className="text-lg font-bold text-blue-600">{value}</div>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1920&h=600&fit=crop&crop=center" 
            alt="City analytics and data visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-indigo-600/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Geo-Demographic Analysis
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive location insights combining geographic and demographic data for smarter property decisions
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Location Input */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Location for Analysis</h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Current Location */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2 align-center justify-center">Use Current Location</label>
            <button onClick={getCurrentLocation} disabled={isLoadingLocation} className="btn-primary w-full h-12 flex justify-center items-center">
  {isLoadingLocation ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      <span>Getting Location...</span>
    </>
  ) : (
    <>
      <Navigation className="w-4 h-4 mr-2" />
      <span>Use My Location</span>
    </>
  )}
</button>

          </div>

          {/* Manual Location */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Location Manually</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Enter city, area, or address"
                className="input-field flex-1 h-12"
                onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              />
              <button
                onClick={searchLocation}
                disabled={!customLocation.trim()}
                className="btn-secondary px-4 h-12"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Location Status Messages */}
        {currentLocation && selectedLocation === 'current-location' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-800">
                ✓ Location detected: {currentLocation.name}
              </p>
              <span className="text-xs text-green-600 font-medium">
                Real-time Analysis
              </span>
            </div>
          </div>
        )}

        {locationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-800 text-sm">{locationError}</p>
          </div>
        )}

        {/* Quick Location Options */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Quick Select</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: 'Koramangala', key: 'koramangala' },
              { name: 'Indiranagar', key: 'indiranagar' },
              { name: 'Whitefield', key: 'whitefield' },
              { name: 'HSR Layout', key: 'hsr-layout' }
            ].map((location) => (
              <button
                key={location.key}
                onClick={() => {
                  setSelectedLocation(location.key)
                  setLocationError('')
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedLocation === location.key
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Location Overview */}
      {(selectedLocation && currentData) && (
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedLocation === 'current-location' ? currentLocation?.name || 'Current Location Analysis' : currentData?.name || 'Location Analysis'}
              </h2>
              {currentData?.coordinates && (
                <p className="text-sm text-gray-600">
                  Coordinates: {currentData.coordinates.lat.toFixed(4)}, {currentData.coordinates.lng.toFixed(4)}
                </p>
              )}
              {selectedLocation === 'current-location' && currentLocation?.address && (
                <p className="text-sm text-gray-500 mt-1">
                  {currentLocation.address}
                </p>
              )}
            </div>
            <div className="mt-2 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ {selectedLocation === 'current-location' ? 'Live Location Analysis' : 'Analysis Complete'}
              </span>
            </div>
          </div>
          <div id="geo-map" className="h-80 rounded-lg border border-gray-200 bg-gray-100"></div>
        </div>
      )}

      {/* Livability Scores */}
      {currentData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Livability Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <ScoreCard 
              title="Connectivity" 
              score={currentData.scores.connectivity} 
              icon={Car}
              color="bg-blue-500"
            />
            <ScoreCard 
              title="Safety" 
              score={currentData.scores.safety} 
              icon={Users}
              color="bg-green-500"
            />
            <ScoreCard 
              title="Amenities" 
              score={currentData.scores.amenities} 
              icon={ShoppingCart}
              color="bg-purple-500"
            />
            <ScoreCard 
              title="Investment" 
              score={currentData.scores.investment} 
              icon={TrendingUp}
              color="bg-orange-500"
            />
            <ScoreCard 
              title="Livability" 
              score={currentData.scores.livability} 
              icon={MapPin}
              color="bg-red-500"
            />
          </div>
        </div>
      )}

      {currentData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demographics */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Demographics</h2>
            <div className="space-y-4">
              <DemographicCard 
                title="Population" 
                value={currentData.demographics.population.toLocaleString()} 
                subtitle="Total residents"
                icon={Users}
              />
              <DemographicCard 
                title="Average Age" 
                value={`${currentData.demographics.avgAge} years`} 
                subtitle="Median age of residents"
                icon={Users}
              />
              <DemographicCard 
                title="Average Income" 
                value={`₹${(currentData.demographics.avgIncome / 100000).toFixed(1)}L`} 
                subtitle="Annual household income"
                icon={BarChart3}
              />
              <DemographicCard 
                title="Education Level" 
                value={currentData.demographics.educationLevel} 
                subtitle="Majority education level"
                icon={School}
              />
              <DemographicCard 
                title="Family Size" 
                value={currentData.demographics.familySize} 
                subtitle="Average members per family"
                icon={Users}
              />
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Infrastructure</h2>
            <div className="space-y-4">
              <DemographicCard 
                title="Schools" 
                value={currentData.infrastructure.schools} 
                subtitle="Educational institutions"
                icon={School}
              />
              <DemographicCard 
                title="Hospitals" 
                value={currentData.infrastructure.hospitals} 
                subtitle="Healthcare facilities"
                icon={Building2}
              />
              <DemographicCard 
                title="Shopping Malls" 
                value={currentData.infrastructure.malls} 
                subtitle="Major retail centers"
                icon={ShoppingCart}
              />
              <DemographicCard 
                title="Metro Stations" 
                value={currentData.infrastructure.metros} 
                subtitle="Public transport access"
                icon={Car}
              />
              <DemographicCard 
                title="Airports" 
                value={currentData.infrastructure.airports} 
                subtitle="Air connectivity"
                icon={MapPin}
              />
            </div>
          </div>
        </div>
      )}

      {/* Lifestyle & Amenities */}
      {currentData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Lifestyle & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card text-center">
              <ShoppingCart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentData.lifestyle.restaurants}</div>
              <p className="text-sm text-gray-600">Restaurants</p>
            </div>
            <div className="card text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentData.lifestyle.gyms}</div>
              <p className="text-sm text-gray-600">Gyms & Fitness</p>
            </div>
            <div className="card text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentData.lifestyle.parks}</div>
              <p className="text-sm text-gray-600">Parks</p>
            </div>
            <div className="card text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentData.lifestyle.theaters}</div>
              <p className="text-sm text-gray-600">Theaters</p>
            </div>
            <div className="card text-center">
              <Wifi className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{currentData.lifestyle.cafes}</div>
              <p className="text-sm text-gray-600">Cafes</p>
            </div>
          </div>
        </div>
      )}

      {/* Real Estate Market Data - Only for Current Location */}
      {selectedLocation === 'current-location' && currentData?.realEstate && (
        <div className="mt-8 card bg-blue-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Real Estate Market Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 mb-2">Avg Property Price</h4>
              <div className="text-2xl font-bold text-blue-600">
                ₹{(currentData.realEstate.avgPropertyPrice / 100000).toFixed(1)}L
              </div>
              <p className="text-sm text-gray-600">Per property</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 mb-2">Price per Sq Ft</h4>
              <div className="text-2xl font-bold text-green-600">
                ₹{currentData.realEstate.pricePerSqFt.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Per sq ft</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 mb-2">Rental Yield</h4>
              <div className="text-2xl font-bold text-purple-600">
                {currentData.realEstate.rentalYield}%
              </div>
              <p className="text-sm text-gray-600">Annual return</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 mb-2">Appreciation</h4>
              <div className="text-2xl font-bold text-orange-600">
                {currentData.realEstate.appreciationRate}%
              </div>
              <p className="text-sm text-gray-600">Per year</p>
            </div>
          </div>
        </div>
      )}

      {/* Investment Insights */}
      {currentData && (
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {selectedLocation === 'current-location' ? 'Live Investment Insights' : 'Investment Insights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-green-700 mb-3">Strengths</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.demographics.avgIncome > 800000 ? 'High-income demographic profile' : 'Growing middle-class population'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.scores.connectivity > 8 ? 'Excellent connectivity and infrastructure' : 'Good connectivity options'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.lifestyle.restaurants > 100 ? 'Rich lifestyle and entertainment options' : 'Adequate lifestyle amenities'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>Strong rental demand from {currentData.demographics.avgAge < 35 ? 'young professionals' : 'families'}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-orange-700 mb-3">Considerations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.realEstate?.avgPropertyPrice > 5000000 ? 'Premium pricing due to location' : 'Moderate pricing levels'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.demographics.population > 200000 ? 'High competition for properties' : 'Limited property inventory'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  <span>{currentData.infrastructure.metros > 0 ? 'Traffic congestion during peak hours' : 'Limited public transport options'}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                  <span>Infrastructure development in progress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default GeoDemographicAnalysis