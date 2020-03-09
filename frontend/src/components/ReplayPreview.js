import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TimelineMinimap from './TimelineMinimap';

function ReplayPreview(props){
    const {replay} = props
    return (
        <Card className="mt-4">
             <Card.Body>
                 <Row>
                     <Col>{replay.map.file}</Col>
                     <Col>{replay.players.map((player) => <h6>{player.race === "R"? `${player.race}${player.raceDetected}`: player.race} <span style={{color: player.color}}> {player.name}</span> <small>{player.apm} apm</small></h6>)}</Col>
                     <Col><TimelineMinimap width={200} height={200} map={replay.map.file} players={replay.players} actions={replay.actions || []}/></Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ReplayPreview