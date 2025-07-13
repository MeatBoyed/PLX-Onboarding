// PluxNet Fibre Theme Configuration
export const pluxnetTheme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main primary color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b', // Main secondary color
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef', // Main accent color
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main success color
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main warning color
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Main error color
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  branding: {
    companyName: 'PluxNet Fibre',
    logo: '/pluxnet-logo.svg', // Add your logo here
    tagline: 'Get connected with lightning-fast fibre internet',
    supportEmail: 'support@pluxnet.co.za',
    supportPhone: '+27 11 800 1234',
  },
  gradients: {
    primary: 'from-blue-50 via-white to-purple-50',
    primaryDark: 'from-blue-900 via-blue-800 to-purple-900',
    card: 'bg-white/80 backdrop-blur-sm',
    cardDark: 'bg-gray-900/80 backdrop-blur-sm',
  },
  spacing: {
    containerPadding: 'py-8 px-4',
    cardPadding: 'p-8',
    sectionSpacing: 'space-y-6',
  },
  animations: {
    transition: 'transition-all duration-300 ease-in-out',
    hover: 'hover:shadow-lg hover:scale-105',
    cardHover: 'hover:shadow-md hover:border-primary',
  }
};

// CSS Custom Properties for dynamic theming
export const cssVariables = `
:root {
  --color-primary: ${pluxnetTheme.colors.primary[500]};
  --color-primary-50: ${pluxnetTheme.colors.primary[50]};
  --color-primary-100: ${pluxnetTheme.colors.primary[100]};
  --color-primary-500: ${pluxnetTheme.colors.primary[500]};
  --color-primary-600: ${pluxnetTheme.colors.primary[600]};
  --color-primary-700: ${pluxnetTheme.colors.primary[700]};
  
  --color-secondary: ${pluxnetTheme.colors.secondary[500]};
  --color-secondary-100: ${pluxnetTheme.colors.secondary[100]};
  --color-secondary-600: ${pluxnetTheme.colors.secondary[600]};
  
  --color-accent: ${pluxnetTheme.colors.accent[500]};
  --color-success: ${pluxnetTheme.colors.success[500]};
  --color-warning: ${pluxnetTheme.colors.warning[500]};
  --color-error: ${pluxnetTheme.colors.error[500]};
}
`;

// Utility function to get theme colors
export const getThemeColor = (colorPath: string): string => {
  const paths = colorPath.split('.');
  let result: Record<string, unknown> = pluxnetTheme.colors;
  
  for (const path of paths) {
    if (result && typeof result === 'object' && path in result) {
      result = result[path] as Record<string, unknown>;
    } else {
      return '';
    }
  }
  
  return result as unknown as string;
};

// Theme utility classes
export const themeClasses = {
  // Primary colors
  primaryBg: 'bg-blue-500',
  primaryText: 'text-blue-500',
  primaryBorder: 'border-blue-500',
  primaryHover: 'hover:bg-blue-600',
  
  // Secondary colors  
  secondaryBg: 'bg-gray-500',
  secondaryText: 'text-gray-500',
  secondaryBorder: 'border-gray-500',
  
  // Accent colors
  accentBg: 'bg-purple-500',
  accentText: 'text-purple-500',
  accentBorder: 'border-purple-500',
  
  // Status colors
  successBg: 'bg-green-500',
  successText: 'text-green-500',
  warningBg: 'bg-yellow-500',
  warningText: 'text-yellow-500',
  errorBg: 'bg-red-500',
  errorText: 'text-red-500',
  
  // Common combinations
  primaryButton: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondaryButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  accentButton: 'bg-purple-500 hover:bg-purple-600 text-white',
  
  // Cards and containers
  card: 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg',
  cardHover: 'hover:shadow-xl hover:border-blue-300 transition-all duration-300',
  
  // Gradients
  backgroundGradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
};
