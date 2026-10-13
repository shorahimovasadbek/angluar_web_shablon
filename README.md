# template_angular_web

Angular 22 web ilova shabloni (standalone, signals, signal forms, Tailwind 4). `template_angular_mobile` bilan bir xil arxitektura — faqat Ionic/Capacitor o'rniga oddiy web layout.

## Ishga tushirish

```bash
npm install
npm start          # http://localhost:4200
npm run build      # dist/
npm run lint
```

Yangi loyiha boshlaganda o'zgartiring: `package.json → name`, `src/environments/*.ts → apiUrl`,
`src/styles.css → ranglar`, `src/index.html → title`.

## Struktura

```
src/
├── main.ts                 # provider'lar + app initializer (auth/til tiklash)
├── styles.css              # Tailwind + dizayn tokenlari (yagona manba)
├── environments/           # apiUrl (dev / prod)
└── app/
    ├── app.component.ts    # router-outlet + toaster
    ├── app.routes.ts       # marshrutlar + guard'lar
    ├── layout/             # Shell: header + nav + kontent
    ├── core/               # yagona (singleton) infratuzilma
    │   ├── api/            # ApiError, toFieldError
    │   ├── auth/           # Auth servis (signal holat) + modellar
    │   ├── guards/         # authGuard, guestGuard
    │   ├── i18n/           # Lang servis
    │   ├── interceptors/   # token/til header'lari, xato + 401 refresh
    │   ├── storage/        # AppStorage (localStorage, tiplangan kalitlar)
    │   └── ui/             # Toastr (signal asosida)
    ├── shared/
    │   ├── ui/             # ui-button, ui-input, ui-toaster
    │   └── utils/          # sof funksiyalar
    └── features/           # sahifalar
        ├── auth/
        ├── home/
        └── profile/
public/
├── i18n/                   # ru.json, uz.json
└── favicon.png
```

## Qoidalar

- **Qatlamlar:** `features → shared, core`; `core` hech qachon `features` ni import qilmaydi; feature boshqa feature'ni import qilmaydi.
- **Alias'lar:** `@core/*`, `@shared/*`, `@features/*`, `@env/*`.
- **Holat:** signal'lar; servisda yozish `private`, tashqariga `asReadonly()`.
- **Komponentlar:** standalone, `input()` / `output()` / `model()`, `inject()`, `@if` / `@for`.
- **Formalar:** `@angular/forms/signals`; server xatosi `toFieldError()` orqali.
- **HTTP:** faqat servislarda, endpoint'lar `const API = {...}` da.
- **Matn:** faqat `public/i18n/*.json` orqali.
- **Stil:** Tailwind klasslari yoki `var(--token)`; hex kod komponentda yo'q.
- **Nomlash:** `kebab-case` fayllar, `xxx-page.ts → XxxPage`, `ui-xxx → UiXxx`.

## Yangi sahifa qo'shish

1. `src/app/features/orders/orders-page.{ts,html}` yarating.
2. `app.routes.ts` dagi `Shell` children'iga `loadComponent` bilan qo'shing, `layout/shell.html` ga nav link.
3. Tarjimalarni `public/i18n/` ga qo'shing.
