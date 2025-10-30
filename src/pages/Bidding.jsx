import { useState } from 'react'
import { Gavel, Clock, TrendingUp, Users, DollarSign, Timer } from 'lucide-react'

const Bidding = () => {
  const [activeBids, setActiveBids] = useState([])

  const auctionProperties = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Bandra West, Mumbai',
      startingPrice: 2000000,
      currentBid: 2350000,
      timeLeft: '2h 45m',
      totalBids: 12,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      status: 'active'
    },
    {
      id: 2,
      title: 'Commercial Office Space',
      location: 'Cyber City, Gurgaon',
      startingPrice: 1500000,
      currentBid: 1750000,
      timeLeft: '5h 20m',
      totalBids: 8,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      status: 'active'
    },
    {
      id: 3,
      title: '4BHK Villa',
      location: 'Whitefield, Bangalore',
      startingPrice: 3500000,
      currentBid: 3800000,
      timeLeft: 'Ended',
      totalBids: 15,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      status: 'ended'
    }
  ]

  const placeBid = (propertyId, bidAmount) => {
    setActiveBids(prev => [...prev, { propertyId, bidAmount, timestamp: new Date() }])
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const BiddingCard = ({ property }) => {
    const [bidAmount, setBidAmount] = useState(property.currentBid + 50000)

    return (
      <div className="card">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.status === 'active' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-500 text-white'
            }`}>
              {property.status === 'active' ? 'Live Auction' : 'Ended'}
            </span>
          </div>
          {property.status === 'active' && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Timer className="w-3 h-3 mr-1" />
              {property.timeLeft}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <p className="text-gray-600 text-sm">{property.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Starting Price</p>
              <p className="font-semibold">{formatPrice(property.startingPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Bid</p>
              <p className="font-bold text-green-600">{formatPrice(property.currentBid)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {property.totalBids} bids
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {property.timeLeft}
            </div>
          </div>

          {property.status === 'active' && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Bid Amount
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={property.currentBid + 10000}
                  step="10000"
                  className="input-field"
                />
              </div>
              <button
                onClick={() => placeBid(property.id, bidAmount)}
                className="btn-primary w-full"
                disabled={bidAmount <= property.currentBid}
              >
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Property Auctions
        </h1>
        <p className="text-lg text-gray-600">
          Bid on premium properties and get the best deals
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gavel className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">24</h3>
          <p className="text-gray-600">Active Auctions</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-gray-600">Successful Bids</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1.2K</h3>
          <p className="text-gray-600">Active Bidders</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹45Cr</h3>
          <p className="text-gray-600">Total Value</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="flex flex-wrap gap-4">
          <select className="input-field w-auto">
            <option>All Categories</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>
          <select className="input-field w-auto">
            <option>All Locations</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
          <select className="input-field w-auto">
            <option>All Status</option>
            <option>Live Auctions</option>
            <option>Ending Soon</option>
            <option>Recently Added</option>
          </select>
        </div>
      </div>

      {/* Auction Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionProperties.map(property => (
          <BiddingCard key={property.id} property={property} />
        ))}
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How Bidding Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Register</h3>
            <p className="text-gray-600 text-sm">Create account and verify documents</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Browse</h3>
            <p className="text-gray-600 text-sm">Find properties you want to bid on</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-yellow-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bid</h3>
            <p className="text-gray-600 text-sm">Place your competitive bids</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Win</h3>
            <p className="text-gray-600 text-sm">Complete purchase if you win</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bidding