import { useState } from "react";
import { Product, Color, Size, CartItem } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Minus, Plus, ShoppingBag, Heart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione cor e tamanho",
        variant: "destructive"
      });
      return;
    }

    onAddToCart({
      product,
      selectedColor,
      selectedSize,
      quantity
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full  object-contain rounded-lg shadow-medium"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-primary shadow-medium' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div className="space-y-6">
            <div>
              <Badge className="gradient-primary text-white mb-3">
                {product.category}
              </Badge>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(127 avaliações)</span>
              </div>
              
              <div className="text-foreground font-bold text-3xl mb-4">
                R$ {product.price.toFixed(2)}
              </div>
              
              <div className="text-muted-foreground mb-4 leading-relaxed space-y-2">
                {product.description.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div>
              <h4 className="font-semibold mb-3">Cores disponíveis:</h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      selectedColor?.name === color.name 
                        ? 'border-primary shadow-medium bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div>
              <h4 className="font-semibold mb-3">Tamanhos:</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
  <Button
    key={size.name}
    variant="outline"
    disabled={!size.available}
    onClick={() => setSelectedSize(size)}
    className={`${
      selectedSize?.name === size.name 
        ? '!bg-white !text-black !border-gray-300 shadow-sm' 
        : ''
    } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {size.name}
  </Button>
))}
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <h4 className="font-semibold mb-3">Quantidade:</h4>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button 
                className="w-full gradient-primary text-white shadow-medium hover:shadow-strong transition-all"
                onClick={handleBuyNow}
                disabled={!selectedColor || !selectedSize}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Comprar Agora
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
              >
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Informações Adicionais */}
            <Card className="p-4 bg-muted/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Frete grátis</span>
                  <span className="text-primary font-medium">Acima de R$ 150</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span className="text-primary font-medium">5-7 dias úteis</span>
                </div>
                <div className="flex justify-between">
                  <span>Troca grátis</span>
                  <span className="text-primary font-medium">30 dias</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
