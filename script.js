// Fonction pour calculer l'âge précis en années, mois et jours
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    // Vérifier si la date est dans le futur
    if (birth > today) {
        return { error: "La date de naissance ne peut pas être dans le futur." };
    }
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    // Ajuster pour mois négatifs
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Ajuster pour jours négatifs (tenir compte des années bissextiles via Date)
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        days += lastMonth.getDate();
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    
    return { years, months, days };
}

// Fonction pour afficher le résultat ou l'erreur
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error-message');
    
    if (result.error) {
        errorDiv.textContent = result.error;
        resultDiv.classList.remove('show');
        resultDiv.textContent = '';
    } else {
        errorDiv.textContent = '';
        resultDiv.textContent = `${result.years} ans, ${result.months} mois, ${result.days} jours`;
        resultDiv.classList.add('show');
    }
}

// Gestionnaire d'événement pour le bouton et le changement de date
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('birthdate');
    const button = document.getElementById('calculate-btn');
    
    // Fonction commune pour calculer et afficher
    const performCalculation = () => {
        const birthDate = input.value;
        if (birthDate) {
            button.classList.add('calculating'); // Animation CSS
            setTimeout(() => { // Simuler un délai pour l'animation
                const result = calculateAge(birthDate);
                displayResult(result);
                button.classList.remove('calculating');
            }, 500);
        }
    };
    
    // Événement sur le bouton
    button.addEventListener('click', performCalculation);
    
    // Mise à jour automatique sur changement de date
    input.addEventListener('change', performCalculation);
    
    // Navigation clavier : permettre Enter sur l'input pour calculer
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performCalculation();
        }
    });
});