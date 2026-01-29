import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Trash2, Copy, LayoutTemplate, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'

interface Template {
  id: string
  name: string
  description: string
  thumbnail_url: string
  content: any
  type: string
  created_at: string
}

export default function Library() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchTemplates()
  }, [user])

  const fetchTemplates = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (error: any) {
      console.error('Error fetching templates:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os modelos.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteTemplate = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este modelo?')) return
    try {
      const { error } = await supabase.from('templates').delete().eq('id', id)
      if (error) throw error
      setTemplates(templates.filter((t) => t.id !== id))
      toast({ title: 'Modelo excluído com sucesso!' })
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const duplicateTemplate = async (template: Template) => {
    try {
      const { id, created_at, ...rest } = template
      const { data, error } = await supabase
        .from('templates')
        .insert([{ ...rest, name: `${template.name} (Cópia)` }])
        .select()
        .single()

      if (error) throw error
      if (data) {
        setTemplates([data, ...templates])
        toast({ title: 'Modelo duplicado com sucesso!' })
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao duplicar',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <LayoutTemplate className="w-6 h-6 text-sky-500" />
              Biblioteca de Modelos
            </h1>
            <p className="text-slate-500">
              Gerencie seus slides e templates reutilizáveis
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              className="pl-9 w-64"
              placeholder="Buscar modelos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Carregando modelos...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group overflow-hidden border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-slate-100 relative overflow-hidden border-b border-slate-100">
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-300">
                      <LayoutTemplate className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle
                    className="text-base font-bold truncate"
                    title={template.name}
                  >
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xs text-slate-500 capitalize">
                    {template.type || 'Slide'}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-sky-500"
                      onClick={() => duplicateTemplate(template)}
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-500"
                      onClick={() => deleteTemplate(template.id)}
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {filteredTemplates.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-lg border border-dashed border-slate-300">
                <p>Nenhum modelo encontrado.</p>
                <p className="text-sm mt-2">
                  Salve slides como modelos através do Editor.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
