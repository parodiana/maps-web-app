# Emergency Service Distance & Pricing Calculator

Acil servis hizmetleri için mesafe hesaplama ve dinamik fiyatlandırma uygulaması. Google Maps Distance Matrix API kullanarak iki adres arasındaki mesafeyi hesaplar ve kurumsal fiyatlandırma kurallarına göre otomatik fiyat belirler.

## 🚀 Özellikler

- **Mesafe Hesaplama**: Google Maps Distance Matrix API ile hassas mesafe ölçümü
- **Dinamik Fiyatlandırma**:
  - 0-30 km: 40€ sabit fiyat
  - 30 km üzeri: Her km için +1€
- **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz (i18next)
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Güvenli API**: Backend'de API key yönetimi
- **Modern Stack**: React + Vite frontend, Node.js + Express backend
- **Profesyonel UI/UX**: Modern, kullanıcı dostu arayüz

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Google Maps API Key (Distance Matrix API etkin)

## 🛠️ Kurulum

### 1. Projeyi İndirin

```bash
git clone <repository-url>
cd maps-web-app
```

### 2. Backend Kurulumu

```bash
cd server
npm install
```

`.env` dosyası oluşturun:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve Google Maps API Key'inizi ekleyin:

```env
PORT=5000
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your_actual_api_key_here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Frontend Kurulumu

```bash
cd ../client
npm install
```

## 🎯 Kullanım

### Backend'i Başlatma

```bash
cd server
npm run dev
```

Backend `http://localhost:5000` adresinde çalışacaktır.

### Frontend'i Başlatma

```bash
cd client
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacaktır.

Tarayıcınızda `http://localhost:5173` adresini açın.

## 📁 Proje Yapısı

```
maps-web-app/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── CalculatorForm.jsx
│   │   │   ├── ResultDisplay.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── services/          # API services
│   │   │   └── api.service.js
│   │   ├── i18n/              # Internationalization
│   │   │   ├── i18n.js
│   │   │   └── locales/
│   │   │       ├── tr.json
│   │   │       └── en.json
│   │   ├── styles/            # CSS styles
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/            # API routes
│   │   │   └── distance.routes.js
│   │   ├── services/          # Business logic
│   │   │   ├── googleMaps.service.js
│   │   │   └── pricing.service.js
│   │   ├── middleware/        # Express middleware
│   │   │   └── validation.middleware.js
│   │   └── server.js          # Express app
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### POST `/api/distance/calculate`

Mesafe ve fiyat hesaplama.

**Request:**
```json
{
  "origin": "Atatürk Caddesi No:123, İstanbul",
  "destination": "Taksim Meydanı, İstanbul"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "route": {
      "origin": "...",
      "destination": "..."
    },
    "distance": {
      "kilometers": 15.5,
      "meters": 15500,
      "text": "15.5 km"
    },
    "duration": {
      "seconds": 1200,
      "text": "20 mins"
    },
    "pricing": {
      "basePrice": 40,
      "additionalPrice": 0,
      "totalPrice": 40,
      "currency": "EUR"
    },
    "breakdown": {
      "description": "Base price for 15.50 km",
      "formula": "€40"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/distance/pricing-config`

Fiyatlandırma kurallarını görüntüleme.

**Response:**
```json
{
  "success": true,
  "data": {
    "basePrice": 40,
    "basePriceUpToKm": 30,
    "additionalPricePerKm": 1,
    "currency": "EUR"
  }
}
```

### GET `/health`

Sunucu durumu kontrolü.

## 💡 Fiyatlandırma Mantığı

```javascript
// 0-30 km arası
distance = 25 km
price = 40€

// 30 km üzeri
distance = 45 km
price = 40€ + (45 - 30) * 1€ = 55€
```

## 🌐 Çoklu Dil Desteği

Uygulama Türkçe ve İngilizce dillerini desteklemektedir. Dil değiştirme sağ üst köşedeki butonlarla yapılabilir.

Yeni dil eklemek için:

1. `client/src/i18n/locales/` klasörüne yeni dil dosyası ekleyin
2. `client/src/i18n/i18n.js` dosyasında dili import edin
3. `resources` objesine ekleyin

## 🔒 Güvenlik

- API key'ler backend'de saklanır (`.env`)
- CORS koruması
- Rate limiting (15 dakikada 100 istek)
- Input validation
- Helmet.js ile HTTP header güvenliği

## 🚀 Production Build

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run build
npm run preview
```

Build dosyaları `client/dist/` klasöründe oluşur.

## 📝 Lisans

MIT License

## 👨‍💻 Geliştirici Notları

### Google Maps API Key Alma

1. [Google Cloud Console](https://console.cloud.google.com/) gidin
2. Yeni proje oluşturun
3. "APIs & Services" > "Library" > "Distance Matrix API" aktif edin
4. "Credentials" > "Create Credentials" > "API Key"
5. API key'i kopyalayın ve `.env` dosyasına ekleyin

### Fiyatlandırma Kurallarını Değiştirme

`server/src/services/pricing.service.js` dosyasındaki sabitleri düzenleyin:

```javascript
this.BASE_PRICE = 40; // Euro
this.BASE_DISTANCE_LIMIT = 30; // km
this.ADDITIONAL_PRICE_PER_KM = 1; // Euro per km
```

## 🐛 Sorun Giderme

### Port zaten kullanılıyor

```bash
# Port 5000 kullanılıyorsa .env dosyasında değiştirin
PORT=5001
```

### API Key hatası

- Google Cloud Console'da Distance Matrix API'nin aktif olduğundan emin olun
- API key'in doğru kopyalandığını kontrol edin
- Billing aktif olmalıdır

### CORS hatası

`.env` dosyasında `ALLOWED_ORIGINS` değerini kontrol edin.

## 📧 İletişim

Sorularınız için issue açabilirsiniz.
