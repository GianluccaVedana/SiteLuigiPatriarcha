import type { NextApiRequest, NextApiResponse } from 'next'
import pool, { initDB } from '@/lib/db'
import { getTokenFromRequest } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getTokenFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Não autenticado.' })

  await initDB()

  if (req.method === 'GET') {
    // Admin vê todas; user vê só as suas
    const result = user.role === 'admin'
      ? await pool.query('SELECT t.*, u.name as user_name FROM teams t JOIN users u ON u.id = t.user_id ORDER BY t.created_at DESC')
      : await pool.query('SELECT * FROM teams WHERE user_id = $1 ORDER BY created_at DESC', [user.id])

    const teams = await Promise.all(result.rows.map(async (t: any) => {
      const players = await pool.query('SELECT * FROM players WHERE team_id = $1 ORDER BY number', [t.id])
      return { ...t, players: players.rows }
    }))
    return res.json(teams)
  }

  if (req.method === 'POST') {
    const { teamName, city, state, category, responsible, phone, email, players = [] } = req.body
    if (!teamName || !city || !category || !responsible || !phone || !email)
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' })

    const teamResult = await pool.query(
      'INSERT INTO teams (user_id, team_name, city, state, category, responsible, phone, email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [user.id, teamName, city, state || 'PR', category, responsible, phone, email]
    )
    const team = teamResult.rows[0]

    for (const p of players) {
      await pool.query(
        'INSERT INTO players (team_id, name, number, position, birth_date) VALUES ($1,$2,$3,$4,$5)',
        [team.id, p.name, p.number || null, p.position || null, p.birthDate || null]
      )
    }

    return res.status(201).json(team)
  }

  res.status(405).end()
}
