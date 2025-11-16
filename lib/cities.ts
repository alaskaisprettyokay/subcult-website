export interface City {
  name: string
  coordinates: [number, number] // [lng, lat]
  stationName?: string // Station name
  genre?: string // Music genre
  isStation?: boolean // Whether this is a station
}

export const cities: City[] = [
  // UNITED STATES
  { name: 'Elk Grove Village, Illinois', coordinates: [-87.9703, 42.0039], stationName: 'Bassdrive', genre: 'Drum & bass', isStation: true },
  { name: 'Minneapolis, Minnesota', coordinates: [-93.2650, 44.9778], stationName: 'Dogglounge', genre: 'Deep house', isStation: true },
  
  // UNITED KINGDOM
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'Fantasy FM', genre: 'Underground house, techno & rave', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'We get lifted', genre: 'Underground house, melodic techno & trance', isStation: true },
  { name: 'United Kingdom', coordinates: [-2.0, 54.5], stationName: 'UKBassRadio', genre: 'Drum & bass, jungle, old skool', isStation: true },
  
  // GERMANY
  { name: 'Berlin', coordinates: [13.4050, 52.5200], stationName: 'Berlin Beach House Radio', genre: 'Smooth house mixes', isStation: true },
  { name: 'Berlin', coordinates: [13.4050, 52.5200], stationName: 'Sound of Berlin', genre: 'Electronic', isStation: true },
  { name: 'Germany', coordinates: [10.4515, 51.1657], stationName: 'HipHop Classics', genre: 'Hip hop', isStation: true },
  { name: 'Germany', coordinates: [10.4515, 51.1657], stationName: 'Sunshine Live Drum-n-Bass', genre: 'Electronic, drum & bass', isStation: true },
  
  // SPAIN
  { name: 'Ibiza', coordinates: [1.4316, 38.9067], stationName: 'Ibiza Global', genre: 'Electronic music', isStation: true },
  { name: 'Ibiza', coordinates: [1.4316, 38.9067], stationName: 'Mambo', genre: 'House/electronic', isStation: true },
  
  // TURKEY
  { name: 'Istanbul', coordinates: [28.9784, 41.0082], stationName: 'DinamoFM', genre: 'Electronic, indie, urban', isStation: true },
  
  // GREECE
  { name: 'Mykonos', coordinates: [25.3280, 37.4467], stationName: 'Cavo Paradiso', genre: 'Club/electronic music', isStation: true },
  
  // FRANCE
  { name: 'France', coordinates: [2.2137, 46.2276], stationName: 'FIP hiphop', genre: 'Hip hop', isStation: true },
  
  // ROMANIA
  { name: 'Romania', coordinates: [24.9668, 45.9432], stationName: 'Tequila HipHop', genre: 'Romanian hip hop', isStation: true },
  
  // NEW ZEALAND
  { name: 'Auckland', coordinates: [174.7633, -36.8485], stationName: 'Auckland Underground', genre: 'Hip hop, reggae, dancehall, dubstep, drum & bass', isStation: true },
  
  // ADDITIONAL STATIONS
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522], stationName: 'Dublab', genre: 'Experimental/underground', isStation: true },
  { name: 'Berlin', coordinates: [13.4050, 52.5200], stationName: 'Cashmere Radio', genre: 'Experimental electronic', isStation: true },
  { name: 'Berlin', coordinates: [13.4050, 52.5200], stationName: 'Berlin Community Radio', genre: 'Diverse programming', isStation: true },
  { name: 'Brooklyn, New York', coordinates: [-73.9442, 40.6782], stationName: 'The Lot Radio', genre: 'Various genres', isStation: true },
  { name: 'Brooklyn, New York', coordinates: [-73.9442, 40.6782], stationName: 'Newtown Radio', genre: 'Progressive/alternative', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'Worldwide FM', genre: 'Progressive global music', isStation: true },
  { name: 'Global', coordinates: [0, 0], stationName: 'Datafruits', genre: 'Chiptune/electronic', isStation: true },
  { name: 'San Francisco', coordinates: [-122.4194, 37.7749], stationName: 'SomaFM', genre: 'Multiple channels (Groove Salad, etc.)', isStation: true },
  
  // UNITED STATES - ALASKA
  { name: 'Anchorage, Alaska', coordinates: [-149.9003, 61.2181], stationName: 'KNBA 90.3', genre: 'Variety/Native programming', isStation: true },
  
  // UNITED STATES - CALIFORNIA
  { name: 'Santa Rosa, California', coordinates: [-122.7141, 38.4404], stationName: '95.9 The Krush (KRSH)', genre: 'Singer-Songwriter/Adult Alternative', isStation: true },
  { name: 'Lompoc, California', coordinates: [-120.4579, 34.6392], stationName: 'Radio U', genre: 'Rock/Alternative Christian', isStation: true },
  { name: 'Los Angeles', coordinates: [-118.2437, 34.0522], stationName: 'The So Cal Sound (KCSN)', genre: 'Rock/Smart Rock', isStation: true },
  { name: 'Sacramento, California', coordinates: [-121.4944, 38.5816], stationName: 'Family Radio', genre: 'Christian', isStation: true },
  { name: 'Fremont, California', coordinates: [-121.9886, 37.5483], stationName: 'La Tricolor', genre: 'Bollywood/South Asian', isStation: true },
  
  // UNITED STATES - NEW YORK
  { name: 'New York', coordinates: [-74.0060, 40.7128], stationName: 'WNYC', genre: 'Public Radio/NPR', isStation: true },
  { name: 'Mount Kisco, New York', coordinates: [-73.7146, 41.2043], stationName: 'Family Radio East', genre: 'Christian/Talk', isStation: true },
  { name: 'New York', coordinates: [-74.0060, 40.7128], stationName: 'TUDN', genre: 'Sports (Spanish)', isStation: true },
  
  // UNITED STATES - ILLINOIS
  { name: 'Chicago, Illinois', coordinates: [-87.6298, 41.8781], stationName: 'WHPK 88.5', genre: 'College/Freeform', isStation: true },
  
  // UNITED STATES - ARKANSAS
  { name: 'Mountain View, Arkansas', coordinates: [-92.1176, 35.8684], stationName: 'KWMV 88.5', genre: 'Bluegrass/Folk/Country', isStation: true },
  
  // UNITED STATES - KANSAS
  { name: 'Garden City, Kansas', coordinates: [-100.8728, 37.9717], stationName: 'High Plains Public Radio', genre: 'Public/NPR', isStation: true },
  
  // UNITED STATES - NEBRASKA
  { name: 'Waverly, Nebraska', coordinates: [-96.5283, 40.9083], stationName: 'My Bridge Radio', genre: 'Christian', isStation: true },
  { name: 'Lincoln, Nebraska', coordinates: [-96.7026, 40.8136], stationName: 'Nebraska Public Media', genre: 'Public/NPR/Classical', isStation: true },
  
  // UNITED STATES - MONTANA
  { name: 'Havre, Montana', coordinates: [-109.6844, 48.5450], stationName: 'YNOP', genre: 'Christian Network', isStation: true },
  
  // UNITED STATES - WASHINGTON
  { name: 'Tacoma, Washington', coordinates: [-122.4446, 47.2529], stationName: 'Black Information Network', genre: 'News/Talk', isStation: true },
  
  // UNITED STATES - GEORGIA
  { name: 'Atlanta, Georgia', coordinates: [-84.3880, 33.7490], stationName: 'GPB Radio', genre: 'Public Broadcasting', isStation: true },
  
  // UNITED STATES - NORTH DAKOTA
  { name: 'Fargo, North Dakota', coordinates: [-96.7898, 46.8772], stationName: 'Real Presence Radio', genre: 'Catholic', isStation: true },
  
  // UNITED STATES - WYOMING
  { name: 'Laramie, Wyoming', coordinates: [-105.5911, 41.3114], stationName: 'Wyoming Public Radio', genre: 'Public/Classical/Alternative', isStation: true },
  
  // UNITED KINGDOM - ENGLAND
  { name: 'Maidstone, Kent', coordinates: [0.5260, 51.2704], stationName: 'Radio Caroline', genre: 'Rock/Classic Albums', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'BBC World Service', genre: 'News/Talk International', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'BBC Radio 4', genre: 'News/Talk/Drama', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'BBC Radio 1', genre: 'Hits/New Music', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'Unique Radio', genre: 'Urban/Soul/Reggae', isStation: true },
  { name: 'London', coordinates: [-0.1276, 51.5072], stationName: 'Underground Bass', genre: 'Jungle/Drum & Bass', isStation: true },
  
  // UNITED KINGDOM - SCOTLAND
  { name: 'Glasgow, Scotland', coordinates: [-4.2518, 55.8642], stationName: 'Celtic Music Radio', genre: 'Community/Scottish Music', isStation: true },
  
  // CANADA - SASKATCHEWAN
  { name: 'Regina, Saskatchewan', coordinates: [-104.6039, 50.4452], stationName: 'ICI Radio-Canada Première', genre: 'French Public Radio', isStation: true },
  { name: 'Regina, Saskatchewan', coordinates: [-104.6039, 50.4452], stationName: 'CBC Radio One', genre: 'Public Radio/News', isStation: true },
  { name: 'Melfort, Saskatchewan', coordinates: [-104.6177, 52.8567], stationName: 'CJVR', genre: 'Country', isStation: true },
  
  // CANADA - QUEBEC
  { name: 'Rouyn-Noranda, Quebec', coordinates: [-79.0164, 48.2342], stationName: 'Viva', genre: 'Adult Contemporary/Rock', isStation: true },
  { name: 'Montreal, Quebec', coordinates: [-73.5673, 45.5017], stationName: '107.3 Rouge', genre: 'Pop (French)', isStation: true },
  { name: 'Montreal, Quebec', coordinates: [-73.5673, 45.5017], stationName: 'Radio Circulation 730AM', genre: 'Traffic/Sports', isStation: true },
  { name: 'Val-d\'Or, Quebec', coordinates: [-77.7828, 48.1001], stationName: 'O Abitibi', genre: 'Rock/Top 40', isStation: true },
  
  // CANADA - ALBERTA
  { name: 'Peace River, Alberta', coordinates: [-117.2900, 56.2371], stationName: 'KIX FM', genre: 'CHR/Hit Music', isStation: true },
  { name: 'Peace River, Alberta', coordinates: [-117.2900, 56.2371], stationName: 'River Country', genre: 'Country/Rock', isStation: true },
  { name: 'Edmonton, Alberta', coordinates: [-113.4909, 53.5461], stationName: 'CFWE', genre: 'Country/Variety', isStation: true },
  { name: 'Edmonton, Alberta', coordinates: [-113.4909, 53.5461], stationName: 'ICI Radio-Canada Première', genre: 'French Public Radio', isStation: true },
  
  // CANADA - BRITISH COLUMBIA
  { name: 'Vancouver, British Columbia', coordinates: [-123.1216, 49.2827], stationName: 'Fairchild Radio FM 96.1', genre: 'Chinese/Multicultural', isStation: true },
  { name: 'Vancouver, British Columbia', coordinates: [-123.1216, 49.2827], stationName: 'Rock 101', genre: 'Classic Rock', isStation: true },
  
  // CANADA - NEWFOUNDLAND
  { name: 'Mount Pearl, Newfoundland', coordinates: [-52.8053, 47.5162], stationName: 'Lighthouse FM', genre: 'Gospel/Christian', isStation: true },
  
  // CANADA - NOVA SCOTIA
  { name: 'Halifax, Nova Scotia', coordinates: [-63.5752, 44.6488], stationName: 'CBC Radio One', genre: 'Public Radio', isStation: true },
  { name: 'Halifax, Nova Scotia', coordinates: [-63.5752, 44.6488], stationName: 'ICI Radio-Canada Première', genre: 'French Public Radio', isStation: true },
  
  // CANADA - MANITOBA
  { name: 'Winnipeg, Manitoba', coordinates: [-97.1385, 49.8951], stationName: 'CBC Radio One', genre: 'Public Radio', isStation: true },
  { name: 'Winnipeg, Manitoba', coordinates: [-97.1385, 49.8951], stationName: 'ICI Musique', genre: 'French Music', isStation: true },
  
  // CANADA - NEW BRUNSWICK
  { name: 'Saint John, New Brunswick', coordinates: [-66.0628, 45.2733], stationName: 'CBC Radio One', genre: 'Public Radio', isStation: true },
  
  // CANADA - ONTARIO
  { name: 'Thunder Bay, Ontario', coordinates: [-89.2477, 48.3809], stationName: 'CBC Music', genre: 'Canadian Music', isStation: true },
  
  // EUROPE - SPAIN
  { name: 'Madrid, Spain', coordinates: [-3.7038, 40.4168], stationName: 'RNE Radio 3', genre: 'Eclectic/Rock/Folk/Punk/Soul', isStation: true },
  
  // EUROPE - DENMARK
  { name: 'Randers, Denmark', coordinates: [10.0364, 56.4607], stationName: 'World Music Radio (WMR)', genre: 'World Music/Tropical', isStation: true },
  
  // EUROPE - NETHERLANDS
  { name: 'Haarlem, Netherlands', coordinates: [4.6462, 52.3792], stationName: 'Haarlem 105', genre: 'Adult Contemporary', isStation: true },
  { name: 'Hilversum, Netherlands', coordinates: [5.1767, 52.2233], stationName: 'Concertzender Barok', genre: 'Baroque/Classical', isStation: true },
  
  // EUROPE - GERMANY
  { name: 'Berlin', coordinates: [13.4050, 52.5200], stationName: 'Radio Eins (rbb)', genre: 'Adult Alternative', isStation: true },
  { name: 'Bremen, Germany', coordinates: [8.8017, 53.0793], stationName: 'Bremen Zwei', genre: 'Singer-Songwriter', isStation: true },
  
  // EUROPE - AUSTRIA
  { name: 'Vienna, Austria', coordinates: [16.3738, 48.2082], stationName: 'Your Classical MPR', genre: 'Classical', isStation: true },
  
  // SOUTH AMERICA - BRAZIL
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505], stationName: 'Rádio Nativa FM', genre: 'Sertanejo (Brazilian Country)', isStation: true },
  
  // AUSTRALIA
  { name: 'Melbourne, Australia', coordinates: [144.9631, -37.8136], stationName: 'Triple R (3RRR)', genre: 'Community/Independent', isStation: true },
  
  // SPECIALTY/ONLINE STATIONS
  { name: 'Mesa, Arizona', coordinates: [-111.8315, 33.4152], stationName: 'Abiding Radio', genre: 'Bluegrass Hymns/Christian', isStation: true },
  { name: 'Douglas, Isle of Man', coordinates: [-4.4773, 54.1523], stationName: '1Mix Radio', genre: 'Trance', isStation: true },
]

