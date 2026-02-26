export default function SummaryCards({
    currentPower,
    currentKwh,
    totalCostToday,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                <p>Realtime Power</p>
                <h2 className="text-3xl font-bold mt-2">
                    {currentPower} Watt
                </h2>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                <p>Energy Today</p>
                <h2 className="text-3xl font-bold mt-2">
                    {currentKwh.toFixed(3)} kWh
                </h2>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                <p>Estimated Cost</p>
                <h2 className="text-3xl font-bold mt-2 text-yellow-400">
                    Rp {totalCostToday.toLocaleString()}
                </h2>
            </div>

        </div>
    );
}
