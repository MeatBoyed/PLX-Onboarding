// Brand Theme Configuration
export interface BrandTheme {
    name: string;
    colors: {
        brandPrimary: string;
        brandPrimaryHover: string;
        brandSecondary: string;
        brandAccent: string;
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        textMuted: string;
        surfaceCard: string;
        surfaceWhite: string;
        surfaceBorder: string;
        buttonPrimary: string;
        buttonPrimaryHover: string;
        buttonPrimaryText: string;
        buttonSecondary: string;
        buttonSecondaryHover: string;
        buttonSecondaryText: string;
    };
    images: {
        logo: string;
        logoWhite: string;
        connectCardBackground: string;
        bannerOverlay: string;
        favicon: string;
    };
    branding: {
        companyName: string;
        tagline: string;
        supportEmail: string;
        supportPhone: string;
    };
    spacing: {
        containerPadding: string;
        cardPadding: string;
        sectionSpacing: string;
    };
    animations: {
        transition: string;
        hover: string;
        cardHover: string;
    };
}

// Default PluxNet theme
export const pluxnetTheme: BrandTheme = {
    name: "PluxNet",
    colors: {
        brandPrimary: "#301358",
        brandPrimaryHover: "#5B3393",
        brandSecondary: "#F2F2F2",
        brandAccent: "#F60031",
        textPrimary: "#181818",
        textSecondary: "#5D5D5D",
        textTertiary: "#7A7A7A",
        textMuted: "#CECECE",
        surfaceCard: "#F2F2F2",
        surfaceWhite: "#FFFFFF",
        surfaceBorder: "#CECECE",
        buttonPrimary: "#301358",
        buttonPrimaryHover: "#5B3393",
        buttonPrimaryText: "#FFFFFF",
        buttonSecondary: "#FFFFFF",
        buttonSecondaryHover: "#f5f5f5",
        buttonSecondaryText: "#301358",
    },
    images: {
        logo: "/pluxnet-logo.svg",
        logoWhite: "/pluxnet-logo-white.svg",
        connectCardBackground: "/internet-claim-bg.png",
        bannerOverlay: "/banner-overlay.png",
        favicon: "/favicon.svg",
    },
    branding: {
        companyName: 'PluxNet Fibre',
        tagline: 'High-Speed Fibre Internet',
        supportEmail: 'support@pluxnet.co.za',
        supportPhone: '011 123 4567',
    },
    spacing: {
        containerPadding: 'py-8 px-4',
        cardPadding: 'p-8',
        sectionSpacing: 'space-y-6',
    },
    animations: {
        transition: 'transition-all duration-300 ease-in-out',
        hover: 'hover:shadow-lg hover:scale-105',
        cardHover: 'hover:shadow-md hover:border-[#301358]',
    }
};

// Theme utility classes with PluxNet branding
export const themeClasses = {
    // Primary colors (PluxNet Purple #301358)
    primaryBg: 'bg-[#301358]',
    primaryText: 'text-[#301358]',
    primaryBorder: 'border-[#301358]',
    primaryHover: 'hover:bg-[#5B3393]',

    // Secondary colors (Light Gray #F2F2F2)
    secondaryBg: 'bg-[#F2F2F2]',
    secondaryText: 'text-[#5D5D5D]',
    secondaryBorder: 'border-[#CECECE]',

    // Accent colors (PluxNet Red #F60031)
    accentBg: 'bg-[#F60031]',
    accentText: 'text-[#F60031]',
    accentBorder: 'border-[#F60031]',

    // Status colors
    successBg: 'bg-green-500',
    successText: 'text-green-500',
    warningBg: 'bg-yellow-500',
    warningText: 'text-yellow-500',
    errorBg: 'bg-red-500',
    errorText: 'text-red-500',

    // Text colors
    textPrimary: 'text-[#181818]',
    textSecondary: 'text-[#5D5D5D]',
    textTertiary: 'text-[#7A7A7A]',
    textMuted: 'text-[#CECECE]',

    // Common button combinations
    primaryButton: 'bg-[#301358] hover:bg-[#5B3393] text-white',
    secondaryButton: 'bg-white hover:bg-[#f5f5f5] text-[#301358] border border-[#301358]',
    accentButton: 'bg-[#F60031] hover:bg-red-600 text-white',

    // Cards and containers
    card: 'bg-white border border-[#CECECE] shadow-lg',
    cardHover: 'hover:shadow-xl hover:border-[#301358] transition-all duration-300',
    surfaceCard: 'bg-[#F2F2F2]',

    // Gradients
    backgroundGradient: 'bg-gradient-to-br from-purple-50 via-white to-red-50',
};
