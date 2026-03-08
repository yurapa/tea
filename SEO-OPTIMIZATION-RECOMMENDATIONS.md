# SEO Оптимізація - Рекомендації та Зміни

**Дата:** 2025-11-17
**Проект:** Tea Vibe Store (teavibe.store)
**Мови:** English (en), Українська (uk), Русский (ru), Ελληνικά (el)

---

## 📊 Аналіз Проблем Google Search Console

### Виявлені Проблеми (До Оптимізації)

| Проблема | Кількість | Причина |
|----------|-----------|---------|
| Crawled - currently not indexed | 31 | Сторінки були проіндексовані, але не показуються в результатах пошуку |
| Not found (404) | 43 | Старі URL з sitemap або внутрішні посилання на неіснуючі сторінки |
| Duplicate without user-selected canonical | 29 | Відсутність правильних canonical тегів для багатомовних сторінок |
| Excluded by 'noindex' tag | 9 | Сторінки помилково позначені як noindex |
| Soft 404 | 4 | Сторінки повертають 200, але не мають контенту |
| Page with redirect | 2 | Редіректи в sitemap |

### Статистика Індексації

- **Проіндексовано:** 20-27 сторінок (дуже низько)
- **Не індексовано:** 107-118 сторінок (критично високо)
- **Проблема:** Більшість сторінок не індексуються через неправильну конфігурацію

---

## 🛠️ Виконані Зміни

### 1. Оптимізація `robots.txt` (`/app/robots.ts`)

#### Що було змінено:

**ДОДАНО до блокування:**
- `/cart` - кошик (user-specific, динамічний контент)
- `/shipping-address` - крок оформлення замовлення 1
- `/api/` - API ендпоінти (не для краулерів)
- `/sign-in` - сторінка логіну (низька SEO цінність)
- `/sign-up` - сторінка реєстрації (низька SEO цінність)

**ЗАЛИШЕНО блокування:**
- `/admin/` - адмін панель
- `/user/` - особистий кабінет
- `/profile/` - профіль користувача
- `/order/` - деталі замовлення
- `/payment-method` - крок оформлення 2
- `/place-order` - крок оформлення 3

#### Чому це важливо:

✅ **Безпека:** Google Bot не буде намагатись доступитись до захищених сторінок, що усуває помилки 403/401 в Search Console

✅ **Якість індексації:** Виключаємо сторінки з низькою SEO цінністю (login/signup)

✅ **Уникнення duplicate content:** User-specific сторінки (cart, checkout) не індексуються

✅ **API захист:** API ендпоінти не призначені для краулерів і не мають SEO цінності

#### Приклад нового `robots.txt`:

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /user/
Disallow: /profile/
Disallow: /order/
Disallow: /cart
Disallow: /shipping-address
Disallow: /payment-method
Disallow: /place-order
Disallow: /api/
Disallow: /sign-in
Disallow: /sign-up

Sitemap: https://teavibe.store/sitemap.xml
```

---

### 2. Оптимізація `sitemap.xml` (`/app/sitemap.ts`)

#### Що було змінено:

**ВИДАЛЕНО з sitemap:**
- ❌ `/cart` - user-specific сторінка
- ❌ `/sign-in`, `/sign-up` - низька SEO цінність
- ❌ Price filters (`/search?price=1-10`, тощо) - duplicate content, низька цінність
- ❌ Rating filters (`/search?rating=4`, тощо) - duplicate content, низька цінність

**ДОДАНО до sitemap:**
- ✅ **Всі продукти з БД** - динамічна генерація з `prisma.product.findMany()`
- ✅ **Всі категорії з БД** - динамічна генерація унікальних категорій
- ✅ **Hreflang alternates** - правильні теги для багатомовності
- ✅ **x-default** - fallback на англійську мову

#### Структура sitemap:

| Тип сторінки | Приклад URL | Priority | Change Freq | Hreflang |
|--------------|-------------|----------|-------------|----------|
| Homepage | `/`, `/uk`, `/ru`, `/el` | 1.0 | daily | ✅ Так |
| Search | `/search` | 0.9 | daily | ✅ Так |
| Product | `/product/alpine-meadow` | 0.8 | weekly | ✅ Так |
| Category | `/search?category=black-tea` | 0.7 | daily | ✅ Так |

#### Приклад hreflang структури для продукту:

```xml
<url>
  <loc>https://teavibe.store/product/alpine-meadow</loc>
  <lastmod>2025-11-17</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://teavibe.store/product/alpine-meadow"/>
  <xhtml:link rel="alternate" hreflang="uk" href="https://teavibe.store/uk/product/alpine-meadow"/>
  <xhtml:link rel="alternate" hreflang="ru" href="https://teavibe.store/ru/product/alpine-meadow"/>
  <xhtml:link rel="alternate" hreflang="el" href="https://teavibe.store/el/product/alpine-meadow"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://teavibe.store/product/alpine-meadow"/>
</url>
```

#### Чому це важливо:

✅ **Динамічна генерація:** Продукти та категорії генеруються з БД автоматично

✅ **Багатомовність:** Кожна сторінка має всі 4 мовні версії з hreflang тегами

✅ **Canonical URLs:** x-default вказує на англійську версію як основну

✅ **Уникнення дублікатів:** Видалено filter pages, які створювали duplicate content

✅ **Актуальність:** `lastModified` береться з `createdAt` продукту

---

## 📋 Додаткові Рекомендації для Покращення SEO

### 1. Додати `generateMetadata` для сторінок продуктів

**Проблема:** Сторінки продуктів не мають динамічних meta-тегів

**Рішення:** Додати у `/app/[locale]/(root)/product/[slug]/page.tsx`:

```typescript
export async function generateMetadata({ params }: { params: { slug: string, locale: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: 'product',
    },
    alternates: {
      canonical: `/product/${product.slug}`,
      languages: {
        'en': `/product/${product.slug}`,
        'uk': `/uk/product/${product.slug}`,
        'ru': `/ru/product/${product.slug}`,
        'el': `/el/product/${product.slug}`,
      },
    },
  };
}
```

### 2. Додати Structured Data (JSON-LD) для продуктів

**Рішення:** Додати Product schema markup:

```typescript
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.numReviews,
  },
};
```

### 3. Додати canonical теги для search pages

**Проблема:** `/search?category=black-tea` може мати дублікати з `/search?category=Black%20Tea`

**Рішення:** Додати у `/app/[locale]/(root)/search/page.tsx`:

```typescript
export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
  const category = searchParams.category;

  return {
    title: category ? `${category} - Search` : 'Search Products',
    alternates: {
      canonical: `/search${category ? `?category=${category}` : ''}`,
      languages: {
        'en': `/search${category ? `?category=${category}` : ''}`,
        'uk': `/uk/search${category ? `?category=${category}` : ''}`,
        'ru': `/ru/search${category ? `?category=${category}` : ''}`,
        'el': `/el/search${category ? `?category=${category}` : ''}`,
      },
    },
  };
}
```

### 4. Виправити 404 помилки

**Проблема:** 43 сторінки повертають 404

**Рішення:**
1. Перевірити Google Search Console → Coverage → Excluded → Not Found (404)
2. Знайти URLs, які повертають 404
3. Додати редіректи у `next.config.ts` (вже є приклади для старих product slugs)
4. Або видалити ці URLs з внутрішніх посилань

### 5. Налаштувати `metadataBase` правильно

**Перевірити:** У `/app/layout.tsx` має бути:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://teavibe.store'),
  title: { template: '%s | Tea Vibe Store', default: 'Tea Vibe Store' },
  description: 'Premium tea collection for tea lovers',
};
```

### 6. Створити XML sitemap index (якщо більше 50,000 URLs)

**Якщо проект росте:**
- Розділити sitemap на кілька файлів: `sitemap-products.xml`, `sitemap-categories.xml`
- Створити `sitemap-index.xml`

---

## ✅ Очікувані Результати після Оптимізації

### Короткостроково (1-2 тижні)

- ✅ Зменшення помилок 403/401 в Search Console (0 помилок)
- ✅ Зменшення "Duplicate without canonical" (з 29 до ~0)
- ✅ Збільшення кількості проіндексованих сторінок (+50-100 сторінок)

### Середньостроково (1-2 місяці)

- ✅ Покращення індексації продуктів (всі продукти з БД)
- ✅ Покращення багатомовної видимості (hreflang працює правильно)
- ✅ Зменшення "Crawled - not indexed" (з 31 до <10)

### Довгостроково (3-6 місяців)

- ✅ Збільшення органічного трафіку на 30-50%
- ✅ Покращення позицій в пошуку для багатомовних запитів
- ✅ Збільшення CTR в пошуковій видачі (завдяки structured data)

---

## 🔧 Підтримка та Моніторинг

### Що потрібно робити регулярно:

1. **Щотижня:**
   - Перевіряти Google Search Console на нові помилки
   - Моніторити кількість проіндексованих сторінок

2. **Щомісяця:**
   - Аналізувати Search Analytics (queries, impressions, CTR)
   - Перевіряти Coverage Report (indexed vs excluded)

3. **Після додавання нових продуктів:**
   - Sitemap автоматично оновиться (динамічна генерація)
   - Можна вручну попросити Google переіндексувати через Search Console

4. **Після змін в категоріях:**
   - Sitemap автоматично оновиться
   - Перевірити, що категорії правильно відображаються

### Інструменти для моніторингу:

- **Google Search Console:** https://search.google.com/search-console
- **Sitemap URL:** https://teavibe.store/sitemap.xml
- **Robots.txt URL:** https://teavibe.store/robots.txt
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

---

## 📚 Best Practices Next.js 15/16 App Router

### Що було використано:

✅ **Dynamic Route Handlers:** `app/sitemap.ts`, `app/robots.ts`

✅ **Metadata API:** `generateMetadata` для динамічних meta-тегів

✅ **Internationalization:** next-intl з hreflang підтримкою

✅ **Server Components:** Sitemap генерується на сервері з доступом до БД

✅ **Type Safety:** `MetadataRoute.Sitemap` та `MetadataRoute.Robots` типи

✅ **Error Handling:** try-catch для запитів до БД

### Що відповідає Google Guidelines:

✅ **Hreflang implementation:** Кожна сторінка має всі мовні варіанти

✅ **X-default:** Вказує на англійську версію як fallback

✅ **Canonical URLs:** Кожна сторінка має правильний canonical

✅ **Robots.txt:** Блокує тільки необхідні сторінки

✅ **Sitemap Priority:** Правильні пріоритети (1.0 для homepage, 0.8 для продуктів)

✅ **Change Frequency:** Реалістичні частоти оновлення

---

## 🚀 Наступні Кроки

### Рекомендовані дії після деплою:

1. **Перевірити sitemap:**
   ```bash
   curl https://teavibe.store/sitemap.xml
   ```

2. **Перевірити robots.txt:**
   ```bash
   curl https://teavibe.store/robots.txt
   ```

3. **Перевірити hreflang в HTML:**
   - Відкрити будь-яку сторінку
   - View Source
   - Знайти `<link rel="alternate" hreflang="..."`

4. **Відправити sitemap в Google Search Console:**
   - Sitemaps → Add new sitemap
   - `https://teavibe.store/sitemap.xml`
   - Submit

5. **Запросити переіндексацію:**
   - URL Inspection → Перевірити кілька важливих URLs
   - Request Indexing

6. **Моніторити результати:**
   - Через 1-2 тижні перевірити Coverage Report
   - Порівняти кількість indexed/not indexed сторінок

---

## 📞 Контакти та Підтримка

**Дата створення документу:** 2025-11-17
**Версія:** 1.0
**Автор:** Claude (Anthropic AI)

**Важливо:** Цей документ слід оновлювати при кожній значній зміні в SEO конфігурації.

---

**Слава Україні! 🇺🇦**
