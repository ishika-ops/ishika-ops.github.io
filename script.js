// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


const navLinks = document.querySelectorAll('#main-nav a');

// Add an event listener for clicks on each link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});

// Animation for revealing sections on scroll
const sections = document.querySelectorAll('section');

// Fix for "twitching" for the upper section
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const section = entry.target;
        // Add or remove the visible class only if more than 30% of the section is visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            section.classList.add('visible'); // Show the section
        } else {
            if (!section.classList.contains('no-reset')) { // If class is 'no-reset', do not delete
                section.classList.remove('visible'); // Remove the class when the section leaves
            }
        }
    });
}, { 
    threshold: [0.3], // Triggered at 30% visibility
    rootMargin: '0px 0px -50px 0px' // Add 50px margin at the bottom to avoid early triggering
});

sections.forEach(section => observer.observe(section));


// Create a container for snowflakes
const snowContainer = document.createElement('div');
snowContainer.style.position = 'fixed';
snowContainer.style.top = '0';
snowContainer.style.left = '0';
snowContainer.style.width = '100vw';
snowContainer.style.height = '100vh';
snowContainer.style.pointerEvents = 'none';
snowContainer.style.overflow = 'hidden';
document.body.appendChild(snowContainer);

// Falling snow
const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    snowflake.style.animationDuration = Math.random() * 3 + 12 + 's'; // 2-5 seconds
    snowflake.style.opacity = Math.random(); // Snowflake opacity
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Snowflake size
    snowflake.innerText = '❄'; // Snowflake character
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove(); // Remove snowflake after animation ends
    }, 5000); // Snowflake lifespan
};

// Create snowflakes every 100 ms
setInterval(createSnowflake, 100);

// Create a button and add it to the DOM
const backToTopButton = document.createElement('div');
backToTopButton.id = 'backToTop';
backToTopButton.innerHTML = '&#8593;'; // Up arrow
document.body.appendChild(backToTopButton);

// Add a click handler for scrolling up
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show the button when scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // If you scrolled down 200px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

const footer = document.getElementById('main-footer');

// Define the wave component HTML
const waveHTML = `
    <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
    </div>
`;

// Add the wave component after the footer
footer.insertAdjacentHTML('afterend', waveHTML);
