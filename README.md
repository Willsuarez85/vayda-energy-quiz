# Vayda Wellness — Energy Quiz MVP

Interactive quiz to help women 45-65 identify their primary energy drain (Sleep, Digestion, or Stress).

## 🚀 Quick Start

### Local Development
```bash
# Simple HTTP server
npx serve .

# Or with Python
python3 -m http.server 3000
```

Open `http://localhost:3000`

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## ⚙️ Configuration

Edit `js/quiz.js` to set your endpoints:

```javascript
// GoHighLevel Webhook
window.VAYDA_WEBHOOK_URL = 'https://your-ghl-webhook-url.com';

// Stripe Payment Link for $27 Tripwire
window.VAYDA_STRIPE_LINK = 'https://buy.stripe.com/your-product-link';
```

## 📁 Project Structure

```
quiz-mvp/
├── index.html          # Main app
├── css/
│   └── style.css       # All styles
├── js/
│   └── quiz.js         # Quiz logic & data
├── assets/             # Images (if needed)
├── vercel.json         # Vercel config
└── README.md           # This file
```

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Teal | #1A5F5A | Primary, CTAs |
| Warm Cream | #F8F5F0 | Backgrounds |
| Charcoal | #2D3436 | Text |
| Soft Sage | #A8C5B5 | Accents |
| Blush Rose | #E8C4C4 | Feminine accents |

## 📊 Quiz Flow

1. **Landing** — Value proposition + Start button
2. **Questions** — 12 questions (4 per pillar)
3. **Lead Capture** — Name, Email, Phone
4. **Result** — Personalized based on scores + CTA to Tripwire

## 🔗 Integration Points

### GoHighLevel Webhook
Data sent on form submit:
```json
{
  "firstName": "Jane",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "scores": { "sleep": 8, "digestion": 4, "stress": 10 },
  "dominantPillar": "stress",
  "totalScore": 22,
  "timestamp": "2026-01-29T..."
}
```

### Stripe
Direct link to $27 product. Configure in Stripe Dashboard.

## 📱 Responsive

Designed mobile-first. Works on:
- ✅ Mobile (320px+)
- ✅ Tablet
- ✅ Desktop (max-width: 480px container)

---

**Vayda Wellness** | Built with ❤️ by Simplicity Agency
