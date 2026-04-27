// High-Quality Anime SVG Components
// Grayscale values are used for Color Masking (so user can tint them)

export const AssetStore = {
  // Base face shape (Anime style with sharp chin)
  head: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <defs>
      <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="%23ffe4cf" />
        <stop offset="100%" stop-color="%23f5ccb0" />
      </linearGradient>
    </defs>
    <!-- Face base -->
    <path d="M40 90 Q40 150 70 190 Q90 215 100 230 Q110 215 130 190 Q160 150 160 90 Q160 40 100 40 Q40 40 40 90 Z" fill="url(%23skin)" stroke="%23d8a68b" stroke-width="1.5"/>
    <!-- Ears -->
    <path d="M40 120 Q30 130 35 145 Q40 155 45 145" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
    <path d="M160 120 Q170 130 165 145 Q160 155 155 145" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
    <!-- Nose shadow -->
    <path d="M98 160 L102 165 L98 165 Z" fill="%23d8a68b"/>
    <!-- Neck -->
    <path d="M80 205 L80 250 L120 250 L120 205 Q100 215 80 205 Z" fill="%23e8ba9c" stroke="%23d8a68b" stroke-width="1.5"/>
  </svg>`,

  // Eyes (Anime style: thick upper lash, detailed iris)
  eyes1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Left Eye -->
    <!-- Upper Lash -->
    <path d="M50 130 Q70 110 95 135 Q75 120 50 130 Z" fill="%23111" />
    <path d="M45 135 L50 130" stroke="%23111" stroke-width="2" stroke-linecap="round"/>
    <!-- Sclera (White part) -->
    <ellipse cx="72" cy="138" rx="15" ry="12" fill="%23fff" />
    <!-- Iris base (Grayscale for tinting: very bright so color multiplies well) -->
    <ellipse cx="74" cy="138" rx="11" ry="11" fill="%23dddddd" />
    <!-- Pupil -->
    <ellipse cx="74" cy="138" rx="4" ry="5" fill="%23222" />
    <!-- Highlights -->
    <circle cx="68" cy="133" r="3.5" fill="%23fff" />
    <circle cx="80" cy="143" r="1.5" fill="%23fff" />
    <!-- Eyelid fold -->
    <path d="M55 115 Q70 105 90 120" fill="none" stroke="%23d8a68b" stroke-width="1" />

    <!-- Right Eye -->
    <path d="M150 130 Q130 110 105 135 Q125 120 150 130 Z" fill="%23111" />
    <path d="M155 135 L150 130" stroke="%23111" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="128" cy="138" rx="15" ry="12" fill="%23fff" />
    <ellipse cx="126" cy="138" rx="11" ry="11" fill="%23dddddd" />
    <ellipse cx="126" cy="138" rx="4" ry="5" fill="%23222" />
    <circle cx="120" cy="133" r="3.5" fill="%23fff" />
    <circle cx="132" cy="143" r="1.5" fill="%23fff" />
    <path d="M145 115 Q130 105 110 120" fill="none" stroke="%23d8a68b" stroke-width="1" />
  </svg>`,

  // Eyes 2 (Sharp/Cool anime eyes)
  eyes2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Left Eye -->
    <path d="M50 135 L85 120 L95 125 L60 140 Z" fill="%23111" />
    <ellipse cx="75" cy="132" rx="8" ry="6" fill="%23fff" />
    <ellipse cx="75" cy="132" rx="6" ry="5" fill="%23dddddd" />
    <circle cx="75" cy="132" r="2" fill="%23222" />
    <circle cx="72" cy="130" r="1.5" fill="%23fff" />
    
    <!-- Right Eye -->
    <path d="M150 135 L115 120 L105 125 L140 140 Z" fill="%23111" />
    <ellipse cx="125" cy="132" rx="8" ry="6" fill="%23fff" />
    <ellipse cx="125" cy="132" rx="6" ry="5" fill="%23dddddd" />
    <circle cx="125" cy="132" r="2" fill="%23222" />
    <circle cx="122" cy="130" r="1.5" fill="%23fff" />
  </svg>`,

  // Mouths
  mouthNeutral: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <path d="M85 185 Q100 188 115 185" fill="none" stroke="%23cc8a7b" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Bottom lip shadow -->
    <path d="M95 192 Q100 194 105 192" fill="none" stroke="%23e8ba9c" stroke-width="1" stroke-linecap="round"/>
  </svg>`,
  
  mouthHappy: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <path d="M85 185 Q100 205 115 185 Z" fill="%23ff8c94" stroke="%23cc8a7b" stroke-width="1.5"/>
    <path d="M86 186 Q100 193 114 186 Z" fill="%23fff"/>
  </svg>`,

  // Hair styles
  // Using pure grayscale: #ffffff to #666666 so the Color Multiply shader works beautifully
  hair1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Back Hair -->
    <path d="M30 180 Q20 100 100 30 Q180 100 170 180 Q160 210 180 240 Q130 180 100 150 Q70 180 20 240 Q40 210 30 180 Z" fill="%23aaaaaa" />
    <!-- Base Head Hair Mass -->
    <path d="M20 120 Q30 30 100 20 Q170 30 180 120 Q160 60 100 40 Q40 60 20 120 Z" fill="%23cccccc" />
    <!-- Front Bangs (Long Anime Bangs) -->
    <path d="M100 20 Q120 70 130 130 Q110 90 100 40 Q90 90 70 130 Q80 70 100 20 Z" fill="%23dddddd" />
    <path d="M100 20 Q140 40 160 140 Q150 90 120 60 Z" fill="%23eeeeee" />
    <path d="M100 20 Q60 40 40 140 Q50 90 80 60 Z" fill="%23eeeeee" />
    <!-- Hair Highlights -->
    <path d="M60 60 Q100 45 140 60 Q100 55 60 60 Z" fill="%23ffffff" opacity="0.6"/>
  </svg>`,
  
  hair2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
    <!-- Short Spiky Boy Hair -->
    <!-- Back Spikes -->
    <path d="M30 100 L10 60 L50 50 L70 20 L100 10 L130 20 L150 50 L190 60 L170 100 Q150 60 100 50 Q50 60 30 100 Z" fill="%23aaaaaa" />
    <!-- Front Spikes -->
    <path d="M40 80 L60 120 L75 85 L90 130 L100 90 L110 130 L125 85 L140 120 L160 80 Q100 60 40 80 Z" fill="%23cccccc" />
    <!-- Highlights -->
    <path d="M60 70 L75 60 L100 50 L125 60 L140 70 Q100 65 60 70 Z" fill="%23ffffff" opacity="0.6"/>
  </svg>`
};

export const loadImage = (uri) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = uri;
  });
};
