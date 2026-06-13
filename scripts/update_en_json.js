const fs = require('fs');

const esPath = './src/dictionaries/es.json';
const enPath = './src/dictionaries/en.json';

const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Service 01 translations
const enProcess01 = {
  duration: "Between 4 and 8 weeks",
  distribution: [
    { name: "Discovery", percentage: "30%" },
    { name: "Design", percentage: "40%" },
    { name: "Validation", percentage: "20%" },
    { name: "Delivery", percentage: "10%" }
  ],
  milestones: [
    { title: "Discovery & Research", description: "Goal setting, current product review, benchmark, interviews, user analysis, and opportunity definition." },
    { title: "Strategic definition", description: "Problem prioritization, hypothesis definition, journey maps, information architecture, and success criteria." },
    { title: "UX/UI Design", description: "Creation of flows, wireframes, visual design, components, key screens, and navigable prototypes." },
    { title: "Validation", description: "User testing, heuristic review, design iterations, and adjustments based on findings." },
    { title: "Delivery for development", description: "File preparation, functional documentation, interaction criteria, and handoff to the tech team." }
  ]
};

const enPlans01 = [
  {
    name: "UX Starter Plan",
    description: "Ideal for evaluating, organizing, or redesigning a specific experience.",
    includes: [
      "UX review of the current product.",
      "Basic benchmark.",
      "Initial information architecture.",
      "Wireframes of key screens.",
      "Prioritized recommendations."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "Product Design Plan",
    description: "Ideal for designing a complete digital experience or a new feature.",
    includes: [
      "Initial discovery.",
      "User flows.",
      "Wireframes.",
      "High-fidelity UI design.",
      "Navigable prototype.",
      "Documentation for development."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "UX Partner Plan",
    description: "Ideal for companies needing continuous support.",
    includes: [
      "Monthly UX/UI support.",
      "Feature review.",
      "Design of improvements.",
      "Experience optimization.",
      "Support in product decisions."
    ],
    priceLabel: "Modality",
    price: "monthly / hourly block."
  }
];

const enConditions01 = [
  "The client must have an internal responsible party for validations and decision-making.",
  "Times may vary depending on the availability of information, stakeholders, and feedback.",
  "User testing may require additional recruitment.",
  "Technical development is not included in this service, unless contracted as an additional scope.",
  "Documentation is delivered in agreed tools, such as Figma, Notion, Google Drive, or another defined platform.",
  "Changes outside the initial scope may require an additional quote."
];

const enValue01 = [
  { title: "Reduces product uncertainty", description: "Helps make evidence-based decisions, not just assumptions." },
  { title: "Improves user experience", description: "Allows creating clearer, simpler, and easier to use interfaces." },
  { title: "Increases conversion and adoption", description: "Optimizes key journeys so users complete important actions." },
  { title: "Decreases development costs", description: "Detects problems before building, avoiding costly reworks." },
  { title: "Aligns business, design, and technology", description: "Generates a shared vision among stakeholders, product, and development." },
  { title: "Delivers actionable documentation", description: "Facilitates handoff to technical teams with flows, prototypes, and clear specs." }
];

// Service 02 translations
const enProcess02 = {
  duration: "Between 3 and 10 weeks, depending on complexity, integrations, and number of features.",
  distribution: [
    { name: "Discovery", percentage: "20%" },
    { name: "Design", percentage: "25%" },
    { name: "Validation", percentage: "20%" },
    { name: "Delivery", percentage: "35%" }
  ],
  milestones: [
    { title: "MVP Definition", description: "Identification of the problem, users, value proposition, critical features, and minimum viable scope." },
    { title: "Feature Prioritization", description: "Definition of what is built now, what is left for future stages, and what the success criteria are." },
    { title: "Experience and UI Design", description: "Design of flows, main screens, components, and navigable prototype." },
    { title: "Coding or functional build", description: "Front-end development, landing, functional prototype, dashboard, form, portal, or module depending on the scope." },
    { title: "Validation and adjustments", description: "Review with users, stakeholders, or internal team to detect improvements." },
    { title: "Delivery and scaling prep", description: "Documentation, technical recommendations, future backlog, and handoff." }
  ]
};

const enPlans02 = [
  {
    name: "Prototype Plan",
    description: "Ideal for visualizing an idea and testing navigation or interaction.",
    includes: [
      "Main flow definition.",
      "UI design of key screens.",
      "Navigable prototype.",
      "Recommendations for improvement."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "MVP Launch Plan",
    description: "Ideal for building an initial functional version.",
    includes: [
      "MVP definition.",
      "UX/UI design.",
      "Front-end or low-code development.",
      "Initial functional version.",
      "Post-validation adjustments."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "Product Sprint Plan",
    description: "Ideal for teams needing to move fast on a specific solution.",
    includes: [
      "Initial workshop.",
      "Prioritization.",
      "Fast design.",
      "Functional build.",
      "Validation.",
      "Next stage roadmap."
    ],
    priceLabel: "Suggested duration",
    price: "2 to 4 weeks."
  }
];

const enConditions02 = [
  "The MVP is defined with a limited scope and prioritized features.",
  "Complex integrations, advanced back-end, payment gateways, or custom authentication may require an additional quote.",
  "The service can be performed with no-code, low-code technologies, or front-end development as needed.",
  "Infrastructure, hosting, domain, or external services may not be included.",
  "The client must deliver accesses, contents, brand guidelines, and validations within agreed times.",
  "The goal of the MVP is to validate and learn, not to build a fully scaled final version from the start."
];

const enValue02 = [
  { title: "Allows faster time to market", description: "Reduces the time between an idea and a functional version." },
  { title: "Validates before investing more", description: "Helps test business, experience, and technology hypotheses." },
  { title: "Generates evidence to decide", description: "Allows getting real feedback from users or stakeholders." },
  { title: "Facilitates commercial pitches", description: "A functional MVP communicates better than a static presentation." },
  { title: "Reduces product risk", description: "Helps detect flaws, opportunities, and improvements before scaling." },
  { title: "Connects design and development", description: "Avoids the disconnect between visual prototype and technical build." }
];

// Service 03 translations
const enProcess03 = {
  duration: "Between 3 and 6 weeks",
  distribution: [
    { name: "Discovery", percentage: "30%" },
    { name: "Design", percentage: "45%" },
    { name: "Validation", percentage: "15%" },
    { name: "Delivery", percentage: "10%" }
  ],
  milestones: [
    { title: "Brand Diagnostic", description: "Review of context, goals, competition, references, and current perception." },
    { title: "Identity strategy", description: "Definition of personality, attributes, tone of voice, value proposition, and base narrative." },
    { title: "Visual exploration", description: "Moodboards, creative routes, color palette, typography, and visual style." },
    { title: "Identity design", description: "Development of logo, visual system, variants, iconography, graphic assets, and applications." },
    { title: "Digital applications", description: "Adapting the identity to the website, social networks, presentations, interfaces, or key pieces." },
    { title: "Brand kit or basic guide", description: "Delivery of guidelines for correct brand usage and visual continuity." }
  ]
};

const enPlans03 = [
  {
    name: "Identity Starter Plan",
    description: "Ideal for new brands or startups needing a solid foundation.",
    includes: [
      "Conceptual exploration.",
      "Main logo.",
      "Color palette.",
      "Suggested typography.",
      "Basic applications."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "Brand Experience Plan",
    description: "Ideal for companies or digital products needing a more complete identity.",
    includes: [
      "Brand strategy.",
      "Visual system.",
      "Logo and variants.",
      "Core tone of voice.",
      "Digital applications.",
      "Brand kit."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  },
  {
    name: "Digital Rebrand Plan",
    description: "Ideal for companies needing to update their image and digital presence.",
    includes: [
      "Current brand audit.",
      "Visual redefinition.",
      "Identity optimization.",
      "Web and product applications.",
      "Brand guidelines."
    ],
    priceLabel: "From",
    price: "price to be defined based on scope."
  }
];

const enConditions03 = [
  "The service may include naming, but it must be defined as an additional scope if deep exploration is required.",
  "The creation of massive assets for social networks, campaigns, or continuous content is not included unless specifically agreed upon.",
  "Full website design can be considered an additional service.",
  "The client must provide brand info, references, goals, and existing restrictions.",
  "Rounds of revisions must be defined in advance.",
  "Delivery may include editable files, exported versions, and a basic usage guide."
];

const enValue03 = [
  { title: "Increases brand trust", description: "A professional identity improves the business perception." },
  { title: "Improves differentiation", description: "Helps stand out from competitors with a clear visual proposal." },
  { title: "Streamlines communication", description: "Defines criteria to communicate consistently." },
  { title: "Facilitates creating digital assets", description: "Delivers a reusable visual system for web, social, product, and pitches." },
  { title: "Connects brand and experience", description: "Aligns visual identity, tone, interface, and relationship with users." },
  { title: "Prepares the brand to scale", description: "Allows growing with a coherent visual and strategic foundation." }
];

// ForWho translations
const enForWho01 = [
  "Startups needing to design or improve their digital product.",
  "Companies looking to optimize platforms, websites, apps, or internal systems.",
  "Product leaders needing clarity to make decisions.",
  "Tech teams requiring better UX/UI definitions before development.",
  "Agencies needing specialized support in user experience.",
  "Organizations looking to improve the usability, conversion, or satisfaction of their users."
];

const enForWho02 = [
  "Startups needing to launch an MVP quickly.",
  "Companies wanting to validate a new idea before investing in full development.",
  "Founders who need to show a functional version to users, partners, or investors.",
  "Innovation teams requiring prototypes for internal pilots.",
  "Agencies or consultancies needing support to materialize digital products.",
  "Product teams wanting to accelerate proofs of concept."
];

const enForWho03 = [
  "Startups needing to create their identity from scratch.",
  "Companies wanting to revamp or professionalize their brand.",
  "Digital products needing their own identity.",
  "Consultancies, agencies, or professional services looking to stand out.",
  "Entrepreneurs needing a more solid digital presence.",
  "Teams wanting to organize their visual and verbal communication."
];

// Update item 0
enData.services.items[0].forWho = enForWho01;
enData.services.items[0].value = enValue01;
enData.services.items[0].process = enProcess01;
enData.services.items[0].plans = enPlans01;
enData.services.items[0].conditions = enConditions01;

// Update item 1
enData.services.items[1].forWho = enForWho02;
enData.services.items[1].value = enValue02;
enData.services.items[1].process = enProcess02;
enData.services.items[1].plans = enPlans02;
enData.services.items[1].conditions = enConditions02;

// Update item 2
enData.services.items[2].forWho = enForWho03;
enData.services.items[2].value = enValue03;
enData.services.items[2].process = enProcess03;
enData.services.items[2].plans = enPlans03;
enData.services.items[2].conditions = enConditions03;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log('en.json updated successfully!');
