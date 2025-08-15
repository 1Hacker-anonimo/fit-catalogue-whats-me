import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/30 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 gradient-secondary rounded-full animate-pulse-slow"></div>
      
      <div className="container px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">Nova Coleção 2024</span>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Moda Fitness
            <br />
            <span className="text-4xl md:text-6xl">que Inspira</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra a coleção que une estilo, conforto e performance. 
            Roupas pensadas para mulheres que não param de brilhar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white shadow-medium hover:shadow-strong transition-all px-8 py-6 text-lg group"
            >
              Ver Produtos
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              Sobre a Marca
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="gradient-primary w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                ✓
              </div>
              <h3 className="font-semibold mb-2">Frete Grátis</h3>
              <p className="text-muted-foreground text-sm">Acima de R$ 150</p>
            </div>
            
            <div className="text-center">
              <div className="gradient-primary w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                ↺
              </div>
              <h3 className="font-semibold mb-2">Troca Grátis</h3>
              <p className="text-muted-foreground text-sm">2 horas para trocar</p>
            </div>
            
            <div className="text-center">
              <div className="gradient-primary w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                ♡
              </div>
              <h3 className="font-semibold mb-2">Satisfação</h3>
              <p className="text-muted-foreground text-sm">100% garantida</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;