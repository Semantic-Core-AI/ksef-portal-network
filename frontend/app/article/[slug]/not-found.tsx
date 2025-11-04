import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FileQuestion className="h-24 w-24 text-[#9CA3AF] mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-[#111827] mb-4">Artykuł nie znaleziony</h1>
        <p className="text-lg text-[#6B7280] mb-8">
          Nie mogliśmy znaleźć artykułu, którego szukasz. Możliwe że został usunięty lub przeniesiony.
        </p>
        <Link
          href="/baza-wiedzy"
          className="inline-block px-6 py-3 bg-[#2C6AA8] hover:bg-[#235587] text-white font-semibold rounded-lg transition-colors shadow-soft"
        >
          Wróć do bazy wiedzy
        </Link>
      </div>
    </div>
  )
}
