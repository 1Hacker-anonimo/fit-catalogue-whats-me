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
              <h4 className="font-semibold mb-3 text-foreground">Selecione as cores desejadas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColors.some(c => c.name === color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColorSelection(color)}
                      className={`flex items-center justify-start space-x-3 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[60px] ${
                        isSelected 
                          ? 'border-primary shadow-medium bg-primary/10 ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md relative flex-shrink-0"
                        style={{ backgroundColor: color.value }}
                      >
                        {isSelected && (
                          <Check className="h-5 w-5 text-white absolute inset-0 m-auto drop-shadow-sm" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">{color.name}</span>
                    </button>
                  );
                })}
              </div>
              {selectedColors.length > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    ✓ {selectedColors.length} cor(es) selecionada(s): {selectedColors.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* Tamanhos */}
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Selecione os tamanhos:</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSizes.some(s => s.name === size.name);
                    return (
                      <Button
                        key={size.name}
                        variant="outline"
                        disabled={!size.available}
                        onClick={() => toggleSizeSelection(size)}
                        className={`relative h-12 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                          isSelected 
                            ? '!bg-primary !text-primary-foreground !border-primary shadow-medium ring-2 ring-primary/20' 
                            : 'hover:border-primary/50 hover:bg-primary/5'
                        } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {size.name}
                        {isSelected && (
                          <Check className="h-4 w-4 absolute top-1 right-1" />
                        )}
                      </Button>
                    );
                  })}
                </div>
                
                {/* Associações Tamanho-Cor */}
                {selectedSizes.length > 0 && (
                  <div className="space-y-3 mt-6 p-4 rounded-xl bg-muted/30 border border-border">
                    <h5 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Escolha a cor para cada tamanho:
                    </h5>
                    <div className="space-y-3">
                      {selectedSizes.map((size) => (
                        <div key={size.name} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-background border border-border">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">
                                {size.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              Tamanho {size.name}
                            </span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {selectedColors.length > 0 ? (
                              <Select
                                value={sizeColorAssociations[size.name]?.name || ""}
                                onValueChange={(colorName) => handleSizeColorAssociation(size.name, colorName)}
                              >
                                <SelectTrigger className="w-full h-10 border-2 hover:border-primary/50 focus:border-primary transition-colors">
                                  <SelectValue placeholder="👆 Clique para escolher uma cor" />
                                </SelectTrigger>
                                <SelectContent className="z-50 max-h-60 overflow-y-auto">
                                  {selectedColors.map((color) => (
                                    <SelectItem 
                                      key={color.name} 
                                      value={color.name}
                                      className="cursor-pointer hover:bg-primary/5 focus:bg-primary/10"
                                    >
                                      <div className="flex items-center gap-3 py-1">
                                        <div 
                                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                                          style={{ backgroundColor: color.value }}
                                        />
                                        <span className="font-medium">{color.name}</span>
                                        {sizeColorAssociations[size.name]?.name === color.name && (
                                          <Check className="h-4 w-4 text-primary ml-auto" />
                                        )}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center justify-center h-10 px-3 rounded-md border-2 border-dashed border-muted-foreground/30 bg-muted/20">
                                <span className="text-sm text-muted-foreground italic">
                                  ⚠️ Selecione cores primeiro
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Status das associações */}
                    <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h6 className="text-sm font-semibold text-primary mb-2">Status das seleções:</h6>
                      <div className="space-y-1">
                        {selectedSizes.map((size) => {
                          const associatedColor = sizeColorAssociations[size.name];
                          return (
                            <div key={size.name} className="flex items-center justify-between text-sm">
                              <span className="font-medium">Tamanho {size.name}:</span>
                              {associatedColor ? (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                                    style={{ backgroundColor: associatedColor.value }}
                                  />
                                  <span className="text-primary font-medium">{associatedColor.name}</span>
                                  <Check className="h-3 w-3 text-green-500" />
                                </div>
                              ) : (
                                <span className="text-muted-foreground italic">Não selecionada</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
