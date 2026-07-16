export type ProductSpec = [label: string, value: string];

export interface ProductItem {
  slug: string;
  category: string;
  title: string;
  model: string;
  tonnage: string;
  image: string;
  shortDescription: string;
  applications: string[];
  features: string[];
  specs: ProductSpec[];
  metaTitle?: string;
  metaDescription?: string;
  aliases?: string[];
  selling?: string;
  bullets?: string[];
}

export interface ProductCategory extends ProductItem {
  key: string;
  label: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  typeIntro: string;
  types: ProductItem[];
  choose: string[];
  faq: ProductSpec[];
  aliases?: string[];
}

export const productCategories = [
  {
    "key": "breakers",
    "slug": "hydraulic-breaker",
    "label": "Hydraulic Breakers",
    "category": "Hydraulic Breakers",
    "title": "Hydraulic Breakers",
    "h1": "Hydraulic Breakers for Excavators",
    "eyebrow": "KSB hydraulic breaker series",
    "tonnage": "1 - 90 ton",
    "image": "/images/products/featured/raw/hydraulic-breaker.webp",
    "metaTitle": "Hydraulic Breakers | Side, Box and Top Type Excavator Breakers",
    "metaDescription": "KRATOR hydraulic breakers with KSB series logic for side type, box type and top type applications across demolition, quarry and trench work.",
    "overview": "KRATOR hydraulic breakers are built for contractors and dealers who need stable impact energy, practical service access and model matching for overseas excavator fleets. The KSB series logic keeps carrier matching simple while supporting side, box and top mounted breaker configurations.",
    "typeIntro": "Choose the housing style by working condition, noise requirement and service preference.",
    "types": [
      {
        "slug": "side-type-hydraulic-breaker",
        "category": "Hydraulic Breakers",
        "title": "Side Type Hydraulic Breaker",
        "model": "KSB Series",
        "tonnage": "1 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-breaker.webp",
        "shortDescription": "Open side frame improves daily service access and heat release.",
        "applications": [
          "Concrete demolition",
          "Road repair",
          "Quarry secondary breaking",
          "Rock trenching",
          "Foundation removal"
        ],
        "features": [
          "KSB naming structure",
          "Rock and concrete work",
          "KSB model range for compact to heavy carriers",
          "Heat-treated chisel and wear parts packages",
          "Bracket matching by pin diameter, arm width and center distance"
        ],
        "specs": [
          [
            "Product type",
            "Side Type Hydraulic Breaker"
          ],
          [
            "Model / series",
            "KSB Series"
          ],
          [
            "Suitable carrier",
            "1 - 90 ton"
          ],
          [
            "Main category",
            "Hydraulic Breakers"
          ],
          [
            "Model series",
            "KSB45 - KSB700 / KSB350 - KSB2100 reference logic"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Excavator weight, oil flow, pressure, pin diameter, arm width"
          ],
          [
            "Common options",
            "Side type, box type, top type, chisel kits, spare seal kits"
          ]
        ],
        "selling": "Open side frame improves daily service access and heat release.",
        "bullets": [
          "KSB naming structure",
          "Rock and concrete work"
        ]
      },
      {
        "slug": "box-type-hydraulic-breaker",
        "category": "Hydraulic Breaker",
        "title": "Box Type Hydraulic Breaker",
        "model": "KSB Series",
        "tonnage": "4 - 90 ton",
        "image": "/images/products/featured/raw/box%20type%20hydraulic%20breaker.webp",
        "metaTitle": "Box Type Hydraulic Breaker | KRATOR ATTACHMENTS",
        "metaDescription": "Heavy-duty box type hydraulic breaker for excavators, designed for low noise, strong impact power, demolition, quarrying and concrete breaking.",
        "aliases": [
          "box-type-hydraulic-breaker"
        ],
        "shortDescription": "Box Type Hydraulic Breaker is designed for heavy-duty demolition, quarrying, trenching and concrete breaking applications. The enclosed box housing helps reduce noise, protects the main body, and improves durability in demanding job sites.",
        "applications": [
          "Building demolition",
          "Road construction",
          "Quarry and mining",
          "Concrete breaking",
          "Trenching and foundation work"
        ],
        "features": [
          "Enclosed box housing for lower noise and better body protection",
          "Strong impact power for concrete, rock and demolition work",
          "Stable hydraulic system with easy maintenance",
          "Wear-resistant chisel and reinforced main body",
          "Suitable for excavators from small to large tonnage ranges",
          "OEM color, logo and bracket matching available"
        ],
        "specs": [
          [
            "Product type",
            "Box Type Hydraulic Breaker"
          ],
          [
            "Model / series",
            "KSB Series"
          ],
          [
            "Suitable carrier",
            "4 - 90 ton"
          ],
          [
            "Main category",
            "Hydraulic Breakers"
          ],
          [
            "Model series",
            "KSB45 - KSB700 / KSB350 - KSB2100 reference logic"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Excavator weight, oil flow, pressure, pin diameter, arm width"
          ],
          [
            "Common options",
            "Side type, box type, top type, chisel kits, spare seal kits"
          ]
        ],
        "selling": "Enclosed box housing helps reduce noise, protect the main body and improve durability on demanding jobsites.",
        "bullets": [
          "Low Noise Housing",
          "Body Protection",
          "Heavy-Duty Demolition"
        ]
      },
      {
        "slug": "top-type-hydraulic-breaker",
        "category": "Hydraulic Breaker",
        "title": "Top Type Hydraulic Breaker",
        "model": "KSB Series",
        "tonnage": "1 - 70 ton",
        "image": "/images/products/featured/raw/top%20type%20hydraulic%20breaker.webp",
        "metaTitle": "Top Type Hydraulic Breaker | KRATOR ATTACHMENTS",
        "metaDescription": "Top type hydraulic breaker attachment for excavators, suitable for demolition, road construction, concrete breaking and general excavation work.",
        "aliases": [
          "top-type-hydraulic-breaker"
        ],
        "shortDescription": "Top Type Hydraulic Breaker is a versatile breaker attachment for excavators, designed for easy positioning, wide working visibility and efficient impact performance. It is suitable for construction, demolition, road repair and general breaking work.",
        "applications": [
          "Road construction",
          "Concrete breaking",
          "Utility trenching",
          "Foundation work",
          "General demolition"
        ],
        "features": [
          "Top-mounted structure with good operating visibility",
          "Easy positioning for general demolition and breaking jobs",
          "Strong impact energy with stable hydraulic performance",
          "Simple structure for convenient maintenance",
          "Suitable for concrete, rock and road construction applications",
          "OEM bracket, logo and color customization available"
        ],
        "specs": [
          [
            "Product type",
            "Top Type Hydraulic Breaker"
          ],
          [
            "Model / series",
            "KSB Series"
          ],
          [
            "Suitable carrier",
            "1 - 70 ton"
          ],
          [
            "Main category",
            "Hydraulic Breakers"
          ],
          [
            "Model series",
            "KSB45 - KSB700 / KSB350 - KSB2100 reference logic"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Excavator weight, oil flow, pressure, pin diameter, arm width"
          ],
          [
            "Common options",
            "Side type, box type, top type, chisel kits, spare seal kits"
          ]
        ],
        "selling": "Top-mounted structure gives operators clean visibility and easy positioning for general breaking jobs.",
        "bullets": [
          "Good Visibility",
          "Easy Positioning",
          "Road & Concrete Work"
        ]
      }
    ],
    "features": [
      "KSB model range for compact to heavy carriers",
      "Heat-treated chisel and wear parts packages",
      "Bracket matching by pin diameter, arm width and center distance"
    ],
    "specs": [
      [
        "Model series",
        "KSB45 - KSB700 / KSB350 - KSB2100 reference logic"
      ],
      [
        "Carrier range",
        "1 - 90 ton excavators"
      ],
      [
        "Key matching data",
        "Excavator weight, oil flow, pressure, pin diameter, arm width"
      ],
      [
        "Common options",
        "Side type, box type, top type, chisel kits, spare seal kits"
      ]
    ],
    "applications": [
      "Concrete demolition",
      "Road repair",
      "Quarry secondary breaking",
      "Rock trenching",
      "Foundation removal"
    ],
    "choose": [
      "Match breaker class to excavator tonnage and hydraulic flow.",
      "Select side type for service access, box type for lower noise, top type for visibility.",
      "Send pin diameter, arm width and center distance before bracket production."
    ],
    "faq": [
      [
        "Which hydraulic breaker type is best for demolition?",
        "Box type is often selected for urban demolition, while side type is preferred when service access and heat release matter most."
      ],
      [
        "Do you keep the KSB model naming logic?",
        "Yes. Breaker recommendations follow the KSB series logic and are matched to carrier tonnage and hydraulic data."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KSB Series",
    "shortDescription": "KRATOR hydraulic breakers with KSB series logic for side type, box type and top type applications across demolition, quarry and trench work."
  },
  {
    "key": "couplers",
    "slug": "quick-coupler",
    "label": "Quick Couplers",
    "category": "Quick Couplers",
    "title": "Quick Coupler",
    "h1": "Quick Coupler",
    "eyebrow": "ZSN / ZSP / ZSH coupler logic",
    "tonnage": "1 - 90 ton",
    "image": "/images/products/featured/raw/quick-coupler.webp",
    "metaTitle": "Quick Coupler for Excavators | Hydraulic & Tilt Quick Coupler | KRATOR",
    "metaDescription": "KRATOR excavator quick couplers for fast attachment changes, including hydraulic, mechanical, P type and tilt quick coupler options. Send pin size and machine model for matching support.",
    "overview": "KRATOR hydraulic, mechanical, P type and tilt quick couplers help excavator owners, rental fleets and dealers change attachments faster while keeping pin dimensions, arm width, center distance and safety lock requirements clear before production.",
    "typeIntro": "Select the coupler by locking method, tilt requirement and attachment interchange plan.",
    "types": [
      {
        "slug": "p-type-quick-coupler",
        "category": "Quick Couplers",
        "title": "P Type Quick Coupler",
        "model": "ZSN / ZSP / ZSH Series",
        "tonnage": "1 - 25 ton",
        "image": "/images/products/featured/raw/quick-coupler.webp",
        "shortDescription": "Compact profile for common buckets and utility attachments.",
        "applications": [
          "Rental fleets",
          "Civil construction",
          "Road repair",
          "Earthmoving",
          "Multi-attachment projects"
        ],
        "features": [
          "Fast attachment changes",
          "Dealer-friendly fitment",
          "ZSN / ZSP / ZSH naming logic for clear model matching",
          "Pin-to-pin and pin-grabber configurations available",
          "Designed for buckets, breakers, rippers and handling attachments"
        ],
        "specs": [
          [
            "Product type",
            "P Type Quick Coupler"
          ],
          [
            "Model / series",
            "ZSN / ZSP / ZSH Series"
          ],
          [
            "Suitable carrier",
            "1 - 25 ton"
          ],
          [
            "Main category",
            "Quick Couplers"
          ],
          [
            "Series logic",
            "ZSN / ZSP / ZSH"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Matching data",
            "Pin diameter, arm width, center distance, bucket pin data"
          ],
          [
            "Options",
            "Mechanical, hydraulic, tilt, safety lock, custom bracket"
          ]
        ],
        "selling": "Compact profile for common buckets and utility attachments.",
        "bullets": [
          "Fast attachment changes",
          "Dealer-friendly fitment"
        ]
      },
      {
        "slug": "tilt-quick-coupler",
        "category": "Quick Couplers",
        "title": "Tilt Quick Coupler",
        "model": "ZSN / ZSP / ZSH Series",
        "tonnage": "3 - 30 ton",
        "image": "/images/products/featured/raw/quick-coupler.webp",
        "shortDescription": "Adds working angle flexibility for grading, trenching and shaping.",
        "applications": [
          "Rental fleets",
          "Civil construction",
          "Road repair",
          "Earthmoving",
          "Multi-attachment projects"
        ],
        "features": [
          "Tilt function",
          "More productive bucket work",
          "ZSN / ZSP / ZSH naming logic for clear model matching",
          "Pin-to-pin and pin-grabber configurations available",
          "Designed for buckets, breakers, rippers and handling attachments"
        ],
        "specs": [
          [
            "Product type",
            "Tilt Quick Coupler"
          ],
          [
            "Model / series",
            "ZSN / ZSP / ZSH Series"
          ],
          [
            "Suitable carrier",
            "3 - 30 ton"
          ],
          [
            "Main category",
            "Quick Couplers"
          ],
          [
            "Series logic",
            "ZSN / ZSP / ZSH"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Matching data",
            "Pin diameter, arm width, center distance, bucket pin data"
          ],
          [
            "Options",
            "Mechanical, hydraulic, tilt, safety lock, custom bracket"
          ]
        ],
        "selling": "Adds working angle flexibility for grading, trenching and shaping.",
        "bullets": [
          "Tilt function",
          "More productive bucket work"
        ]
      },
      {
        "slug": "hydraulic-quick-coupler",
        "category": "Quick Couplers",
        "title": "Hydraulic Quick Coupler",
        "model": "ZSN / ZSP / ZSH Series",
        "tonnage": "4 - 90 ton",
        "image": "/images/products/featured/raw/quick-coupler.webp",
        "shortDescription": "Cab-controlled locking for frequent attachment changes.",
        "applications": [
          "Rental fleets",
          "Civil construction",
          "Road repair",
          "Earthmoving",
          "Multi-attachment projects"
        ],
        "features": [
          "Hydraulic lock",
          "Safety valve options",
          "ZSN / ZSP / ZSH naming logic for clear model matching",
          "Pin-to-pin and pin-grabber configurations available",
          "Designed for buckets, breakers, rippers and handling attachments"
        ],
        "specs": [
          [
            "Product type",
            "Hydraulic Quick Coupler"
          ],
          [
            "Model / series",
            "ZSN / ZSP / ZSH Series"
          ],
          [
            "Suitable carrier",
            "4 - 90 ton"
          ],
          [
            "Main category",
            "Quick Couplers"
          ],
          [
            "Series logic",
            "ZSN / ZSP / ZSH"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Matching data",
            "Pin diameter, arm width, center distance, bucket pin data"
          ],
          [
            "Options",
            "Mechanical, hydraulic, tilt, safety lock, custom bracket"
          ]
        ],
        "selling": "Cab-controlled locking for frequent attachment changes.",
        "bullets": [
          "Hydraulic lock",
          "Safety valve options"
        ]
      },
      {
        "slug": "mechanical-quick-coupler",
        "category": "Quick Couplers",
        "title": "Mechanical Quick Coupler",
        "model": "ZSN / ZSP / ZSH Series",
        "tonnage": "1 - 30 ton",
        "image": "/images/products/featured/raw/quick-coupler.webp",
        "shortDescription": "Simple structure for budget-focused fleets and low-maintenance jobs.",
        "applications": [
          "Rental fleets",
          "Civil construction",
          "Road repair",
          "Earthmoving",
          "Multi-attachment projects"
        ],
        "features": [
          "Simple locking",
          "Low maintenance",
          "ZSN / ZSP / ZSH naming logic for clear model matching",
          "Pin-to-pin and pin-grabber configurations available",
          "Designed for buckets, breakers, rippers and handling attachments"
        ],
        "specs": [
          [
            "Product type",
            "Mechanical Quick Coupler"
          ],
          [
            "Model / series",
            "ZSN / ZSP / ZSH Series"
          ],
          [
            "Suitable carrier",
            "1 - 30 ton"
          ],
          [
            "Main category",
            "Quick Couplers"
          ],
          [
            "Series logic",
            "ZSN / ZSP / ZSH"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Matching data",
            "Pin diameter, arm width, center distance, bucket pin data"
          ],
          [
            "Options",
            "Mechanical, hydraulic, tilt, safety lock, custom bracket"
          ]
        ],
        "selling": "Simple structure for budget-focused fleets and low-maintenance jobs.",
        "bullets": [
          "Simple locking",
          "Low maintenance"
        ]
      }
    ],
    "features": [
      "ZSN / ZSP / ZSH naming logic for clear model matching",
      "Pin-to-pin and pin-grabber configurations available",
      "Designed for buckets, breakers, rippers and handling attachments"
    ],
    "specs": [
      [
        "Series logic",
        "ZSN / ZSP / ZSH"
      ],
      [
        "Carrier range",
        "1 - 90 ton excavators"
      ],
      [
        "Matching data",
        "Pin diameter, arm width, center distance, bucket pin data"
      ],
      [
        "Options",
        "Mechanical, hydraulic, tilt, safety lock, custom bracket"
      ]
    ],
    "applications": [
      "Rental fleets",
      "Civil construction",
      "Road repair",
      "Earthmoving",
      "Multi-attachment projects"
    ],
    "choose": [
      "Confirm whether you need hydraulic locking or a mechanical budget option.",
      "Measure pin diameter, arm width and pin center distance accurately.",
      "List all attachments that must be shared through the coupler."
    ],
    "faq": [
      [
        "Can one quick coupler fit several attachments?",
        "Yes, when the attachments share compatible pin dimensions or are supplied with matching brackets."
      ],
      [
        "What is the difference between ZSN, ZSP and ZSH?",
        "They are used as internal model logic for different coupler structures and excavator classes."
      ]
    ],
    "category": "Primary Product Category",
    "model": "ZSN / ZSP / ZSH Series",
    "shortDescription": "Excavator quick couplers using ZSN, ZSP and ZSH naming logic, including P type, tilt, hydraulic and mechanical quick coupler options."
  },
  {
    "key": "pile-hammers",
    "slug": "vibratory-pile-hammer",
    "label": "Vibratory Pile Hammers",
    "category": "Vibratory Pile Hammers",
    "title": "Vibratory Pile Hammer",
    "h1": "Vibratory Pile Hammer",
    "eyebrow": "S series pile hammer range",
    "tonnage": "15 - 90 ton",
    "image": "/images/products/featured/raw/pile-driver.webp",
    "metaTitle": "Vibratory Pile Hammer for Excavators | Sheet Pile Driver | KRATOR",
    "metaDescription": "KRATOR excavator vibratory pile hammers and sheet pile drivers for foundation, guardrail, solar pile and trench support projects. Send excavator model and pile type for matching support.",
    "overview": "KRATOR vibratory pile hammers are designed for foundation contractors who need practical pile handling, stable vibration and clamp choices for different pile profiles. The S series covers side grip, top clamp and multi-function pile driving configurations.",
    "typeIntro": "Hammer type and jaw selection should follow pile shape, soil condition and excavator tonnage.",
    "types": [
      {
        "slug": "side-grip-vibratory-pile-hammer",
        "category": "Vibratory Pile Hammers",
        "title": "Side Grip Vibratory Pile Hammer",
        "model": "S Series",
        "tonnage": "15 - 50 ton",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Grips piles from the side for confined jobsites and fast positioning.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Side grip clamp",
          "Urban piling work",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Side Grip Vibratory Pile Hammer"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "15 - 50 ton"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Grips piles from the side for confined jobsites and fast positioning.",
        "bullets": [
          "Side grip clamp",
          "Urban piling work"
        ]
      },
      {
        "slug": "top-clamp-vibratory-pile-hammer",
        "category": "Vibratory Pile Hammers",
        "title": "Top Clamp Vibratory Pile Hammer",
        "model": "S Series",
        "tonnage": "15 - 90 ton",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Top clamp structure for sheet piles and vertical driving control.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "S series logic",
          "Sheet pile driving",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Top Clamp Vibratory Pile Hammer"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "15 - 90 ton"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Top clamp structure for sheet piles and vertical driving control.",
        "bullets": [
          "S series logic",
          "Sheet pile driving"
        ]
      },
      {
        "slug": "excavator-mounted-pile-driver",
        "category": "Vibratory Pile Hammers",
        "title": "Excavator Mounted Pile Driver",
        "model": "S Series",
        "tonnage": "5 - 35 ton",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Compact pile driving setup for solar piles, small sheet piles and retaining works.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Excavator mounted",
          "Fast mobilization",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Excavator Mounted Pile Driver"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "5 - 35 ton"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Compact pile driving setup for solar piles, small sheet piles and retaining works.",
        "bullets": [
          "Excavator mounted",
          "Fast mobilization"
        ]
      },
      {
        "slug": "multi-function-pile-driver",
        "category": "Vibratory Pile Hammers",
        "title": "Multi-Function Pile Driver",
        "model": "S Series",
        "tonnage": "12 - 60 ton",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Configurable jaws support multiple pile profiles on one base hammer.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Jaw options",
          "Dealer package option",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Multi-Function Pile Driver"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "12 - 60 ton"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Configurable jaws support multiple pile profiles on one base hammer.",
        "bullets": [
          "Jaw options",
          "Dealer package option"
        ]
      },
      {
        "slug": "sheet-pile-clamp",
        "category": "Vibratory Pile Hammers",
        "title": "Sheet Pile Clamp",
        "model": "S Series",
        "tonnage": "By pile profile",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Clamp option for steel sheet piles and cofferdam projects.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Pile clamp option",
          "S series accessory",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Sheet Pile Clamp"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "By pile profile"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Clamp option for steel sheet piles and cofferdam projects.",
        "bullets": [
          "Pile clamp option",
          "S series accessory"
        ]
      },
      {
        "slug": "h-beam-clamp",
        "category": "Vibratory Pile Hammers",
        "title": "H-Beam Clamp",
        "model": "S Series",
        "tonnage": "By beam size",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Jaw solution for H-beams used in temporary and permanent works.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Beam matching",
          "Custom jaw available",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "H-Beam Clamp"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "By beam size"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Jaw solution for H-beams used in temporary and permanent works.",
        "bullets": [
          "Beam matching",
          "Custom jaw available"
        ]
      },
      {
        "slug": "pipe-pile-clamp",
        "category": "Vibratory Pile Hammers",
        "title": "Pipe Pile Clamp",
        "model": "S Series",
        "tonnage": "By pipe diameter",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Curved jaw support for round pipe piles and guardrail posts.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Pipe pile fitment",
          "Diameter matching",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Pipe Pile Clamp"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "By pipe diameter"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Curved jaw support for round pipe piles and guardrail posts.",
        "bullets": [
          "Pipe pile fitment",
          "Diameter matching"
        ]
      },
      {
        "slug": "concrete-pile-clamp",
        "category": "Vibratory Pile Hammers",
        "title": "Concrete Pile Clamp",
        "model": "S Series",
        "tonnage": "By pile size",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Clamp solution for selected precast concrete pile handling tasks.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Concrete pile option",
          "Project-specific sizing",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Concrete Pile Clamp"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "By pile size"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Clamp solution for selected precast concrete pile handling tasks.",
        "bullets": [
          "Concrete pile option",
          "Project-specific sizing"
        ]
      },
      {
        "slug": "timber-pile-clamp",
        "category": "Vibratory Pile Hammers",
        "title": "Timber Pile Clamp",
        "model": "S Series",
        "tonnage": "By pile size",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Jaw option for timber pile installation in marine and soft ground work.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Timber pile handling",
          "Low-mark grip design",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Timber Pile Clamp"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "By pile size"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Jaw option for timber pile installation in marine and soft ground work.",
        "bullets": [
          "Timber pile handling",
          "Low-mark grip design"
        ]
      },
      {
        "slug": "custom-jaw-solution",
        "category": "Vibratory Pile Hammers",
        "title": "Custom Jaw Solution",
        "model": "S Series",
        "tonnage": "Custom",
        "image": "/images/products/featured/raw/pile-driver.webp",
        "shortDescription": "Made-to-order jaw geometry for unusual piles and regional standards.",
        "applications": [
          "Sheet pile driving",
          "Foundation works",
          "Solar pile installation",
          "River cofferdams",
          "Utility trench support"
        ],
        "features": [
          "Drawing-based design",
          "OEM support",
          "S series model logic for pile hammer matching",
          "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
          "Built for contractors, rental fleets and foundation equipment dealers"
        ],
        "specs": [
          [
            "Product type",
            "Custom Jaw Solution"
          ],
          [
            "Model / series",
            "S Series"
          ],
          [
            "Suitable carrier",
            "Custom"
          ],
          [
            "Main category",
            "Vibratory Pile Hammers"
          ],
          [
            "Model series",
            "S35 - S180 reference logic"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Key matching data",
            "Pile type, pile dimension, soil condition, excavator tonnage"
          ],
          [
            "Options",
            "Side grip, top clamp, custom jaw, power pack planning support"
          ]
        ],
        "selling": "Made-to-order jaw geometry for unusual piles and regional standards.",
        "bullets": [
          "Drawing-based design",
          "OEM support"
        ]
      }
    ],
    "features": [
      "S series model logic for pile hammer matching",
      "Jaw options for sheet pile, H-beam, pipe pile, concrete pile and timber pile",
      "Built for contractors, rental fleets and foundation equipment dealers"
    ],
    "specs": [
      [
        "Model series",
        "S35 - S180 reference logic"
      ],
      [
        "Carrier range",
        "15 - 90 ton excavators"
      ],
      [
        "Key matching data",
        "Pile type, pile dimension, soil condition, excavator tonnage"
      ],
      [
        "Options",
        "Side grip, top clamp, custom jaw, power pack planning support"
      ]
    ],
    "applications": [
      "Sheet pile driving",
      "Foundation works",
      "Solar pile installation",
      "River cofferdams",
      "Utility trench support"
    ],
    "choose": [
      "Confirm pile profile first: sheet pile, H-beam, pipe, concrete or timber.",
      "Match hammer size to excavator tonnage and hydraulic flow.",
      "Choose side grip for confined handling or top clamp for vertical driving stability."
    ],
    "faq": [
      [
        "Can one hammer use different clamps?",
        "Many configurations can support different jaw sets, but the pile profile and hammer base must be checked together."
      ],
      [
        "Do you supply S series pile hammer models?",
        "Yes. Recommendations follow the S series logic and include clamp or jaw solutions when required."
      ]
    ],
    "aliases": [],
    "category": "Primary Product Category",
    "model": "S Series",
    "shortDescription": "S series vibratory pile hammers and excavator mounted pile drivers with sheet pile, H-beam, pipe pile, concrete pile and timber pile clamp options."
  },
  {
    "key": "shears",
    "slug": "hydraulic-shear",
    "label": "Demolition Shears",
    "category": "Demolition Shears",
    "title": "Demolition Shears",
    "h1": "Hydraulic Demolition Shears",
    "eyebrow": "Steel cutting and demolition attachments",
    "tonnage": "5 - 90 ton",
    "image": "/images/products/featured/raw/hydraulic-shear.webp",
    "metaTitle": "Demolition Shears | Rotating, Fixed, Steel Cutting and Scrap Shears",
    "metaDescription": "Hydraulic demolition shears for excavators, including rotating shear, fixed shear, steel cutting shear, scrap shear and double cylinder demolition shear.",
    "overview": "KRATOR demolition shears are built for metal cutting, structural dismantling and scrap processing where jaw strength and cylinder reliability matter. Configurations are selected by material type, excavator tonnage and rotation requirement.",
    "typeIntro": "Choose shear structure by cutting target, rotation demand and processing speed.",
    "types": [
      {
        "slug": "rotating-demolition-shear",
        "category": "Demolition Shears",
        "title": "Rotating Demolition Shear",
        "model": "KRATOR DS Series",
        "tonnage": "12 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-shear.webp",
        "shortDescription": "360 degree positioning supports complex demolition and recycling cuts.",
        "applications": [
          "Building demolition",
          "Steel structure dismantling",
          "Scrap recycling",
          "Industrial plant removal",
          "Bridge repair work"
        ],
        "features": [
          "Rotation control",
          "Precise positioning",
          "Optional rotation for better working angle",
          "Replaceable cutting blades and wear parts",
          "Jaw structures matched to steel, scrap and demolition conditions"
        ],
        "specs": [
          [
            "Product type",
            "Rotating Demolition Shear"
          ],
          [
            "Model / series",
            "KRATOR DS Series"
          ],
          [
            "Suitable carrier",
            "12 - 90 ton"
          ],
          [
            "Main category",
            "Demolition Shears"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Cutting targets",
            "Steel beams, plate, rebar, scrap, selected concrete elements"
          ],
          [
            "Matching data",
            "Material type, thickness, excavator weight, hydraulic flow"
          ],
          [
            "Options",
            "Rotating body, fixed body, double cylinder, custom bracket"
          ]
        ],
        "selling": "360 degree positioning supports complex demolition and recycling cuts.",
        "bullets": [
          "Rotation control",
          "Precise positioning"
        ]
      },
      {
        "slug": "fixed-demolition-shear",
        "category": "Demolition Shears",
        "title": "Fixed Demolition Shear",
        "model": "KRATOR DS Series",
        "tonnage": "8 - 60 ton",
        "image": "/images/products/featured/raw/hydraulic-shear.webp",
        "shortDescription": "Rigid structure for stable straight cutting and lower maintenance demand.",
        "applications": [
          "Building demolition",
          "Steel structure dismantling",
          "Scrap recycling",
          "Industrial plant removal",
          "Bridge repair work"
        ],
        "features": [
          "Fixed jaw body",
          "Simple maintenance",
          "Optional rotation for better working angle",
          "Replaceable cutting blades and wear parts",
          "Jaw structures matched to steel, scrap and demolition conditions"
        ],
        "specs": [
          [
            "Product type",
            "Fixed Demolition Shear"
          ],
          [
            "Model / series",
            "KRATOR DS Series"
          ],
          [
            "Suitable carrier",
            "8 - 60 ton"
          ],
          [
            "Main category",
            "Demolition Shears"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Cutting targets",
            "Steel beams, plate, rebar, scrap, selected concrete elements"
          ],
          [
            "Matching data",
            "Material type, thickness, excavator weight, hydraulic flow"
          ],
          [
            "Options",
            "Rotating body, fixed body, double cylinder, custom bracket"
          ]
        ],
        "selling": "Rigid structure for stable straight cutting and lower maintenance demand.",
        "bullets": [
          "Fixed jaw body",
          "Simple maintenance"
        ]
      },
      {
        "slug": "steel-cutting-shear",
        "category": "Demolition Shears",
        "title": "Steel Cutting Shear",
        "model": "KRATOR DS Series",
        "tonnage": "12 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-shear.webp",
        "shortDescription": "Designed for beams, plate and structural steel processing.",
        "applications": [
          "Building demolition",
          "Steel structure dismantling",
          "Scrap recycling",
          "Industrial plant removal",
          "Bridge repair work"
        ],
        "features": [
          "Steel cutting jaw",
          "Replaceable blades",
          "Optional rotation for better working angle",
          "Replaceable cutting blades and wear parts",
          "Jaw structures matched to steel, scrap and demolition conditions"
        ],
        "specs": [
          [
            "Product type",
            "Steel Cutting Shear"
          ],
          [
            "Model / series",
            "KRATOR DS Series"
          ],
          [
            "Suitable carrier",
            "12 - 90 ton"
          ],
          [
            "Main category",
            "Demolition Shears"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Cutting targets",
            "Steel beams, plate, rebar, scrap, selected concrete elements"
          ],
          [
            "Matching data",
            "Material type, thickness, excavator weight, hydraulic flow"
          ],
          [
            "Options",
            "Rotating body, fixed body, double cylinder, custom bracket"
          ]
        ],
        "selling": "Designed for beams, plate and structural steel processing.",
        "bullets": [
          "Steel cutting jaw",
          "Replaceable blades"
        ]
      },
      {
        "slug": "scrap-shear",
        "category": "Demolition Shears",
        "title": "Scrap Shear",
        "model": "KRATOR DS Series",
        "tonnage": "10 - 70 ton",
        "image": "/images/products/featured/raw/hydraulic-shear.webp",
        "shortDescription": "Practical option for recycling yards and mixed scrap handling.",
        "applications": [
          "Building demolition",
          "Steel structure dismantling",
          "Scrap recycling",
          "Industrial plant removal",
          "Bridge repair work"
        ],
        "features": [
          "Scrap yard work",
          "Fast cycle planning",
          "Optional rotation for better working angle",
          "Replaceable cutting blades and wear parts",
          "Jaw structures matched to steel, scrap and demolition conditions"
        ],
        "specs": [
          [
            "Product type",
            "Scrap Shear"
          ],
          [
            "Model / series",
            "KRATOR DS Series"
          ],
          [
            "Suitable carrier",
            "10 - 70 ton"
          ],
          [
            "Main category",
            "Demolition Shears"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Cutting targets",
            "Steel beams, plate, rebar, scrap, selected concrete elements"
          ],
          [
            "Matching data",
            "Material type, thickness, excavator weight, hydraulic flow"
          ],
          [
            "Options",
            "Rotating body, fixed body, double cylinder, custom bracket"
          ]
        ],
        "selling": "Practical option for recycling yards and mixed scrap handling.",
        "bullets": [
          "Scrap yard work",
          "Fast cycle planning"
        ]
      },
      {
        "slug": "double-cylinder-demolition-shear",
        "category": "Demolition Shears",
        "title": "Double Cylinder Demolition Shear",
        "model": "KRATOR DS Series",
        "tonnage": "20 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-shear.webp",
        "shortDescription": "Dual cylinder force for demanding concrete and steel demolition.",
        "applications": [
          "Building demolition",
          "Steel structure dismantling",
          "Scrap recycling",
          "Industrial plant removal",
          "Bridge repair work"
        ],
        "features": [
          "High closing force",
          "Heavy demolition",
          "Optional rotation for better working angle",
          "Replaceable cutting blades and wear parts",
          "Jaw structures matched to steel, scrap and demolition conditions"
        ],
        "specs": [
          [
            "Product type",
            "Double Cylinder Demolition Shear"
          ],
          [
            "Model / series",
            "KRATOR DS Series"
          ],
          [
            "Suitable carrier",
            "20 - 90 ton"
          ],
          [
            "Main category",
            "Demolition Shears"
          ],
          [
            "Carrier range",
            "15 - 90 ton excavators"
          ],
          [
            "Cutting targets",
            "Steel beams, plate, rebar, scrap, selected concrete elements"
          ],
          [
            "Matching data",
            "Material type, thickness, excavator weight, hydraulic flow"
          ],
          [
            "Options",
            "Rotating body, fixed body, double cylinder, custom bracket"
          ]
        ],
        "selling": "Dual cylinder force for demanding concrete and steel demolition.",
        "bullets": [
          "High closing force",
          "Heavy demolition"
        ]
      }
    ],
    "features": [
      "Optional rotation for better working angle",
      "Replaceable cutting blades and wear parts",
      "Jaw structures matched to steel, scrap and demolition conditions"
    ],
    "specs": [
      [
        "Carrier range",
        "15 - 90 ton excavators"
      ],
      [
        "Cutting targets",
        "Steel beams, plate, rebar, scrap, selected concrete elements"
      ],
      [
        "Matching data",
        "Material type, thickness, excavator weight, hydraulic flow"
      ],
      [
        "Options",
        "Rotating body, fixed body, double cylinder, custom bracket"
      ]
    ],
    "applications": [
      "Building demolition",
      "Steel structure dismantling",
      "Scrap recycling",
      "Industrial plant removal",
      "Bridge repair work"
    ],
    "choose": [
      "Select rotating shear when angle control is important.",
      "Provide steel thickness and material type for cutting-force matching.",
      "Choose double cylinder designs for heavier demolition loads."
    ],
    "faq": [
      [
        "Can demolition shears cut rebar and structural steel?",
        "Yes, model selection depends on steel thickness, jaw type and excavator hydraulic output."
      ],
      [
        "Should I choose rotating or fixed shear?",
        "Rotating shears offer better positioning; fixed shears are simpler and often more economical."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR DS Series",
    "shortDescription": "Hydraulic demolition shears for excavators, including rotating shear, fixed shear, steel cutting shear, scrap shear and double cylinder demolition shear."
  },
  {
    "key": "pulverizers",
    "slug": "hydraulic-pulverizer",
    "label": "Hydraulic Pulverizers",
    "category": "Hydraulic Pulverizers",
    "title": "Hydraulic Pulverizers",
    "h1": "Hydraulic Pulverizers and Concrete Crushers",
    "eyebrow": "Concrete crushing attachments",
    "tonnage": "6 - 90 ton",
    "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
    "metaTitle": "Hydraulic Pulverizers | Fixed, Rotating, Primary and Secondary Pulverizers",
    "metaDescription": "Excavator hydraulic pulverizers and concrete crushers for primary demolition, secondary crushing and concrete recycling.",
    "overview": "KRATOR hydraulic pulverizers are used to crush concrete, separate rebar and reduce demolition material for recycling. Fixed and rotating structures are available for primary and secondary work.",
    "typeIntro": "Select pulverizer type by demolition stage, rotation demand and concrete size.",
    "types": [
      {
        "slug": "fixed-pulverizer",
        "category": "Hydraulic Pulverizers",
        "title": "Fixed Pulverizer",
        "model": "KRATOR HP Series",
        "tonnage": "6 - 45 ton",
        "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
        "shortDescription": "Straightforward crushing tool for stable secondary demolition.",
        "applications": [
          "Concrete building demolition",
          "Bridge slab removal",
          "Rebar separation",
          "Recycling yards",
          "Foundation crushing"
        ],
        "features": [
          "Fixed body",
          "Low service demand",
          "Fixed and rotating designs for different demolition stages",
          "Tooth and blade layouts for concrete reduction and rebar separation",
          "Bracket matching for common excavator brands"
        ],
        "specs": [
          [
            "Product type",
            "Fixed Pulverizer"
          ],
          [
            "Model / series",
            "KRATOR HP Series"
          ],
          [
            "Suitable carrier",
            "6 - 45 ton"
          ],
          [
            "Main category",
            "Hydraulic Pulverizers"
          ],
          [
            "Carrier range",
            "6 - 90 ton excavators"
          ],
          [
            "Work stages",
            "Primary demolition, secondary crushing, concrete recycling"
          ],
          [
            "Matching data",
            "Excavator tonnage, concrete thickness, rebar condition"
          ],
          [
            "Options",
            "Fixed, rotating, replaceable teeth, custom bracket"
          ]
        ],
        "selling": "Straightforward crushing tool for stable secondary demolition.",
        "bullets": [
          "Fixed body",
          "Low service demand"
        ]
      },
      {
        "slug": "rotating-pulverizer",
        "category": "Hydraulic Pulverizers",
        "title": "Rotating Pulverizer",
        "model": "KRATOR HP Series",
        "tonnage": "12 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
        "shortDescription": "Rotation improves jaw positioning around columns, beams and slabs.",
        "applications": [
          "Concrete building demolition",
          "Bridge slab removal",
          "Rebar separation",
          "Recycling yards",
          "Foundation crushing"
        ],
        "features": [
          "Rotating head",
          "Better positioning",
          "Fixed and rotating designs for different demolition stages",
          "Tooth and blade layouts for concrete reduction and rebar separation",
          "Bracket matching for common excavator brands"
        ],
        "specs": [
          [
            "Product type",
            "Rotating Pulverizer"
          ],
          [
            "Model / series",
            "KRATOR HP Series"
          ],
          [
            "Suitable carrier",
            "12 - 90 ton"
          ],
          [
            "Main category",
            "Hydraulic Pulverizers"
          ],
          [
            "Carrier range",
            "6 - 90 ton excavators"
          ],
          [
            "Work stages",
            "Primary demolition, secondary crushing, concrete recycling"
          ],
          [
            "Matching data",
            "Excavator tonnage, concrete thickness, rebar condition"
          ],
          [
            "Options",
            "Fixed, rotating, replaceable teeth, custom bracket"
          ]
        ],
        "selling": "Rotation improves jaw positioning around columns, beams and slabs.",
        "bullets": [
          "Rotating head",
          "Better positioning"
        ]
      },
      {
        "slug": "primary-pulverizer",
        "category": "Hydraulic Pulverizers",
        "title": "Primary Pulverizer",
        "model": "KRATOR HP Series",
        "tonnage": "18 - 90 ton",
        "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
        "shortDescription": "Built for initial concrete breaking and structural dismantling.",
        "applications": [
          "Concrete building demolition",
          "Bridge slab removal",
          "Rebar separation",
          "Recycling yards",
          "Foundation crushing"
        ],
        "features": [
          "Primary demolition",
          "High jaw force",
          "Fixed and rotating designs for different demolition stages",
          "Tooth and blade layouts for concrete reduction and rebar separation",
          "Bracket matching for common excavator brands"
        ],
        "specs": [
          [
            "Product type",
            "Primary Pulverizer"
          ],
          [
            "Model / series",
            "KRATOR HP Series"
          ],
          [
            "Suitable carrier",
            "18 - 90 ton"
          ],
          [
            "Main category",
            "Hydraulic Pulverizers"
          ],
          [
            "Carrier range",
            "6 - 90 ton excavators"
          ],
          [
            "Work stages",
            "Primary demolition, secondary crushing, concrete recycling"
          ],
          [
            "Matching data",
            "Excavator tonnage, concrete thickness, rebar condition"
          ],
          [
            "Options",
            "Fixed, rotating, replaceable teeth, custom bracket"
          ]
        ],
        "selling": "Built for initial concrete breaking and structural dismantling.",
        "bullets": [
          "Primary demolition",
          "High jaw force"
        ]
      },
      {
        "slug": "secondary-pulverizer",
        "category": "Hydraulic Pulverizers",
        "title": "Secondary Pulverizer",
        "model": "KRATOR HP Series",
        "tonnage": "8 - 60 ton",
        "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
        "shortDescription": "Efficiently crushes demolished concrete for rebar separation.",
        "applications": [
          "Concrete building demolition",
          "Bridge slab removal",
          "Rebar separation",
          "Recycling yards",
          "Foundation crushing"
        ],
        "features": [
          "Secondary crushing",
          "Recycling prep",
          "Fixed and rotating designs for different demolition stages",
          "Tooth and blade layouts for concrete reduction and rebar separation",
          "Bracket matching for common excavator brands"
        ],
        "specs": [
          [
            "Product type",
            "Secondary Pulverizer"
          ],
          [
            "Model / series",
            "KRATOR HP Series"
          ],
          [
            "Suitable carrier",
            "8 - 60 ton"
          ],
          [
            "Main category",
            "Hydraulic Pulverizers"
          ],
          [
            "Carrier range",
            "6 - 90 ton excavators"
          ],
          [
            "Work stages",
            "Primary demolition, secondary crushing, concrete recycling"
          ],
          [
            "Matching data",
            "Excavator tonnage, concrete thickness, rebar condition"
          ],
          [
            "Options",
            "Fixed, rotating, replaceable teeth, custom bracket"
          ]
        ],
        "selling": "Efficiently crushes demolished concrete for rebar separation.",
        "bullets": [
          "Secondary crushing",
          "Recycling prep"
        ]
      },
      {
        "slug": "concrete-crusher",
        "category": "Hydraulic Pulverizers",
        "title": "Concrete Crusher",
        "model": "KRATOR HP Series",
        "tonnage": "8 - 70 ton",
        "image": "/images/products/featured/raw/hydraulic-pulverizer.webp",
        "shortDescription": "Practical concrete reduction tool for site cleanup and processing.",
        "applications": [
          "Concrete building demolition",
          "Bridge slab removal",
          "Rebar separation",
          "Recycling yards",
          "Foundation crushing"
        ],
        "features": [
          "Concrete crushing",
          "Rebar separation",
          "Fixed and rotating designs for different demolition stages",
          "Tooth and blade layouts for concrete reduction and rebar separation",
          "Bracket matching for common excavator brands"
        ],
        "specs": [
          [
            "Product type",
            "Concrete Crusher"
          ],
          [
            "Model / series",
            "KRATOR HP Series"
          ],
          [
            "Suitable carrier",
            "8 - 70 ton"
          ],
          [
            "Main category",
            "Hydraulic Pulverizers"
          ],
          [
            "Carrier range",
            "6 - 90 ton excavators"
          ],
          [
            "Work stages",
            "Primary demolition, secondary crushing, concrete recycling"
          ],
          [
            "Matching data",
            "Excavator tonnage, concrete thickness, rebar condition"
          ],
          [
            "Options",
            "Fixed, rotating, replaceable teeth, custom bracket"
          ]
        ],
        "selling": "Practical concrete reduction tool for site cleanup and processing.",
        "bullets": [
          "Concrete crushing",
          "Rebar separation"
        ]
      }
    ],
    "features": [
      "Fixed and rotating designs for different demolition stages",
      "Tooth and blade layouts for concrete reduction and rebar separation",
      "Bracket matching for common excavator brands"
    ],
    "specs": [
      [
        "Carrier range",
        "6 - 90 ton excavators"
      ],
      [
        "Work stages",
        "Primary demolition, secondary crushing, concrete recycling"
      ],
      [
        "Matching data",
        "Excavator tonnage, concrete thickness, rebar condition"
      ],
      [
        "Options",
        "Fixed, rotating, replaceable teeth, custom bracket"
      ]
    ],
    "applications": [
      "Concrete building demolition",
      "Bridge slab removal",
      "Rebar separation",
      "Recycling yards",
      "Foundation crushing"
    ],
    "choose": [
      "Use rotating pulverizers when access angle changes often.",
      "Use fixed pulverizers for simple secondary crushing and lower cost.",
      "Provide concrete thickness and rebar density for model selection."
    ],
    "faq": [
      [
        "Is a pulverizer different from a demolition shear?",
        "Yes. Pulverizers crush concrete; shears are mainly selected for steel cutting and structural metal work."
      ],
      [
        "Can pulverizers separate rebar?",
        "They can help expose and separate rebar during concrete crushing, depending on jaw design and material thickness."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR HP Series",
    "shortDescription": "Excavator hydraulic pulverizers and concrete crushers for primary demolition, secondary crushing and concrete recycling."
  },
  {
    "key": "grapples",
    "slug": "grapples",
    "label": "Hydraulic Grapples",
    "category": "Hydraulic Grapples",
    "title": "Hydraulic Grapples",
    "h1": "Hydraulic Grapples for Excavators",
    "eyebrow": "Sorting, demolition, log and scrap handling",
    "tonnage": "1 - 90 ton",
    "image": "/images/products/featured/raw/grapple.webp",
    "metaTitle": "Hydraulic Grapples | Sorting, Demolition, Log, Orange Peel and Scrap Grapples",
    "metaDescription": "Excavator hydraulic grapples for sorting, demolition, log handling, stone handling, scrap recycling and orange peel applications.",
    "overview": "KRATOR hydraulic grapples help contractors handle irregular material with control and speed. Jaw geometry is matched to logs, scrap, stone, demolition waste or recycling material.",
    "typeIntro": "Select grapple style by material shape, required grip area and rotation demand.",
    "types": [
      {
        "slug": "sorting-grapple",
        "category": "Hydraulic Grapples",
        "title": "Sorting Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "5 - 45 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Controlled material sorting for demolition waste and recycling yards.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Wide sorting jaw",
          "Material handling",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Sorting Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "5 - 45 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Controlled material sorting for demolition waste and recycling yards.",
        "bullets": [
          "Wide sorting jaw",
          "Material handling"
        ]
      },
      {
        "slug": "demolition-grapple",
        "category": "Hydraulic Grapples",
        "title": "Demolition Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "8 - 60 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Robust jaw structure for mixed debris and demolition cleanup.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Debris handling",
          "Heavy jaw design",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Demolition Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "8 - 60 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Robust jaw structure for mixed debris and demolition cleanup.",
        "bullets": [
          "Debris handling",
          "Heavy jaw design"
        ]
      },
      {
        "slug": "log-grapple",
        "category": "Hydraulic Grapples",
        "title": "Log Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "3 - 35 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Curved jaws secure logs, timber and forestry material.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Forestry use",
          "Curved jaw",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Log Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "3 - 35 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Curved jaws secure logs, timber and forestry material.",
        "bullets": [
          "Forestry use",
          "Curved jaw"
        ]
      },
      {
        "slug": "orange-peel-grapple",
        "category": "Hydraulic Grapples",
        "title": "Orange Peel Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "10 - 90 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Multi-tine design for scrap, loose material and bulk handling.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Multi-tine grip",
          "Scrap processing",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Orange Peel Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "10 - 90 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Multi-tine design for scrap, loose material and bulk handling.",
        "bullets": [
          "Multi-tine grip",
          "Scrap processing"
        ]
      },
      {
        "slug": "stone-grapple",
        "category": "Hydraulic Grapples",
        "title": "Stone Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "5 - 45 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Jaw profile supports rocks, blocks and quarry handling tasks.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Stone handling",
          "Strong side plates",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Stone Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "5 - 45 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Jaw profile supports rocks, blocks and quarry handling tasks.",
        "bullets": [
          "Stone handling",
          "Strong side plates"
        ]
      },
      {
        "slug": "scrap-grapple",
        "category": "Hydraulic Grapples",
        "title": "Scrap Grapple",
        "model": "KRATOR HG Series",
        "tonnage": "8 - 70 ton",
        "image": "/images/products/featured/raw/grapple.webp",
        "shortDescription": "Designed for scrap yards, metal handling and loading operations.",
        "applications": [
          "Scrap recycling",
          "Forestry handling",
          "Demolition cleanup",
          "Quarry loading",
          "Waste sorting"
        ],
        "features": [
          "Scrap yard work",
          "Rotation option",
          "Jaw geometries for logs, stone, scrap and mixed demolition material",
          "Rotation and non-rotation options",
          "Pin or coupler mounting by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Scrap Grapple"
          ],
          [
            "Model / series",
            "KRATOR HG Series"
          ],
          [
            "Suitable carrier",
            "8 - 70 ton"
          ],
          [
            "Main category",
            "Hydraulic Grapples"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Material types",
            "Wood, stone, scrap, demolition debris, recycling material"
          ],
          [
            "Matching data",
            "Material size, working weight, excavator tonnage, rotation requirement"
          ],
          [
            "Options",
            "Sorting jaw, log jaw, orange peel jaw, custom mounting"
          ]
        ],
        "selling": "Designed for scrap yards, metal handling and loading operations.",
        "bullets": [
          "Scrap yard work",
          "Rotation option"
        ]
      }
    ],
    "features": [
      "Jaw geometries for logs, stone, scrap and mixed demolition material",
      "Rotation and non-rotation options",
      "Pin or coupler mounting by excavator model"
    ],
    "specs": [
      [
        "Carrier range",
        "1 - 90 ton excavators"
      ],
      [
        "Material types",
        "Wood, stone, scrap, demolition debris, recycling material"
      ],
      [
        "Matching data",
        "Material size, working weight, excavator tonnage, rotation requirement"
      ],
      [
        "Options",
        "Sorting jaw, log jaw, orange peel jaw, custom mounting"
      ]
    ],
    "applications": [
      "Scrap recycling",
      "Forestry handling",
      "Demolition cleanup",
      "Quarry loading",
      "Waste sorting"
    ],
    "choose": [
      "Define the main material before choosing jaw shape.",
      "Use rotation where precise placement and sorting are required.",
      "Share photos of typical material piles for better jaw selection."
    ],
    "faq": [
      [
        "Which grapple is best for forestry?",
        "Log grapples are usually preferred for timber because the curved jaws hold round material better."
      ],
      [
        "Can one grapple handle scrap and demolition debris?",
        "A demolition or sorting grapple can handle mixed material, but orange peel grapples are better for loose scrap."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR HG Series",
    "shortDescription": "Excavator hydraulic grapples for sorting, demolition, log handling, stone handling, scrap recycling and orange peel applications."
  },
  {
    "key": "compactors",
    "slug": "plate-compactors",
    "label": "Plate Compactors",
    "category": "Plate Compactors",
    "title": "Plate Compactors",
    "h1": "Hydraulic Plate Compactors",
    "eyebrow": "Trench, slope and road shoulder compaction",
    "tonnage": "3 - 70 ton",
    "image": "/images/products/featured/raw/plate-compactor.webp",
    "metaTitle": "Plate Compactors | Standard, Hydraulic, Tilt and Heavy Duty Compactors",
    "metaDescription": "Excavator plate compactors for trench backfill, foundations, slopes and road shoulders, including standard, hydraulic, tilt and heavy duty options.",
    "overview": "KRATOR plate compactors mount to excavators for trench backfill, slope compaction and foundation preparation. They help crews compact areas that rollers cannot safely reach.",
    "typeIntro": "Select compactor type by carrier size, access angle and soil condition.",
    "types": [
      {
        "slug": "standard-plate-compactor",
        "category": "Plate Compactors",
        "title": "Standard Plate Compactor",
        "model": "KRATOR PC Series",
        "tonnage": "3 - 20 ton",
        "image": "/images/products/featured/raw/plate-compactor.webp",
        "shortDescription": "Practical compaction tool for backfill and general civil jobs.",
        "applications": [
          "Pipeline trench backfill",
          "Road shoulder compaction",
          "Slope work",
          "Foundation preparation",
          "Landscaping and civil works"
        ],
        "features": [
          "General backfill",
          "Simple operation",
          "Mounted compaction for trenches and slopes",
          "Reinforced plate options for hard ground",
          "Bracket matching for pin mount or quick coupler use"
        ],
        "specs": [
          [
            "Product type",
            "Standard Plate Compactor"
          ],
          [
            "Model / series",
            "KRATOR PC Series"
          ],
          [
            "Suitable carrier",
            "3 - 20 ton"
          ],
          [
            "Main category",
            "Plate Compactors"
          ],
          [
            "Carrier range",
            "3 - 70 ton excavators"
          ],
          [
            "Work areas",
            "Trench backfill, road shoulder, slope, foundation bed"
          ],
          [
            "Matching data",
            "Excavator tonnage, soil condition, plate size, hydraulic flow"
          ],
          [
            "Options",
            "Standard, tilt, heavy duty, custom bracket"
          ]
        ],
        "selling": "Practical compaction tool for backfill and general civil jobs.",
        "bullets": [
          "General backfill",
          "Simple operation"
        ]
      },
      {
        "slug": "hydraulic-plate-compactor",
        "category": "Plate Compactors",
        "title": "Hydraulic Plate Compactor",
        "model": "KRATOR PC Series",
        "tonnage": "5 - 45 ton",
        "image": "/images/products/featured/raw/plate-compactor.webp",
        "shortDescription": "Hydraulic vibration for trench, shoulder and foundation compaction.",
        "applications": [
          "Pipeline trench backfill",
          "Road shoulder compaction",
          "Slope work",
          "Foundation preparation",
          "Landscaping and civil works"
        ],
        "features": [
          "Hydraulic vibration",
          "Civil construction",
          "Mounted compaction for trenches and slopes",
          "Reinforced plate options for hard ground",
          "Bracket matching for pin mount or quick coupler use"
        ],
        "specs": [
          [
            "Product type",
            "Hydraulic Plate Compactor"
          ],
          [
            "Model / series",
            "KRATOR PC Series"
          ],
          [
            "Suitable carrier",
            "5 - 45 ton"
          ],
          [
            "Main category",
            "Plate Compactors"
          ],
          [
            "Carrier range",
            "3 - 70 ton excavators"
          ],
          [
            "Work areas",
            "Trench backfill, road shoulder, slope, foundation bed"
          ],
          [
            "Matching data",
            "Excavator tonnage, soil condition, plate size, hydraulic flow"
          ],
          [
            "Options",
            "Standard, tilt, heavy duty, custom bracket"
          ]
        ],
        "selling": "Hydraulic vibration for trench, shoulder and foundation compaction.",
        "bullets": [
          "Hydraulic vibration",
          "Civil construction"
        ]
      },
      {
        "slug": "tilt-plate-compactor",
        "category": "Plate Compactors",
        "title": "Tilt Plate Compactor",
        "model": "KRATOR PC Series",
        "tonnage": "5 - 30 ton",
        "image": "/images/products/featured/raw/plate-compactor.webp",
        "shortDescription": "Tilt function helps compact slopes, banks and hard-to-reach edges.",
        "applications": [
          "Pipeline trench backfill",
          "Road shoulder compaction",
          "Slope work",
          "Foundation preparation",
          "Landscaping and civil works"
        ],
        "features": [
          "Tilt angle",
          "Slope compaction",
          "Mounted compaction for trenches and slopes",
          "Reinforced plate options for hard ground",
          "Bracket matching for pin mount or quick coupler use"
        ],
        "specs": [
          [
            "Product type",
            "Tilt Plate Compactor"
          ],
          [
            "Model / series",
            "KRATOR PC Series"
          ],
          [
            "Suitable carrier",
            "5 - 30 ton"
          ],
          [
            "Main category",
            "Plate Compactors"
          ],
          [
            "Carrier range",
            "3 - 70 ton excavators"
          ],
          [
            "Work areas",
            "Trench backfill, road shoulder, slope, foundation bed"
          ],
          [
            "Matching data",
            "Excavator tonnage, soil condition, plate size, hydraulic flow"
          ],
          [
            "Options",
            "Standard, tilt, heavy duty, custom bracket"
          ]
        ],
        "selling": "Tilt function helps compact slopes, banks and hard-to-reach edges.",
        "bullets": [
          "Tilt angle",
          "Slope compaction"
        ]
      },
      {
        "slug": "heavy-duty-plate-compactor",
        "category": "Plate Compactors",
        "title": "Heavy Duty Plate Compactor",
        "model": "KRATOR PC Series",
        "tonnage": "12 - 70 ton",
        "image": "/images/products/featured/raw/plate-compactor.webp",
        "shortDescription": "Reinforced plate and frame for tougher ground and larger carriers.",
        "applications": [
          "Pipeline trench backfill",
          "Road shoulder compaction",
          "Slope work",
          "Foundation preparation",
          "Landscaping and civil works"
        ],
        "features": [
          "Heavy duty frame",
          "Large carrier support",
          "Mounted compaction for trenches and slopes",
          "Reinforced plate options for hard ground",
          "Bracket matching for pin mount or quick coupler use"
        ],
        "specs": [
          [
            "Product type",
            "Heavy Duty Plate Compactor"
          ],
          [
            "Model / series",
            "KRATOR PC Series"
          ],
          [
            "Suitable carrier",
            "12 - 70 ton"
          ],
          [
            "Main category",
            "Plate Compactors"
          ],
          [
            "Carrier range",
            "3 - 70 ton excavators"
          ],
          [
            "Work areas",
            "Trench backfill, road shoulder, slope, foundation bed"
          ],
          [
            "Matching data",
            "Excavator tonnage, soil condition, plate size, hydraulic flow"
          ],
          [
            "Options",
            "Standard, tilt, heavy duty, custom bracket"
          ]
        ],
        "selling": "Reinforced plate and frame for tougher ground and larger carriers.",
        "bullets": [
          "Heavy duty frame",
          "Large carrier support"
        ]
      }
    ],
    "features": [
      "Mounted compaction for trenches and slopes",
      "Reinforced plate options for hard ground",
      "Bracket matching for pin mount or quick coupler use"
    ],
    "specs": [
      [
        "Carrier range",
        "3 - 70 ton excavators"
      ],
      [
        "Work areas",
        "Trench backfill, road shoulder, slope, foundation bed"
      ],
      [
        "Matching data",
        "Excavator tonnage, soil condition, plate size, hydraulic flow"
      ],
      [
        "Options",
        "Standard, tilt, heavy duty, custom bracket"
      ]
    ],
    "applications": [
      "Pipeline trench backfill",
      "Road shoulder compaction",
      "Slope work",
      "Foundation preparation",
      "Landscaping and civil works"
    ],
    "choose": [
      "Match plate size to excavator tonnage and trench width.",
      "Select tilt type for slopes and angled surfaces.",
      "Use heavy duty compactor for harder ground or larger carriers."
    ],
    "faq": [
      [
        "Why use an excavator plate compactor instead of a roller?",
        "It reaches trench sides, slopes and confined areas where rollers cannot work efficiently."
      ],
      [
        "Can it work with a quick coupler?",
        "Yes, brackets can be prepared for pin mounting or compatible quick coupler use."
      ]
    ],
    "aliases": [
      "hydraulic-compactor"
    ],
    "category": "Primary Product Category",
    "model": "KRATOR PC Series",
    "shortDescription": "Excavator plate compactors for trench backfill, foundations, slopes and road shoulders, including standard, hydraulic, tilt and heavy duty options."
  },
  {
    "key": "earth-augers",
    "slug": "earth-augers",
    "label": "Earth Augers",
    "category": "Earth Augers",
    "title": "Earth Augers",
    "h1": "Excavator Earth Augers",
    "eyebrow": "Auger drives and drill bits",
    "tonnage": "1 - 35 ton",
    "image": "/images/products/featured/raw/earth-auger.webp",
    "metaTitle": "Earth Augers | Excavator Auger Drive Units, Drill Bits and Rock Augers",
    "metaDescription": "Excavator earth augers including auger drive units, auger drill bits, rock augers and tree planting augers for foundation and landscaping work.",
    "overview": "KRATOR earth augers turn excavators into practical drilling platforms for posts, foundations, trees and ground anchors. Drive units and bit profiles are selected by soil, rock content and hole diameter.",
    "typeIntro": "Choose the drive and bit combination by hole diameter, soil type and excavator size.",
    "types": [
      {
        "slug": "excavator-earth-auger",
        "category": "Earth Augers",
        "title": "Excavator Earth Auger",
        "model": "KRATOR EA Series",
        "tonnage": "1 - 35 ton",
        "image": "/images/products/featured/raw/earth-auger.webp",
        "shortDescription": "Complete auger attachment for post holes, foundations and planting.",
        "applications": [
          "Fence posts",
          "Solar foundations",
          "Tree planting",
          "Utility poles",
          "Ground anchors"
        ],
        "features": [
          "Complete auger set",
          "Fast hole drilling",
          "Drive units matched to excavator hydraulic flow",
          "Bit options for soil, mixed ground and rock",
          "Useful for dealers serving utility, fence, solar and landscaping customers"
        ],
        "specs": [
          [
            "Product type",
            "Excavator Earth Auger"
          ],
          [
            "Model / series",
            "KRATOR EA Series"
          ],
          [
            "Suitable carrier",
            "1 - 35 ton"
          ],
          [
            "Main category",
            "Earth Augers"
          ],
          [
            "Carrier range",
            "1 - 35 ton excavators"
          ],
          [
            "Common sizes",
            "Custom diameter and length by project requirement"
          ],
          [
            "Matching data",
            "Hole diameter, ground condition, excavator flow, drilling depth"
          ],
          [
            "Options",
            "Soil bit, rock bit, extension, custom mounting"
          ]
        ],
        "selling": "Complete auger attachment for post holes, foundations and planting.",
        "bullets": [
          "Complete auger set",
          "Fast hole drilling"
        ]
      },
      {
        "slug": "auger-drive-unit",
        "category": "Earth Augers",
        "title": "Auger Drive Unit",
        "model": "KRATOR EA Series",
        "tonnage": "1 - 35 ton",
        "image": "/images/products/featured/raw/earth-auger.webp",
        "shortDescription": "Hydraulic drive matched to excavator flow and torque demand.",
        "applications": [
          "Fence posts",
          "Solar foundations",
          "Tree planting",
          "Utility poles",
          "Ground anchors"
        ],
        "features": [
          "Torque matching",
          "Hydraulic drive",
          "Drive units matched to excavator hydraulic flow",
          "Bit options for soil, mixed ground and rock",
          "Useful for dealers serving utility, fence, solar and landscaping customers"
        ],
        "specs": [
          [
            "Product type",
            "Auger Drive Unit"
          ],
          [
            "Model / series",
            "KRATOR EA Series"
          ],
          [
            "Suitable carrier",
            "1 - 35 ton"
          ],
          [
            "Main category",
            "Earth Augers"
          ],
          [
            "Carrier range",
            "1 - 35 ton excavators"
          ],
          [
            "Common sizes",
            "Custom diameter and length by project requirement"
          ],
          [
            "Matching data",
            "Hole diameter, ground condition, excavator flow, drilling depth"
          ],
          [
            "Options",
            "Soil bit, rock bit, extension, custom mounting"
          ]
        ],
        "selling": "Hydraulic drive matched to excavator flow and torque demand.",
        "bullets": [
          "Torque matching",
          "Hydraulic drive"
        ]
      },
      {
        "slug": "auger-drill-bits",
        "category": "Earth Augers",
        "title": "Auger Drill Bits",
        "model": "KRATOR EA Series",
        "tonnage": "By diameter",
        "image": "/images/products/featured/raw/earth-auger.webp",
        "shortDescription": "Replaceable bit sizes for different hole diameters and soil profiles.",
        "applications": [
          "Fence posts",
          "Solar foundations",
          "Tree planting",
          "Utility poles",
          "Ground anchors"
        ],
        "features": [
          "Multiple diameters",
          "Replaceable teeth",
          "Drive units matched to excavator hydraulic flow",
          "Bit options for soil, mixed ground and rock",
          "Useful for dealers serving utility, fence, solar and landscaping customers"
        ],
        "specs": [
          [
            "Product type",
            "Auger Drill Bits"
          ],
          [
            "Model / series",
            "KRATOR EA Series"
          ],
          [
            "Suitable carrier",
            "By diameter"
          ],
          [
            "Main category",
            "Earth Augers"
          ],
          [
            "Carrier range",
            "1 - 35 ton excavators"
          ],
          [
            "Common sizes",
            "Custom diameter and length by project requirement"
          ],
          [
            "Matching data",
            "Hole diameter, ground condition, excavator flow, drilling depth"
          ],
          [
            "Options",
            "Soil bit, rock bit, extension, custom mounting"
          ]
        ],
        "selling": "Replaceable bit sizes for different hole diameters and soil profiles.",
        "bullets": [
          "Multiple diameters",
          "Replaceable teeth"
        ]
      },
      {
        "slug": "rock-auger",
        "category": "Earth Augers",
        "title": "Rock Auger",
        "model": "KRATOR EA Series",
        "tonnage": "5 - 35 ton",
        "image": "/images/products/featured/raw/earth-auger.webp",
        "shortDescription": "Stronger bit layout for rocky soil and harder drilling conditions.",
        "applications": [
          "Fence posts",
          "Solar foundations",
          "Tree planting",
          "Utility poles",
          "Ground anchors"
        ],
        "features": [
          "Rock teeth",
          "Hard soil work",
          "Drive units matched to excavator hydraulic flow",
          "Bit options for soil, mixed ground and rock",
          "Useful for dealers serving utility, fence, solar and landscaping customers"
        ],
        "specs": [
          [
            "Product type",
            "Rock Auger"
          ],
          [
            "Model / series",
            "KRATOR EA Series"
          ],
          [
            "Suitable carrier",
            "5 - 35 ton"
          ],
          [
            "Main category",
            "Earth Augers"
          ],
          [
            "Carrier range",
            "1 - 35 ton excavators"
          ],
          [
            "Common sizes",
            "Custom diameter and length by project requirement"
          ],
          [
            "Matching data",
            "Hole diameter, ground condition, excavator flow, drilling depth"
          ],
          [
            "Options",
            "Soil bit, rock bit, extension, custom mounting"
          ]
        ],
        "selling": "Stronger bit layout for rocky soil and harder drilling conditions.",
        "bullets": [
          "Rock teeth",
          "Hard soil work"
        ]
      },
      {
        "slug": "tree-planting-auger",
        "category": "Earth Augers",
        "title": "Tree Planting Auger",
        "model": "KRATOR EA Series",
        "tonnage": "1 - 20 ton",
        "image": "/images/products/featured/raw/earth-auger.webp",
        "shortDescription": "Efficient holes for landscaping, nursery and forestry planting work.",
        "applications": [
          "Fence posts",
          "Solar foundations",
          "Tree planting",
          "Utility poles",
          "Ground anchors"
        ],
        "features": [
          "Planting holes",
          "Clean diameter",
          "Drive units matched to excavator hydraulic flow",
          "Bit options for soil, mixed ground and rock",
          "Useful for dealers serving utility, fence, solar and landscaping customers"
        ],
        "specs": [
          [
            "Product type",
            "Tree Planting Auger"
          ],
          [
            "Model / series",
            "KRATOR EA Series"
          ],
          [
            "Suitable carrier",
            "1 - 20 ton"
          ],
          [
            "Main category",
            "Earth Augers"
          ],
          [
            "Carrier range",
            "1 - 35 ton excavators"
          ],
          [
            "Common sizes",
            "Custom diameter and length by project requirement"
          ],
          [
            "Matching data",
            "Hole diameter, ground condition, excavator flow, drilling depth"
          ],
          [
            "Options",
            "Soil bit, rock bit, extension, custom mounting"
          ]
        ],
        "selling": "Efficient holes for landscaping, nursery and forestry planting work.",
        "bullets": [
          "Planting holes",
          "Clean diameter"
        ]
      }
    ],
    "features": [
      "Drive units matched to excavator hydraulic flow",
      "Bit options for soil, mixed ground and rock",
      "Useful for dealers serving utility, fence, solar and landscaping customers"
    ],
    "specs": [
      [
        "Carrier range",
        "1 - 35 ton excavators"
      ],
      [
        "Common sizes",
        "Custom diameter and length by project requirement"
      ],
      [
        "Matching data",
        "Hole diameter, ground condition, excavator flow, drilling depth"
      ],
      [
        "Options",
        "Soil bit, rock bit, extension, custom mounting"
      ]
    ],
    "applications": [
      "Fence posts",
      "Solar foundations",
      "Tree planting",
      "Utility poles",
      "Ground anchors"
    ],
    "choose": [
      "Confirm hole diameter and drilling depth.",
      "Select soil bit for soft ground or rock auger for harder formations.",
      "Match drive torque and oil flow to excavator class."
    ],
    "faq": [
      [
        "Can one drive unit use several drill bits?",
        "Yes, compatible bits can be supplied in different diameters for one drive unit."
      ],
      [
        "What information is needed for an auger quote?",
        "Excavator model, hydraulic flow, hole diameter, drilling depth and ground condition."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR EA Series",
    "shortDescription": "Excavator earth augers including auger drive units, auger drill bits, rock augers and tree planting augers for foundation and landscaping work."
  },
  {
    "key": "buckets",
    "slug": "excavator-buckets",
    "label": "Excavator Buckets",
    "category": "Excavator Buckets",
    "title": "Excavator Buckets",
    "h1": "Excavator Buckets",
    "eyebrow": "Standard, rock, tilt and custom bucket range",
    "tonnage": "1 - 120 ton",
    "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
    "metaTitle": "Excavator Buckets | Standard, Rock, Heavy Duty, Tilt and Skeleton Buckets",
    "metaDescription": "Excavator buckets including standard bucket, rock bucket, heavy duty bucket, ditch cleaning bucket, tilt bucket, skeleton bucket and trapezoid bucket.",
    "overview": "KRATOR buckets are matched to digging material, machine class and site productivity targets. Options cover daily earthmoving, rock work, ditch cleaning, grading and screening tasks.",
    "typeIntro": "Select bucket shape by soil type, cutting edge demand and required production rate.",
    "types": [
      {
        "slug": "standard-bucket",
        "category": "Excavator Buckets",
        "title": "Standard Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "1 - 30 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Balanced bucket for daily excavation and earthmoving work.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "General digging",
          "Dealer stock option",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Standard Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "1 - 30 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Balanced bucket for daily excavation and earthmoving work.",
        "bullets": [
          "General digging",
          "Dealer stock option"
        ]
      },
      {
        "slug": "rock-bucket",
        "category": "Excavator Buckets",
        "title": "Rock Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "8 - 120 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Reinforced shell and wear protection for abrasive material.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Rock duty",
          "Wear protection",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Rock Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "8 - 120 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Reinforced shell and wear protection for abrasive material.",
        "bullets": [
          "Rock duty",
          "Wear protection"
        ]
      },
      {
        "slug": "heavy-duty-bucket",
        "category": "Excavator Buckets",
        "title": "Heavy Duty Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "6 - 90 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Stronger build for tough soil, clay and mixed ground.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Heavy duty work",
          "Reinforced plates",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Heavy Duty Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "6 - 90 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Stronger build for tough soil, clay and mixed ground.",
        "bullets": [
          "Heavy duty work",
          "Reinforced plates"
        ]
      },
      {
        "slug": "ditch-cleaning-bucket",
        "category": "Excavator Buckets",
        "title": "Ditch Cleaning Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "3 - 35 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Wide profile for grading, cleaning and slope shaping.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Wide grading",
          "Clean finish",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Ditch Cleaning Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "3 - 35 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Wide profile for grading, cleaning and slope shaping.",
        "bullets": [
          "Wide grading",
          "Clean finish"
        ]
      },
      {
        "slug": "tilt-bucket",
        "category": "Excavator Buckets",
        "title": "Tilt Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "5 - 35 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Hydraulic tilt improves grading control and edge shaping.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Tilt angle",
          "Fine grading",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Tilt Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "5 - 35 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Hydraulic tilt improves grading control and edge shaping.",
        "bullets": [
          "Tilt angle",
          "Fine grading"
        ]
      },
      {
        "slug": "skeleton-bucket",
        "category": "Excavator Buckets",
        "title": "Skeleton Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "5 - 60 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Ribbed structure screens soil, stone and demolition material.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Screening work",
          "Material separation",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Skeleton Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "5 - 60 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Ribbed structure screens soil, stone and demolition material.",
        "bullets": [
          "Screening work",
          "Material separation"
        ]
      },
      {
        "slug": "trapezoid-bucket",
        "category": "Excavator Buckets",
        "title": "Trapezoid Bucket",
        "model": "KRATOR Bucket Series",
        "tonnage": "3 - 30 ton",
        "image": "/images/products/featured/raw/heavy-duty-bucket.webp",
        "shortDescription": "Designed for shaped trenches and drainage channel work.",
        "applications": [
          "Earthmoving",
          "Quarry loading",
          "Road construction",
          "Drainage work",
          "Material screening"
        ],
        "features": [
          "Channel forming",
          "Trench shaping",
          "Bucket geometry matched to soil, rock or grading tasks",
          "Wear plates, teeth and side cutters by job condition",
          "Custom ears and brackets by excavator model"
        ],
        "specs": [
          [
            "Product type",
            "Trapezoid Bucket"
          ],
          [
            "Model / series",
            "KRATOR Bucket Series"
          ],
          [
            "Suitable carrier",
            "3 - 30 ton"
          ],
          [
            "Main category",
            "Excavator Buckets"
          ],
          [
            "Carrier range",
            "1 - 120 ton excavators"
          ],
          [
            "Material options",
            "Mild steel, wear-resistant plate, reinforced lip and side plates"
          ],
          [
            "Matching data",
            "Excavator model, bucket width, material, pin dimensions"
          ],
          [
            "Options",
            "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
          ]
        ],
        "selling": "Designed for shaped trenches and drainage channel work.",
        "bullets": [
          "Channel forming",
          "Trench shaping"
        ]
      }
    ],
    "features": [
      "Bucket geometry matched to soil, rock or grading tasks",
      "Wear plates, teeth and side cutters by job condition",
      "Custom ears and brackets by excavator model"
    ],
    "specs": [
      [
        "Carrier range",
        "1 - 120 ton excavators"
      ],
      [
        "Material options",
        "Mild steel, wear-resistant plate, reinforced lip and side plates"
      ],
      [
        "Matching data",
        "Excavator model, bucket width, material, pin dimensions"
      ],
      [
        "Options",
        "Rock teeth, bolt-on edge, side cutters, custom bucket volume"
      ]
    ],
    "applications": [
      "Earthmoving",
      "Quarry loading",
      "Road construction",
      "Drainage work",
      "Material screening"
    ],
    "choose": [
      "Use standard buckets for normal soil and heavy duty buckets for tougher material.",
      "Select rock bucket for abrasive ground and higher wear conditions.",
      "Provide bucket width, pin data and job material when requesting a quote."
    ],
    "faq": [
      [
        "Can buckets be built by excavator model?",
        "Yes, bucket ears and pin dimensions are matched by machine brand and model."
      ],
      [
        "Which bucket is best for drainage channels?",
        "Trapezoid buckets are commonly selected for shaped trench and channel work."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR Bucket Series",
    "shortDescription": "Excavator buckets including standard bucket, rock bucket, heavy duty bucket, ditch cleaning bucket, tilt bucket, skeleton bucket and trapezoid bucket."
  },
  {
    "key": "rippers",
    "slug": "rippers",
    "label": "Excavator Rippers",
    "category": "Excavator Rippers",
    "title": "Excavator Rippers",
    "h1": "Excavator Rippers",
    "eyebrow": "Single shank and heavy duty ripping tools",
    "tonnage": "1 - 90 ton",
    "image": "/images/products/featured/raw/excavator-ripper.webp",
    "metaTitle": "Excavator Rippers | Single Shank, Heavy Duty, Rock and Frost Rippers",
    "metaDescription": "Excavator rippers including single shank ripper, heavy duty ripper, rock ripper and frost ripper for hard soil, rock and frozen ground.",
    "overview": "KRATOR rippers help break compacted ground, weathered rock and frozen soil before digging. The right shank and tooth structure reduces bucket wear and improves excavation efficiency.",
    "typeIntro": "Select ripper strength by ground hardness, frost depth and carrier size.",
    "types": [
      {
        "slug": "single-shank-ripper",
        "category": "Excavator Rippers",
        "title": "Single Shank Ripper",
        "model": "KRATOR Ripper Series",
        "tonnage": "1 - 45 ton",
        "image": "/images/products/featured/raw/excavator-ripper.webp",
        "shortDescription": "Focused breakout force for hard soil and compacted ground.",
        "applications": [
          "Hard soil ripping",
          "Quarry preparation",
          "Frozen ground opening",
          "Road base removal",
          "Pipeline trench preparation"
        ],
        "features": [
          "Single tooth force",
          "Pre-dig ripping",
          "High-strength shank structure",
          "Replaceable tooth and wear protection",
          "Useful before bucket excavation in hard ground"
        ],
        "specs": [
          [
            "Product type",
            "Single Shank Ripper"
          ],
          [
            "Model / series",
            "KRATOR Ripper Series"
          ],
          [
            "Suitable carrier",
            "1 - 45 ton"
          ],
          [
            "Main category",
            "Excavator Rippers"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Ground types",
            "Hard soil, weathered rock, frost, compacted fill"
          ],
          [
            "Matching data",
            "Excavator tonnage, ground condition, pin dimensions"
          ],
          [
            "Options",
            "Single shank, heavy duty frame, custom tooth and bracket"
          ]
        ],
        "selling": "Focused breakout force for hard soil and compacted ground.",
        "bullets": [
          "Single tooth force",
          "Pre-dig ripping"
        ]
      },
      {
        "slug": "heavy-duty-ripper",
        "category": "Excavator Rippers",
        "title": "Heavy Duty Ripper",
        "model": "KRATOR Ripper Series",
        "tonnage": "15 - 90 ton",
        "image": "/images/products/featured/raw/excavator-ripper.webp",
        "shortDescription": "Reinforced structure for large machines and tough conditions.",
        "applications": [
          "Hard soil ripping",
          "Quarry preparation",
          "Frozen ground opening",
          "Road base removal",
          "Pipeline trench preparation"
        ],
        "features": [
          "Heavy frame",
          "High breakout work",
          "High-strength shank structure",
          "Replaceable tooth and wear protection",
          "Useful before bucket excavation in hard ground"
        ],
        "specs": [
          [
            "Product type",
            "Heavy Duty Ripper"
          ],
          [
            "Model / series",
            "KRATOR Ripper Series"
          ],
          [
            "Suitable carrier",
            "15 - 90 ton"
          ],
          [
            "Main category",
            "Excavator Rippers"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Ground types",
            "Hard soil, weathered rock, frost, compacted fill"
          ],
          [
            "Matching data",
            "Excavator tonnage, ground condition, pin dimensions"
          ],
          [
            "Options",
            "Single shank, heavy duty frame, custom tooth and bracket"
          ]
        ],
        "selling": "Reinforced structure for large machines and tough conditions.",
        "bullets": [
          "Heavy frame",
          "High breakout work"
        ]
      },
      {
        "slug": "rock-ripper",
        "category": "Excavator Rippers",
        "title": "Rock Ripper",
        "model": "KRATOR Ripper Series",
        "tonnage": "15 - 90 ton",
        "image": "/images/products/featured/raw/excavator-ripper.webp",
        "shortDescription": "Tooth and shank design for weathered rock and quarry prep.",
        "applications": [
          "Hard soil ripping",
          "Quarry preparation",
          "Frozen ground opening",
          "Road base removal",
          "Pipeline trench preparation"
        ],
        "features": [
          "Rock ripping",
          "Wear protection",
          "High-strength shank structure",
          "Replaceable tooth and wear protection",
          "Useful before bucket excavation in hard ground"
        ],
        "specs": [
          [
            "Product type",
            "Rock Ripper"
          ],
          [
            "Model / series",
            "KRATOR Ripper Series"
          ],
          [
            "Suitable carrier",
            "15 - 90 ton"
          ],
          [
            "Main category",
            "Excavator Rippers"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Ground types",
            "Hard soil, weathered rock, frost, compacted fill"
          ],
          [
            "Matching data",
            "Excavator tonnage, ground condition, pin dimensions"
          ],
          [
            "Options",
            "Single shank, heavy duty frame, custom tooth and bracket"
          ]
        ],
        "selling": "Tooth and shank design for weathered rock and quarry prep.",
        "bullets": [
          "Rock ripping",
          "Wear protection"
        ]
      },
      {
        "slug": "frost-ripper",
        "category": "Excavator Rippers",
        "title": "Frost Ripper",
        "model": "KRATOR Ripper Series",
        "tonnage": "5 - 60 ton",
        "image": "/images/products/featured/raw/excavator-ripper.webp",
        "shortDescription": "Designed to open frozen ground before excavation.",
        "applications": [
          "Hard soil ripping",
          "Quarry preparation",
          "Frozen ground opening",
          "Road base removal",
          "Pipeline trench preparation"
        ],
        "features": [
          "Frozen soil",
          "Cold jobsite use",
          "High-strength shank structure",
          "Replaceable tooth and wear protection",
          "Useful before bucket excavation in hard ground"
        ],
        "specs": [
          [
            "Product type",
            "Frost Ripper"
          ],
          [
            "Model / series",
            "KRATOR Ripper Series"
          ],
          [
            "Suitable carrier",
            "5 - 60 ton"
          ],
          [
            "Main category",
            "Excavator Rippers"
          ],
          [
            "Carrier range",
            "1 - 90 ton excavators"
          ],
          [
            "Ground types",
            "Hard soil, weathered rock, frost, compacted fill"
          ],
          [
            "Matching data",
            "Excavator tonnage, ground condition, pin dimensions"
          ],
          [
            "Options",
            "Single shank, heavy duty frame, custom tooth and bracket"
          ]
        ],
        "selling": "Designed to open frozen ground before excavation.",
        "bullets": [
          "Frozen soil",
          "Cold jobsite use"
        ]
      }
    ],
    "features": [
      "High-strength shank structure",
      "Replaceable tooth and wear protection",
      "Useful before bucket excavation in hard ground"
    ],
    "specs": [
      [
        "Carrier range",
        "1 - 90 ton excavators"
      ],
      [
        "Ground types",
        "Hard soil, weathered rock, frost, compacted fill"
      ],
      [
        "Matching data",
        "Excavator tonnage, ground condition, pin dimensions"
      ],
      [
        "Options",
        "Single shank, heavy duty frame, custom tooth and bracket"
      ]
    ],
    "applications": [
      "Hard soil ripping",
      "Quarry preparation",
      "Frozen ground opening",
      "Road base removal",
      "Pipeline trench preparation"
    ],
    "choose": [
      "Choose heavy duty ripper for larger excavators and tougher ground.",
      "Use rock ripper for weathered rock and abrasive material.",
      "Provide ground condition and excavator model for shank sizing."
    ],
    "faq": [
      [
        "Why use a ripper before digging?",
        "It loosens hard ground and reduces bucket stress, especially in compacted or rocky conditions."
      ],
      [
        "Can ripper brackets be customized?",
        "Yes, brackets are matched by excavator pin diameter, arm width and center distance."
      ]
    ],
    "category": "Primary Product Category",
    "model": "KRATOR Ripper Series",
    "shortDescription": "Excavator rippers including single shank ripper, heavy duty ripper, rock ripper and frost ripper for hard soil, rock and frozen ground."
  },
  {
    "key": "custom-attachments",
    "slug": "custom-attachments",
    "label": "Custom Attachments",
    "category": "Custom Attachments",
    "title": "Custom Attachments",
    "h1": "Custom Excavator Attachments",
    "eyebrow": "OEM / ODM and private label support",
    "tonnage": "Custom fitment",
    "image": "/images/products/featured/raw/custom-attachments.webp",
    "metaTitle": "Custom Excavator Attachments | OEM, ODM, Brackets and Private Label",
    "metaDescription": "Custom excavator attachments including mounting brackets, pile clamps, OEM and ODM attachments, and private label solutions for dealers.",
    "overview": "KRATOR custom attachment support is built for overseas dealers, contractors and rental companies that need fitment, private label supply or project-specific jaw and bracket designs.",
    "typeIntro": "Custom work begins with machine data, working condition, drawings and target delivery plan.",
    "types": [
      {
        "slug": "custom-mounting-brackets",
        "category": "Custom Attachments",
        "title": "Custom Mounting Brackets",
        "model": "OEM / ODM Series",
        "tonnage": "By machine model",
        "image": "/images/products/featured/raw/custom-attachments.webp",
        "shortDescription": "Bracket design by pin diameter, arm width and center distance.",
        "applications": [
          "Dealer stock programs",
          "Special jobsite requirements",
          "Pile clamp customization",
          "Attachment conversion",
          "Private label supply"
        ],
        "features": [
          "Pin data matching",
          "Attachment conversion",
          "Drawing-based bracket and jaw development",
          "Private label support for overseas dealers",
          "Fitment confirmation before production"
        ],
        "specs": [
          [
            "Product type",
            "Custom Mounting Brackets"
          ],
          [
            "Model / series",
            "OEM / ODM Series"
          ],
          [
            "Suitable carrier",
            "By machine model"
          ],
          [
            "Main category",
            "Custom Attachments"
          ],
          [
            "Scope",
            "Mounting brackets, pile clamps, attachment modifications, dealer label supply"
          ],
          [
            "Required data",
            "Excavator model, pin diameter, arm width, center distance, photos or drawings"
          ],
          [
            "Support",
            "Prototype review, production QC, export packing"
          ],
          [
            "Options",
            "Logo, color, packaging, documentation, custom jaw geometry"
          ]
        ],
        "selling": "Bracket design by pin diameter, arm width and center distance.",
        "bullets": [
          "Pin data matching",
          "Attachment conversion"
        ]
      },
      {
        "slug": "custom-pile-clamps",
        "category": "Custom Attachments",
        "title": "Custom Pile Clamps",
        "model": "OEM / ODM Series",
        "tonnage": "By pile profile",
        "image": "/images/products/featured/raw/custom-attachments.webp",
        "shortDescription": "Jaw and clamp geometry built for uncommon pile profiles.",
        "applications": [
          "Dealer stock programs",
          "Special jobsite requirements",
          "Pile clamp customization",
          "Attachment conversion",
          "Private label supply"
        ],
        "features": [
          "Pile profile matching",
          "Drawing-based design",
          "Drawing-based bracket and jaw development",
          "Private label support for overseas dealers",
          "Fitment confirmation before production"
        ],
        "specs": [
          [
            "Product type",
            "Custom Pile Clamps"
          ],
          [
            "Model / series",
            "OEM / ODM Series"
          ],
          [
            "Suitable carrier",
            "By pile profile"
          ],
          [
            "Main category",
            "Custom Attachments"
          ],
          [
            "Scope",
            "Mounting brackets, pile clamps, attachment modifications, dealer label supply"
          ],
          [
            "Required data",
            "Excavator model, pin diameter, arm width, center distance, photos or drawings"
          ],
          [
            "Support",
            "Prototype review, production QC, export packing"
          ],
          [
            "Options",
            "Logo, color, packaging, documentation, custom jaw geometry"
          ]
        ],
        "selling": "Jaw and clamp geometry built for uncommon pile profiles.",
        "bullets": [
          "Pile profile matching",
          "Drawing-based design"
        ]
      },
      {
        "slug": "oem-odm-attachments",
        "category": "Custom Attachments",
        "title": "OEM / ODM Attachments",
        "model": "OEM / ODM Series",
        "tonnage": "Project based",
        "image": "/images/products/featured/raw/custom-attachments.webp",
        "shortDescription": "Product development support for dealers and specialized contractors.",
        "applications": [
          "Dealer stock programs",
          "Special jobsite requirements",
          "Pile clamp customization",
          "Attachment conversion",
          "Private label supply"
        ],
        "features": [
          "OEM supply",
          "ODM engineering",
          "Drawing-based bracket and jaw development",
          "Private label support for overseas dealers",
          "Fitment confirmation before production"
        ],
        "specs": [
          [
            "Product type",
            "OEM / ODM Attachments"
          ],
          [
            "Model / series",
            "OEM / ODM Series"
          ],
          [
            "Suitable carrier",
            "Project based"
          ],
          [
            "Main category",
            "Custom Attachments"
          ],
          [
            "Scope",
            "Mounting brackets, pile clamps, attachment modifications, dealer label supply"
          ],
          [
            "Required data",
            "Excavator model, pin diameter, arm width, center distance, photos or drawings"
          ],
          [
            "Support",
            "Prototype review, production QC, export packing"
          ],
          [
            "Options",
            "Logo, color, packaging, documentation, custom jaw geometry"
          ]
        ],
        "selling": "Product development support for dealers and specialized contractors.",
        "bullets": [
          "OEM supply",
          "ODM engineering"
        ]
      },
      {
        "slug": "private-label-attachments",
        "category": "Custom Attachments",
        "title": "Private Label Attachments",
        "model": "OEM / ODM Series",
        "tonnage": "Dealer program",
        "image": "/images/products/featured/raw/custom-attachments.webp",
        "shortDescription": "Brand-ready attachment supply with packaging and documentation support.",
        "applications": [
          "Dealer stock programs",
          "Special jobsite requirements",
          "Pile clamp customization",
          "Attachment conversion",
          "Private label supply"
        ],
        "features": [
          "Private label",
          "Dealer support",
          "Drawing-based bracket and jaw development",
          "Private label support for overseas dealers",
          "Fitment confirmation before production"
        ],
        "specs": [
          [
            "Product type",
            "Private Label Attachments"
          ],
          [
            "Model / series",
            "OEM / ODM Series"
          ],
          [
            "Suitable carrier",
            "Dealer program"
          ],
          [
            "Main category",
            "Custom Attachments"
          ],
          [
            "Scope",
            "Mounting brackets, pile clamps, attachment modifications, dealer label supply"
          ],
          [
            "Required data",
            "Excavator model, pin diameter, arm width, center distance, photos or drawings"
          ],
          [
            "Support",
            "Prototype review, production QC, export packing"
          ],
          [
            "Options",
            "Logo, color, packaging, documentation, custom jaw geometry"
          ]
        ],
        "selling": "Brand-ready attachment supply with packaging and documentation support.",
        "bullets": [
          "Private label",
          "Dealer support"
        ]
      }
    ],
    "features": [
      "Drawing-based bracket and jaw development",
      "Private label support for overseas dealers",
      "Fitment confirmation before production"
    ],
    "specs": [
      [
        "Scope",
        "Mounting brackets, pile clamps, attachment modifications, dealer label supply"
      ],
      [
        "Required data",
        "Excavator model, pin diameter, arm width, center distance, photos or drawings"
      ],
      [
        "Support",
        "Prototype review, production QC, export packing"
      ],
      [
        "Options",
        "Logo, color, packaging, documentation, custom jaw geometry"
      ]
    ],
    "applications": [
      "Dealer stock programs",
      "Special jobsite requirements",
      "Pile clamp customization",
      "Attachment conversion",
      "Private label supply"
    ],
    "choose": [
      "Send attachment target, excavator model and current pin dimensions.",
      "Share drawings or photos if the existing bracket or jaw must be matched.",
      "Confirm brand, color, packaging and documentation needs for private label supply."
    ],
    "faq": [
      [
        "Can you build attachments under our brand?",
        "Yes, private label and OEM supply can be planned for dealers and distributors."
      ],
      [
        "What data is needed for a custom bracket?",
        "Pin diameter, arm width, center distance, excavator model and photos of the arm or existing attachment."
      ]
    ],
    "category": "Primary Product Category",
    "model": "OEM / ODM Series",
    "shortDescription": "Custom excavator attachments including mounting brackets, pile clamps, OEM and ODM attachments, and private label solutions for dealers."
  }
] satisfies ProductCategory[];

export const products: ProductItem[] = productCategories.flatMap((category) => category.types);






