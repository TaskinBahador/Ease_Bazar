
"use client";

import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Home,
  Grid2X2,
  Leaf,
  Truck,
  ShieldCheck,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Phone,
  Info,
  Headphones,
} from "lucide-react";

import { products } from "./data/products";
import type { Language, Category, Product } from "./types";

const productImages: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85",
  2: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",
  3: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=85",
  4: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=700&q=85",
  5: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=700&q=85",
  6: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85",
  7: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=85",
  8: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=85",
};

const categories: {
  id: Category | "all";
  emoji: string;
  en: string;
  dari: string;
  pashto: string;
  color: string;
}[] = [
  {
    id: "fresh-fruits",
    emoji: "🍎",
    en: "Fresh Fruits",
    dari: "میوه تازه",
    pashto: "تازه مېوې",
    color: "bg-green-50",
  },
  {
    id: "dry-fruits",
    emoji: "🥜",
    en: "Dry Fruits",
    dari: "میوه خشک",
    pashto: "وچې مېوې",
    color: "bg-rose-50",
  },
  {
    id: "grains",
    emoji: "🌾",
    en: "Grains",
    dari: "غله و آرد",
    pashto: "غلې او اوړه",
    color: "bg-amber-50",
  },
  {
    id: "oils",
    emoji: "🫒",
    en: "Oils",
    dari: "روغن خوراکی",
    pashto: "د پخلي غوړي",
    color: "bg-yellow-50",
  },
  {
    id: "all",
    emoji: "🛍️",
    en: "Grocery",
    dari: "مواد غذایی",
    pashto: "خوراکي توکي",
    color: "bg-sky-50",
  },
];

const translations = {
  english: {
    home: "Home",
    categories: "Categories",
    products: "Featured Products",
    search: "Search products...",
    welcome: "Welcome to Ease Bazar",
    subtitle:
      "Fresh Afghan fruits, quality groceries and local favourites.",
    shop: "Shop Now",
    explore: "Explore Categories",
    add: "Add to Cart",
    cart: "Your Cart",
    empty: "Your cart is empty",
    emptySearch: "No products found",
    subtotal: "Subtotal",
    checkout: "Continue to Checkout",
    close: "Close",
    clear: "Clear Cart",
    footer: "Fresh Afghan products, delivered with care.",
    benefits: ["Fast Delivery", "Secure Payment", "Fresh Products"],
    count: "products",
    about: "About Us",
    contact: "Contact Us",
    delivery: "Fast Delivery",
    payment: "Secure Payment",
    quality: "Fresh Quality",
    viewAll: "View All",
    perUnit: "Unit",
  },
  dari: {
    home: "خانه",
    categories: "دسته‌بندی‌ها",
    products: "محصولات ویژه",
    search: "جستجوی محصولات...",
    welcome: "به بازار آسان خوش آمدید",
    subtitle:
      "میوه‌های تازه افغانستان، مواد خوراکی باکیفیت و محصولات محلی.",
    shop: "شروع خرید",
    explore: "دیدن دسته‌بندی‌ها",
    add: "افزودن به سبد",
    cart: "سبد خرید",
    empty: "سبد خرید شما خالی است",
    emptySearch: "محصولی پیدا نشد",
    subtotal: "مجموع قیمت",
    checkout: "ادامه خرید",
    close: "بستن",
    clear: "خالی کردن سبد",
    footer: "محصولات تازه افغانستان، با دقت به شما می‌رسد.",
    benefits: ["ارسال سریع", "پرداخت امن", "محصولات تازه"],
    count: "محصول",
    about: "درباره ما",
    contact: "تماس با ما",
    delivery: "ارسال سریع",
    payment: "پرداخت امن",
    quality: "کیفیت تازه",
    viewAll: "مشاهده همه",
    perUnit: "واحد",
  },
  pashto: {
    home: "کور",
    categories: "ډلبندي",
    products: "ځانګړي محصولات",
    search: "محصولات ولټوئ...",
    welcome: "اسانه بازار ته ښه راغلاست",
    subtitle:
      "د افغانستان تازه مېوې، باکیفیته خوراکي توکي او ځايي محصولات.",
    shop: "پېرود پیل کړئ",
    explore: "ډلبندي وګورئ",
    add: "سبد ته اضافه",
    cart: "د پېرودلو سبد",
    empty: "ستاسو سبد تش دی",
    emptySearch: "محصولات ونه موندل شول",
    subtotal: "ټول قیمت",
    checkout: "پېرود ته دوام ورکړئ",
    close: "بندول",
    clear: "سبد تشول",
    footer: "د افغانستان تازه محصولات، په پاملرنې سره ستاسو تر دروازې.",
    benefits: ["چټک لېږد", "خوندي تادیه", "تازه محصولات"],
    count: "محصولات",
    about: "زموږ په اړه",
    contact: "اړیکه",
    delivery: "چټک لېږد",
    payment: "خوندي تادیه",
    quality: "تازه کیفیت",
    viewAll: "ټول وګورئ",
    perUnit: "واحد",
  },
};

function getName(product: Product, language: Language) {
  if (language === "english") return product.name;
  if (language === "pashto") return product.namePashto;
  return product.nameDari;
}

function getDescription(product: Product, language: Language) {
  if (language === "english") return product.descriptionEnglish;
  if (language === "pashto") return product.descriptionPashto;
  return product.descriptionDari;
}

function getCategoryName(
  category: (typeof categories)[number],
  language: Language
) {
  if (language === "english") return category.en;
  if (language === "pashto") return category.pashto;
  return category.dari;
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("dari");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category | "all">("all");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const t = translations[language];
  const isRTL = language !== "english";

  const cartProducts = products.filter(
    (product) => (cart[product.id] || 0) > 0
  );

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0
  );

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const searchable = [
        product.name,
        product.nameDari,
        product.namePashto,
        product.descriptionEnglish,
        product.descriptionDari,
        product.descriptionPashto,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!term || searchable.includes(term));
    });
  }, [search, selectedCategory]);

  function addToCart(product: Product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));

    setNotice(`${getName(product, language)} ✓`);
    window.setTimeout(() => setNotice(""), 1800);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + amount;
      const updated = { ...current };

      if (nextQuantity <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = nextQuantity;
      }

      return updated;
    });
  }

  function clearCart() {
    setCart({});
  }

  function toggleFavorite(productId: number) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f7f8f5] text-slate-800"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-[68px] max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md">
              <ShoppingCart size={25} strokeWidth={2.5} />
            </span>
            <span>
              <span className="block text-xl font-black leading-tight tracking-tight text-green-800 sm:text-2xl">
                Ease Bazar
              </span>
              <span className="block text-xs font-bold text-green-600">
                بازار آسان
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 xl:flex">
            <a href="#home" className="flex items-center gap-2 transition hover:text-green-700">
              <Home size={17} /> {t.home}
            </a>
            <a href="#categories" className="flex items-center gap-2 transition hover:text-green-700">
              <Grid2X2 size={17} /> {t.categories}
            </a>
            <a href="#products" className="flex items-center gap-2 transition hover:text-green-700">
              <Leaf size={17} /> {t.products}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-green-500 lg:flex">
              <Search size={17} className="shrink-0 text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                aria-label={t.search}
                className="w-28 bg-transparent text-sm outline-none xl:w-36"
              />
            </label>

            <select
              aria-label="Choose language"
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as Language)
              }
              className="max-w-28 rounded-xl border border-green-200 bg-white px-2 py-2.5 text-sm font-bold text-green-800 outline-none focus:ring-2 focus:ring-green-200"
            >
              <option value="dari">دری</option>
              <option value="pashto">پښتو</option>
              <option value="english">English</option>
            </select>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={t.cart}
              className="relative flex min-h-11 items-center gap-2 rounded-xl bg-green-700 px-3 font-bold text-white transition hover:bg-green-800"
            >
              <ShoppingCart size={19} />
              <span className="hidden md:inline">{t.cart}</span>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1 text-xs font-black text-green-800">
                {totalItems}
              </span>
            </button>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-xl border border-slate-200 p-2 lg:hidden"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white p-4 lg:hidden">
            <label className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <nav className="flex flex-col gap-1 font-bold">
              <a onClick={() => setMobileMenuOpen(false)} href="#home" className="rounded-xl p-3 hover:bg-green-50">
                <Home className="me-2 inline" size={18} /> {t.home}
              </a>
              <a onClick={() => setMobileMenuOpen(false)} href="#categories" className="rounded-xl p-3 hover:bg-green-50">
                <Grid2X2 className="me-2 inline" size={18} /> {t.categories}
              </a>
              <a onClick={() => setMobileMenuOpen(false)} href="#products" className="rounded-xl p-3 hover:bg-green-50">
                <Leaf className="me-2 inline" size={18} /> {t.products}
              </a>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl p-3 text-start hover:bg-green-50"
              >
                <ShoppingCart className="me-2 inline" size={18} /> {t.cart}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero banner */}
      <section id="home" className="mx-auto max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl bg-green-950 shadow-lg sm:rounded-3xl">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{
             backgroundImage: "url('/products/hero.png')",
               }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#002e1c]/95 via-[#003d25]/85 to-[#064e2c]/35" />

          <div className="grid min-h-[330px] items-center gap-5 px-5 py-7 sm:min-h-[360px] sm:px-9 sm:py-9 lg:grid-cols-[1fr_0.8fr] lg:px-11 lg:py-10">
            <div className="max-w-xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200/25 bg-green-700/70 px-3 py-1.5 text-xs font-bold text-lime-100 sm:text-sm">
                <Leaf size={14} />
                {language === "english"
                  ? "Freshness and quality"
                  : language === "pashto"
                    ? "تازه‌والی او کیفیت"
                    : "محصولات تازه و باکیفیت"}
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {t.welcome}
              </h1>

              <p
                dir="ltr"
                className="mt-2 text-lg font-extrabold leading-snug text-lime-300 sm:text-xl"
              >
                Welcome to Ease Bazar
              </p>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/95 sm:text-base sm:leading-7">
                {t.subtitle}
              </p>

              <p
  dir="rtl"
  className={`mt-2 max-w-lg text-sm leading-7 text-white/90 sm:text-base ${
  language === "dari" ? "text-right" : "text-left"
}`}
>
  میوه‌های تازه و محصولات محلی افغانستان، برای خرید آسان شما.
</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-green-950 shadow-md transition hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  <ShoppingCart size={18} />
                  {t.shop}
                </a>
                <a
                  href="#categories"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/50 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  {t.explore}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white px-4 py-3">
          <span className="rounded-full bg-green-50 p-2.5 text-green-700">
            <Truck size={21} />
          </span>
          <div>
            <p className="text-sm font-extrabold">{t.benefits[0]}</p>
            <p className="text-xs text-slate-500">Fast Delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white px-4 py-3">
          <span className="rounded-full bg-green-50 p-2.5 text-green-700">
            <ShieldCheck size={21} />
          </span>
          <div>
            <p className="text-sm font-extrabold">{t.benefits[1]}</p>
            <p className="text-xs text-slate-500">Secure Payment</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white px-4 py-3">
          <span className="rounded-full bg-green-50 p-2.5 text-green-700">
            <Leaf size={21} />
          </span>
          <div>
            <p className="text-sm font-extrabold">{t.benefits[2]}</p>
            <p className="text-xs text-slate-500">Fresh Products</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 sm:text-xl">
            {t.categories}
          </h2>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900"
          >
            {t.viewAll}
            {isRTL ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex min-h-[66px] items-center gap-2.5 rounded-xl border px-3 py-2 text-start transition hover:-translate-y-0.5 hover:shadow-sm sm:min-h-[76px] sm:gap-3 ${
                selectedCategory === category.id
                  ? "border-green-300 bg-green-50 ring-1 ring-green-100"
                  : `border-transparent ${category.color}`
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm sm:h-11 sm:w-11 sm:text-2xl">
                {category.emoji}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold leading-5 text-slate-800 sm:text-sm">
                  {getCategoryName(category, language)}
                </span>
                <span className="mt-0.5 block text-[10px] text-slate-500">
                  {category.en}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="mx-auto max-w-[1400px] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {t.products}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {language === "english"
                ? "Quality essentials from Afghanistan"
                : language === "pashto"
                  ? "د افغانستان باکیفیته محصولات"
                  : "محصولات باکیفیت افغانستان"}
            </p>
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
            {visibleProducts.length} {t.count}
          </span>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <Search size={38} className="mx-auto text-slate-400" />
            <p className="mt-3 font-bold">{t.emptySearch}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden bg-[#f5f5f0]">
                  <img
                    src={productImages[product.id]}
                    alt={getName(product, language)}
                    loading="lazy"
                    className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Toggle favourite"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm transition hover:text-red-500"
                  >
                    <Heart
                      size={15}
                      className={
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }
                    />
                  </button>
                </div>

                <div className="flex min-h-[174px] flex-col p-3 sm:min-h-[185px] sm:p-3.5">
                  <h3 className="line-clamp-1 text-sm font-black leading-6 text-slate-900 sm:text-base">
                    {getName(product, language)}
                  </h3>
                  <p className="line-clamp-2 min-h-8 text-[11px] leading-4 text-slate-500 sm:text-xs">
                    {getDescription(product, language)}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-1">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-green-700 sm:text-base">
                        {product.price.toLocaleString()} AFN
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                        {product.unit}
                      </p>
                    </div>
                    {(cart[product.id] || 0) > 0 && (
                      <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-black text-green-800">
                        × {cart[product.id]}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-auto flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-green-700 px-2 py-2 text-xs font-extrabold text-white transition hover:bg-green-800 active:scale-[0.98] sm:mt-3 sm:min-h-10 sm:text-sm"
                  >
                    <ShoppingCart size={15} />
                    <span>{t.add}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#003c29] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:gap-8 lg:py-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                <ShoppingCart size={23} />
              </span>
              <span>
                <span className="block text-lg font-black">Ease Bazar</span>
                <span className="block text-xs font-bold text-green-200">بازار آسان</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-xs leading-6 text-green-100/75">
              {t.footer}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold">{t.benefits[0]}</h3>
            <p className="flex items-center gap-2 text-xs leading-6 text-green-100/75">
              <Truck size={18} /> {t.delivery}
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs leading-6 text-green-100/75">
              <ShieldCheck size={18} /> {t.payment}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold">{t.categories}</h3>
            <div className="space-y-2 text-xs text-green-100/75">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block transition hover:text-lime-300"
                >
                  {getCategoryName(category, language)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold">{t.about}</h3>
            <a href="#home" className="flex items-center gap-2 text-xs text-green-100/75 hover:text-lime-300">
              <Info size={16} /> {t.about}
            </a>
            <a href="#products" className="mt-2 flex items-center gap-2 text-xs text-green-100/75 hover:text-lime-300">
              <Leaf size={16} /> {t.quality}
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-extrabold">{t.contact}</h3>
            <p className="flex items-center gap-2 text-xs text-green-100/75">
              <Phone size={16} /> Afghanistan
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-green-100/75">
              <Headphones size={16} /> Ease Bazar Support
            </p>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="mt-3 rounded-lg bg-lime-400 px-3 py-2 text-xs font-black text-green-950 transition hover:bg-lime-300"
            >
              {t.cart}
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-3 text-center text-[10px] text-green-100/65 sm:text-xs">
          © 2026 Ease Bazar · بازار آسان. All rights reserved. · Demo Data
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={t.close}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full bg-slate-950/50"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label={t.cart}
            className={`absolute top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="flex items-center gap-2 text-xl font-black">
                <ShoppingCart className="text-green-700" />
                {t.cart} ({totalItems})
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label={t.close}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <X size={23} />
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <ShoppingCart size={58} className="text-slate-300" />
                <p className="mt-5 text-lg font-bold text-slate-600">{t.empty}</p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-5 rounded-xl bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
                >
                  {t.shop}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {cartProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-slate-100 p-3"
                    >
                      <img
                        src={productImages[product.id]}
                        alt={getName(product, language)}
                        className="h-20 w-20 rounded-xl bg-slate-100 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold">{getName(product, language)}</h3>
                        <p className="mt-1 text-sm font-bold text-green-700">
                          {(product.price * cart[product.id]).toLocaleString()} AFN
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => changeQuantity(product.id, -1)}
                            className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="min-w-5 text-center font-bold">
                            {cart[product.id]}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => changeQuantity(product.id, 1)}
                            className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-100"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="Remove product"
                            onClick={() => changeQuantity(product.id, -cart[product.id])}
                            className="ms-auto rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-slate-200 p-5">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>{t.subtotal}</span>
                    <span className="text-green-700">
                      {totalPrice.toLocaleString()} AFN
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotice(
                        language === "english"
                          ? "Checkout is a demo and is not connected to a payment service yet."
                          : language === "pashto"
                            ? "د فرمایش بشپړول لا د تادیې له خدمت سره نه دي تړل شوي."
                            : "بخش تکمیل سفارش هنوز به سیستم پرداخت وصل نشده است."
                      );
                      window.setTimeout(() => setNotice(""), 3000);
                    }}
                    className="w-full rounded-xl bg-green-700 px-4 py-4 font-black text-white hover:bg-green-800"
                  >
                    {t.checkout}
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full rounded-xl border border-red-200 px-4 py-3 font-bold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="me-2 inline" size={17} />
                    {t.clear}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] max-w-[90vw] -translate-x-1/2 rounded-xl bg-green-800 px-5 py-3 text-center text-sm font-bold text-white shadow-xl"
        >
          ✓ {notice}
        </div>
      )}
    </main>
  );
}
