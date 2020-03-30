import Parser from 'w3gjs'
import Database from '../Database'

const parser = new Parser()

export const parseAndInsertFromBuffer = async (replaydata : Buffer, addReplayData: boolean = false) => {
  const parsedReplay = parser.parse(replaydata)
  const db = await Database.get()
  const replayDoc : any = {
    ...parsedReplay, uploadedAt: new Date()
  }
  if (addReplayData === true) {
    replayDoc.__base64Replay = replaydata.toString('base64')
  }
  const result = await db.collection('replays').insertOne(replayDoc)
  return result
}
