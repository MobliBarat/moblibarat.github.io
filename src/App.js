import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the skins with their rarity and a placeholder image
// New Rarity Tiers and Weights (approximate percentages for a total sum of ~98450):
// Rare (Dark Blue): ~70% (3300 weight per skin * 21 skins = 69300)
// Mythic (Purple): ~20% (1300 weight per skin * 15 skins = 19500)
// Legendary (Pink): ~7% (750 weight per skin * 9 skins = 6750)
// Ancient (Red): ~2.5% (400 weight per skin * 6 skins = 2400)
// Special Item (Gold): ~0.5% (500 weight per skin * 1 skin = 500)
// Total sum of weights for calculation: 98450
const skins = [
  // Rare (Dark Blue) - 21 skins
  { name: 'Dual Berettas | Hideout', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=Dual+Berettas' },
  { name: 'Nova | Dark Sigil', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=Nova' },
  { name: 'MAC-10 | Light Box', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=MAC-10' },
  { name: 'UMP-45 | Motorized', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=UMP-45' },
  { name: 'XM1014 | Irezumi', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=XM1014' },
  { name: 'SSG 08 | Dezastre', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=SSG+08' },
  { name: 'Tec-9 | Slag', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=Tec-9' },
  { name: 'Desert Eagle | Calligraffiti', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=Deagle' },
  { name: 'SCAR-20 | Trail Blazer', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=SCAR-20' },
  { name: 'R8 Revolver | Tango', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=R8+Revolver' },
  { name: 'USP-S | 27', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=USP-S' },
  { name: 'AUG | Luxe Trim', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=AUG' },
  { name: 'MP5-SD | Statics', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=MP5-SD' },
  { name: 'M249 | Hypnosis', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=M249' },
  { name: 'Usp-S | PC-GRN', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=USP-S' },
  { name: 'M4A4| Choppa', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=M4A4' },
  { name: 'SSG 08 | Memorial', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=SSG+08' },
  { name: 'Mp9 | Nexus', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=MP9' },
  { name: 'P2000 | Sure Grip', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=P2000' },
  { name: 'XM1014 | Mockingbird', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=XM1014' },
  { name: 'MAG-7| Resupply', rarity: 'Rare', weight: 3300, image: 'https://placehold.co/150x100/225588/FFFFFF?text=MAG-7' },

  // Mythic (Purple) - 15 skins
  { name: 'Glock-18 | Block-18', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Glock-18' },
  { name: 'Sawed-Off | Analog input', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Sawed-Off' },
  { name: 'M4A4 | Etch Lord', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=M4A4' },
  { name: 'MP7 | Just Smile', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=MP7' },
  { name: 'Five-SeveN | Hybrid', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Five-SeveN' },
  { name: 'SSG 08 | Rapid Transit', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=SSG+08' },
  { name: 'MAC-10 | Saiba Oni', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=MAC-10' },
  { name: 'Dual Berettas | Hydro Strike', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Dual+Berettas' },
  { name: 'M4A4 | Turbine', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=M4A4' },
  { name: 'P90 | Randy Rush', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=P90' },
  { name: 'Desert Eagle | Serpent Strike', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Deagle' },
  { name: 'Zeus x27 | Tosai', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Zeus' },
  { name: 'Galil AR | Control', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Galil+AR' },
  { name: 'P90 | Wave Breaker', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=P90' },
  { name: 'Nova | Rising Sun', rarity: 'Mythic', weight: 1300, image: 'https://placehold.co/150x100/800080/FFFFFF?text=Nova' },

  // Legendary (Pink) - 9 skins
  { name: 'M4A1-S | Black Lotus', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=M4A1-S' },
  { name: 'Zeus x27 | Olympus', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=Zeus' },
  { name: 'USP-S | Jawbreaker', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=USP-S' },
  { name: 'Ak-47 | The Outsiders', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=AK-47' },
  { name: 'P250 | Epicenter', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=P250' },
  { name: 'UMP-45 | Neo-Noir', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=UMP-45' },
  { name: 'Glock-18| Shinobu', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=Glock-18' },
  { name: 'Ak-47 | Searing Rage', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=AK-47' },
  { name: 'UMP-45 | K.O Factory', rarity: 'Legendary', weight: 750, image: 'https://placehold.co/150x100/FF69B4/FFFFFF?text=UMP-45' },

  // Ancient (Red) - 6 skins
  { name: 'AK-47 | Inheritance', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=AK-47' },
  { name: 'AWP | Chrome Cannon', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=AWP' },
  { name: 'M4A1-S | Vaporwave', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=M4A1-S' },
  { name: 'Glock-18 | Gold Toof', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=Glock-18' },
  { name: 'AWP | Printstream', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=AWP' },
  { name: 'FAMAS | Bad Trip', rarity: 'Ancient', weight: 400, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=FAMAS' },

  // Special Item (Gold) - 1 skin (previously Mythic)
  { name: 'Karambit | Fade', rarity: 'Special Item', weight: 500, image: 'https://placehold.co/150x100/FFD700/000000?text=GoldBox' },
];

// Define possible conditions for skins
const conditions = ['Fabrikneu', 'Minimale Gebrauchsspuren', 'Einsatzerprobt', 'Abgenutzt', 'Kampfspuren'];

// Helper function to get rarity color
const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'Rare': return 'text-blue-600'; // Dark Blue
    case 'Mythic': return 'text-purple-600'; // Purple
    case 'Legendary': return 'text-pink-500'; // Pink
    case 'Ancient': return 'text-red-600'; // Red
    case 'Special Item': return 'text-yellow-400'; // Gold
    default: return 'text-white';
  }
};

// Helper function to get condition color (optional, for visual distinction)
const getConditionColor = (condition) => {
  switch (condition) {
    case 'Fabrikneu': return 'text-green-400';
    case 'Minimale Gebrauchsspuren': return 'text-lime-400';
    case 'Einsatzerprobt': return 'text-yellow-400';
    case 'Abgenutzt': return 'text-orange-400';
    case 'Kampfspuren': return 'text-red-400';
    default: return 'text-gray-300';
  }
};

// Helper function to get the coin value of a skin based on rarity and condition
const getSkinValue = (rarity, condition) => {
  const conditionValues = {
    'Fabrikneu': 5,
    'Minimale Gebrauchsspuren': 4,
    'Einsatzerprobt': 3,
    'Abgenutzt': 2,
    'Kampfspuren': 1,
  };

  const baseValues = {
    'Rare': 1,
    'Mythic': 6,
    'Legendary': 14,
    'Ancient': 29,
    'Special Item': 100, // Highest value for the Gold item
  };

  const base = baseValues[rarity] || 0;
  const conditionOffset = conditionValues[condition] || 0;

  return base + conditionOffset;
};


// Input Field Modal Component
const InputFieldModal = ({ isOpen, onClose, onConfirm, inputValue, setInputValue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Nachricht für Skin-Gewinn</h2>
        <p className="text-lg text-gray-300 mb-6">
          Gib hier deine Nachricht für den gewonnenen Skin ein:
        </p>
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          rows="4"
          placeholder="Deine Nachricht..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Bestätigen
          </button>
        </div>
      </div>
    </div>
  );
};

// Announcement Modal Component
const AnnouncementModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-lg text-gray-300 mb-6 text-left">
          {content.split('\n').map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [spinning, setSpinning] = useState(false);
  const [winningSkin, setWinningSkin] = useState(null);
  const [displaySkins, setDisplaySkins] = useState([]);
  const [translateX, setTranslateX] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [collectedKeysCount, setCollectedKeysCount] = useState(0); // State for collected keys count
  // eslint-disable-next-line no-unused-vars
  const [coins, setCoins] = useState(0); // State for total coins (logic remains, but no visual display)
  const [showInputField, setShowInputField] = useState(false); // State for input field modal visibility
  const [inputValue, setInputValue] = useState(''); // State for input field value
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(true); // State for announcement modal visibility, true to show on load

  const spinnerRef = useRef(null);
  const itemWidth = 158; // Width of each item (150px image + 2*4px margin = 158px)
  const spinDuration = 3000; // 3 seconds in milliseconds
  const preRollCount = 250; // Number of skins before the winning one for better accuracy

  // Funktion zum Hinzufügen von Münzen (Logik bleibt, aber keine visuelle Anzeige)
  // eslint-disable-next-line no-unused-vars
  const addCoins = useCallback((amount) => {
    setCoins(prevCoins => prevCoins + amount);
  }, []); // Leeres Abhängigkeits-Array bedeutet, dass diese Funktion einmal erstellt wird

  // Funktion zur Auswahl einer zufälligen Bedingung
  const pickRandomCondition = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * conditions.length);
    return conditions[randomIndex];
  }, []);

  // Funktion zur Auswahl eines zufälligen Skins basierend auf Gewichten und Zuweisung einer zufälligen Bedingung
  const pickRandomSkin = useCallback(() => {
    const weightedSkins = [];
    skins.forEach(skin => {
      for (let i = 0; i < skin.weight; i++) {
        weightedSkins.push(skin);
      }
    });
    const randomIndex = Math.floor(Math.random() * weightedSkins.length);
    const chosenSkin = weightedSkins[randomIndex];
    return { ...chosenSkin, condition: pickRandomCondition() }; // Bedingung hier zuweisen
  }, [pickRandomCondition]);

  // Funktion zum Starten der Spin-Animation
  const startSpin = () => {
    setSpinning(false);
    setWinningSkin(null); // Vorherigen Gewinner-Skin für neue Animation löschen

    const chosenWinningSkin = pickRandomSkin();
    setWinningSkin(chosenWinningSkin);

    const postRollCount = 100;
    const generatedPreRollSkins = Array.from({ length: preRollCount }, () => pickRandomSkin());
    const generatedPostRollSkins = Array.from({ length: postRollCount }, () => pickRandomSkin());

    const fullSpinSkins = [
      ...generatedPreRollSkins,
      chosenWinningSkin,
      ...generatedPostRollSkins
    ];
    setDisplaySkins(fullSpinSkins);

    const initialResetPosition = 0;
    setTranslateX(initialResetPosition);

    setTimeout(() => {
      setSpinning(true);
      const containerWidth = spinnerRef.current ? spinnerRef.current.offsetWidth : 0;
      const targetIndex = preRollCount;
      const finalTranslateX = (containerWidth / 2) - (targetIndex * itemWidth + itemWidth / 2);
      setTranslateX(finalTranslateX);

      setTimeout(() => {
        setSpinning(false);
        if (chosenWinningSkin) {
          const value = getSkinValue(chosenWinningSkin.rarity, chosenWinningSkin.condition);
          addCoins(value); // Münzen für den gezogenen Skin hinzufügen
          console.log(`Gewonnen: ${chosenWinningSkin.name} (${chosenWinningSkin.condition}) - Wert: ${value} Münzen`);

          // Wenn der Gewinner-Skin die 'Karambit | Fade' (jetzt Gold Box) ist, Eingabefeld anzeigen
          if (chosenWinningSkin.name === 'Karambit | Fade') {
            setShowInputField(true); // Eingabefeld-Modal anzeigen
          }
        }
      }, spinDuration);

    }, 50);
  };

  // Handler für den "Kiste Öffnen" Button (startet jetzt direkt den Spin)
  const handleOpenCaseButtonClick = () => {
    if (collectedKeysCount > 0) {
      setCollectedKeysCount(prevCount => prevCount - 1); // Schlüssel abziehen
      startSpin(); // Spin direkt starten
    }
  };

  // Handler zum Bestätigen der Eingabe aus dem Modal (sendet Nachricht an den Server)
  const handleConfirmInput = async () => {
    console.log("Eingabe bestätigt:", inputValue);

    try {
      // Die URL deines Render-Servers, gefolgt vom Endpunkt
      const renderServerUrl = 'https://mein-gewinnspiel-server.onrender.com'; // Dies ist die Basis-URL deines Render-Services
      const apiEndpoint = '/gewinn-nachricht'; // Dies ist der Endpunkt, den dein Node.js-Server bereitstellt

      const response = await fetch(`${renderServerUrl}${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nachricht: inputValue }), // 'message' zu 'nachricht' geändert
      });

      if (response.ok) {
        console.log('Nachricht erfolgreich an den Server gesendet!');
      } else {
        console.error('Fehler beim Senden der Nachricht an den Server:', response.statusText);
      }
    } catch (error) {
      console.error('Netzwerkfehler beim Senden der Nachricht:', error);
    }

    setInputValue('');
    setShowInputField(false); // Eingabefeld-Modal schließen
    // Hier wird kein Spin ausgelöst, wie vom Benutzer gewünscht
  };

  // Handler zum Abbrechen der Eingabe aus dem Modal
  const handleCancelInput = () => {
    setInputValue('');
    setShowInputField(false);
  };

  // Funktion zum Hinzufügen von 15 Schlüsseln
  const addFifteenKeys = () => {
    setCollectedKeysCount(prevCount => prevCount + 15);
  };

  // Effekt zur automatischen Schlüsselgewinnung durch kreisförmige Animation alle 30 Sekunden
  useEffect(() => {
    const autoKeyGainInterval = setInterval(() => {
      setCollectedKeysCount(prevCount => prevCount + 1);
    }, 30000); // 1 Schlüssel alle 30 Sekunden gewinnen

    return () => clearInterval(autoKeyGainInterval); // Bereinigung beim Unmount der Komponente
  }, []);


  // Effekt zur Behandlung des Übergangsendes (nicht zwingend notwendig für die Funktionalität mit der neuen Logik)
  useEffect(() => {
    const spinnerElement = spinnerRef.current;
    if (!spinnerElement) return;

    const handleTransitionEnd = () => {
      if (!spinning && winningSkin) {
        // Der Spin ist gestoppt, und der Gewinner wird enthüllt.
        // Keine separate UI, Animation wird direkt angewendet.
      }
    };

    spinnerElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      spinnerElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [spinning, winningSkin]);

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-inter relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/cs2-dust-2-map-4k-gaming-x603f07297z30k5w.jpg')`,
        backgroundSize: 'cover', // Stellt sicher, dass das Bild den gesamten Bereich abdeckt
        backgroundPosition: 'center', // Zentriert das Bild
        backgroundRepeat: 'no-repeat', // Verhindert Wiederholung
      }}
    >
      {/* Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Ankündigungs-Modal */}
      <AnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        title="Wichtige Ankündigung!"
        content="Willkommen zum Kistenöffner!
        
        Wir haben einige spannende Updates für euch vorbereitet:
        
        - Neue Skins und verbesserte Drop-Chancen!
        - Tägliche Boni für treue Spieler!
        - Performance-Verbesserungen für ein reibungsloses Erlebnis.
        
        Viel Spaß beim Öffnen der Kisten und viel Glück!"
      />

      {/* AdSense Banner Ad Placeholder (Oben) */}
      {/* Der AdSense-Script-Tag sollte direkt in public/index.html im <head>-Bereich platziert werden. */}
      {/* Die Ad-Unit-Divs können dann direkt dort platziert werden, wo die Anzeige erscheinen soll. */}
      {/* Beispiel für einen AdSense-Banner-Div, der direkt im JSX platziert werden könnte, wenn das Script in index.html ist: */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
             <div className="adsbygoogle"
                  style={{ display: 'inline-block', width: '728px', height: '90px' }}
                  data-ad-client="ca-pub-YOUR_ADSENSE_PUBLISHER_ID"
                  data-ad-slot="YOUR_ADSENSE_AD_SLOT_ID_BANNER">
             </div>
           </div> */}

      {/* Animierter Kreis mit Schlüsselzähler */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center z-10">
        {/* Der statische Kreis-Pfad */}
        <div className="animated-circle-path"></div>
        {/* Die rotierende Kugel */}
        <div className="animated-ball"></div>
        {/* Schlüsselzähler in der Mitte */}
        <div className="absolute text-5xl font-bold text-yellow-300 z-10">
          {collectedKeysCount}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 w-full max-w-4xl z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-full h-40 overflow-hidden rounded-lg border-2 border-blue-500 bg-gray-700">
            {/* Zeiger für das Gewinnobjekt */}
            <div className="absolute inset-y-0 left-1/2 -ml-0.5 w-1 bg-red-500 z-20 transform -translate-x-1/2"></div>
            <div className="absolute inset-y-0 left-1/2 -ml-2 w-4 h-full bg-red-500 opacity-20 z-10 transform -translate-x-1/2"></div>


            {/* Spinner-Track */}
            <div
              ref={spinnerRef}
              className={`flex items-center h-full whitespace-nowrap will-change-transform`}
              style={{
                transform: `translateX(${translateX}px)`,
                // Übergang nur anwenden, wenn sich dreht, sonst 'none' für sofortiges Zurücksetzen
                transition: spinning ? `transform ${spinDuration}ms ease-out` : 'none',
              }}
            >
              {displaySkins.map((skin, index) => (
                <div
                  key={index} // Index als Schlüssel ist hier in Ordnung, da die Liste bei jedem Spin neu generiert wird
                  className="inline-block flex-shrink-0 w-[150px] h-[100px] bg-gray-600 m-1 rounded-md shadow-md flex flex-col items-center justify-center p-2 border border-gray-500"
                >
                  <img
                    src={skin.image}
                    alt={skin.name}
                    // Animation nur anwenden, wenn sich nicht dreht UND dies der Gewinner-Skin am Zielindex ist
                    className={`w-24 h-16 object-cover rounded-sm mb-1
                                ${!spinning && index === preRollCount ? 'animate-win-scale' : ''}
                              `}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x100/333333/FFFFFF?text=${skin.name.split(' ')[0]}`; }}
                  />
                  <p className={`text-xs font-semibold truncate w-full text-center ${getRarityColor(skin.rarity)}`}>
                    {skin.name}
                  </p>
                  {/* Bedingung anzeigen */}
                  <p className={`text-xs ${getConditionColor(skin.condition)}`}>
                    {skin.condition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons unter dem Spinner / Eingabefeld */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center justify-center gap-4 w-full">
            {/* New +15 Keys Button */}
            <button
              onClick={addFifteenKeys}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              🔑 +15 Schlüssel
            </button>

            <button
              onClick={handleOpenCaseButtonClick} // Startet jetzt direkt den Spin
              disabled={collectedKeysCount === 0}
              className={`px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 ease-in-out
                ${collectedKeysCount === 0
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg transform hover:scale-105'
                }
                focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50
              `}
            >
              {collectedKeysCount === 0 ? 'Keine Schlüssel' : 'Kiste Öffnen'}
            </button>
          </div>
        </div>
      </div>

      {/* Input Field Modal */}
      <InputFieldModal
        isOpen={showInputField}
        onClose={handleCancelInput} // Abbrechen-Button schließt
        onConfirm={handleConfirmInput} // Bestätigen-Button sendet Nachricht an den Server
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      {/* AdSense In-Article Ad Placeholder (Unten) */}
      {/* Ersetze data-ad-client und data-ad-slot durch deine echten AdSense-Werte */}
      <div className="mt-8 w-full max-w-4xl bg-gray-700 flex items-center justify-center p-4 rounded-lg shadow-md z-10">
        <p className="text-gray-400 text-xl font-bold">In-Article Ad Placeholder (Responsive)</p>
        {/* <div className="adsbygoogle"
             style={{ display: 'block', width: '100%', height: '280px' }} // Beispielgröße, AdSense passt an
             data-ad-client="ca-pub-YOUR_ADSENSE_PUBLISHER_ID"
             data-ad-slot="YOUR_ADSENSE_AD_SLOT_ID_IN_ARTICLE"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </div> */}
      </div>

      {/* Der Style-Block bleibt hier, da er spezifische Animationen enthält, die mit React-Komponenten interagieren. */}
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        /* Custom gold color for Special Item rarity */
        .text-yellow-400 {
          color: #FFD700; /* Gold color */
        }

        /* Winning skin scale animation */
        @keyframes win-scale {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(2.5); opacity: 1; } /* Increased scale to 2.5 */
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-win-scale {
          animation: win-scale 0.8s ease-out forwards;
        }

        /* New Circular Animation */
        .animated-circle-path {
          position: absolute;
          width: 150px; /* Size of the circle */
          height: 150px;
          border-radius: 50%;
          border: 2px solid rgba(0, 255, 255, 0.5); /* Cyan border */
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.7), inset 0 0 10px rgba(0, 255, 255, 0.3); /* Glow */
          /* This will be centered by the parent's flexbox */
        }

        .animated-ball {
          position: absolute;
          width: 25px; /* Size of the rotating ball */
          height: 25px;
          background: linear-gradient(45deg, #00FFFF, #00BFFF); /* Cyan to DeepSkyBlue gradient */
          border-radius: 50%;
          box-shadow: 0 0 15px #00FFFF, 0 0 25px #00FFFF; /* Stronger glow for the ball */
          /* Position the ball at the center of its parent, then apply transformations */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); /* Center the ball itself */
          transform-origin: 50% 50%; /* Set the rotation origin to the center of the element itself */
          animation: orbit 30s linear infinite; /* Changed from 10s to 30s */
        }

        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(-90deg) translateX(75px); } /* Start at 12 o'clock */
          to { transform: translate(-50%, -50%) rotate(270deg) translateX(75px); } /* End at 12 o'clock (full circle) */
        }
        `}
      </style>
    </div>
  );
};

export default App;
