import { useState, useEffect } from "react";

export default function useEnergyMonitor() {
    const tarifPerKwh = 1500;
    const floors = Array.from({ length: 9 }, (_, i) => i + 2);

    const [dailyLogs, setDailyLogs] = useState([]);
    const [lastSavedDate, setLastSavedDate] = useState(
        new Date().toLocaleDateString()
    );

    // ===== GENERATE CAMPUS DEVICES =====
    function generateDevices() {
        const devices = [];

        floors.forEach((floor) => {
            for (let i = 1; i <= 5; i++) {
                const room = `${floor}0${i}`;

                devices.push(
                    { id: `${room}-ac1`, floor, room, name: "AC 1", watt: 900, status: false },
                    { id: `${room}-ac2`, floor, room, name: "AC 2", watt: 900, status: false },
                    { id: `${room}-tv`, floor, room, name: "TV", watt: 150, status: false }
                );
            }

            const lab = `Labkom ${floor}`;

            devices.push(
                { id: `${lab}-ac1`, floor, room: lab, name: "AC 1", watt: 900, status: false },
                { id: `${lab}-ac2`, floor, room: lab, name: "AC 2", watt: 900, status: false },
                { id: `${lab}-tv`, floor, room: lab, name: "TV", watt: 150, status: false }
            );
        });

        return devices;
    }

    const [devices, setDevices] = useState(generateDevices());
    const [currentKwh, setCurrentKwh] = useState(0);

    const activeDevices = devices.filter((d) => d.status);

    const currentPower = activeDevices.reduce(
        (total, d) => total + d.watt,
        0
    );

    // ===== FLOOR POWER ANALYSIS =====

    const floorPower = {};

    devices.forEach((device) => {
        if (device.status) {
            floorPower[device.floor] =
                (floorPower[device.floor] || 0) + device.watt;
        }
    });

    // cari lantai paling boros
    let highestFloor = null;
    let highestFloorPower = 0;

    Object.keys(floorPower).forEach((floor) => {
        if (floorPower[floor] > highestFloorPower) {
            highestFloorPower = floorPower[floor];
            highestFloor = floor;
        }
    });

    // batas overload
    const overloadLimit = 20000;

    let autoShutdownRecommendation = null;

    if (currentPower > overloadLimit) {
        autoShutdownRecommendation =
            "⚠ Beban melebihi batas aman. Pertimbangkan mematikan sebagian AC.";
    } else if (highestFloorPower > 6000) {
        autoShutdownRecommendation =
            `⚠ Lantai ${highestFloor} menggunakan daya tertinggi (${highestFloorPower} Watt).`;
    }

    // realtime accumulation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentKwh((prev) => prev + currentPower / 1000 / 3600);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentPower]);

    useEffect(() => {
        const checkDate = setInterval(() => {
            const today = new Date().toLocaleDateString();

            if (today !== lastSavedDate) {
                setDailyLogs((prev) => [
                    ...prev,
                    {
                        date: lastSavedDate,
                        kwh: currentKwh,
                    },
                ]);

                setCurrentKwh(0);
                setLastSavedDate(today);
            }
        }, 60000);

        return () => clearInterval(checkDate);
    }, [currentKwh, lastSavedDate]);

    function toggleDevice(id) {
        setDevices((prev) => prev.map((device) => device.id === id
            ? { ...device, status: !device.status }
            : device
        )
        );
    }

    const totalCostToday = currentKwh * tarifPerKwh;

    // ===== ENERGY EFFICIENCY SYSTEM =====

    // kapasitas maksimal asumsi sistem kampus
    const maxCapacity = 30000; // 30.000 watt (bisa disesuaikan)

    const efficiencyScore = Math.max(
        0,
        Math.round((1 - currentPower / maxCapacity) * 100)
    );

    let efficiencyStatus = "Excellent";
    let efficiencyColor = "text-green-400";

    if (efficiencyScore < 75 && efficiencyScore >= 50) {
        efficiencyStatus = "Good";
        efficiencyColor = "text-yellow-400";
    } else if (efficiencyScore < 50) {
        efficiencyStatus = "Wasteful";
        efficiencyColor = "text-red-500";
    }

    // pemborosan jika melewati batas optimal 60% kapasitas
    const optimalLimit = maxCapacity * 0.6;

    const wastedWatt =
        currentPower > optimalLimit
            ? currentPower - optimalLimit
            : 0;

    // estimasi potensi hemat (asumsi 6 jam per hari)
    const potentialMonthlySaving =
        wastedWatt * 6 * 30 * (tarifPerKwh / 1000);

    return {
        devices,
        toggleDevice,
        currentPower,
        currentKwh,
        totalCostToday,

        efficiencyScore,
        efficiencyStatus,
        efficiencyColor,
        potentialMonthlySaving,

        floorPower,
        highestFloor,
        highestFloorPower,
        autoShutdownRecommendation,

        dailyLogs,
    };
}