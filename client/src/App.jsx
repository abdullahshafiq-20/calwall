import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, RefreshCw, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

// Theme presets
const THEMES = [
  {
    name: "Cyberpunk Neon",
    emoji: "1️⃣",
    colors: {
      bgcolor: '0b0f19',
      passedcolor: '00ffe1',
      currentcolor: 'ff00ff',
      futurecolor: '1b1f3b',
      textcolor: '00ffe1'
    }
  },
  {
    name: "Cyberpunk Purple",
    emoji: "2️⃣",
    colors: {
      bgcolor: '120a2a',
      passedcolor: 'a855f7',
      currentcolor: 'ec4899',
      futurecolor: '23124d',
      textcolor: 'e9d5ff'
    }
  },
  {
    name: "Matrix Green",
    emoji: "3️⃣",
    colors: {
      bgcolor: '000f0a',
      passedcolor: '00ff6a',
      currentcolor: 'a7f3d0',
      futurecolor: '002211',
      textcolor: '00ff6a'
    }
  },
  {
    name: "Hacker Dark",
    emoji: "4️⃣",
    colors: {
      bgcolor: '0d1117',
      passedcolor: '58a6ff',
      currentcolor: 'f78166',
      futurecolor: '21262d',
      textcolor: 'c9d1d9'
    }
  },
  {
    name: "AMOLED Black",
    emoji: "5️⃣",
    colors: {
      bgcolor: '000000',
      passedcolor: 'ffffff',
      currentcolor: 'facc15',
      futurecolor: '222222',
      textcolor: 'ffffff'
    }
  },
  {
    name: "Minimal Grey",
    emoji: "6️⃣",
    colors: {
      bgcolor: 'f4f4f5',
      passedcolor: '09090b',
      currentcolor: 'f97316',
      futurecolor: 'd4d4d8',
      textcolor: '09090b'
    }
  },
  {
    name: "Soft Pastel",
    emoji: "7️⃣",
    colors: {
      bgcolor: 'faf5ff',
      passedcolor: 'c084fc',
      currentcolor: 'fb7185',
      futurecolor: 'e9d5ff',
      textcolor: '4a044e'
    }
  },
  {
    name: "Sunset Orange",
    emoji: "8️⃣",
    colors: {
      bgcolor: '331212',
      passedcolor: 'fb923c',
      currentcolor: 'fde047',
      futurecolor: '592424',
      textcolor: 'fff7ed'
    }
  },
  {
    name: "Ocean Blue",
    emoji: "9️⃣",
    colors: {
      bgcolor: '08233c',
      passedcolor: '38bdf8',
      currentcolor: '67e8f9',
      futurecolor: '1e3a5f',
      textcolor: 'e0f2fe'
    }
  },
  {
    name: "Forest Green",
    emoji: "🔟",
    colors: {
      bgcolor: '0a1f14',
      passedcolor: '22c55e',
      currentcolor: 'a7f3d0',
      futurecolor: '103d2c',
      textcolor: 'dcfce7'
    }
  },
  {
    name: "Lavender Dream",
    emoji: "1️⃣1️⃣",
    colors: {
      bgcolor: '2a183d',
      passedcolor: 'c4b5fd',
      currentcolor: 'f472b6',
      futurecolor: '3f2a5a',
      textcolor: 'f5f3ff'
    }
  },
  {
    name: "Rose Gold",
    emoji: "1️⃣2️⃣",
    colors: {
      bgcolor: '221a1a',
      passedcolor: 'fda4af',
      currentcolor: 'fb7185',
      futurecolor: '403030',
      textcolor: 'fff1f2'
    }
  },
  {
    name: "Coffee Brown",
    emoji: "1️⃣3️⃣",
    colors: {
      bgcolor: '24140c',
      passedcolor: 'd6a15e',
      currentcolor: 'fde68a',
      futurecolor: '3a2617',
      textcolor: 'fef3c7'
    }
  },
  {
    name: "Solarized Dark",
    emoji: "1️⃣4️⃣",
    colors: {
      bgcolor: '00222b',
      passedcolor: '2aa198',
      currentcolor: 'b58900',
      futurecolor: '00333f',
      textcolor: 'eee8d5'
    }
  },
  {
    name: "Solarized Light",
    emoji: "1️⃣5️⃣",
    colors: {
      bgcolor: 'fdf6e3',
      passedcolor: '00736f',
      currentcolor: 'b58900',
      futurecolor: 'e5dcc4',
      textcolor: '002b36'
    }
  },
  {
    name: "Retro Neon",
    emoji: "1️⃣6️⃣",
    colors: {
      bgcolor: '0f0c29',
      passedcolor: 'ff0080',
      currentcolor: '00eaff',
      futurecolor: '1a153f',
      textcolor: 'fdf4ff'
    }
  },
  {
    name: "Vaporwave",
    emoji: "1️⃣7️⃣",
    colors: {
      bgcolor: '230b33',
      passedcolor: 'f472b6',
      currentcolor: '67e8f9',
      futurecolor: '3b104f',
      textcolor: 'fde2f3'
    }
  },
  {
    name: "Arctic Ice",
    emoji: "1️⃣8️⃣",
    colors: {
      bgcolor: 'f0f9ff',
      passedcolor: '0ea5e9',
      currentcolor: '06b6d4',
      futurecolor: 'cfeffd',
      textcolor: '0c4a6e'
    }
  },
  {
    name: "Midnight Gold",
    emoji: "1️⃣9️⃣",
    colors: {
      bgcolor: '0b0b0f',
      passedcolor: 'facc15',
      currentcolor: 'fde047',
      futurecolor: '25252b',
      textcolor: 'fff7d6'
    }
  },
  {
    name: "Blood Red",
    emoji: "2️⃣0️⃣",
    colors: {
      bgcolor: '100000',
      passedcolor: 'dc2626',
      currentcolor: 'ef4444',
      futurecolor: '2d0000',
      textcolor: 'fee2e2'
    }
  }
];

// iOS Device Presets
const IOS_DEVICES = [
  { name: "iPhone 16 Pro Max", width: 1320, height: 2868 },
  { name: "iPhone 16 Pro", width: 1206, height: 2622 },
  { name: "iPhone 16 Plus", width: 1290, height: 2796 },
  { name: "iPhone 16", width: 1179, height: 2556 },
  { name: "iPhone 15 Pro Max", width: 1290, height: 2796 },
  { name: "iPhone 15 Pro", width: 1179, height: 2556 },
  { name: "iPhone 15 Plus", width: 1290, height: 2796 },
  { name: "iPhone 15", width: 1179, height: 2556 },
  { name: "iPhone 14 Pro Max", width: 1290, height: 2796 },
  { name: "iPhone 14 Pro", width: 1179, height: 2556 },
  { name: "iPhone 14 Plus", width: 1284, height: 2778 },
  { name: "iPhone 14", width: 1170, height: 2532 },
  { name: "iPhone 13 Pro Max", width: 1284, height: 2778 },
  { name: "iPhone 13 Pro", width: 1170, height: 2532 },
  { name: "iPhone 13", width: 1170, height: 2532 },
  { name: "iPhone 13 mini", width: 1080, height: 2340 },
  { name: "iPhone 12 Pro Max", width: 1284, height: 2778 },
  { name: "iPhone 12 Pro", width: 1170, height: 2532 },
  { name: "iPhone 12", width: 1170, height: 2532 },
  { name: "iPhone 12 mini", width: 1080, height: 2340 },
  { name: "iPhone 11 Pro Max", width: 1242, height: 2688 },
  { name: "iPhone 11 Pro", width: 1125, height: 2436 },
  { name: "iPhone 11", width: 828, height: 1792 },
  { name: "iPhone XS Max", width: 1242, height: 2688 },
  { name: "iPhone XS", width: 1125, height: 2436 },
  { name: "iPhone XR", width: 828, height: 1792 },
  { name: "iPhone X", width: 1125, height: 2436 },
  { name: "iPhone 8 Plus", width: 1080, height: 1920 },
  { name: "iPhone 8", width: 750, height: 1334 },
  { name: "iPhone SE (3rd gen)", width: 750, height: 1334 },
  { name: "iPhone SE (2nd gen)", width: 750, height: 1334 },
];

// Common Timezones
const TIMEZONES = [
  { name: "UTC-12:00 (Baker Island)", offset: -12 },
  { name: "UTC-11:00 (American Samoa)", offset: -11 },
  { name: "UTC-10:00 (Hawaii)", offset: -10 },
  { name: "UTC-09:00 (Alaska)", offset: -9 },
  { name: "UTC-08:00 (Pacific Time)", offset: -8 },
  { name: "UTC-07:00 (Mountain Time)", offset: -7 },
  { name: "UTC-06:00 (Central Time)", offset: -6 },
  { name: "UTC-05:00 (Eastern Time)", offset: -5 },
  { name: "UTC-04:00 (Atlantic Time)", offset: -4 },
  { name: "UTC-03:00 (Buenos Aires)", offset: -3 },
  { name: "UTC-02:00 (Mid-Atlantic)", offset: -2 },
  { name: "UTC-01:00 (Azores)", offset: -1 },
  { name: "UTC+00:00 (London, UTC)", offset: 0 },
  { name: "UTC+01:00 (Paris, Berlin)", offset: 1 },
  { name: "UTC+02:00 (Cairo, Athens)", offset: 2 },
  { name: "UTC+03:00 (Moscow, Istanbul)", offset: 3 },
  { name: "UTC+04:00 (Dubai)", offset: 4 },
  { name: "UTC+05:00 (Pakistan)", offset: 5 },
  { name: "UTC+05:30 (India)", offset: 5.5 },
  { name: "UTC+06:00 (Bangladesh)", offset: 6 },
  { name: "UTC+07:00 (Bangkok)", offset: 7 },
  { name: "UTC+08:00 (Singapore, Beijing)", offset: 8 },
  { name: "UTC+09:00 (Tokyo, Seoul)", offset: 9 },
  { name: "UTC+10:00 (Sydney)", offset: 10 },
  { name: "UTC+11:00 (Solomon Islands)", offset: 11 },
  { name: "UTC+12:00 (Fiji, New Zealand)", offset: 12 },
  { name: "UTC+13:00 (Tonga)", offset: 13 },
  { name: "UTC+14:00 (Line Islands)", offset: 14 },
];

export default function App() {
  const canvasRef = useRef(null);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a preference saved
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // State for wallpaper customization
  const [config, setConfig] = useState({
    width: 1080,
    height: 2400,
    mode: 'month',
    timezone: 5,
    paddingtop: 0,
    paddingbottom: 0,
    paddingleft: 0,
    paddingright: 0,
    bgcolor: '71717a',
    passedcolor: 'f97316',
    currentcolor: 'fbbf24',
    futurecolor: '52525b',
    textcolor: 'ffffff',
    cols: 15,
    dotradius: 1.0
  });

  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState('');

  // Track carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentStep(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect(); // Set initial value

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Handle device selection
  const handleDeviceChange = (deviceIndex) => {
    setSelectedDevice(deviceIndex);
    if (deviceIndex === '') return;
    const device = IOS_DEVICES[parseInt(deviceIndex)];
    if (device) {
      setConfig(prev => ({
        ...prev,
        width: device.width,
        height: device.height
      }));
      toast.success(`Applied ${device.name} dimensions (${device.width}×${device.height})`);
    }
  };

  // Base API URL
  const API_BASE = SERVER_URL;

  // Generate wallpaper URL (only for copying/downloading)
  const generateApiUrl = () => {
    const params = new URLSearchParams();
    Object.entries(config).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    return `${API_BASE}/api/wallpaper/getCalWall?${params.toString()}`;
  };

  // Update URL when config changes
  useEffect(() => {
    setWallpaperUrl(generateApiUrl());
  }, [config]);

  // Draw wallpaper on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const displayWidth = 288; // iPhone display width in the UI
    const displayHeight = displayWidth * (config.height / config.width);
    canvas.width = config.width;
    canvas.height = config.height;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Calculate days with timezone adjustment
    const now = new Date();
    const localTime = new Date(now.getTime() + (config.timezone * 60 * 60 * 1000));

    let totalDays, daysPassed, title;

    if (config.mode === 'month') {
      const nextMonth = new Date(localTime.getFullYear(), localTime.getMonth() + 1, 1);
      const thisMonth = new Date(localTime.getFullYear(), localTime.getMonth(), 1);
      totalDays = Math.floor((nextMonth - thisMonth) / (1000 * 60 * 60 * 24));
      daysPassed = localTime.getDate();
      title = localTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
      const isLeapYear = (localTime.getFullYear() % 4 === 0 &&
        (localTime.getFullYear() % 100 !== 0 || localTime.getFullYear() % 400 === 0));
      totalDays = isLeapYear ? 366 : 365;

      const startOfYear = new Date(localTime.getFullYear(), 0, 1);
      daysPassed = Math.ceil((localTime - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
      title = `Year ${localTime.getFullYear()}`;
    }

    // Calculate days left
    const daysLeft = totalDays - daysPassed;
    const percentComplete = Math.floor((daysPassed / totalDays) * 100);

    // Grid layout
    const rows = Math.ceil(totalDays / config.cols);

    // Auto-layout: Calculate available space after padding
    const availableWidth = config.width - config.paddingleft - config.paddingright;
    const availableHeight = config.height - config.paddingtop - config.paddingbottom;

    // Reserve space for text at bottom (font size + spacing)
    const estimatedFontSize = Math.floor(config.width / 25);
    const textReservedSpace = estimatedFontSize * 3; // Font size + spacing above and below

    // Calculate maximum spacing that fits in both width and height
    const maxSpacingWidth = Math.floor(availableWidth / (config.cols + 1));
    const maxSpacingHeight = Math.floor((availableHeight - textReservedSpace) / (rows + 1));

    // Use the smaller of the two to ensure it fits in both dimensions
    const spacing = Math.min(maxSpacingWidth, maxSpacingHeight);

    // Calculate dot size based on spacing (with radius multiplier)
    const baseDotSize = Math.floor(spacing * 0.6); // 60% of spacing
    const dotSize = baseDotSize * config.dotradius;

    // Calculate actual grid dimensions
    const gridWidth = config.cols * spacing;
    const gridHeight = rows * spacing;

    // Center the grid within available space
    const startX = config.paddingleft + Math.floor((availableWidth - gridWidth) / 2);
    const startY = config.paddingtop + Math.floor((availableHeight - gridHeight - textReservedSpace) / 2);

    // Background
    ctx.fillStyle = `#${config.bgcolor}`;
    ctx.fillRect(0, 0, config.width, config.height);

    // Draw dots
    for (let i = 0; i < totalDays; i++) {
      const row = Math.floor(i / config.cols);
      const col = i % config.cols;
      const x = startX + col * spacing + spacing / 2;
      const y = startY + row * spacing + spacing / 2;

      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);

      if (i < daysPassed - 1) {
        // Passed days
        ctx.fillStyle = `#${config.passedcolor}`;
      } else if (i === daysPassed - 1) {
        // Current day
        ctx.fillStyle = `#${config.currentcolor}`;
      } else {
        // Future days
        ctx.fillStyle = `#${config.futurecolor}`;
      }
      ctx.fill();
    }

    // Bottom text - Auto-positioned below grid with safe spacing
    const bottomY = startY + gridHeight + Math.floor(textReservedSpace / 2);

    // Set font for bottom text
    ctx.fillStyle = `#${config.textcolor}`;
    const fontSize = Math.floor(config.width / 25);
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw combined text: "Xd left • Y%"
    const bottomText = `${daysLeft}d left • ${percentComplete}%`;
    ctx.fillText(bottomText, config.width / 2, bottomY);

  }, [config]);

  // Handle input changes with validation
  const handleChange = (key, value) => {
    // Validation rules
    switch (key) {
      case 'width':
        const width = parseInt(value);
        if (isNaN(width) || width <= 0) {
          toast.error('Width must be greater than 0');
          return;
        }
        break;

      case 'height':
        const height = parseInt(value);
        if (isNaN(height) || height <= 0) {
          toast.error('Height must be greater than 0');
          return;
        }
        break;

      case 'cols':
        const cols = parseInt(value);
        if (isNaN(cols) || cols < 1) {
          toast.error('Columns must be at least 1');
          return;
        }
        if (cols > 15) {
          toast.error('Columns cannot exceed 15');
          return;
        }
        break;

      case 'timezone':
        const tz = parseFloat(value);
        if (isNaN(tz) || tz < -12 || tz > 14) {
          toast.error('Timezone must be between -12 and +14');
          return;
        }
        break;

      case 'dotradius':
        const radius = parseFloat(value);
        if (isNaN(radius) || radius < 0.1) {
          toast.error('Dot size must be at least 0.1');
          return;
        }
        if (radius > 5) {
          toast.error('Dot size cannot exceed 5');
          return;
        }
        break;

      case 'paddingtop':
      case 'paddingbottom':
      case 'paddingleft':
      case 'paddingright':
        const padding = parseInt(value);
        if (isNaN(padding) || padding < 0) {
          toast.error('Padding must be 0 or greater');
          return;
        }
        if (padding > 2000) {
          toast.error('Padding cannot exceed 2000 pixels');
          return;
        }
        break;

      case 'bgcolor':
      case 'passedcolor':
      case 'currentcolor':
      case 'futurecolor':
      case 'textcolor':
        // Validate hex color (without #)
        const hexPattern = /^[0-9A-Fa-f]{6}$/;
        if (!hexPattern.test(value)) {
          toast.error('Color must be a valid 6-digit hex code (e.g., ff0000)');
          return;
        }
        break;
    }

    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Handle theme selection
  const applyTheme = (themeIndex) => {
    if (themeIndex === '') return; // "Select a theme" option
    const theme = THEMES[parseInt(themeIndex)];
    if (theme) {
      setConfig(prev => ({
        ...prev,
        ...theme.colors
      }));
      toast.success(`Applied ${theme.name} theme`);
    }
  };

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallpaperUrl);
      toast.success('URL copied to clipboard!');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy URL');
    }
  };

  // Download wallpaper from canvas
  const downloadWallpaper = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calwall-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Wallpaper downloaded successfully!');
    }, 'image/png');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                CalWall Studio
              </h1>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
                Create stunning calendar wallpapers with real-time customization
              </p>
            </div>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="shrink-0"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Device Preview */}
          <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Live Preview</CardTitle>
                <CardDescription>Your wallpaper updates in real-time</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-8">
                {/* iOS Device Frame */}
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="relative bg-gradient-to-br from-muted to-muted-foreground/20 rounded-[3rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-muted-foreground/30 rounded-b-3xl z-10" />

                    {/* Screen */}
                    <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden aspect-[9/19.5] w-64 shadow-inner flex items-center justify-center">
                      {/* Canvas Wallpaper */}
                      <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-cover"
                      />
                    </div>

                    {/* Side Buttons */}
                    <div className="absolute -left-1 top-24 w-1 h-8 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -left-1 top-36 w-1 h-12 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -left-1 top-52 w-1 h-12 bg-muted-foreground/40 rounded-l" />
                    <div className="absolute -right-1 top-32 w-1 h-16 bg-muted-foreground/40 rounded-r" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-6 justify-center">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Set Wallpaper
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[85vh] flex flex-col p-4 sm:p-6">
                        <DialogHeader className="shrink-0">
                          <DialogTitle className="text-xl sm:text-2xl">Set Up Your Dynamic Wallpaper</DialogTitle>
                          <DialogDescription className="text-sm">
                            Follow these steps to automatically update your iPhone wallpaper
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-1">
                          <Carousel setApi={setCarouselApi} className="w-full">
                            <CarouselContent>
                              {/* Step 1: Configuration */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                      Your Configuration
                                    </CardTitle>
                                    <CardDescription>Review your wallpaper settings</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                                      <div>
                                        <Label className="text-muted-foreground text-sm">Layout Style</Label>
                                        <p className="text-lg font-semibold capitalize">{config.mode}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-sm">Dimensions</Label>
                                        <p className="text-lg font-semibold">{config.width} × {config.height}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-sm">Columns</Label>
                                        <p className="text-lg font-semibold">{config.cols}</p>
                                      </div>
                                      <div>
                                        <Label className="text-muted-foreground text-sm">Timezone</Label>
                                        <p className="text-lg font-semibold">UTC {config.timezone > 0 ? '+' : ''}{config.timezone}</p>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label className="text-muted-foreground text-sm">Theme Colors</Label>
                                      <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: `#${config.bgcolor}` }} />
                                          <span className="text-xs">BG</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: `#${config.passedcolor}` }} />
                                          <span className="text-xs">Passed</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: `#${config.currentcolor}` }} />
                                          <span className="text-xs">Current</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: `#${config.futurecolor}` }} />
                                          <span className="text-xs">Future</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: `#${config.textcolor}` }} />
                                          <span className="text-xs">Text</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                      <p className="text-sm text-foreground">
                                        <strong>Note:</strong> Your wallpaper will automatically update based on your {config.mode === 'month' ? 'monthly' : 'yearly'} progress.
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 2: Shortcuts Setup */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                      Create iPhone Automation
                                    </CardTitle>
                                    <CardDescription>Set up automatic wallpaper updates</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <ol className="space-y-4">
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">1</span>
                                        <div>
                                          <p className="font-semibold">Open Shortcuts App</p>
                                          <p className="text-sm text-muted-foreground">Find the Shortcuts app on your iPhone</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">2</span>
                                        <div>
                                          <p className="font-semibold">Create Automation</p>
                                          <p className="text-sm text-muted-foreground">Tap "Automation" → "+" → "Create Personal Automation"</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">3</span>
                                        <div>
                                          <p className="font-semibold">Select "Time of Day"</p>
                                          <p className="text-sm text-muted-foreground">Choose when to update (e.g., 12:00 AM daily)</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">4</span>
                                        <div>
                                          <p className="font-semibold">Run Immediately</p>
                                          <p className="text-sm text-muted-foreground">Toggle ON "Run Immediately" and tap "Next"</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">5</span>
                                        <div>
                                          <p className="font-semibold">Create New Shortcut</p>
                                          <p className="text-sm text-muted-foreground">Tap "New Blank Automation"</p>
                                        </div>
                                      </li>
                                    </ol>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 3: Copy URL */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                      Copy Your Wallpaper URL
                                    </CardTitle>
                                    <CardDescription>This URL generates your custom wallpaper</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Your Wallpaper URL</Label>
                                      <div className="flex gap-2">
                                        <Input
                                          value={wallpaperUrl}
                                          readOnly
                                          className="font-mono text-xs"
                                        />
                                        <Button
                                          onClick={copyToClipboard}
                                          variant="outline"
                                          size="icon"
                                          className="shrink-0"
                                        >
                                          {copied ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                          ) : (
                                            <Copy className="w-4 h-4" />
                                          )}
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                      <p className="text-sm">
                                        <strong>Tip:</strong> This URL will always generate your wallpaper with the current settings. Copy it now for the next step!
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>

                              {/* Step 4: Configure Shortcut */}
                              <CarouselItem>
                                <Card className="border-0 shadow-none">
                                  <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                      Configure the Shortcut
                                    </CardTitle>
                                    <CardDescription>Add actions to download and set wallpaper</CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <ol className="space-y-4">
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">1</span>
                                        <div>
                                          <p className="font-semibold">Add "Get Contents of URL"</p>
                                          <p className="text-sm text-muted-foreground">Search for and add this action</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">2</span>
                                        <div>
                                          <p className="font-semibold">Paste Your URL</p>
                                          <p className="text-sm text-muted-foreground">Paste the URL you copied in the previous step</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">3</span>
                                        <div>
                                          <p className="font-semibold">Add "Set Wallpaper"</p>
                                          <p className="text-sm text-muted-foreground">Search for and add "Set Wallpaper" action</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">4</span>
                                        <div>
                                          <p className="font-semibold">Disable Options</p>
                                          <p className="text-sm text-muted-foreground">Turn OFF "Crop to Subject" and "Show Preview"</p>
                                        </div>
                                      </li>
                                      <li className="flex gap-3">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold shrink-0">5</span>
                                        <div>
                                          <p className="font-semibold">Test It!</p>
                                          <p className="text-sm text-muted-foreground">Tap "Run" to test your automation</p>
                                        </div>
                                      </li>
                                    </ol>

                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                      <p className="text-sm text-green-700 dark:text-green-400">
                                        <strong>Success!</strong> Your wallpaper will now update automatically every day. Enjoy your dynamic calendar wallpaper! 🎉
                                      </p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            </CarouselContent>

                            <div className="flex items-center justify-between mt-6 shrink-0">
                              <CarouselPrevious className="static translate-y-0" />
                              <div className="flex gap-2">
                                {[0, 1, 2, 3].map((index) => (
                                  <button
                                    key={index}
                                    onClick={() => carouselApi?.scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${currentStep === index
                                      ? 'bg-primary'
                                      : 'bg-muted-foreground/30'
                                      }`}
                                    aria-label={`Go to step ${index + 1}`}
                                  />
                                ))}
                              </div>
                              <CarouselNext className="static translate-y-0" />
                            </div>
                          </Carousel>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Customization Options */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Customize</CardTitle>
                <CardDescription>Adjust settings to create your perfect wallpaper</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Basic Settings */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    {/* Theme Selector */}
                    <div className="space-y-2 pb-4 border-b border-border">
                      <Label htmlFor="theme">Quick Theme Presets</Label>
                      <select
                        id="theme"
                        onChange={(e) => applyTheme(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        defaultValue=""
                      >
                        <option value="">Select a theme...</option>
                        {THEMES.map((theme, index) => (
                          <option key={index} value={index}>
                            {theme.emoji} {theme.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Choose a preset theme or customize colors manually below
                      </p>
                    </div>

                    {/* iOS Device Selector */}
                    <div className="space-y-2 pb-4 border-b border-border">
                      <Label htmlFor="device">iOS Device Presets</Label>
                      <select
                        id="device"
                        onChange={(e) => handleDeviceChange(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        defaultValue=""
                      >
                        <option value="">Select a device...</option>
                        {IOS_DEVICES.map((device, index) => (
                          <option key={index} value={index}>
                            {device.name} ({device.width}×{device.height})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Automatically sets width and height for the selected iPhone model
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={config.width}
                          onChange={(e) => handleChange('width', parseInt(e.target.value) || 1080)}
                          className="bg-background/50"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={config.height}
                          onChange={(e) => handleChange('height', parseInt(e.target.value) || 2400)}
                          className="bg-background/50"
                          disabled={selectedDevice !== ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mode">Mode</Label>
                      <select
                        id="mode"
                        value={config.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        value={config.timezone}
                        onChange={(e) => handleChange('timezone', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      >
                        {TIMEZONES.map((tz, index) => (
                          <option key={index} value={tz.offset}>
                            {tz.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cols">Columns</Label>
                      <Input
                        id="cols"
                        type="number"
                        value={config.cols}
                        onChange={(e) => handleChange('cols', parseInt(e.target.value) || 15)}
                        className="bg-background/50"
                        min="1"
                        max="30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dotradius">Dot Size</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="dotradius"
                          type="range"
                          value={config.dotradius}
                          onChange={(e) => handleChange('dotradius', parseFloat(e.target.value))}
                          className="bg-primary"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                        />
                        <span className="text-sm text-muted-foreground min-w-12">{config.dotradius}x</span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Color Settings */}
                  <TabsContent value="colors" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bgcolor">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="bgcolor"
                              type="text"
                              value={config.bgcolor}
                              onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="71717a"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.bgcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.bgcolor}`}
                            onChange={(e) => handleChange('bgcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passedcolor">Passed Days Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="passedcolor"
                              type="text"
                              value={config.passedcolor}
                              onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="f97316"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.passedcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.passedcolor}`}
                            onChange={(e) => handleChange('passedcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentcolor">Current Day Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="currentcolor"
                              type="text"
                              value={config.currentcolor}
                              onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="fbbf24"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.currentcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.currentcolor}`}
                            onChange={(e) => handleChange('currentcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="futurecolor">Future Days Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="futurecolor"
                              type="text"
                              value={config.futurecolor}
                              onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="52525b"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.futurecolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.futurecolor}`}
                            onChange={(e) => handleChange('futurecolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textcolor">Text Color</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              id="textcolor"
                              type="text"
                              value={config.textcolor}
                              onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                              className="bg-background/50 pl-12"
                              placeholder="ffffff"
                            />
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: `#${config.textcolor}` }}
                            />
                          </div>
                          <input
                            type="color"
                            value={`#${config.textcolor}`}
                            onChange={(e) => handleChange('textcolor', e.target.value.replace('#', ''))}
                            className="w-12 h-10 rounded border border-input cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Advanced Settings */}
                  <TabsContent value="advanced" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Padding (pixels)
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="paddingtop">Top</Label>
                          <Input
                            id="paddingtop"
                            type="number"
                            value={config.paddingtop}
                            onChange={(e) => handleChange('paddingtop', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingbottom">Bottom</Label>
                          <Input
                            id="paddingbottom"
                            type="number"
                            value={config.paddingbottom}
                            onChange={(e) => handleChange('paddingbottom', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingleft">Left</Label>
                          <Input
                            id="paddingleft"
                            type="number"
                            value={config.paddingleft}
                            onChange={(e) => handleChange('paddingleft', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paddingright">Right</Label>
                          <Input
                            id="paddingright"
                            type="number"
                            value={config.paddingright}
                            onChange={(e) => handleChange('paddingright', parseInt(e.target.value) || 0)}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        onClick={() => setConfig({
                          width: 1080,
                          height: 2400,
                          mode: 'month',
                          timezone: 5,
                          paddingtop: 400,
                          paddingbottom: 100,
                          paddingleft: 0,
                          paddingright: 0,
                          bgcolor: '71717a',
                          passedcolor: 'f97316',
                          currentcolor: 'fbbf24',
                          futurecolor: '52525b',
                          textcolor: 'ffffff',
                          cols: 15,
                          dotradius: 1.0
                        })}
                        variant="outline"
                        className="w-full"
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Built with CalWall API</p>
          <p className="text-xs text-muted-foreground">Real-time wallpaper generation</p>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster />
    </main>
  );
}