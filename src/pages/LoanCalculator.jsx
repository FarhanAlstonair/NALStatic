import { useState, useEffect } from 'react'
import { Calculator, PieChart, TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react'

const LoanCalculator = () => {
  const [loanDetails, setLoanDetails] = useState({
    propertyValue: 5000000,
    downPayment: 1000000,
    loanAmount: 4000000,
    interestRate: 8.5,
    tenure: 20,
    monthlyIncome: 100000
  })

  const [results, setResults] = useState({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    eligibility: 0
  })

  useEffect(() => {
    calculateLoan()
  }, [loanDetails])

  const calculateLoan = () => {
    const { loanAmount, interestRate, tenure } = loanDetails
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    // EMI Calculation
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1)
    
    const totalAmount = emi * months
    const totalInterest = totalAmount - loanAmount
    
    // Eligibility (40% of monthly income)
    const eligibility = (loanDetails.monthlyIncome * 0.4) / monthlyRate * 
                       (1 - Math.pow(1 + monthlyRate, -months))

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      eligibility: Math.round(eligibility)
    })
  }

  const updateLoanAmount = () => {
    const newLoanAmount = loanDetails.propertyValue - loanDetails.downPayment
    setLoanDetails(prev => ({ ...prev, loanAmount: Math.max(0, newLoanAmount) }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const loanBreakdown = [
    { label: 'Principal Amount', value: loanDetails.loanAmount, color: 'bg-blue-500' },
    { label: 'Total Interest', value: results.totalInterest, color: 'bg-red-500' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Home Loan Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your EMI, eligibility, and plan your home loan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Loan Details
            </h3>
            
            <div className="space-y-6">
              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Value
                </label>
                <input
                  type="number"
                  value={loanDetails.propertyValue}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setLoanDetails(prev => ({ ...prev, propertyValue: value }))
                    setTimeout(updateLoanAmount, 100)
                  }}
                  className="input-field"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={loanDetails.propertyValue}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setLoanDetails(prev => ({ ...prev, propertyValue: value }))
                      setTimeout(updateLoanAmount, 100)
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹10L</span>
                    <span>₹5Cr</span>
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment ({Math.round((loanDetails.downPayment / loanDetails.propertyValue) * 100)}%)
                </label>
                <input
                  type="number"
                  value={loanDetails.downPayment}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setLoanDetails(prev => ({ ...prev, downPayment: value }))
                    setTimeout(updateLoanAmount, 100)
                  }}
                  className="input-field"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min={loanDetails.propertyValue * 0.1}
                    max={loanDetails.propertyValue * 0.5}
                    step="50000"
                    value={loanDetails.downPayment}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setLoanDetails(prev => ({ ...prev, downPayment: value }))
                      setTimeout(updateLoanAmount, 100)
                    }}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <input
                  type="number"
                  value={loanDetails.loanAmount}
                  onChange={(e) => setLoanDetails(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                  className="input-field"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={loanDetails.interestRate}
                  onChange={(e) => setLoanDetails(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                  className="input-field"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={loanDetails.interestRate}
                    onChange={(e) => setLoanDetails(prev => ({ ...prev, interestRate: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={loanDetails.tenure}
                  onChange={(e) => setLoanDetails(prev => ({ ...prev, tenure: Number(e.target.value) }))}
                  className="input-field"
                />
                <div className="mt-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={loanDetails.tenure}
                    onChange={(e) => setLoanDetails(prev => ({ ...prev, tenure: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5 years</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income
                </label>
                <input
                  type="number"
                  value={loanDetails.monthlyIncome}
                  onChange={(e) => setLoanDetails(prev => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* EMI Result */}
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly EMI</h3>
            <p className="text-3xl font-bold text-primary-600">
              {formatCurrency(results.emi)}
            </p>
          </div>

          {/* Loan Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loan Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Amount</span>
                <span className="font-semibold">{formatCurrency(loanDetails.loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest</span>
                <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900 font-medium">Total Amount</span>
                <span className="font-bold text-lg">{formatCurrency(results.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loan Eligibility
            </h3>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 mb-2">
                {formatCurrency(results.eligibility)}
              </p>
              <p className="text-sm text-gray-600">
                Based on 40% of monthly income
              </p>
              {results.eligibility >= loanDetails.loanAmount ? (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ You are eligible for this loan amount
                  </p>
                </div>
              ) : (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm font-medium">
                    ⚠ Loan amount exceeds eligibility
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <Percent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-bold text-blue-600">{loanDetails.interestRate}%</p>
            </div>
            <div className="card text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Tenure</p>
              <p className="font-bold text-purple-600">{loanDetails.tenure} years</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Breakdown Chart */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Loan Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              {loanBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto">
              <div className="w-full h-full rounded-full border-8 border-blue-500" 
                   style={{
                     background: `conic-gradient(#3b82f6 0deg ${(loanDetails.loanAmount / results.totalAmount) * 360}deg, #ef4444 ${(loanDetails.loanAmount / results.totalAmount) * 360}deg 360deg)`
                   }}>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-bold">{formatCurrency(results.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanCalculator