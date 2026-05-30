import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { getTokenFromRequest } from '@/lib/auth'

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = getTokenFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Não autenticado.' })

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'teams')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: ({ mimetype }) => !!mimetype && ['image/jpeg', 'image/png', 'image/webp'].includes(mimetype),
  })

  form.parse(req, (err, _fields, files) => {
    if (err) return res.status(400).json({ error: 'Erro ao processar arquivo.' })

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' })

    const filename = path.basename(file.filepath)
    const url = `/uploads/teams/${filename}`
    res.json({ url })
  })
}
