export type ProductSpecParameter = {
  name: string;
  unit: string;
  values: Record<string, string>;
};

export type ProductSpecSet = {
  key: string;
  title: string;
  sourcePage: number;
  websiteSlugCandidates: string[];
  models: string[];
  parameters: ProductSpecParameter[];
  notes?: string;
};

export const catalogSpecs: ProductSpecSet[] = [
  {
    "key": "hydraulic_pile_hammer",
    "title": "Hydraulic Pile Hammer / Vibratory Pile Driver",
    "sourcePage": 3,
    "websiteSlugCandidates": [
      "hydraulic-pile-hammer",
      "vibratory-pile-driver",
      "pile-driving-attachment"
    ],
    "models": [
      "ZSS250",
      "ZSS350",
      "ZSS500",
      "ZSS600",
      "ZSS650",
      "ZSS800",
      "ZSS1000",
      "ZSS1100"
    ],
    "parameters": [
      {
        "name": "Vibration Frequency",
        "unit": "rpm",
        "values": {
          "ZSS250": "3200",
          "ZSS350": "3000",
          "ZSS500": "2800",
          "ZSS600": "2800",
          "ZSS650": "2700",
          "ZSS800": "2400",
          "ZSS1000": "2300",
          "ZSS1100": "2300"
        }
      },
      {
        "name": "Eccentricity Moment Torque",
        "unit": "N路m",
        "values": {
          "ZSS250": "22",
          "ZSS350": "36",
          "ZSS500": "52",
          "ZSS600": "70",
          "ZSS650": "83.5",
          "ZSS800": "126",
          "ZSS1000": "175",
          "ZSS1100": "180"
        }
      },
      {
        "name": "Rated Excitation Force",
        "unit": "kN",
        "values": {
          "ZSS250": "250",
          "ZSS350": "360",
          "ZSS500": "450",
          "ZSS600": "600",
          "ZSS650": "650",
          "ZSS800": "800",
          "ZSS1000": "1050",
          "ZSS1100": "1100"
        }
      },
      {
        "name": "Hydraulic System Pressure",
        "unit": "MPa",
        "values": {
          "ZSS250": "32",
          "ZSS350": "32",
          "ZSS500": "32",
          "ZSS600": "32",
          "ZSS650": "32",
          "ZSS800": "32",
          "ZSS1000": "32",
          "ZSS1100": "32"
        }
      },
      {
        "name": "Hydraulic System Flow Rating",
        "unit": "L/min",
        "values": {
          "ZSS250": "105",
          "ZSS350": "250",
          "ZSS500": "240",
          "ZSS600": "315",
          "ZSS650": "310",
          "ZSS800": "310",
          "ZSS1000": "380",
          "ZSS1100": "380"
        }
      },
      {
        "name": "Maximum Pile Length",
        "unit": "m",
        "values": {
          "ZSS250": "6-9",
          "ZSS350": "6-9",
          "ZSS500": "6-15",
          "ZSS600": "6-18",
          "ZSS650": "6-18",
          "ZSS800": "6-22",
          "ZSS1000": "6-30",
          "ZSS1100": "6-36"
        }
      },
      {
        "name": "Auxiliary Arm Weight",
        "unit": "kg",
        "values": {
          "ZSS250": "700",
          "ZSS350": "800",
          "ZSS500": "800",
          "ZSS600": "900",
          "ZSS650": "900",
          "ZSS800": "1000",
          "ZSS1000": "1000",
          "ZSS1100": "1000"
        }
      },
      {
        "name": "Total Weight",
        "unit": "kg",
        "values": {
          "ZSS250": "1250",
          "ZSS350": "1750",
          "ZSS500": "2750",
          "ZSS600": "3200",
          "ZSS650": "3200",
          "ZSS800": "3600",
          "ZSS1000": "3300",
          "ZSS1100": "4200"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "ZSS250": "15-20",
          "ZSS350": "18-25",
          "ZSS500": "27-37",
          "ZSS600": "36-50",
          "ZSS650": "42-50",
          "ZSS800": "50-70",
          "ZSS1000": "70-90",
          "ZSS1100": "70-90"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "hydraulic_breaker",
    "title": "Hydraulic Breaker",
    "sourcePage": 4,
    "websiteSlugCandidates": [
      "hydraulic-breaker",
      "side-type-hydraulic-breaker",
      "top-type-hydraulic-breaker",
      "silence-type-hydraulic-breaker"
    ],
    "models": [
      "ZSB450",
      "ZSB530",
      "ZSB680",
      "ZSB750",
      "ZSB850",
      "ZSB1000",
      "ZSB1350",
      "ZSB1400",
      "ZSB1500",
      "ZSB1550",
      "ZSB1650",
      "ZSB1750"
    ],
    "parameters": [
      {
        "name": "Operating Weight (top)",
        "unit": "kg",
        "values": {
          "ZSB450": "100",
          "ZSB530": "120",
          "ZSB680": "298",
          "ZSB750": "375",
          "ZSB850": "577",
          "ZSB1000": "890",
          "ZSB1350": "1515",
          "ZSB1400": "1773",
          "ZSB1500": "1972",
          "ZSB1550": "2555",
          "ZSB1650": "3065",
          "ZSB1750": "3909"
        }
      },
      {
        "name": "Operating Weight (silenced)",
        "unit": "kg",
        "values": {
          "ZSB450": "126",
          "ZSB530": "152",
          "ZSB680": "295",
          "ZSB750": "375",
          "ZSB850": "571",
          "ZSB1000": "861",
          "ZSB1350": "1500",
          "ZSB1400": "1766",
          "ZSB1500": "2071",
          "ZSB1550": "2632",
          "ZSB1650": "2833",
          "ZSB1750": "3991"
        }
      },
      {
        "name": "Operating Weight (side)",
        "unit": "kg",
        "values": {
          "ZSB450": "90",
          "ZSB530": "120",
          "ZSB680": "250",
          "ZSB750": "380",
          "ZSB850": "510",
          "ZSB1000": "765",
          "ZSB1350": "1462",
          "ZSB1400": "1760",
          "ZSB1500": "2144",
          "ZSB1550": "2413",
          "ZSB1650": "2650",
          "ZSB1750": "3788"
        }
      },
      {
        "name": "Total Length",
        "unit": "mm",
        "values": {
          "ZSB450": "1119",
          "ZSB530": "1240",
          "ZSB680": "1373",
          "ZSB750": "1719",
          "ZSB850": "2096",
          "ZSB1000": "2251",
          "ZSB1350": "2691",
          "ZSB1400": "2823",
          "ZSB1500": "3047",
          "ZSB1550": "3119",
          "ZSB1650": "3359",
          "ZSB1750": "3617"
        }
      },
      {
        "name": "Total Width",
        "unit": "mm",
        "values": {
          "ZSB450": "176",
          "ZSB530": "177",
          "ZSB680": "350",
          "ZSB750": "288",
          "ZSB850": "357",
          "ZSB1000": "438",
          "ZSB1350": "580",
          "ZSB1400": "620",
          "ZSB1500": "620",
          "ZSB1550": "710",
          "ZSB1650": "710",
          "ZSB1750": "760"
        }
      },
      {
        "name": "Operating Pressure",
        "unit": "bar",
        "values": {
          "ZSB450": "90-120",
          "ZSB530": "90-120",
          "ZSB680": "110-140",
          "ZSB750": "120-150",
          "ZSB850": "130-160",
          "ZSB1000": "150-170",
          "ZSB1350": "160-180",
          "ZSB1400": "160-180",
          "ZSB1500": "160-180",
          "ZSB1550": "160-180",
          "ZSB1650": "160-180",
          "ZSB1750": "160-180"
        }
      },
      {
        "name": "Oil Flow Rate",
        "unit": "L/min",
        "values": {
          "ZSB450": "20-40",
          "ZSB530": "20-50",
          "ZSB680": "40-70",
          "ZSB750": "50-90",
          "ZSB850": "60-100",
          "ZSB1000": "80-110",
          "ZSB1350": "100-150",
          "ZSB1400": "120-180",
          "ZSB1500": "150-210",
          "ZSB1550": "180-240",
          "ZSB1650": "200-260",
          "ZSB1750": "210-290"
        }
      },
      {
        "name": "Impact Rate",
        "unit": "bpm",
        "values": {
          "ZSB450": "700-1200",
          "ZSB530": "600-1100",
          "ZSB680": "500-900",
          "ZSB750": "400-800",
          "ZSB850": "400-800",
          "ZSB1000": "350-700",
          "ZSB1350": "350-600",
          "ZSB1400": "350-500",
          "ZSB1500": "300-450",
          "ZSB1550": "300-450",
          "ZSB1650": "250-400",
          "ZSB1750": "200-350"
        }
      },
      {
        "name": "Hose Diameter",
        "unit": "inch",
        "values": {
          "ZSB450": "3/8, 1/2",
          "ZSB530": "1/2",
          "ZSB680": "1/2",
          "ZSB750": "1/2",
          "ZSB850": "3/4",
          "ZSB1000": "3/4",
          "ZSB1350": "1",
          "ZSB1400": "1",
          "ZSB1500": "1",
          "ZSB1550": "1 1/4",
          "ZSB1650": "1 1/4",
          "ZSB1750": "1 1/4"
        }
      },
      {
        "name": "Rod Diameter",
        "unit": "mm",
        "values": {
          "ZSB450": "45",
          "ZSB530": "53",
          "ZSB680": "68",
          "ZSB750": "75",
          "ZSB850": "85",
          "ZSB1000": "100",
          "ZSB1350": "135",
          "ZSB1400": "140",
          "ZSB1500": "150",
          "ZSB1550": "155",
          "ZSB1650": "165",
          "ZSB1750": "175"
        }
      },
      {
        "name": "Impact Energy Class",
        "unit": "joule",
        "values": {
          "ZSB450": "300",
          "ZSB530": "300",
          "ZSB680": "650",
          "ZSB750": "700",
          "ZSB850": "1200",
          "ZSB1000": "2847",
          "ZSB1350": "3288",
          "ZSB1400": "4270",
          "ZSB1500": "5694",
          "ZSB1550": "7117",
          "ZSB1650": "9965",
          "ZSB1750": "12812"
        }
      },
      {
        "name": "Applicable Bucket Capacity",
        "unit": "m鲁",
        "values": {
          "ZSB450": "0.03-0.1",
          "ZSB530": "0.06-0.2",
          "ZSB680": "0.15-0.3",
          "ZSB750": "0.2-0.35",
          "ZSB850": "0.25-0.5",
          "ZSB1000": "0.4-0.6",
          "ZSB1350": "0.6-0.8",
          "ZSB1400": "0.7-0.9",
          "ZSB1500": "0.9-1.2",
          "ZSB1550": "1.1-1.4",
          "ZSB1650": "1.2-1.7",
          "ZSB1750": "1.4-2.0"
        }
      },
      {
        "name": "Applicable Vehicle Weight",
        "unit": "ton",
        "values": {
          "ZSB450": "1.2-3.0",
          "ZSB530": "2.5-4.5",
          "ZSB680": "4.0-7.0",
          "ZSB750": "6.0-9.0",
          "ZSB850": "7.0-14",
          "ZSB1000": "11-16",
          "ZSB1350": "18-23",
          "ZSB1400": "18-26",
          "ZSB1500": "25-30",
          "ZSB1550": "28-35",
          "ZSB1650": "30-45",
          "ZSB1750": "40-55"
        }
      }
    ],
    "notes": "Website should split these specs into Side Type / Top Type / Silence Type variants if current product pages are separated."
  },
  {
    "key": "p_type_quick_hitch_coupler",
    "title": "P Type Quick Hitch Coupler",
    "sourcePage": 5,
    "websiteSlugCandidates": [
      "p-type-quick-hitch-coupler",
      "quick-hitch-coupler",
      "quick-coupler"
    ],
    "models": [
      "MINI",
      "ZSP02",
      "ZSP04",
      "ZSP06",
      "ZSP08",
      "ZSP10",
      "ZSP17",
      "ZSP20"
    ],
    "parameters": [
      {
        "name": "Length",
        "unit": "mm",
        "values": {
          "MINI": "300-450",
          "ZSP02": "550-595",
          "ZSP04": "590-630",
          "ZSP06": "795-825",
          "ZSP08": "888-980",
          "ZSP10": "980-1060",
          "ZSP17": "1050-1250",
          "ZSP20": "1050-1250"
        }
      },
      {
        "name": "Height",
        "unit": "mm",
        "values": {
          "MINI": "250-280",
          "ZSP02": "312",
          "ZSP04": "320",
          "ZSP06": "410",
          "ZSP08": "520",
          "ZSP10": "608",
          "ZSP17": "620",
          "ZSP20": "620"
        }
      },
      {
        "name": "Width",
        "unit": "mm",
        "values": {
          "MINI": "170-230",
          "ZSP02": "270-300",
          "ZSP04": "300-355",
          "ZSP06": "365-420",
          "ZSP08": "460-500",
          "ZSP10": "510-590",
          "ZSP17": "580-650",
          "ZSP20": "580-680"
        }
      },
      {
        "name": "Pin Center Distance",
        "unit": "mm",
        "values": {
          "MINI": "90-210",
          "ZSP02": "225-285",
          "ZSP04": "285-360",
          "ZSP06": "370-420",
          "ZSP08": "430-500",
          "ZSP10": "470-550",
          "ZSP17": "540-600",
          "ZSP20": "540-600"
        }
      },
      {
        "name": "Arm Width",
        "unit": "mm",
        "values": {
          "MINI": "90-140",
          "ZSP02": "155-200",
          "ZSP04": "160-230",
          "ZSP06": "220-275",
          "ZSP08": "300-350",
          "ZSP10": "340-420",
          "ZSP17": "420-500",
          "ZSP20": "420-500"
        }
      },
      {
        "name": "Cylinder Stroke",
        "unit": "mm",
        "values": {
          "MINI": "35",
          "ZSP02": "75",
          "ZSP04": "75",
          "ZSP06": "85",
          "ZSP08": "70",
          "ZSP10": "80",
          "ZSP17": "80",
          "ZSP20": "80"
        }
      },
      {
        "name": "Vertical Pin Center Distance",
        "unit": "mm",
        "values": {
          "MINI": "150-170",
          "ZSP02": "200",
          "ZSP04": "200",
          "ZSP06": "260",
          "ZSP08": "325",
          "ZSP10": "385",
          "ZSP17": "400",
          "ZSP20": "400"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "MINI": "30-50",
          "ZSP02": "50-80",
          "ZSP04": "70-100",
          "ZSP06": "220-290",
          "ZSP08": "370-420",
          "ZSP10": "500-600",
          "ZSP17": "650-900",
          "ZSP20": "700-1000"
        }
      },
      {
        "name": "Working Pressure",
        "unit": "bar",
        "values": {
          "MINI": "40-200",
          "ZSP02": "40-200",
          "ZSP04": "40-200",
          "ZSP06": "40-200",
          "ZSP08": "40-200",
          "ZSP10": "40-200",
          "ZSP17": "40-200",
          "ZSP20": "40-200"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "MINI": "1.5-4",
          "ZSP02": "4-6",
          "ZSP04": "6-10",
          "ZSP06": "10-16",
          "ZSP08": "16-24",
          "ZSP10": "24-32",
          "ZSP17": "34-42",
          "ZSP20": "45-52"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "h_type_quick_hitch_coupler",
    "title": "H Type Quick Hitch Coupler",
    "sourcePage": 5,
    "websiteSlugCandidates": [
      "h-type-quick-hitch-coupler",
      "quick-hitch-coupler",
      "quick-coupler"
    ],
    "models": [
      "ZSH06",
      "ZSH08",
      "ZSH10",
      "ZSH17",
      "ZSH20"
    ],
    "parameters": [
      {
        "name": "Length",
        "unit": "mm",
        "values": {
          "ZSH06": "795-855",
          "ZSH08": "950-1060",
          "ZSH10": "990-1200",
          "ZSH17": "1050-1300",
          "ZSH20": "1100-1300"
        }
      },
      {
        "name": "Height",
        "unit": "mm",
        "values": {
          "ZSH06": "430",
          "ZSH08": "480-550",
          "ZSH10": "560",
          "ZSH17": "560-600",
          "ZSH20": "620-650"
        }
      },
      {
        "name": "Width",
        "unit": "mm",
        "values": {
          "ZSH06": "365-420",
          "ZSH08": "460-500",
          "ZSH10": "510-590",
          "ZSH17": "580-650",
          "ZSH20": "580-680"
        }
      },
      {
        "name": "Pin Center Distance",
        "unit": "mm",
        "values": {
          "ZSH06": "370-420",
          "ZSH08": "430-500",
          "ZSH10": "470-550",
          "ZSH17": "540-600",
          "ZSH20": "540-600"
        }
      },
      {
        "name": "Arm Width",
        "unit": "mm",
        "values": {
          "ZSH06": "220-275",
          "ZSH08": "300-350",
          "ZSH10": "340-420",
          "ZSH17": "420-500",
          "ZSH20": "420-500"
        }
      },
      {
        "name": "Cylinder Stroke",
        "unit": "mm",
        "values": {
          "ZSH06": "85",
          "ZSH08": "70",
          "ZSH10": "80",
          "ZSH17": "80",
          "ZSH20": "80"
        }
      },
      {
        "name": "Vertical Pin Center Distance",
        "unit": "mm",
        "values": {
          "ZSH06": "260",
          "ZSH08": "325",
          "ZSH10": "385",
          "ZSH17": "400",
          "ZSH20": "400"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "ZSH06": "220-290",
          "ZSH08": "370-420",
          "ZSH10": "500-600",
          "ZSH17": "650-900",
          "ZSH20": "700-1000"
        }
      },
      {
        "name": "Working Pressure",
        "unit": "bar",
        "values": {
          "ZSH06": "40-200",
          "ZSH08": "40-200",
          "ZSH10": "40-200",
          "ZSH17": "40-200",
          "ZSH20": "40-200"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "ZSH06": "10-16",
          "ZSH08": "16-24",
          "ZSH10": "24-32",
          "ZSH17": "34-42",
          "ZSH20": "45-52"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "tilting_quick_coupler",
    "title": "Tilting Quick Coupler",
    "sourcePage": 5,
    "websiteSlugCandidates": [
      "tilting-quick-coupler",
      "tilt-quick-coupler"
    ],
    "models": [
      "ZS-Mini",
      "ZS-01",
      "ZS-02",
      "ZS-04",
      "ZS-06",
      "ZS-06S",
      "ZS-08"
    ],
    "parameters": [
      {
        "name": "Suitable Weight",
        "unit": "ton",
        "values": {
          "ZS-Mini": "1-2",
          "ZS-01": "3-4",
          "ZS-02": "5-6",
          "ZS-04": "7-9",
          "ZS-06": "10-13",
          "ZS-06S": "14-18",
          "ZS-08": "19-24"
        }
      },
      {
        "name": "Tilt Degree",
        "unit": "degree",
        "values": {
          "ZS-Mini": "180",
          "ZS-01": "180",
          "ZS-02": "180",
          "ZS-04": "180",
          "ZS-06": "134",
          "ZS-06S": "134",
          "ZS-08": "134"
        }
      },
      {
        "name": "Working Pressure",
        "unit": "bar",
        "values": {
          "ZS-Mini": "210",
          "ZS-01": "210",
          "ZS-02": "210",
          "ZS-04": "210",
          "ZS-06": "210",
          "ZS-06S": "210",
          "ZS-08": "210"
        }
      },
      {
        "name": "Working Flow",
        "unit": "L/min",
        "values": {
          "ZS-Mini": "3-6",
          "ZS-01": "3-6",
          "ZS-02": "6-12",
          "ZS-04": "12-20",
          "ZS-06": "24-28",
          "ZS-06S": "24-32",
          "ZS-08": "32-44"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "ZS-Mini": "55",
          "ZS-01": "120",
          "ZS-02": "160",
          "ZS-04": "180",
          "ZS-06": "400",
          "ZS-06S": "450",
          "ZS-08": "650"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "rotating_quick_coupler",
    "title": "Rotating Quick Coupler",
    "sourcePage": 5,
    "websiteSlugCandidates": [
      "rotating-quick-coupler",
      "rotary-quick-coupler"
    ],
    "models": [
      "ZSG-02",
      "ZSG-06"
    ],
    "parameters": [
      {
        "name": "Suitable Weight",
        "unit": "ton",
        "values": {
          "ZSG-02": "5-9",
          "ZSG-06": "12-18"
        }
      },
      {
        "name": "Pin Diameter",
        "unit": "mm",
        "values": {
          "ZSG-02": "45-55",
          "ZSG-06": "60-70"
        }
      },
      {
        "name": "Working Pressure",
        "unit": "bar",
        "values": {
          "ZSG-02": "120-175",
          "ZSG-06": "120-175"
        }
      },
      {
        "name": "Working Flow",
        "unit": "L/min",
        "values": {
          "ZSG-02": "35",
          "ZSG-06": "60"
        }
      },
      {
        "name": "Rotating Speed",
        "unit": "rpm",
        "values": {
          "ZSG-02": "6.8",
          "ZSG-06": "7.5"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "ZSG-02": "155",
          "ZSG-06": "420"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "double_cylinder_hydraulic_shear",
    "title": "Double Cylinder Hydraulic Shear",
    "sourcePage": 6,
    "websiteSlugCandidates": [
      "double-cylinder-hydraulic-shear",
      "hydraulic-shear",
      "scrap-shear",
      "demolition-shear"
    ],
    "models": [
      "TS04B",
      "TS06B",
      "TS08B",
      "TS10B",
      "TS14B",
      "TS01C",
      "TS04A",
      "TS06A",
      "TS08A",
      "TS10A",
      "TS14A"
    ],
    "parameters": [
      {
        "name": "Material/Application Group",
        "unit": "",
        "values": {
          "TS04B": "Scrap Steel",
          "TS06B": "Scrap Steel",
          "TS08B": "Scrap Steel",
          "TS10B": "Scrap Steel",
          "TS14B": "Scrap Steel",
          "TS01C": "Concrete",
          "TS04A": "Concrete",
          "TS06A": "Concrete",
          "TS08A": "Concrete",
          "TS10A": "Concrete",
          "TS14A": "Concrete"
        }
      },
      {
        "name": "Dead Weight",
        "unit": "kg",
        "values": {
          "TS04B": "630",
          "TS06B": "1500",
          "TS08B": "2300",
          "TS10B": "2977",
          "TS14B": "4052",
          "TS01C": "280",
          "TS04A": "630",
          "TS06A": "1500",
          "TS08A": "2300",
          "TS10A": "3300",
          "TS14A": "4200"
        }
      },
      {
        "name": "Max Opening",
        "unit": "mm",
        "values": {
          "TS04B": "335.5",
          "TS06B": "540",
          "TS08B": "500",
          "TS10B": "660",
          "TS14B": "801",
          "TS01C": "337",
          "TS04A": "540",
          "TS06A": "630",
          "TS08A": "950",
          "TS10A": "1100",
          "TS14A": "1200"
        }
      },
      {
        "name": "Height",
        "unit": "mm",
        "values": {
          "TS04B": "1521",
          "TS06B": "2050",
          "TS08B": "2380",
          "TS10B": "2600",
          "TS14B": "2700",
          "TS01C": "1201",
          "TS04A": "1419",
          "TS06A": "1951",
          "TS08A": "2374",
          "TS10A": "2480",
          "TS14A": "2700"
        }
      },
      {
        "name": "Width",
        "unit": "mm",
        "values": {
          "TS04B": "864",
          "TS06B": "1175",
          "TS08B": "1370",
          "TS10B": "1600",
          "TS14B": "1700",
          "TS01C": "365",
          "TS04A": "884",
          "TS06A": "1175",
          "TS08A": "1360",
          "TS10A": "1540",
          "TS14A": "1700"
        }
      },
      {
        "name": "Active Length of Blade",
        "unit": "mm",
        "values": {
          "TS04B": "286",
          "TS06B": "348",
          "TS08B": "486",
          "TS10B": "578",
          "TS14B": "736",
          "TS01C": "100",
          "TS04A": "100",
          "TS06A": "130",
          "TS08A": "180",
          "TS10A": "240",
          "TS14A": "240"
        }
      },
      {
        "name": "Rotation Mode",
        "unit": "",
        "values": {
          "TS04B": "360degree Ball Collision Rotation",
          "TS06B": "360degree Hydraulic",
          "TS08B": "360degree Hydraulic",
          "TS10B": "360degree Hydraulic",
          "TS14B": "360degree Hydraulic",
          "TS01C": "360degree Machine",
          "TS04A": "360degree Ball Collision Rotation",
          "TS06A": "360degree Hydraulic",
          "TS08A": "360degree Hydraulic",
          "TS10A": "360degree Hydraulic",
          "TS14A": "360degree Hydraulic"
        }
      },
      {
        "name": "Pressure",
        "unit": "bar",
        "values": {
          "TS04B": "235",
          "TS06B": "300",
          "TS08B": "320",
          "TS10B": "320",
          "TS14B": "320",
          "TS01C": "170",
          "TS04A": "235",
          "TS06A": "300",
          "TS08A": "320",
          "TS10A": "320",
          "TS14A": "320"
        }
      },
      {
        "name": "Root Crushing Force",
        "unit": "kN",
        "values": {
          "TS04B": "810",
          "TS06B": "1380",
          "TS08B": "1710",
          "TS10B": "3300",
          "TS14B": "3870",
          "TS01C": "300",
          "TS04A": "810",
          "TS06A": "1200",
          "TS08A": "1680",
          "TS10A": "2880",
          "TS14A": "3750"
        }
      },
      {
        "name": "Middle Crushing Force",
        "unit": "kN",
        "values": {
          "TS04B": "500",
          "TS06B": "800",
          "TS08B": "1020",
          "TS10B": "1890",
          "TS14B": "2180",
          "TS01C": "150",
          "TS04A": "445",
          "TS06A": "660",
          "TS08A": "780",
          "TS10A": "1250",
          "TS14A": "740"
        }
      },
      {
        "name": "Fore-end Crushing Force",
        "unit": "kN",
        "values": {
          "TS04B": "320",
          "TS06B": "530",
          "TS08B": "750",
          "TS10B": "1270",
          "TS14B": "1470",
          "TS01C": "90",
          "TS04A": "250",
          "TS06A": "400",
          "TS08A": "560",
          "TS10A": "900",
          "TS14A": "1180"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "TS04B": "5-8",
          "TS06B": "15-18",
          "TS08B": "20-25",
          "TS10B": "28-35",
          "TS14B": "38-50",
          "TS01C": "1.5-3",
          "TS04A": "5-8",
          "TS06A": "15-18",
          "TS08A": "20-25",
          "TS10A": "28-35",
          "TS14A": "38-50"
        }
      }
    ],
    "notes": "Rotation Mode row is visually small in the source catalog; verify before final publishing if this row is critical."
  },
  {
    "key": "hydraulic_pulverizer",
    "title": "Hydraulic Pulverizer",
    "sourcePage": 6,
    "websiteSlugCandidates": [
      "hydraulic-pulverizer",
      "concrete-pulverizer",
      "demolition-pulverizer"
    ],
    "models": [
      "PU04C",
      "PU06J",
      "PU08K",
      "PU10A"
    ],
    "parameters": [
      {
        "name": "Dead Weight",
        "unit": "kg",
        "values": {
          "PU04C": "695",
          "PU06J": "1200",
          "PU08K": "1850",
          "PU10A": "2900"
        }
      },
      {
        "name": "Max Opening",
        "unit": "mm",
        "values": {
          "PU04C": "610",
          "PU06J": "700",
          "PU08K": "840",
          "PU10A": "1000"
        }
      },
      {
        "name": "Length",
        "unit": "mm",
        "values": {
          "PU04C": "1635",
          "PU06J": "1800",
          "PU08K": "2280",
          "PU10A": "2374"
        }
      },
      {
        "name": "Width",
        "unit": "mm",
        "values": {
          "PU04C": "469",
          "PU06J": "546",
          "PU08K": "610",
          "PU10A": "800"
        }
      },
      {
        "name": "Max Crushing Force",
        "unit": "ton",
        "values": {
          "PU04C": "47",
          "PU06J": "62",
          "PU08K": "165",
          "PU10A": "225"
        }
      },
      {
        "name": "Max Shear Force",
        "unit": "ton",
        "values": {
          "PU04C": "87",
          "PU06J": "91",
          "PU08K": "160",
          "PU10A": "264"
        }
      },
      {
        "name": "Blade Length",
        "unit": "mm",
        "values": {
          "PU04C": "120",
          "PU06J": "150",
          "PU08K": "180",
          "PU10A": "200"
        }
      },
      {
        "name": "Driving Oil Pressure",
        "unit": "bar",
        "values": {
          "PU04C": "230",
          "PU06J": "300",
          "PU08K": "320",
          "PU10A": "380"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "PU04C": "6-9",
          "PU06J": "6-12",
          "PU08K": "18-26",
          "PU10A": "26-35"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "log_grapple",
    "title": "Log Grapple",
    "sourcePage": 7,
    "websiteSlugCandidates": [
      "log-grapple",
      "timber-grapple",
      "wood-grapple"
    ],
    "models": [
      "G04D",
      "G06D",
      "G08D",
      "G04A/B/C",
      "G06A",
      "G08A",
      "G01A",
      "G02A",
      "G01B",
      "G02B/C",
      "G04H",
      "G01C",
      "G02D",
      "G04G",
      "G06F",
      "G08F"
    ],
    "parameters": [
      {
        "name": "Type Group",
        "unit": "",
        "values": {
          "G04D": "Single Cylinder",
          "G06D": "Single Cylinder",
          "G08D": "Single Cylinder",
          "G04A/B/C": "Double Cylinder",
          "G06A": "Double Cylinder",
          "G08A": "Double Cylinder",
          "G01A": "Camshaft Rotation",
          "G02A": "Camshaft Rotation",
          "G01B": "Single Cylinder Non-rotating",
          "G02B/C": "Single Cylinder Non-rotating",
          "G04H": "Single Cylinder Non-rotating",
          "G01C": "Mechanical Log",
          "G02D": "Mechanical Log",
          "G04G": "Mechanical Log",
          "G06F": "Mechanical Log",
          "G08F": "Mechanical Log"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "G04D": "342",
          "G06D": "829",
          "G08D": "1720",
          "G04A/B/C": "390",
          "G06A": "740",
          "G08A": "1600",
          "G01A": "120",
          "G02A": "240",
          "G01B": "110",
          "G02B/C": "190",
          "G04H": "248",
          "G01C": "90",
          "G02D": "130",
          "G04G": "220",
          "G06F": "430",
          "G08F": "800"
        }
      },
      {
        "name": "Opening Size",
        "unit": "mm",
        "values": {
          "G04D": "1362",
          "G06D": "1850",
          "G08D": "2050",
          "G04A/B/C": "1400",
          "G06A": "1790",
          "G08A": "2315",
          "G01A": "973",
          "G02A": "1250",
          "G01B": "973",
          "G02B/C": "1400",
          "G04H": "1518",
          "G01C": "997",
          "G02D": "1190",
          "G04G": "1200",
          "G06F": "1600",
          "G08F": "2000"
        }
      },
      {
        "name": "Working Pressure",
        "unit": "bar",
        "values": {
          "G04D": "110-140",
          "G06D": "150-170",
          "G08D": "160-220",
          "G04A/B/C": "110-140",
          "G06A": "150-170",
          "G08A": "160-220",
          "G01A": "<100",
          "G02A": "100-110",
          "G01B": "<100",
          "G02B/C": "100-110",
          "G04H": "100-140",
          "G01C": "",
          "G02D": "",
          "G04G": "",
          "G06F": "",
          "G08F": ""
        }
      },
      {
        "name": "Setting Pressure",
        "unit": "bar",
        "values": {
          "G04D": "170",
          "G06D": "190",
          "G08D": "230",
          "G04A/B/C": "170",
          "G06A": "190",
          "G08A": "230",
          "G01A": "<130",
          "G02A": "130",
          "G01B": "<130",
          "G02B/C": "130",
          "G04H": "170",
          "G01C": "",
          "G02D": "",
          "G04G": "",
          "G06F": "",
          "G08F": ""
        }
      },
      {
        "name": "Working Flow",
        "unit": "L/min",
        "values": {
          "G04D": "30-55",
          "G06D": "90-110",
          "G08D": "100-160",
          "G04A/B/C": "30-55",
          "G06A": "90-110",
          "G08A": "100-160",
          "G01A": "<20",
          "G02A": "20-40",
          "G01B": "<20",
          "G02B/C": "20-40",
          "G04H": "30-55",
          "G01C": "",
          "G02D": "",
          "G04G": "",
          "G06F": "",
          "G08F": ""
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "G04D": "5-8",
          "G06D": "8-16",
          "G08D": "16-26",
          "G04A/B/C": "5-8",
          "G06A": "8-16",
          "G08A": "16-26",
          "G01A": "<3",
          "G02A": "3-5",
          "G01B": "<3",
          "G02B/C": "3-5",
          "G04H": "5-8",
          "G01C": "",
          "G02D": "",
          "G04G": "",
          "G06F": "",
          "G08F": ""
        }
      }
    ],
    "notes": "Mechanical Log models only show size/weight in the source table; hydraulic parameters are blank."
  },
  {
    "key": "hydraulic_orange_peel_grapple",
    "title": "Hydraulic Orange Peel Grapple",
    "sourcePage": 7,
    "websiteSlugCandidates": [
      "hydraulic-orange-peel-grapple",
      "orange-peel-grapple",
      "scrap-grapple"
    ],
    "models": [
      "ZSG04",
      "ZSG06",
      "ZSG08",
      "ZSG10",
      "ZSG14"
    ],
    "parameters": [
      {
        "name": "Dead Weight",
        "unit": "kg",
        "values": {
          "ZSG04": "550",
          "ZSG06": "1668",
          "ZSG08": "1750",
          "ZSG10": "1981",
          "ZSG14": "2500"
        }
      },
      {
        "name": "Max Opening",
        "unit": "mm",
        "values": {
          "ZSG04": "1575",
          "ZSG06": "2142",
          "ZSG08": "2280",
          "ZSG10": "2500",
          "ZSG14": "2610"
        }
      },
      {
        "name": "Open Height",
        "unit": "mm",
        "values": {
          "ZSG04": "900",
          "ZSG06": "2136",
          "ZSG08": "2200",
          "ZSG10": "2391",
          "ZSG14": "2630"
        }
      },
      {
        "name": "Closed Diameter",
        "unit": "mm",
        "values": {
          "ZSG04": "600",
          "ZSG06": "1250",
          "ZSG08": "1300",
          "ZSG10": "1612",
          "ZSG14": "1720"
        }
      },
      {
        "name": "Closed Height",
        "unit": "mm",
        "values": {
          "ZSG04": "1150",
          "ZSG06": "2500",
          "ZSG08": "2600",
          "ZSG10": "2675",
          "ZSG14": "2800"
        }
      },
      {
        "name": "Bucket Capacity",
        "unit": "m鲁",
        "values": {
          "ZSG04": "0.3",
          "ZSG06": "0.6",
          "ZSG08": "0.8",
          "ZSG10": "1.0",
          "ZSG14": "1.3"
        }
      },
      {
        "name": "Max Load",
        "unit": "kg",
        "values": {
          "ZSG04": "800",
          "ZSG06": "1600",
          "ZSG08": "2000",
          "ZSG10": "2600",
          "ZSG14": "3200"
        }
      },
      {
        "name": "Suitable Excavator",
        "unit": "ton",
        "values": {
          "ZSG04": "8-11",
          "ZSG06": "12-17",
          "ZSG08": "18-25",
          "ZSG10": "26-35",
          "ZSG14": "36-50"
        }
      },
      {
        "name": "Flow Demand",
        "unit": "L/min",
        "values": {
          "ZSG04": "50",
          "ZSG06": "90",
          "ZSG08": "180",
          "ZSG10": "220",
          "ZSG14": "280"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "earth_auger",
    "title": "Earth Auger",
    "sourcePage": 8,
    "websiteSlugCandidates": [
      "earth-auger",
      "hydraulic-earth-auger",
      "auger-drive"
    ],
    "models": [
      "ZS25",
      "ZS35",
      "ZS50",
      "ZS70",
      "ZS80",
      "ZS120",
      "ZS200",
      "ZS250"
    ],
    "parameters": [
      {
        "name": "Carrier",
        "unit": "ton",
        "values": {
          "ZS25": "1.5-3",
          "ZS35": "2.5-4.5",
          "ZS50": "4.5-7",
          "ZS70": "7-10",
          "ZS80": "8-13",
          "ZS120": "13-17",
          "ZS200": "15-20",
          "ZS250": "17-25"
        }
      },
      {
        "name": "Torque",
        "unit": "N路m",
        "values": {
          "ZS25": "2432",
          "ZS35": "3614",
          "ZS50": "5056",
          "ZS70": "6931",
          "ZS80": "8048",
          "ZS120": "11976",
          "ZS200": "19039",
          "ZS250": "24949"
        }
      },
      {
        "name": "Pressure",
        "unit": "bar",
        "values": {
          "ZS25": "205",
          "ZS35": "240",
          "ZS50": "240",
          "ZS70": "240",
          "ZS80": "240",
          "ZS120": "240",
          "ZS200": "240",
          "ZS250": "250"
        }
      },
      {
        "name": "Oil Flow Range",
        "unit": "L/min",
        "values": {
          "ZS25": "30-61",
          "ZS35": "30-68",
          "ZS50": "38-76",
          "ZS70": "61-121",
          "ZS80": "61-136",
          "ZS120": "80-140",
          "ZS200": "80-170",
          "ZS250": "90-180"
        }
      },
      {
        "name": "Rotary Speed",
        "unit": "rpm",
        "values": {
          "ZS25": "40-82",
          "ZS35": "32-72",
          "ZS50": "29-58",
          "ZS70": "37-72",
          "ZS80": "29-64",
          "ZS120": "22-43",
          "ZS200": "17-34",
          "ZS250": "16-30"
        }
      },
      {
        "name": "Hydraulic Hose",
        "unit": "inch",
        "values": {
          "ZS25": "1/2",
          "ZS35": "1/2",
          "ZS50": "1/2",
          "ZS70": "3/4",
          "ZS80": "3/4",
          "ZS120": "1",
          "ZS200": "1",
          "ZS250": "1"
        }
      },
      {
        "name": "Output Shaft",
        "unit": "mm",
        "values": {
          "ZS25": "桅65",
          "ZS35": "桅65",
          "ZS50": "桅75",
          "ZS70": "桅75",
          "ZS80": "桅75",
          "ZS120": "桅75",
          "ZS200": "桅75",
          "ZS250": "桅75"
        }
      },
      {
        "name": "Unit Weight",
        "unit": "kg",
        "values": {
          "ZS25": "54",
          "ZS35": "71",
          "ZS50": "108",
          "ZS70": "112",
          "ZS80": "115",
          "ZS120": "167",
          "ZS200": "220",
          "ZS250": "250"
        }
      },
      {
        "name": "Unit Height",
        "unit": "mm",
        "values": {
          "ZS25": "595",
          "ZS35": "700",
          "ZS50": "780",
          "ZS70": "850",
          "ZS80": "850",
          "ZS120": "930",
          "ZS200": "930",
          "ZS250": "930"
        }
      },
      {
        "name": "Unit Max Dia.",
        "unit": "mm",
        "values": {
          "ZS25": "200",
          "ZS35": "244",
          "ZS50": "269",
          "ZS70": "269",
          "ZS80": "269",
          "ZS120": "290",
          "ZS200": "290",
          "ZS250": "290"
        }
      },
      {
        "name": "Auger Series",
        "unit": "",
        "values": {
          "ZS25": "S4",
          "ZS35": "S4",
          "ZS50": "S5",
          "ZS70": "S5",
          "ZS80": "S5",
          "ZS120": "S6",
          "ZS200": "S6",
          "ZS250": "S6"
        }
      },
      {
        "name": "Auger Length",
        "unit": "mm",
        "values": {
          "ZS25": "1200",
          "ZS35": "1200",
          "ZS50": "1500",
          "ZS70": "1500",
          "ZS80": "1500",
          "ZS120": "1750",
          "ZS200": "1750",
          "ZS250": "1750"
        }
      },
      {
        "name": "Auger Dia. Range",
        "unit": "mm",
        "values": {
          "ZS25": "100-500",
          "ZS35": "100-750",
          "ZS50": "150-600",
          "ZS70": "150-900",
          "ZS80": "150-900",
          "ZS120": "150-900",
          "ZS200": "150-1200",
          "ZS250": "150-1200"
        }
      }
    ],
    "notes": ""
  },
  {
    "key": "hydraulic_compactor",
    "title": "Hydraulic Compactor",
    "sourcePage": 8,
    "websiteSlugCandidates": [
      "hydraulic-compactor",
      "plate-compactor",
      "excavator-compactor"
    ],
    "models": [
      "ZS-2T",
      "ZS-6T",
      "ZS-12T",
      "ZS-20T",
      "ZS-30T"
    ],
    "parameters": [
      {
        "name": "Height",
        "unit": "mm",
        "values": {
          "ZS-2T": "550",
          "ZS-6T": "750",
          "ZS-12T": "930",
          "ZS-20T": "1000",
          "ZS-30T": "1100"
        }
      },
      {
        "name": "Width",
        "unit": "mm",
        "values": {
          "ZS-2T": "450",
          "ZS-6T": "550",
          "ZS-12T": "700",
          "ZS-20T": "900",
          "ZS-30T": "900"
        }
      },
      {
        "name": "Power",
        "unit": "ton",
        "values": {
          "ZS-2T": "2",
          "ZS-6T": "4",
          "ZS-12T": "6.5",
          "ZS-20T": "15",
          "ZS-30T": "15"
        }
      },
      {
        "name": "Vibration Frequency",
        "unit": "rpm",
        "values": {
          "ZS-2T": "1800",
          "ZS-6T": "2000",
          "ZS-12T": "2000",
          "ZS-20T": "2200",
          "ZS-30T": "2200"
        }
      },
      {
        "name": "Oil Flow",
        "unit": "L/min",
        "values": {
          "ZS-2T": "25-45",
          "ZS-6T": "45-85",
          "ZS-12T": "85-105",
          "ZS-20T": "120-170",
          "ZS-30T": "120-170"
        }
      },
      {
        "name": "Pressure",
        "unit": "bar",
        "values": {
          "ZS-2T": "80-120",
          "ZS-6T": "100-130",
          "ZS-12T": "100-150",
          "ZS-20T": "150-200",
          "ZS-30T": "150-200"
        }
      },
      {
        "name": "Plate Size",
        "unit": "mm",
        "values": {
          "ZS-2T": "700*450",
          "ZS-6T": "900*550",
          "ZS-12T": "1160*700",
          "ZS-20T": "1350*900",
          "ZS-30T": "1350*900"
        }
      },
      {
        "name": "Weight",
        "unit": "kg",
        "values": {
          "ZS-2T": "200",
          "ZS-6T": "300-450",
          "ZS-12T": "750-850",
          "ZS-20T": "900-1000",
          "ZS-30T": "1000-1100"
        }
      },
      {
        "name": "Carrier",
        "unit": "ton",
        "values": {
          "ZS-2T": "1.5-3.5",
          "ZS-6T": "4-10",
          "ZS-12T": "10-18",
          "ZS-20T": "20-24",
          "ZS-30T": "24-30"
        }
      }
    ],
    "notes": ""
  }
] as const;

