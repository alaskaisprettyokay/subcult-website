export interface City {
  name: string
  coordinates: [number, number] // [lng, lat]
}

export const cities: City[] = [
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505] },
  { name: 'Buenos Aires', coordinates: [-58.3816, -34.6037] },
  { name: 'Barcelona', coordinates: [2.1686, 41.3874] },
  { name: 'Berlin', coordinates: [13.4050, 52.5200] },
  { name: 'London', coordinates: [-0.1276, 51.5072] },
  { name: 'New York', coordinates: [-74.0060, 40.7128] },
  { name: 'Mexico City', coordinates: [-99.1332, 19.4326] },
  { name: 'Lisbon', coordinates: [-9.1393, 38.7223] },
  { name: 'Tbilisi', coordinates: [44.8271, 41.7151] },
  { name: 'Tokyo', coordinates: [139.6503, 35.6762] },
  { name: 'San Francisco', coordinates: [-122.4194, 37.7749] },
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522] },
  { name: 'Zanzibar', coordinates: [39.1990, -6.1650] },
]

