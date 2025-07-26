import React, { useState, useCallback } from 'react';

// Objekt, das Teamnamen ihren Logo-URLs zuordnet
// Die Schlüssel wurden an die gängigen, kürzeren Teamnamen angepasst,
// die in den Spiel-Arrays verwendet werden.
// Die Dateipfade wurden geprüft und korrigiert, um den tatsächlichen Dateinamen zu entsprechen.
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

// Ranglisten-Modal
const LeaderboardModal = ({ isOpen, onClose, leaderboardData, teamLogos }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-2xl w-full text-center relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold text-white mb-6">🏆 Rangliste 🏆</h2>
                
                {leaderboardData.map((gameEntry, gameIndex) => (
                    <div key={gameEntry.gameId} className="mb-8 p-4 bg-gray-700 rounded-lg shadow-inner">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
                            {/* Logos für das Spiel im Header */}
                            <img
                                src={teamLogos[gameEntry.team1]}
                                alt={`${gameEntry.team1} Logo`}
                                className="w-8 h-8 rounded-full mr-2"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                            />
                            {gameEntry.team1} vs {gameEntry.team2}
                            <img
                                src={teamLogos[gameEntry.team2]}
                                alt={`${gameEntry.team2} Logo`}
                                className="w-8 h-8 rounded-full ml-2"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                            />
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-500 text-gray-200 uppercase text-sm leading-normal">
                                        <th className="py-2 px-4 text-left">Platz</th>
                                        <th className="py-2 px-4 text-left">Name</th>
                                        <th className="py-2 px-4 text-right">Punkte</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 text-sm font-light">
                                    {gameEntry.players.map((player, playerIndex) => (
                                        <tr key={playerIndex} className="border-b border-gray-500 hover:bg-gray-500">
                                            <td className="py-2 px-4 text-left whitespace-nowrap">
                                                <span className="font-bold">{player.rank}.</span>
                                            </td>
                                            <td className="py-2 px-4 text-left">
                                                <span>{player.name}</span>
                                            </td>
                                            <td className="py-2 px-4 text-right">
                                                <span>{player.score}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-md mt-6"
                >
                    Schließen
                </button>
            </div>
        </div>
    );
};


const App = () => {
    // State zur Steuerung der aktuellen Ansicht: 'leagueSelection', 'gameSelection', 'inputForm'
    const [viewState, setViewState] = useState('leagueSelection');

    // State für die Input-Felder, jetzt mit einem Objekt für Spieltipps
    const [inputValues, setInputValues] = useState({
        gameTips: {}, // Speichert Tipps für alle Spiele, z.B. { 'b1-1': { score: '2:1', team1Half1Goal: true, ... } }
        email: '',
        pin: ''
    });

    // State für die ausgewählte Liga (als String, z.B. '1. Bundesliga')
    const [selectedLeagueName, setSelectedLeagueName] = useState(null);
    // State für die Spiele der ausgewählten Liga (alle Spiele der 1. Bundesliga)
    const [currentLeagueGames, setCurrentLeagueGames] = useState([]);
    // Speichert das spezifisch ausgewählte Spiel für den Tipp
    const [selectedGame, setSelectedGame] = useState(null);

    // NEUER STATE FÜR DAS "WETTEN GESCHLOSSEN" MODAL
    const [showBettingClosedModal, setShowBettingClosedModal] = useState(false); // <-- HIER KANNST DU ES STEUERN

    // Sichtbarkeit des Ranglisten-Modals
    const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

    // Rangliste (manuell konfigurierbar pro Spiel)
    const initialLeaderboardData = useCallback(() => {
        return bundesliga1Games.map(game => ({
            gameId: game.id,
            team1: game.team1,
            team2: game.team2,
            players: [
                { rank: 1, name: `Spieler ${game.id.split('-')[1]}A`, score: Math.floor(Math.random() * 500) + 1000 },
                { rank: 2, name: `Spieler ${game.id.split('-')[1]}B`, score: Math.floor(Math.random() * 500) + 500 },
                { rank: 3, name: `Spieler ${game.id.split('-')[1]}C`, score: Math.floor(Math.random() * 500) + 100 },
            ]
        }));
    }, []);

    const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);


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
        if (showBettingClosedModal) {
            alert('Wetten sind derzeit geschlossen und können nicht abgegeben werden.');
            return;
        }

        const { gameTips, email, pin } = inputValues;
        const currentGameTip = gameTips[selectedGame.id] || {};

        if (!email || !pin) {
            alert('Bitte fülle deine Social Media Name + Plattform und den PIN aus!');
            return;
        }

        // Grundlegende Validierung für das Spielergebnis
        if (!currentGameTip.score || currentGameTip.score.trim() === '') {
            alert('Bitte gib das Spielergebnis ein!');
            return;
        }

        // Überprüfe, ob alle Ja/Nein-Felder ausgefüllt sind
        const requiredFields = [
            'team1Half1Goal', 'team2Half1Goal', 'team1Half2Goal', 'team2Half2Goal',
            'team1Half1Yellow', 'team2Half1Yellow', 'team1Half2Yellow', 'team2Half2Yellow',
            'team1RedCard', 'team2RedCard', 'moreThan2GoalsHalf1'
        ];
        const allYesNoFilled = requiredFields.every(field => typeof currentGameTip[field] === 'boolean');

        if (!allYesNoFilled) {
            alert('Bitte fülle alle Ja/Nein-Tippfelder aus!');
            return;
        }

        // Sende alle gesammelten Daten an den Server
        await sendDataToServer({
            league: selectedLeagueName,
            gameId: selectedGame.id,
            team1: selectedGame.team1,
            team2: selectedGame.team2,
            tipDetails: currentGameTip, // Sende das gesamte Objekt mit den Detail-Tipps
            email: email,
            pin: pin
        });

        // Input-Felder zurücksetzen und zur Spielauswahl zurückkehren
        setInputValues({ gameTips: {}, email: '', pin: '' });
        setSelectedGame(null);
        setViewState('gameSelection');
    }, [inputValues, sendDataToServer, selectedLeagueName, selectedGame, showBettingClosedModal]);

    // Handler für die Auswahl einer Liga
    const handleLeagueSelect = useCallback((leagueName) => {
        if (showBettingClosedModal) {
            alert('Wetten sind derzeit geschlossen und können nicht abgegeben werden.');
            return;
        }

        if (leagueName === '1. Bundesliga') {
            setSelectedLeagueName(leagueName);
            setCurrentLeagueGames(bundesliga1Games);
            setViewState('gameSelection');
        }
    }, [showBettingClosedModal]);

    // Für die Auswahl eines spezifischen Spiels
    const handleGameSelect = useCallback((game) => {
        if (showBettingClosedModal) {
            alert('Wetten sind derzeit geschlossen und können nicht abgegeben werden.');
            return;
        }
        setSelectedGame(game);
        // Initialisiere gameTips für das ausgewählte Spiel mit Standardwerten (null für Ja/Nein)
        setInputValues(prev => ({
            ...prev,
            gameTips: {
                ...prev.gameTips,
                [game.id]: {
                    score: prev.gameTips[game.id]?.score || '',
                    team1Half1Goal: prev.gameTips[game.id]?.team1Half1Goal ?? null,
                    team2Half1Goal: prev.gameTips[game.id]?.team2Half1Goal ?? null,
                    team1Half2Goal: prev.gameTips[game.id]?.team1Half2Goal ?? null,
                    team2Half2Goal: prev.gameTips[game.id]?.team2Half2Goal ?? null,
                    team1Half1Yellow: prev.gameTips[game.id]?.team1Half1Yellow ?? null,
                    team2Half1Yellow: prev.gameTips[game.id]?.team2Half1Yellow ?? null,
                    team1Half2Yellow: prev.gameTips[game.id]?.team1Half2Yellow ?? null,
                    team2Half2Yellow: prev.gameTips[game.id]?.team2Half2Yellow ?? null,
                    team1RedCard: prev.gameTips[game.id]?.team1RedCard ?? null,
                    team2RedCard: prev.gameTips[game.id]?.team2RedCard ?? null,
                    moreThan2GoalsHalf1: prev.gameTips[game.id]?.moreThan2GoalsHalf1 ?? null,
                }
            }
        }));
        setViewState('inputForm');
    }, [showBettingClosedModal]);

    // Handler zum Aktualisieren eines spezifischen Spieltipps (für Text-Input)
    const handleScoreChange = useCallback((gameId, score) => {
        setInputValues(prev => ({
            ...prev,
            gameTips: {
                ...prev.gameTips,
                [gameId]: {
                    ...(prev.gameTips[gameId] || {}),
                    score: score
                }
            }
        }));
    }, []);

    // Handler zum Aktualisieren eines Ja/Nein-Tipps
    const handleYesNoTipChange = useCallback((gameId, field, value) => {
        setInputValues(prev => ({
            ...prev,
            gameTips: {
                ...prev.gameTips,
                [gameId]: {
                    ...(prev.gameTips[gameId] || {}),
                    [field]: value
                }
            }
        }));
    }, []);

    // Helper-Komponente für Ja/Nein-Buttons
    const YesNoButtons = ({ label, gameId, field, currentValue, onChange, disabled }) => (
        <div className="flex flex-col items-start w-full mb-2">
            <label className="text-gray-300 text-sm mb-1">{label}</label>
            <div className="flex gap-2 w-full">
                <button
                    type="button"
                    onClick={() => onChange(gameId, field, true)}
                    className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200
                        ${currentValue === true ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={disabled}
                >
                    Ja
                </button>
                <button
                    type="button"
                    onClick={() => onChange(gameId, field, false)}
                    className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200
                        ${currentValue === false ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={disabled}
                >
                    Nein
                </button>
            </div>
        </div>
    );


    // Handler zum Zurückkehren zur Liga-Auswahl
    const handleBackToLeagueSelection = useCallback(() => {
        setViewState('leagueSelection');
        setSelectedLeagueName(null);
        setCurrentLeagueGames([]);
        setSelectedGame(null); // Auch das ausgewählte Spiel zurücksetzen
        setInputValues({ gameTips: {}, email: '', pin: '' }); // Reset all inputs
    }, []);

    // Zum Zurückkehren zur Spielauswahl
    const handleBackToGameSelection = useCallback(() => {
        setViewState('gameSelection');
        setSelectedGame(null); // Ausgewähltes Spiel zurücksetzen
        setInputValues(prev => ({
            ...prev,
            email: '', // E-Mail und PIN für neuen Tipp zurücksetzen
            pin: ''
        }));
    }, []);

    const currentTip = inputValues.gameTips[selectedGame?.id] || {};

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-inter relative overflow-hidden">

            {/* Das "Wetten geschlossen" Pop-up */}
            <BettingClosedModal isOpen={showBettingClosedModal} />

            {/* Ranglisten-Modal */}
            <LeaderboardModal
                isOpen={showLeaderboardModal}
                onClose={() => setShowLeaderboardModal(false)}
                leaderboardData={leaderboardData}
                teamLogos={teamLogos} // teamLogos an das Modal übergeben
            />

            {viewState === 'leagueSelection' && (
                <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full text-center relative">
                    {/* Pokal-Icon für Rangliste - NUR HIER ANZEIGEN */}
                    <button
                        onClick={() => setShowLeaderboardModal(true)}
                        className="absolute top-4 right-4 text-yellow-400 text-3xl hover:scale-110 transition-transform duration-200"
                        aria-label="Rangliste anzeigen"
                    >
                        🏆
                    </button>
                    <h2 className="text-3xl font-bold text-white mb-6">Wähle eine Liga aus</h2>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => handleLeagueSelect('1. Bundesliga')}
                            className="league-card"
                            disabled={showBettingClosedModal} // Button deaktivieren, wenn Wetten geschlossen sind
                        >
                            <span className="text-2xl font-semibold">1. Bundesliga</span>
                        </button>
                    </div>
                </div>
            )}

            {viewState === 'gameSelection' && (
                <div className="rounded-xl p-8 shadow-2xl border border-gray-700 max-w-4xl w-full text-center relative"
                     style={{
                         background: 'linear-gradient(to bottom right, #4F46E5, #8B5CF6)',
                     }}>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Wähle ein Spiel der {selectedLeagueName} aus
                    </h2>
                    
                    <div className="flex flex-col gap-4 mb-4">
                        {currentLeagueGames.map(game => (
                            <button
                                key={game.id}
                                onClick={() => handleGameSelect(game)}
                                className="league-card flex items-center justify-center"
                                disabled={showBettingClosedModal}
                            >
                                <img
                                    src={teamLogos[game.team1]}
                                    alt={`${game.team1} Logo`}
                                    className="w-12 h-12 rounded-full mr-2"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                                />
                                <span className="text-xl font-semibold">{game.team1}</span>
                                <span className="text-gray-400 mx-2 text-xl"> vs </span>
                                <span className="text-xl font-semibold">{game.team2}</span>
                                <img
                                    src={teamLogos[game.team2]}
                                    alt={`${game.team2} Logo`}
                                    className="w-12 h-12 rounded-full ml-2"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                                />
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleBackToLeagueSelection}
                        className="btn btn-back w-full mt-2"
                        disabled={showBettingClosedModal}
                    >
                        Zurück zur Liga-Auswahl
                    </button>
                </div>
            )}

            {viewState === 'inputForm' && selectedGame && (
                <div className="rounded-xl p-8 shadow-2xl border border-gray-700 max-w-4xl w-full text-center"
                     style={{
                         background: 'linear-gradient(to bottom right, #4F46E5, #8B5CF6)',
                     }}>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Dein Tipp für: {selectedGame.team1} vs {selectedGame.team2}
                    </h2>
                    
                    {/* Team Logos und Namen */}
                    <div className="flex items-center justify-center w-full mb-4">
                        <img
                            src={teamLogos[selectedGame.team1]}
                            alt={`${selectedGame.team1} Logo`}
                            className="w-12 h-12 rounded-full mr-2"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                        />
                        <span className="text-xl font-semibold">{selectedGame.team1}</span>
                        <span className="text-gray-400 mx-2 text-xl"> vs </span>
                        <span className="text-xl font-semibold">{selectedGame.team2}</span>
                        <img
                            src={teamLogos[selectedGame.team2]}
                            alt={`${selectedGame.team2} Logo`}
                            className="w-12 h-12 rounded-full ml-2"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/666666/FFFFFF?text=?" }}
                        />
                    </div>

                    {/* Spielergebnis (Text-Input) */}
                    <div className="flex flex-col items-start w-full mb-4">
                        <label className="text-gray-300 text-sm mb-1">Spielergebnis (Reguläre Spielzeit)</label>
                        <input
                            type="text"
                            className="modal-input w-full"
                            placeholder="Dein Tipp (z.B. 2:1)"
                            value={currentTip.score || ''}
                            onChange={(e) => handleScoreChange(selectedGame.id, e.target.value)}
                            disabled={showBettingClosedModal}
                        />
                    </div>

                    {/* Tore in der ersten Halbzeit */}
                    <h3 className="text-lg font-bold text-white mb-2 mt-4">Tore in der 1. Halbzeit</h3>
                    <YesNoButtons
                        label={`Trifft ${selectedGame.team1} in der 1. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team1Half1Goal"
                        currentValue={currentTip.team1Half1Goal}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`Trifft ${selectedGame.team2} in der 1. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team2Half1Goal"
                        currentValue={currentTip.team2Half1Goal}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label="Fallen mehr als 2 Tore in der 1. Halbzeit?"
                        gameId={selectedGame.id}
                        field="moreThan2GoalsHalf1"
                        currentValue={currentTip.moreThan2GoalsHalf1}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />

                    {/* Tore in der zweiten Halbzeit */}
                    <h3 className="text-lg font-bold text-white mb-2 mt-4">Tore in der 2. Halbzeit</h3>
                    <YesNoButtons
                        label={`Trifft ${selectedGame.team1} in der 2. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team1Half2Goal"
                        currentValue={currentTip.team1Half2Goal}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`Trifft ${selectedGame.team2} in der 2. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team2Half2Goal"
                        currentValue={currentTip.team2Half2Goal}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />

                    {/* Gelbe Karten */}
                    <h3 className="text-lg font-bold text-white mb-2 mt-4">Gelbe Karten</h3>
                    <YesNoButtons
                        label={`${selectedGame.team1} bekommt Gelb in der 1. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team1Half1Yellow"
                        currentValue={currentTip.team1Half1Yellow}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`${selectedGame.team2} bekommt Gelb in der 1. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team2Half1Yellow"
                        currentValue={currentTip.team2Half1Yellow}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`${selectedGame.team1} bekommt Gelb in der 2. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team1Half2Yellow"
                        currentValue={currentTip.team1Half2Yellow}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`${selectedGame.team2} bekommt Gelb in der 2. Halbzeit?`}
                        gameId={selectedGame.id}
                        field="team2Half2Yellow"
                        currentValue={currentTip.team2Half2Yellow}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />

                    {/* Rote Karten */}
                    <h3 className="text-lg font-bold text-white mb-2 mt-4">Rote Karten (Gesamtes Spiel)</h3>
                    <YesNoButtons
                        label={`${selectedGame.team1} bekommt eine Rote Karte?`}
                        gameId={selectedGame.id}
                        field="team1RedCard"
                        currentValue={currentTip.team1RedCard}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />
                    <YesNoButtons
                        label={`${selectedGame.team2} bekommt eine Rote Karte?`}
                        gameId={selectedGame.id}
                        field="team2RedCard"
                        currentValue={currentTip.team2RedCard}
                        onChange={handleYesNoTipChange}
                        disabled={showBettingClosedModal}
                    />

                    {/* Allgemeine Inputfelder */}
                    <input
                        type="text" // Geändert von email zu text, da es "Social Media Name + Plattform" ist
                        className="modal-input w-full mt-4"
                        placeholder="Social Media Name + Plattform"
                        value={inputValues.email}
                        onChange={(e) => setInputValues(prev => ({ ...prev, email: e.target.value }))}
                        disabled={showBettingClosedModal}
                    />
                    <input
                        type="password"
                        className="modal-input w-full"
                        placeholder="Ausgedachter PIN"
                        value={inputValues.pin}
                        onChange={(e) => setInputValues(prev => ({ ...prev, pin: e.target.value }))}
                        disabled={showBettingClosedModal}
                    />
                    <button onClick={handleSubmit} className="btn btn-green w-full mt-4" disabled={showBettingClosedModal}>Senden</button>
                    <button
                        onClick={handleBackToGameSelection}
                        className="btn btn-back w-full mt-2"
                        disabled={showBettingClosedModal}
                    >
                        Zurück zur Spielauswahl
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
