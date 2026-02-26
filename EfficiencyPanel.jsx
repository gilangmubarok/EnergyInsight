export default function EfficiencyPanel({
    efficiencyScore,
    efficiencyStatus,
    efficiencyColor,
    potentialMonthlySaving,
}) {
    return (
        <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
                Energy Efficiency Analysis
            </h2>

            <div className="flex items-center justify-between">
                <div>
                    <p>Efficiency Score</p>
                    <h2 className="text-3xl font-bold">
                        {efficiencyScore}%
                    </h2>
                </div>

                <div className={`text-lg font-semibold ${efficiencyColor}`}>
                    {efficiencyStatus}
                </div>
            </div>

            {efficiencyScore < 75 ? (
                <div className="mt-6 bg-yellow-600 p-4 rounded-xl">
                    <p className="font-semibold">
                        Rekomendasi Penghematan:
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2">
                        <li>Kurangi penggunaan AC berlebih</li>
                        <li>Matikan TV yang tidak digunakan</li>
                        <li>Aktifkan Eco Mode setelah jam operasional</li>
                    </ul>

                    <p className="mt-3 font-bold">
                        Potensi Hemat/Bulan:
                        Rp {potentialMonthlySaving.toLocaleString()}
                    </p>
                </div>
            ) : (
                <div className="mt-6 bg-green-600 p-4 rounded-xl">
                    Sistem berjalan dalam kondisi efisien.
                </div>
            )}
        </div>
    );
}