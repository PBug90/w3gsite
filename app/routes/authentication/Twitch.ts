import passport from 'passport'
import fetch from 'node-fetch'
// @ts-ignore
import { OAuth2Strategy } from 'passport-oauth'
import express, { Router } from 'express'
import session from 'express-session'
import Database from '../../Database'

export default function Factory (): Router {
  const router = express.Router()

  router.use(session({ secret: String(process.env.SESSION_SECRET), resave: false, saveUninitialized: false }))
  router.use(passport.initialize())
  router.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
  passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    state: true
  },
  async function (accessToken : string, refreshToken : string, profile: any, done: Function) {
    profile.accessToken = accessToken
    profile.refreshToken = refreshToken
    try {
      const database = await Database.get()
      const user = profile.data[0]
      const result = await database.collection('users').findOneAndUpdate(
        { login: user.login, type: 'twitch' },
        { $set: { type: 'twitch', login: user.login, displayName: user.displayName, twitchId: user.id } },
        { upsert: true }
      )
      if (result.value) {
        done(null, result.value)
      } else {
        done(new Error('Could not update user.'))
      }
    } catch (err) {
      done(new Error('Could not update user.'))
    }
  }
  ))

  OAuth2Strategy.prototype.userProfile = function (accessToken: string, done: Function) {
    fetch('https://api.twitch.tv/helix/users', {
      method: 'GET',
      headers: {
        'Client-ID': String(process.env.TWITCH_CLIENT_ID),
        Accept: 'routerlication/vnd.twitchtv.v5+json',
        Authorization: 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((json) => done(null, json)).catch(err => done(err))
  }

  // Set route to start OAuth link, this is where you define scopes to request
  router.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }))
  // Set route for OAuth redirect
  router.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }))
  router.get('/auth/login/success', (req, res) => {
    if (req.user) {
      return res.json({ login: req.user.login, displayName: req.user.displayName, provider: 'twitch' })
    }
    return res.status(401).json({ error: 'unauthorized' })
  })

  return router
}
