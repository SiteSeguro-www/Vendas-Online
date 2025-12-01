import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import { Product } from './types';
import { searchProductsWithGemini } from './services/geminiService';
import { Loader2 } from 'lucide-react';

// Static Initial Data for "Home"
const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Smartphone Samsung Galaxy S23 Ultra 5G 256GB 12GB RAM',
        price: 5499.00,
        originalPrice: 8999.00,
        imageUrl: 'https://picsum.photos/300/300?random=1',
        freeShipping: true,
        fullDelivery: true,
        reviews: 120,
        discount: 38
    },
    {
        id: '2',
        title: 'Notebook Dell Inspiron 15 3000 Intel Core i5 8GB 256GB SSD',
        price: 3299.00,
        originalPrice: 4199.00,
        imageUrl: 'https://picsum.photos/300/300?random=2',
        freeShipping: true,
        fullDelivery: false,
        reviews: 85,
        discount: 21
    },
    {
        id: '3',
        title: 'Smart TV 50" 4K LED Crystal UHD Samsung',
        price: 2399.00,
        originalPrice: 3199.00,
        imageUrl: 'https://picsum.photos/300/300?random=3',
        freeShipping: true,
        fullDelivery: true,
        reviews: 450,
        discount: 25
    },
    {
        id: '4',
        title: 'Fone de Ouvido Bluetooth JBL Tune 510BT Pure Bass',
        price: 249.00,
        originalPrice: 299.00,
        imageUrl: 'https://picsum.photos/300/300?random=4',
        freeShipping: false,
        fullDelivery: true,
        reviews: 1200,
        discount: 16
    },
    {
        id: '5',
        title: 'Console PlayStation 5 + God of War Ragnarök',
        price: 3999.00,
        originalPrice: 4499.90,
        imageUrl: 'https://picsum.photos/300/300?random=5',
        freeShipping: true,
        fullDelivery: true,
        reviews: 900,
        discount: 11
    }
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    // Scroll to products if on mobile or low height
    const el = document.getElementById('products-anchor');
    if(el) el.scrollIntoView({ behavior: 'smooth' });

    const results = await searchProductsWithGemini(query);
    setProducts(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow pb-12">
        {/* Only show Hero on initial state or if explicitly navigating home (which resets query) */}
        {!searchQuery && <Hero />}

        <div className="max-w-[1200px] mx-auto px-4 lg:px-0 mt-8" id="products-anchor">
            
            {/* Section Title */}
            <div className="mb-6 flex items-baseline gap-4">
                <h2 className="text-2xl text-gray-700 font-light">
                    {loading ? 'Buscando...' : searchQuery ? `Resultados para "${searchQuery}"` : 'Baseado na sua última visita'}
                </h2>
                {!loading && !searchQuery && (
                    <a href="#" className="text-ml-blue text-sm hover:underline">Ver histórico</a>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="w-full flex flex-col items-center justify-center py-20 text-gray-400">
                    <Loader2 className="animate-spin mb-4 text-ml-blue" size={48} />
                    <p>Encontrando as melhores ofertas...</p>
                </div>
            )}

            {/* Product Grid */}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="h-[420px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}

            {!loading && products.length === 0 && (
                 <div className="bg-white p-12 rounded shadow-sm text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Não encontramos produtos.</h3>
                    <p className="text-gray-500">Verifique a ortografia ou use termos mais genéricos.</p>
                 </div>
            )}
        </div>
      </main>

      {/* Footer Simulation */}
      <footer className="bg-white border-t border-gray-200 py-8 text-xs text-gray-500">
         <div className="max-w-[1200px] mx-auto px-4 text-center">
            <p className="mb-2">Copyright © 1999-2024 Ebazar.com.br LTDA.</p>
            <p>CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.</p>
         </div>
      </footer>
    </div>
  );
};

export default App;