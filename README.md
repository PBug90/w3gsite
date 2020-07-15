# A WarCraft III Replay Feed App

## Use cases
* replay sharing with others on your own profile
* displays basic information about replay and allows replay download
* users can create feeds and allow other users to add replays to that feed
* feeds can be private so that only authenticated users with permission can see the feed
* feeds can be subscriber-only so that only users that are twitch subscribers of the feed owner can see the feed


## API Design

* A feed has a unique name in the scope of its owner, most likely a user


/user/<username>/feed/
/user/<username>/feed/<feedname>
/user/<username>/feed/<feedname>/replay