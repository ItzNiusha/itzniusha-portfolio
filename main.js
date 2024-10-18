document.addEventListener("DOMContentLoaded", function () {
    // Hide the EnterView after 3 seconds
    setTimeout(function () {
        const enterView = document.getElementById("EnterView");
        enterView.style.transition = "opacity 0.6s ease-out"; // Fade out EnterView

        enterView.style.opacity = 0;

        setTimeout(function () {
            enterView.style.display = "none";
            const page = document.getElementById("Page");
            page.style.display = "block"; // Show Page content
            page.style.opacity = 0; // Start with hidden opacity
            page.style.transition = "opacity 1.5s ease-in-out"; // Longer duration for smoothness
            
            // Trigger fade-in after display is set
            setTimeout(() => {
                page.style.opacity = 1; // Fade in the Page
            }, 50); // Slight delay to ensure display is applied
            
            document.getElementById("Border").style.display = "block"; // Show the Border element
        }, 600); // Delay before showing main content matches the EnterView duration
    }, 3000); // Initial delay remains the same

    // Get references to the Home, About, Project, and Contact sections
    const homeSection = document.querySelector('[data-page="home"]');
    const aboutSection = document.querySelector('[data-page="about"]');
    const projectSection = document.querySelector('[data-page="project"]');
    const contactSection = document.querySelector('[data-page="contact"]'); // Add contact section reference

    // Initially, only the home section should be visible
    aboutSection.style.display = 'none';  // Hide About section initially
    projectSection.style.display = 'none';  // Hide Projects section initially
    contactSection.style.display = 'none';  // Hide Contact section initially

    // Get the navigation links
    const aboutLink = document.getElementById('aboutLink');
    const projectLink = document.getElementById('projectsLink');
    const contactLink = document.getElementById('contactLink'); // Add contact link reference

    // Click event for "About" link
    aboutLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent the default link behavior
        transitionToSection(aboutSection);
    });

    // Click event for "Projects" link
    projectLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent the default link behavior
        transitionToSection(projectSection);
    });

    // Click event for "Contact" link
    contactLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevent the default link behavior
        transitionToSection(contactSection);
    });

    function transitionToSection(targetSection) {
        // Fade out the currently visible section
        const currentSection = document.querySelector('.page:not([style*="display: none"])');
        
        gsap.to(currentSection, { opacity: 0, duration: 0.5, onComplete: () => {
            currentSection.style.display = 'none';  // Hide current section
            targetSection.style.display = 'block';  // Show target section
            gsap.fromTo(targetSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });  // Fade in the target section
        }});
    }
});

document.getElementById('portfolioLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    
    // Select the #SiteHeader element
    const borderDiv = document.getElementById('SiteHeader');
    
    // Select all child elements inside the #SiteHeader
    const children = Array.from(borderDiv.children);
    
    // Loop through all child elements of #SiteHeader
    children.forEach(function (element) {
        // Check if the element is NOT the theme toggle, and remove it
        if (!element.classList.contains('theme-toggle')) {
            borderDiv.removeChild(element);
        }
    });

    // Select and remove the #siteHeader_nav element
    const siteHeaderNav = document.getElementById('siteHeader_nav');
    if (siteHeaderNav) {
        siteHeaderNav.remove();
    }

    // Remove the project navigation section
    const projectNav = document.getElementById('projectNav');
    if (projectNav) {
        projectNav.remove();
    }

    // Show the new project details section
    const portfolioDetailsSection = document.getElementById('portfolioDetailsSection');
    if (portfolioDetailsSection) {
        portfolioDetailsSection.style.display = 'block'; // Show the portfolio details section
    }
});

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Apply GSAP animation for the scrollable project section
    gsap.from(".scrollable", {
        scrollTrigger: {
            trigger: ".scrollable",
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
    });
});
