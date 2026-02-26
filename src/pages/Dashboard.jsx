import useEnergyMonitor from "../hooks/useEnergyMonitor";
import SummaryCards from "../components/SummaryCards";
import CampusMonitoring from "../components/CampusMonitoring";
import EfficiencyPanel from "../components/EfficiencyPanel";
import FloorAnalysis from "../components/FloorAnalysis";
import DailyComparisonChart from "../components/DailyComparisonChart";

export default function Dashboard() {
    const energy = useEnergyMonitor();

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">

            <h1 className="text-4xl font-bold text-center mb-10">
                Enterprise IoT Energy Control Center
            </h1>

            <SummaryCards
                currentPower={energy.currentPower}
                currentKwh={energy.currentKwh}
                totalCostToday={energy.totalCostToday}
            />

            <EfficiencyPanel
                efficiencyScore={energy.efficiencyScore}
                efficiencyStatus={energy.efficiencyStatus}
                efficiencyColor={energy.efficiencyColor}
                potentialMonthlySaving={energy.potentialMonthlySaving}
            />

            <FloorAnalysis
                floorPower={energy.floorPower}
                highestFloor={energy.highestFloor}
                highestFloorPower={energy.highestFloorPower}
                autoShutdownRecommendation={energy.autoShutdownRecommendation}
            />

            <DailyComparisonChart
                dailyLogs={energy.dailyLogs}
                currentKwh={energy.currentKwh}
            />

            <CampusMonitoring
                devices={energy.devices}
                toggleDevice={energy.toggleDevice}
            />

        </div>
    );
}