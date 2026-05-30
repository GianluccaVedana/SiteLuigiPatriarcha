import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/lib/db'
import { getTokenFromRequest } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getTokenFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Não autenticado.' })

  const { id } = req.query

  // Verifica se a equipe pertence ao usuário (ou é admin)
  const team = await pool.query('SELECT user_id FROM teams WHERE id = $1', [id])
  if (!team.rows[0]) return res.status(404).json({ error: 'Equipe não encontrada.' })
  if (user.role !== 'admin' && team.rows[0].user_id !== user.id)
    return res.status(403).json({ error: 'Sem permissão.' })

  if (req.method === 'PUT') {
    const { players } = req.body
    if (!Array.isArray(players)) return res.status(400).json({ error: 'Lista de atletas inválida.' })

    // Substitui todos os atletas da equipe
    await pool.query('DELETE FROM players WHERE team_id = $1', [id])
    for (const p of players) {
      if (!p.name?.trim()) continue
      await pool.query(
        'INSERT INTO players (team_id, name, number, position, birth_date) VALUES ($1,$2,$3,$4,$5)',
        [id, p.name, p.number || null, p.position || null, p.birthDate || null]
      )
    }

    const updated = await pool.query('SELECT * FROM players WHERE team_id = $1 ORDER BY number', [id])
    return res.json(updated.rows)
  }

  res.status(405).end()
}
