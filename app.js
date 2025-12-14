/* ============================================================================
   ██████╗ ██╗   ██╗██╗██████╗ ███████╗    ██████╗ ███████╗███╗   ██╗██████╗ 
  ██╔════╝ ██║   ██║██║██╔══██╗██╔════╝    ██╔══██╗██╔════╝████╗  ██║██╔══██╗
  ██║  ███╗██║   ██║██║██║  ██║█████╗      ██████╔╝█████╗  ██╔██╗ ██║██████╔╝
  ██║   ██║██║   ██║██║██║  ██║██╔══╝      ██╔═══╝ ██╔══╝  ██║╚██╗██║██╔══██╗
  ╚██████╔╝╚██████╔╝██║██████╔╝███████╗    ██║     ███████╗██║ ╚████║██║  ██║
   ╚═════╝  ╚═════╝ ╚═╝╚═════╝ ╚══════╝    ╚═╝     ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝
                                                                              
   WebGIS Kawasan Rawan Bencana Tsunami - Provinsi Bali
   Dikembangkan untuk kuliah Sistem Informasi Geografis Berbasis Web
   
   ============================================================================
   PANDUAN KONFIGURASI - UBAH PATH FILE SESUAI KEBUTUHAN ANDA
   ============================================================================
   
   Untuk menggunakan script ini dengan data Anda sendiri, ubah konfigurasi berikut:

   1. FILE DATA TPD (Tempat Pengungsian Darurat)
      Lokasi: Cari "TPD_FILES" (sekitar line 230-240)
      Format: { file: 'NamaFile.geojson', tipe: 'tipefasilitas' }
      
      Contoh:
      const TPD_FILES = [
          { file: 'Pemerintahan.geojson', tipe: 'pemerintahan' },
          { file: 'Pendidikan.geojson', tipe: 'pendidikan' },
          { file: 'RumahSakit.geojson', tipe: 'rumahsakit' }
      ];
      
      Catatan: 
      - File GeoJSON harus berada di folder yang sama dengan index.html
      - Properties yang dibaca: NAMOBJ/REMARK (nama), FCODE (zona), Z (elevasi)
      - FCODE harus mengandung: "AMAN", "RENDAH", atau "SEDANG"

   2. FILE DATA WISATA
      Lokasi: Cari "loadWisataData" (sekitar line 520)
      Ubah: 'Tempat_Wisata.geojson' menjadi nama file wisata Anda
      
      Properties yang dibaca: name/name_en/name_id, tourism, website, description

   3. FILE KRB TSUNAMI
      Lokasi: Cari "loadKrbTsunami" (sekitar line 560)
      Ubah: 'KRB_Tsunami_Bali.geojson' menjadi nama file KRB Anda
      
      Properties yang dibaca: gridcode (1-5 untuk tingkat risiko)

   4. PUSAT PETA (MAP CENTER)
      Lokasi: Cari "L.map" (sekitar line 290)
      Ubah koordinat center dan zoom level sesuai wilayah Anda
      
      Contoh: map.setView([-8.5, 115.1], 10); // [latitude, longitude], zoom

   5. BAHASA / TERJEMAHAN
      Lokasi: Cari "translations" (line 6-160)
      Anda dapat menambah/mengubah terjemahan untuk ID dan EN

   ============================================================================
*/

/* ===========================
   MULTI-LANGUAGE SUPPORT
=========================== */
let currentLang = 'id';

const translations = {
    id: {
        // Header
        title: 'Kawasan Rawan Bencana Tsunami di Tempat Wisata Provinsi Bali',
        subtitle: 'WebGIS: KRB Tsunami • Tempat Pengungsian Darurat • Routing • Export',
        about: 'Tentang',
        help: 'Bantuan',
        // Toolbar
        searchPlaceholder: '🔎 Cari TPD / wisata...',
        calculateRoute: 'Hitung Rute',
        autoNearest: 'Auto Terdekat',
        emergency: 'DARURAT',
        reset: 'Reset',
        walking: 'Berjalan',
        driving: 'Naik Mobil',
        // Sidebar
        startPoint: 'Titik Awal',
        latitude: 'Lintang',
        longitude: 'Bujur',
        destination: 'Tujuan',
        statistics: 'Statistik',
        download: 'Unduh',
        filter: 'Filter',
        touristSpot: 'Objek Wisata',
        selectTourist: '-- pilih wisata --',
        evacuationPoint: 'Titik Evakuasi',
        selectEvac: '-- pilih evakuasi --',
        filterZone: 'Filter Zona',
        allZones: 'Semua Zona',
        filterType: 'Filter Tipe',
        allTypes: 'Semua Tipe',
        minElevation: 'Minimal Elevasi (m)',
        apply: 'Terapkan',
        clearFilter: 'Reset',
        setStart: 'Set Start / Cari TPD',
        clear: 'Bersihkan',
        evacPoints: 'Titik Evakuasi',
        touristObjects: 'Objek Wisata',
        avgElevation: 'Rata-rata Elevasi (m)',
        printMap: 'Cetak Peta',
        // Layer
        layer: 'Layer',
        basemap: 'Peta Dasar',
        krbTsunami: 'KRB Tsunami',
        tpd: 'Tempat Pengungsian Darurat',
        tpdSafe: 'Zona Hijau',
        tpdSafeDesc: 'Area berlindung yang AMAN',
        tpdLow: 'Zona Kuning',
        tpdLowDesc: 'Aman namun tetap waspada',
        tpdMedium: 'Zona Merah',
        tpdMediumDesc: 'Waspada! Area berlindung untuk tingkat tsunami rendah',
        tourist: 'Wisata',
        labels: 'Label',
        buffer: 'Buffer 2km',
        // Legend
        legend: 'Legenda',
        zone: 'Zona',
        safe: 'Zona Hijau',
        low: 'Zona Kuning',
        medium: 'Zona Merah',
        type: 'Tipe',
        government: 'Pemerintahan',
        education: 'Pendidikan',
        hospital: 'Rumah Sakit',
        veryHigh: 'Sangat Tinggi',
        high: 'Tinggi',
        veryLow: 'Sangat Rendah',
        // Info Rute
        routeInfo: 'Info Rute',
        from: 'Dari',
        to: 'Ke',
        distance: 'Jarak',
        duration: 'Durasi',
        destZone: 'Zona tujuan',
        // Toasts
        resetSuccess: 'Reset berhasil',
        allCleared: 'Semua state dibersihkan.',
        tpdLoaded: 'TPD dimuat',
        tpdLoadedDesc: 'Tempat Pengungsian Darurat berhasil dimuat.',
        wisataLoaded: 'Wisata dimuat',
        wisataLoadedDesc: 'tempat wisata berhasil dimuat.',
    },
    en: {
        // Header
        title: 'Tsunami Hazard Areas in Tourist Destinations of Bali Province',
        subtitle: 'WebGIS: Tsunami Hazard • Emergency Shelters • Routing • Export',
        about: 'About',
        help: 'Help',
        // Toolbar
        searchPlaceholder: '🔎 Search TPD / tourist...',
        calculateRoute: 'Calculate Route',
        autoNearest: 'Auto Nearest',
        emergency: 'EMERGENCY',
        reset: 'Reset',
        walking: 'Walking',
        driving: 'Driving',
        // Sidebar
        startPoint: 'Start Point',
        latitude: 'Latitude',
        longitude: 'Longitude',
        destination: 'Destination',
        statistics: 'Statistics',
        download: 'Download',
        filter: 'Filter',
        touristSpot: 'Tourist Spot',
        selectTourist: '-- select tourist --',
        evacuationPoint: 'Evacuation Point',
        selectEvac: '-- select evacuation --',
        filterZone: 'Filter Zone',
        allZones: 'All Zones',
        filterType: 'Filter Type',
        allTypes: 'All Types',
        minElevation: 'Min Elevation (m)',
        apply: 'Apply',
        clearFilter: 'Reset',
        setStart: 'Set Start / Find TPD',
        clear: 'Clear',
        evacPoints: 'Evacuation Points',
        touristObjects: 'Tourist Spots',
        avgElevation: 'Avg Elevation (m)',
        printMap: 'Print Map',
        // Layer
        layer: 'Layer',
        basemap: 'Basemap',
        krbTsunami: 'Tsunami Hazard',
        tpd: 'Emergency Shelters',
        tpdSafe: 'Green Zone',
        tpdSafeDesc: 'SAFE shelter area',
        tpdLow: 'Yellow Zone',
        tpdLowDesc: 'Safe but stay alert',
        tpdMedium: 'Red Zone',
        tpdMediumDesc: 'Alert! Shelter for low-level tsunami',
        tourist: 'Tourist',
        labels: 'Labels',
        buffer: 'Buffer 2km',
        // Legend
        legend: 'Legend',
        zone: 'Zone',
        safe: 'Green Zone',
        low: 'Yellow Zone',
        medium: 'Red Zone',
        type: 'Type',
        government: 'Government',
        education: 'Education',
        hospital: 'Hospital',
        veryHigh: 'Very High',
        high: 'High',
        veryLow: 'Very Low',
        // Info Rute
        routeInfo: 'Route Info',
        from: 'From',
        to: 'To',
        distance: 'Distance',
        duration: 'Duration',
        destZone: 'Dest. Zone',
        // Toasts
        resetSuccess: 'Reset successful',
        allCleared: 'All state cleared.',
        tpdLoaded: 'TPD loaded',
        tpdLoadedDesc: 'Emergency Shelters loaded successfully.',
        wisataLoaded: 'Tourist loaded',
        wisataLoadedDesc: 'Tourist spots loaded successfully.',
    }
};

function t(key) {
    return translations[currentLang][key] || key;
}

function applyLanguage() {
    // Update title
    document.querySelector('.title').textContent = t('title');
    document.querySelector('.subtitle').textContent = t('subtitle');

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Update specific elements
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.title = t('title');

    // Update toolbar buttons
    const btnCompute = document.getElementById('btnCompute');
    if (btnCompute) btnCompute.innerHTML = `<i class="fa-solid fa-route"></i> ${t('calculateRoute')}`;
    const btnNearest = document.getElementById('btnNearest');
    if (btnNearest) btnNearest.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${t('autoNearest')}`;
    const btnEmergency = document.getElementById('btnEmergency');
    if (btnEmergency) btnEmergency.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${t('emergency')}`;
    const btnReset = document.getElementById('btnReset');
    if (btnReset) btnReset.innerHTML = `<i class="fa-solid fa-rotate-left"></i> ${t('reset')}`;

    // Update sidebar headers
    const headers = document.querySelectorAll('.panel h3');
    if (headers[0]) headers[0].innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> ${t('startPoint')}`;
    if (headers[1]) headers[1].innerHTML = `<i class="fa-solid fa-flag-checkered"></i> ${t('destination')}`;
    if (headers[2]) headers[2].innerHTML = `<i class="fa-solid fa-chart-line"></i> ${t('statistics')}`;
    if (headers[3]) headers[3].innerHTML = `<i class="fa-solid fa-download"></i> ${t('download')}`;

    // Update legend header
    const legendHeader = document.querySelector('.legend-header');
    if (legendHeader) legendHeader.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${t('legend')}`;

    // Update layer header
    const layerHeader = document.querySelector('.layer-header');
    if (layerHeader) layerHeader.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${t('layer')} <i class="fa-solid fa-xmark layer-close-icon"></i>`;
}

/* ===========================
   DATA - SHELTER ZONES
=========================== */
// Shelter data akan dimuat dari GeoJSON
let shelterDataAll = []; // Combined shelter data

// Wisata data akan dimuat dari GeoJSON
let wisataDataAll = [];

// Shelter zone definitions
const SHELTER_ZONES = {
    merah: {
        color: '#dc2626',
        label: 'Zona Merah',
        distance: '1-1.5 km dari pantai',
        desc: 'Daerah sedang terkena tsunami (mungkin tergenang)'
    },
    kuning: {
        color: '#eab308',
        label: 'Zona Kuning',
        distance: '1.5-3 km dari pantai',
        desc: 'Daerah rendah potensi tsunami'
    },
    hijau: {
        color: '#22c55e',
        label: 'Zona Hijau',
        distance: '3-5 km dari pantai',
        desc: 'Daerah tinggi dan jauh dari pantai (AMAN)'
    }
};

// GeoJSON files - each file contains all zones, zone determined by FCODE property
const TPD_FILES = [
    { file: 'Pemerintahan.geojson', tipe: 'pemerintahan' },
    { file: 'Pendidikan.geojson', tipe: 'pendidikan' },
    { file: 'RumahSakit.geojson', tipe: 'rumahsakit' }
];

// Map FCODE values to zone names
function getZoneFromFcode(fcode) {
    if (!fcode) return 'hijau'; // default to safe zone
    const upperFcode = fcode.toUpperCase();
    if (upperFcode.includes('AMAN')) return 'hijau';
    if (upperFcode.includes('RENDAH')) return 'kuning';
    if (upperFcode.includes('SEDANG')) return 'merah';
    return 'hijau'; // default
}

// Tipe fasilitas shelter - menggunakan HTML Font Awesome untuk kompatibilitas browser
const SHELTER_TYPES = {
    pemerintahan: { icon: '<i class="fa-solid fa-landmark"></i>', label: 'Pemerintahan', emoji: '🏛️' },
    pendidikan: { icon: '<i class="fa-solid fa-school"></i>', label: 'Pendidikan', emoji: '🏫' },
    rumahsakit: { icon: '<i class="fa-solid fa-hospital"></i>', label: 'Rumah Sakit', emoji: '🏥' }
};

/* ===========================
   STATE
=========================== */
const state = {
    pickStartMode: false,
    start: null, // {name, lat, lon}
    goal: null,  // shelter object
    shelterFiltered: [],
    routeGeo: null,
    routeMeta: null,
};

/* ===========================
   MAP INIT + BASEMAPS
=========================== */
const map = L.map('map', { zoomControl: true }).setView([-8.41, 115.19], 10);

// Add scale control
L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(map);

// Basemaps
const basemaps = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '© Esri' }),
    topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '© OpenTopoMap' })
};

// Add default basemap
basemaps.osm.addTo(map);
let activeBasemap = 'osm';

function switchBasemap(name) {
    if (basemaps[activeBasemap]) {
        map.removeLayer(basemaps[activeBasemap]);
    }
    if (basemaps[name]) {
        basemaps[name].addTo(map);
        activeBasemap = name;
    }
}

// Layers - hanya layer yang checkbox-nya checked by default yang ditambahkan ke map
const krbLayer = L.layerGroup().addTo(map); // KRB Tsunami layer - checked by default
const shelterMerahLayer = L.layerGroup(); // TPD layers - unchecked by default
const shelterKuningLayer = L.layerGroup();
const shelterHijauLayer = L.layerGroup();
const wiLayer = L.layerGroup(); // Wisata - unchecked by default
const routeLayer = L.layerGroup().addTo(map); // Route always on map
const bufferLayer = L.layerGroup(); // Buffer - unchecked by default

/* ===========================
   KRB TSUNAMI STYLING
=========================== */
function getKrbColor(gridcode) {
    switch (gridcode) {
        case 1: return '#1d4ed8'; // Sangat Rendah - Biru
        case 2: return '#22c55e'; // Rendah - Hijau
        case 3: return '#eab308'; // Sedang - Kuning
        case 4: return '#f97316'; // Tinggi - Orange
        case 5: return '#dc2626'; // Sangat Tinggi - Merah
        default: return '#6b7280'; // Abu-abu
    }
}

function getKrbLabel(gridcode) {
    switch (gridcode) {
        case 1: return 'Sangat Rendah';
        case 2: return 'Rendah';
        case 3: return 'Sedang';
        case 4: return 'Tinggi';
        case 5: return 'Sangat Tinggi';
        default: return 'Tidak diketahui';
    }
}

function styleKrb(feature) {
    const gridcode = feature.properties.gridcode;
    return {
        fillColor: getKrbColor(gridcode),
        weight: 0.5,
        opacity: 0.8,
        color: getKrbColor(gridcode),
        fillOpacity: 0.5
    };
}

function loadKrbTsunami() {
    fetch('KRB_Tsunami_Bali.geojson')
        .then(res => {
            if (!res.ok) throw new Error('GeoJSON tidak ditemukan');
            return res.json();
        })
        .then(data => {
            const krbGeoJson = L.geoJSON(data, {
                style: styleKrb,
                onEachFeature: (feature, layer) => {
                    const gc = feature.properties.gridcode;
                    layer.bindPopup(`
                        <div style="font-family:Poppins">
                            <b style="font-size:14px">Kawasan Rentan Tsunami</b><br>
                            <span style="color:#64748b;font-weight:700">Tingkat Kerentanan:</span> 
                            <b style="color:${getKrbColor(gc)}">${getKrbLabel(gc)}</b><br>
                            <span style="color:#64748b;font-weight:700">Gridcode:</span> ${gc}
                        </div>
                    `);
                }
            });
            krbLayer.addLayer(krbGeoJson);
            toast('success', 'KRB Tsunami dimuat', 'Layer Kawasan Rentan Bencana Tsunami berhasil ditampilkan.');
        })
        .catch(err => {
            console.error('Error loading KRB GeoJSON:', err);
            toast('error', 'Gagal memuat KRB', 'File GeoJSON KRB Tsunami tidak ditemukan.');
        });
}

/* ===========================
   UI HELPERS
=========================== */
function toast(type, title, msg) {
    const el = document.createElement('div');
    el.className = `toast ${type || ""}`;
    el.innerHTML = `<div class="t">${title}</div><div class="m">${msg}</div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
}

function showLoading(text = "Memuat data...") {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    if (overlay) {
        overlay.classList.add('show');
        if (loadingText) loadingText.textContent = text;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('show');
}

function fmtKm(m) { return (m / 1000).toFixed(2) + " km"; }
function fmtMin(s) { return Math.round(s / 60) + " menit"; }

function elevCat(elev) {
    const css = getComputedStyle(document.documentElement);
    if (elev > 100) return { color: css.getPropertyValue('--safe').trim(), emoji: "🏥", label: "AMAN" };
    if (elev >= 50) return { color: css.getPropertyValue('--mid').trim(), emoji: "⚠️", label: "SEDANG" };
    return { color: css.getPropertyValue('--low').trim(), emoji: "🚨", label: "RENDAH" };
}

function evIcon(elev) {
    const c = elevCat(elev);
    return L.divIcon({
        className: "",
        html: `<div style="
      width:40px;height:40px;border-radius:16px;
      background:${c.color};
      display:grid;place-items:center;
      color:#fff;font-size:18px;font-weight:900;
      box-shadow:0 14px 26px rgba(2,6,23,.20);
      border:2px solid rgba(255,255,255,.75);
    ">${c.emoji}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
}

const wisataIcon = L.divIcon({
    className: "",
    html: `<div style="
      background:linear-gradient(135deg,#f59e0b,#d97706);
      color:white;
      padding:8px 14px;
      border-radius:10px;
      font-size:12px;
      font-weight:900;
      box-shadow:0 4px 15px rgba(245,158,11,0.3);
      text-align:center;
      display:flex;
      align-items:center;
      gap:6px;
    "><i class="fa-solid fa-umbrella-beach"></i> WISATA</div>`,
    iconSize: [92, 30],
    iconAnchor: [46, 15]
});

function setInfo(from, to, dist, time, zone, elev, stepsHtml = "") {
    document.getElementById('infoFrom').textContent = from || "-";
    document.getElementById('infoTo').textContent = to || "-";
    document.getElementById('infoDist').textContent = dist || "-";
    document.getElementById('infoTime').textContent = time || "-";
    document.getElementById('infoZone').textContent = zone || "-";
    document.getElementById('infoElev').textContent = elev || "-";
    document.getElementById('steps').innerHTML = stepsHtml || "";

    // Show/hide Info Rute panel
    const infoRute = document.getElementById('infoRute');
    if (infoRute) {
        if (from && from !== "-" && to && to !== "-") {
            infoRute.style.display = 'block';
        } else {
            infoRute.style.display = 'none';
        }
    }
}

/* ===========================
   SHELTER ICON FUNCTIONS
=========================== */
function getShelterIcon(zone, tipe) {
    const zoneConfig = SHELTER_ZONES[zone];
    const typeConfig = SHELTER_TYPES[tipe] || { icon: '🏠', label: 'Shelter' };

    return L.divIcon({
        className: "",
        html: `<div style="
      width:36px;height:36px;border-radius:12px;
      background:${zoneConfig.color};
      display:grid;place-items:center;
      color:#fff;font-size:16px;font-weight:900;
      box-shadow:0 10px 20px rgba(2,6,23,.25);
      border:2px solid rgba(255,255,255,.85);
    ">${typeConfig.icon}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });
}

/* ===========================
   LOAD SHELTER DATA FROM GEOJSON
=========================== */
async function loadShelterData() {
    showLoading("Memuat data TPD...");
    shelterDataAll = [];
    let idCounter = 1;

    // Load from new GeoJSON files - zone determined by FCODE property
    for (const { file, tipe } of TPD_FILES) {
        try {
            const res = await fetch(file);
            if (!res.ok) {
                console.warn(`Could not load ${file}: HTTP ${res.status}`);
                continue;
            }
            const data = await res.json();

            data.features.forEach(feature => {
                const coords = feature.geometry.coordinates;
                const props = feature.properties;

                // Determine zone from FCODE property
                const zone = getZoneFromFcode(props.FCODE);

                // Get elevation from Z property, default to 10m
                const elevasi = props.Z !== undefined ? parseFloat(props.Z) : 10;

                shelterDataAll.push({
                    id: idCounter++,
                    nama: props.REMARK || props.NAMOBJ || 'TPD',
                    lat: coords[1],
                    lon: coords[0],
                    zone: zone,
                    tipe: tipe,
                    elevasi: elevasi,
                    fcode: props.FCODE || ''
                });
            });
        } catch (err) {
            console.warn(`Could not load ${file}:`, err);
        }
    }

    // Update state
    state.shelterFiltered = [...shelterDataAll];

    // Render shelters
    renderShelters();
    updateStats();

    hideLoading();
    toast('success', 'TPD dimuat', `${shelterDataAll.length} Tempat Pengungsian Darurat berhasil dimuat.`);
}

/* ===========================
   LOAD WISATA DATA FROM GEOJSON
=========================== */
async function loadWisataData() {
    try {
        const res = await fetch('Tempat_Wisata.geojson');
        if (!res.ok) {
            console.warn('Could not load Tempat_Wisata.geojson:', res.status);
            return;
        }
        const data = await res.json();

        wisataDataAll = [];
        let idCounter = 1;

        data.features.forEach(feature => {
            const coords = feature.geometry.coordinates;
            const props = feature.properties;

            // Get name from various properties
            const nama = props.name || props.name_en || props.name_id ||
                (props.tourism === 'viewpoint' ? 'Viewpoint' : 'Tempat Wisata');

            wisataDataAll.push({
                id: idCounter++,
                nama: nama,
                lat: coords[1],
                lon: coords[0],
                tourism: props.tourism || 'attraction',
                website: props.website || null,
                description: props.description || props.description_en || null
            });
        });

        renderWisata();
        toast('success', 'Wisata dimuat', `${wisataDataAll.length} tempat wisata berhasil dimuat.`);
    } catch (err) {
        console.warn('Could not load Tempat_Wisata.geojson:', err);
    }
}

/* ===========================
   RENDER SHELTERS
=========================== */
function renderShelters() {
    // Clear all shelter layers
    shelterMerahLayer.clearLayers();
    shelterKuningLayer.clearLayers();
    shelterHijauLayer.clearLayers();

    const sel = document.getElementById('selectEvakuasi');
    sel.innerHTML = `<option value="">-- pilih TPD --</option>`;

    // Use filtered data if available
    const dataToRender = state.shelterFiltered.length > 0 ? state.shelterFiltered : shelterDataAll;

    // Track unique locations to avoid duplicate markers at same spot
    const uniqueLocations = new Map();

    dataToRender.forEach(s => {
        const locKey = `${s.lat.toFixed(5)}_${s.lon.toFixed(5)}`;
        if (uniqueLocations.has(locKey)) return;
        uniqueLocations.set(locKey, s);

        const zoneConfig = SHELTER_ZONES[s.zone];
        const typeConfig = SHELTER_TYPES[s.tipe];

        const mk = L.marker([s.lat, s.lon], { icon: getShelterIcon(s.zone, s.tipe) })
            .bindPopup(`
        <div style="font-family:Poppins">
          <b style="font-size:14px">${typeConfig.icon} ${s.nama}</b><br>
          <span style="color:#64748b;font-weight:700">Tipe:</span> ${typeConfig.label}<br>
          <span style="color:#64748b;font-weight:700">Zona:</span> <b style="color:${zoneConfig.color}">${zoneConfig.label}</b><br>
          <span style="color:#64748b;font-weight:700">Jarak Pantai:</span> ${zoneConfig.distance}<br>
          <span style="color:#64748b;font-weight:700">Elevasi:</span> <b>${typeof s.elevasi === 'number' ? s.elevasi.toFixed(1) + 'm' : 'N/A'}</b><br>
          <span style="color:#64748b;font-weight:700">Keterangan:</span> ${zoneConfig.desc}
        </div>
      `);

        // Add to appropriate layer
        if (s.zone === 'merah') shelterMerahLayer.addLayer(mk);
        else if (s.zone === 'kuning') shelterKuningLayer.addLayer(mk);
        else shelterHijauLayer.addLayer(mk);

        // Add to dropdown (limit to first 100 for performance)
        if (sel.options.length < 101) {
            sel.innerHTML += `<option value="${s.id}">${typeConfig.icon} ${s.nama} – ${zoneConfig.label}</option>`;
        }
    });
}

function updateStats() {
    // Count total shelters
    document.getElementById('statEv').textContent = shelterDataAll.length;

    // Calculate average elevation
    if (shelterDataAll.length > 0) {
        const totalElev = shelterDataAll.reduce((sum, s) => sum + (s.elevasi || 0), 0);
        const avgElev = totalElev / shelterDataAll.length;
        document.getElementById('statAvg').textContent = avgElev.toFixed(1);
    } else {
        document.getElementById('statAvg').textContent = '0';
    }
}

function renderWisata() {
    wiLayer.clearLayers();
    const sel = document.getElementById('selectWisata');
    sel.innerHTML = `<option value="">-- pilih wisata --</option>`;

    wisataDataAll.forEach(w => {
        const tourismLabel = w.tourism === 'viewpoint' ? '🔭 Viewpoint' :
            w.tourism === 'attraction' ? '⭐ Attraction' :
                w.tourism === 'theme_park' ? '🎡 Theme Park' : '🏖️ Wisata';

        let popupContent = `<div style="font-family:Poppins"><b>${w.nama}</b><br>
            <span style="color:#64748b;font-weight:700">Tipe:</span> ${tourismLabel}<br>
            <span style="color:#64748b;font-weight:700">Koordinat:</span> ${w.lat.toFixed(6)}, ${w.lon.toFixed(6)}`;

        if (w.description) {
            popupContent += `<br><span style="color:#64748b;font-weight:700">Deskripsi:</span> ${w.description}`;
        }

        popupContent += `</div>`;

        const mk = L.marker([w.lat, w.lon], { icon: wisataIcon })
            .bindPopup(popupContent);
        wiLayer.addLayer(mk);
        sel.innerHTML += `<option value="${w.id}">${w.nama}</option>`;
    });

    document.getElementById('statWi').textContent = wisataDataAll.length;
}

/* ===========================
   FILTER
=========================== */
function applyFilter() {
    const zona = document.getElementById('filterKel').value;
    const minElev = parseFloat(document.getElementById('filterMinElev').value);
    const tipe = document.getElementById('filterTipe') ? document.getElementById('filterTipe').value : 'ALL';

    let d = [...shelterDataAll];

    // Filter by zona
    if (zona && zona !== "ALL") {
        d = d.filter(x => x.zone === zona);
    }

    // Filter by minimum elevation
    if (!Number.isNaN(minElev) && minElev > 0) {
        d = d.filter(x => x.elevasi >= minElev);
    }

    // Filter by tipe fasilitas
    if (tipe && tipe !== "ALL") {
        d = d.filter(x => x.tipe === tipe);
    }

    state.shelterFiltered = d;
    renderShelters();
    syncLayers();

    const filterInfo = [];
    if (zona && zona !== "ALL") filterInfo.push(`Zona: ${zona}`);
    if (!Number.isNaN(minElev) && minElev > 0) filterInfo.push(`Elevasi ≥${minElev}m`);
    if (tipe && tipe !== "ALL") filterInfo.push(`Tipe: ${tipe}`);

    toast("success", "Filter diterapkan", `Total TPD: ${d.length}${filterInfo.length ? ' (' + filterInfo.join(', ') + ')' : ''}`);
}

/* ===========================
   START / GOAL
=========================== */
function getStartFromUI() {
    const lat = parseFloat(document.getElementById('inputLat').value);
    const lon = parseFloat(document.getElementById('inputLon').value);
    if (!Number.isNaN(lat) && !Number.isNaN(lon)) return { name: "Koordinat Manual", lat, lon };

    const wID = document.getElementById('selectWisata').value;
    if (wID) {
        const w = wisataDataAll.find(x => String(x.id) === String(wID));
        if (w) return { name: w.nama, lat: w.lat, lon: w.lon };
    }

    if (state.start) return state.start;
    return null;
}

// Reverse geocoding using Nominatim (OpenStreetMap)
async function reverseGeocode(lat, lon) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
            headers: { 'Accept-Language': 'id' }
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.address) {
            // Build a short, readable name
            const addr = data.address;
            const parts = [];
            if (addr.tourism) parts.push(addr.tourism);
            else if (addr.amenity) parts.push(addr.amenity);
            else if (addr.building) parts.push(addr.building);
            else if (addr.road) parts.push(addr.road);

            if (addr.village) parts.push(addr.village);
            else if (addr.suburb) parts.push(addr.suburb);
            else if (addr.neighbourhood) parts.push(addr.neighbourhood);

            if (addr.city) parts.push(addr.city);
            else if (addr.town) parts.push(addr.town);
            else if (addr.county) parts.push(addr.county);

            return parts.length > 0 ? parts.slice(0, 3).join(', ') : data.display_name?.split(',').slice(0, 3).join(',');
        }
        return null;
    } catch (err) {
        console.warn('Reverse geocoding failed:', err);
        return null;
    }
}

async function setStart(start) {
    state.start = start;

    // If the name is generic (like "Koordinat Manual" or "Lokasi Anda"), try reverse geocoding
    if (start.name === "Koordinat Manual" || start.name === "Lokasi Anda" || start.name === "Lokasi Anda (GPS)") {
        const geoName = await reverseGeocode(start.lat, start.lon);
        if (geoName) {
            start.name = geoName;
            state.start.name = geoName;
        }
    }

    toast("success", "Start diset", `${start.name} (${start.lat.toFixed(5)}, ${start.lon.toFixed(5)})`);
}

function setGoalById(id) {
    const g = shelterDataAll.find(x => String(x.id) === String(id));
    state.goal = g || null;
}

function findNearestEvakuasi(start) {
    const candidates = state.shelterFiltered.length ? state.shelterFiltered : shelterDataAll;
    if (!candidates.length) return null;

    let best = null;
    let bestD = Infinity;
    for (const e of candidates) {
        const d = map.distance([start.lat, start.lon], [e.lat, e.lon]);
        if (d < bestD) { bestD = d; best = e; }
    }
    return best ? { ev: best, distM: bestD } : null;
}

function findTop10NearestTPD(start) {
    const candidates = state.shelterFiltered.length ? state.shelterFiltered : shelterDataAll;
    if (!candidates.length) return [];

    // Calculate distances and sort
    const withDistances = candidates.map(e => ({
        ...e,
        distance: map.distance([start.lat, start.lon], [e.lat, e.lon])
    }));

    // Sort by distance and take top 10
    withDistances.sort((a, b) => a.distance - b.distance);
    return withDistances.slice(0, 10);
}

function showTop10NearestInDropdown(start) {
    const top10 = findTop10NearestTPD(start);
    if (!top10.length) {
        toast("warn", "Data TPD kosong", "Tidak ada data TPD yang tersedia.");
        return;
    }

    const sel = document.getElementById('selectEvakuasi');
    sel.innerHTML = `<option value="">-- 10 TPD Terdekat --</option>`;

    top10.forEach((s, idx) => {
        const zoneConfig = SHELTER_ZONES[s.zone];
        const typeConfig = SHELTER_TYPES[s.tipe];
        const distKm = (s.distance / 1000).toFixed(2);
        sel.innerHTML += `<option value="${s.id}">${idx + 1}. ${typeConfig.icon} ${s.nama} – ${distKm} km (${zoneConfig.label})</option>`;
    });

    toast("success", "10 TPD Terdekat", `Menampilkan 10 titik evakuasi terdekat dari lokasi Anda.`);
}

/* ===========================
   ROUTING (OSRM) + FALLBACK
=========================== */
function routeColorByKm(km) {
    const css = getComputedStyle(document.documentElement);
    if (km < 3) return css.getPropertyValue('--safe').trim();
    if (km <= 5) return css.getPropertyValue('--mid').trim();
    return css.getPropertyValue('--low').trim();
}

function clearRoute() {
    routeLayer.clearLayers();
    bufferLayer.clearLayers();
    state.routeGeo = null;
    state.routeMeta = null;
    setInfo("-", "-", "-", "-", "-", "-", "");
}

function drawBufferIfNeeded(start) {
    bufferLayer.clearLayers();
    if (!document.getElementById('chkBuffer').checked) return;

    const circle = L.circle([start.lat, start.lon], {
        radius: 2000,
        color: "#0ea5e9",
        dashArray: "8 6",
        weight: 2,
        fillOpacity: 0.10
    });
    bufferLayer.addLayer(circle);
}

function htmlSteps(steps) {
    if (!steps?.length) return "";
    return steps.slice(0, 10).map((s, i) => {
        const name = (s.name || "").trim();
        const instr = (s.maneuver?.instruction || "").trim();
        const dist = s.distance ? fmtKm(s.distance) : "";
        return `<div class="step"><b>${i + 1}.</b> ${instr || "Lanjut"}<br><small>${name ? ("via " + name + " • ") : ""}${dist}</small></div>`;
    }).join("");
}

async function getRouteOSRM(start, goal, profile) {
    const prof = profile === "car" ? "driving" : "walking";
    const url = `https://router.project-osrm.org/route/v1/${prof}/${start.lon},${start.lat};${goal.lon},${goal.lat}?overview=full&geometries=geojson&steps=true`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("OSRM HTTP error");

    const json = await res.json();
    const route = json.routes?.[0];
    if (!route) throw new Error("No route found");

    const steps = json.routes?.[0]?.legs?.[0]?.steps || [];
    steps.forEach(st => {
        const mod = st.maneuver?.modifier ? (" " + st.maneuver.modifier) : "";
        const type = st.maneuver?.type ? st.maneuver.type : "continue";
        const n = st.name ? ` ke ${st.name}` : "";
        st.maneuver.instruction = `${type}${mod}${n}`.replaceAll("_", " ");
    });

    return { distance_m: route.distance, duration_s: route.duration, geojson: route.geometry, steps };
}

function drawRouteGeoJSON(geo, color) {
    return L.geoJSON(geo, { style: { color, weight: 6, opacity: .9 } }).addTo(routeLayer);
}

function drawFallbackLine(start, goal) {
    const distM = map.distance([start.lat, start.lon], [goal.lat, goal.lon]);
    const km = distM / 1000;
    const color = routeColorByKm(km);

    const line = L.polyline([[start.lat, start.lon], [goal.lat, goal.lon]], {
        color, weight: 6, opacity: .9, dashArray: "10 8"
    }).addTo(routeLayer);

    return { distM, durS: (km / 4) * 3600, line, color }; // estimasi walking
}

async function computeRoute({ autoNearest = false } = {}) {
    const start = getStartFromUI();
    if (!start) {
        toast("warn", "Start belum ada", "Pilih wisata / isi koordinat / klik peta untuk Start.");
        return;
    }

    const goalId = document.getElementById('selectEvakuasi').value;
    let goal = goalId ? shelterDataAll.find(x => String(x.id) === String(goalId)) : null;

    if (!goal || autoNearest) {
        const nearest = findNearestEvakuasi(start);
        if (!nearest) {
            toast("error", "Data evakuasi kosong", "Coba reset filter atau isi data evakuasi.");
            return;
        }
        goal = nearest.ev;
        document.getElementById('selectEvakuasi').value = String(goal.id);
        toast("success", "Tujuan terdekat dipilih", `${goal.nama} (${fmtKm(nearest.distM)})`);
    }

    state.start = start;
    state.goal = goal;

    clearRoute();
    drawBufferIfNeeded(start);

    const prof = document.getElementById('routeProfile').value;

    // start/goal highlight marker
    const startMk = L.marker([start.lat, start.lon], {
        icon: L.divIcon({
            className: "",
            html: `<div style="background:linear-gradient(135deg,#0ea5e9,#06b6d4); color:#fff; padding:8px 10px; border-radius:14px; font-weight:900; border:2px solid rgba(255,255,255,.8); box-shadow:0 14px 26px rgba(2,6,23,.22)">START</div>`
        }),
        zIndexOffset: 1000
    }).addTo(routeLayer);

    const zoneConfig = SHELTER_ZONES[goal.zone];
    const typeConfig = SHELTER_TYPES[goal.tipe] || { icon: '🏠', label: 'Shelter' };
    const goalMk = L.marker([goal.lat, goal.lon], {
        icon: L.divIcon({
            className: "",
            html: `<div style="background:${zoneConfig.color}; color:#fff; padding:8px 10px; border-radius:14px; font-weight:900; border:2px solid rgba(255,255,255,.8); box-shadow:0 14px 26px rgba(2,6,23,.22)">GOAL</div>`
        }),
        zIndexOffset: 1000
    }).addTo(routeLayer);

    startMk.bindPopup(`<b>Start</b><br>${start.name}`);
    goalMk.bindPopup(`<b>Goal</b><br>${typeConfig.icon} ${goal.nama}`);

    try {
        toast("", "Menghitung rute…", "Menghubungi OSRM untuk jalur mengikuti jalan.");
        const r = await getRouteOSRM(start, goal, prof);

        const km = r.distance_m / 1000;
        const color = routeColorByKm(km);

        const line = drawRouteGeoJSON(r.geojson, color);

        state.routeGeo = r.geojson;
        state.routeMeta = { distance_m: r.distance_m, duration_s: r.duration_s, steps: r.steps, profile: prof, color };

        // Get elevation text for TPD
        const elevText = typeof goal.elevasi === 'number' ? `${goal.elevasi.toFixed(1)}m` : 'N/A';

        setInfo(
            start.name,
            goal.nama,
            fmtKm(r.distance_m),
            fmtMin(r.duration_s),
            `${zoneConfig.label} (${zoneConfig.distance})`,
            elevText,
            htmlSteps(r.steps)
        );

        map.fitBounds(line.getBounds(), { padding: [50, 50] });
        toast("success", "Rute berhasil", `${fmtKm(r.distance_m)} • ${fmtMin(r.duration_s)} (${prof === "car" ? "driving" : "walking"})`);
    } catch (err) {
        const fb = drawFallbackLine(start, goal);
        const elevText = typeof goal.elevasi === 'number' ? `${goal.elevasi.toFixed(1)}m` : 'N/A';
        setInfo(
            start.name,
            goal.nama,
            fmtKm(fb.distM),
            fmtMin(fb.durS),
            `${zoneConfig.label} (${zoneConfig.distance})`,
            elevText,
            `<div class="step"><b>Fallback</b> – OSRM tidak tersedia. Menampilkan garis lurus (estimasi).</div>`
        );
        map.fitBounds(fb.line.getBounds(), { padding: [50, 50] });
        toast("warn", "OSRM gagal", "Fallback garis lurus digunakan (estimasi). Pastikan internet aktif.");
    }

    syncLayers();
}

/* ===========================
   SEARCH
=========================== */
function doSearch() {
    const q = (document.getElementById('searchInput').value || "").trim().toLowerCase();
    if (!q) {
        toast("warn", "Cari apa?", "Ketik nama shelter / wisata / tipe / zona.");
        return;
    }

    // Search in shelters with multiple criteria
    const shelterMatches = shelterDataAll.filter(x => {
        const nama = (x.nama || "").toLowerCase();
        const tipe = (x.tipe || "").toLowerCase();
        const zone = (x.zone || "").toLowerCase();
        const zoneLabel = SHELTER_ZONES[x.zone]?.label.toLowerCase() || "";
        const tipeLabel = SHELTER_TYPES[x.tipe]?.label.toLowerCase() || "";

        return nama.includes(q) ||
            tipe.includes(q) ||
            zone.includes(q) ||
            zoneLabel.includes(q) ||
            tipeLabel.includes(q);
    });

    if (shelterMatches.length > 0) {
        const first = shelterMatches[0];
        map.setView([first.lat, first.lon], 14);

        // If multiple matches, update dropdown with results
        if (shelterMatches.length > 1) {
            const sel = document.getElementById('selectEvakuasi');
            sel.innerHTML = `<option value="">-- ${shelterMatches.length} hasil pencarian --</option>`;
            shelterMatches.slice(0, 20).forEach(s => {
                const zoneConfig = SHELTER_ZONES[s.zone];
                const typeConfig = SHELTER_TYPES[s.tipe];
                sel.innerHTML += `<option value="${s.id}">${typeConfig.icon} ${s.nama} – ${zoneConfig.label}</option>`;
            });
            toast("success", `${shelterMatches.length} TPD ditemukan`, `"${q}" → Lihat dropdown untuk semua hasil`);
        } else {
            toast("success", "Ditemukan (TPD)", `${first.nama} – ${SHELTER_ZONES[first.zone].label}`);
        }
        return;
    }

    // Search in wisata
    const wi = wisataDataAll.find(x => x.nama.toLowerCase().includes(q));
    if (wi) {
        map.setView([wi.lat, wi.lon], 14);
        toast("success", "Ditemukan (Wisata)", wi.nama);
        return;
    }

    toast("error", "Tidak ditemukan", `Coba kata kunci lain. Contoh: "kantor", "sekolah", "hijau"`);
}

/* ===========================
   EXPORT
=========================== */
function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCSV() {
    const rows = [["id", "nama", "tipe", "zona", "lat", "lon"]];
    state.shelterFiltered.forEach(s => rows.push([s.id, s.nama, s.tipe, s.zone, s.lat, s.lon]));
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    downloadFile("shelter_filtered.csv", csv, "text/csv;charset=utf-8");
    toast("success", "Export CSV", "File CSV berhasil dibuat.");
}

function exportGeoJSON() {
    const features = [];

    state.shelterFiltered.forEach(s => {
        features.push({
            type: "Feature",
            properties: { type: "shelter", id: s.id, nama: s.nama, tipe: s.tipe, zona: s.zone },
            geometry: { type: "Point", coordinates: [s.lon, s.lat] }
        });
    });

    wisataDataAll.forEach(w => {
        features.push({
            type: "Feature",
            properties: { type: "wisata", id: w.id, nama: w.nama },
            geometry: { type: "Point", coordinates: [w.lon, w.lat] }
        });
    });

    if (state.routeGeo) {
        features.push({
            type: "Feature",
            properties: {
                type: "route",
                distance_m: state.routeMeta?.distance_m ?? null,
                duration_s: state.routeMeta?.duration_s ?? null,
                profile: state.routeMeta?.profile ?? null,
            },
            geometry: state.routeGeo
        });
    }

    downloadFile("webgis_shelter.geojson", JSON.stringify({ type: "FeatureCollection", features }, null, 2), "application/geo+json;charset=utf-8");
    toast("success", "Export GeoJSON", "File GeoJSON berhasil dibuat.");
}

/* ===========================
   LAYER + BASEMAP
=========================== */
// Update TPD parent checkbox based on child checkboxes
function updateTPDParentCheckbox() {
    const chkTPDAll = document.getElementById('chkTPDAll');
    if (!chkTPDAll) return;

    const chkMerah = document.getElementById('chkShelterMerah');
    const chkKuning = document.getElementById('chkShelterKuning');
    const chkHijau = document.getElementById('chkShelterHijau');

    if (!chkMerah || !chkKuning || !chkHijau) return;

    const allChecked = chkMerah.checked && chkKuning.checked && chkHijau.checked;
    const anyChecked = chkMerah.checked || chkKuning.checked || chkHijau.checked;

    chkTPDAll.checked = allChecked;
    chkTPDAll.indeterminate = anyChecked && !allChecked;
}

function syncLayers() {
    document.getElementById('chkKrb').checked ? map.addLayer(krbLayer) : map.removeLayer(krbLayer);
    document.getElementById('chkShelterMerah').checked ? map.addLayer(shelterMerahLayer) : map.removeLayer(shelterMerahLayer);
    document.getElementById('chkShelterKuning').checked ? map.addLayer(shelterKuningLayer) : map.removeLayer(shelterKuningLayer);
    document.getElementById('chkShelterHijau').checked ? map.addLayer(shelterHijauLayer) : map.removeLayer(shelterHijauLayer);
    document.getElementById('chkWisata').checked ? map.addLayer(wiLayer) : map.removeLayer(wiLayer);
    document.getElementById('chkBuffer').checked ? map.addLayer(bufferLayer) : map.removeLayer(bufferLayer);

    // Route layer is always added when a route is computed, no checkbox needed

    // Sync legend with active layers
    syncLegend();

    // Update TPD parent checkbox state
    updateTPDParentCheckbox();
}

/* ===========================
   DYNAMIC LEGEND
=========================== */
function syncLegend() {
    const chkKrb = document.getElementById('chkKrb').checked;
    const chkMerah = document.getElementById('chkShelterMerah').checked;
    const chkKuning = document.getElementById('chkShelterKuning').checked;
    const chkHijau = document.getElementById('chkShelterHijau').checked;
    const chkWisata = document.getElementById('chkWisata').checked;

    // TPD section - show if any TPD layer is active
    const anyTPDActive = chkMerah || chkKuning || chkHijau;
    const legendTPD = document.getElementById('legendTPD');
    const legendTipe = document.getElementById('legendTipe');
    if (legendTPD) legendTPD.style.display = anyTPDActive ? 'flex' : 'none';
    if (legendTipe) legendTipe.style.display = anyTPDActive ? 'flex' : 'none';

    // Individual zone legends
    const legendMerah = document.getElementById('legendMerah');
    const legendKuning = document.getElementById('legendKuning');
    const legendHijau = document.getElementById('legendHijau');
    if (legendMerah) legendMerah.style.display = chkMerah ? 'flex' : 'none';
    if (legendKuning) legendKuning.style.display = chkKuning ? 'flex' : 'none';
    if (legendHijau) legendHijau.style.display = chkHijau ? 'flex' : 'none';

    // Wisata legend
    const legendWisata = document.getElementById('legendWisata');
    if (legendWisata) legendWisata.style.display = chkWisata ? 'flex' : 'none';

    // KRB legend
    const legendKRB = document.getElementById('legendKRB');
    if (legendKRB) legendKRB.style.display = chkKrb ? 'flex' : 'none';

    // Hide main legend container if nothing is visible
    const legend = document.getElementById('legend');
    const anyActive = anyTPDActive || chkWisata || chkKrb;
    if (legend) legend.style.display = anyActive ? 'block' : 'none';
}

/* ===========================
   EMERGENCY MODE
=========================== */
function activateEmergencyMode() {
    if (!navigator.geolocation) {
        toast("error", "GPS tidak tersedia", "Browser Anda tidak mendukung geolocation.");
        return;
    }

    showLoading("Mencari lokasi Anda...");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            hideLoading();
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Set start location
            document.getElementById('inputLat').value = lat.toFixed(6);
            document.getElementById('inputLon').value = lon.toFixed(6);
            document.getElementById('selectWisata').value = "";

            const start = { name: "Lokasi Anda (GPS)", lat, lon };
            setStart(start);

            // Zoom to location
            map.setView([lat, lon], 14);

            // Add a special marker for user location
            const userMarker = L.marker([lat, lon], {
                icon: L.divIcon({
                    className: "",
                    html: `<div style="background:linear-gradient(135deg,#dc2626,#ef4444); color:#fff; padding:10px 14px; border-radius:16px; font-weight:900; border:3px solid #fff; box-shadow:0 14px 26px rgba(220,38,38,.35); animation: pulse 1.5s infinite;">📍 ANDA DI SINI</div>`
                }),
                zIndexOffset: 2000
            }).addTo(routeLayer);

            // Show 10 nearest TPD
            showTop10NearestInDropdown(start);

            // Find absolute nearest and compute route
            const nearest = findNearestEvakuasi(start);
            if (nearest) {
                state.goal = nearest.ev;
                document.getElementById('selectEvakuasi').value = String(nearest.ev.id);
                toast("success", "🚨 MODE DARURAT AKTIF", `TPD terdekat: ${nearest.ev.nama} (${fmtKm(nearest.distM)})`);

                // Auto compute route
                computeRoute({ autoNearest: true });
            } else {
                toast("warn", "Data TPD kosong", "Tidak ada TPD yang tersedia.");
            }
        },
        (error) => {
            hideLoading();
            let msg = "Gagal mendapatkan lokasi.";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    msg = "Izin lokasi ditolak. Aktifkan GPS di browser.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg = "Lokasi tidak tersedia.";
                    break;
                case error.TIMEOUT:
                    msg = "Timeout saat mencari lokasi.";
                    break;
            }
            toast("error", "GPS Error", msg);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

/* ===========================
   EVENTS
=========================== */
document.getElementById('btnSearch').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('keydown', (e) => { if (e.key === "Enter") doSearch(); });

document.getElementById('btnApplyFilter').addEventListener('click', applyFilter);
document.getElementById('btnClearFilter').addEventListener('click', () => {
    document.getElementById('filterKel').value = "ALL";
    document.getElementById('filterMinElev').value = "";
    if (document.getElementById('filterTipe')) document.getElementById('filterTipe').value = "ALL";
    state.shelterFiltered = [...shelterDataAll];
    renderShelters();
    syncLayers();
    toast("success", "Filter direset", "Menampilkan semua TPD.");
});

// Emergency Mode button
document.getElementById('btnEmergency').addEventListener('click', activateEmergencyMode);

document.getElementById('selectEvakuasi').addEventListener('change', (e) => setGoalById(e.target.value));

document.getElementById('selectWisata').addEventListener('change', (e) => {
    const id = e.target.value;
    const w = wisataDataAll.find(x => String(x.id) === String(id));
    if (w) {
        document.getElementById('inputLat').value = w.lat.toFixed(6);
        document.getElementById('inputLon').value = w.lon.toFixed(6);
        setStart({ name: w.nama, lat: w.lat, lon: w.lon });
        map.setView([w.lat, w.lon], 14);

        // Activate wisata layer and show only selected wisata
        document.getElementById('chkWisata').checked = true;

        // Clear wisata layer and add only selected wisata marker
        wiLayer.clearLayers();
        const mk = L.marker([w.lat, w.lon], { icon: wisataIcon })
            .bindPopup(`<div style="font-family:Poppins"><b>${w.nama}</b><br>
                <span style="color:#64748b;font-weight:700">Koordinat:</span> ${w.lat.toFixed(6)}, ${w.lon.toFixed(6)}</div>`)
            .openPopup();
        wiLayer.addLayer(mk);

        syncLayers();
        toast('info', 'Wisata dipilih', w.nama);
    } else if (!id) {
        // If cleared, show all wisata
        renderWisata();
        syncLayers();
    }
});

document.getElementById('btnCompute').addEventListener('click', () => computeRoute({ autoNearest: false }));
document.getElementById('btnNearest').addEventListener('click', () => computeRoute({ autoNearest: true }));

document.getElementById('btnReset').addEventListener('click', () => {
    state.pickStartMode = false;
    state.start = null;
    state.goal = null;
    state.shelterFiltered = [...shelterDataAll];

    document.getElementById('selectWisata').value = "";
    document.getElementById('selectEvakuasi').value = "";
    document.getElementById('inputLat').value = "";
    document.getElementById('inputLon').value = "";
    document.getElementById('filterKel').value = "ALL";
    document.getElementById('filterMinElev').value = "";
    document.getElementById('chkBuffer').checked = false;

    // Hide Info Rute panel and clear its contents
    setInfo(null, null, null, null, null, "");
    const infoRute = document.getElementById('infoRute');
    if (infoRute) infoRute.style.display = 'none';

    clearRoute();
    renderShelters();
    renderWisata();
    syncLayers();
    toast("success", "Reset berhasil", "Semua state dibersihkan.");
});

document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
document.getElementById('btnExportGeoJSON').addEventListener('click', exportGeoJSON);
document.getElementById('btnPrint').addEventListener('click', () => window.print());

// Layer checkboxes
['chkKrb', 'chkShelterMerah', 'chkShelterKuning', 'chkShelterHijau', 'chkWisata', 'chkBuffer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('change', () => {
            if (id === 'chkBuffer') {
                const st = getStartFromUI();
                if (st) drawBufferIfNeeded(st);
            }
            // Update TPD parent checkbox state
            updateTPDParentCheckbox();
            syncLayers();
        });
    }
});

// TPD Parent checkbox - select/deselect all TPD zones
const chkTPDAll = document.getElementById('chkTPDAll');
if (chkTPDAll) {
    chkTPDAll.addEventListener('change', () => {
        const checked = chkTPDAll.checked;
        document.getElementById('chkShelterMerah').checked = checked;
        document.getElementById('chkShelterKuning').checked = checked;
        document.getElementById('chkShelterHijau').checked = checked;
        syncLayers();
    });
}

function updateTPDParentCheckbox() {
    const chkTPDAll = document.getElementById('chkTPDAll');
    if (chkTPDAll) {
        const allChecked = document.getElementById('chkShelterMerah').checked &&
            document.getElementById('chkShelterKuning').checked &&
            document.getElementById('chkShelterHijau').checked;
        const anyChecked = document.getElementById('chkShelterMerah').checked ||
            document.getElementById('chkShelterKuning').checked ||
            document.getElementById('chkShelterHijau').checked;
        chkTPDAll.checked = allChecked;
        chkTPDAll.indeterminate = anyChecked && !allChecked;
    }
}

// Basemap radio buttons
document.querySelectorAll('input[name="basemap"]').forEach(radio => {
    radio.addEventListener('change', () => {
        switchBasemap(radio.value);
    });
});

// Layer panel toggle with legend repositioning
function updateLegendPosition() {
    const layerPanel = document.getElementById('layerPanel');
    const legend = document.getElementById('legend');
    if (!legend) return;

    if (!layerPanel.classList.contains('collapsed')) {
        // Layer panel is open - position legend below it
        const panelRect = layerPanel.getBoundingClientRect();
        const mapRect = document.getElementById('map').getBoundingClientRect();
        legend.style.top = (panelRect.bottom - mapRect.top + 10) + 'px';
        legend.style.transform = 'none';
    } else {
        // Layer panel is closed - reset to middle
        legend.style.top = '50%';
        legend.style.transform = 'translateY(-50%)';
    }
}

document.getElementById('layerToggle').addEventListener('click', () => {
    document.getElementById('layerPanel').classList.remove('collapsed');
    document.getElementById('layerToggle').style.display = 'none';
    setTimeout(updateLegendPosition, 50);
});

document.getElementById('layerClose').addEventListener('click', () => {
    document.getElementById('layerPanel').classList.add('collapsed');
    document.getElementById('layerToggle').style.display = 'flex';
    setTimeout(updateLegendPosition, 50);
});

document.getElementById('btnPickStart').addEventListener('click', () => {
    // Check if coordinates are already filled
    const lat = parseFloat(document.getElementById('inputLat').value);
    const lon = parseFloat(document.getElementById('inputLon').value);

    if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
        // Coordinates exist - show 10 nearest TPD
        const start = { name: "Lokasi Anda", lat, lon };
        setStart(start);

        // Auto-activate TPD layers
        document.getElementById('chkShelterHijau').checked = true;
        document.getElementById('chkShelterKuning').checked = true;
        document.getElementById('chkShelterMerah').checked = true;

        // Filter to only show 10 nearest TPD on the map
        const top10 = findTop10NearestTPD(start);
        state.shelterFiltered = top10;
        renderShelters();

        syncLayers();
        showTop10NearestInDropdown(start);
        map.setView([lat, lon], 13);
    } else {
        // No coordinates - enter pick mode
        state.pickStartMode = !state.pickStartMode;
        toast(state.pickStartMode ? "" : "success", "Mode klik peta", state.pickStartMode ? "Klik lokasi di peta untuk set START." : "Mode klik peta dimatikan.");
    }
});

document.getElementById('btnClearStart').addEventListener('click', () => {
    state.start = null;
    document.getElementById('inputLat').value = "";
    document.getElementById('inputLon').value = "";
    document.getElementById('selectWisata').value = "";
    toast("success", "Start dibersihkan", "Silakan set Start lagi.");
});

map.on('click', (e) => {
    if (!state.pickStartMode) return;
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    document.getElementById('inputLat').value = lat.toFixed(6);
    document.getElementById('inputLon').value = lon.toFixed(6);
    document.getElementById('selectWisata').value = "";
    const start = { name: "Klik Peta", lat, lon };
    setStart(start);
    state.pickStartMode = false;

    // Auto-show 10 nearest TPD
    showTop10NearestInDropdown(start);
});

map.on('mousemove', (e) => {
    document.getElementById('coords').textContent = `Lat: ${e.latlng.lat.toFixed(6)}, Lng: ${e.latlng.lng.toFixed(6)}`;
});

// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    sb.classList.toggle('collapsed');
    document.querySelector('#toggleSidebar i').className =
        sb.classList.contains('collapsed') ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
});

// Modal About/Help
const modalAbout = document.getElementById('modalAbout');
const modalHelp = document.getElementById('modalHelp');

document.getElementById('btnAbout').addEventListener('click', () => modalAbout.classList.add('show'));
document.getElementById('btnHelp').addEventListener('click', () => modalHelp.classList.add('show'));
['closeAbout', 'okAbout'].forEach(id => document.getElementById(id).addEventListener('click', () => modalAbout.classList.remove('show')));
['closeHelp', 'okHelp'].forEach(id => document.getElementById(id).addEventListener('click', () => modalHelp.classList.remove('show')));
modalAbout.addEventListener('click', (e) => { if (e.target === modalAbout) modalAbout.classList.remove('show'); });
modalHelp.addEventListener('click', (e) => { if (e.target === modalHelp) modalHelp.classList.remove('show'); });

/* Basemap shortcut: 1 OSM, 2 Satellite, 3 Topo */
document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
    if (e.key === '1') { switchBasemap('osm'); document.querySelector('input[name="basemap"][value="osm"]').checked = true; }
    if (e.key === '2') { switchBasemap('satellite'); document.querySelector('input[name="basemap"][value="satellite"]').checked = true; }
    if (e.key === '3') { switchBasemap('topo'); document.querySelector('input[name="basemap"][value="topo"]').checked = true; }
});

/* ===========================
   INIT
=========================== */
// Setup filter options for zones
function renderZoneOptions() {
    const sel = document.getElementById('filterKel');
    sel.innerHTML = `<option value="ALL">Semua Zona</option>
        <option value="merah">🔴 Zona Sedang (1-1.5km)</option>
        <option value="kuning">🟡 Zona Rendah (1.5-3km)</option>
        <option value="hijau">🟢 Zona Aman (3-5km)</option>`;
}

// Language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.getAttribute('data-lang');
        applyLanguage();
    });
});

// Search autocomplete
const searchInput = document.getElementById('searchInput');
const searchAutocomplete = document.getElementById('searchAutocomplete');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
        searchAutocomplete.classList.remove('active');
        return;
    }

    // Helper function for search scoring (higher = better match)
    const scoreMatch = (name, query) => {
        const nameLower = name.toLowerCase();
        const queryLower = query.toLowerCase();
        if (nameLower === queryLower) return 100; // Exact match
        if (nameLower.startsWith(queryLower)) return 80; // Starts with
        if (nameLower.includes(queryLower)) return 60; // Contains
        // Word match
        const words = nameLower.split(/\s+/);
        for (const word of words) {
            if (word.startsWith(queryLower)) return 40;
        }
        return 0;
    };

    // Search in TPD
    const tpdResults = shelterDataAll
        .map(s => ({ ...s, score: scoreMatch(s.nama, query) }))
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    // Search in Wisata
    const wisataResults = wisataDataAll
        .map(w => ({ ...w, score: scoreMatch(w.nama, query) }))
        .filter(w => w.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    if (tpdResults.length === 0 && wisataResults.length === 0) {
        searchAutocomplete.classList.remove('active');
        return;
    }

    let html = '';

    if (tpdResults.length > 0) {
        html += '<div class="search-category">🏠 Tempat Pengungsian Darurat</div>';
        tpdResults.forEach(s => {
            const zoneConfig = SHELTER_ZONES[s.zone] || { color: '#6b7280', label: 'Unknown' };
            html += `<div class="search-item" data-type="tpd" data-id="${s.id}">
                <span class="search-item-icon" style="color:${zoneConfig.color}">●</span>
                <span class="search-item-name">${s.nama}</span>
                <span class="search-item-type">${zoneConfig.label}</span>
            </div>`;
        });
    }

    if (wisataResults.length > 0) {
        html += '<div class="search-category">🏖️ Tempat Wisata</div>';
        wisataResults.forEach(w => {
            html += `<div class="search-item" data-type="wisata" data-id="${w.id}">
                <span class="search-item-icon">🏖️</span>
                <span class="search-item-name">${w.nama}</span>
                <span class="search-item-type">Wisata</span>
            </div>`;
        });
    }

    searchAutocomplete.innerHTML = html;
    searchAutocomplete.classList.add('active');
});

searchAutocomplete.addEventListener('click', (e) => {
    const item = e.target.closest('.search-item');
    if (!item) return;

    const type = item.getAttribute('data-type');
    const id = item.getAttribute('data-id');

    if (type === 'tpd') {
        const s = shelterDataAll.find(x => String(x.id) === id);
        if (s) {
            map.setView([s.lat, s.lon], 15);
            document.getElementById('selectEvakuasi').value = s.id;
            setGoalById(s.id);
            toast('info', 'TPD dipilih', s.nama);
        }
    } else if (type === 'wisata') {
        const w = wisataDataAll.find(x => String(x.id) === id);
        if (w) {
            map.setView([w.lat, w.lon], 15);
            document.getElementById('inputLat').value = w.lat.toFixed(6);
            document.getElementById('inputLon').value = w.lon.toFixed(6);
            document.getElementById('selectWisata').value = w.id;
            setStart({ name: w.nama, lat: w.lat, lon: w.lon });
            toast('info', 'Wisata dipilih', w.nama);
        }
    }

    searchInput.value = '';
    searchAutocomplete.classList.remove('active');
});

// Close autocomplete when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
        searchAutocomplete.classList.remove('active');
    }
});

renderZoneOptions();
loadWisataData(); // Load wisata data from GeoJSON
loadKrbTsunami(); // Load KRB Tsunami layer
loadShelterData(); // Load shelter data from GeoJSON
syncLayers();

