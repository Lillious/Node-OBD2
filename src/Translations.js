export const ServiceModes = {
    "01": {
        "Name": "Show Current Data",
        "PIDs": {
            "00": {
                "Description": "PIDs supported [01 - 20]",
                "BytesReturned": 4,
            },
            "01": {
                "Description": "Monitor status since DTCs cleared. (Includes malfunction indicator lamp (MIL), status and number of DTCs, components tests, DTC readiness checks)",
                "BytesReturned": 4,
            },
            "02": {
                "Description": "Freeze DTC",
                "BytesReturned": 2,
            },
            "03": {
                "Description": "Fuel system status",
                "BytesReturned": 2,
            },
            "04": {
                "Description": "Calculated engine load",
                "BytesReturned": 1,
            },
            "05": {
                "Description": "Engine coolant temperature",
                "BytesReturned": 1,
            },
            "06": {
                "Description": "Short term fuel trim—Bank 1",
                "BytesReturned": 1,
            },
            "07": {
                "Description": "Long term fuel trim—Bank 1",
                "BytesReturned": 1,
            },
            "08": {
                "Description": "Short term fuel trim—Bank 2",
                "BytesReturned": 1,
            },
            "09": {
                "Description": "Long term fuel trim—Bank 2",
                "BytesReturned": 1,
            },
            "0A": {
                "Description": "Fuel pressure (gauge pressure)",
                "BytesReturned": 1,
            },
            "0B": {
                "Description": "Intake manifold absolute pressure",
                "BytesReturned": 1,
            },
            "0C": {
                "Description": "Engine Speed",
                "BytesReturned": 2,
            },
            "0D": {
                "Description": "Vehicle speed",
                "BytesReturned": 1,
            },
            "0E": {
                "Description": "Timing advance",
                "BytesReturned": 1,
            },
            "0F": {
                "Description": "Intake air temperature",
                "BytesReturned": 1,
            },
            "10": {
                "Description": "Mass air flow sensor (MAF) air flow rate",
                "BytesReturned": 2,
            },
            "11": {
                "Description": "Throttle position",
                "BytesReturned": 1,
            },
            "12": {
                "Description": "Commanded secondary air status",
                "BytesReturned": 1,
            },
            "13": {
                "Description": "Oxygen sensors present (in 2 banks)",
                "BytesReturned": 1,
            },
            "14": {
                "Description": "Oxygen Sensor 1, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "15": {
                "Description": "Oxygen Sensor 2, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "16": {
                "Description": "Oxygen Sensor 3, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "17": {
                "Description": "Oxygen Sensor 4, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "18": {
                "Description": "Oxygen Sensor 5, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "19": {
                "Description": "Oxygen Sensor 6, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "1A": {
                "Description": "Oxygen Sensor 7, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "1B": {
                "Description": "Oxygen Sensor 8, A: Voltage, B: Short term fuel trim",
                "BytesReturned": 2,
            },
            "1C": {
                "Description": "OBD standards this vehicle conforms to",
                "BytesReturned": 1,
            },
            "1D": {
                "Description": "Oxygen sensors present (in 4 banks)",
                "BytesReturned": 1,
            },
            "1E": {
                "Description": "Auxiliary input status",
                "BytesReturned": 1,
            },
            "1F": {
                "Description": "Run time since engine start",
                "BytesReturned": 2,
            },
            "20": {
                "Description": "PIDs supported [21 - 40]",
                "BytesReturned": 4,
            },
            "21": {
                "Description": "Distance traveled with malfunction indicator lamp (MIL) on",
                "BytesReturned": 2,
            },
            "22": {
                "Description": "Fuel Rail Pressure (relative to manifold vacuum)",
                "BytesReturned": 2,
            },
            "23": {
                "Description": "Fuel Rail Pressure (diesel, or gasoline direct inject)",
                "BytesReturned": 2,
            },
            "24": {
                "Description": "Oxygen Sensor 1, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "25": {
                "Description": "Oxygen Sensor 2, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "26": {
                "Description": "Oxygen Sensor 3, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "27": {
                "Description": "Oxygen Sensor 4, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "28": {
                "Description": "Oxygen Sensor 5, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "29": {
                "Description": "Oxygen Sensor 6, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "2A": {
                "Description": "Oxygen Sensor 7, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "2B": {
                "Description": "Oxygen Sensor 8, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio",
                "BytesReturned": 4,
            },
            "2C": {
                "Description": "Commanded EGR",
                "BytesReturned": 1,
            },
            "2D": {
                "Description": "EGR Error",
                "BytesReturned": 1,
            },
            "2E": {
                "Description": "Commanded evaporative purge",
                "BytesReturned": 1,
            },
            "2F": {
                "Description": "Fuel Tank Level Input",
                "BytesReturned": 1,
            },
            "30": {
                "Description": "Warm-ups since codes cleared",
                "BytesReturned": 1,
            },
            "31": {
                "Description": "Distance traveled since codes cleared",
                "BytesReturned": 2,
            },
            "32": {
                "Description": "Evap. System Vapor Pressure",
                "BytesReturned": 2,
            },
            "33": {
                "Description": "Absolute Barometric pressure",
                "BytesReturned": 1,
            },
            "34": {
                "Description": "Oxygen Sensor 1, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "35": {
                "Description": "Oxygen Sensor 2, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "36": {
                "Description": "Oxygen Sensor 3, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "37": {
                "Description": "Oxygen Sensor 4, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "38": {
                "Description": "Oxygen Sensor 5, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "39": {
                "Description": "Oxygen Sensor 6, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "3A": {
                "Description": "Oxygen Sensor 7, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "3B": {
                "Description": "Oxygen Sensor 8, A: Voltage, B: Fuel-air commanded equivalence ratio, C: Fuel-air actual equivalence ratio, D: Short term fuel trim",
                "BytesReturned": 4,
            },
            "3C": {
                "Description": "Catalyst Temperature Bank 1, Sensor 1",
                "BytesReturned": 2,
            },
            "3D": {
                "Description": "Catalyst Temperature Bank 2, Sensor 1",
                "BytesReturned": 2,
            },
            "3E": {
                "Description": "Catalyst Temperature Bank 1, Sensor 2",
                "BytesReturned": 2,
            },
            "3F": {
                "Description": "Catalyst Temperature Bank 2, Sensor 2",
                "BytesReturned": 2,
            },
            "40": {
                "Description": "PIDs supported [41 - 60]",
                "BytesReturned": 4,
            },
            "41": {
                "Description": "Monitor status this drive cycle",
                "BytesReturned": 4,
            },
            "42": {
                "Description": "Control module voltage",
                "BytesReturned": 2,
            },
            "43": {
                "Description": "Absolute load value",
                "BytesReturned": 2,
            },
            "44": {
                "Description": "Fuel-air commanded equivalence ratio",
                "BytesReturned": 2,
            },
            "45": {
                "Description": "Relative throttle position",
                "BytesReturned": 1,
            },
            "46": {
                "Description": "Ambient air temperature",
                "BytesReturned": 1,
            },
            "47": {
                "Description": "Absolute throttle position B",
                "BytesReturned": 1,
            },
            "48": {
                "Description": "Absolute throttle position C",
                "BytesReturned": 1,
            },
            "49": {
                "Description": "Accelerator pedal position D",
                "BytesReturned": 1,
            },
            "4A": {
                "Description": "Accelerator pedal position E",
                "BytesReturned": 1,
            },
            "4B": {
                "Description": "Accelerator pedal position F",
                "BytesReturned": 1,
            },
            "4C": {
                "Description": "Commanded throttle actuator",
                "BytesReturned": 1,
            },
            "4D": {
                "Description": "Time run with MIL on",
                "BytesReturned": 2,
            },
            "4E": {
                "Description": "Time since trouble codes cleared",
                "BytesReturned": 2,
            },
            "4F": {
                "Description": "Maximum value for equivalence ratio, oxygen sensor voltage, oxygen sensor current, and intake manifold absolute pressure",
                "BytesReturned": 4,
            },
            "50": {
                "Description": "Maximum value for air flow rate from mass air flow sensor",
                "BytesReturned": 4,
            },
            "51": {
                "Description": "Fuel Type",
                "BytesReturned": 1,
            },
            "52": {
                "Description": "Ethanol fuel %",
                "BytesReturned": 1,
            },
            "53": {
                "Description": "Absolute Evap. System Vapor Pressure",
                "BytesReturned": 2,
            },
            "54": {
                "Description": "Evap. System Vapor Pressure",
                "BytesReturned": 2,
            },
            "55": {
                "Description": "Short term secondary oxygen sensor trim bank 1 and bank 3",
                "BytesReturned": 2,
            },
            "56": {
                "Description": "Long term secondary oxygen sensor trim bank 1 and bank 3",
                "BytesReturned": 2,
            },
            "57": {
                "Description": "Short term secondary oxygen sensor trim bank 2 and bank 4",
                "BytesReturned": 2,
            },
            "58": {
                "Description": "Long term secondary oxygen sensor trim bank 2 and bank 4",
                "BytesReturned": 2,
            },
            "59": {
                "Description": "Fuel rail pressure (absolute)",
                "BytesReturned": 2,
            },
            "5A": {
                "Description": "Relative accelerator pedal position",
                "BytesReturned": 1,
            },
            "5B": {
                "Description": "Hybrid battery pack remaining life",
                "BytesReturned": 1,
            },
            "5C": {
                "Description": "Engine oil temperature",
                "BytesReturned": 1,
            },
            "5D": {
                "Description": "Fuel injection timing",
                "BytesReturned": 2,
            },
            "5E": {
                "Description": "Engine fuel rate",
                "BytesReturned": 2,
            },
            "5F": {
                "Description": "Emission requirements to which vehicle is designed",
                "BytesReturned": 1,
            },
            "60": {
                "Description": "PIDs supported [61 - 80]",
                "BytesReturned": 4,
            },
            "61": {
                "Description": "Driver's demand engine - percent torque",
                "BytesReturned": 1,
            },
            "62": {
                "Description": "Actual engine - percent torque",
                "BytesReturned": 1,
            },
            "63": {
                "Description": "Engine reference torque",
                "BytesReturned": 2,
            },
            "64": {
                "Description": "Engine percent torque data",
                "BytesReturned": 5,
            },
            "65": {
                "Description": "Auxiliary input / output supported",
                "BytesReturned": 2,
            },
            "66": {
                "Description": "Mass air flow sensor",
                "BytesReturned": 5,
            },
            "67": {
                "Description": "Engine coolant temperature",
                "BytesReturned": 3,
            },
            "68": {
                "Description": "Intake air temperature sensor",
                "BytesReturned": 3,
            },
            "69": {
                "Description": "Actual EGR, Commanded EGR, and EGR Error",
                "BytesReturned": 7,
            },
            "6A": {
                "Description": "Commanded Diesel intake air flow control and relative intake air flow position",
                "BytesReturned": 5,
            },
            "6B": {
                "Description": "Exhaust gas recirculation temperature",
                "BytesReturned": 5,
            },
            "6C": {
                "Description": "Commanded throttle actuator control and relative throttle position",
                "BytesReturned": 5,
            },
            "6D": {
                "Description": "Fuel pressure control system",
                "BytesReturned": 11,
            },
            "6E": {
                "Description": "Injection pressure control system",
                "BytesReturned": 9,
            },
            "6F": {
                "Description": "Turbocharger compressor inlet pressure",
                "BytesReturned": 3,
            },
            "70": {
                "Description": "Boost pressure control",
                "BytesReturned": 10,
            },
            "71": {
                "Description": "Variable Geometry turbo (VGT) control",
                "BytesReturned": 6,
            },
            "72": {
                "Description": "Wastegate control",
                "BytesReturned": 5,
            },
            "73": {
                "Description": "Exhaust pressure",
                "BytesReturned": 5,
            },
            "74": {
                "Description": "Turbocharger RPM",
                "BytesReturned": 5,
            },
            "75": {
                "Description": "Turbocharger temperature",
                "BytesReturned": 7,
            },
            "76": {
                "Description": "Turbocharger temperature",
                "BytesReturned": 7,
            },
            "77": {
                "Description": "Charge air cooler temperature (CACT)",
                "BytesReturned": 5,
            },
            "78": {
                "Description": "Exhaust gas temperature (EGT) Bank 1",
                "BytesReturned": 9,
            },
            "79": {
                "Description": "Exhaust gas temperature (EGT) Bank 2",
                "BytesReturned": 9,
            },
            "7A": {
                "Description": "Diesel particulate filter (DPF) / differential pressure",
                "BytesReturned": 7,
            },
            "7B": {
                "Description": "Diesel particulate filter (DPF)",
                "BytesReturned": 7,
            },
            "7C": {
                "Description": "Diesel particulate filter (DPF) temperature",
                "BytesReturned": 9,
            },
            "7D": {
                "Description": "NOx NTE control area status",
                "BytesReturned": 1,
            },
            "7E": {
                "Description": "PM NTE control area status",
                "BytesReturned": 1,
            },
            "7F": {
                "Description": "Engine run time",
                "BytesReturned": 13,
            },
            "80": {
                "Description": "PIDs supported [81 - A0]",
                "BytesReturned": 4,
            },
            "81": {
                "Description": "Engine run time for Auxiliary Emissions Control Device(AECD)",
                "BytesReturned": 41,
            },
            "82": {
                "Description": "Engine run time for Auxiliary Emissions Control Device(AECD)",
                "BytesReturned": 41,
            },
            "83": {
                "Description": "NOx sensor",
                "BytesReturned": 9,
            },
            "84": {
                "Description": "Manifold surface temperature",
                "BytesReturned": 1,
            },
            "85": {
                "Description": "NOx reagent system",
                "BytesReturned": 10,
            },
            "86": {
                "Description": "Particulate matter (PM) sensor",
                "BytesReturned": 5,
            },
            "87": {
                "Description": "Intake manifold absolute pressure",
                "BytesReturned": 5,
            },
            "88": {
                "Description": "SCR Induce System",
                "BytesReturned": 13,
            },
            "89": {
                "Description": "Run Time for AECD #11-#15",
                "BytesReturned": 41,
            },
            "8A": {
                "Description": "Run Time for AECD #16-#20",
                "BytesReturned": 41,
            },
            "8B": {
                "Description": "Diesel Aftertreatment",
                "BytesReturned": 7,
            },
            "8C": {
                "Description": "O2 Sensor (Wide Range)",
                "BytesReturned": 17,
            },
            "8D": {
                "Description": "Throttle Position G",
                "BytesReturned": 1,
            },
            "8E": {
                "Description": "Engine Friction - Percent Torque",
                "BytesReturned": 1,
            },
            "8F": {
                "Description": "PM Sensor Bank 1 & 2",
                "BytesReturned": 7,
            },
            "90": {
                "Description": "WWH-OBD Vehicle OBD System Information",
                "BytesReturned": 3,
            },
            "91": {
                "Description": "WWH-OBD Vehicle OBD System Information",
                "BytesReturned": 3,
            },
            "92": {
                "Description": "Fuel System Control",
                "BytesReturned": 2,
            },
            "93": {
                "Description": "WWH-OBD Vehicle OBD Counters support",
                "BytesReturned": 3,
            },
            "94": {
                "Description": "NOx Warning And Inducement System",
                "BytesReturned": 12,
            },
            "98": {
                "Description": "Exhaust Gas Temperature Sensor",
                "BytesReturned": 9,
            },
            "99": {
                "Description": "Exhaust Gas Temperature Sensor",
                "BytesReturned": 9,
            },
            "9A": {
                "Description": "Hybrid/EV Vehicle System Data, Battery, Voltage",
                "BytesReturned": 6,
            },
            "9B": {
                "Description": "Diesel Exhaust Fluid Sensor Data",
                "BytesReturned": 4,
            },
            "9C": {
                "Description": "O2 Sensor Data",
                "BytesReturned": 17,
            },
            "9D": {
                "Description": "Engine Fuel Rate",
                "BytesReturned": 4,
            },
            "9E": {
                "Description": "Engine Exhaust Flow Rate",
                "BytesReturned": 2,
            },
            "9F": {
                "Description": "Fuel System Percentage Use",
                "BytesReturned": 9,
            },
            "A0": {
                "Description": "PIDs supported [A1 - C0]",
                "BytesReturned": 4,
            },
            "A1": {
                "Description": "NOx Sensor Corrected Data",
                "BytesReturned": 9,
            },
            "A2": {
                "Description": "Cylinder Fuel Rate",
                "BytesReturned": 2,
            },
            "A3": {
                "Description": "Evap System Vapor Pressure",
                "BytesReturned": 9,
            },
            "A4": {
                "Description": "Transmission Actual Gear",
                "BytesReturned": 4,
            },
            "A5": {
                "Description": "Commanded Diesel Exhaust Fluid Dosing",
                "BytesReturned": 4,
            },
            "A6": {
                "Description": "Odometer",
                "BytesReturned": 4,
            },
            "A7": {
                "Description": "NOx Sensor Concentration Sensors 3 and 4",
                "BytesReturned": 4,
            },
            "A8": {
                "Description": "NOx Sensor Corrected Concentration Sensors 3 and 4",
                "BytesReturned": 4,
            },
            "A9": {
                "Description": "ABS Disable Switch State",
                "BytesReturned": 4,
            },
            "AA": {
                "Description": "PIDs supported [C1 - E0]",
                "BytesReturned": 4,
            }
        }
    },
    "02": {
        "Name": "Show freeze frame data",
        "PIDs": {
            "02": {
                "Description": "DTC that caused freeze frame to be stored",
                "BytesReturned": 2,
            }
        }
    },
    "03": {
        "Name": "Show stored diagnostic trouble codes",
        "PIDs": {
            "00": {
                "Description": "Request trouble codes",
                "BytesReturned": "n*6",
            }
        }
    },
    "04": {
        "Name": "Clear diagnostic trouble codes and stored values",
        "PIDs": {
            "00": {
                "Description": "Clear trouble codes / Malfunction indicator lamp (MIL) / Check engine light",
                "BytesReturned": 0,
            }
        }
    },
    "05": {
        "Name": "Test results, oxygen sensor monitoring (non CAN only)",
        "PIDs": {
            "0100": {
                "Description": "OBD Monitor IDs supported (#01 - #20)",
                "BytesReturned": 4,
            },
            "0101": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 1",
                "BytesReturned": 2,
            },
            "0102": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 2",
                "BytesReturned": 0,
            },
            "0103": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 3",
                "BytesReturned": 0,
            },
            "0104": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 4",
                "BytesReturned": 0,
            },
            "0105": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 1",
                "BytesReturned": 0,
            },
            "0106": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 2",
                "BytesReturned": 0,
            },
            "0107": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 3",
                "BytesReturned": 0,
            },
            "0108": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 4",
                "BytesReturned": 0,
            },
            "0109": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 1",
                "BytesReturned": 0,
            },
            "010A": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 2",
                "BytesReturned": 0,
            },
            "010B": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 3",
                "BytesReturned": 0,
            },
            "010C": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 4",
                "BytesReturned": 0,
            },
            "010D": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 1",
                "BytesReturned": 0,
            },
            "010E": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 2",
                "BytesReturned": 0,
            },
            "010F": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 3",
                "BytesReturned": 0,
            },
            "0110": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 4",
                "BytesReturned": 0,
            },
            "0201": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 1",
                "BytesReturned": 0,
            },
            "0202": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 2",
                "BytesReturned": 0,
            },
            "0203": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 3",
                "BytesReturned": 0,
            },
            "0204": {
                "Description": "O2 Sensor Monitor Bank 1 Sensor 4",
                "BytesReturned": 0,
            },
            "0205": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 1",
                "BytesReturned": 0,
            },
            "0206": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 2",
                "BytesReturned": 0,
            },
            "0207": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 3",
                "BytesReturned": 0,
            },
            "0208": {
                "Description": "O2 Sensor Monitor Bank 2 Sensor 4",
                "BytesReturned": 0,
            },
            "0209": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 1",
                "BytesReturned": 0,
            },
            "020A": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 2",
                "BytesReturned": 0,
            },
            "020B": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 3",
                "BytesReturned": 0,
            },
            "020C": {
                "Description": "O2 Sensor Monitor Bank 3 Sensor 4",
                "BytesReturned": 0,
            },
            "020D": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 1",
                "BytesReturned": 0,
            },
            "020E": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 2",
                "BytesReturned": 0,
            },
            "020F": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 3",
                "BytesReturned": 0,
            },
            "0210": {
                "Description": "O2 Sensor Monitor Bank 4 Sensor 4",
                "BytesReturned": 0,
            },
        }
    },
    "06": {
        "Name": "Test results, other component/system monitoring (Test results, oxygen sensor monitoring for CAN only)"
    },
    "07": {
        "Name": "Show pending Diagnostic Trouble Codes (detected during current or last driving cycle)"
    },
    "08": {
        "Name": "Control operation of on-board component/system"
    },
    "09": {
        "Name": "Request vehicle information",
        "PIDs": {
            "00": {
                "Description": "Service 9 supported PIDs (01 to 20)",
                "BytesReturned": 4,
            },
            "01": {
                "Description": "VIN Message Count in PID 02. Only for ISO 9141-2, ISO 14230-4 and SAE J1850",
                "BytesReturned": 1,
            },
            "02": {
                "Description": "Vehicle Identification Number (VIN)",
                "BytesReturned": 17,
            },
            "03": {
                "Description": "Calibration ID message count for PID 04. Only for ISO 9141-2, ISO 14230-4 and SAE J1850",
                "BytesReturned": 1,
            },
            "04": {
                "Description": "Calibration ID",
                "BytesReturned": {
                    "0": 16,
                    "1": 32,
                    "2": 48,
                    "3": 64
                }
            },
            "05": {
                "Description": "Calibration verification numbers (CVN) message count for PID 06. Only for ISO 9141-2, ISO 14230-4 and SAE J1850",
                "BytesReturned": 1,
            },
            "06": {
                "Description": "Calibration Verification Numbers (CVN) Several CVN can be output (4 bytes each) the number of CVN and CALID must match",
                "BytesReturned": {
                    "0": 4,
                    "1": 8,
                    "2": 12,
                    "3": 16
                }
            },
            "07": {
                "Description": "In-use performance tracking message count for PID 08. Only for ISO 9141-2, ISO 14230-4 and SAE J1850",
                "BytesReturned": 1,
            },
            "08": {
                "Description": "In-use performance tracking for spark ignition vehicles",
                "BytesReturned": 4,
            },
            "09": {
                "Description": "ECU name message count for PID 0A",
                "BytesReturned": 1,
            },
            "0A": {
                "Description": "ECU name",
                "BytesReturned": 20,
            },
            "0B": {
                "Description": "In-use performance tracking for compression ignition vehicles",
                "BytesReturned": 4,
            }
        }
    },
    "0A": {
        "Name": "Permanent Diagnostic Trouble Codes (DTCs) (Cleared DTCs)"
    },
}
