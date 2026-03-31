# ScholarshipBoard POC - Antigravity Deployment Checklist

## 1) Create Sections in Order

1. Hero
2. Spin & Win Form
3. How It Works (3 cards)
4. Scholarship Previews (cards/carousel)
5. Final CTA
6. Footer

Use content from `landing-page-copy.md`.

## 2) Wire the Form

- Collect: Name, Country, Study Level, Field of Study, WhatsApp Number
- Country options: Australia, USA, UK, Japan, India
- Keep form and wheel in same section (`#spinwheel`)

## 3) Configure Spin Wheel

- Use labels from `spin-wheel-content.md`
- Replace `[Country]` dynamically with selected country
- Show result + CTA button: "Claim Your Scholarship Guide via WhatsApp"

## 4) Update WhatsApp Number

Replace `<YOUR_NUMBER>` in all templates with your number in international format (no +, spaces, or dashes).  
Example: `919876543210`

## 5) Attach Country PDF Links

Upload PDFs from `pdfs/` to Google Drive or Dropbox and set public sharing:

- `ScholarshipBoard-AUSTRALIA-Guide.pdf`
- `ScholarshipBoard-USA-Guide.pdf`
- `ScholarshipBoard-UK-Guide.pdf`
- `ScholarshipBoard-JAPAN-Guide.pdf`
- `ScholarshipBoard-INDIA-Guide.pdf`

## 6) WhatsApp Auto Replies

Use the exact flow in `whatsapp-flow.md`:
- Step 1 greeting + level selection
- Step 2 field + country confirmation
- Step 3 PDF delivery
- Step 4 re-engagement prompt

## 7) Mobile QA Before Launch

- Hero CTA scrolls to `#spinwheel`
- Spin result visible without layout shift
- WhatsApp links open correctly on Android and iOS
- PDF links accessible without login
