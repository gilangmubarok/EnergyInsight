export default function DailyComparisonChart({ dailyLogs, currentKwh }) {

    const logs = [...dailyLogs];

    // tambahkan hari ini sebagai preview
    logs.push({
        date: "Hari Ini",
        kwh: currentKwh,
    });

    const maxValue =
        logs.length > 0
            ? Math.max(...logs.map((log) => log.kwh))
            : 1;

    return (
        <div className="mt-12 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-6">
                Daily Energy Comparison
            </h2>

            <div className="flex items-end gap-4 h-64">
                {logs.map((log, index) => {
                    const height = (log.kwh / maxValue) * 100;

                    return (
                        <div key={index} className="flex flex-col items-center w-full">
                            <div
                                className="bg-blue-500 w-10 rounded-t transition-all"
                                style={{ height: `${height}%` }}
                            ></div>

                            <span className="text-xs mt-2">
                                {log.date}
                            </span>

                            <span className="text-xs text-gray-400">
                                {log.kwh.toFixed(2)} kWh
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}