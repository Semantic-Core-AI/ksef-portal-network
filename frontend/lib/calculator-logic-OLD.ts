export interface CalculatorInputs {
  revenue: number
  invoiceVolume: number
  scenario?: 'conservative' | 'realistic' | 'optimistic' // Nowa opcja!
}

export interface CalculatorResults {
  // Disaster phase
  fines: number
  timeWasted: number
  vatDelays: number
  opportunityCost: number
  accountingCost: number // NOWE!
  totalLosses: number

  // Solution phase
  implementationCost: number
  savings: number
  roi: number
  roiPercentage: number

  // Timeline projections
  savings6Months: number
  savings1Year: number
  savings3Years: number

  // Breakdown details (dla transparency)
  breakdown: {
    finesDetails: string
    timeDetails: string
    vatDetails: string
    opportunityDetails: string
    accountingDetails: string
  }
}

// Parametry scenariuszy
const SCENARIO_PARAMS = {
  conservative: {
    name: 'Konserwatywny',
    description: 'Minimalne, bezpieczne szacunki',
    hoursPerInvoice: 0.10, // 6 minut
    hourlyRate: 100,
    fineFrequency: 0.3, // 30% ryzyka kary
    vatDelayRate: 0.003, // 0.3% od VAT
    managementTimeMultiplier: 0.8,
    accountingTimePerInvoice: 0.03, // 2 minuty
  },
  realistic: {
    name: 'Realistyczny',
    description: 'Średnie wartości rynkowe',
    hoursPerInvoice: 0.15, // 9 minut
    hourlyRate: 120,
    fineFrequency: 0.5, // 50% ryzyka kary
    vatDelayRate: 0.005, // 0.5% od VAT
    managementTimeMultiplier: 1.0,
    accountingTimePerInvoice: 0.05, // 3 minuty
  },
  optimistic: {
    name: 'Optymistyczny',
    description: 'Wyższe szacunki korzyści',
    hoursPerInvoice: 0.20, // 12 minut
    hourlyRate: 140,
    fineFrequency: 0.7, // 70% ryzyka kary
    vatDelayRate: 0.008, // 0.8% od VAT
    managementTimeMultiplier: 1.2,
    accountingTimePerInvoice: 0.08, // 5 minut
  },
}

export function calculateKSEFImpact(inputs: CalculatorInputs): CalculatorResults {
  const { revenue, invoiceVolume, scenario = 'realistic' } = inputs
  const params = SCENARIO_PARAMS[scenario]

  // 1. KARY - Realistyczne (oparte na częstotliwości naruszeń)
  // Zakładamy że firma może dostać karę za nieprawidłowe faktury
  const estimatedViolations = Math.floor((invoiceVolume * 12 * params.fineFrequency) / 100)
  const maxViolations = 6 // Max 6 kar rocznie (realistyczne)
  const actualViolations = Math.min(estimatedViolations, maxViolations)
  const finePerViolation = 500 // 500 PLN za naruszenie (art. 109 KSeF)
  const fines = actualViolations * finePerViolation

  const finesDetails = `${actualViolations} naruszeń × ${finePerViolation} PLN = ${fines} PLN/rok`

  // 2. STRACONY CZAS - Oszczędności czasu na fakturę
  // KSeF pozwala zaoszczędzić czas na: wprowadzanie, weryfikację, archiwizację
  const annualInvoices = invoiceVolume * 12
  const timeWasted = annualInvoices * params.hoursPerInvoice * params.hourlyRate

  const timeDetails = `${annualInvoices} faktur × ${params.hoursPerInvoice}h × ${params.hourlyRate} PLN/h = ${Math.round(timeWasted)} PLN/rok`

  // 3. OPÓŹNIENIA VAT - Odsetki od opóźnionego VAT
  // Koszt wynika z problemów z rozliczeniem VAT bez automatyzacji
  const avgVATAmount = revenue * 0.23 // VAT 23%
  const vatDelays = avgVATAmount * params.vatDelayRate

  const vatDetails = `${Math.round(avgVATAmount)} PLN VAT × ${(params.vatDelayRate * 100).toFixed(1)}% = ${Math.round(vatDelays)} PLN/rok`

  // 4. KOSZT ALTERNATYWNY - Czas zarządu na problemy
  // Założenie: problemy z księgowością zabierają czas zarządu
  const baseManagementHours = Math.min(invoiceVolume / 50, 40) // Max 40h/rok
  const managementTimeHours = baseManagementHours * params.managementTimeMultiplier
  const managementRate = 500 // 500 PLN/h dla zarządu/dyrektora
  const opportunityCost = managementTimeHours * managementRate

  const opportunityDetails = `${Math.round(managementTimeHours)}h zarządu × ${managementRate} PLN/h = ${Math.round(opportunityCost)} PLN/rok`

  // 5. DODATKOWE KOSZTY KSIĘGOWE
  // Czas księgowych na dodatkową weryfikację i poprawki
  const accountingExtraTime = annualInvoices * params.accountingTimePerInvoice * 100
  const accountingCost = accountingExtraTime

  const accountingDetails = `${annualInvoices} faktur × ${params.accountingTimePerInvoice}h × 100 PLN/h = ${Math.round(accountingCost)} PLN/rok`

  // Total losses
  const totalLosses = fines + timeWasted + vatDelays + opportunityCost + accountingCost

  // Implementation cost - progresywny z wielkością firmy
  const baseImplementationCost = calculateImplementationCost(revenue, invoiceVolume)
  const implementationCost = baseImplementationCost

  // Savings and ROI
  const savings = totalLosses - implementationCost
  const roi = savings / implementationCost
  const roiPercentage = roi * 100

  // Timeline projections
  // Zakładamy że wdrożenie trwa 2 miesiące, więc pierwsze 6 miesięcy to tylko 4 miesiące oszczędności
  const savings6Months = (totalLosses / 12) * 4 - implementationCost
  const savings1Year = savings
  const savings3Years = totalLosses * 3 - implementationCost

  return {
    fines,
    timeWasted,
    vatDelays,
    opportunityCost,
    accountingCost,
    totalLosses,
    implementationCost,
    savings,
    roi,
    roiPercentage,
    savings6Months,
    savings1Year,
    savings3Years,
    breakdown: {
      finesDetails,
      timeDetails,
      vatDetails,
      opportunityDetails,
      accountingDetails,
    },
  }
}

// Realistyczna kalkulacja kosztu wdrożenia
function calculateImplementationCost(revenue: number, invoiceVolume: number): number {
  // Podstawa zależy od wielkości firmy
  let baseCost = 8000 // Minimalna cena dla mikrofirm

  if (revenue > 50000000) {
    baseCost = 25000 // Duże firmy
  } else if (revenue > 10000000) {
    baseCost = 15000 // Średnie firmy
  } else if (revenue > 2000000) {
    baseCost = 10000 // Małe firmy
  }

  // Dodatkowy koszt za wolumen faktur
  const volumeMultiplier = Math.min(invoiceVolume / 100, 20) // Max 20x
  const volumeCost = volumeMultiplier * 500

  // Dodatkowy koszt za integracje (założenie: 1 integracja na 5M obrotu)
  const integrationCost = Math.floor(revenue / 5000000) * 2000

  const totalCost = baseCost + volumeCost + integrationCost

  // Maksymalny koszt 50k dla największych firm
  return Math.min(totalCost, 50000)
}

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function getScenarioInfo(scenario: 'conservative' | 'realistic' | 'optimistic') {
  return SCENARIO_PARAMS[scenario]
}

// Funkcja porównująca scenariusze
export function compareScenarios(
  revenue: number,
  invoiceVolume: number
): {
  conservative: CalculatorResults
  realistic: CalculatorResults
  optimistic: CalculatorResults
} {
  return {
    conservative: calculateKSEFImpact({ revenue, invoiceVolume, scenario: 'conservative' }),
    realistic: calculateKSEFImpact({ revenue, invoiceVolume, scenario: 'realistic' }),
    optimistic: calculateKSEFImpact({ revenue, invoiceVolume, scenario: 'optimistic' }),
  }
}

// Eksport typów dla łatwiejszego użycia
export type Scenario = 'conservative' | 'realistic' | 'optimistic'
export const SCENARIOS: Scenario[] = ['conservative', 'realistic', 'optimistic']
