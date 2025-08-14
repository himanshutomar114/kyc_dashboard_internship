This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# KYC Dashboard - Next.js Project

A Next.js dashboard for KYC statistics, featuring status cards, PAN data stats, solicited/unsolicited charts, and dark mode toggle. Built with **React**, **Tailwind CSS**, and **Heroicons**.

---

## Features

- KYC Status Cards with dynamic counts
- Solicited/Unsolicited circular charts
- PAN Data Statistics section
- Toggle between Individual / Non Individual data
- Date filters: Today / Yesterday
- Dark mode support
- Fully responsive design
- Next.js API routes for mock data (`/api/mockKYCData`)

---

## Project Structure

src/
├─ app/
│ └─ dashboard/
│ ├─ components/
│ │ ├─ CategoriesSection.tsx
│ │ ├─ KYCStatusCard.tsx
│ │ ├─ CircularChartSkeleton.tsx
│ │ ├─ KYCCard.tsx
│ │ ├─ Navbar.tsx
│ │ ├─ PanSection.tsx
│ │ ├─ Solicited.tsx
│ │ ├─ Sidebar.tsx
│ │ ├─ BarChart.tsx
│ └─ page.tsx
├─ hooks/
│ └─ useKYCData.ts
├─ data/
│ └─ mockKYCData.json
├─ pages/
│ └─ api/
│ └─ mockKYC.ts
└─ styles/
└─ globals.css




