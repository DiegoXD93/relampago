import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");
export default function() {
  return {
    sale: {
      client: "Maria Cardenas",
      date: hoy,
      windows: [{
          height: 120,
          width: 180,
          features: ["grating", "handle"],
          price: 120,
          quantity: 4
        },
        {
          height: 120,
          width: 150,
          features: ["order"],
          price: 120,
          quantity: 1
        },
        {
          height: 120,
          width: 150,
          features: ["bath"],
          price: 120,
          quantity: 1
        }
      ],
      doors: [{
        height: 90,
        width: 180,
        features: [],
        price: 120,
        quantity: 1
      }]
    },

    ///////////////////////////////////////////////////////////////
    sales: [{
      client: "Maria Cardenas",
      date: hoy,
      windows: [{
          height: 120,
          width: 180,
          features: ["grating", "handle"],
          price: 120,
          quantity: 4
        },
        {
          height: 120,
          width: 150,
          features: ["order"],
          price: 120,
          quantity: 1
        },
        {
          height: 120,
          width: 150,
          features: ["bath"],
          price: 120,
          quantity: 1
        }
      ],
      doors: [{
        height: 90,
        width: 180,
        features: [],
        price: 120,
        quantity: 1
      }]
    }],
    ///////////////////////////////////////////////////////////////

    windowFeatures: [
      { label: "Mandado", value: "order" },
      { label: "Corrediza", value: "sliding" },
      { label: "Bañera", value: "bath" },
      { label: "Rejas", value: "grating" },
      { label: "Manija", value: "handle" }
    ],
    doorFeatures: [
      { label: "Mandado", value: "order" },
      { label: "Bañera", value: "bath" }
    ],
    editMode: false,
    index: -1
  };
}
