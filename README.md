# PilotStack Demo

A comprehensive SaaS platform demo showcasing role-based dashboards for buyers, founders, and administrators.

## Features

### 🛒 Buyer Dashboard
- **SaaS Marketplace**: Browse and search through verified SaaS products
- **Product Discovery**: Filter by category, delivery options, and features
- **Interactive Demos**: Full product experiences with realistic data and workflows
- **Purchase Flow**: Complete purchase wizard with brand customization (one-time pricing)
- **Delivery Management**: Track deployment progress and access source code

### 🚀 Founder Dashboard
- **Payment Configuration**: Set up Stripe and Polar payment processors
- **Demo Configuration**: Configure safety modes, warm pools, and allowlists
- **Brand Kit Editor**: Customize brand identity and visual themes
- **Guides Editor**: Create interactive demo tours
- **Analytics**: Track demo performance and conversion metrics

### ⚙️ Admin Dashboard
- **Review Queue**: Approve or reject pending SaaS listings
- **Platform Monitoring**: Real-time system health and performance metrics
- **Allowlist Management**: AI-suggested and manual allowlist management
- **Dispute Management**: Handle payment disputes and refunds

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: Radix UI + Tailwind CSS
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Theme**: Next-themes for dark/light mode support

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Demo Accounts

Use these email addresses to test different user roles, or click the quick login buttons on the login page:

- **Buyer**: `buyer@example.com` - Browse and purchase SaaS products
- **Founder**: `founder@example.com` - Manage platform configuration and analytics
- **Admin**: `admin@example.com` - Platform administration and monitoring

## Project Structure

```
pilotstack-demo/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── admin/             # Admin-specific components
│   ├── founder/           # Founder-specific components
│   └── ui/               # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and data
└── public/               # Static assets
```

## Key Components

### Core Dashboards
- `BuyerDashboard`: SaaS marketplace with search and purchase flow
- `FounderDashboard`: Platform configuration and analytics
- `AdminDashboard`: Platform administration and monitoring

### Feature Components
- `PurchaseWizard`: Multi-step purchase flow with brand customization
- `DemoModal`: Interactive demo environment with guided tours
- `DeliveryView`: Post-purchase delivery tracking and management
- `ReviewQueue`: Admin interface for listing approval
- `DisputeManager`: Payment dispute resolution system

### Configuration Components
- `PaymentConfiguration`: Stripe and Polar payment setup
- `DemoConfiguration`: Demo safety and environment settings
- `BrandKitEditor`: Brand customization interface
- `GuidesEditor`: Interactive tour creation tool

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm run lint
```

## Features Implemented

✅ **Complete Authentication System** with role-based access
✅ **Responsive UI** with modern design system
✅ **Interactive Demos** with full product experiences for TaskFlow Pro and DataVault Analytics
✅ **Payment Integration** with multiple processors (one-time pricing model)
✅ **Admin Tools** for platform management
✅ **Analytics Dashboard** with real-time metrics
✅ **Brand Customization** with visual theme editor
✅ **Dispute Management** for payment issues
✅ **Allowlist Management** with AI suggestions
✅ **Review System** for SaaS listings

## Contributing

This is a demo application showcasing a SaaS platform. All components are fully functional and ready for demonstration purposes.

## License

This project is for demonstration purposes only.
