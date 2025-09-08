import { useState, useEffect } from "react";
import { Product, Color, Size, CartItem } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, ShoppingBag, Heart, Star, ChevronDown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart, onBuyNow }: ProductModalProps) => {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [sizeColorAssociations, setSizeColorAssociations] = useState<Record<string, Color>>({});
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedColors([]);
      setSelectedSizes([]);
      setSizeColorAssociations({});
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!product) return null;

  const toggleColorSelection = (color: Color) => {
    setSelectedColors(prev => {
      const isSelected = prev.some(c => c.name === color.name);
      if (isSelected) {
        // Remove color and clear any size associations with this color
        setSizeColorAssociations(prevAssoc => {
          const newAssoc = { ...prevAssoc };
          Object.keys(newAssoc).forEach(sizeName => {
            if (newAssoc[sizeName].name === color.name) {
              delete newAssoc[sizeName];
            }
          });
          return newAssoc;
        });
        return prev.filter(c => c.name !== color.name);
      } else {
        return [...prev, color];
      }
    });
  };

  const toggleSizeSelection = (size: Size) => {
    setSelectedSizes(prev => {
      const isSelected = prev.some(s => s.name === size.name);
      if (isSelected) {
        // Remove size and its color association
        setSizeColorAssociations(prevAssoc => {
          const newAssoc = { ...prevAssoc };
          delete newAssoc[size.name];
          return newAssoc;
        });
        return prev.filter(s => s.name !== size.name);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleSizeColorAssociation = (sizeName: string, colorName: string) => {
    const color = selectedColors.find(c => c.name === colorName);
    if (color) {
      setSizeColorAssociations(prev => ({
        ...prev,
        [sizeName]: color
      }));
    }
  };

  const canAddToCart = () => {
    return selectedSizes.length > 0 && 
           selectedSizes.every(size => sizeColorAssociations[size.name]);
  };

  const handleAddToCart = () => {
    if (!canAddToCart()) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione tamanhos e cores para cada tamanho",
        variant: "destructive"
      });
      return;
    }

    // For now, we'll add the first size-color combination
    // In a more complex version, we could add multiple items
    const firstSize = selectedSizes[0];
    const associatedColor = sizeColorAssociations[firstSize.name];

    onAddToCart({
      product,
      selectedColor: associatedColor,
      selectedSize: firstSize,
      quantity
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const handleBuyNow = () => {
    if (!canAddToCart()) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione tamanhos e cores para cada tamanho",
        variant: "destructive"
      });
      return;
    }

    // For now, we'll use the first size-color combination
    const firstSize = selectedSizes[0];
    const associatedColor = sizeColorAssociations[firstSize.name];

    const cartItem = {
      product,
      selectedColor: associatedColor,
      selectedSize: firstSize,
      quantity
    };

    onBuyNow(cartItem);
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
              <h4 className="font-semibold mb-3">Selecione as cores desejadas:</h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColors.some(c => c.name === color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColorSelection(color)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'border-primary shadow-medium bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-white shadow-sm relative"
                        style={{ backgroundColor: color.value }}
                      >
                        {isSelected && (
                          <Check className="h-4 w-4 text-white absolute inset-0 m-auto" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{color.name}</span>
                    </button>
                  );
                })}
              </div>
              {selectedColors.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedColors.length} cor(es) selecionada(s)
                </p>
              )}
            </div>

            {/* Tamanhos */}
            <div>
              <h4 className="font-semibold mb-3">Selecione os tamanhos:</h4>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSizes.some(s => s.name === size.name);
                    return (
                      <Button
                        key={size.name}
                        variant="outline"
                        disabled={!size.available}
                        onClick={() => toggleSizeSelection(size)}
                        className={`${
                          isSelected 
                            ? '!bg-primary !text-primary-foreground !border-primary shadow-sm' 
                            : ''
                        } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {size.name}
                      </Button>
                    );
                  })}
                </div>
                
                {/* Associações Tamanho-Cor */}
                {selectedSizes.length > 0 && (
                  <div className="space-y-3 mt-4 p-4 rounded-lg bg-muted/30">
                    <h5 className="font-medium text-sm">Escolha a cor para cada tamanho:</h5>
                    {selectedSizes.map((size) => (
                      <div key={size.name} className="flex items-center gap-3">
                        <span className="min-w-[3rem] text-sm font-medium">
                          Tamanho {size.name}:
                        </span>
                        {selectedColors.length > 0 ? (
                          <Select
                            value={sizeColorAssociations[size.name]?.name || ""}
                            onValueChange={(colorName) => handleSizeColorAssociation(size.name, colorName)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Escolha uma cor" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedColors.map((color) => (
                                <SelectItem key={color.name} value={color.name}>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-4 h-4 rounded-full border border-gray-300"
                                      style={{ backgroundColor: color.value }}
                                    />
                                    {color.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-sm text-muted-foreground italic">
                            Selecione cores primeiro
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                disabled={!canAddToCart()}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Comprar Agora
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!canAddToCart()}
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
