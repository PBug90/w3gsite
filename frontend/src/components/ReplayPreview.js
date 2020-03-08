import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

function ReplayPreview(props){
    const {replay} = props
    return (
        <Card className="mt-4">
             <Card.Body>
                 <Row>
                     <Col>{replay.map.file}</Col>
                     <Col>{replay.players.map((player) => <h4>{player.race === "R"? `${player.race}${player.raceDetected}`: player.race} {player.name} <small>{player.apm} apm</small></h4>)}</Col>
                     <Col><Badge variant="secondary">Fast Expansion</Badge></Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ReplayPreview