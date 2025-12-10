# WorldWise Educational Tours – Web App Requirements v1.0

**Date:** December 10, 2025  
**Status:** APPROVED – Locked for Development

## 1. Core Business Goals (from Ministry Proposal & Implementation Plan)

- Win MoET partnership (primary KPI)
- Serve 3,000+ students in Year 1 → 10,000+ by Year 3
- Position as the #1 trusted educational-tour provider in Eswatini & SADC
- Generate sustainable revenue via schools, sponsors, and future inbound tourism

## 2. Target User Personas

1. **Ministry Official** – Permanent Secretary / Curriculum Director  
   Needs: Transparency, data, budget tables, downloadable proposal, secure reporting portal
2. **School Principal / Bursar** – Decision maker & budget holder  
   Needs: Clear pricing, safety proof, curriculum alignment, fast quote form
3. **Teacher / Tour Coordinator**  
   Needs: Sample itineraries, subject links, easy booking, WhatsApp integration
4. **Parent**  
   Needs: Safety info, testimonials, payment options (E-mali, MTN MoMo, bank)
5. **Student** (secondary)  
   Needs: Exciting gallery, VR previews, testimonials from peers

## 3. Final Sitemap (MVP + Phase 2 Ready)

├── / (Homepage)
├── /about
├── /programs
│ ├── /local-crossborder
│ ├── /regional-exchange
│ ├── /international
│ ├── /teacher-development
│ └── /presidential-schools
├── /ministry-partnership ← HIGH PRIORITY PAGE
├── /schools-parents ← Safety, pricing, how-it-works
├── /gallery
├── /blog ← Impact stories & testimonials
├── /contact
├── /quote ← Multi-step quotation form
└── /dashboard ← Future password-protected (Ministry + Schools)

## 4. Must-Have Features for MVP Launch

- Fully responsive + PWA (offline quote saving for rural 3G)
- Bilingual: English + siSwati (i18next toggle top-right)
- Downloadable Ministry Proposal PDF (exact file you uploaded)
- One-page partnership infographic (we’ll design next week)
- Tour catalogue with filters: Grade | Subject | Duration | Destination | Price Range
- Quote request form → auto-email + Supabase storage
- Safety & Insurance page with visible certificates
- WhatsApp floating button → +268 76120713 & +268 76760952
- Basic analytics (Vercel + PostHog)

## 5. Official Branding (LOCKED FROM BUSINESS CARD & FLYERS)

- **Company Name:** WorldWise Educational Tours
- **Tagline:** Connecting Learning with Exploration
- **Managing Director:** Nelsiwe Nicky Ndwandwe
- **Contact:**
  - Phone: +268 7612 0713 / +268 7676 0952
  - Email: worldwisedutours@gmail.com
  - WhatsApp: +268 7612 0713 & +268 7676 0952
  - Location: Mbabane, Eswatini
- **Color Palette:**
  - Primary Navy: `#001F3F`
  - Accent Teal: `#008080`
  - Highlight Green-Yellow: `#ADFF2F`
  - Neutral Gray: `#2C3E50`
- **Fonts:**
  - Headings: Montserrat Bold
  - Body: Inter Regular
- **Logo:** Globe icon + “WorldWise Educational Tours” (high-res from business card)

## 6. Real Sample Tours (from your flyers – these go live Day 1)

1. **One-Day City-to-City Tour** – Mbabane → Ezulwini → Matsapha → Manzini  
   Price: SZL 320–420 per learner
2. **One-Day School Educational Tour (Eswatini)** – Mantenga + Mlilwane  
   Price: SZL 320–420 per learner
3. **3-Day Mozambique Science, Innovation, Culture & Nature Tour**  
   Prices:
   - 40+ learners → ~ZAR 3,500 pp
   - 30–39 learners → ~ZAR 3,900 pp
   - 20–29 learners → ~ZAR 4,400 pp
   - Teachers: 1 free per 15 learners

## 7. Content Assets We Already Own (ready for upload)

- Business card (logo + contact)
- 4 high-res tour flyers (gallery + program pages)
- Full Ministry Proposal DOCX (convert → branded PDF)
- Implementation Plan DOCX (extract Gantt → timeline section)

## 8. Domain & Socials

- Preferred domain: **worldwise.co.sz** (register ASAP)  
  Fallback: worldwisetours.com
- Facebook: Worldwise Educational Tour
- WhatsApp Business: +268 7612 0713

## 9. 10x Future-Proof Features (already planned)

- Supabase Auth → Ministry & School dashboards (real-time reports)
- Payment integration: EPS + MTN MoMo + Ecocash
- AI tour recommender (match curriculum to destinations)
- Student/parent mobile app (React Native later)
- VR/360° tour previews (low-bandwidth fallback images)
