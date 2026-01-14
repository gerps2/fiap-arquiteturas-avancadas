# 🛒 CartXpress

> Mini e-commerce moderno construído com React 19, TypeScript, Clean Architecture e MVVM

## 📚 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Funciona](#-como-funciona)
- [Tecnologias](#-tecnologias)
- [Como Executar](#-como-executar)

---

## 🎯 Visão Geral

CartXpress é um e-commerce didático que demonstra a aplicação de **padrões arquiteturais modernos** em uma aplicação React real. O projeto implementa:

- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **MVVM Pattern** - ViewModels gerenciam estado e lógica de apresentação
- ✅ **Feature-Based Structure** - Organização por funcionalidade
- ✅ **Atomic Design** - Componentes reutilizáveis e escaláveis

### Funcionalidades

- 📦 Catálogo de produtos
- 🛒 Carrinho de compras com persistência
- 💱 Conversão de moeda (BRL → USD)
- 📍 Busca de endereço por CEP (ViaCEP)
- ✅ Checkout com validação
- 🎉 Página de sucesso

---

## 🏗️ Arquitetura

### 1️⃣ Clean Architecture

A Clean Architecture garante que o **domínio** (regras de negócio) seja independente de frameworks, UI e infraestrutura.

```
┌─────────────────────────────────────────┐
│           UI (React Components)         │  ← Camada de Apresentação
├─────────────────────────────────────────┤
│         ViewModels (MVVM)               │  ← Gerencia estado e lógica de UI
├─────────────────────────────────────────┤
│         Use Cases (Casos de Uso)        │  ← Regras de negócio da aplicação
├─────────────────────────────────────────┤
│    Domain (Entities + Contracts)        │  ← Regras de negócio puras
├─────────────────────────────────────────┤
│  Infrastructure (APIs, LocalStorage)    │  ← Detalhes de implementação
└─────────────────────────────────────────┘
```

**Princípio fundamental:** As camadas internas **não conhecem** as camadas externas. O domínio não sabe que existe React, Axios ou LocalStorage.

**Inversão de Dependência:** As interfaces (contratos) ficam no **domínio**, não na infraestrutura. Isso garante que:
- ✅ Use Cases dependem de **abstrações** (interfaces), não de implementações concretas
- ✅ Infraestrutura **implementa** as interfaces do domínio
- ✅ Fácil trocar implementações (LocalStorage → API) sem alterar regras de negócio

---

### 2️⃣ MVVM (Model-View-ViewModel)

O padrão MVVM separa a lógica de apresentação da UI.

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     View     │ ◄─────► │  ViewModel   │ ◄─────► │    Model     │
│  (React UI)  │         │ (Hook State) │         │ (Use Cases)  │
└──────────────┘         └──────────────┘         └──────────────┘
```

**Exemplo prático:**

```typescript
// ViewModel (useCartViewModel.ts)
export function useCartViewModel() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ViewModel chama Use Cases (Model)
  const addToCart = async (productId: string) => {
    setIsLoading(true);
    await container.useCases.addToCart.execute(productId, 1);
    await loadCart(); // Atualiza estado
    setIsLoading(false);
  };

  return { items, isLoading, addToCart };
}

// View (CartPage.tsx)
export function CartPage() {
  const { items, addToCart } = useCartViewModel(); // Consome ViewModel
  return <div>{items.map(item => <CartItem {...item} />)}</div>;
}
```

**Benefícios:**
- ✅ View não conhece lógica de negócio
- ✅ ViewModel é testável sem UI
- ✅ Reuso de lógica entre componentes

---

### 3️⃣ Feature-Based Structure

Organização por **funcionalidade** ao invés de tipo de arquivo.

```
src/features/
├── cart/              ← Tudo relacionado ao carrinho
│   ├── usecases/      ← Lógica de negócio do carrinho
│   ├── viewmodel/     ← Estado e lógica de apresentação
│   └── ui/            ← Componentes visuais
├── checkout/          ← Tudo relacionado ao checkout
│   ├── usecases/
│   ├── viewmodel/
│   ├── schemas/       ← Validação com Zod
│   └── ui/
└── products/          ← Tudo relacionado aos produtos
    ├── viewmodel/
    └── ui/
```

**Vantagens:**
- ✅ Fácil encontrar código relacionado
- ✅ Possível extrair uma feature inteira para outro projeto
- ✅ Equipes podem trabalhar em features isoladas

---

### 4️⃣ Atomic Design (Conceitual)

Embora não tenhamos pastas separadas por nível atômico, **aplicamos os princípios do Atomic Design** na composição dos componentes:

```
src/
├── shared/ui/components/        ← Componentes reutilizáveis (Atoms/Molecules)
│   ├── PageHeader.tsx           ← Molecule (título + subtítulo)
│   ├── EmptyState.tsx           ← Molecule (ícone + texto + ação)
│   ├── ErrorState.tsx           ← Molecule (ícone + mensagem)
│   └── LoadingState.tsx         ← Atom (spinner)
│
├── app/layout/                  ← Organisms (estruturas complexas)
│   ├── Header.tsx               ← Organism (logo + nav + badge)
│   ├── Footer.tsx               ← Organism (copyright)
│   └── AppShell.tsx             ← Template (Header + Content + Footer)
│
└── features/*/ui/components/    ← Molecules específicas de cada feature
    ├── ProductCard.tsx          ← Molecule (imagem + título + preço + botão)
    ├── CartItemRow.tsx          ← Molecule (produto + quantidade + ações)
    └── CheckoutForm.tsx         ← Organism (múltiplos inputs + validação)
```

**Hierarquia de Composição:**

```typescript
// Atoms (elementos básicos do Tailwind/Lucide)
<button className="...">Adicionar</button>
<ShoppingCart className="w-5 h-5" />

// Molecules (combinação de atoms)
<ProductCard>              ← Combina: img, h3, p, span, button
  <img />
  <h3>Nome</h3>
  <p>Descrição</p>
  <span>Preço</span>
  <button>Adicionar</button>
</ProductCard>

// Organisms (combinação de molecules)
<ProductGrid>              ← Combina múltiplos ProductCards
  <ProductCard />
  <ProductCard />
  <ProductCard />
</ProductGrid>

// Templates (layout completo)
<ProductsPage>             ← Combina organisms + molecules
  <PageHeader />           ← Molecule
  <ProductGrid />          ← Organism
</ProductsPage>

// Pages (template + dados)
<AppShell>                 ← Template principal
  <Header />               ← Organism
  <ProductsPage />         ← Template de conteúdo
  <Footer />               ← Organism
</AppShell>
```

**Princípios Aplicados:**
- ✅ **Reutilização** - Componentes compartilhados em `shared/ui/components`
- ✅ **Composição** - Componentes complexos construídos a partir de simples
- ✅ **Isolamento** - Cada componente tem responsabilidade única
- ✅ **Escalabilidade** - Fácil adicionar novos componentes seguindo o padrão

---

## 📁 Estrutura do Projeto

```
cartxpress/
├── src/
│   ├── app/                      ← Configuração da aplicação
│   │   ├── di/                   ← Dependency Injection (Container)
│   │   │   ├── container.ts      ← Define dependências
│   │   │   └── composition.ts    ← Instancia e conecta tudo
│   │   ├── layout/               ← Layout global (Header, Footer)
│   │   ├── providers/            ← Providers React (Toaster)
│   │   └── router/               ← Rotas da aplicação
│   │
│   ├── features/                 ← Funcionalidades (Feature-Based)
│   │   ├── cart/
│   │   │   ├── usecases/         ← AddToCart, RemoveFromCart, etc.
│   │   │   ├── viewmodel/        ← useCartViewModel (MVVM)
│   │   │   └── ui/               ← CartPage, CartItemRow, etc.
│   │   ├── checkout/
│   │   │   ├── usecases/         ← Checkout, LookupCep
│   │   │   ├── viewmodel/        ← useCheckoutViewModel
│   │   │   ├── schemas/          ← Validação Zod
│   │   │   └── ui/               ← CheckoutPage, CheckoutForm
│   │   ├── products/
│   │   │   ├── viewmodel/        ← useProductsViewModel
│   │   │   └── ui/               ← ProductsPage, ProductCard
│   │   └── success/
│   │       └── ui/               ← SuccessPage
│   │
│   └── shared/                   ← Código compartilhado
│       ├── domain/               ← DOMÍNIO (Camada mais interna)
│       │   ├── entities/         ← Product, CartItem, Order
│       │   ├── errors/           ← ProductNotFoundError, etc.
│       │   ├── repositories/     ← Interfaces de repositórios
│       │   └── providers/        ← Interfaces de providers externos
│       ├── infra/                ← INFRAESTRUTURA (Implementações)
│       │   ├── repositories/     ← LocalStorage com decorator
│       │   ├── providers/        ← ViaCEP, AwesomeAPI (Axios)
│       │   └── http/             ← Cliente HTTP (Axios)
│       ├── ui/                   ← Componentes compartilhados
│       │   └── components/       ← PageHeader, EmptyState, etc.
│       ├── usecases/             ← Use Cases compartilhados
│       │   └── exchange/         ← GetUsdBrlRate
│       └── utils/                ← Helpers (formatação, máscaras)
│
├── tailwind.config.js            ← Configuração Tailwind CSS
├── postcss.config.js             ← PostCSS + Tailwind
└── package.json                  ← Dependências
```

---

## 🔄 Como Funciona

### Fluxo: Adicionar Produto ao Carrinho

Vamos seguir o fluxo completo de quando o usuário clica em "Adicionar ao Carrinho":

```
1. USER CLICK
   ↓
2. ProductCard.tsx (View)
   onClick={() => onAddToCart(product.id)}
   ↓
3. useProductsViewModel.ts (ViewModel)
   const addToCart = async (productId: string) => {
     setIsLoading(true);
     await container.useCases.addToCart.execute(productId, 1);
     toast.success('Produto adicionado!');
     setIsLoading(false);
   }
   ↓
4. AddToCart.usecase.ts (Use Case - Regra de Negócio)
   async execute(productId: string, quantity: number) {
     // Valida quantidade
     if (quantity <= 0) throw new InvalidQuantityError();
     
     // Busca produto
     const product = await this.productRepository.getById(productId);
     if (!product) throw new ProductNotFoundError(productId);
     
     // Busca carrinho atual
     const items = await this.cartRepository.get();
     
     // Adiciona ou incrementa
     const existingIndex = items.findIndex(i => i.product.id === productId);
     if (existingIndex >= 0) {
       items[existingIndex].quantity += quantity;
     } else {
       items.push({ product, quantity });
     }
     
     // Salva carrinho
     await this.cartRepository.save(items);
   }
   ↓
5. LocalStorageCartRepository.ts (Infrastructure)
   async save(items: CartItem[]) {
     localStorage.setItem('cart', JSON.stringify(items));
   }
```

**Observe:**
- ✅ **View** só sabe chamar `onAddToCart` - não conhece localStorage
- ✅ **ViewModel** gerencia estado e chama Use Case - não conhece regras de negócio
- ✅ **Use Case** contém toda a lógica - não conhece React ou localStorage
- ✅ **Repository** implementa persistência - pode trocar para API sem mudar Use Case

---

### Dependency Injection (DI)

O **Container** conecta todas as peças:

```typescript
// container.ts - Define o que a aplicação precisa
// IMPORTANTE: Interfaces vêm do DOMÍNIO, não da infra
import type { ProductRepository } from '../../shared/domain/repositories/ProductRepository';
import type { CartRepository } from '../../shared/domain/repositories/CartRepository';
import type { CepLookupProvider } from '../../shared/domain/providers/CepLookupProvider';
import type { ExchangeRateProvider } from '../../shared/domain/providers/ExchangeRateProvider';

export interface AppContainer {
  repositories: {
    productRepository: ProductRepository;      // ← Interface do domínio
    cartRepository: CartRepository;            // ← Interface do domínio
  };
  providers: {
    cepLookup: CepLookupProvider;              // ← Interface do domínio
    exchangeRate: ExchangeRateProvider;        // ← Interface do domínio
  };
  useCases: {
    addToCart: AddToCartUseCase;
    getUsdBrlRate: GetUsdBrlRateUseCase;
    // ... outros use cases
  };
}

// composition.ts - Cria e conecta tudo
export function initializeContainer() {
  // 1. Cria repositórios (implementações concretas da infra)
  const productRepo = new InMemoryProductRepository();
  const cartRepo = new LocalStorageDecorator(
    new InMemoryCartRepository()
  );

  // 2. Cria providers (implementações concretas da infra)
  const cepLookup = new ViaCepLookupProvider();
  const exchangeRate = new AwesomeApiExchangeRateProvider();

  // 3. Cria use cases injetando dependências
  // Use Cases recebem INTERFACES, não implementações
  const addToCart = new AddToCartUseCase(productRepo, cartRepo);
  const getUsdBrlRate = new GetUsdBrlRateUseCase(exchangeRate);

  // 4. Retorna container montado
  return { repositories, providers, useCases };
}
```

**Benefícios:**
- ✅ Fácil trocar implementações (mock para testes)
- ✅ Dependências explícitas
- ✅ Testabilidade

---

## 🛠️ Tecnologias

### Core
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool

### Styling
- **Tailwind CSS v3** - Utility-First CSS
- **Lucide React** - Ícones modernos

### State & Routing
- **React Router v6** - Navegação
- **Custom Hooks** - State Management (MVVM)

### Validation & Notifications
- **Zod** - Schema Validation
- **Sonner** - Toast Notifications

### External APIs
- **ViaCEP** - Busca de endereço por CEP
- **AwesomeAPI** - Cotação USD/BRL

### Architecture
- **Axios** - HTTP Client
- **Clean Architecture** - Separation of Concerns
- **MVVM Pattern** - Presentation Logic

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd cartxpress

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Acessar

Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🧪 Testando a Aplicação

### Fluxo Completo

1. **Produtos** - Navegue pelo catálogo
2. **Adicionar ao Carrinho** - Clique em "Adicionar"
3. **Carrinho** - Veja itens, ajuste quantidades, veja conversão USD
4. **Checkout** - Preencha dados, busque CEP automaticamente
5. **Sucesso** - Confirme o pedido

### Testar CEP

Use CEPs válidos para testar a busca automática:
- `01310-100` (Av. Paulista, São Paulo)
- `20040-020` (Centro, Rio de Janeiro)
- `30130-010` (Centro, Belo Horizonte)

---

## 📖 Conceitos-Chave

### Clean Architecture
> "As regras de negócio não devem depender de frameworks, UI ou banco de dados"

**Na prática:** O Use Case `AddToCart` não sabe que existe React, LocalStorage ou Axios. Ele só conhece interfaces (contratos).

### MVVM
> "Separe a lógica de apresentação da UI"

**Na prática:** O `useCartViewModel` gerencia estado e chama Use Cases. O componente `CartPage` só renderiza e chama funções do ViewModel.

### Feature-Based
> "Organize por funcionalidade, não por tipo de arquivo"

**Na prática:** Tudo relacionado ao carrinho está em `features/cart/`. Fácil encontrar, manter e até extrair.

### Atomic Design
> "Construa interfaces complexas a partir de componentes simples"

**Na prática:** Não temos pastas separadas por nível atômico, mas aplicamos o conceito de composição: elementos HTML básicos → `ProductCard` (molecule) → `ProductGrid` (organism) → `ProductsPage` (template). Componentes reutilizáveis ficam em `shared/ui/components`, e componentes específicos ficam dentro de cada feature.

---

## 🎓 Aprendizados

Este projeto demonstra:

✅ Como estruturar uma aplicação React escalável  
✅ Como aplicar Clean Architecture em frontend  
✅ Como usar MVVM com React Hooks  
✅ Como organizar código por features  
✅ Como criar componentes reutilizáveis (Atomic Design)  
✅ Como gerenciar dependências com DI  
✅ Como validar dados com Zod  
✅ Como integrar APIs externas  
✅ Como persistir dados no navegador  

---

## 📝 Licença

MIT

---

**Desenvolvido com 💙 para fins educacionais**
