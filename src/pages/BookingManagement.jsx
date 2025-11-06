import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Plus, Eye, Edit } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BookingManagement = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [showCreateBooking, setShowCreateBooking] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')
  const [bookingForm, setBookingForm] = useState({
    propertyId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    bookingType: 'site_visit',
    date: '',
    time: '',
    notes: ''
  })

  useEffect(() => {
    const userBookings = JSON.parse(localStorage.getItem(`bookings_${user?.id}`) || '[]')
    if (userBookings.length === 0) {
      const mockBookings = [
        {
          id: 1,
          propertyId: 'prop_1',
          propertyTitle: '3BHK Luxury Apartment - Koramangala',
          clientName: 'Rajesh Kumar',
          clientPhone: '+91 98765 43210',
          clientEmail: 'rajesh@email.com',
          bookingType: 'site_visit',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '10:00',
          status: 'confirmed',
          notes: 'Interested in immediate purchase',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          testingRequired: true,
          testingStatus: 'pending'
        },
        {
          id: 2,
          propertyId: 'prop_2',
          propertyTitle: '2BHK Modern Flat - Indiranagar',
          clientName: 'Priya Sharma',
          clientPhone: '+91 87654 32109',
          clientEmail: 'priya@email.com',
          bookingType: 'documentation',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '14:30',
          status: 'pending',
          notes: 'Document verification meeting',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          testingRequired: false
        },
        {
          id: 3,
          propertyId: 'prop_3',
          propertyTitle: '4BHK Villa - HSR Layout',
          clientName: 'Amit Patel',
          clientPhone: '+91 76543 21098',
          clientEmail: 'amit@email.com',
          bookingType: 'inspection',
          date: new Date().toISOString().split('T')[0],
          time: '16:00',
          status: 'completed',
          notes: 'Property inspection completed successfully',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          testingRequired: true,
          testingStatus: 'completed',
          testingResults: 'All systems verified - RIBL Score: A+'
        }
      ]
      setBookings(mockBookings)
      localStorage.setItem(`bookings_${user?.id}`, JSON.stringify(mockBookings))
    } else {
      setBookings(userBookings)
    }
  }, [user])

  const handleCreateBooking = (e) => {
    e.preventDefault()
    const newBooking = {
      id: Date.now(),
      ...bookingForm,
      propertyTitle: `Property ${bookingForm.propertyId}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      testingRequired: bookingForm.bookingType === 'inspection',
      testingStatus: bookingForm.bookingType === 'inspection' ? 'pending' : undefined
    }
    
    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    localStorage.setItem(`bookings_${user?.id}`, JSON.stringify(updatedBookings))
    
    setShowCreateBooking(false)
    setBookingForm({
      propertyId: '',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      bookingType: 'site_visit',
      date: '',
      time: '',
      notes: ''
    })
  }

  const updateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem(`bookings_${user?.id}`, JSON.stringify(updatedBookings))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTestingStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'upcoming') return new Date(booking.date) >= new Date() && booking.status !== 'completed'
    if (selectedTab === 'completed') return booking.status === 'completed'
    if (selectedTab === 'testing') return booking.testingRequired
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking & Testing Management</h1>
              <p className="text-gray-600">Manage property visits, inspections, and verification testing</p>
            </div>
            <button
              onClick={() => setShowCreateBooking(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Booking
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => new Date(b.date) >= new Date() && b.status !== 'completed').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Testing Required</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.testingRequired && b.testingStatus === 'pending').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'all', name: 'All Bookings', count: bookings.length },
                { id: 'upcoming', name: 'Upcoming', count: bookings.filter(b => new Date(b.date) >= new Date() && b.status !== 'completed').length },
                { id: 'completed', name: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
                { id: 'testing', name: 'Testing', count: bookings.filter(b => b.testingRequired).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 mb-6">Create your first booking to get started</p>
                <button
                  onClick={() => setShowCreateBooking(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Booking
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{booking.propertyTitle}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          {booking.testingRequired && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTestingStatusColor(booking.testingStatus)}`}>
                              Testing: {booking.testingStatus}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            {booking.clientName}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {booking.clientPhone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span className="font-medium">Type:</span>
                          <span className="capitalize">{booking.bookingType.replace('_', ' ')}</span>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-gray-600 mb-4">{booking.notes}</p>
                        )}

                        {booking.testingResults && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-green-800">
                              <strong>Testing Results:</strong> {booking.testingResults}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50">
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Booking Modal */}
        {showCreateBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Create New Booking</h3>
              </div>
              
              <form onSubmit={handleCreateBooking} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property ID</label>
                    <input
                      type="text"
                      value={bookingForm.propertyId}
                      onChange={(e) => setBookingForm({...bookingForm, propertyId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter property ID"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Booking Type</label>
                    <select
                      value={bookingForm.bookingType}
                      onChange={(e) => setBookingForm({...bookingForm, bookingType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="site_visit">Site Visit</option>
                      <option value="inspection">Property Inspection</option>
                      <option value="documentation">Documentation Meeting</option>
                      <option value="final_walkthrough">Final Walkthrough</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={bookingForm.clientName}
                      onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingForm.clientPhone}
                      onChange={(e) => setBookingForm({...bookingForm, clientPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={bookingForm.clientEmail}
                      onChange={(e) => setBookingForm({...bookingForm, clientEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="client@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Additional notes or requirements"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateBooking(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Create Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingManagement