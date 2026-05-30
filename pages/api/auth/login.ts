import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import pool, { initDB } from '@/lib/db'
import { signToken } from '@/lib/auth'

const ADMIN_EMAIL = 'admin@luigipatriarcha.com'
const ADMIN_PASSWORD = 'admin123'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'E-mail e senha obrigatórios.' })

  try {
    await initDB()

    // Admin hardcoded
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const result = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE email = $1', [email])
      let user = result.rows[0]
      if (!user) {
        const hash = await bcrypt.hash(ADMIN_PASSWORD, 10)
        const ins = await pool.query(
          "INSERT INTO users (name, email, password_hash, role) VALUES ('Administrador', $1, $2, 'admin') ON CONFLICT (email) DO UPDATE SET role='admin' RETURNING id, name, email, role, created_at",
          [ADMIN_EMAIL, hash]
        )
        user = ins.rows[0]
      }
      const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name })
      return res.json({ user, token })
    }

    const result = await pool.query('SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) return res.status(401).json({ error: 'E-mail ou senha inválidos.' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'E-mail ou senha inválidos.' })

    const { password_hash, ...safeUser } = user
    const token = signToken({ id: safeUser.id, email: safeUser.email, role: safeUser.role, name: safeUser.name })
    res.json({ user: safeUser, token })
  } catch (err) {
    res.status(500).json({ error: 'Erro interno.' })
  }
}
