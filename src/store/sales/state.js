import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");
export default function() {
  return {
    salesEdited: [
      {
        client: "Jose Orozco",
        date: hoy,
        windows: [
          {
            height: 110,
            width: 180,
            features: ["handle"],
            price: 120,
            quantity: 2
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 4
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
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
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 4
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: ["order", "bath"],
            price: 120,
            quantity: 1
          }
        ]
      }
    ],
    salesDefault: [
      {
        client: "Jose Orozco",
        date: hoy,
        windows: [
          {
            height: 110,
            width: 180,
            features: ["handle"],
            price: 120,
            quantity: 2
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 4
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
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
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      {
        client: "Carlos Maldonado",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 4
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: ["order", "bath"],
            price: 120,
            quantity: 1
          }
        ]
      }
    ],
    saleEdited: {
      client: "",
      date: hoy,
      windows: [
        {
          height: 120,
          width: 180,
          features: ["handle"],
          price: 120,
          quantity: 2
        },
        {
          height: 120,
          width: 150,
          features: ["order", "handle"],
          price: 120,
          quantity: 1
        }
      ],
      doors: [
        {
          height: 90,
          width: 180,
          features: [],
          price: 120,
          quantity: 1
        }
      ]
    },
    saleDefault: {
      client: "",
      date: hoy,
      windows: [
        {
          height: 120,
          width: 150,
          features: ["order", "handle"],
          price: 120,
          quantity: 1
        }
      ],
      doors: []
    },
    windowFeatures: [
      { label: "Mandado", value: "order" },
      { label: "Corrediza", value: "sliding" },
      { label: "Bañera", value: "bath" },
      { label: "Rejas", value: "grating" },
      { label: "Manija", value: "handle" }
    ],
    windowEdited: {
      height: 120,
      width: 180,
      features: [],
      price: 120,
      quantity: 4
    },
    windowDefault: {
      height: 0,
      width: 0,
      features: [],
      price: 0,
      quantity: 0
    },
    doorFeatures: [
      { label: "Mandado", value: "order" },
      { label: "Bañera", value: "bath" }
    ],
    doorEdited: {
      height: 180,
      width: 60,
      features: [],
      price: 190,
      quantity: 4
    },
    doorDefault: {
      height: 0,
      width: 0,
      features: [],
      price: 0,
      quantity: 0
    },
    editMode: false,
    indexSale: -1
  };
}
