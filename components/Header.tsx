import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <header className="bg-ml-yellow shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 pb-2 pt-2">
        <div className="flex items-center gap-4 py-2">
            {/* Logo Placeholder */}
            <a href="#" onClick={() => window.location.reload()} className="flex-shrink-0 cursor-pointer">
                <div className="font-extrabold text-[#2d3277] text-2xl tracking-tighter leading-none">
                    mercadoclone
                </div>
            </a>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="flex-grow flex relative shadow-sm rounded bg-white h-10">
                <input 
                    type="text" 
                    className="flex-grow px-4 rounded-l text-ml-gray outline-none placeholder-gray-300 text-[15px]"
                    placeholder="Buscar produtos, marcas e muito mais..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="px-3 border-l border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700">
                    <Search size={20} />
                </button>
            </form>

            {/* Promo Header Right (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
               <img src="https://picsum.photos/300/40" alt="Promo" className="h-[39px] rounded shadow-sm object-cover w-[340px]" />
            </div>
            
            {/* Mobile Menu Icon */}
            <div className="lg:hidden text-ml-gray">
                <Menu />
            </div>
        </div>

        {/* Sub-header Navigation */}
        <div className="hidden lg:flex justify-between items-center text-[13px] text-ml-gray/80 pb-1">
            <div className="flex items-center gap-1 hover:border hover:border-gray-300/50 p-1 rounded cursor-pointer transition-colors">
                <MapPin size={18} className="text-gray-600" />
                <div className="flex flex-col leading-tight">
                    <span className="text-[11px] text-gray-500">Enviar para</span>
                    <span className="text-[13px] text-gray-800 font-medium">Capital, São Paulo</span>
                </div>
            </div>

            <nav className="flex items-center gap-5 font-normal text-ml-gray/90">
                <div className="flex items-center gap-1 cursor-pointer hover:text-ml-blue transition-colors">
                    Categorias <ChevronDown size={12} />
                </div>
                <a href="#" className="hover:text-ml-blue transition-colors">Ofertas</a>
                <a href="#" className="hover:text-ml-blue transition-colors">Histórico</a>
                <a href="#" className="hover:text-ml-blue transition-colors">Supermercado</a>
                <a href="#" className="hover:text-ml-blue transition-colors">Moda</a>
                <a href="#" className="hover:text-ml-blue transition-colors">Vender</a>
                <a href="#" className="hover:text-ml-blue transition-colors">Contato</a>
            </nav>

            <div className="flex items-center gap-4 font-medium text-ml-gray">
                 <a href="#" className="hover:text-ml-blue transition-colors">Crie a sua conta</a>
                 <a href="#" className="hover:text-ml-blue transition-colors">Entre</a>
                 <a href="#" className="hover:text-ml-blue transition-colors">Compras</a>
                 <a href="#" className="hover:text-ml-blue transition-colors"><ShoppingCart size={20} /></a>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;