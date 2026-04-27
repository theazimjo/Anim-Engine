// Placeholder anime SVG components as Data URIs for the MVP
export const AssetStore = {
  // Base face shape (skin color)
  head: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <path d="M40 80 Q100 -20 160 80 L180 160 Q100 270 20 160 Z" fill="%23fcdfb6" />
    <path d="M40 80 Q100 -20 160 80 L180 160 Q100 270 20 160 Z" fill="none" stroke="%23c4a282" stroke-width="2"/>
    <path d="M90 180 Q100 190 110 180" fill="none" stroke="%23c4a282" stroke-width="1"/>
  </svg>`,

  // Eyes (Grayscale to be tinted, or just black/white)
  eyes1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Left Eye -->
    <path d="M50 120 Q65 105 85 125" fill="none" stroke="%231a1a2e" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="68" cy="120" rx="10" ry="14" fill="%23ffffff" />
    <ellipse cx="68" cy="120" rx="6" ry="10" fill="%23000000" />
    <circle cx="70" cy="115" r="3" fill="%23ffffff" />
    <!-- Right Eye -->
    <path d="M115 125 Q135 105 150 120" fill="none" stroke="%231a1a2e" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="132" cy="120" rx="10" ry="14" fill="%23ffffff" />
    <ellipse cx="132" cy="120" rx="6" ry="10" fill="%23000000" />
    <circle cx="134" cy="115" r="3" fill="%23ffffff" />
  </svg>`,

  // Mouths
  mouthNeutral: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <path d="M85 195 Q100 200 115 195" fill="none" stroke="%23c4a282" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  
  mouthHappy: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <path d="M80 195 Q100 215 120 195 Z" fill="%23ff8c94" stroke="%23c4a282" stroke-width="2"/>
    <path d="M85 195 Q100 205 115 195" fill="%23ffffff"/>
  </svg>`,

  // Hair styles (Grayscale for tinting! Very important for Color Masking)
  hair1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Base hair mass -->
    <path d="M10 150 Q20 20 100 10 Q180 20 190 150 Q160 80 100 60 Q40 80 10 150 Z" fill="%23aaaaaa" stroke="%23333333" stroke-width="2"/>
    <!-- Bangs -->
    <path d="M20 70 Q60 50 100 100 Q80 60 40 100 Q30 80 20 70 Z" fill="%23cccccc" stroke="%23333333" stroke-width="1.5"/>
    <path d="M180 70 Q140 50 100 100 Q120 60 160 100 Q170 80 180 70 Z" fill="%23cccccc" stroke="%23333333" stroke-width="1.5"/>
    <path d="M100 20 Q120 60 100 100 Q90 50 100 20 Z" fill="%23eeeeee" stroke="%23333333" stroke-width="1.5"/>
  </svg>`,
  
  hair2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Spiky anime hair -->
    <path d="M30 120 L10 60 L60 40 L90 10 L130 20 L180 50 L170 120 Q150 70 100 50 Q50 70 30 120 Z" fill="%23bbbbbb" stroke="%23222222" stroke-width="2"/>
    <path d="M40 70 L70 90 L80 60 Z" fill="%23dddddd" stroke="%23222222" stroke-width="1"/>
    <path d="M160 70 L130 90 L120 60 Z" fill="%23dddddd" stroke="%23222222" stroke-width="1"/>
    <path d="M100 25 L115 80 L85 80 Z" fill="%23eeeeee" stroke="%23222222" stroke-width="1"/>
  </svg>`
};

// Helper function to load an image from URI
export const loadImage = (uri) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = uri;
  });
};
