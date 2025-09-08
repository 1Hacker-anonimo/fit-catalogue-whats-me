import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="group cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden bg-white rounded-t-lg">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
          onClick={() => onProductClick(product)}
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`} 
          />
        </Button>

        <Badge className="absolute top-3 left-3 gradient-primary text-white">
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4" onClick={() => onProductClick(product)}>
        <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <span className="text-foreground font-bold text-lg">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="flex flex-col gap-2">

          
  <Button
    size="sm"
    className="flex-1 bg-white text-black hover:bg-gray-200 font-medium flex items-center gap-2"
    onClick={() => {
      const newItem: CartItem = {
        product: product, // produto atual
        quantity: 1,
        selectedColor: product.colors[0],
        selectedSize: product.sizes[0],
      };

      // Verifica se já existe no carrinho
      const index = cartItems.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedColor.name === newItem.selectedColor.name &&
          item.selectedSize.name === newItem.selectedSize.name
      );

      if (index >= 0) {
        const updated = [...cartItems];
        updated[index].quantity += 1;
        setCartItems(updated);
      } else {
        setCartItems([...cartItems, newItem]);
      }

      // Redireciona visualmente para o carrinho
      setCartOpen(true);
    }}
  >
    <ShoppingBag className="h-4 w-4" />
    Adicionar ao Carrinho
  </Button>

  <Button
    size="sm"
    className="flex-1 bg-white text-black hover:bg-gray-200 font-medium"
    // Continua do jeito que estava
  >
    Comprar Agora
  </Button>
</div>
        
        <div className="flex mt-3 space-x-1">
          {product.colors.slice(0, 3).map((color, index) => (
            <div 
              key={index}
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color.value }}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground ml-2">
              +{product.colors.length - 3} cores
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
