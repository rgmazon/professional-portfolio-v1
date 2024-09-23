
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // Reveal sections on scroll
    const revealSection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    document.querySelectorAll("section").forEach((section) => {
      sectionObserver.observe(section);
    });

    // Scrollspy functionality
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

     // Mobile menu toggle
     const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
     const nav = document.querySelector('nav');
     const sidebar = document.querySelector('.sidebar');
     const navLinks2 = document.querySelectorAll('.nav-link');

     mobileMenuToggle.addEventListener('click', () => {
         nav.classList.toggle('show');
         sidebar.classList.toggle('menu-open');
     });

     // Close mobile menu when a link is clicked
     navLinks.forEach(link => {
         link.addEventListener('click', () => {
             if (window.innerWidth <= 768) {
                 nav.classList.remove('show');
                 sidebar.classList.remove('menu-open');
             }
         });
     });

    // Skills infinite scroll
    const skills = document.querySelector('.skills');
    const skillsContainer = document.querySelector('.skills-container');
    let scrollDirection = 1; // 1 for right, -1 for left
    let lastScrollTop = 0;
    let animationId;

    // Clone skills for infinite loop
    skills.innerHTML += skills.innerHTML;

    function getSkillsWidth() {
        return Array.from(skills.children).reduce((width, skill) => width + skill.offsetWidth + 10, 0) / 2;
    }

    let position = 0;
    const speed = 0.5;

    function animate() {
        const skillsWidth = getSkillsWidth();
        
        position += scrollDirection * speed;

        if (position <= -skillsWidth) {
            position += skillsWidth;
        } else if (position > 0) {
            position -= skillsWidth;
        }

        skills.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            scrollDirection = 1;
        } else if (st < lastScrollTop) {
            // Scrolling up
            scrollDirection = -1;
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });

    // Pause animation on hover
    skillsContainer.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });

    skillsContainer.addEventListener('mouseleave', () => {
        animate();
    });


    //Typing Text
    // get the element
const text = document.querySelector('.typing-text');

// make a words array
const words = [
  "Hi! My name is",
  "Hi! My name is",
  "Hi! My name is",
  "Hi! My name is"
];

// start typing effect
setTyper(text, words);

function setTyper(element, words) {

  const LETTER_TYPE_DELAY = 75;
  const WORD_STAY_DELAY = 2000;

  const DIRECTION_FORWARDS = 0;
  const DIRECTION_BACKWARDS = 1;

  var direction = DIRECTION_FORWARDS;
  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
  }

  function typeLetter() {
    const word = words[wordIndex];

    if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

      if (letterIndex == word.length) {
        direction = DIRECTION_BACKWARDS;
        clearInterval(wordTypeInterval);
        setTimeout(startTyping, WORD_STAY_DELAY);
      }

    } else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;

      if (letterIndex == 0) {
        nextWord();
      }
    }

    const textToType = word.substring(0, letterIndex);

    element.textContent = textToType;
  }

  function nextWord() {

    letterIndex = 0;
    direction = DIRECTION_FORWARDS;
    wordIndex++;

    if (wordIndex == words.length) {
      wordIndex = 0;
    }

  }
}
