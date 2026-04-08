import { Placeholder } from './Placeholder'

interface PassagePageProps {
  showPlaceholder?: boolean
}

export function PassagePage1() {
  return <PassageContent title="The Science of Ocean Currents" id="passage1" />
}

export function PassagePage2() {
  return <PassageContent title="Advances in Renewable Energy" id="passage2" showPlaceholder />
}

export function PassagePage3() {
  return <PassageContent title="The History of Cartography" id="passage3" />
}

function PassageContent({
  title,
  id,
  showPlaceholder,
}: PassagePageProps & { title: string; id: string }) {
  return (
    <article className="mx-auto max-w-[800px] pb-16">
      <h1 className="mb-6 text-[1.6rem] font-bold leading-tight">{title}</h1>

      <p className="mb-4">
        {id === 'passage1' &&
          'The world\'s oceans are in constant motion, driven by a complex interplay of wind, temperature, salinity, and the rotation of the Earth. These currents, both surface and deep, play a crucial role in regulating global climate patterns and distributing heat across the planet. Without ocean currents, the temperature differences between the equator and the poles would be far more extreme, making much of the Earth uninhabitable.'}
        {id === 'passage2' &&
          'The transition to renewable energy sources represents one of the most significant technological and economic shifts in modern history. As concerns about climate change intensify and fossil fuel reserves diminish, nations around the world are investing heavily in solar, wind, hydroelectric, and geothermal power. These investments are not only reshaping energy markets but also transforming landscapes and communities.'}
        {id === 'passage3' &&
          'Maps have been essential tools for human civilization since antiquity. From the earliest clay tablets of Mesopotamia to the sophisticated digital mapping systems of today, the art and science of cartography has evolved dramatically. The history of mapmaking is not merely a technical story—it is a narrative deeply intertwined with exploration, conquest, trade, and the human desire to understand the world.'}
      </p>

      <h2 className="mb-3 mt-8 text-[1.2rem] font-semibold">Background and Context</h2>

      <p className="mb-4">
        {id === 'passage1' &&
          'Surface currents are primarily driven by prevailing winds and affect roughly the top 400 meters of the ocean. The trade winds near the equator push water westward, while the westerlies at higher latitudes push water eastward. The Coriolis effect, caused by the Earth\'s rotation, deflects these currents—to the right in the Northern Hemisphere and to the left in the Southern Hemisphere—creating large circular patterns known as gyres.'}
        {id === 'passage2' &&
          'Solar energy has seen the most dramatic cost reductions of any renewable technology. The price of photovoltaic panels has dropped by more than 90% since 2010, making solar power competitive with—and in many cases cheaper than—electricity generated from coal or natural gas. This cost revolution has been driven by improvements in manufacturing processes, economies of scale, and supportive government policies including tax credits and feed-in tariffs.'}
        {id === 'passage3' &&
          'The earliest known maps date back approximately 5,000 years to ancient Babylon, where clay tablets depicted local geographic features such as rivers, valleys, and settlements. The ancient Greeks made significant advances in cartographic science, with scholars like Eratosthenes calculating the circumference of the Earth with remarkable accuracy and Ptolemy creating a comprehensive atlas of the known world that would influence mapmakers for over a millennium.'}
      </p>

      <p className="mb-4">
        {id === 'passage1' &&
          'Deep ocean currents, also known as thermohaline circulation, are driven by differences in water density caused by variations in temperature and salinity. Cold, salty water is denser and sinks to the ocean floor, particularly in the North Atlantic near Greenland and in the Southern Ocean around Antarctica. This sinking water initiates a global conveyor belt that slowly moves water through all the world\'s ocean basins over a period of roughly 1,000 years.'}
        {id === 'passage2' &&
          'Wind energy has similarly experienced substantial growth. Modern wind turbines are engineering marvels—the largest offshore turbines now stand over 260 meters tall with blade spans exceeding 220 meters, capable of generating enough electricity to power thousands of homes. Offshore wind farms, in particular, have become a major focus of development in Europe and are gaining momentum in North America and Asia.'}
        {id === 'passage3' &&
          'During the medieval period, European mapmaking was heavily influenced by religious worldviews. The famous Mappa Mundi, created around 1300, placed Jerusalem at the center of the world and depicted the Earth as a flat disc divided into three continents. Meanwhile, Islamic cartographers like al-Idrisi were producing far more geographically accurate maps based on extensive travel accounts and astronomical observations.'}
      </p>

      {showPlaceholder && <Placeholder />}

      <h2 className="mb-3 mt-8 text-[1.2rem] font-semibold">Key Findings</h2>

      <p className="mb-4">
        {id === 'passage1' &&
          'Recent research has revealed that ocean currents are changing in response to global warming. The Atlantic Meridional Overturning Circulation (AMOC), a critical component of the ocean conveyor belt that transports warm water from the tropics to the North Atlantic, has weakened by approximately 15% since the mid-20th century. Scientists warn that continued weakening could have profound effects on weather patterns in Europe and North America, potentially leading to more extreme winters and disrupted monsoon systems.'}
        {id === 'passage2' &&
          'Battery storage technology has emerged as a critical complement to variable renewable energy sources. Lithium-ion battery costs have fallen by nearly 90% over the past decade, enabling large-scale energy storage systems that can smooth out the intermittent nature of solar and wind power. Grid-scale battery installations are being deployed worldwide, from the massive Hornsdale Power Reserve in South Australia to numerous projects across California and Texas.'}
        {id === 'passage3' &&
          'The Age of Exploration in the 15th and 16th centuries revolutionized cartography. As European explorers ventured to previously unknown lands, the demand for accurate navigation charts drove rapid improvements in mapmaking techniques. The Mercator projection, introduced in 1569, became the standard for nautical navigation because it represented lines of constant compass bearing as straight lines, making it invaluable for plotting sailing routes.'}
      </p>

      <p className="mb-4">
        {id === 'passage1' &&
          'Moreover, the warming of ocean waters is affecting marine ecosystems in numerous ways. Coral reefs, which depend on specific temperature ranges, are experiencing mass bleaching events with increasing frequency. Changes in current patterns are also altering the distribution of nutrients and plankton, with cascading effects throughout the food web that impact fisheries and marine biodiversity on a global scale.'}
        {id === 'passage2' &&
          'Hydrogen fuel technology represents another frontier in the renewable energy landscape. Green hydrogen, produced by splitting water molecules using renewable electricity, has the potential to decarbonize sectors that are difficult to electrify, such as heavy industry, long-haul transportation, and aviation. Several countries, including Germany, Japan, and Australia, have launched ambitious national hydrogen strategies with billions of dollars in planned investments.'}
        {id === 'passage3' &&
          'The 18th and 19th centuries saw the rise of scientific cartography, characterized by systematic surveying and triangulation methods. The Great Trigonometrical Survey of India, which began in 1802 and continued for several decades, was one of the most ambitious mapping projects ever undertaken. It not only produced detailed maps of the Indian subcontinent but also achieved the first accurate measurement of the height of Mount Everest.'}
      </p>

      <h2 className="mb-3 mt-8 text-[1.2rem] font-semibold">Implications and Future Directions</h2>

      <p className="mb-4">
        {id === 'passage1' &&
          'Understanding and monitoring ocean currents has become increasingly important as the planet continues to warm. Advanced satellite systems, autonomous underwater vehicles, and networks of deep-sea sensors are providing unprecedented data about ocean circulation patterns. These observations are critical for improving climate models and predicting how changes in ocean currents will affect weather patterns, sea levels, and marine ecosystems in the coming decades.'}
        {id === 'passage2' &&
          'The renewable energy transition faces significant challenges alongside its remarkable progress. Grid infrastructure must be modernized to accommodate distributed and variable generation sources. Supply chains for critical minerals used in batteries, solar panels, and wind turbines need to be diversified and made more sustainable. Workforce development programs are essential to train the millions of workers needed in new clean energy industries while supporting communities that have historically depended on fossil fuel extraction.'}
        {id === 'passage3' &&
          'Today, cartography has been transformed by digital technology and satellite imagery. Geographic Information Systems (GIS) allow for the creation of dynamic, layered maps that can display multiple types of data simultaneously. Global Positioning System (GPS) technology has made precise location data available to anyone with a smartphone. Yet even as mapping technology becomes ever more sophisticated, the fundamental purpose of cartography remains the same: to help humans understand and navigate their world.'}
      </p>

      <p className="mb-4">
        {id === 'passage1' &&
          'The interconnected nature of ocean circulation means that changes in one region can have far-reaching consequences elsewhere. For instance, the melting of Arctic ice sheets introduces fresh water into the North Atlantic, potentially disrupting the formation of the dense, cold water masses that drive deep ocean currents. As researchers continue to study these complex systems, it becomes increasingly clear that the health of our oceans is intimately linked to the stability of our climate and the well-being of human societies around the globe.'}
        {id === 'passage2' &&
          'Looking ahead, the integration of artificial intelligence and machine learning into energy systems promises to optimize the generation, distribution, and consumption of renewable energy. Smart grids that can dynamically balance supply and demand, predictive maintenance systems that reduce downtime for wind turbines and solar installations, and AI-driven energy management in buildings and factories are all areas of active development that will shape the future of the clean energy economy.'}
        {id === 'passage3' &&
          'Looking forward, the convergence of artificial intelligence, remote sensing, and real-time data streams is creating new possibilities for cartography. Machine learning algorithms can process vast amounts of satellite imagery to detect changes in land use, track urban growth, and monitor environmental degradation. Crowdsourced mapping initiatives like OpenStreetMap are democratizing cartographic production, while augmented reality applications are blurring the line between maps and the physical world they represent.'}
      </p>
    </article>
  )
}
