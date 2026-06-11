const fs = require('fs');

const es = JSON.parse(fs.readFileSync('src/dictionaries/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));

es.contact = {
  page: {
    title: "¿Cómo prefieres que hablemos?",
    subtitle: "Selecciona la opción que mejor se adapte a tus necesidades para comenzar.",
    card1Title: "Hablemos por\nmensaje",
    card1Desc: "Cuéntame en qué estás trabajando hoy, en que puedo apoyarte o qué necesitas potenciar.",
    card2Title: "Generemos una\nconsultoría UX",
    card2Desc: "Revisemos tu producto digital y generemos una Roadmaps para optimizar tu negocio.",
    card3Title: "Agendemos una\nreunión virtual",
    card3Desc: "Un cafe virtual, agenda un horario disponible y hablemos con calma sobre lo que necesitas."
  },
  forms: {
    hide: "Ocultar",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    messageLabel: "Mensaje",
    send: "Enviar",
    teamRukma: "Hey, somos el Equipo Rukma,",
    message: {
      title: "Hablemos por mensaje",
      placeholder: "Cuéntame sobre tu proyecto...",
      footer: "revisaremos tu mensaje y nos pondremos en contacto contigo a la brevedad posible."
    },
    consulting: {
      title: "Generemos una consultoría UX",
      placeholder: "Generemos una consultoría UX: Cuéntame sobre tu proyecto...",
      timeLabel: "Tiempo estimado de desarrollo",
      timePlaceholder: "Ej. 2 meses",
      urlLabel: "URL a consultar",
      urlOptional: "(Opcional)",
      urlPlaceholder: "https://tuweb.com",
      budgetTitle: "¿Tienes un presupuesto inicial?",
      budgetDesc: "Actívalo si ya cuentas con una idea inicial de inversión. Solo es referencial",
      footer: "analizaremos tu solicitud para ofrecerte recomendaciones claras, estratégicas y accionables."
    },
    meeting: {
      title: "Agendemos una reunión virtual",
      dayLabel: "Selecciona el día para agendar",
      timeLabel: "Horario de reunión (15 mins)",
      meetNote: "Reunión de contacto por Teams o Google Meet.",
      footer: "nos reuniremos contigo en este espacio breve para entender tu visión y explorar cómo podemos colaborar.",
      days: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"]
    }
  }
};

en.contact = {
  page: {
    title: "How would you prefer to talk?",
    subtitle: "Select the option that best suits your needs to get started.",
    card1Title: "Let's talk by\nmessage",
    card1Desc: "Tell me what you are working on today, how I can support you, or what you need to enhance.",
    card2Title: "Let's generate a\nUX consultancy",
    card2Desc: "Let's review your digital product and generate a roadmap to optimize your business.",
    card3Title: "Let's schedule a\nvirtual meeting",
    card3Desc: "A virtual coffee, schedule an available time and let's calmly discuss what you need."
  },
  forms: {
    hide: "Hide",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    messageLabel: "Message",
    send: "Send",
    teamRukma: "Hey, we are Team Rukma,",
    message: {
      title: "Let's talk by message",
      placeholder: "Tell me about your project...",
      footer: "we will review your message and get in touch with you as soon as possible."
    },
    consulting: {
      title: "Let's generate a UX consultancy",
      placeholder: "Let's generate a UX consultancy: Tell me about your project...",
      timeLabel: "Estimated development time",
      timePlaceholder: "E.g. 2 months",
      urlLabel: "URL to review",
      urlOptional: "(Optional)",
      urlPlaceholder: "https://yourweb.com",
      budgetTitle: "Do you have an initial budget?",
      budgetDesc: "Activate it if you already have an initial investment idea. It's just a reference.",
      footer: "we will analyze your request to offer clear, strategic, and actionable recommendations."
    },
    meeting: {
      title: "Let's schedule a virtual meeting",
      dayLabel: "Select the day to schedule",
      timeLabel: "Meeting time (15 mins)",
      meetNote: "Contact meeting via Teams or Google Meet.",
      footer: "we will meet with you in this brief space to understand your vision and explore how we can collaborate.",
      days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    }
  }
};

fs.writeFileSync('src/dictionaries/es.json', JSON.stringify(es, null, 2));
fs.writeFileSync('src/dictionaries/en.json', JSON.stringify(en, null, 2));
