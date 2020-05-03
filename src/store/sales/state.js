import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");
export default function() {
  return {
    sales: [
      {
        client: "",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
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
      }
    ]
  };
}
