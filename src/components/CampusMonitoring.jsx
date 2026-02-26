import { useState } from "react";

export default function CampusMonitoring({ devices, toggleDevice }) {

    const floors = Array.from({ length: 9 }, (_, i) => i + 2);

    const [selectedFloor, setSelectedFloor] = useState("All");

    // ambil daftar ruangan unik
    const rooms = [...new Set(
        devices
            .filter(d => selectedFloor === "All" || d.floor === Number(selectedFloor))
            .map(d => d.room)
    )];

    return (
        <div className="mt-16 bg-gray-800 p-8 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
                Campus Room Control
            </h2>

            {/* FILTER LANTAI */}
            <div className="mb-8">
                <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="p-3 rounded bg-gray-700"
                >
                    <option value="All">Semua Lantai</option>
                    {floors.map(floor => (
                        <option key={floor} value={floor}>
                            Lantai {floor}
                        </option>
                    ))}
                </select>
            </div>

            {/* ROOM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                    <div key={room} className="bg-gray-700 p-6 rounded-xl">

                        <h4 className="font-bold mb-4">{room}</h4>

                        {devices
                            .filter(d => d.room === room)
                            .map(device => (
                                <div
                                    key={device.id}
                                    className="flex justify-between items-center mb-3"
                                >
                                    <div>
                                        <p>{device.name}</p>
                                        <p className="text-sm text-gray-400">
                                            {device.watt} Watt
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => toggleDevice(device.id)}
                                        className={`px-4 py-1 rounded font-semibold ${device.status
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {device.status ? "ON" : "OFF"}
                                    </button>
                                </div>
                            ))}

                    </div>
                ))}
            </div>

        </div>
    );
}