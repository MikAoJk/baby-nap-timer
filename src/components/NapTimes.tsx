'use client';

import {useState} from "react";
import {NapTime} from "@/components/NapTime";

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
        if (naps == undefined || naps[1].action === 'nap-end') {
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
                <ul className="my-6 text-left w-64">
                    <NapTime naps={naps}/>
                </ul>}
        </div>

    )
        ;
};


export default NapTimes;
