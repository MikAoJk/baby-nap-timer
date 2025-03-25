import React from 'react';
import {Nap} from "@/components/NapTimes";

interface NapTimeProps {
    naps: Nap[];
}


interface CalculatedNapTime {
    sec: number;
    hours: number;
    min: number;
}

export const NapTime: React.FC<NapTimeProps> = ({naps}) => {

    const timeNapping = (seconds: number) => {
        const calculatedNapTime: CalculatedNapTime = {
            hours: 0,
            min: 0,
            sec: 0
        };

        if (seconds >= 3600) {
            calculatedNapTime.hours = Math.floor(seconds / 3600);
            seconds -= calculatedNapTime.hours * 3600;
        }
        if (seconds >= 60) {
            calculatedNapTime.min = Math.floor(seconds / 60);
            seconds -= calculatedNapTime.min * 60;

        }
        calculatedNapTime.sec = seconds;

        return calculatedNapTime;
    }

    function napTime(starNap: Nap, endNap: Nap): CalculatedNapTime | null {
        if (naps != undefined && naps.length >= 2) {

            const diffInSeconds: number = (((endNap.time.getTime().valueOf()) - (starNap.time.getTime().valueOf())) / 1000)

            return timeNapping(diffInSeconds)

        } else return null
    }

    const isNapEnd = (nap: Nap) => {
        return (nap.action === 'nap-end')
    }

    return (
        <div>
            {(naps != undefined) &&
                <div>
                    {naps.map((nap, index) => (
                        <div key={index}>
                            <li>
                                <div className="flex justify-between">
                                    <div className="ml-2 w-24">{nap.action}</div>
                                    <div className="ml-2">{nap.time.toLocaleTimeString('no-NO', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })} </div>
                                </div>
                            </li>
                            {(isNapEnd(nap)) &&        // TODO pair every start and stop nap, together
                                <li className="ml-2 mb-4 mt-2">
                                    nap-time Hours:{napTime(naps[0], naps[1])?.hours} Min:{napTime(naps[0], naps[1])?.min} Sec:{napTime(naps[0], naps[1])?.sec.toFixed()}
                                </li>
                            }
                        </div>

                    ))}

                </div>
            }
        </div>

    );
};

