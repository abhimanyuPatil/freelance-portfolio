document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle (Standard class-based toggle)
  const mobileNav = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const menuClose = document.getElementById("mobile-menu-close");

  if (mobileNav && menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
    });
  }

  if (mobileNav && menuClose) {
    menuClose.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }

  // Close menu on link clicks
  if (mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        if (menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ----------------------------------------------------
  // INTERACTIVE TERMINAL CLI SANDBOX
  // ----------------------------------------------------
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");
  const terminalBody = document.getElementById("terminal-body");
  const themeToggle = document.getElementById("terminal-theme-toggle");
  
  // Available themes list
  const themesList = ["default", "hacker", "cyberpunk"];
  let currentThemeIndex = 0;

  // Command History
  let cmdHistory = [];
  let historyIndex = -1;

  // Personal Info data for terminal
  const portfolioData = {
    about: "Full Stack Software Engineer with 7 years of experience building scalable applications across JavaScript and Ruby on Rails. Proficient across Fintech, MDM, E-commerce, and ERP systems.",
    contact: `Email:    abhimanyu.patil39@gmail.com\nPhone:    +91 8446161390\nLinkedIn: https://www.linkedin.com/in/abhimanyu-patil91/\nGitHub:   https://github.com/abhimanyuPatil/\nWhatsApp: +91 84460 42956`,
    experience: [
      { role: "Senior Technology Consultant", company: "Technogise", period: "Sep 2023 - Present" },
      { role: "Software Engineer", company: "Coditation", period: "Nov 2021 - Sep 2023" },
      { role: "Senior Application Developer", company: "VRLab Technologies", period: "Oct 2019 - Nov 2021" },
      { role: "Software Developer Trainee", company: "iAssure International", period: "Apr 2019 - Sep 2019" }
    ],
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 90 },
      { name: "NodeJS", level: 90 },
      { name: "Ruby on Rails", level: 80 },
      { name: "SQL", level: 80 },
      { name: "AWS", level: 80 },
      { name: "HTML/CSS", level: 85 }
    ]
  };

  // Helper function to append terminal output
  function writeToTerminal(text, className = "") {
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`;
    line.innerHTML = text.replace(/\n/g, "<br>");
    terminalOutput.appendChild(line);
    // Scroll body to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Generate ASCII progress bar
  function makeProgressBar(percent) {
    const totalBars = 10;
    const filledCount = Math.round((percent / 100) * totalBars);
    const emptyCount = totalBars - filledCount;
    return "[" + "█".repeat(filledCount) + "░".repeat(emptyCount) + "] " + percent + "%";
  }

  // Theme command setter
  function setTerminalTheme(themeName) {
    if (themesList.includes(themeName)) {
      if (themeName === "default") {
        document.body.removeAttribute("data-terminal-theme");
      } else {
        document.body.setAttribute("data-terminal-theme", themeName);
      }
      writeToTerminal(`System: Terminal theme changed to [${themeName}].`, "terminal-highlight");
    } else {
      writeToTerminal(`Error: Theme '${themeName}' not found. Available: default, hacker, cyberpunk`, "error");
    }
  }

  // Parse Command Logic
  function executeCommand(inputString) {
    const trimmedInput = inputString.trim();
    if (!trimmedInput) return;

    // Add to history
    cmdHistory.push(trimmedInput);
    historyIndex = cmdHistory.length;

    // Display command typed
    writeToTerminal(`<span class="terminal-prompt">guest@freelance-dev-pune:~$</span> ${trimmedInput}`);

    const parts = trimmedInput.toLowerCase().split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    switch (cmd) {
      case "help":
        writeToTerminal(
          `Available CLI Commands:\n` +
          `  <span class="terminal-highlight">about</span>       - Short bio about Abhimanyu Patil\n` +
          `  <span class="terminal-highlight">skills</span>      - Technical competency meters\n` +
          `  <span class="terminal-highlight">experience</span>  - Career timeline milestones\n` +
          `  <span class="terminal-highlight">contact</span>     - Quick contact information & channels\n` +
          `  <span class="terminal-highlight">theme</span>       - Set color scheme. Usage: 'theme [default|hacker|cyberpunk]'\n` +
          `  <span class="terminal-highlight">clear</span>       - Clear the console screen`
        );
        break;
        
      case "about":
        writeToTerminal(portfolioData.about);
        break;
        
      case "skills":
        let skillsTable = `+----------------------------+------------+\n` +
                          `| Technology / Skill         | Proficiency|\n` +
                          `+----------------------------+------------+\n`;
        portfolioData.skills.forEach(skill => {
          const bar = makeProgressBar(skill.level);
          const paddedName = skill.name.padEnd(26, " ");
          skillsTable += `| ${paddedName} | ${bar} |\n`;
        });
        skillsTable += `+----------------------------+------------+`;
        writeToTerminal(skillsTable);
        break;
        
      case "experience":
        let expText = "Professional History:\n";
        portfolioData.experience.forEach((exp, idx) => {
          expText += `\n${idx + 1}. <span class="terminal-highlight">${exp.role}</span> at ${exp.company}\n` +
                     `   Duration: ${exp.period}\n`;
        });
        writeToTerminal(expText);
        break;
        
      case "contact":
        writeToTerminal(portfolioData.contact);
        break;
        
      case "theme":
        if (!arg) {
          writeToTerminal(`Usage: theme [default | hacker | cyberpunk]`);
        } else {
          setTerminalTheme(arg);
        }
        break;
        
      case "clear":
        terminalOutput.innerHTML = "";
        break;
        
      default:
        writeToTerminal(`command not found: ${cmd}. Type 'help' to see available options.`, "error");
        break;
    }
  }

  // Terminal input listeners
  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = terminalInput.value;
        executeCommand(cmd);
        terminalInput.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = cmdHistory[historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          terminalInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          terminalInput.value = "";
        }
      }
    });
  }

  // Click handler for quick action chips
  const chips = document.querySelectorAll(".terminal-chips .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const cmd = chip.getAttribute("data-cmd");
      executeCommand(cmd);
    });
  });

  // Cycle themes using the title bar theme button
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentThemeIndex = (currentThemeIndex + 1) % themesList.length;
      const nextTheme = themesList[currentThemeIndex];
      if (nextTheme === "default") {
        document.body.removeAttribute("data-terminal-theme");
      } else {
        document.body.setAttribute("data-terminal-theme", nextTheme);
      }
      writeToTerminal(`Theme switched to [${nextTheme}] via UI control.`, "terminal-highlight");
    });
  }

  // ----------------------------------------------------
  // CONTACT FORM & WHATSAPP REDIRECT INTEGRATION
  // ----------------------------------------------------
  const contactForm = document.getElementById("portfolio-contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const message = document.getElementById("form-message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all the required fields.";
        formStatus.className = "form-status error";
        return;
      }

      // Display success locally
      formStatus.textContent = "Constructing message... Redirecting to WhatsApp.";
      formStatus.className = "form-status success";

      // Formulate WhatsApp message text
      const waBase = "https://wa.me/918446042956";
      const prefilledText = `Hi Abhimanyu,\n\nI saw your portfolio and would like to connect.\n\n*Name:* ${name}\n*Email:* ${email}\n*Requirement:* ${message}`;
      const waUrl = `${waBase}?text=${encodeURIComponent(prefilledText)}`;

      // Open WhatsApp link in a new tab after 1.5 seconds
      setTimeout(() => {
        window.open(waUrl, "_blank", "noopener,noreferrer");
        formStatus.textContent = "Redirected! Thank you for getting in touch. I will revert shortly.";
        contactForm.reset();
      }, 1500);
    });
  }

  // ----------------------------------------------------
  // ACTIVE NAV LINK HIGHLIGHT & SCROLL REVEALS
  // ----------------------------------------------------
  const sections = document.querySelectorAll("main > section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});
