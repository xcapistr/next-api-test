import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
  const { db } = await connectToDatabase()
  if (req.method === 'GET') {
    const bla = await db
      .collection('next-api-test')
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray()
    res.json(bla)
  }
}
