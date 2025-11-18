document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-contacto");
  const mensaje = document.getElementById("mensaje-exito");

  if (!form) return;

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
});
