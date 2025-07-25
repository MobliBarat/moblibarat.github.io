import React, { useState, useCallback } from 'react';

// Objekt, das Teamnamen ihren Logo-URLs zuordnet
const teamLogos = {
   // 1. Bundesliga Teams (hypothetisch 2025/2026)
    'Augsburg': process.env.PUBLIC_URL + '/Logos/augsburg.png',
    'Bayern': process.env.PUBLIC_URL + '/Logos/bayern.png',
    'Dortmund': process.env.PUBLIC_URL + '/Logos/dortmund.png',
    'Eintracht Frankfurt': process.env.PUBLIC_URL + '/Logos/frankfurt.png',
    'Freiburg': process.env.PUBLIC_URL + '/Logos/freiburg.png',
    'Mönchengladbach': process.env.PUBLIC_URL + '/Logos/gladbach.png',
    'Heidenheim': process.env.PUBLIC_URL + '/Logos/heidenheim.png',
    'Hoffenheim': process.env.PUBLIC_URL + '/Logos/hoffenheim.png',
    'Köln': process.env.PUBLIC_URL + '/Logos/koeln.png',
    'RB Leipzig': process.env.PUBLIC_URL + '/Logos/leipzig.png',
    'Leverkusen': process.env.PUBLIC_URL + '/Logos/leverkusen.png',
    'Mainz': process.env.PUBLIC_URL + '/Logos/mainz.png',
    'VfB Stuttgart': process.env.PUBLIC_URL + '/Logos/stuttgart.png',
    'Union Berlin': process.env.PUBLIC_URL + '/Logos/union.png',
    'Werder Bremen': process.env.PUBLIC_URL + '/Logos/werder.png',
    'Wolfsburg': process.env.PUBLIC_URL + '/Logos/wolfsburg.png',
    'St. Pauli': process.env.PUBLIC_URL + '/Logos/pauli.png', // Aufsteiger
    'HSV': process.env.PUBLIC_URL + '/Logos/hsv.png',

    // 2. Bundesliga Teams (hypothetisch 2025/2026)
    'Braunschweig': process.env.PUBLIC_URL + '/Logos/braunschweig.png',
    'Düsseldorf': process.env.PUBLIC_URL + '/Logos/ddorf.png', // Fort.
    'Darmstadt 98': process.env.PUBLIC_URL + '/Logos/darmstadt.png', // Absteiger
    'Dynamo Dresden': process.env.PUBLIC_URL + '/Logos/dresden.png', // Aufsteiger 3. Liga
    'Elversberg': process.env.PUBLIC_URL + '/Logos/elversberg.png',
    'Hannover 96': process.env.PUBLIC_URL + '/Logos/hannover.png',
    'Hertha': process.env.PUBLIC_URL + '/Logos/hertha.png',
    'Karlsruhe': process.env.PUBLIC_URL + '/Logos/karlsruhe.png',
    '1. FC Kaiserslautern': process.env.PUBLIC_URL + '/Logos/fck.png', // Korrigiert: Schlüssel ist 'Kaiserslautern'
    'FC Nürnberg': process.env.PUBLIC_URL + '/Logos/nuernberg.png',
    'SC Paderborn': process.env.PUBLIC_URL + '/Logos/paderborn.png',
    'Preußen Münster': process.env.PUBLIC_URL + '/Logos/muenster.png', // Aufsteiger 3. Liga (Beispiel)
    'Schalke': process.env.PUBLIC_URL + '/Logos/schalke.png',
    'Bochum': process.env.PUBLIC_URL + '/Logos/bochum.png',
    'Holstein Kiel': process.env.PUBLIC_URL + '/Logos/kiel.png', // Aufsteiger
    'Arminia Bielefeld': process.env.PUBLIC_URL + '/Logos/arminia.png', 
    '1. FC Magdeburg': process.env.PUBLIC_URL + '/Logos/magdeburg.png',
    'Greuther Fürth': process.env.PUBLIC_URL + '/Logos/fuerth.png',
};

// Beispielhafte Liste von 1. Bundesliga Spielen (9 Spiele, 18 Teams)
const bundesliga1Games = [
    { id: 'b1-1', team1: 'Bayern', team2: 'RB Leipzig' }, // team2 ist 'Werder'
    { id: 'b1-2', team1: 'Leverkusen', team2: 'Hoffenheim' },
    { id: 'b1-3', team1: 'Union Berlin', team2: 'VfB Stuttgart' },
    { id: 'b1-4', team1: 'Freiburg', team2: 'Augsburg' },
    { id: 'b1-5', team1: 'Heidenheim', team2: 'Wolfsburg' },
    { id: 'b1-6', team1: 'Eintracht Frankfurt', team2: 'Werder Bremen' },
    { id: 'b1-7', team1: 'St. Pauli', team2: 'Dortmund' },
    { id: 'b1-8', team1: 'Mainz', team2: 'Köln' },
    { id: 'b1-9', team1: 'Mönchengladbach', team2: 'HSV' },
];

// Beispielhafte Liste von 2. Bundesliga Spielen (9 Spiele, 18 Teams)
const bundesliga2Games = [
    { id: 'b2-1', team1: 'Schalke', team2: 'Hertha' },
    { id: 'b2-2', team1: 'Darmstadt 98', team2: 'Bochum' },
    { id: 'b2-3', team1: 'SC Paderborn', team2: 'Holstein Kiel' },
    { id: 'b2-4', team1: 'Karlsruhe', team2: 'Preußen Münster' },
    { id: 'b2-5', team1: 'Elversberg', team2: 'FC Nürnberg' },
    { id: 'b2-6', team1: 'Arminia Bielefeld', team2: 'Düsseldorf' },
    { id: 'b2-7', team1: '1. FC Magdeburg', team2: 'Braunschweig' },
    { id: 'b2-8', team1: 'Greuther Fürth', team2: 'Dynamo Dresden' },
    { id: 'b2-9', team1: 'Hannover 96', team2: '1. FC Kaiserslautern' },
];

// Modal-Komponente für "Wetten geschlossen"
const BettingClosedModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Wetten geschlossen!</h2>
                <p className="text-lg text-gray-300 mb-6">
                    Die Wettannahme ist derzeit nicht möglich. Bitte versuche es später erneut.
                </p>
                {/* Kein Schließen-Button, da es ein nicht-schließbares Fenster sein soll */}
            </div>
        </div>
    );
};

const App = () => {
    // State zur Steuerung der aktuellen Ansicht
    const [viewState, setViewState] = useState('leagueSelection');

    // State für die Input-Felder, jetzt mit einem Objekt für Spieltipps
    const [inputValues, setInputValues] = useState({
        gameTips: {}, // Speichert Tipps für alle Spiele, z.B. { 'b1-1': '2:1', 'b1-2': '0:0' }
        email: '',
        pin: ''
    });

    // State für die ausgewählte Liga (als String, z.B. '1. Bundesliga')
    const [selectedLeagueName, setSelectedLeagueName] = useState(null);
    // State für die Spiele der ausgewählten Liga
    const [currentLeagueGames, setCurrentLeagueGames] = useState([]);

    // NEUER STATE FÜR DAS "WETTEN GESCHLOSSEN" MODAL
    // eslint-disable-next-line no-unused-vars
    const [showBettingClosedModal, setShowBettingClosedModal] = useState(false); // <-- HIER KANNST DU ES STEUERN

    // Funktion zum Senden der Daten an den Server
    const sendDataToServer = useCallback(async (data) => {
        try {
            const renderServerUrl = 'https://mein-gewinnspiel-server.onrender.com';
            const apiEndpoint = '/gewinn-nachricht';

            const response = await fetch(`${renderServerUrl}${apiEndpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Sende das gesamte Datenobjekt als JSON-String im 'nachricht'-Feld
                body: JSON.stringify({ nachricht: JSON.stringify(data) })
            });

            if (!response.ok) {
                console.error('Fehler beim Senden der Daten an den Server:', response.statusText);
                alert('Fehler beim Senden der Daten. Bitte versuche es erneut.');
            } else {
                alert('Daten erfolgreich gesendet!');
            }
        } catch (error) {
            console.error('Netzwerkfehler beim Senden der Daten:', error);
            alert('Netzwerkfehler. Bitte überprüfe deine Verbindung.');
        }
    }, []);

    // Handler für den Senden-Button
    const handleSubmit = useCallback(async () => {
        // Überprüfe zuerst, ob Wetten geschlossen sind
        if (showBettingClosedModal) {
            alert('Wetten sind derzeit geschlossen und können nicht abgegeben werden.');
            return;
        }

        const { gameTips, email, pin } = inputValues;

        // Grundlegende Validierung für E-Mail und PIN
        if (!email || !pin) {
            alert('Bitte fülle deine Social Media Name + Plattform und den PIN aus!');
            return;
        }

        // Validierung, ob alle Spieltipps ausgefüllt sind
        const allTipsFilled = currentLeagueGames.every(game => gameTips[game.id] && gameTips[game.id].trim() !== '');
        if (!allTipsFilled) {
            alert('Bitte tippe alle Spiele der ausgewählten Liga!');
            return;
        }

        // Sende alle gesammelten Daten an den Server
        await sendDataToServer({
            league: selectedLeagueName,
            gameTips: gameTips, // Sende das gesamte Objekt mit den Tipps
            email: email,
            pin: pin
        });

        // Input-Felder zurücksetzen und zur Liga-Auswahl zurückkehren
        setInputValues({ gameTips: {}, email: '', pin: '' });
        setSelectedLeagueName(null);
        setCurrentLeagueGames([]);
        setViewState('leagueSelection');
    }, [inputValues, sendDataToServer, selectedLeagueName, currentLeagueGames, showBettingClosedModal]); // showBettingClosedModal als Abhängigkeit hinzugefügt

    // Handler für die Auswahl einer Liga
    const handleLeagueSelect = useCallback((leagueName) => {
        // Überprüfe zuerst, ob Wetten geschlossen sind
        if (showBettingClosedModal) {
            alert('Wetten sind derzeit geschlossen und können nicht abgegeben werden.');
            return;
        }

        let gamesToSet = [];
        if (leagueName === '1. Bundesliga') {
            gamesToSet = bundesliga1Games;
        } else if (leagueName === '2. Bundesliga') {
            gamesToSet = bundesliga2Games;
        }
        
        setSelectedLeagueName(leagueName);
        setCurrentLeagueGames(gamesToSet);

        // Initialisiere gameTips für alle Spiele der ausgewählten Liga
        const initialGameTips = gamesToSet.reduce((acc, game) => {
            acc[game.id] = ''; // Leerer String für jeden Tipp
            return acc;
        }, {});

        setInputValues(prev => ({
            ...prev,
            gameTips: initialGameTips
        }));

        setViewState('inputForm'); // Gehe direkt zum Eingabeformular
    }, [showBettingClosedModal]); // showBettingClosedModal als Abhängigkeit hinzugefügt

    // Handler zum Aktualisieren eines spezifischen Spieltipps
    const handleGameTipChange = useCallback((gameId, tip) => {
        setInputValues(prev => ({
            ...prev,
            gameTips: {
                ...prev.gameTips,
                [gameId]: tip
            }
        }));
    }, []);

    // Handler zum Zurückkehren zur Liga-Auswahl
    const handleBackToLeagueSelection = useCallback(() => {
        setViewState('leagueSelection');
        setSelectedLeagueName(null);
        setCurrentLeagueGames([]);
        setInputValues({ gameTips: {}, email: '', pin: '' }); // Reset all inputs
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-inter relative overflow-hidden">

            {/* Das "Wetten geschlossen" Pop-up */}
            <BettingClosedModal isOpen={showBettingClosedModal} />

            {viewState === 'leagueSelection' && (
                <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Wähle eine Liga aus</h2>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => handleLeagueSelect('1. Bundesliga')}
                            className="league-card"
                            disabled={showBettingClosedModal} // Button deaktivieren, wenn Wetten geschlossen sind
                        >
                            <span className="text-2xl font-semibold">1. Bundesliga</span>
                        </button>
                        <button
                            onClick={() => handleLeagueSelect('2. Bundesliga')}
                            className="league-card"
                            disabled={showBettingClosedModal} // Button deaktivieren, wenn Wetten geschlossen sind
                        >
                            <span className="text-2xl font-semibold">2. Bundesliga</span>
                        </button>
                    </div>
                </div>
            )}

            {viewState === 'inputForm' && (
                <div className="rounded-xl p-8 shadow-2xl border border-gray-700 max-w-4xl w-full text-center"
                     style={{
                         background: 'linear-gradient(to bottom right, #4F46E5, #8B5CF6)',
                     }}>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Fußball Tippliga - {selectedLeagueName}
                    </h2>
                    
                    {/* Inputfelder für jeden Spieltipp - Alle untereinander */}
                    <div className="flex flex-col gap-4 mb-4">
                        {currentLeagueGames.map(game => (
                            <div key={game.id} className="flex flex-col items-center justify-center w-full">
                                {/* Teamlogos und Namen über dem Inputfeld */}
                                <div className="flex items-center justify-center w-full mb-2">
                                    {/* Logo für Team 1 */}
                                    <img
                                        src={teamLogos[game.team1]}
                                        alt={`${game.team1} Logo`}
                                        className="w-8 h-8 rounded-full mr-2"
                                        onError={(e) => {
                                            e.target.onerror = null; // Verhindert Endlosschleife bei Fehler
                                            e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" // Fallback-Bild
                                            console.error(`Fehler beim Laden von Logo für Team ${game.team1}. Angeforderte URL: ${teamLogos[game.team1]}`);
                                        }}
                                    />
                                    <span className="text-base font-semibold">{game.team1}</span>
                                    <span className="text-gray-400 mx-2"> vs </span>
                                    <span className="text-base font-semibold">{game.team2}</span>
                                    {/* Logo für Team 2 */}
                                    <img
                                        src={teamLogos[game.team2]}
                                        alt={`${game.team2} Logo`}
                                        className="w-12  h-12 rounded-full ml-2"
                                        onError={(e) => {
                                            e.target.onerror = null; // Verhindert Endlosschleife bei Fehler
                                            e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" // Fallback-Bild
                                            console.error(`Fehler beim Laden von Logo für Team ${game.team2}. Angeforderte URL: ${teamLogos[game.team2]}`);
                                        }}
                                    />
                                </div>
                                {/* Inputfeld */}
                                <input
                                    type="text"
                                    className="modal-input w-full"
                                    placeholder="Dein Tipp (z.B. 2:1)"
                                    value={inputValues.gameTips[game.id] || ''}
                                    onChange={(e) => handleGameTipChange(game.id, e.target.value)}
                                    id={game.id} // Add ID to input for consistent onChange handling
                                    disabled={showBettingClosedModal} // Inputfelder deaktivieren
                                />
                            </div>
                        ))}
                    </div>

                    {/* Allgemeine Inputfelder */}
                    <input
                        type="email"
                        className="modal-input w-full"
                        placeholder="Social Media Name + Plattform"
                        value={inputValues.email}
                        onChange={(e) => setInputValues(prev => ({ ...prev, email: e.target.value }))}
                        disabled={showBettingClosedModal} // Inputfelder deaktivieren
                    />
                    <input
                        type="password"
                        className="modal-input w-full"
                        placeholder="Ausgedachter PIN"
                        value={inputValues.pin}
                        onChange={(e) => setInputValues(prev => ({ ...prev, pin: e.target.value }))}
                        disabled={showBettingClosedModal} // Inputfelder deaktivieren
                    />
                    <button onClick={handleSubmit} className="btn btn-green w-full mt-4" disabled={showBettingClosedModal}>Senden</button>
                    <button
                        onClick={handleBackToLeagueSelection}
                        className="btn btn-back w-full mt-2"
                        disabled={showBettingClosedModal} // Button deaktivieren
                    >
                        Zurück zur Liga-Auswahl
                    </button>
                </div>
            )}

            {/* Globale Styles */}
            <style jsx="true">{`
                .btn {
                    padding: 1rem 2rem;
                    border-radius: 9999px;
                    font-weight: bold;
                    font-size: 1.25rem;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    cursor: pointer;
                    border: none;
                    outline: none;
                    position: relative;
                    overflow: hidden;
                    background-size: 200% auto;
                    color: white;
                }
                .btn:hover {
                    transform: scale(1.05);
                }
                .btn:disabled {
                    background-color: #4a5568; /* bg-gray-600 */
                    color: #a0aec0; /* text-gray-400 */
                    cursor: not-allowed;
                    transform: scale(1);
                    box-shadow: none;
                }
                .btn-green {
                    background-color: #16a34a;
                }
                .btn-green:hover {
                    background-color: #15803d;
                }
                .btn-back {
                    background-color: #4a5568; /* Grauer Button für Zurück */
                    color: #fff;
                }
                .btn-back:hover {
                    background-color: #6b7280;
                }
                .modal-input {
                    padding: 0.75rem;
                    border-radius: 0.375rem;
                    background-color: #4a5568;
                    color: #fff;
                    border: 1px solid #4a5568;
                    margin-bottom: 0.5rem; /* Adjusted for spacing between input and next game */
                    resize: vertical;
                }
                .modal-input:disabled {
                    background-color: #2d3748; /* Darker background for disabled input */
                    color: #9ca3af; /* Lighter text for disabled input */
                    cursor: not-allowed;
                }
                .league-card {
                    background-color: #4a5568; /* bg-gray-700 */
                    padding: 1.5rem;
                    border-radius: 0.75rem; /* rounded-lg */
                    border: 1px solid #6b7280; /* border-gray-600 */
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    display: flex; /* Flexbox für Zentrierung */
                    align-items: center; /* Vertikale Zentrierung */
                    justify-content: center; /* Horizontale Zentrierung */
                    min-height: 100px; /* Mindesthöhe für die Karten */
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .league-card:hover {
                    background-color: #6b7280; /* hover:bg-gray-600 */
                    transform: translateY(-3px);
                    box-shadow: 0 6px 10px rgba(0,0,0,0.2);
                }
                .league-card:disabled {
                    background-color: #2d3748; /* Darker background for disabled card */
                    color: #9ca3af; /* Lighter text for disabled card */
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
};

export default App;
