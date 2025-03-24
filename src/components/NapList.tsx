import React from 'react';
import {Nap} from "@/components/NapTimes";

interface NapListProps {
    nap: Nap;
}

export const NapList: React.FC<NapListProps> = ({nap}) => {
    const currentTime = nap.time

    return (
        <li>
            <div className="flex justify-between">
            <div className="ml-2 w-20">{nap.action}</div>
            <div className="ml-2">{currentTime.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })} </div>
            </div>
        </li>
    );
};
