import { Meteor } from 'meteor/meteor'
import { LinksCollection } from '/imports/api/links'
import { Players } from '/imports/api/players'

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() })
}

Meteor.startup(() => {
  // if (Players.find({}).count() === 0) {
  //   Players.insert({ name: 'Jordan', score: 99 })
  //   Players.insert({ name: 'Barclay', score: 76 })
  //   Players.insert({ name: 'Bryant', score: 43 })
  //   Players.insert({ name: "O'Neill", score: 30 })
  // }
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do th Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    })

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com',
    })

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    })

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    })
  }
})
