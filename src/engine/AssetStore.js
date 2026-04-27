// Advanced High-Quality Anime SVG Components
// Grayscale values (#ffffff to #555555) are used for Color Masking (so user can tint them)

export const AssetStore = {
  head: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <defs><linearGradient id="skin1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23ffe4cf" /><stop offset="100%" stop-color="%23f5ccb0" /></linearGradient></defs>
      <path d="M40 90 Q40 150 70 190 Q90 215 100 230 Q110 215 130 190 Q160 150 160 90 Q160 40 100 40 Q40 40 40 90 Z" fill="url(%23skin1)" stroke="%23d8a68b" stroke-width="1.5"/>
      <path d="M40 120 Q30 130 35 145 Q40 155 45 145" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
      <path d="M160 120 Q170 130 165 145 Q160 155 155 145" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
      <path d="M98 160 L102 165 L98 165 Z" fill="%23d8a68b"/>
      <path d="M80 205 L80 250 L120 250 L120 205 Q100 215 80 205 Z" fill="%23e8ba9c" stroke="%23d8a68b" stroke-width="1.5"/>
    </svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <defs><linearGradient id="skin2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23f1c27d" /><stop offset="100%" stop-color="%23e0a96d" /></linearGradient></defs>
      <path d="M35 80 Q35 160 65 200 Q90 230 100 240 Q110 230 135 200 Q165 160 165 80 Q165 30 100 30 Q35 30 35 80 Z" fill="url(%23skin2)" stroke="%23b88655" stroke-width="1.5"/>
      <path d="M35 120 Q20 135 30 155 Q40 165 45 150" fill="%23e0a96d" stroke="%23b88655" stroke-width="1.5"/>
      <path d="M165 120 Q180 135 170 155 Q160 165 155 150" fill="%23e0a96d" stroke="%23b88655" stroke-width="1.5"/>
      <path d="M96 160 L104 165 L96 165 Z" fill="%23b88655"/>
      <path d="M75 220 L75 250 L125 250 L125 220 Q100 230 75 220 Z" fill="%23c69055" stroke="%23b88655" stroke-width="1.5"/>
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Squared Face -->
      <path d="M50 40 L150 40 L160 150 L140 210 L100 230 L60 210 L40 150 Z" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Round Face -->
      <circle cx="100" cy="110" r="85" fill="%23f5ccb0" stroke="%23d8a68b" stroke-width="1.5"/>
      <path d="M60 185 Q100 220 140 185" fill="none" stroke="%23d8a68b" stroke-width="1.5"/>
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Cyber Mask / Android Face -->
      <path d="M40 90 Q40 150 100 230 Q160 150 160 90 Q160 40 100 40 Q40 40 40 90 Z" fill="%23222222" stroke="%2306b6d4" stroke-width="2"/>
      <path d="M60 40 L60 200 M140 40 L140 200 M40 100 L160 100" stroke="%23333333" stroke-width="1"/>
      <circle cx="100" cy="130" r="10" fill="%2306b6d4" opacity="0.3"/>
    </svg>`
  },

  nose: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M98 160 L102 165 L98 165 Z" fill="%23d8a68b"/></svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M98 155 Q105 160 100 170" fill="none" stroke="%23d8a68b" stroke-width="1.5"/></svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M95 165 L105 165" stroke="%23d8a68b" stroke-width="1"/></svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M100 155 L105 165 L100 165" fill="%23d8a68b" opacity="0.5"/></svg>`
  },

  eyes: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Big Cute Eyes -->
      <path d="M45 130 Q70 110 95 135 Q75 120 45 130 Z" fill="%23111" />
      <path d="M40 135 L45 130" stroke="%23111" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="70" cy="140" rx="16" ry="14" fill="%23fff" />
      <ellipse cx="72" cy="140" rx="12" ry="12" fill="%23dddddd" />
      <ellipse cx="72" cy="140" rx="5" ry="6" fill="%23222" />
      <circle cx="65" cy="133" r="4" fill="%23fff" />
      <circle cx="80" cy="145" r="2" fill="%23fff" />
      <path d="M155 130 Q130 110 105 135 Q125 120 155 130 Z" fill="%23111" />
      <path d="M160 135 L155 130" stroke="%23111" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="130" cy="140" rx="16" ry="14" fill="%23fff" />
      <ellipse cx="128" cy="140" rx="12" ry="12" fill="%23dddddd" />
      <ellipse cx="128" cy="140" rx="5" ry="6" fill="%23222" />
      <circle cx="123" cy="133" r="4" fill="%23fff" />
      <circle cx="135" cy="145" r="2" fill="%23fff" />
    </svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Cool Sharp Eyes -->
      <path d="M40 135 L85 120 L95 125 L50 140 Z" fill="%23111" />
      <ellipse cx="70" cy="132" rx="10" ry="6" fill="%23fff" />
      <ellipse cx="70" cy="132" rx="7" ry="5" fill="%23dddddd" />
      <circle cx="70" cy="132" r="2.5" fill="%23222" />
      <circle cx="66" cy="130" r="1.5" fill="%23fff" />
      <path d="M160 135 L115 120 L105 125 L150 140 Z" fill="%23111" />
      <ellipse cx="130" cy="132" rx="10" ry="6" fill="%23fff" />
      <ellipse cx="130" cy="132" rx="7" ry="5" fill="%23dddddd" />
      <circle cx="130" cy="132" r="2.5" fill="%23222" />
      <circle cx="126" cy="130" r="1.5" fill="%23fff" />
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Drooping/Sleepy Eyes -->
      <path d="M45 130 Q70 140 95 130 Q70 135 45 130 Z" fill="%23111" stroke="%23111" stroke-width="2"/>
      <ellipse cx="70" cy="138" rx="14" ry="10" fill="%23fff" />
      <ellipse cx="70" cy="138" rx="10" ry="8" fill="%23dddddd" />
      <circle cx="70" cy="138" r="4" fill="%23222" />
      <path d="M155 130 Q130 140 105 130 Q130 135 155 130 Z" fill="%23111" stroke="%23111" stroke-width="2"/>
      <ellipse cx="130" cy="138" rx="14" ry="10" fill="%23fff" />
      <ellipse cx="130" cy="138" rx="10" ry="8" fill="%23dddddd" />
      <circle cx="130" cy="138" r="4" fill="%23222" />
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Angry/Fierce Eyes -->
      <path d="M40 120 L95 135 L90 140 L45 125 Z" fill="%23111" />
      <ellipse cx="70" cy="138" rx="8" ry="6" fill="%23fff" />
      <ellipse cx="70" cy="138" rx="5" ry="5" fill="%23dddddd" />
      <circle cx="70" cy="138" r="2" fill="%23222" />
      <path d="M160 120 L105 135 L110 140 L155 125 Z" fill="%23111" />
      <ellipse cx="130" cy="138" rx="8" ry="6" fill="%23fff" />
      <ellipse cx="130" cy="138" rx="5" ry="5" fill="%23dddddd" />
      <circle cx="130" cy="138" r="2" fill="%23222" />
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Closed/Smiling Eyes -->
      <path d="M45 135 Q70 120 95 135" fill="none" stroke="%23111" stroke-width="4" stroke-linecap="round"/>
      <path d="M155 135 Q130 120 105 135" fill="none" stroke="%23111" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Dead/Yandere Eyes (No highlight) -->
      <path d="M45 130 Q70 110 95 135 Q75 120 45 130 Z" fill="%23111" />
      <ellipse cx="70" cy="140" rx="14" ry="12" fill="%23fff" />
      <ellipse cx="70" cy="140" rx="8" ry="8" fill="%23dddddd" />
      <path d="M155 130 Q130 110 105 135 Q125 120 155 130 Z" fill="%23111" />
      <ellipse cx="130" cy="140" rx="14" ry="12" fill="%23fff" />
      <ellipse cx="130" cy="140" rx="8" ry="8" fill="%23dddddd" />
      <rect x="40" y="125" width="120" height="20" fill="%23000" opacity="0.3" /> <!-- Shadow overlay -->
    </svg>`,
    7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Star Eyes (Idol style) -->
      <path d="M45 130 Q70 110 95 135 Q75 120 45 130 Z" fill="%23111" />
      <ellipse cx="70" cy="140" rx="16" ry="14" fill="%23fff" />
      <ellipse cx="72" cy="140" rx="12" ry="12" fill="%23dddddd" />
      <path d="M72 130 L75 138 L83 138 L77 143 L79 151 L72 146 L65 151 L67 143 L61 138 L69 138 Z" fill="%23ffffff" />
      <path d="M155 130 Q130 110 105 135 Q125 120 155 130 Z" fill="%23111" />
      <ellipse cx="130" cy="140" rx="16" ry="14" fill="%23fff" />
      <ellipse cx="128" cy="140" rx="12" ry="12" fill="%23dddddd" />
      <path d="M128 130 L131 138 L139 138 L133 143 L135 151 L128 146 L121 151 L123 143 L117 138 L125 138 Z" fill="%23ffffff" />
    </svg>`,
    8: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Spiral/Confused Eyes -->
      <path d="M70 140 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0" fill="none" stroke="%23111" stroke-width="2"/>
      <path d="M70 140 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="none" stroke="%23111" stroke-width="2"/>
      <path d="M70 140 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0" fill="none" stroke="%23111" stroke-width="2"/>
      <path d="M130 140 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0" fill="none" stroke="%23111" stroke-width="2"/>
      <path d="M130 140 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="none" stroke="%23111" stroke-width="2"/>
      <path d="M130 140 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0" fill="none" stroke="%23111" stroke-width="2"/>
    </svg>`
  },

  mouth: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M85 185 Q100 188 115 185" fill="none" stroke="%23cc8a7b" stroke-width="1.5" stroke-linecap="round"/><path d="M95 192 Q100 194 105 192" fill="none" stroke="%23e8ba9c" stroke-width="1" stroke-linecap="round"/></svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M85 185 Q100 205 115 185 Z" fill="%23ff8c94" stroke="%23cc8a7b" stroke-width="1.5"/><path d="M86 186 Q100 193 114 186 Z" fill="%23fff"/></svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M85 190 Q100 180 115 190" fill="none" stroke="%23cc8a7b" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M90 185 L110 185 L100 195 Z" fill="%23ff8c94" stroke="%23cc8a7b" stroke-width="1"/></svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"><path d="M95 185 Q100 188 105 185" fill="none" stroke="%23cc8a7b" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  hairFront: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Bob Cut Bangs -->
      <path d="M40 80 Q100 40 160 80 Q140 70 120 70 L80 70 Q60 70 40 80 Z" fill="%23cccccc" />
      <path d="M60 60 Q100 45 140 60 Q100 55 60 60 Z" fill="%23ffffff" opacity="0.4"/>
    </svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Spiky Front -->
      <path d="M40 80 L60 120 L75 85 L90 130 L100 90 L110 130 L125 85 L140 120 L160 80 Q100 60 40 80 Z" fill="%23cccccc" />
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Twin Tails Front -->
      <path d="M30 100 Q40 20 100 20 Q160 20 170 100 Q140 60 100 50 Q60 60 30 100 Z" fill="%23cccccc" />
      <path d="M40 90 Q100 30 160 90 Q100 50 40 90 Z" fill="%23ffffff" opacity="0.4" />
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Messy Front -->
      <path d="M15 80 L50 130 L65 80 L80 140 L100 80 L110 140 L135 80 L160 120 L180 70 Q100 40 15 80 Z" fill="%23cccccc" />
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Bob Front Clean -->
      <path d="M40 130 Q100 -10 160 130 Q100 50 40 130 Z" fill="%23dddddd" />
    </svg>`,
    6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"></svg>`,
    7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Ponytail Front -->
      <path d="M30 100 Q40 20 100 20 Q160 20 170 100 Q140 60 100 50 Q60 60 30 100 Z" fill="%23cccccc" />
    </svg>`,
    8: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Hime Cut Front -->
      <path d="M30 100 Q100 30 170 100 Q150 70 130 70 L70 70 Q50 70 30 100 Z" fill="%23cccccc" />
      <path d="M60 70 L60 140 L85 140 L85 70 Z" fill="%23dddddd" />
      <path d="M140 70 L140 140 L115 140 L115 70 Z" fill="%23dddddd" />
    </svg>`,
    9: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Drill Front -->
      <path d="M30 100 Q100 20 170 100" fill="none" stroke="%23cccccc" stroke-width="10"/>
      <path d="M50 80 Q100 40 150 80" fill="%23dddddd" />
    </svg>`,
    10: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Mohawk Front -->
      <path d="M100 10 L80 40 L100 30 L120 40 Z" fill="%23aaaaaa" />
      <path d="M100 30 L85 70 L100 60 L115 70 Z" fill="%23cccccc" />
    </svg>`
  },

  hairBack: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Bob Back -->
      <path d="M40 80 Q100 0 160 80 L170 180 Q100 210 30 180 Z" fill="%23aaaaaa" />
    </svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Spiky Back -->
      <path d="M30 100 L10 60 L50 50 L70 20 L100 10 L130 20 L150 50 L190 60 L170 100 Z" fill="%23aaaaaa" />
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Twin Tails Back -->
      <path d="M40 80 Q0 150 10 220 Q40 180 50 100 Z" fill="%23aaaaaa" />
      <path d="M160 80 Q200 150 190 220 Q160 180 150 100 Z" fill="%23aaaaaa" />
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Messy Back -->
      <path d="M20 110 L10 70 L40 40 L60 10 L100 5 L130 10 L170 40 L190 80 L180 110 Z" fill="%23aaaaaa" />
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Bob Back Clean -->
      <path d="M30 140 Q10 70 100 20 Q190 70 170 140 Q140 160 100 130 Q60 160 30 140 Z" fill="%23bbbbbb" />
    </svg>`,
    6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"></svg>`,
    7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Ponytail Back -->
      <path d="M160 60 Q210 60 200 150 Q170 180 160 100 Z" fill="%23aaaaaa" />
    </svg>`,
    8: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Hime Back -->
      <path d="M30 100 L30 250 L170 250 L170 100 Q100 20 30 100 Z" fill="%23aaaaaa" />
    </svg>`,
    9: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Drill Back -->
      <path d="M30 100 Q0 150 30 200 Q60 150 30 100" fill="%23aaaaaa" />
      <path d="M170 100 Q200 150 170 200 Q140 150 170 100" fill="%23aaaaaa" />
    </svg>`,
    10: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Mohawk Back -->
      <path d="M100 60 L90 100 L100 90 L110 100 Z" fill="%23dddddd" />
    </svg>`
  },

  accessories: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"></svg>`, // None
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Glasses -->
      <rect x="40" y="115" width="50" height="30" rx="5" fill="none" stroke="%23333" stroke-width="4"/>
      <rect x="110" y="115" width="50" height="30" rx="5" fill="none" stroke="%23333" stroke-width="4"/>
      <path d="M90 125 L110 125" stroke="%23333" stroke-width="4" />
      <!-- Glass reflection -->
      <path d="M45 140 L85 120 M115 140 L155 120" stroke="%23fff" stroke-width="3" opacity="0.6"/>
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Eye Scar -->
      <path d="M115 110 L145 160" stroke="%23cc8a7b" stroke-width="3" stroke-linecap="round"/>
      <path d="M125 125 L135 120 M130 140 L140 135" stroke="%23cc8a7b" stroke-width="2"/>
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Blush -->
      <ellipse cx="60" cy="160" rx="15" ry="8" fill="%23ff8c94" opacity="0.6" />
      <ellipse cx="140" cy="160" rx="15" ry="8" fill="%23ff8c94" opacity="0.6" />
      <path d="M55 158 L65 155 M55 162 L65 159 M135 158 L145 155 M135 162 L145 159" stroke="%23ff4d5a" stroke-width="1" opacity="0.5"/>
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Cyber Eye (Left) -->
      <circle cx="70" cy="140" r="20" fill="none" stroke="%2306b6d4" stroke-width="1" opacity="0.5"/>
      <path d="M50 140 L90 140 M70 120 L70 160" stroke="%2306b6d4" stroke-width="0.5"/>
      <rect x="75" y="145" width="10" height="2" fill="%2306b6d4"/>
    </svg>`,
    6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Cyber Tattoos / Circuits -->
      <path d="M40 50 Q60 60 40 80 M160 50 Q140 60 160 80" fill="none" stroke="%2306b6d4" stroke-width="1.5" opacity="0.7"/>
      <circle cx="40" cy="50" r="2" fill="%2306b6d4"/>
      <circle cx="160" cy="50" r="2" fill="%2306b6d4"/>
    </svg>`,
    7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Respirator / Mask -->
      <path d="M70 170 L130 170 L140 230 Q100 250 60 230 Z" fill="%23222" stroke="%23444" stroke-width="2"/>
      <circle cx="85" cy="200" r="10" fill="%23111" stroke="%2306b6d4" stroke-width="1"/>
      <circle cx="115" cy="200" r="10" fill="%23111" stroke="%2306b6d4" stroke-width="1"/>
    </svg>`,
    8: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Halo / Angel Ring (Cyber) -->
      <ellipse cx="100" cy="30" rx="40" ry="10" fill="none" stroke="%2306b6d4" stroke-width="3" opacity="0.8"/>
      <path d="M80 30 L120 30" stroke="%2306b6d4" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,
    9: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Oni Horns (Cyber) -->
      <path d="M60 50 L50 10 L80 45 Z" fill="%23ff2244" stroke="%23000" stroke-width="1"/>
      <path d="M140 50 L150 10 L120 45 Z" fill="%23ff2244" stroke="%23000" stroke-width="1"/>
      <path d="M60 40 L80 35 M140 40 L120 35" stroke="%2306b6d4" stroke-width="1" opacity="0.5"/>
    </svg>`
  },

  body: {
    1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- School Uniform (Jacket) -->
      <!-- Shoulders and Torso -->
      <path d="M50 250 L150 250 L160 200 Q150 180 120 180 L80 180 Q50 180 40 200 Z" fill="%23222233" stroke="%23111" stroke-width="2"/>
      <!-- Collar -->
      <path d="M70 180 L100 230 L130 180 Z" fill="%23ffffff" />
      <path d="M70 180 L100 220 L130 180" fill="none" stroke="%23111" stroke-width="2"/>
      <!-- Tie -->
      <path d="M95 210 L105 210 L100 250 Z" fill="%23cc2222" />
    </svg>`,
    2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Sailor Fuku (Schoolgirl Uniform) -->
      <path d="M50 250 L150 250 L160 200 Q150 180 120 180 L80 180 Q50 180 40 200 Z" fill="%23ffffff" stroke="%23dddddd" stroke-width="2"/>
      <!-- Sailor Collar -->
      <path d="M60 180 L100 240 L140 180 Z" fill="%23112244" />
      <!-- Ribbon -->
      <path d="M85 220 Q100 210 115 220 Q100 240 85 220 Z" fill="%23cc2222" />
      <circle cx="100" cy="225" r="4" fill="%23aa1111" />
    </svg>`,
    3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Casual Hoodie -->
      <path d="M40 250 L160 250 L170 200 Q150 170 100 170 Q50 170 30 200 Z" fill="%23cccccc" />
      <!-- Hoodie Strings -->
      <path d="M85 190 Q90 220 85 240" fill="none" stroke="%23eeeeee" stroke-width="3" stroke-linecap="round"/>
      <path d="M115 190 Q110 220 115 240" fill="none" stroke="%23eeeeee" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    4: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Cyberpunk / Techwear Jacket -->
      <path d="M45 250 L155 250 L165 200 Q150 175 120 175 L80 175 Q50 175 35 200 Z" fill="%231a1a1a" stroke="%233a3a3a" stroke-width="2"/>
      <!-- Neon Accents -->
      <path d="M80 175 L100 210 L100 250" fill="none" stroke="%2306b6d4" stroke-width="2"/>
      <path d="M120 175 L100 210" fill="none" stroke="%2306b6d4" stroke-width="2"/>
      <rect x="60" y="210" width="30" height="10" rx="2" fill="%23333" stroke="%2306b6d4" stroke-width="1"/>
    </svg>`,
    5: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Ninja / Traditional Anime Gi -->
      <path d="M50 250 L150 250 L160 200 Q150 180 120 180 L80 180 Q50 180 40 200 Z" fill="%23c24229" />
      <!-- Fold -->
      <path d="M70 180 L130 250" fill="none" stroke="%23111" stroke-width="3"/>
      <!-- Inner shirt -->
      <path d="M90 180 L110 210 L130 180 Z" fill="%23111" />
    </svg>`,
    6: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Maid Outfit -->
      <path d="M50 250 L150 250 L160 200 Q150 180 120 180 L80 180 Q50 180 40 200 Z" fill="%23111111" />
      <path d="M70 180 Q100 200 130 180 L140 250 L60 250 Z" fill="%23ffffff" />
      <path d="M70 185 Q100 195 130 185" fill="none" stroke="%23dddddd" stroke-width="1"/>
    </svg>`,
    7: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250">
      <!-- Kimono / Yukata -->
      <path d="M40 250 L160 250 L160 190 Q100 170 40 190 Z" fill="%23dddddd" />
      <path d="M80 180 L120 250 M120 180 L80 250" fill="none" stroke="%23999" stroke-width="2"/>
      <rect x="70" y="210" width="60" height="20" fill="%23ff8c94" />
    </svg>`
  }
};

export const getAssetsToLoad = () => {
  let list = [];
  Object.keys(AssetStore.head).forEach(k => list.push({ id: `head_${k}`, uri: AssetStore.head[k] }));
  Object.keys(AssetStore.nose).forEach(k => list.push({ id: `nose_${k}`, uri: AssetStore.nose[k] }));
  Object.keys(AssetStore.eyes).forEach(k => list.push({ id: `eyes_${k}`, uri: AssetStore.eyes[k] }));
  Object.keys(AssetStore.mouth).forEach(k => list.push({ id: `mouth_${k}`, uri: AssetStore.mouth[k] }));
  Object.keys(AssetStore.hairFront).forEach(k => list.push({ id: `hair_front_${k}`, uri: AssetStore.hairFront[k] }));
  Object.keys(AssetStore.hairBack).forEach(k => list.push({ id: `hair_back_${k}`, uri: AssetStore.hairBack[k] }));
  Object.keys(AssetStore.accessories).forEach(k => list.push({ id: `acc_${k}`, uri: AssetStore.accessories[k] }));
  Object.keys(AssetStore.body).forEach(k => list.push({ id: `body_${k}`, uri: AssetStore.body[k] }));
  return list;
};

export const loadImage = (uri) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = uri;
  });
};
