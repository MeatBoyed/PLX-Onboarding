# PluxNet Fibre Onboarding Application

A modern, responsive onboarding form for PluxNet Fibre internet service, built with Next.js 15, TypeScript, React Hook Form, Zod validation, and ShadCN UI components.

## Features

- ✅ **Multi-step onboarding process** with location selection, package selection, personal details, and order confirmation
- ✅ **Real-time form validation** using React Hook Form + Zod schemas
- ✅ **Professional PluxNet branding** with custom color scheme and theming
- ✅ **Responsive design** optimized for desktop and mobile devices
- ✅ **Type-safe development** with TypeScript throughout
- ✅ **Modern UI components** using ShadCN UI and TailwindCSS
- ✅ **Enterprise-level validation** ensuring data accuracy and quality

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI components
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **State Management**: React hooks with MVC architecture

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Docker (optional, for containerized deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PLX-Onboarding/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Docker Deployment

### Production Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

### Development with Docker

1. **Run development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Development with hot reloading**
   The development container will mount your source code and provide hot reloading.

### Available Docker Commands

```bash
# Build production image
docker build -t plx-onboarding .

# Run production container
docker run -p 3000:3000 plx-onboarding

# Build development image
docker build -f Dockerfile.dev -t plx-onboarding:dev .

# Run with docker-compose (production)
docker-compose up -d

# Run with docker-compose (development)
docker-compose -f docker-compose.dev.yml up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f plx-onboarding
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/             # React components
│   ├── OnboardingForm.tsx  # Main form wrapper
│   ├── steps/              # Form step components
│   │   ├── LocationStep.tsx
│   │   ├── PackageStep.tsx
│   │   ├── PersonalDetailsStep.tsx
│   │   └── ConfirmationStep.tsx
│   └── ui/                 # ShadCN UI components
├── controllers/            # Business logic
│   └── onboardingController.ts
├── models/                 # Data models and schemas
│   └── onboarding.ts
└── lib/                    # Utilities and configurations
    ├── theme.ts            # PluxNet theme configuration
    └── utils.ts            # Utility functions
```

## Form Validation

The application implements comprehensive client-side validation using React Hook Form with Zod schemas:

### Validation Features
- **Real-time validation** on field blur and form submission
- **Type-safe schemas** ensuring data integrity
- **Custom validation rules** for South African phone numbers, addresses, etc.
- **Required field enforcement** preventing submission of incomplete forms
- **Format validation** for emails, phone numbers, WiFi passwords, etc.

### Validation Rules
- **Names**: 2-50 characters, letters/spaces/hyphens/apostrophes only
- **Phone**: 10-15 digits with proper format validation
- **Email**: Full email validation with length limits
- **Address**: 5-200 characters with valid address characters
- **Stand Number**: Required with alphanumeric validation
- **WiFi Name**: 3-32 characters, proper naming format
- **WiFi Password**: 8-64 characters, must contain letters + numbers

## PluxNet Branding

The application features custom PluxNet branding:

- **Primary Color**: Purple (#301358)
- **Accent Color**: Red (#F60031)
- **Background**: Light Gray (#F2F2F2)
- **Professional ISP styling** throughout the user journey

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any required environment variables here
NEXT_PUBLIC_API_URL=your_api_endpoint
```

## Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Docker
docker-compose up    # Run production environment
docker-compose -f docker-compose.dev.yml up  # Run development environment
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@pluxnet.co.za or call +27 11 800 1234.
