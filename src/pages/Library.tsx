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

interface Template {
  id: string
  name: string
  description: string
  thumbnail_url: string
  content: any
  type: string
  tags: string[]
  category: string
  created_at: string
}

const CATEGORIES = [
  'Todas',
  'Marketing',
  'Comercial',
  'CS',
  'Personalizada',
  'General',
]

export default function Library() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
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
      console.error(error)
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
    if (!confirm('Tem certeza?')) return
    try {
      const { error } = await supabase.from('templates').delete().eq('id', id)
      if (error) throw error
      setTemplates(templates.filter((t) => t.id !== id))
      toast({ title: 'Modelo excluído.' })
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (template: Template) => {
    navigate(`/editor?templateId=${template.id}`)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory =
      selectedCategory === 'Todas' ||
      t.category === selectedCategory ||
      (t.tags && t.tags.includes(selectedCategory))
    return matchesSearch && matchesCategory
  })

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
            </div>
          </div>
          <div className="flex items-center gap-4">
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
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                </Link>
                <Link to="/usuarios">
                  <DropdownMenuItem>Usuários</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleSignOut}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'bg-slate-900' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              className="pl-9 w-64"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

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
                <div className="aspect-video bg-slate-100 relative overflow-hidden border-b border-slate-100 group-hover:opacity-90 transition-opacity">
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Fallback visuals if no thumbnail
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300">
                      <LayoutTemplate className="w-10 h-10 mb-2" />
                      <span className="text-xs uppercase font-bold">
                        Sem Preview
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" /> Editar Conteúdo
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
                    <Badge variant="outline" className="text-[10px]">
                      {template.category || 'Geral'}
                    </Badge>
                    {template.tags?.map((tag) => (
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-500"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
