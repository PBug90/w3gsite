import React from 'react';

function ReplayViewer(props){
    const {replay} = props
    return (
        <div class="flex flex-row rounded-lg overflow-hidden border-t border-l border-r border-b border-gray-400 mt-10">
           <div class="flex-1 p-5">
            {replay.map.file}
        </div>
        <div class="flex-1 p-5">
            {replay.players.map((player) => <h4>{player.race === "R"? `${player.race}${player.raceDetected}`: player.race} {player.name} <small>{player.apm} apm</small></h4>)}
        </div>
        <div class="flex-1 p-5">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Fast Expansion
        </span>
        </div>
    </div>
    )
}

export default ReplayViewer