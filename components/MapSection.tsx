'use client'

import { useRef, useState } from 'react'
import Map, { Marker, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cities, City } from '@/lib/cities'
import { toast } from 'sonner'
import clsx from 'clsx'

interface MapSectionProps {
  fullscreen?: boolean
}

export default function MapSection({ fullscreen = false }: MapSectionProps) {
  const mapRef = useRef<MapRef>(null)
  const [interactive, setInteractive] = useState(false)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50">Mapbox token not configured</p>
        </div>
      </section>
    )
  }

  const handleMarkerClick = (city: City) => {
    toast.info('Private beta — request an invite to access.')
  }

  const enableInteraction = () => {
    if (!interactive && mapRef.current) {
      setInteractive(true)
      const map = mapRef.current.getMap()
      // Enable map interactions but keep scrollZoom disabled to allow page scrolling
      // Users can still drag to pan and use double-click to zoom
      map.scrollZoom.disable() // Keep disabled so page scrolling works
      map.dragPan.enable()
      map.boxZoom.enable()
      map.doubleClickZoom.enable()
      // Enable touch interactions for mobile
      map.touchZoomRotate.enable()
      map.touchPitch.enable()
    }
  }

  const mapContent = (
    <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
      <div
        className={clsx(
          'absolute inset-0 z-10 flex items-center justify-center',
          'bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          interactive && 'opacity-0 pointer-events-none'
        )}
        onClick={enableInteraction}
        onTouchStart={enableInteraction}
      >
        <div className="text-center px-4 py-6 sm:p-8">
          <p className="text-white text-base sm:text-lg mb-2">explore local scenes</p>
          <p className="text-white/60 text-xs sm:text-sm">Tap to explore • Scroll to continue</p>
        </div>
      </div>

      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: -40,
          latitude: 5,
          zoom: 1.7,
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: fullscreen ? '100dvh' : '600px'
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onLoad={() => {
          if (mapRef.current) {
            const map = mapRef.current.getMap()
            map.scrollZoom.disable()
            map.dragPan.disable()
            map.boxZoom.disable()
            map.doubleClickZoom.disable()
            map.touchZoomRotate.disable()
            
            // Remove Mapbox logo and attribution
            const logo = map.getContainer().querySelector('.mapboxgl-ctrl-logo')
            if (logo) {
              logo.remove()
            }
            const attribution = map.getContainer().querySelector('.mapboxgl-ctrl-attrib')
            if (attribution) {
              attribution.remove()
            }
          }
        }}
        interactive={interactive}
        scrollZoom={false}
        attributionControl={false}
        logoPosition="bottom-right"
      >
        {cities.map((city) => (
          <Marker
            key={city.name}
            longitude={city.coordinates[0]}
            latitude={city.coordinates[1]}
            anchor="center"
          >
            <div
              className="relative cursor-pointer group"
              onClick={() => handleMarkerClick(city)}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              aria-label={`${city.name} marker`}
            >
              <div className="absolute inset-0 animate-pulse-slow bg-white/20 rounded-full blur-md" />
              <div className="relative w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 border-white/30 shadow-lg" />
              {hoveredCity === city.name && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 bg-black/90 text-white text-xs sm:text-sm rounded-lg whitespace-nowrap pointer-events-none z-50">
                  {city.name}
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  )

  if (fullscreen) {
    return (
      <div className="absolute inset-0 w-full h-full map-fullscreen">
        {mapContent}
      </div>
    )
  }

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
            Communities lighting up worldwide
          </h2>
          <p className="text-white/60 text-base sm:text-lg px-4">
            Pins indicate early scenes. Details coming soon.
          </p>
        </div>

        <div className="relative rounded-lg sm:rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
          {mapContent}
        </div>
      </div>
    </section>
  )
}

