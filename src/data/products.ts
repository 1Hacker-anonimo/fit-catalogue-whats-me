import { Product } from "@/types/product";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/vanda.jpg";
import product8 from "@/assets/vanda2.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Macaquinho Fitness Feminino Poliamida sem Bolsos – Alta Compressão",
    description: 'Para quem busca estilo e conforto em um só look, o Macaquinho combina design moderno e funcionalidade. Criamos essa peça com modelagem ajustada e tecido tecnológico para oferecer máximo desempenho e versatilidade. Seu detalhe trançado nas costas adiciona um toque sofisticado e elegante, perfeito para compor produções cheias de personalidade.


---

ESPECIFICAÇÕES
✔️ Versátil: Idealpara atividades físicas.
✔️ Tecido Tecnológico: Alta elasticidade e conforto para um caimento perfeito.
✔️ Zero Transparência: Segurança total durante os treinos na academia.
✔️ Respirável e Leve: Mantém a pele fresca, mesmo em treinos intensos.

📌 Composição: 90% Poliamida, 10% Elastano
📌 Nível de Compressão: Médio – modela sem apertar
📌 Garantia: Contra defeitos de fabricação


---

CUIDADOS COM A PEÇA
🧼 Lavar à mão com sabão neutro
🌞 Secar à sombra para preservar a cor e a elasticidade
🚫 Não utilizar amaciante ou ferro de passar',
    price: 89.90,
    images: [ product8, product7 ],
    colors: [
      { name: "Rosa Vibrante", value: "#E91E63" },
      { name: "Roxo", value: "#9C27B0"},
      { name: "Preto", value: "#000000"},
      { name: "Coral", value: "#FF7043" }
    ],
    sizes: [
      { name: "PP", available: true },
      { name: "P", available: true },
      { name: "M", available: true },
      { name: "G", available: true },
      { name: "GG", available: false }
    ],
    category: "Tops"
  },
  {
    id: "2",
    name: "Legging Premium Gradient",
    description: "Legging de cintura alta com estampa gradient exclusiva. Tecido compressivo que modela o corpo e oferece máximo conforto.",
    price: 129.90,
    images: [product2, product2, product2],
    colors: [
      { name: "Gradient Roxo", value: "#673AB7" },
      { name: "Gradient Rosa", value: "#E91E63" },
      { name: "Gradient Azul", value: "#2196F3" }
    ],
    sizes: [
      { name: "PP", available: true },
      { name: "P", available: true },
      { name: "M", available: true },
      { name: "G", available: true },
      { name: "GG", available: true }
    ],
    category: "Leggings"
  },
  {
    id: "3",
    name: "Regata Fitness Coral",
    description: "Regata cropped em tecido dry-fit com proteção UV. Corte moderno e feminino para máxima liberdade de movimento.",
    price: 69.90,
    images: [product3, product3, product3],
    colors: [
      { name: "Coral", value: "#FF7043" },
      { name: "Rosa", value: "#E91E63" },
      { name: "Branco", value: "#FFFFFF" }
    ],
    sizes: [
      { name: "PP", available: true },
      { name: "P", available: true },
      { name: "M", available: false },
      { name: "G", available: true },
      { name: "GG", available: true }
    ],
    category: "Regatas"
  },
  {
    id: "4",
    name: "Short Fitness Lavanda",
    description: "Short de compressão em tecido premium com detalhes laterais. Perfeito para corrida e treinos funcionais.",
    price: 79.90,
    images: [product4, product4, product4],
    colors: [
      { name: "Lavanda", value: "#9C27B0" },
      { name: "Rosa", value: "#E91E63" },
      { name: "Preto", value: "#000000" }
    ],
    sizes: [
      { name: "PP", available: true },
      { name: "P", available: true },
      { name: "M", available: true },
      { name: "G", available: true },
      { name: "GG", available: false }
    ],
    category: "Shorts"
  },
  {
    id: "5",
    name: "Jaqueta Gradient Pro",
    description: "Jaqueta esportiva com zíper e capuz. Tecido resistente ao vento com forro interno macio e bolsos funcionais.",
    price: 189.90,
    images: [product5, product5, product5],
    colors: [
      { name: "Gradient Pink", value: "#E91E63" },
      { name: "Gradient Purple", value: "#9C27B0" },
      { name: "Gradient Blue", value: "#2196F3" }
    ],
    sizes: [
      { name: "PP", available: false },
      { name: "P", available: true },
      { name: "M", available: true },
      { name: "G", available: true },
      { name: "GG", available: true }
    ],
    category: "Jaquetas"
  },
  {
    id: "6",
    name: "Conjunto Fitness Complete",
    description: "Conjunto completo com top e legging coordenados. Design exclusivo com tecnologia de secagem rápida e proteção antimicrobiana.",
    price: 199.90,
    images: [product6, product6, product6],
    colors: [
      { name: "Rosa Intenso", value: "#E91E63" },
      { name: "Roxo Royal", value: "#673AB7" },
      { name: "Coral Sunset", value: "#FF5722" }
    ],
    sizes: [
      { name: "PP", available: true },
      { name: "P", available: true },
      { name: "M", available: true },
      { name: "G", available: false },
      { name: "GG", available: true }
    ],
    category: "Conjuntos"
  }
];
