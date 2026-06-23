/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  imageAlt?: string;
}

export interface SpecItem {
  category: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface ExplodedLayer {
  id: number;
  name: string;
  offsetY: number; // For visualization
  description: string;
  spec: string;
  details: string[];
}

export interface ComparisonProduct {
  name: string;
  isMain: boolean;
  chassis: string;
  keycaps: string;
  illumination: string;
  connectivity: string;
  batteryLife: string;
  weight: string;
  rating: string;
}

export interface KeyboardSoundPreset {
  id: string;
  name: string;
  description: string;
  pitch: number;
}
