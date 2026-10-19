export interface Observation {
  id: string
  slug: string
  title: string
  subtitle: string
  region: string
  coordinates: string
  domain: 'Hydrosphere' | 'Cryosphere' | 'Atmosphere' | 'Biosphere' | 'Geosphere'
  platform: string
  sensors: string[]
  temporalRange: string
  resolution: string
  leadImage: string
  secondaryImage?: string
  summary: string
  impactMetrics: {
    label: string
    value: string
    change: string
    isPositive?: boolean
  }[]
  timeSeriesData: {
    year: number
    primaryValue: number
    secondaryValue: number
    anomaly: number
    uncertaintyLower: number
    uncertaintyUpper: number
  }[]
  spectralBands: {
    id: string
    name: string
    wavelength: string
    description: string
  }[]
  narrativeSections: {
    title: string
    content: string
  }[]
}

export interface Dataset {
  id: string
  slug: string
  title: string
  summary: string
  domain: 'Hydrosphere' | 'Cryosphere' | 'Atmosphere' | 'Biosphere' | 'Geosphere' | 'Anthroposphere'
  platform: string
  sensor: string
  temporalCoverage: string
  spatialResolution: string
  updateCadence: string
  fileFormat: string
  fileSize: string
  rowCount: string
  downloadCount: number
  citationCount: number
  license: string
  lastUpdated: string
  image: string
  featured: boolean
  tags: string[]
  primaryMetric: {
    name: string
    unit: string
    latestValue: string
  }
}

export const OBSERVATIONS: Observation[] = [
  {
    id: 'obs-aral-sea',
    slug: 'aral-sea-desiccation',
    title: 'Aral Sea Basin: 35-Year Desiccation Dynamics',
    subtitle: 'Systemic inland water balance collapse and catastrophic Aralkum dust formation under river basin diversions',
    region: 'Central Asian Endorheic Basin (Kazakhstan / Uzbekistan)',
    coordinates: '45°00′N 59°00′E',
    domain: 'Hydrosphere',
    platform: 'Landsat-5 TM / Landsat-8 / Landsat-9 OLI-2 / MODIS Terra',
    sensors: ['Thematic Mapper (TM)', 'Operational Land Imager (OLI-2)', 'Thermal Infrared Sensor (TIRS)'],
    temporalRange: '1989 – 2025 (Annual synoptic observations)',
    resolution: '30m Multi-spectral / 15m Panchromatic',
    leadImage: '/assets/images/aral-1990.jpg',
    secondaryImage: '/assets/images/aral-present.jpg',
    summary: 'Once the fourth largest lake on Earth, spanning 68,000 square kilometers, the Aral Sea has receded by over 88% due to heavy agricultural irrigation diversion from the Amu Darya and Syr Darya rivers. Multispectral satellite telemetry chronicles the formation of the new Aralkum desert and acute local climatic continentality amplification.',
    impactMetrics: [
      { label: 'Surface Area Lost', value: '88.4%', change: '-59,800 km²', isPositive: false },
      { label: 'Water Salinity', value: '114 g/L', change: '+1,040%', isPositive: false },
      { label: 'Summer Temp Anomaly', value: '+3.4°C', change: 'Amplified microclimate', isPositive: false },
      { label: 'Exposed Seabed Dust', value: '5.2 Mt/yr', change: 'Toxic salt aerosol plume', isPositive: false }
    ],
    timeSeriesData: [
      { year: 1990, primaryValue: 36800, secondaryValue: 53.4, anomaly: -0.2, uncertaintyLower: 36200, uncertaintyUpper: 37400 },
      { year: 1995, primaryValue: 31200, secondaryValue: 47.1, anomaly: +0.4, uncertaintyLower: 30700, uncertaintyUpper: 31700 },
      { year: 2000, primaryValue: 24500, secondaryValue: 39.8, anomaly: +0.9, uncertaintyLower: 24000, uncertaintyUpper: 25000 },
      { year: 2005, primaryValue: 18200, secondaryValue: 33.2, anomaly: +1.5, uncertaintyLower: 17800, uncertaintyUpper: 18600 },
      { year: 2010, primaryValue: 13900, secondaryValue: 29.1, anomaly: +1.9, uncertaintyLower: 13500, uncertaintyUpper: 14300 },
      { year: 2015, primaryValue: 9800, secondaryValue: 26.5, anomaly: +2.3, uncertaintyLower: 9500, uncertaintyUpper: 10100 },
      { year: 2020, primaryValue: 7900, secondaryValue: 24.8, anomaly: +2.8, uncertaintyLower: 7600, uncertaintyUpper: 8200 },
      { year: 2025, primaryValue: 7100, secondaryValue: 24.1, anomaly: +3.4, uncertaintyLower: 6800, uncertaintyUpper: 7400 }
    ],
    spectralBands: [
      { id: 'rgb', name: 'Natural Color (RGB)', wavelength: '0.45 – 0.67 μm', description: 'Simulates true human visual perception using Red (Band 4), Green (Band 3), and Blue (Band 2).' },
      { id: 'cir', name: 'Color Infrared (CIR)', wavelength: '0.52 – 0.88 μm', description: 'Replaces red with Near-Infrared (Band 5) to emphasize riparian vegetation and agricultural canals.' },
      { id: 'swir', name: 'Shortwave Infrared (SWIR)', wavelength: '1.57 – 2.29 μm', description: 'Highlights moisture content, mineral salt crusting, and distinguishes shallow brine pools from dry silt.' },
      { id: 'thermal', name: 'Thermal Infrared (TIRS)', wavelength: '10.60 – 12.51 μm', description: 'Maps land surface temperature differences between deep water bodies and bare desiccated soil.' }
    ],
    narrativeSections: [
      {
        title: 'Geographic and Anthropogenic Genesis',
        content: 'Beginning in the 1960s, extensive Soviet canal systems diverted the flow of the Syr Darya and Amu Darya rivers to irrigate millions of hectares of cotton monoculture in the arid plains of Central Asia. By starving the terminal lake basin of over 85% of its natural annual inflow (which historically averaged 56 km³ annually), lake water levels commenced an uninterrupted descent of nearly 0.8 meters per year.'
      },
      {
        title: 'Bifurcation and Environmental Cascade',
        content: 'In 1987, water levels plummeted past the threshold separating the Northern (Small) Aral from the Southern (Large) Aral. Continued evaporation fractured the Southern basin further into distinct eastern and western lobes. As evaporation concentrated mineral salts, aquatic ecosystems collapsed entirely; all endemic fish taxa perished, devastating regional fishing fleets whose rusted hulks remain stranded across sand dunes kilometers from modern shores.'
      },
      {
        title: 'Atmospheric Feedback & Regional Dust Regimes',
        content: 'The desiccation exposed over 54,000 square kilometers of hyper-saline lake bed, now officially classified as the Aralkum Desert. Strong north-easterly anticyclonic winds frequently scour this floor, lofting upward of 75 million metric tons of salt, pesticide residue, and fine mineral dust annually into regional tropospheric circulation cells, accelerating glacier melt in the distant Pamir and Tian Shan mountain ranges.'
      }
    ]
  },
  {
    id: 'obs-lena-delta',
    slug: 'lena-river-delta',
    title: 'Lena River Delta: Arctic Permafrost Hydrology',
    subtitle: 'High-latitude fractal sediment delivery and seasonal thermo-erosion along the Laptev Sea margin',
    region: 'Laptev Sea / Sakha Republic (Russian Arctic)',
    coordinates: '72°29′N 126°50′E',
    domain: 'Cryosphere',
    platform: 'Sentinel-2 MSI / CryoSat-2 / Landsat-9',
    sensors: ['Multi-Spectral Instrument (MSI)', 'Synthetic Aperture Radar (SAR)'],
    temporalRange: '2016 – 2026',
    resolution: '10m Multi-spectral',
    leadImage: '/assets/images/hero-delta.jpg',
    summary: 'The largest delta in the Arctic spans 32,000 km² of polygon tundra, cryogenic pingos, and braided braided channels. High-resolution multispectral imagery documents accelerating thermo-terrace slumping and spring freshet river ice breakup discharging immense sediment plumes into the Arctic Ocean.',
    impactMetrics: [
      { label: 'Delta Surface Area', value: '32,000 km²', change: 'Over 1,500 distinct islands', isPositive: true },
      { label: 'Organic Carbon Flux', value: '5.8 Mt/yr', change: '+24% over decade', isPositive: false },
      { label: 'River Ice Free Period', value: '118 Days', change: '+19 days since 1990', isPositive: false },
      { label: 'Permafrost Active Layer', value: '62 cm', change: '+8.2 cm decadal thaw', isPositive: false }
    ],
    timeSeriesData: [
      { year: 1995, primaryValue: 4.1, secondaryValue: 98, anomaly: -0.4, uncertaintyLower: 3.8, uncertaintyUpper: 4.4 },
      { year: 2000, primaryValue: 4.3, secondaryValue: 101, anomaly: -0.1, uncertaintyLower: 4.0, uncertaintyUpper: 4.6 },
      { year: 2005, primaryValue: 4.7, secondaryValue: 105, anomaly: +0.3, uncertaintyLower: 4.4, uncertaintyUpper: 5.0 },
      { year: 2010, primaryValue: 5.0, secondaryValue: 108, anomaly: +0.7, uncertaintyLower: 4.7, uncertaintyUpper: 5.3 },
      { year: 2015, primaryValue: 5.3, secondaryValue: 112, anomaly: +1.2, uncertaintyLower: 5.0, uncertaintyUpper: 5.6 },
      { year: 2020, primaryValue: 5.6, secondaryValue: 115, anomaly: +1.6, uncertaintyLower: 5.3, uncertaintyUpper: 5.9 },
      { year: 2025, primaryValue: 5.8, secondaryValue: 118, anomaly: +2.1, uncertaintyLower: 5.5, uncertaintyUpper: 6.2 }
    ],
    spectralBands: [
      { id: 'rgb', name: 'Natural Color', wavelength: '0.44 – 0.66 μm', description: 'Depicts real sediment turbidity swirls into the dark polar sea.' },
      { id: 'snow', name: 'NDSI Snow & Ice', wavelength: '0.56 – 1.61 μm', description: 'Normalized Difference Snow Index isolating pack ice from cloud cover.' },
      { id: 'water', name: 'Turbidity Sensor Band', wavelength: '0.70 – 0.86 μm', description: 'Monitors terrigenous particulate organic carbon plumes.' }
    ],
    narrativeSections: [
      {
        title: 'Cryogenic Landscape Architecture',
        content: 'Frozen under extreme continuous permafrost exceeding 500 meters in depth, the delta remains locked in solid ice for nearly eight months of the year. During the brief summer thermal thaw, hundreds of meandering channels discharge approximately 540 cubic kilometers of freshwater annually into the Laptev Sea.'
      },
      {
        title: 'Thermal Erosion & Permafrost Degradation',
        content: 'Longer open-water seasons combined with warmer river inflows have triggered rapid thermo-abrasion along the coastal cliff bluffs. Yedoma ice complexes containing vast stores of Pleistocene organic matter are collapsing directly into the fluvial channels.'
      }
    ]
  },
  {
    id: 'obs-jakobshavn-glacier',
    slug: 'jakobshavn-isbrae',
    title: 'Jakobshavn Isbræ: Dynamic Glacial Discharge',
    subtitle: 'Grounding-line instability, calving terminus retreat, and ice stream acceleration in West Greenland',
    region: 'Ilulissat Icefjord (West Greenland)',
    coordinates: '69°10′N 49°50′W',
    domain: 'Cryosphere',
    platform: 'Sentinel-1 SAR / Landsat-8 / GRACE-FO',
    sensors: ['C-band SAR', 'Thermal Sensor', 'Satellite Gravity Gravimeter'],
    temporalRange: '2000 – 2026',
    resolution: '15m Radar / 30m Optical',
    leadImage: '/assets/images/glacier-fiord.jpg',
    summary: 'Jakobshavn Isbræ drains approximately 6.5% of the Greenland Ice Sheet. As ocean water warms within Disko Bay, the floating ice tongue disintegrated in the early 2000s, prompting velocity surges exceeding 17 km per year and discharging tens of gigatons of icebergs annually.',
    impactMetrics: [
      { label: 'Flow Velocity', value: '14.2 km/yr', change: '+68% over baseline', isPositive: false },
      { label: 'Calving Flux', value: '38.4 Gt/yr', change: 'Major sea-level driver', isPositive: false },
      { label: 'Terminus Retreat', value: '18.7 km', change: 'Since 2000', isPositive: false },
      { label: 'Sub-surface Ocean Temp', value: '+2.8°C', change: 'At fiord sill depth', isPositive: false }
    ],
    timeSeriesData: [
      { year: 2000, primaryValue: 7.2, secondaryValue: 24.1, anomaly: +0.2, uncertaintyLower: 6.9, uncertaintyUpper: 7.5 },
      { year: 2004, primaryValue: 12.8, secondaryValue: 36.5, anomaly: +1.1, uncertaintyLower: 12.4, uncertaintyUpper: 13.2 },
      { year: 2008, primaryValue: 13.4, secondaryValue: 41.2, anomaly: +1.4, uncertaintyLower: 13.0, uncertaintyUpper: 13.8 },
      { year: 2012, primaryValue: 17.1, secondaryValue: 50.8, anomaly: +2.1, uncertaintyLower: 16.5, uncertaintyUpper: 17.7 },
      { year: 2016, primaryValue: 15.6, secondaryValue: 46.2, anomaly: +1.8, uncertaintyLower: 15.1, uncertaintyUpper: 16.1 },
      { year: 2020, primaryValue: 13.9, secondaryValue: 39.5, anomaly: +1.3, uncertaintyLower: 13.5, uncertaintyUpper: 14.3 },
      { year: 2025, primaryValue: 14.2, secondaryValue: 38.4, anomaly: +1.5, uncertaintyLower: 13.7, uncertaintyUpper: 14.7 }
    ],
    spectralBands: [
      { id: 'sar', name: 'SAR Amplitude Backscatter', wavelength: 'C-band (5.405 GHz)', description: 'Pierces through polar night and clouds to map crevasse stress tensors.' },
      { id: 'albedo', name: 'Broadband Albedo', wavelength: '0.4 – 2.5 μm', description: 'Measures surface reflectivity degradation due to melt ponds and cryoconite.' }
    ],
    narrativeSections: [
      {
        title: 'The Oceanic Trigger Mechanism',
        content: 'Oceanographic bathymetry surveys revealed a deep submarine canyon breaching the continental shelf, allowing warm, saline Atlantic subsurface water to penetrate directly into the icefjord beneath the floating glacier tongue, inducing basal melt rates in excess of 100 meters per year.'
      }
    ]
  },
  {
    id: 'obs-rub-al-khali',
    slug: 'rub-al-khali-erg',
    title: "Rub' al Khali: Megadune Morphodynamics",
    subtitle: 'Planetary aeolian transport mechanics, linear seif ridge formation, and mineral salar chemistry',
    region: 'Arabian Peninsula',
    coordinates: '20°15′N 50°20′E',
    domain: 'Geosphere',
    platform: 'ASTER / Sentinel-2 / Landsat-9',
    sensors: ['Thermal Infrared Radiometer', 'Multispectral Scanner'],
    temporalRange: '1984 – 2026',
    resolution: '15m Multispectral',
    leadImage: '/assets/images/desert-orbit.jpg',
    summary: 'Spanning over 650,000 square kilometers, the Empty Quarter contains the worlds largest contiguous sand erg. Hyper-resolution remote sensing reveals stable longitudinal seif dunes towering up to 250 meters, inter-dune sabkhas with gypsum-rich crusts, and paleohydrological drainage networks.',
    impactMetrics: [
      { label: 'Dune Crest Height', value: '250 m', change: 'Among tallest on Earth', isPositive: true },
      { label: 'Annual Dune Migration', value: '3.2 m/yr', change: 'Driven by Shamal winds', isPositive: false },
      { label: 'Interdune Sabkha Extent', value: '18.4%', change: 'Mineral salt crust', isPositive: true },
      { label: 'Land Surface Temp (Peak)', value: '68.4°C', change: 'Thermal sensor max', isPositive: false }
    ],
    timeSeriesData: [
      { year: 1995, primaryValue: 3.0, secondaryValue: 48.2, anomaly: 0.0, uncertaintyLower: 2.8, uncertaintyUpper: 3.2 },
      { year: 2000, primaryValue: 3.1, secondaryValue: 48.7, anomaly: +0.2, uncertaintyLower: 2.9, uncertaintyUpper: 3.3 },
      { year: 2005, primaryValue: 3.1, secondaryValue: 49.3, anomaly: +0.5, uncertaintyLower: 2.9, uncertaintyUpper: 3.3 },
      { year: 2010, primaryValue: 3.2, secondaryValue: 49.8, anomaly: +0.8, uncertaintyLower: 3.0, uncertaintyUpper: 3.4 },
      { year: 2015, primaryValue: 3.3, secondaryValue: 50.4, anomaly: +1.1, uncertaintyLower: 3.1, uncertaintyUpper: 3.5 },
      { year: 2020, primaryValue: 3.2, secondaryValue: 50.9, anomaly: +1.4, uncertaintyLower: 3.0, uncertaintyUpper: 3.4 },
      { year: 2025, primaryValue: 3.2, secondaryValue: 51.5, anomaly: +1.7, uncertaintyLower: 3.0, uncertaintyUpper: 3.4 }
    ],
    spectralBands: [
      { id: 'mineral', name: 'Mineral SWIR Ratio', wavelength: '2.14 – 2.29 μm', description: 'Highlights hematite and quartz sand differentiation from calcite sabkhas.' },
      { id: 'tir', name: 'Thermal Emissivity', wavelength: '8.2 – 11.3 μm', description: 'Resolves day/night thermal inertia characteristics of dune sand.' }
    ],
    narrativeSections: [
      {
        title: 'Bimodal Wind Regimes & Geometric Alignment',
        content: 'Longitudinal seif dunes form parallel to the resultant vector of bimodal wind systems. Alternating shamal winds from the north and monsoon gusts from the Arabian Sea construct stable, knife-edge dune ribbons extending unbroken for over 100 kilometers.'
      }
    ]
  },
  {
    id: 'obs-north-atlantic-bloom',
    slug: 'north-atlantic-bloom',
    title: 'North Atlantic: Mesoscale Vernal Chlorophyll Bloom',
    subtitle: 'Vortex subduction, nutrient upwelling, and biological carbon pump dynamics in the subpolar gyre',
    region: 'Iceland Basin / Subpolar North Atlantic',
    coordinates: '59°12′N 21°30′W',
    domain: 'Hydrosphere',
    platform: 'Sentinel-3 OLCI / MODIS Aqua / NASA PACE',
    sensors: ['Ocean and Land Colour Instrument (OLCI)', 'Ocean Color Radiometer'],
    temporalRange: '2002 – 2026',
    resolution: '300m Multispectral Ocean Color',
    leadImage: '/assets/images/ocean-bloom.jpg',
    summary: 'Every spring, lengthening daylight and surface thermal stratification trigger massive blooms of marine phytoplankton across thousands of square kilometers. Swirling eddies capture and sequester dissolved carbon into the ocean interior, producing ethereal turquoise and emerald vortex ribbons.',
    impactMetrics: [
      { label: 'Chlorophyll-a Peak', value: '18.4 mg/m³', change: '8x seasonal baseline', isPositive: true },
      { label: 'Eddy Kinetic Energy', value: '340 cm²/s²', change: 'Mesoscale front activity', isPositive: true },
      { label: 'Carbon Export Flux', value: '1.4 Pg C/yr', change: 'Deep marine sequestration', isPositive: true },
      { label: 'Surface Temp Gradient', value: '4.2°C', change: 'Across thermal front', isPositive: false }
    ],
    timeSeriesData: [
      { year: 2005, primaryValue: 14.8, secondaryValue: 1.2, anomaly: -0.1, uncertaintyLower: 13.9, uncertaintyUpper: 15.7 },
      { year: 2010, primaryValue: 15.6, secondaryValue: 1.3, anomaly: +0.2, uncertaintyLower: 14.7, uncertaintyUpper: 16.5 },
      { year: 2015, primaryValue: 16.9, secondaryValue: 1.3, anomaly: +0.5, uncertaintyLower: 15.9, uncertaintyUpper: 17.8 },
      { year: 2020, primaryValue: 17.4, secondaryValue: 1.4, anomaly: +0.7, uncertaintyLower: 16.4, uncertaintyUpper: 18.3 },
      { year: 2025, primaryValue: 18.4, secondaryValue: 1.4, anomaly: +0.9, uncertaintyLower: 17.3, uncertaintyUpper: 19.4 }
    ],
    spectralBands: [
      { id: 'chlorophyll', name: 'Chlorophyll Pigment (443/555 nm)', wavelength: '0.443 – 0.555 μm', description: 'Quantifies biomass concentration of coccolithophores and diatoms.' },
      { id: 'fluorescence', name: 'Fluorescence Line Height', wavelength: '0.678 – 0.709 μm', description: 'Detects photosynthetic efficiency and nutrient limitation state.' }
    ],
    narrativeSections: [
      {
        title: 'The Vernal Biological Explosion',
        content: 'As winter storms subside and sun elevation increases, solar radiation warms the upper 50 meters of the water column. Microscopic unicellular algae, fueled by winter-replenished nitrate, phosphate, and silicic acid, undergo exponential population growth.'
      }
    ]
  },
  {
    id: 'obs-boreal-fire',
    slug: 'boreal-pyrocumulonimbus',
    title: 'Western Boreal Pyrocumulonimbus Injection',
    subtitle: 'Thermal radiative energy, stratospheric aerosol injection, and carbon feedback in subarctic taiga',
    region: 'Northwest Territories / Northern Alberta (Canada)',
    coordinates: '62°27′N 114°22′W',
    domain: 'Atmosphere',
    platform: 'VIIRS S-NPP / MODIS Terra / CALIOP',
    sensors: ['Visible Infrared Imaging Radiometer Suite', 'Cloud-Aerosol Lidar (CALIOP)'],
    temporalRange: '2012 – 2026',
    resolution: '375m Thermal / Active Fire',
    leadImage: '/assets/images/wildfire-smoke.jpg',
    summary: 'Megafires in the subarctic taiga increasingly generate extreme storm clouds known as pyrocumulonimbus (PyroCb). These fire-fueled thunderheads inject massive quantities of black carbon and organic aerosol directly into the stratosphere, altering global radiation budgets.',
    impactMetrics: [
      { label: 'Burned Forest Area', value: '4.8 M ha', change: 'Record fire season', isPositive: false },
      { label: 'PyroCb Plume Height', value: '14.2 km', change: 'Breached tropopause', isPositive: false },
      { label: 'Aerosol Optical Depth', value: '4.6 AOD', change: 'Severe smoke opacity', isPositive: false },
      { label: 'Carbon Emissions', value: '480 Mt CO₂e', change: 'Equivalent to national totals', isPositive: false }
    ],
    timeSeriesData: [
      { year: 2012, primaryValue: 1.1, secondaryValue: 120, anomaly: +0.2, uncertaintyLower: 0.9, uncertaintyUpper: 1.3 },
      { year: 2015, primaryValue: 2.3, secondaryValue: 210, anomaly: +0.8, uncertaintyLower: 2.0, uncertaintyUpper: 2.6 },
      { year: 2018, primaryValue: 1.9, secondaryValue: 185, anomaly: +0.6, uncertaintyLower: 1.7, uncertaintyUpper: 2.2 },
      { year: 2021, primaryValue: 3.4, secondaryValue: 340, anomaly: +1.4, uncertaintyLower: 3.0, uncertaintyUpper: 3.8 },
      { year: 2023, primaryValue: 7.2, secondaryValue: 650, anomaly: +2.9, uncertaintyLower: 6.6, uncertaintyUpper: 7.8 },
      { year: 2025, primaryValue: 4.8, secondaryValue: 480, anomaly: +2.1, uncertaintyLower: 4.3, uncertaintyUpper: 5.3 }
    ],
    spectralBands: [
      { id: 'fire', name: 'Shortwave Thermal Active Fire (I4)', wavelength: '3.74 μm', description: 'Pins active flame front coordinates through dense daytime smoke.' },
      { id: 'smoke', name: 'Deep Blue Aerosol', wavelength: '0.412 μm', description: 'Maps aerosol optical depth and particulate size distribution.' }
    ],
    narrativeSections: [
      {
        title: 'Thermal Plume Buoyancy & Stratospheric Punch',
        content: 'Intense firestorm heat generates tremendous vertical buoyancy. When the convective updraft condenses ambient moisture and combustion byproducts, it forms towering cumulonimbus clouds that act as giant chimneys, pumping smoke into the calm stratosphere.'
      }
    ]
  }
]

export const DATASETS: Dataset[] = [
  {
    id: 'ds-aral-sea',
    slug: 'aral-sea-multispectral',
    title: 'Aral Sea Basin Synoptic Telemetry (1985–2025)',
    summary: 'Calibrated surface water extent, shoreline vector polygons, evaporite salinity, and regional land surface temperature time series derived from Landsat and MODIS.',
    domain: 'Hydrosphere',
    platform: 'Landsat-5/7/8/9 & Terra MODIS',
    sensor: 'TM, ETM+, OLI-2, MODIS',
    temporalCoverage: '1985-01-01 to 2025-12-31',
    spatialResolution: '30m Gridded',
    updateCadence: 'Monthly Reanalysis',
    fileFormat: 'Cloud-Optimized GeoTIFF, NetCDF-4, Parquet',
    fileSize: '18.4 GB',
    rowCount: '480 Months (12.4M Cells)',
    downloadCount: 4210,
    citationCount: 312,
    license: 'CC BY 4.0 Open Scientific Data',
    lastUpdated: 'October 2025',
    image: '/assets/images/aral-present.jpg',
    featured: true,
    tags: ['Hydrology', 'Water Balance', 'Endorheic Lakes', 'Salinization', 'Central Asia'],
    primaryMetric: { name: 'Surface Extent', unit: 'km²', latestValue: '7,100' }
  },
  {
    id: 'ds-arctic-permafrost',
    slug: 'arctic-permafrost-hydrology',
    title: 'Pan-Arctic Permafrost Thaw & Thermokarst Inventory',
    summary: 'High-resolution inventory of retrogressive thaw slumps, thermokarst lake drainage, and active layer thickness variations derived from multi-mission radar and lidar.',
    domain: 'Cryosphere',
    platform: 'Sentinel-1/2, CryoSat-2, GEDI',
    sensor: 'C-band SAR, MSI, Spaceborne Lidar',
    temporalCoverage: '2015-06-01 to 2026-03-01',
    spatialResolution: '10m Gridded',
    updateCadence: 'Quarterly',
    fileFormat: 'Zarr, GeoPackage, NetCDF',
    fileSize: '42.8 GB',
    rowCount: '84,200 Slump Polygons',
    downloadCount: 8940,
    citationCount: 489,
    license: 'Open Government / EarthData',
    lastUpdated: 'February 2026',
    image: '/assets/images/hero-delta.jpg',
    featured: true,
    tags: ['Permafrost', 'Arctic', 'Thermokarst', 'Carbon Cycle', 'Methane'],
    primaryMetric: { name: 'Thaw Area Anomaly', unit: '%', latestValue: '+38.2%' }
  },
  {
    id: 'ds-greenland-ice-velocity',
    slug: 'greenland-ice-stream-velocity',
    title: 'Greenland Ice Sheet Surface Velocity & Calving Flux',
    summary: 'Annual and sub-monthly ice displacement velocity vectors computed via speckle tracking and offset feature tracking across all major Greenland marine-terminating glaciers.',
    domain: 'Cryosphere',
    platform: 'Sentinel-1A/B, TerraSAR-X',
    sensor: 'Synthetic Aperture Radar',
    temporalCoverage: '2000-01-01 to 2026-01-31',
    spatialResolution: '50m Velocity Vector',
    updateCadence: '12-Day Cycles',
    fileFormat: 'Cloud-Optimized GeoTIFF, CSV',
    fileSize: '31.2 GB',
    rowCount: '340 Glacial Basins',
    downloadCount: 6510,
    citationCount: 740,
    license: 'CC BY 4.0',
    lastUpdated: 'January 2026',
    image: '/assets/images/glacier-fiord.jpg',
    featured: true,
    tags: ['Glaciology', 'Sea Level Rise', 'Ice Dynamics', 'Greenland', 'Discharge'],
    primaryMetric: { name: 'Jakobshavn Velocity', unit: 'km/yr', latestValue: '14.2' }
  },
  {
    id: 'ds-global-wildfire-aod',
    slug: 'global-wildfire-emissions',
    title: 'Global Fire Radiative Power & Stratospheric Smoke AOD',
    summary: 'Active thermal hotspot detections, fire radiative power (FRP), black carbon mass injection, and vertical aerosol profile tracking from orbital lidar and radiometers.',
    domain: 'Atmosphere',
    platform: 'VIIRS Suomi-NPP, NOAA-20, CALIPSO',
    sensor: 'VIIRS 375m Active Fire, CALIOP Lidar',
    temporalCoverage: '2012-01-01 to 2026-04-01',
    spatialResolution: '375m Hotspots / 0.1° Gridded',
    updateCadence: 'Daily Near Real-Time',
    fileFormat: 'Parquet, GeoJSON, NetCDF',
    fileSize: '64.1 GB',
    rowCount: '184.2M Fire Hotspots',
    downloadCount: 11200,
    citationCount: 890,
    license: 'NASA Public Domain',
    lastUpdated: 'April 2026',
    image: '/assets/images/wildfire-smoke.jpg',
    featured: true,
    tags: ['Wildfire', 'PyroCb', 'Air Quality', 'Aerosol Optical Depth', 'Carbon Emissions'],
    primaryMetric: { name: 'Fire Radiative Power', unit: 'GW', latestValue: '48.2' }
  },
  {
    id: 'ds-global-ocean-color',
    slug: 'global-chlorophyll-flux',
    title: 'Global Ocean Chlorophyll & Carbon Fixation',
    summary: 'Merged multisensor ocean color records estimating surface chlorophyll-a concentration, particulate inorganic carbon, and net primary marine productivity.',
    domain: 'Hydrosphere',
    platform: 'Sentinel-3 OLCI, Aqua MODIS, VIIRS',
    sensor: 'Multi-Spectral Ocean Radiometer',
    temporalCoverage: '1997-09-01 to 2026-03-01',
    spatialResolution: '4km Global / 300m Regional',
    updateCadence: '8-Day Composite',
    fileFormat: 'NetCDF-4, Cloud-Optimized GeoTIFF',
    fileSize: '89.5 GB',
    rowCount: '342 Ocean Provinces',
    downloadCount: 7890,
    citationCount: 620,
    license: 'ESA Open Access',
    lastUpdated: 'March 2026',
    image: '/assets/images/ocean-bloom.jpg',
    featured: true,
    tags: ['Oceanography', 'Phytoplankton', 'Marine Carbon Sink', 'Chlorophyll', 'Ecosystems'],
    primaryMetric: { name: 'Subpolar Gyre Chl', unit: 'mg/m³', latestValue: '18.4' }
  },
  {
    id: 'ds-amazon-canopy-density',
    slug: 'amazon-canopy-structure',
    title: 'Amazon Basin Lidar Canopy Height & Structural Loss',
    summary: 'Spaceborne full-waveform lidar metrics providing forest canopy top height, relative height metrics, plant area index, and localized biomass degradation indicators.',
    domain: 'Biosphere',
    platform: 'ISS GEDI, Sentinel-2',
    sensor: 'GEDI Spaceborne Lidar, MSI Optical',
    temporalCoverage: '2019-04-01 to 2025-10-01',
    spatialResolution: '25m Footprint / 1km Gridded',
    updateCadence: 'Semi-Annual',
    fileFormat: 'HDF5, Parquet, GeoTIFF',
    fileSize: '53.4 GB',
    rowCount: '1.2B Lidar Shots',
    downloadCount: 9400,
    citationCount: 510,
    license: 'NASA EarthData',
    lastUpdated: 'November 2025',
    image: '/assets/images/rainforest-canopy.jpg',
    featured: true,
    tags: ['Biomass', 'Canopy Height', 'Amazon', 'Deforestation', 'Biodiversity'],
    primaryMetric: { name: 'Canopy Loss Rate', unit: 'km²/yr', latestValue: '6,420' }
  },
  {
    id: 'ds-aeolian-sand-transport',
    slug: 'arabian-erg-morphology',
    title: 'Arabian Peninsula Megadune Topography & Sand Flux',
    summary: 'Digital elevation models and thermal inertia mapping analyzing dune height, displacement vectors, inter-dune salt pan geochemistry, and sand transport paths.',
    domain: 'Geosphere',
    platform: 'Tandem-X, ASTER, Sentinel-2',
    sensor: 'InSAR DEM, Thermal Radiometer',
    temporalCoverage: '2010-01-01 to 2025-12-31',
    spatialResolution: '12m DEM / 30m Thermal',
    updateCadence: 'Annual',
    fileFormat: 'Cloud-Optimized GeoTIFF',
    fileSize: '22.1 GB',
    rowCount: '18.9M Elevation Pixels',
    downloadCount: 3120,
    citationCount: 180,
    license: 'DLR / NASA Science Data',
    lastUpdated: 'December 2025',
    image: '/assets/images/desert-orbit.jpg',
    featured: false,
    tags: ['Geomorphology', 'Sand Dunes', 'Aeolian', 'Arid Lands', 'Topography'],
    primaryMetric: { name: 'Seif Ridge Height', unit: 'm', latestValue: '250' }
  },
  {
    id: 'ds-global-night-lights',
    slug: 'global-nighttime-lights-viirs',
    title: 'High-Cadence Nighttime Radiance & Electrification Grid',
    summary: 'Daily, moonlight-corrected nocturnal radiometry capturing anthropogenic settlement expansion, energy infrastructure outages, and urbanization footprint.',
    domain: 'Anthroposphere',
    platform: 'Suomi-NPP VIIRS',
    sensor: 'Day/Night Band (DNB)',
    temporalCoverage: '2012-01-01 to 2026-03-01',
    spatialResolution: '500m Gridded',
    updateCadence: 'Monthly Climatology & Daily NRT',
    fileFormat: 'GeoTIFF, NetCDF-4',
    fileSize: '76.2 GB',
    rowCount: '168 Monthly Composites',
    downloadCount: 14500,
    citationCount: 1210,
    license: 'NOAA Open Data',
    lastUpdated: 'March 2026',
    image: '/assets/images/atmosphere-limb.jpg',
    featured: false,
    tags: ['Urbanization', 'Night Lights', 'Infrastructure', 'Energy', 'Population'],
    primaryMetric: { name: 'Global Radiance', unit: 'nW/cm²/sr', latestValue: '12.8' }
  }
]

export const RESEARCH_METRICS = {
  activeSatellitesTracked: 42,
  terabytesProcessedDaily: 18.6,
  curatedObservations: 1420,
  openPeerReviewedDatasets: 184,
  participatingInstitutions: 76
}

export const CLIMATE_SYSTEM_INDICATORS = [
  { name: 'Atmospheric CO₂', station: 'Mauna Loa Observatory', value: '426.8', unit: 'ppm', deltaYear: '+2.8 ppm', status: 'Rising' },
  { name: 'Global Mean Temp Anomaly', station: 'HadCRUT5 / ERA5', value: '+1.48', unit: '°C above pre-industrial', deltaYear: '+0.12°C', status: 'Record High' },
  { name: 'Arctic Sea Ice Minimum', station: 'NSIDC Satellite Microwave', value: '4.28', unit: 'M km²', deltaYear: '-0.38 M km²', status: 'Depleted' },
  { name: 'Mean Sea Level Trend', station: 'Satellite Radar Altimetry', value: '+3.4', unit: 'mm/yr', deltaYear: '+0.2 mm/yr accel', status: 'Accelerating' },
  { name: 'Antarctic Mass Balance', station: 'GRACE-FO Gravimetry', value: '-148', unit: 'Gt/yr', deltaYear: '-18 Gt/yr', status: 'Net Deficit' }
]
