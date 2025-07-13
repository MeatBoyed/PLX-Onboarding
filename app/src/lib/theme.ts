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
        website: string;
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

// Extend Window interface to include theme storage
declare global {
    interface Window {
        __currentTheme?: BrandTheme;
    }
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
        website: 'https://pluxnet.co.za',
    },
    spacing: {
        containerPadding: 'py-8 px-4',
        cardPadding: 'p-8',
        sectionSpacing: 'space-y-6',
    },
    animations: {
        transition: 'transition-all duration-300 ease-in-out',
        hover: 'hover:shadow-lg hover:scale-105',
        cardHover: 'hover:shadow-md hover:border-[var(--brand-primary)]',
    }
};

/**
 * Apply a theme by setting CSS custom properties
 * Call this function to switch themes at runtime
 */
export function applyTheme(theme: BrandTheme) {
    if (typeof document === 'undefined') return; // SSR safety
    
    const root = document.documentElement;

    // Apply all color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
        // Convert camelCase to kebab-case for CSS variables
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
    });

    // Store current theme data for components to access
    window.__currentTheme = theme;
}

/**
 * Get the currently active theme
 */
export function getCurrentTheme(): BrandTheme {
    // Try to get from stored theme first
    if (typeof window !== 'undefined' && window.__currentTheme) {
        return window.__currentTheme;
    }

    // Fallback to reading from CSS (colors only)
    if (typeof window !== 'undefined') {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        return {
            ...pluxnetTheme,
            colors: {
                brandPrimary: computedStyle.getPropertyValue('--brand-primary').trim() || pluxnetTheme.colors.brandPrimary,
                brandPrimaryHover: computedStyle.getPropertyValue('--brand-primary-hover').trim() || pluxnetTheme.colors.brandPrimaryHover,
                brandSecondary: computedStyle.getPropertyValue('--brand-secondary').trim() || pluxnetTheme.colors.brandSecondary,
                brandAccent: computedStyle.getPropertyValue('--brand-accent').trim() || pluxnetTheme.colors.brandAccent,
                textPrimary: computedStyle.getPropertyValue('--text-primary').trim() || pluxnetTheme.colors.textPrimary,
                textSecondary: computedStyle.getPropertyValue('--text-secondary').trim() || pluxnetTheme.colors.textSecondary,
                textTertiary: computedStyle.getPropertyValue('--text-tertiary').trim() || pluxnetTheme.colors.textTertiary,
                textMuted: computedStyle.getPropertyValue('--text-muted').trim() || pluxnetTheme.colors.textMuted,
                surfaceCard: computedStyle.getPropertyValue('--surface-card').trim() || pluxnetTheme.colors.surfaceCard,
                surfaceWhite: computedStyle.getPropertyValue('--surface-white').trim() || pluxnetTheme.colors.surfaceWhite,
                surfaceBorder: computedStyle.getPropertyValue('--surface-border').trim() || pluxnetTheme.colors.surfaceBorder,
                buttonPrimary: computedStyle.getPropertyValue('--button-primary').trim() || pluxnetTheme.colors.buttonPrimary,
                buttonPrimaryHover: computedStyle.getPropertyValue('--button-primary-hover').trim() || pluxnetTheme.colors.buttonPrimaryHover,
                buttonPrimaryText: computedStyle.getPropertyValue('--button-primary-text').trim() || pluxnetTheme.colors.buttonPrimaryText,
                buttonSecondary: computedStyle.getPropertyValue('--button-secondary').trim() || pluxnetTheme.colors.buttonSecondary,
                buttonSecondaryHover: computedStyle.getPropertyValue('--button-secondary-hover').trim() || pluxnetTheme.colors.buttonSecondaryHover,
                buttonSecondaryText: computedStyle.getPropertyValue('--button-secondary-text').trim() || pluxnetTheme.colors.buttonSecondaryText,
            },
        };
    }

    return pluxnetTheme;
}

// Theme utility classes using CSS variables
export const themeClasses = {
    // Primary colors
    primaryBg: 'bg-[var(--brand-primary)]',
    primaryText: 'text-[var(--brand-primary)]',
    primaryBorder: 'border-[var(--brand-primary)]',
    primaryHover: 'hover:bg-[var(--brand-primary-hover)]',

    // Secondary colors
    secondaryBg: 'bg-[var(--brand-secondary)]',
    secondaryText: 'text-[var(--text-secondary)]',
    secondaryBorder: 'border-[var(--surface-border)]',

    // Accent colors
    accentBg: 'bg-[var(--brand-accent)]',
    accentText: 'text-[var(--brand-accent)]',
    accentBorder: 'border-[var(--brand-accent)]',

    // Status colors
    successBg: 'bg-green-500',
    successText: 'text-green-500',
    warningBg: 'bg-yellow-500',
    warningText: 'text-yellow-500',
    errorBg: 'bg-red-500',
    errorText: 'text-red-500',

    // Text colors
    textPrimary: 'text-[var(--text-primary)]',
    textSecondary: 'text-[var(--text-secondary)]',
    textTertiary: 'text-[var(--text-tertiary)]',
    textMuted: 'text-[var(--text-muted)]',

    // Common button combinations
    primaryButton: 'bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--button-primary-text)]',
    secondaryButton: 'bg-[var(--button-secondary)] hover:bg-[var(--button-secondary-hover)] text-[var(--button-secondary-text)] border border-[var(--brand-primary)]',
    accentButton: 'bg-[var(--brand-accent)] hover:bg-red-600 text-white',

    // Cards and containers
    card: 'bg-[var(--surface-white)] border border-[var(--surface-border)] shadow-lg',
    cardHover: 'hover:shadow-xl hover:border-[var(--brand-primary)] transition-all duration-300',
    surfaceCard: 'bg-[var(--surface-card)]',

    // Gradients
    backgroundGradient: 'bg-gradient-to-br from-purple-50 via-white to-red-50',
};
