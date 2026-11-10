/* =========================================
   BEHIND THE SOUND
   LEARNING PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.getElementById("menuButton");
  const mainMenu = document.getElementById("mainMenu");

  // OPEN / CLOSE MENU
  if (menuButton && mainMenu) {

    menuButton.addEventListener("click", (event) => {

      event.stopPropagation();

      mainMenu.classList.toggle("active");

      const isOpen = mainMenu.classList.contains("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    // CLICK OUTSIDE MENU
    document.addEventListener("click", (event) => {

      if (
        !mainMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        mainMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

      }

    });

    // CLOSE AFTER CLICKING A MENU LINK
    mainMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mainMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

      });

    });

  }

});