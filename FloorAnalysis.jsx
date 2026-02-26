export default function FloorAnalysis({
    floorPower,
    highestFloor,
    highestFloorPower,
    autoShutdownRecommendation,
}) {
    return (
        <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold mb-4">
                Floor Energy Analysis
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.keys(floorPower).map((floor) => (
                    <div
                        key={floor}
                        className={`p-4 rounded-xl ${floor === highestFloor
                                ? "bg-red-600"
                                : "bg-gray-700"
                            }`}
                    >
                        <p className="font-semibold">
                            Lantai {floor}
                        </p>
                        <p>
                            {floorPower[floor]} Watt
                        </p>
                    </div>
                ))}
            </div>

            {highestFloor && (
                <div className="mb-4 text-red-400 font-semibold">
                    🔥 Lantai Paling Boros: Lantai {highestFloor} ({highestFloorPower} Watt)
                </div>
            )}

            {autoShutdownRecommendation && (
                <div className="bg-yellow-600 p-4 rounded-xl">
                    {autoShutdownRecommendation}
                </div>
            )}

        </div>
    );
}