"use client"

import { CoffeeRecord } from "@/types/coffee"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"

export default function CoffeeTableClient({ data }: { data: CoffeeRecord[] }){

    const [countryFilter, setCountryFilter] = useState("")
    const [genderFilter, setGenderFilter] = useState("")
    const [sleepQualityFilter, setSleepQualityFilter] = useState("")
    const [stressLevelFilter, setStressLevelFilter] = useState("")
    const [heartRateMin, setHeartRateMin] = useState("")
    const [heartRateMax, setHeartRateMax] = useState("")
    const [coffeeIntakeMin, setCoffeeIntakeMin] = useState("")
    const [coffeeIntakeMax, setCoffeeIntakeMax] = useState("")
    const [physicalActivityHoursMin, setPhysicalActivityHoursMin] = useState("")
    const [physicalActivityHoursMax, setPhysicalActivityHoursMax] = useState("")

        const router = useRouter()

        function applyFilters() {
            const params = new URLSearchParams()
            if (countryFilter) params.set("country", countryFilter)
            if (genderFilter) params.set("gender", genderFilter)
            if (sleepQualityFilter) params.set("sleepQuality", sleepQualityFilter)
            if (stressLevelFilter) params.set("stressLevel", stressLevelFilter)
            if (heartRateMin) params.set("heartRateMin", heartRateMin)
            if (heartRateMax) params.set("heartRateMax", heartRateMax)
            if (coffeeIntakeMin) params.set("coffeeIntakeMin", coffeeIntakeMin)
            if (coffeeIntakeMax) params.set("coffeeIntakeMax", coffeeIntakeMax)
            if (physicalActivityHoursMin) params.set("physicalActivityHoursMin",
                physicalActivityHoursMin)
            if (physicalActivityHoursMax) params.set("physicalActivityHoursMax",
                physicalActivityHoursMax)

            router.push(`/coffee?${params.toString()}`)
        }

    return (

        <>
            <Input placeholder="Country" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}></Input>
            <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select value={sleepQualityFilter} onChange={(e) => setSleepQualityFilter(e.target.value)}>
                <option value="">Sleep quality</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Excellent">Excellent</option>
                <option value="Poor">Poor</option>
            </select>
            <select value={stressLevelFilter} onChange={(e) => setStressLevelFilter(e.target.value)}>
                <option value="">Stress level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <Input placeholder="Minimum heart rate" value={heartRateMin} onChange={(e) => setHeartRateMin(e.target.value)}></Input>
            <Input placeholder="Maximum heart rate" value={heartRateMax} onChange={(e) => setHeartRateMax(e.target.value)}></Input>
            <Input placeholder="Minimum coffee intake" value={coffeeIntakeMin} onChange={(e) => setCoffeeIntakeMin(e.target.value)}></Input>
            <Input placeholder="Maximum coffee intake" value={coffeeIntakeMax} onChange={(e) => setCoffeeIntakeMax(e.target.value)}></Input>
            <Input placeholder="Minimum physical activity hours" value={physicalActivityHoursMin} onChange={(e) => setPhysicalActivityHoursMin(e.target.value)}></Input>
            <Input placeholder="Maximum physical activity hours" value={physicalActivityHoursMax} onChange={(e) => setPhysicalActivityHoursMax(e.target.value)}></Input>

            <Button onClick={applyFilters}>Apply filters</Button>

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