import { useState } from "react";
import { CartItem, Product } from "@/types/product";
import { products } from "@/data/products";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        cartItem => 
          cartItem.product.id === item.product.id &&
          cartItem.selectedColor.name === item.selectedColor.name &&
          cartItem.selectedSize.name === item.selectedSize.name
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }

      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBuyNow = (item: CartItem) => {
    handleAddToCart(item);
    setIsCheckoutOpen(true);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <HeroSection />
      
      {/* Products Section */}
      <section id="produtos" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Nossa Coleção
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Peças exclusivas desenvolvidas para acompanhar você em todos os momentos do seu treino
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Fique por dentro das novidades
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Seja a primeira a saber sobre lançamentos, promoções exclusivas e dicas de treino
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
            />
            <button className="gradient-primary text-white px-6 py-3 rounded-lg font-medium shadow-medium hover:shadow-strong transition-all">
              Inscrever-se
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="gradient-primary w-8 h-8 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">
                  FitGirl
                </h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Moda fitness feminina que une estilo, conforto e performance para mulheres que brilham dentro e fora da academia.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Tops e Sutiãs</li>
                <li>Leggings</li>
                <li>Shorts</li>
                <li>Jaquetas</li>
                <li>Conjuntos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Fale Conosco</li>
                <li>Trocas e Devoluções</li>
                <li>Guia de Tamanhos</li>
                <li>Entrega e Frete</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📧 contato@fitgirl.com.br</li>
                <li>📱 (85) 9828-4434</li>
                <li>📍 Pentecoste, CE</li>
                <li>🕒 Seg à Sex: 9h às 18h</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ATHENEA.FIT. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
      />
    </div>
  );
};

export default Index;