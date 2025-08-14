import { useState } from "react";
import { CartItem, CheckoutData } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, CreditCard, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

const Checkout = ({ isOpen, onClose, items }: CheckoutProps) => {
  const [formData, setFormData] = useState<CheckoutData>({
    name: "",
    address: "",
    number: "",
    neighborhood: "",
    cep: "",
    city: "",
    state: "",
    phone: "",
    whatsapp: "",
    isStore: false
  });

  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total >= 150 ? 0 : 15;
  const finalTotal = total + shipping;

  const handleInputChange = (field: keyof CheckoutData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `• ${item.product.name} - ${item.selectedColor.name} - ${item.selectedSize.name} (${item.quantity}x) - R$ ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    return `🛍️ *NOVO PEDIDO - FitGirl* 🛍️

📋 *PRODUTOS:*
${itemsList}

💰 *RESUMO:*
Subtotal: R$ ${total.toFixed(2)}
Frete: ${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
*Total: R$ ${finalTotal.toFixed(2)}*

👤 *DADOS DO CLIENTE:*
Nome: ${formData.name}
Telefone: ${formData.phone}
WhatsApp: ${formData.whatsapp}

📍 *ENDEREÇO DE ENTREGA:*
${formData.address}, ${formData.number}
Bairro: ${formData.neighborhood}
CEP: ${formData.cep}
${formData.city} - ${formData.state}
${formData.isStore ? '🏪 Entrega em loja' : '🏠 Entrega residencial'}

Obrigada pelo seu pedido! 💕`;
  };

  const handleWhatsAppSubmit = () => {
    // Validação básica
    const requiredFields = ['name', 'address', 'number', 'neighborhood', 'cep', 'city', 'state', 'phone', 'whatsapp'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof CheckoutData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const message = formatWhatsAppMessage();
    const whatsappNumber = "558598284434"; // Substitua pelo seu número
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será direcionado para finalizar o pedido no WhatsApp",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Finalizar Compra
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Dados Pessoais
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        placeholder="(11) 9999-9999"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        placeholder="(11) 9999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Endereço de Entrega
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        placeholder="Rua, avenida..."
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      placeholder="Nome do bairro"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        placeholder="São Paulo"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isStore"
                      checked={formData.isStore}
                      onCheckedChange={(checked) => handleInputChange('isStore', checked as boolean)}
                    />
                    <Label htmlFor="isStore" className="text-sm">
                      Este endereço é de uma loja/estabelecimento comercial
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor.name} • {item.selectedSize.name} • Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-white">
                      R$ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-green-800">Finalização via WhatsApp</h3>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Ao clicar no botão abaixo, você será direcionado para o WhatsApp com todos os dados do pedido preenchidos. Nossa equipe entrará em contato para confirmar e processar seu pedido.
                </p>
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento seguro • Entrega garantida • Suporte 24h</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full gradient-primary text-white shadow-medium hover:shadow-strong transition-all py-6 text-lg"
              onClick={handleWhatsAppSubmit}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Finalizar no WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
