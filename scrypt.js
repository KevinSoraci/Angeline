window.onload = function() {
    // Tu código JavaScript aquí
    let points = 0;
    let pointsPerClick = 1;
    let autoPoints = 0;
    let upgrade1Cost = 10;
    let upgrade2Cost = 100;

    const pointsDisplay = document.getElementById('points');
    const clickButton = document.getElementById('click-button');
    const upgrade1Image = document.getElementById('upgrade1');
    const upgrade2Image = document.getElementById('upgrade2');
    const upgrade1CostDisplay = document.getElementById('upgrade1-cost');
    const upgrade2CostDisplay = document.getElementById('upgrade2-cost');

    clickButton.addEventListener('click', () => {
        points += pointsPerClick;
        updatePointsDisplay();
    });

    upgrade1Image.addEventListener('click', () => {
        if (points >= upgrade1Cost) {
            points -= upgrade1Cost;
            pointsPerClick += 1;
            upgrade1Cost *= 2; // Aumenta el precio del upgrade
            updatePointsDisplay();
            updateUpgradeCost();
        }
    });

    upgrade2Image.addEventListener('click', () => {
        if (points >= upgrade2Cost) {
            points -= upgrade2Cost;
            autoPoints += 1;
            upgrade2Cost *= 2; // Aumenta el precio del upgrade
            updatePointsDisplay();
            updateUpgradeCost();
        }
    });

    function updatePointsDisplay() {
        pointsDisplay.textContent = points;
    }

    function updateUpgradeCost() {
        upgrade1CostDisplay.textContent = `Cost: ${upgrade1Cost} points`;
        upgrade2CostDisplay.textContent = `Cost: ${upgrade2Cost} points`;
    }

    // Generar puntos automáticamente cada segundo
    setInterval(() => {
        points += autoPoints;
        updatePointsDisplay();
    }, 1000);

    // Guardar progreso
    function saveProgress() {
        const gameData = {
            points,
            pointsPerClick,
            autoPoints,
            upgrade1Cost,
            upgrade2Cost
        };
        localStorage.setItem('clickerGameData', JSON.stringify(gameData));
    }

    function loadProgress() {
        const savedData = localStorage.getItem('clickerGameData');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            points = gameData.points;
            pointsPerClick = gameData.pointsPerClick;
            autoPoints = gameData.autoPoints;
            upgrade1Cost = gameData.upgrade1Cost;
            upgrade2Cost = gameData.upgrade2Cost;
            updatePointsDisplay();
            updateUpgradeCost();
        }
    }

    // Guardar cada 5 segundos
    setInterval(saveProgress, 5000);

    // Cargar progreso al iniciar el juego
    window.onload = loadProgress;
};
