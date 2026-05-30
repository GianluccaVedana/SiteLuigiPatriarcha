import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/lib/db'
import { getTokenFromRequest } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getTokenFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Não autenticado.' })

  const { id } = req.query

  if (req.method === 'PUT') {
    if (user.role !== 'admin') return res.status(403).json({ error: 'Sem permissão.' })

    const { teamName, city, state, category, responsible, phone, email, status } = req.body
    const result = await pool.query(
      `UPDATE teams SET
        team_name = COALESCE($1, team_name),
        city = COALESCE($2, city),
        state = COALESCE($3, state),
        category = COALESCE($4, category),
        responsible = COALESCE($5, responsible),
        phone = COALESCE($6, phone),
        email = COALESCE($7, email),
        status = COALESCE($8, status)
      WHERE id = $9 RETURNING *`,
      [teamName, city, state, category, responsible, phone, email, status, id]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Equipe não encontrada.' })
    return res.json(result.rows[0])
  }

  if (req.method === 'DELETE') {
    const team = await pool.query('SELECT user_id, status FROM teams WHERE id = $1', [id])
    if (!team.rows[0]) return res.status(404).json({ error: 'Equipe não encontrada.' })

    // Usuário só pode excluir a própria equipe enquanto estiver pendente
    if (user.role !== 'admin') {
      if (team.rows[0].user_id !== user.id) return res.status(403).json({ error: 'Sem permissão.' })
      if (team.rows[0].status !== 'pending') return res.status(403).json({ error: 'Inscrição já processada, não é possível excluir.' })
    }

    await pool.query('DELETE FROM teams WHERE id = $1', [id])
    return res.status(204).end()
  }

  res.status(405).end()
}
