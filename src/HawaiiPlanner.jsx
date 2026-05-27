import { useState, useEffect, useCallback, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const INITIAL_DATA = {
  packingList: [
    {
      id: "docs", label: "📄 Documents & Money", items: [
        { id: "p1", text: "Passports / IDs for all adults", checked: false, bag: "carry-on" },
        { id: "p2", text: "Birth certificates (children)", checked: false, bag: "carry-on" },
        { id: "p3", text: "Travel insurance documents", checked: false, bag: "carry-on" },
        { id: "p4", text: "Credit / debit cards", checked: false, bag: "carry-on" },
        { id: "p5", text: "Cash (small bills for tips)", checked: false, bag: "carry-on" },
        { id: "p6", text: "Hotel & rental car confirmations (printed)", checked: false, bag: "carry-on" },
        { id: "p7", text: "Activity booking confirmations", checked: false, bag: "carry-on" },
      ]
    },
    {
      id: "clothing-adult", label: "👗 Adult Clothing", items: [
        { id: "ca1", text: "Swimsuits (3–4 per adult)", checked: false, bag: "checked" },
        { id: "ca2", text: "Rashguards / UV swim shirts", checked: false, bag: "checked" },
        { id: "ca3", text: "Casual sundresses / shorts (14–18 outfits)", checked: false, bag: "checked" },
        { id: "ca4", text: "Light layers / cardigan for AC", checked: false, bag: "checked" },
        { id: "ca5", text: "One nicer dinner outfit per adult", checked: false, bag: "checked" },
        { id: "ca6", text: "Workout / hiking clothes (2 sets)", checked: false, bag: "checked" },
        { id: "ca7", text: "Pajamas (3 sets)", checked: false, bag: "checked" },
        { id: "ca8", text: "Underwear (21 days + extra)", checked: false, bag: "checked" },
        { id: "ca9", text: "Socks (light, 7 pairs)", checked: false, bag: "checked" },
        { id: "ca10", text: "Wide-brim sun hat per adult", checked: false, bag: "checked" },
      ]
    },
    {
      id: "clothing-kids", label: "👶 Kids Clothing", items: [
        { id: "ck1", text: "4yo: Swimsuits (4)", checked: false, bag: "checked" },
        { id: "ck2", text: "4yo: Rashguard (2)", checked: false, bag: "checked" },
        { id: "ck3", text: "4yo: Casual outfits (14+)", checked: false, bag: "checked" },
        { id: "ck4", text: "4yo: Light hoodie / sweater", checked: false, bag: "checked" },
        { id: "ck5", text: "4yo: PJs (4 sets)", checked: false, bag: "checked" },
        { id: "ck6", text: "4yo: Sun hat", checked: false, bag: "checked" },
        { id: "ck7", text: "4yo: Underwear (20+)", checked: false, bag: "checked" },
        { id: "ck8", text: "Baby: Onesies (14)", checked: false, bag: "checked" },
        { id: "ck9", text: "Baby: Footie PJs (5)", checked: false, bag: "checked" },
        { id: "ck10", text: "Baby: Baby sun hat + neck shade", checked: false, bag: "checked" },
        { id: "ck11", text: "Baby: Light sleep sack", checked: false, bag: "checked" },
        { id: "ck12", text: "Baby: Swim diaper cover / swim suit", checked: false, bag: "checked" },
        { id: "ck13", text: "Baby: Extra outfit changes (bag of 5 spares)", checked: false, bag: "carry-on" },
      ]
    },
    {
      id: "shoes", label: "👟 Footwear", items: [
        { id: "sh1", text: "Adult: Reef flip flops / sandals", checked: false, bag: "checked" },
        { id: "sh2", text: "Adult: Water shoes / Tevas", checked: false, bag: "checked" },
        { id: "sh3", text: "Adult: Comfortable walking sneakers", checked: false, bag: "checked" },
        { id: "sh4", text: "4yo: Sandals / Crocs", checked: false, bag: "checked" },
        { id: "sh5", text: "4yo: Sneakers", checked: false, bag: "checked" },
        { id: "sh6", text: "Baby: Soft-sole shoes (2 pairs)", checked: false, bag: "checked" },
      ]
    },
    {
      id: "beach", label: "🏖 Beach & Water Gear", items: [
        { id: "bw1", text: "Beach bag (large, mesh-bottom)", checked: false, bag: "checked" },
        { id: "bw2", text: "Quick-dry beach towels (4)", checked: false, bag: "checked" },
        { id: "bw3", text: "Pop-up beach tent / UPF shade shelter", checked: false, bag: "checked" },
        { id: "bw4", text: "Snorkel set (adult × 2) — or rent there", checked: false, bag: "checked" },
        { id: "bw5", text: "Kids snorkel set (4yo)", checked: false, bag: "checked" },
        { id: "bw6", text: "Swim vests / puddle jumper (4yo)", checked: false, bag: "checked" },
        { id: "bw7", text: "Baby float / inflatable ring", checked: false, bag: "checked" },
        { id: "bw8", text: "Sand toys (shovel, bucket, molds)", checked: false, bag: "checked" },
        { id: "bw9", text: "Waterproof phone pouch", checked: false, bag: "checked" },
        { id: "bw10", text: "Dry bags for gear", checked: false, bag: "checked" },
        { id: "bw11", text: "Underwater camera or GoPro", checked: false, bag: "checked" },
      ]
    },
    {
      id: "sunscreen", label: "☀️ Sun & Skin Protection", items: [
        { id: "ss1", text: "Reef-safe mineral sunscreen SPF 50+ (adults)", checked: false, bag: "checked" },
        { id: "ss2", text: "Reef-safe mineral sunscreen SPF 50+ (kids)", checked: false, bag: "checked" },
        { id: "ss3", text: "Baby sunscreen SPF 50 (6mo+ mineral)", checked: false, bag: "checked" },
        { id: "ss4", text: "Aloe vera gel (post-sun soothing)", checked: false, bag: "checked" },
        { id: "ss5", text: "UV-protective sun shirt (backup)", checked: false, bag: "checked" },
        { id: "ss6", text: "Sunglasses (adults × 2 + 4yo)", checked: false, bag: "carry-on" },
      ]
    },
    {
      id: "baby-gear", label: "🍼 Baby Gear & Essentials", items: [
        { id: "bg1", text: "Baby carrier / Ergobaby", checked: false, bag: "carry-on" },
        { id: "bg2", text: "Lightweight stroller / Babyzen YOYO", checked: false, bag: "gate-check" },
        { id: "bg3", text: "Pack-n-Play / travel crib (or request from hotel)", checked: false, bag: "checked" },
        { id: "bg4", text: "Baby monitor (if needed)", checked: false, bag: "checked" },
        { id: "bg5", text: "Diapers — enough for 1st day + flight", checked: false, bag: "carry-on" },
        { id: "bg6", text: "Wipes (2 travel packs in carry-on)", checked: false, bag: "carry-on" },
        { id: "bg7", text: "Diaper bag (stocked for flight)", checked: false, bag: "carry-on" },
        { id: "bg8", text: "Portable changing pad", checked: false, bag: "carry-on" },
        { id: "bg9", text: "Formula / solid food pouches for flight", checked: false, bag: "carry-on" },
        { id: "bg10", text: "Baby bottles (2) + cleaning brush", checked: false, bag: "carry-on" },
        { id: "bg11", text: "White noise machine / app", checked: false, bag: "carry-on" },
        { id: "bg12", text: "Blackout curtain (portable, suction)", checked: false, bag: "checked" },
        { id: "bg13", text: "Baby food — pouches (week 1 supply)", checked: false, bag: "checked" },
        { id: "bg14", text: "Bib (5)", checked: false, bag: "checked" },
        { id: "bg15", text: "Baby spoons (3)", checked: false, bag: "checked" },
      ]
    },
    {
      id: "toddler", label: "🧸 Toddler Essentials", items: [
        { id: "td1", text: "Backpack for 4yo (child's own carry-on)", checked: false, bag: "carry-on" },
        { id: "td2", text: "Favorite lovey / stuffed animal", checked: false, bag: "carry-on" },
        { id: "td3", text: "Tablet loaded with offline shows & games", checked: false, bag: "carry-on" },
        { id: "td4", text: "Headphones (kids volume-limited)", checked: false, bag: "carry-on" },
        { id: "td5", text: "Activity book / crayons / sticker book", checked: false, bag: "carry-on" },
        { id: "td6", text: "Snacks for airport & flight", checked: false, bag: "carry-on" },
        { id: "td7", text: "Car seat (FAA-approved for flight)", checked: false, bag: "gate-check" },
        { id: "td8", text: "Portable potty / travel potty seat", checked: false, bag: "checked" },
        { id: "td9", text: "Night light (small, plug-in)", checked: false, bag: "checked" },
      ]
    },
    {
      id: "health", label: "💊 Health, Safety & First Aid", items: [
        { id: "h1", text: "Prescription medications (30-day supply +)", checked: false, bag: "carry-on" },
        { id: "h2", text: "Children's Tylenol + Motrin", checked: false, bag: "carry-on" },
        { id: "h3", text: "Baby Tylenol / Motrin (weight-based dose)", checked: false, bag: "carry-on" },
        { id: "h4", text: "Adult Tylenol / Advil", checked: false, bag: "carry-on" },
        { id: "h5", text: "Antihistamine (Benadryl / Zyrtec — kids + adult)", checked: false, bag: "carry-on" },
        { id: "h6", text: "Hydrocortisone cream", checked: false, bag: "checked" },
        { id: "h7", text: "Neosporin / antibiotic ointment", checked: false, bag: "checked" },
        { id: "h8", text: "Band-aids (assorted)", checked: false, bag: "checked" },
        { id: "h9", text: "Digital thermometer", checked: false, bag: "checked" },
        { id: "h10", text: "Dramamine Kids (if boat tours planned)", checked: false, bag: "checked" },
        { id: "h11", text: "Bug spray (DEET-free kids formula)", checked: false, bag: "checked" },
        { id: "h12", text: "EpiPen (if applicable)", checked: false, bag: "carry-on" },
        { id: "h13", text: "Oral rehydration packets (for sickness)", checked: false, bag: "checked" },
      ]
    },
    {
      id: "toiletries", label: "🧴 Toiletries", items: [
        { id: "t1", text: "Shampoo / conditioner (travel sizes)", checked: false, bag: "checked" },
        { id: "t2", text: "Baby shampoo / body wash", checked: false, bag: "checked" },
        { id: "t3", text: "Body wash / soap", checked: false, bag: "checked" },
        { id: "t4", text: "Toothbrushes + toothpaste (all 4)", checked: false, bag: "checked" },
        { id: "t5", text: "Deodorant", checked: false, bag: "checked" },
        { id: "t6", text: "Hairbrush / comb", checked: false, bag: "checked" },
        { id: "t7", text: "Hair ties", checked: false, bag: "checked" },
        { id: "t8", text: "Moisturizer / lotion", checked: false, bag: "checked" },
        { id: "t9", text: "Razor + shaving cream", checked: false, bag: "checked" },
        { id: "t10", text: "Feminine hygiene products", checked: false, bag: "checked" },
        { id: "t11", text: "Nail clippers (baby + adult)", checked: false, bag: "checked" },
        { id: "t12", text: "Cotton swabs", checked: false, bag: "checked" },
      ]
    },
    {
      id: "tech", label: "💻 Tech & Electronics", items: [
        { id: "te1", text: "Phones + chargers (2)", checked: false, bag: "carry-on" },
        { id: "te2", text: "Tablet + charger", checked: false, bag: "carry-on" },
        { id: "te3", text: "Camera + extra batteries / charger", checked: false, bag: "carry-on" },
        { id: "te4", text: "Universal power adapter / international plug", checked: false, bag: "checked" },
        { id: "te5", text: "Portable battery pack", checked: false, bag: "carry-on" },
        { id: "te6", text: "Memory cards (extra)", checked: false, bag: "carry-on" },
        { id: "te7", text: "Earbuds / AirPods (2 sets)", checked: false, bag: "carry-on" },
        { id: "te8", text: "Laptop (if needed)", checked: false, bag: "carry-on" },
      ]
    },
    {
      id: "misc", label: "🎒 Miscellaneous", items: [
        { id: "m1", text: "Reusable water bottles (1 per person)", checked: false, bag: "carry-on" },
        { id: "m2", text: "Ziplock bags (gallon + sandwich)", checked: false, bag: "checked" },
        { id: "m3", text: "Laundry detergent pods (for mid-trip wash)", checked: false, bag: "checked" },
        { id: "m4", text: "Small day backpack for hikes", checked: false, bag: "checked" },
        { id: "m5", text: "Collapsible cooler bag", checked: false, bag: "checked" },
        { id: "m6", text: "Neck pillows + eye masks (adults, flight)", checked: false, bag: "carry-on" },
        { id: "m7", text: "Travel umbrella (Maui can have rain showers)", checked: false, bag: "checked" },
        { id: "m8", text: "Dry erase markers (for hotel fun)", checked: false, bag: "checked" },
        { id: "m9", text: "Safety outlet covers", checked: false, bag: "checked" },
      ]
    },
  ],

  shoppingBefore: [
    { id: "sb1", text: "Reef-safe mineral sunscreen (stock up — pricier in Hawaii)", checked: false, note: "" },
    { id: "sb2", text: "Diapers for full trip (Amazon Subscribe & Ship to hotel)", checked: false, note: "" },
    { id: "sb3", text: "Baby wipes (bulk box)", checked: false, note: "" },
    { id: "sb4", text: "Baby food pouches (2-week supply)", checked: false, note: "" },
    { id: "sb5", text: "Portable beach shade / pop-up tent", checked: false, note: "" },
    { id: "sb6", text: "Swim vests / puddle jumper for 4yo", checked: false, note: "" },
    { id: "sb7", text: "Kids snorkel set", checked: false, note: "" },
    { id: "sb8", text: "Waterproof phone pouch", checked: false, note: "" },
    { id: "sb9", text: "Sand-free beach blanket", checked: false, note: "" },
    { id: "sb10", text: "Travel white noise machine", checked: false, note: "" },
    { id: "sb11", text: "Portable suction blackout curtain", checked: false, note: "" },
    { id: "sb12", text: "Kids volume-limiting headphones", checked: false, note: "" },
    { id: "sb13", text: "Quick-dry beach towels (3–4)", checked: false, note: "" },
    { id: "sb14", text: "Laundry pods (travel-size)", checked: false, note: "" },
    { id: "sb15", text: "New sticker / activity book for 4yo", checked: false, note: "" },
  ],

  shoppingThere: [
    { id: "st1", text: "Fresh pineapple & local fruit (Safeway / farmers market)", checked: false, note: "" },
    { id: "st2", text: "Groceries: breakfast foods, snacks, drinks", checked: false, note: "" },
    { id: "st3", text: "Local Hawaiian snacks & treats (Spam musubi!)", checked: false, note: "" },
    { id: "st4", text: "Extra diapers & wipes if needed (Target / Walmart)", checked: false, note: "" },
    { id: "st5", text: "Manapua (local treats) for the kids", checked: false, note: "" },
    { id: "st6", text: "Shave ice ingredients if condo has kitchen", checked: false, note: "" },
    { id: "st7", text: "Tide Pods / laundry detergent if needed", checked: false, note: "" },
    { id: "st8", text: "Aloe vera gel (keep stocked)", checked: false, note: "" },
    { id: "st9", text: "Bug spray refill if running low", checked: false, note: "" },
    { id: "st10", text: "Disposable waterproof wristbands (for toddler ID)", checked: false, note: "" },
  ],

  tasksHome: [
    { id: "th1", text: "Change sheets on all beds before leaving", checked: false, note: "So you come home to clean sheets!" },
    { id: "th2", text: "Clear out fridge / eat perishables", checked: false, note: "" },
    { id: "th3", text: "Take out all trash + recycling", checked: false, note: "" },
    { id: "th4", text: "Set Nest/Ecobee to Away / vacation mode", checked: false, note: "" },
    { id: "th5", text: "Unplug small appliances (toaster, coffee maker)", checked: false, note: "" },
    { id: "th6", text: "Set lights on timers / smart home away mode", checked: false, note: "" },
    { id: "th7", text: "Hold mail at USPS (usps.com)", checked: false, note: "" },
    { id: "th8", text: "Alert neighbors / ask someone to watch house", checked: false, note: "" },
    { id: "th9", text: "Water plants or arrange for someone to water", checked: false, note: "" },
    { id: "th10", text: "Lock all windows and doors (double-check)", checked: false, note: "" },
    { id: "th11", text: "Turn off main water valve (optional but smart)", checked: false, note: "" },
    { id: "th12", text: "Empty dishwasher + run final load", checked: false, note: "" },
    { id: "th13", text: "Leave emergency contact info with neighbor", checked: false, note: "" },
    { id: "th14", text: "Pet care arranged / drop off pets", checked: false, note: "" },
    { id: "th15", text: "Set alarm system / check cameras are on", checked: false, note: "" },
  ],

  tasksPreTravel: [
    { id: "pt1", text: "Book / confirm airport ride (Uber / Lyft / car service)", checked: false, note: "Book night before!" },
    { id: "pt2", text: "Get haircut (both adults)", checked: false, note: "2–3 weeks before departure" },
    { id: "pt3", text: "Return library books", checked: false, note: "" },
    { id: "pt4", text: "Pick up prescriptions", checked: false, note: "Get 30+ day supply" },
    { id: "pt5", text: "Notify bank / credit cards of travel dates", checked: false, note: "Avoid fraud holds" },
    { id: "pt6", text: "Download offline maps (Google Maps, AllTrails)", checked: false, note: "" },
    { id: "pt7", text: "Download shows / movies for kids' tablet", checked: false, note: "" },
    { id: "pt8", text: "Charge all devices night before", checked: false, note: "" },
    { id: "pt9", text: "Print / save boarding passes", checked: false, note: "" },
    { id: "pt10", text: "Check in online (24 hrs before)", checked: false, note: "" },
    { id: "pt11", text: "Confirm rental car reservation", checked: false, note: "" },
    { id: "pt12", text: "Confirm hotel / VRBO check-in details", checked: false, note: "" },
    { id: "pt13", text: "Book whale watching / snorkel tour", checked: false, note: "Books up fast!" },
    { id: "pt14", text: "Book luau in advance", checked: false, note: "Old Lahaina, Chiefs Luau — sell out weeks ahead" },
    { id: "pt15", text: "Get travel insurance (if not done)", checked: false, note: "" },
    { id: "pt16", text: "Buy travel-size toiletries for carry-on", checked: false, note: "Under 3.4oz TSA rule" },
    { id: "pt17", text: "Weigh luggage (50lb limit per checked bag)", checked: false, note: "" },
    { id: "pt18", text: "Arrange child care for departure day (if early flight)", checked: false, note: "" },
    { id: "pt19", text: "Set up auto-reply on work email", checked: false, note: "" },
    { id: "pt20", text: "Research baby-friendly restaurants at destination", checked: false, note: "" },
  ],
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

const BAG_COLORS = {
  "carry-on": { bg: "#e0f2fe", text: "#0369a1", label: "Carry-on" },
  "checked": { bg: "#fef3c7", text: "#92400e", label: "Checked" },
  "gate-check": { bg: "#f3e8ff", text: "#6b21a8", label: "Gate Check" },
  "none": { bg: "#f1f5f9", text: "#475569", label: "No bag" },
};

const TABS = [
  { id: "packing", label: "🧳 Packing", icon: "🧳" },
  { id: "shopping", label: "🛒 Shopping", icon: "🛒" },
  { id: "tasks", label: "✅ Tasks", icon: "✅" },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function HawaiiPlanner() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("packing");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [editingNote, setEditingNote] = useState(null); // { section, id }
  const [noteText, setNoteText] = useState("");
  const [newItems, setNewItems] = useState({}); // { sectionId: "" }
  const [packFilter, setPackFilter] = useState("all"); // all, carry-on, checked, gate-check, unchecked
  const [expandedSections, setExpandedSections] = useState({});
  const saveTimer = useRef(null);
  const noteRef = useRef(null);

  // ── LOAD ──
  useEffect(() => {
    async function load() {
      try {
        const res = await window.storage.get("hawaii-planner-v2", true);
        if (res?.value) {
          setData(JSON.parse(res.value));
        } else {
          setData(INITIAL_DATA);
        }
      } catch {
        setData(INITIAL_DATA);
      }
      setLoading(false);
    }
    load();
    // Poll for updates every 15 seconds (collaboration)
    const interval = setInterval(async () => {
      try {
        const res = await window.storage.get("hawaii-planner-v2", true);
        if (res?.value) {
          const remote = JSON.parse(res.value);
          setData(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(remote)) return remote;
            return prev;
          });
        }
      } catch {}
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ── SAVE ──
  const save = useCallback(async (newData) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      try {
        await window.storage.set("hawaii-planner-v2", JSON.stringify(newData), true);
        setLastSaved(new Date());
      } catch {}
      setSaving(false);
    }, 800);
  }, []);

  const update = useCallback((updater) => {
    setData(prev => {
      const next = updater(prev);
      save(next);
      return next;
    });
  }, [save]);

  // ── TOGGLE PACKING ITEM ──
  const togglePack = (catId, itemId) => {
    update(prev => ({
      ...prev,
      packingList: prev.packingList.map(cat =>
        cat.id === catId
          ? { ...cat, items: cat.items.map(it => it.id === itemId ? { ...it, checked: !it.checked } : it) }
          : cat
      )
    }));
  };

  const setBag = (catId, itemId, bag) => {
    update(prev => ({
      ...prev,
      packingList: prev.packingList.map(cat =>
        cat.id === catId
          ? { ...cat, items: cat.items.map(it => it.id === itemId ? { ...it, bag } : it) }
          : cat
      )
    }));
  };

  // ── TOGGLE SIMPLE LISTS ──
  const toggleSimple = (section, id) => {
    update(prev => ({
      ...prev,
      [section]: prev[section].map(it => it.id === id ? { ...it, checked: !it.checked } : it)
    }));
  };

  // ── NOTES ──
  const openNote = (section, id, currentNote) => {
    setEditingNote({ section, id });
    setNoteText(currentNote || "");
    setTimeout(() => noteRef.current?.focus(), 50);
  };

  const saveNote = () => {
    if (!editingNote) return;
    const { section, id } = editingNote;
    if (section === "packing") {
      update(prev => ({
        ...prev,
        packingList: prev.packingList.map(cat => ({
          ...cat,
          items: cat.items.map(it => it.id === id ? { ...it, note: noteText } : it)
        }))
      }));
    } else {
      update(prev => ({
        ...prev,
        [section]: prev[section].map(it => it.id === id ? { ...it, note: noteText } : it)
      }));
    }
    setEditingNote(null);
  };

  // ── ADD ITEM ──
  const addItem = (sectionId, isPackingCat = false) => {
    const text = (newItems[sectionId] || "").trim();
    if (!text) return;
    const id = sectionId + "_" + Date.now();
    if (isPackingCat) {
      update(prev => ({
        ...prev,
        packingList: prev.packingList.map(cat =>
          cat.id === sectionId
            ? { ...cat, items: [...cat.items, { id, text, checked: false, bag: "checked" }] }
            : cat
        )
      }));
    } else {
      update(prev => ({
        ...prev,
        [sectionId]: [...prev[sectionId], { id, text, checked: false, note: "" }]
      }));
    }
    setNewItems(prev => ({ ...prev, [sectionId]: "" }));
  };

  // ── DELETE ITEM ──
  const deleteItem = (section, id, isPackingCat = false) => {
    if (isPackingCat) {
      update(prev => ({
        ...prev,
        packingList: prev.packingList.map(cat =>
          cat.id === section
            ? { ...cat, items: cat.items.filter(it => it.id !== id) }
            : cat
        )
      }));
    } else {
      update(prev => ({
        ...prev,
        [section]: prev[section].filter(it => it.id !== id)
      }));
    }
  };

  // ── PROGRESS ──
  const progress = (items) => {
    const total = items.length;
    const done = items.filter(i => i.checked).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const allPackItems = data ? data.packingList.flatMap(c => c.items) : [];
  const allShopItems = data ? [...(data.shoppingBefore || []), ...(data.shoppingThere || [])] : [];
  const allTaskItems = data ? [...(data.tasksHome || []), ...(data.tasksPreTravel || [])] : [];

  const toggleSection = (id) => setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  const isSectionOpen = (id) => !(id in expandedSections) || expandedSections[id];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0f2b4a", color: "#7dd3fc", fontFamily: "Georgia, serif", fontSize: 22 }}>
      Loading your Hawaii planner… 🌺
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2b4a 0%, #1a4a6b 40%, #0d3b55 100%)", fontFamily: "'Georgia', serif", color: "#e2f0fb" }}>
      {/* Note Modal */}
      {editingNote && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: 17, color: "#0f2b4a", marginBottom: 12 }}>📝 Add a Note</div>
            <textarea
              ref={noteRef}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1.5px solid #cbd5e1", fontFamily: "Georgia, serif", fontSize: 14, color: "#1e293b", resize: "vertical", boxSizing: "border-box" }}
              placeholder="Add a note, reminder, or detail…"
            />
            <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setEditingNote(null)} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", fontFamily: "Georgia, serif", color: "#475569" }}>Cancel</button>
              <button onClick={saveNote} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#0ea5e9", color: "#fff", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold" }}>Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "28px 20px 0", textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#7dd3fc", textTransform: "uppercase", marginBottom: 6 }}>Family Trip Planner</div>
        <h1 style={{ margin: 0, fontSize: "clamp(28px, 6vw, 46px)", fontWeight: "normal", color: "#fff", letterSpacing: -1, lineHeight: 1.1 }}>
          🌺 Hawai'i
        </h1>
        <div style={{ marginTop: 6, color: "#93c5fd", fontSize: 14 }}>3 Weeks · 2 Adults · 1 Toddler (4) · 1 Baby (8mo)</div>

        {/* Global Progress */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
          {[
            { label: "Packing", ...progress(allPackItems), color: "#38bdf8" },
            { label: "Shopping", ...progress(allShopItems), color: "#34d399" },
            { label: "Tasks", ...progress(allTaskItems), color: "#f59e0b" },
          ].map(p => (
            <div key={p.label} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 20, fontWeight: "bold", color: p.color }}>{p.pct}%</div>
              <div style={{ fontSize: 11, color: "#93c5fd", letterSpacing: 1 }}>{p.label}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{p.done}/{p.total}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, fontSize: 12, color: saving ? "#fbbf24" : "#4ade80", transition: "color 0.3s" }}>
          {saving ? "⏳ Saving…" : lastSaved ? `✓ Synced ${lastSaved.toLocaleTimeString()}` : "🔗 Shared — edits sync across devices"}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, margin: "20px 16px 0", background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 4 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "clamp(11px, 2.5vw, 14px)",
            background: activeTab === t.id ? "#0ea5e9" : "transparent",
            color: activeTab === t.id ? "#fff" : "#93c5fd",
            fontWeight: activeTab === t.id ? "bold" : "normal",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "16px 12px 60px" }}>

        {/* ── PACKING TAB ── */}
        {activeTab === "packing" && (
          <div>
            {/* Bag filter */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {["all", "carry-on", "checked", "gate-check", "unchecked"].map(f => (
                <button key={f} onClick={() => setPackFilter(f)} style={{
                  padding: "5px 12px", borderRadius: 20, border: "1.5px solid",
                  borderColor: packFilter === f ? "#38bdf8" : "rgba(255,255,255,0.15)",
                  background: packFilter === f ? "rgba(56,189,248,0.15)" : "transparent",
                  color: packFilter === f ? "#38bdf8" : "#93c5fd",
                  fontSize: 12, cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.15s",
                  textTransform: f === "all" ? "none" : "capitalize"
                }}>{f === "all" ? "All" : f === "unchecked" ? "Unpacked" : f}</button>
              ))}
            </div>

            {data.packingList.map(cat => {
              const filtered = packFilter === "all" ? cat.items
                : packFilter === "unchecked" ? cat.items.filter(i => !i.checked)
                : cat.items.filter(i => i.bag === packFilter);
              if (filtered.length === 0) return null;
              const p = progress(cat.items);
              const open = isSectionOpen(cat.id);
              return (
                <Section
                  key={cat.id}
                  title={cat.label}
                  progress={p}
                  open={open}
                  onToggle={() => toggleSection(cat.id)}
                  onAdd={() => addItem(cat.id, true)}
                  addValue={newItems[cat.id] || ""}
                  onAddChange={v => setNewItems(prev => ({ ...prev, [cat.id]: v }))}
                  addPlaceholder="Add packing item…"
                >
                  {filtered.map(item => (
                    <PackItem
                      key={item.id}
                      item={item}
                      onToggle={() => togglePack(cat.id, item.id)}
                      onBag={bag => setBag(cat.id, item.id, bag)}
                      onNote={() => openNote("packing", item.id, item.note)}
                      onDelete={() => deleteItem(cat.id, item.id, true)}
                    />
                  ))}
                </Section>
              );
            })}
          </div>
        )}

        {/* ── SHOPPING TAB ── */}
        {activeTab === "shopping" && (
          <div>
            <ShoppingSection
              title="🛍 Buy Before You Go"
              subtitle="Stock up — these are cheaper or essential pre-departure"
              items={data.shoppingBefore}
              section="shoppingBefore"
              onToggle={(id) => toggleSimple("shoppingBefore", id)}
              onNote={(id, note) => openNote("shoppingBefore", id, note)}
              onDelete={(id) => deleteItem("shoppingBefore", id)}
              onAdd={() => addItem("shoppingBefore")}
              addValue={newItems["shoppingBefore"] || ""}
              onAddChange={v => setNewItems(prev => ({ ...prev, shoppingBefore: v }))}
            />
            <ShoppingSection
              title="🥥 Buy When You Arrive"
              subtitle="Stock up at Costco, Safeway, or local markets in Hawaii"
              items={data.shoppingThere}
              section="shoppingThere"
              onToggle={(id) => toggleSimple("shoppingThere", id)}
              onNote={(id, note) => openNote("shoppingThere", id, note)}
              onDelete={(id) => deleteItem("shoppingThere", id)}
              onAdd={() => addItem("shoppingThere")}
              addValue={newItems["shoppingThere"] || ""}
              onAddChange={v => setNewItems(prev => ({ ...prev, shoppingThere: v }))}
            />
          </div>
        )}

        {/* ── TASKS TAB ── */}
        {activeTab === "tasks" && (
          <div>
            <TaskSection
              title="🏠 Before You Leave Home"
              subtitle="Day-of and day-before home prep tasks"
              items={data.tasksHome}
              onToggle={(id) => toggleSimple("tasksHome", id)}
              onNote={(id, note) => openNote("tasksHome", id, note)}
              onDelete={(id) => deleteItem("tasksHome", id)}
              onAdd={() => addItem("tasksHome")}
              addValue={newItems["tasksHome"] || ""}
              onAddChange={v => setNewItems(prev => ({ ...prev, tasksHome: v }))}
            />
            <TaskSection
              title="📋 Pre-Travel To-Dos"
              subtitle="Schedule, book, and prep in the weeks before departure"
              items={data.tasksPreTravel}
              onToggle={(id) => toggleSimple("tasksPreTravel", id)}
              onNote={(id, note) => openNote("tasksPreTravel", id, note)}
              onDelete={(id) => deleteItem("tasksPreTravel", id)}
              onAdd={() => addItem("tasksPreTravel")}
              addValue={newItems["tasksPreTravel"] || ""}
              onAddChange={v => setNewItems(prev => ({ ...prev, tasksPreTravel: v }))}
            />
          </div>
        )}

      </div>
    </div>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function Section({ title, progress, open, onToggle, onAdd, addValue, onAddChange, addPlaceholder, children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", padding: "13px 14px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: 15, color: "#e2f0fb" }}>{title}</div>
          <div style={{ marginTop: 5, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress.pct}%`, background: progress.pct === 100 ? "#4ade80" : "#38bdf8", borderRadius: 4, transition: "width 0.4s" }} />
          </div>
        </div>
        <div style={{ marginLeft: 12, textAlign: "right" }}>
          <div style={{ fontSize: 12, color: progress.pct === 100 ? "#4ade80" : "#7dd3fc" }}>{progress.done}/{progress.total}</div>
          <div style={{ fontSize: 18, color: "#93c5fd" }}>{open ? "▲" : "▼"}</div>
        </div>
      </div>
      {open && (
        <div style={{ paddingBottom: 10 }}>
          {children}
          <div style={{ display: "flex", gap: 8, padding: "8px 14px 2px" }}>
            <input
              value={addValue}
              onChange={e => onAddChange(e.target.value)}
              onKeyDown={e => e.key === "Enter" && onAdd()}
              placeholder={addPlaceholder}
              style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "#e2f0fb", fontFamily: "Georgia, serif", fontSize: 13 }}
            />
            <button onClick={onAdd} style={{ padding: "7px 14px", borderRadius: 8, background: "#0ea5e9", border: "none", color: "#fff", fontFamily: "Georgia, serif", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}>+ Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PackItem({ item, onToggle, onBag, onNote, onDelete }) {
  const [showBag, setShowBag] = useState(false);
  const bagInfo = BAG_COLORS[item.bag] || BAG_COLORS["none"];
  return (
    <div style={{ padding: "7px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", gap: 10 }}>
      <button onClick={onToggle} style={{ marginTop: 2, width: 20, height: 20, borderRadius: 6, border: `2px solid ${item.checked ? "#4ade80" : "rgba(255,255,255,0.25)"}`, background: item.checked ? "#4ade80" : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {item.checked && <span style={{ color: "#14532d", fontSize: 13, fontWeight: "bold" }}>✓</span>}
      </button>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: item.checked ? "#64748b" : "#e2f0fb", textDecoration: item.checked ? "line-through" : "none", lineHeight: 1.4 }}>{item.text}</div>
        {item.note && <div style={{ fontSize: 12, color: "#fbbf24", marginTop: 2, fontStyle: "italic" }}>📝 {item.note}</div>}
        <div style={{ marginTop: 5, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => setShowBag(!showBag)} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: bagInfo.bg, color: bagInfo.text, border: "none", cursor: "pointer", fontFamily: "Georgia, serif" }}>{bagInfo.label}</button>
          {showBag && Object.entries(BAG_COLORS).map(([k, v]) => k !== item.bag && (
            <button key={k} onClick={() => { onBag(k); setShowBag(false); }} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: v.bg, color: v.text, border: "1.5px dashed " + v.text, cursor: "pointer", fontFamily: "Georgia, serif" }}>{v.label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
        <button onClick={onNote} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: item.note ? "#fbbf24" : "#64748b", padding: "2px 4px" }} title="Add note">📝</button>
        <button onClick={onDelete} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "2px 4px" }} title="Delete">✕</button>
      </div>
    </div>
  );
}

function ShoppingSection({ title, subtitle, items, section, onToggle, onNote, onDelete, onAdd, addValue, onAddChange }) {
  const p = { done: items.filter(i => i.checked).length, total: items.length };
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ padding: "13px 14px 8px" }}>
        <div style={{ fontWeight: "bold", fontSize: 15, color: "#e2f0fb" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#7dd3fc", marginBottom: 8 }}>{subtitle}</div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${p.total ? Math.round(p.done / p.total * 100) : 0}%`, background: "#34d399", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
      </div>
      {items.map(item => (
        <div key={item.id} style={{ padding: "7px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <button onClick={() => onToggle(item.id)} style={{ marginTop: 2, width: 20, height: 20, borderRadius: 6, border: `2px solid ${item.checked ? "#4ade80" : "rgba(255,255,255,0.25)"}`, background: item.checked ? "#4ade80" : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            {item.checked && <span style={{ color: "#14532d", fontSize: 13, fontWeight: "bold" }}>✓</span>}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: item.checked ? "#64748b" : "#e2f0fb", textDecoration: item.checked ? "line-through" : "none" }}>{item.text}</div>
            {item.note && <div style={{ fontSize: 12, color: "#fbbf24", marginTop: 2, fontStyle: "italic" }}>📝 {item.note}</div>}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => onNote(item.id, item.note)} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: item.note ? "#fbbf24" : "#64748b", padding: "2px 4px" }}>📝</button>
            <button onClick={() => onDelete(item.id)} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "2px 4px" }}>✕</button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px" }}>
        <input value={addValue} onChange={e => onAddChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onAdd()} placeholder="Add shopping item…" style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "#e2f0fb", fontFamily: "Georgia, serif", fontSize: 13 }} />
        <button onClick={onAdd} style={{ padding: "7px 14px", borderRadius: 8, background: "#34d399", border: "none", color: "#fff", fontFamily: "Georgia, serif", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}>+ Add</button>
      </div>
    </div>
  );
}

function TaskSection({ title, subtitle, items, onToggle, onNote, onDelete, onAdd, addValue, onAddChange }) {
  const p = { done: items.filter(i => i.checked).length, total: items.length };
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ padding: "13px 14px 8px" }}>
        <div style={{ fontWeight: "bold", fontSize: 15, color: "#e2f0fb" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#7dd3fc", marginBottom: 8 }}>{subtitle}</div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", marginBottom: 2 }}>
          <div style={{ height: "100%", width: `${p.total ? Math.round(p.done / p.total * 100) : 0}%`, background: "#f59e0b", borderRadius: 4, transition: "width 0.4s" }} />
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 6 }}>{p.done}/{p.total} complete</div>
      </div>
      {items.map(item => (
        <div key={item.id} style={{ padding: "8px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <button onClick={() => onToggle(item.id)} style={{ marginTop: 2, width: 20, height: 20, borderRadius: 6, border: `2px solid ${item.checked ? "#4ade80" : "rgba(255,255,255,0.25)"}`, background: item.checked ? "#4ade80" : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            {item.checked && <span style={{ color: "#14532d", fontSize: 13, fontWeight: "bold" }}>✓</span>}
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: item.checked ? "#64748b" : "#e2f0fb", textDecoration: item.checked ? "line-through" : "none" }}>{item.text}</div>
            {item.note && <div style={{ fontSize: 12, color: "#fbbf24", marginTop: 2, fontStyle: "italic" }}>💡 {item.note}</div>}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => onNote(item.id, item.note)} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: item.note ? "#fbbf24" : "#64748b", padding: "2px 4px" }}>📝</button>
            <button onClick={() => onDelete(item.id)} style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "2px 4px" }}>✕</button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px" }}>
        <input value={addValue} onChange={e => onAddChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onAdd()} placeholder="Add task…" style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "#e2f0fb", fontFamily: "Georgia, serif", fontSize: 13 }} />
        <button onClick={onAdd} style={{ padding: "7px 14px", borderRadius: 8, background: "#f59e0b", border: "none", color: "#fff", fontFamily: "Georgia, serif", fontWeight: "bold", cursor: "pointer", fontSize: 13 }}>+ Add</button>
      </div>
    </div>
  );
}
