import { createClient } from "@/lib/supabase/server"
import { Suspense } from "react"
import { CoffeeRecord } from "@/types/coffee"
import CoffeeTableClient from "@/components/CoffeeTableClient"

export async function CoffeeTable({ searchParams }:
    { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const params = await searchParams
    const country = params.country ?? ""
    const gender = params.gender ?? ""
    const sleepQuality = params.sleepQuality ?? ""
    const stressLevel = params.stressLevel ?? ""
    const heartRateMin = params.heartRateMin ?? ""
    const heartRateMax = params.heartRateMax ?? ""
    const coffeeIntakeMin = params.coffeeIntakeMin ?? ""
    const coffeeIntakeMax = params.coffeeIntakeMax ?? ""
    const physicalActivityHoursMin = params.physicalActivityHoursMin ?? ""
    const physicalActivityHoursMax = params.physicalActivityHoursMax ?? ""

    const client = await createClient()
    let query = client.from("coffee_health").select().ilike("Country", `%${country}%`)
    if (gender) query = query.eq("Gender", gender)
    if (sleepQuality) query = query.eq("Sleep_Quality", sleepQuality)
    if (stressLevel) query = query.eq("Stress_Level", stressLevel)
    if (heartRateMin) query = query.gte("Heart_Rate", heartRateMin)
    if (heartRateMax) query = query.lte("Heart_Rate", heartRateMax)
    if (coffeeIntakeMin) query = query.gte("Coffee_Intake", coffeeIntakeMin)
    if (coffeeIntakeMax) query = query.lte("Coffee_Intake", coffeeIntakeMax)
    if (physicalActivityHoursMin) query = query.gte("Physical_Activity_Hours", physicalActivityHoursMin)
    if (physicalActivityHoursMax) query = query.lte("Physical_Activity_Hours", physicalActivityHoursMax)

    query = query.range(0, 99)

    const response = await query
    const data = response.data as CoffeeRecord[]
    
    return (
        <CoffeeTableClient data={ data }></CoffeeTableClient>
    )
}

export default async function Coffee({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CoffeeTable searchParams={ searchParams }></CoffeeTable>
        </Suspense>
    )
}