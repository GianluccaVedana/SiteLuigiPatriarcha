import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import pool, { initDB } from '@/lib/db'
import { signToken } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Campos obrigatórios faltando.' })
  if (password.length < 6) return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres.' })

  try {
    await initDB()
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (exists.rows.length > 0) return res.status(409).json({ error: 'E-mail já cadastrado.' })

    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at',
      [name, email, hash]
    )
    const user = result.rows[0]
    const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name })
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ error: 'Erro interno.' })
  }
}
