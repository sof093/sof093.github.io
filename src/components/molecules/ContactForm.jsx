import { useState, useRef, forwardRef } from "react";
import "/src/styles/contacto.css";

function Label({ children }) {
  return (
    <label className="block text-lg font-semibold text-[#4b2e83] dark:text-[#d8caff]">
      {children}
    </label>
  );
}

const Input = forwardRef((props, ref) => {
  const { type = "text", placeholder = "", ...rest } = props;

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg p-4 border-white hover:border-red-500 transition-all duration-300"
      {...rest}
    />
  );
});

const TextArea = forwardRef((props, ref) => {
  const { rows = 4, placeholder = "", ...rest } = props;

  return (
    <textarea
      ref={ref}
      rows={rows}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg p-4 border border-white hover:border-red-500 transition-all duration-300"
      {...rest}
    />
  );
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      nombre: nameRef.current.value,
      correo: emailRef.current.value,
      asunto: messageRef.current.value,
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbxsoS9n59db63uoe_k6CNbLe8l8Yg5cGxpq4tu4NRysg4TE2uVB9b5am0BMcFoeUccF/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then(() => {
        alert("Mensaje enviado correctamente!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
        alert("Error al enviar el mensaje");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="contenido-principal">
      <div className="contacto-contenedor">
        <h2 className="contacto-titulo">Contact Me</h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-6" disabled={loading}>
            <Label>Name</Label>
            <Input placeholder="Your Name" ref={nameRef} required />

            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Your Email"
              ref={emailRef}
              required
            />

            <Label>Message</Label>
            <TextArea
              placeholder="Your Message"
              rows={6}
              ref={messageRef}
              required
            />

            <button type="submit" className="contacto-boton">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
