import React from 'react';
import { Product } from '../types';
import { Zap, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const installments = Math.min(10, Math.floor(product.price / 50)) || 1;
  const installmentValue = product.price / installments;

  return (
    <div className="bg-white rounded shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col h-full group relative">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow-sm text-ml-blue hover:bg-blue-50">
          <Heart size={20} />
      </div>
      
      <div className="h-[224px] w-full border-b border-gray-50 flex items-center justify-center p-4 relative">
        <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain mx-auto mix-blend-multiply"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-800 text-sm font-light leading-snug line-clamp-2 mb-2 group-hover:text-ml-blue transition-colors">
            {product.title}
        </h3>

        {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through decoration-gray-400">
                {formatCurrency(product.originalPrice)}
            </span>
        )}

        <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl text-gray-900 font-normal">
                {formatCurrency(product.price)}
            </span>
            {product.discount && (
                <span className="text-ml-green text-sm font-medium">
                    {product.discount}% OFF
                </span>
            )}
        </div>

        <div className="text-sm text-ml-green font-medium mb-1">
             em {installments}x {formatCurrency(installmentValue)} sem juros
        </div>

        {product.fullDelivery && (
             <div className="text-xs text-ml-green font-bold italic flex items-center gap-1 mt-1">
                Chega grátis amanhã <Zap size={12} fill="currentColor" />
             </div>
        )}
        
        {!product.fullDelivery && product.freeShipping && (
            <div className="text-xs text-ml-green font-semibold mt-1">
                Frete grátis
            </div>
        )}
        
        <div className="text-xs text-gray-400 mt-auto pt-2 hidden group-hover:block">
            Vendido por MercadoLivre
        </div>
      </div>
    </div>
  );
};

export default ProductCard;