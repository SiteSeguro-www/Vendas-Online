import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-ml-yellow/60 to-ml-bg pb-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-4">
        <div className="relative rounded w-full h-[180px] md:h-[280px] lg:h-[320px] bg-gray-200 overflow-hidden cursor-pointer shadow-sm">
             {/* Simulating a Banner Image */}
             <img 
                src="https://picsum.photos/1200/350?grayscale" 
                alt="Banner Principal" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase">Ofertas <br/> do Dia</h2>
                <p className="text-lg md:text-xl font-medium mb-6">Descontos de até 60%</p>
                <button className="bg-ml-blue text-white font-semibold py-3 px-6 rounded shadow-md w-max hover:bg-blue-600 transition-colors">
                    Confira Agora
                </button>
             </div>
             
             {/* Carousel Dots Simulator */}
             <div className="absolute bottom-4 right-4 flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-white"></div>
                 <div className="w-2 h-2 rounded-full bg-white/50"></div>
                 <div className="w-2 h-2 rounded-full bg-white/50"></div>
             </div>
        </div>
      </div>
      
      {/* Absolute overlay gradient to blend into body */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#ebebeb] to-transparent"></div>
    </div>
  );
};

export default Hero;