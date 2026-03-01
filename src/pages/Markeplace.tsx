import type { MarketplaceItem } from "../interfaces/types"
import marketplaceData from '../mocks/marketplace.json';

export const Marketplace = () => {
  const items = marketplaceData as MarketplaceItem[];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-20 px-4 pb-10">
      <div className="max-w-300 mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Marketplace</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow">
              <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-3">
                <p className="text-[17px] font-bold text-gray-900 dark:text-gray-100 mb-1">
                  ${item.price.toFixed(2)} {item.currency}
                </p>
                {/* line-clamp-2 evita que títulos muy largos rompan el diseño */}
                <h3 className="text-[15px] font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight">{item.title}</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-2">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}