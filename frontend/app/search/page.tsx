import Header from "./header";
import SearchResult from "./search-result";
import StockSearch from "./stock-search";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      <StockSearch />

      <main className="flex-1 px-4 lg:px-8 py-8">
        <SearchResult />
      </main>
    </div>
  )
}