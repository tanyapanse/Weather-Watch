
function weatherCodeToGroup(code) {
    if (code === 0) return "Clear";
    if (code === 1 || code === 2) return "Clear/Cloudy";
    if ([3, 45, 48].includes(code)) return "Cloudy";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) return "Raining";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowing";
    return "Unknown";
}

const weatherIcons = {
    Clear: 'icons/clear.png',
    "Clear/Cloudy": 'icons/clear_cloudy.png',
    Cloudy: 'icons/cloudy.png',
    Raining: 'icons/raining.png',
    Snowing: 'icons/snowing.png'
};

const latitude = 43.65;
const longitude = -79.38;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;

        const weatherGroup = weatherCodeToGroup(code);

        document.getElementById('temperature').textContent = `Temperature: ${temp} °C`;
        document.getElementById('description').textContent = `Conditions: ${weatherGroup}`;

        const iconEl = document.getElementById('weather-icon');
        const iconImg = weatherIcons[weatherGroup];
        iconEl.src = iconImg;

    })
    .catch(err => {
        document.getElementById('temperature').textContent = "Failed to load";
        document.getElementById('description').textContent = "";
        console.error(err);
    });

const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const monthName = today.toLocaleDateString("en-US", { month: "long" });
const dayNumber = today.getDate();
document.getElementById("date").textContent = `${dayName}, ${monthName} ${dayNumber}`

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.remove('sunrise');
        document.body.classList.add('sunset');
    } else {
        document.body.classList.remove('sunset');
        document.body.classList.add('sunrise');
    }
});

document.body.classList.add('sunrise');

const clickSound = new Audio("click.mp3");

themeToggle.addEventListener("change", function () {
    clickSound.play();
});
