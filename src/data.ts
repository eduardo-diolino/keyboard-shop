/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Feature, SpecItem, ExplodedLayer, ComparisonProduct, KeyboardSoundPreset } from "./types";

export const IMAGES = {
  hero: "/src/assets/images/mx_keys_hero_1781635602955.jpg",
  setup: "/src/assets/images/mx_keys_setup_1781635619169.jpg",
  keycaps: "/src/assets/images/mx_keys_keys_1781635635048.jpg",
};

export const COLOR_VARIANTS = [
  {
    id: "graphite",
    name: "Cosmic Graphite",
    hex: "#1f1f23",
    description: "Deep space gray aluminum body with matte graphite black keycaps.",
  },
  {
    id: "pale-gray",
    name: "Stellar Silver",
    hex: "#d1d5db",
    description: "Anodized light silver aluminum body with soft chalk gray keycaps.",
  },
];

export const EXPLODED_LAYERS: ExplodedLayer[] = [
  {
    id: 1,
    name: "Spherically-Dished Keycaps",
    offsetY: -110,
    description: "Rectangular keys with custom spherical dish depressions matched to fingertips.",
    spec: "Dual-layout legends, laser-etched, satin matte oil-resistant coating",
    details: [
      "Designed specifically to match the natural curvature of your fingers",
      "Increases typing accuracy and speed by centering key strikes",
      "Dual-coated layout with macOS and Windows legends aligned on the identical keys"
    ]
  },
  {
    id: 2,
    name: "Low-Profile Tactile Switches",
    offsetY: -70,
    description: "Whisper-quiet premium scissor mechanism engineered for short, crisp actuation.",
    spec: "1.8mm travel, responsive rebound force, whisper-quiet tactile response",
    details: [
      "Rigid plastic scissor clips provide uniform horizontal stability",
      "Tactile scissor action eliminates wobble for clean key-press registration",
      "Engineered to reduce sonic frequency peaks, making typing virtually silent"
    ]
  },
  {
    id: 3,
    name: "Dampening Silicone Membrane",
    offsetY: -35,
    description: "Uniform, micro-molded rubber dome sheet that provides soft tactile feedback.",
    spec: "Responsive 60g bottom-out resistance, moisture-protective barrier",
    details: [
      "Translates direct finger pressure into consistent, crisp electrical contact",
      "Acoustically tuned to absorb clicking vibrations for silent luxury feels",
      "Extends tactical click-life to over 10 million operations per key"
    ]
  },
  {
    id: 4,
    name: "Solid Aluminum Stabilization Plate",
    offsetY: 0,
    description: "Heavy-duty aluminum chassis backbone designed to ground tactile vibrations.",
    spec: "Anodized sandblasted structural metal, high torsional rigidity",
    details: [
      "Guarantees a completely rigid structure with zero chassis flexing",
      "Increases substantial desk friction to prevent the keyboard from sliding during rapid typing",
      "Provides premium, reassuring weight and robust luxury heft to your hands"
    ]
  },
  {
    id: 5,
    name: "Smart PCB & Antenna Circuitry",
    offsetY: 35,
    description: "The intelligent hub with Proximity Sensing array and dual-frequency wireless chips.",
    spec: "Bluetooth Low Energy + Logi Bolt, smart light sensors, multi-layered board",
    details: [
      "Dual hand-proximity antenna triggers backlighting as hands approach",
      "Ambient light sensor automatically adjusts backlight strength from pitch black to desk lamps",
      "Fast switcher chip connects up to 3 separate devices concurrently over secure protocols"
    ]
  },
  {
    id: 6,
    name: "Sleek Bottom Frame & Battery Pack",
    offsetY: 75,
    description: "Sturdy structural outer tub encapsulating the heavy lithium-polymer cell.",
    spec: "1500mAh USB-C rechargeable Li-Po, anti-slip rubber pads, on/off slider switch",
    details: [
      "Houses the rapid USB-C rechargeable battery (up to 10 days with LEDs, 5 months off)",
      "Six co-molded chemical rubber feet keep typing perfectly planted at a stable 8° angle",
      "Features a mechanical hard-off toggle to maximize travel efficiency and battery life"
    ]
  }
];

export const FEATURES: Feature[] = [
  {
    id: "perfect-stroke",
    title: "Spherically-Dished Keys",
    description: "Every keystroke is fluid, natural, and accurate. Spherically-dished keys match the shape of your fingertips, and their round edges provide satisfying feedback no matter where you strike.",
    iconName: "Target",
    badge: "Ergonomics"
  },
  {
    id: "smart-lights",
    title: "Smart Proximity Illumination",
    description: "Proximity sensors detect your hands, illuminating the keyboard the moment your fingers approach. The backlit keys then automatically adjust to lighting conditions and fade when you leave the desk.",
    iconName: "Sparkles",
    badge: "Intelligence"
  },
  {
    id: "solid-metal",
    title: "Metal Plate Construction",
    description: "A solid metal plate supports the entire layout. The result is a remarkably sturdy, heavy build that never slips around your desk. Extreme craftsmanship with absolute deck-flex prevention.",
    iconName: "Layers",
    badge: "Premium Chassis"
  },
  {
    id: "easy-switch",
    title: "Multi-Device Easy-Switch",
    description: "Pair with up to three devices concurrently over Bluetooth Low Energy or the secure Logi Bolt USB Receiver. Switch between your laptop, tablet, or desktop with a simple tap of a key.",
    iconName: "MonitorPhone",
    badge: "Flow Workflow"
  },
  {
    id: "fast-charging",
    title: "USB-C Rapid Recharge",
    description: "Powers through intense workflows. Stays powered for up to 10 days on a full charge with backlighting active, or up to 5 months with illumination toggled off. Recharge efficiently via any USB-C port.",
    iconName: "Zap",
    badge: "Performance"
  },
  {
    id: "custom-macros",
    title: "Smart Smart-Actions",
    description: "Personalize function keys with customizable macros, custom triggers, and pre-mapped workflows. Instantly mute your microphone, activate emojis, or toggle system-wide dictation on the fly.",
    iconName: "Cpu",
    badge: "Efficiency"
  }
];

export const SPECIFICATIONS: SpecItem[] = [
  {
    category: "Physical Dimensions",
    items: [
      { label: "Height", value: "131.63 mm (5.18 in)" },
      { label: "Width", value: "430.20 mm (16.94 in)" },
      { label: "Depth", value: "20.50 mm (0.81 in)" },
      { label: "Weight", value: "810 g (28.57 oz) - Premium solid metal plate center" }
    ]
  },
  {
    category: "Connectivity & Wireless",
    items: [
      { label: "Bluetooth", value: "Bluetooth Low Energy (BLE) with multi-profile memory" },
      { label: "USB Receiver", value: "Logi Bolt USB Secure Wireless Receiver (included)" },
      { label: "Wireless Range", value: "Up to 10 meters (33 feet) secure pairing range" },
      { label: "Multi-Device Sync", value: "Easy-Switch keys for up to 3 individual host devices" }
    ]
  },
  {
    category: "Power & Battery Status",
    items: [
      { label: "Battery Chemistry", value: "Rechargeable Lithium-Polymer (Li-Po, 1500 mAh)" },
      { label: "LED Brightness On", value: "Up to 10 days of continuous operation with smart backlight active" },
      { label: "LED Brightness Off", value: "Up to 5 months (approx. 150 days) with backlight turned off" },
      { label: "Recharge Port", value: "USB Type-C port, supports 5W fast-charging" }
    ]
  },
  {
    category: "Smart Sensing Technologies",
    items: [
      { label: "Proximity Sensors", value: "Dual capacitive sensors trigger backlight at 5cm hand approach" },
      { label: "Lux Level Sensors", value: "Ambient photodiode calibrates backlight automatically to room conditions" },
      { label: "Status Monitors", value: "Dedicated Caps Lock state, battery monitor, and wireless channel LED indicators" }
    ]
  }
];

export const COMPARISONS: ComparisonProduct[] = [
  {
    name: "The Advanced Wireless (Our keyboard)",
    isMain: true,
    chassis: "Premium Single Anodized Metal Frame",
    keycaps: "Spherically-dished layout matching fingertips",
    illumination: "Automatic capacitive proximity smart LED",
    connectivity: "Secured Bolt + BLE Multi-switch (3 devices)",
    batteryLife: "5 months (LED off) / USB-C Rapid",
    weight: "810g - Solidly stable and anti-flex",
    rating: "4.9 / 5.0"
  },
  {
    name: "Traditional Mechanical Keyboards",
    isMain: false,
    chassis: "Prone to flexing plastic or heavy steel casings",
    keycaps: "Generic cylindrical/flat high keycaps",
    illumination: "Static RGB illumination or unlit keys",
    connectivity: "Wired-only or single Bluetooth profiles",
    batteryLife: "3 to 7 days rechargeable average",
    weight: "950g to 1200g - Fatiguing tall height",
    rating: "4.4 / 5.0"
  },
  {
    name: "Budget Chiclet Membrane",
    isMain: false,
    chassis: "Thin hollow plastic with extensive bending",
    keycaps: "Cheap flat ABS square caps",
    illumination: "No backlight or uneven solid lighting",
    connectivity: "Standard cheap 2.4Ghz dongle (unencrypted)",
    batteryLife: "Requires AAA disposable batteries",
    weight: "340g - Unstable sliding, fragile body",
    rating: "3.2 / 5.0"
  }
];

export const SOUND_PRESETS: KeyboardSoundPreset[] = [
  {
    id: "silent-scissor",
    name: "PerfectStroke Scissor (Tactile Quiet)",
    description: "Our engineered premium scissor switch. Whisper quiet, crispy mechanical rebound, 1.8mm travel.",
    pitch: 1.0
  },
  {
    id: "tactile-brown",
    name: "Tactile Quiet Mechanical",
    description: "Simulating a soft, high-actuation mechanical brown switch, rich acoustic feedback.",
    pitch: 0.8
  },
  {
    id: "vintage-typewriter",
    name: "Vintage Mechanical Click",
    description: "Classic typewriter-inspired heavy mechanical click, loud and clean acoustic feedback.",
    pitch: 1.4
  }
];
