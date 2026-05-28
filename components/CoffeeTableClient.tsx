"use client"

import { CoffeeRecord } from "@/types/coffee"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table"
import { useState } from "react"
import { Input } from "./ui/input"
import { useRouter, useSearchParams } from "next/navigation"

export default function CoffeeTableClient({ data }: { data: CoffeeRecord[] }){

    // const [countryFilter, setCountryFilter] = useState("")
    // const [genderFilter, setGenderFilter] = useState("")
    // const [sleepQualityFilter, setSleepQualityFilter] = useState("")
    // const [stressLevelFilter, setStressLevelFilter] = useState("")

    // const filteredData = data.filter((row) => 
       // row.Country.includes(countryFilter) &&
        // row.Gender.includes(genderFilter) &&
        // row.Sleep_Quality.includes(sleepQualityFilter) &&
        // row.Stress_Level.includes(stressLevelFilter))

        const router = useRouter()
        const searchParams = useSearchParams()

        function updateFilter(key: string, value: string) {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            router.push(`/coffee?${params.toString()}`)
        }

    return (

        <>
            <Input placeholder="Country" value={searchParams.get("country") ?? ""} onChange={(e) => updateFilter("country", e.target.value)}></Input>
            <select value={searchParams.get("gender") ?? ""} onChange={(e) => updateFilter("gender", e.target.value)}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select value={searchParams.get("sleepQuality") ?? ""} onChange={(e) => updateFilter("sleepQuality", e.target.value)}>
                <option value="">Sleep quality</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Excellent">Excellent</option>
                <option value="Poor">Poor</option>
            </select>
            <select value={searchParams.get("stressLevel") ?? ""} onChange={(e) => updateFilter("stressLevel", e.target.value)}>
                <option value="">Stress level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <Input placeholder="Minimum heart rate" value={searchParams.get("heartRateMin") ?? ""} onChange={(e) => updateFilter("heartRateMin", e.target.value)}></Input>
            <Input placeholder="Maximum heart rate" value={searchParams.get("heartRateMax") ?? ""} onChange={(e) => updateFilter("heartRateMax", e.target.value)}></Input>
            <Input placeholder="Minimum coffee intake" value={searchParams.get("coffeeIntakeMin") ?? ""} onChange={(e) => updateFilter("coffeeIntakeMin", e.target.value)}></Input>
            <Input placeholder="Maximum coffee intake" value={searchParams.get("coffeeIntakeMax") ?? ""} onChange={(e) => updateFilter("coffeeIntakeMax", e.target.value)}></Input>
            <Input placeholder="Minimum physical activity hours" value={searchParams.get("physicalActivityHoursMin") ?? ""} onChange={(e) => updateFilter("physicalActivityHoursMin", e.target.value)}></Input>
            <Input placeholder="Maximum physical activity hours" value={searchParams.get("physicalActivityHoursMax") ?? ""} onChange={(e) => updateFilter("physicalActivityHoursMax", e.target.value)}></Input>


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Sleep Quality</TableHead>
                        <TableHead>Stress Level</TableHead>
                        <TableHead>Heart Rate</TableHead>
                        <TableHead>Coffee Intake</TableHead>
                        <TableHead>Physical Activity Hours</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.Country}</TableCell>
                                <TableCell>{row.Gender}</TableCell>
                                <TableCell>{row.Sleep_Quality}</TableCell>
                                <TableCell>{row.Stress_Level}</TableCell>
                                <TableCell>{row.Heart_Rate}</TableCell>
                                <TableCell>{row.Coffee_Intake}</TableCell>
                                <TableCell>{row.Physical_Activity_Hours}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}