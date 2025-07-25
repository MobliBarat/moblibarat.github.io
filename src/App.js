import React, { useState, useCallback } from 'react';

// Objekt, das Teamnamen ihren Logo-URLs zuordnet
const teamLogos = {
    // 1. Bundesliga Teams (basierend auf deinen Dateinamen und korrigierten Schlüsseln)
    'Augsburg': process.env.PUBLIC_URL + '/Logos/augsburg.png',
    'Bayern': process.env.PUBLIC_URL + '/Logos/bayern.png',
    'Bielefeld': process.env.PUBLIC_URL + '/Logos/bielefeld.png',
    'Bochum': process.env.PUBLIC_URL + '/Logos/bochum.png',
    'Dortmund': process.env.PUBLIC_URL + '/Logos/dortmund.png',
    'Frankfurt': process.env.PUBLIC_URL + '/Logos/frankfurt.png',
    'Freiburg': process.env.PUBLIC_URL + '/Logos/freiburg.png',
    'Fürth': process.env.PUBLIC_URL + '/Logos/fuerth.png',
    'Gladbach': process.env.PUBLIC_URL + '/Logos/gladbach.png',
    'Hoffenheim': process.env.PUBLIC_URL + '/Logos/hoffenheim.png',
    'Köln': process.env.PUBLIC_URL + '/Logos/koeln.png',
    'Leipzig': process.env.PUBLIC_URL + '/Logos/leipzig.png',
    'Leverkusen': process.env.PUBLIC_URL + '/Logos/leverkusen.png',
    'Mainz': process.env.PUBLIC_URL + '/Logos/mainz.png',
    'Schalke': process.env.PUBLIC_URL + '/Logos/schalke.png',
    'Stuttgart': process.env.PUBLIC_URL + '/Logos/stuttgart.png',
    'Union Berlin': process.env.PUBLIC_URL + '/Logos/union.png',
    'Werder': process.env.PUBLIC_URL + '/Logos/werder.png', // <-- Schlüssel ist 'Werder'
    'Wolfsburg': process.env.PUBLIC_URL + '/Logos/wolfsburg.png',
    'Heidenheim': process.env.PUBLIC_URL + '/Logos/heidenheim.png',
    'Darmstadt': process.env.PUBLIC_URL + '/Logos/darmstadt.png',
    'D.Dorf': process.env.PUBLIC_URL + '/Logos/ddorf.png',
    'fck': process.env.PUBLIC_URL + '/Logos/fck.png',

    // 2. Bundesliga Teams (basierend auf deinen Dateinamen)
    'Hertha': process.env.PUBLIC_URL + '/Logos/hertha.png',
    'HSV': process.env.PUBLIC_URL + '/Logos/hsv.png',
    'Düsseldorf': process.env.PUBLIC_URL + '/Logos/ddorf.png',
    'Hannover': process.env.PUBLIC_URL + '/Logos/hannover.png',
    'Nürnberg': process.env.PUBLIC_URL + '/Logos/nuernberg.png',
    'Kaiserslautern': process.env.PUBLIC_URL + '/Logos/fck.png',
    'Paderborn': process.env.PUBLIC_URL + '/Logos/paderborn.png',
    'Karlsruhe': process.env.PUBLIC_URL + '/Logos/ksc.png',
    'Kiel': process.env.PUBLIC_URL + '/Logos/kiel.png',
    'St. Pauli': process.env.PUBLIC_URL + '/Logos/pauli.png',
    'Braunschweig': process.env.PUBLIC_URL + '/Logos/braunschweig.png',
    'Elversberg': process.env.PUBLIC_URL + '/Logos/elversberg.png',
    'Dresden': process.env.PUBLIC_URL + '/Logos/dresden.png',
};

// Beispielhafte Liste von 1. Bundesliga Spielen (9 Spiele, 18 Teams)
const bundesliga1Games = [
    { id: 'b1-1', team1: 'Bayern', team2: 'Werder' }, // team2 ist 'Werder'
    { id: 'b1-2', team1: 'Dortmund', team2: 'Schalke' },
    { id: 'b1-3', team1: 'Leipzig', team2: 'Union Berlin' },
    { id: 'b1-4', team1: 'Leverkusen', team2: 'Frankfurt' },
    { id: 'b1-5', team1: 'Stuttgart', team2: 'Freiburg' },
    { id: 'b1-6', team1: 'Köln', team2: 'Gladbach' },
    { id: 'b1-7', team1: 'Wolfsburg', team2: 'Hoffenheim' },
    { id: 'b1-8', team1: 'Mainz', team2: 'Augsburg' },
    { id: 'b1-9', team1: 'Bochum', team2: 'Heidenheim' },
];

// Beispielhafte Liste von 2. Bundesliga Spielen (9 Spiele, 18 Teams)
const bundesliga2Games = [
    { id: 'b2-1', team1: 'Hertha', team2: 'HSV' },
    { id: 'b2-2', team1: 'Düsseldorf', team2: 'Hannover' },
    { id: 'b2-3', team1: 'Nürnberg', team2: 'Kaiserslautern' },
    { id: 'b2-4', team1: 'Paderborn', team2: 'Karlsruhe' },
    { id: 'b2-5', team1: 'Kiel', team2: 'St. Pauli' },
    { id: 'b2-6', team1: 'Braunschweig', team2: 'Osnabrück' },
    { id: 'b2-7', team1: 'Elversberg', team2: 'Wehen Wiesbaden' },
    { id: 'b2-8', team1: 'Ingolstadt', team2: 'Dresden' },
    { id: 'b2-9', team1: 'Mannheim', team2: 'Essen' },
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
                                        className="w-8 h-8 rounded-full ml-2"
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
