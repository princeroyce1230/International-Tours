    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mainNav = document.querySelector(".main-nav");

    if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        mainNav.style.display =
        mainNav.style.display === "block" ? "none" : "block";

        // Toggle hamburger to X
        const spans = mobileMenuBtn.querySelectorAll("span");
        spans[0].style.transform =
        spans[0].style.transform === "rotate(45deg) translate(5px, 5px)"
            ? "none"
            : "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = spans[1].style.opacity === "0" ? "1" : "0";
        spans[2].style.transform =
        spans[2].style.transform === "rotate(-45deg) translate(7px, -6px)"
            ? "none"
            : "rotate(-45deg) translate(7px, -6px)";
    });
    }

    // Tabs functionality
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");

        // Remove active class from all buttons and contents
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        btn.classList.add("active");
        document.getElementById(`${tabId}-tab`).classList.add("active");
    });
    });

    // Carousel functionality
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");

    let currentIndex = 0;

    // Set initial position
    updateCarousel();

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
        });
    }

    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Auto slide (optional)
    let interval = setInterval(() => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    carousel.addEventListener("mouseleave", () => {
        interval = setInterval(() => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
        }, 5000);
    });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        // Toggle active class on header
        header.classList.toggle("active");

        // Toggle active class on content
        const content = header.nextElementSibling;
        content.classList.toggle("active");
    });
    });

    // Form validation
    const contactForm = document.querySelector(".contact-form form");

    if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        let isValid = true;

        // Simple validation
        if (!nameInput.value.trim()) {
        isValid = false;
        nameInput.style.borderColor = "red";
        } else {
        nameInput.style.borderColor = "";
        }

        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = "red";
        } else {
        emailInput.style.borderColor = "";
        }

        if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.style.borderColor = "red";
        } else {
        messageInput.style.borderColor = "";
        }

        if (isValid) {
        // In a real application, you would send the form data to a server
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
        }
    });
    }

    // Email validation helper
    function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
        });

        // Close mobile menu if open
        if (window.innerWidth < 768 && mainNav.style.display === "block") {
            mainNav.style.display = "none";

            // Reset hamburger icon
            const spans = mobileMenuBtn.querySelectorAll("span");
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
        }
    });
    });
