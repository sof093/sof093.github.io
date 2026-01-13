document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-contacto");
  const mensaje = document.getElementById("mensaje-exito");

  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  const moonIcon = "/moon.png";   
  const sunIcon  = "/sun.png";

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      await fetch(form.action, {
        method: "POST",
        body: data,
      });

      mensaje.style.opacity = "1";
      form.reset();

      setTimeout(() => {
        mensaje.style.opacity = "0";
      }, 4000);
    });
  }

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    icon.src = sunIcon;
  } else {
    icon.src = moonIcon;
  }

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    icon.src = isDark ? sunIcon : moonIcon;
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
