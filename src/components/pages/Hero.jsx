import React from 'react';

const Hero = () => {
 return (
    <section className="bg-gradient-to-b from-yellow-50 to-white py-12 relative overflow-hidden" style={{
      backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    }}>
      {/* Decorative elements */}
      <div className="absolute top-16 left-8 sm:left-16 lg:left-24">
        <div className="relative">
          <div className="w-4 h-4 bg-black transform rotate-45"></div>
          <div className="w-3 h-3 bg-yellow-400 transform rotate-45 absolute -bottom-1 -right-1"></div>
        </div>
      </div>
      
      <div className="absolute top-72 right-8 sm:right-16 lg:right-24">
        <div className="relative">
          <div className="w-3 h-3 bg-yellow-400 transform rotate-45"></div>
          <div className="w-4 h-4 bg-black transform rotate-45 absolute -top-1 -left-1"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Limited Time Offer Badge */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm">
            Get 50% Off - Limited Time Only!
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight">
            <div className="mb-2">Not Every Website Has To</div>
            <div className="text-yellow-400 italic transform -rotate-1 inline-block">
              Look The Same!
            </div>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Get access to 50+ neo brutalism styled UI blocks and templates built with React,
            Tailwind CSS, and Radix UI—designed to help you <span className="font-bold">stand out.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 w-full sm:w-auto">
            Get Access Now
          </button>
          <button className="border-2 border-black text-black px-6 py-3 rounded-lg font-bold hover:bg-black hover:text-white transition-all w-full sm:w-auto">
            Explore Components
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Premium Blocks Card */}
          <div className="bg-white border-3 border-black rounded-xl p-6 transform hover:rotate-1 transition-transform shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-black">Premium Blocks</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              50+ ready-to-use blocks to speed up your development.
            </p>
          </div>

          {/* Templates Card */}
          <div className="bg-white border-3 border-black rounded-xl p-6 transform hover:-rotate-1 transition-transform shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-black">Templates</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Complete websites that you can start building from.
            </p>
          </div>

          {/* Figma UI Kit Card */}
          <div className="bg-white border-3 border-black rounded-xl p-6 transform hover:rotate-1 transition-transform shadow-lg">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 0H8.5C7.12 0 6 1.12 6 2.5S7.12 5 8.5 5h7C16.88 5 18 3.88 18 2.5S16.88 0 15.5 0zM8.5 6C7.12 6 6 7.12 6 8.5S7.12 11 8.5 11h7c1.38 0 2.5-1.12 2.5-2.5S16.88 6 15.5 6H8.5zM8.5 12C7.12 12 6 13.12 6 14.5S7.12 17 8.5 17 11 15.88 11 14.5 9.88 12 8.5 12zM15.5 12c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-black">Figma UI Kit</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Creating a Neobrutalist design? Our Figma kit makes it easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero