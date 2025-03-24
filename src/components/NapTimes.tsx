'use client';

import {useState} from "react";
import {NapList} from "@/components/NapList";

export interface Nap {
    action: string;
    time: Date;
}

const NapTimes = () => {

    const [nap, setNap] = useState(false);
    const [naps, setNaps] = useState<Nap[]>();

    const setInnTrueHandler = () => {
        const currentDate = new Date()
        const newNap = {action: 'nap-start', time: currentDate};
        if (naps == undefined) {
            const firstNaps: Nap[] = [
                {
                    action: 'nap-start', time: currentDate
                },
            ];
            setNaps(firstNaps)
        } else {
            setNaps([...naps, newNap]);
        }
        setNap(true);
    }

    const setInnFalseHandler = () => {
        const currentDate = new Date()
        const newNap = {action: 'nap-end', time: currentDate};
        if (naps == undefined) {
            const firstNap: Nap[] = [
                {
                    action: 'nap-end', time: currentDate
                },
            ];
            setNaps(firstNap)
        } else {
            setNaps([...naps, newNap]);
        }

        setNap(false);
    }

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

    function napTime(): CalculatedNapTime | null {
        if (naps != undefined && naps.length >= 2) {

            // TODO pair every start and stop nap, together
            const diffInSeconds: number = (((naps[1].time.getTime().valueOf()) - (naps[0].time.getTime().valueOf())) / 1000)

            return timeNapping(diffInSeconds)

        } else return null
    }


    return (

        <div className="flex flex-col items-center justify-center">
            {!nap &&
                <button className="bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-3 rounded w-40"
                        onClick={setInnTrueHandler}>
                    Nap start
                </button>
            }
            {nap && <button className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-3 rounded w-40"
                            onClick={setInnFalseHandler}>
                Nap end
            </button>
            }
            {(naps != undefined) &&
                <ul className="my-6 text-left">
                    {naps.map((nap, index) => (
                        <NapList key={index} nap={nap}/>
                    ))}

                </ul>}
            {(naps != undefined && napTime()) &&
                <ul className="my-6 text-left">
                    {<li>Hours: {napTime()?.hours} Min:{napTime()?.min}  Sec:{napTime()?.sec.toFixed()} </li>}
                </ul>}

        </div>
    )
        ;
};

interface CalculatedNapTime {
    sec: number;
    hours: number;
    min: number;
}

export default NapTimes;
