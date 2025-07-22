import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white"></div>
            </div>
            <span className="font-bold text-xl">Retro UI</span>
            <span className="bg-black text-white px-2 py-0.5 text-xs font-semibold rounded">Pro</span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Blocks</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Templates</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Figma</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Affiliate</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
              Roadmap
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <button className="hidden sm:block border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Sign in
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold transition-colors">
              Access Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar



