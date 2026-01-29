import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Search,
  Trash2,
  Copy,
  LayoutTemplate,
  ArrowLeft,
  Edit2,
  UserCircle,
  LogOut,
  Users,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Template {
  id: string
  name: string
  description: string
  thumbnail_url: string
  content: any
  type: string
  tags: string[]
  created_at: string
}

export default function Library() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const { toast } = useToast()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

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

  const handleUpdateTemplate = async () => {
    if (!editingTemplate) return
    try {
      const { error } = await supabase
        .from('templates')
        .update({
          name: editingTemplate.name,
          tags: editingTemplate.tags,
        })
        .eq('id', editingTemplate.id)

      if (error) throw error

      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id ? editingTemplate : t,
        ),
      )
      setEditingTemplate(null)
      toast({ title: 'Modelo atualizado!' })
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Link
              to="/"
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <LayoutTemplate className="w-6 h-6 text-sky-500" />
                Biblioteca de Modelos
              </h1>
              <p className="text-slate-500">
                Gerencie seus slides e templates reutilizáveis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="pl-9 w-64"
                placeholder="Buscar modelos ou tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden outline-none ring-offset-2 focus:ring-2 focus:ring-slate-400 transition-all flex items-center justify-center">
                  {user?.email?.charAt(0).toUpperCase() || (
                    <UserCircle className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/perfil">
                  <DropdownMenuItem>
                    <UserCircle className="w-4 h-4 mr-2" /> Perfil
                  </DropdownMenuItem>
                </Link>
                <Link to="/usuarios">
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" /> Usuários
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                className="group overflow-hidden border-slate-200 hover:shadow-lg transition-all flex flex-col"
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
                  {/* Overlay for quick actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingTemplate(template)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" /> Editar
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2 flex-1">
                  <CardTitle
                    className="text-base font-bold truncate"
                    title={template.name}
                  >
                    {template.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags &&
                      template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-1 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
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

      {/* Edit Template Modal */}
      <Dialog
        open={!!editingTemplate}
        onOpenChange={(open) => !open && setEditingTemplate(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Modelo</DialogTitle>
            <DialogDescription>
              Atualize as informações do modelo.
            </DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Modelo</Label>
                <Input
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Tags (separadas por vírgula)</Label>
                <Input
                  value={editingTemplate.tags?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      tags: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Ex: Marketing, Vendas, Q1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateTemplate}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
