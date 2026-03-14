export const fetchComponents = () => {
  return Promise.resolve([
    { id: 1, name: "Resistor", symbol: "Ω", description: "Limits current flow" },
    { id: 2, name: "Capacitor", symbol: "C", description: "Stores electric charge" },
    { id: 3, name: "Diode", symbol: "▶|", description: "One-way current gate" },
    { id: 4, name: "Transistor", symbol: "T", description: "Amplifies or switches signals" },
    { id: 5, name: "Inductor", symbol: "L", description: "Stores energy magnetically" },
    { id: 6, name: "LED", symbol: "⬡", description: "Emits light when forward biased" },
  ]);
};
