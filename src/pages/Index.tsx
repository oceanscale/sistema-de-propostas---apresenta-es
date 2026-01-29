import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Search,
  FileText,
  Trash2,
  LogOut,
  User,
  LayoutTemplate,
  Users,
  UserCircle,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'

export default function Index() {
  const [projects, setProjects] = useState<any[]>([])
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProposalTag, setNewProposalTag] = useState('')
  const [creating, setCreating] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (user) {
      fetchProposals()
    }
  }, [user])

  const fetchProposals = async () => {
    const { data, error } = await supabase
      .from('proposals')
      .select('id, client_name, created_at, updated_at, content, tags')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    const formatted = data.map((p) => {
      const content = p.content as any
      return {
        id: p.id,
        name: p.client_name || content?.clientName || 'Sem título',
        date: new Date(p.created_at).toLocaleDateString(),
        updatedAt:
          new Date(p.updated_at).toLocaleDateString() +
          ' ' +
          new Date(p.updated_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        status: content?.status || 'draft',
        tags: p.tags || content?.tags || [],
      }
    })
    setProjects(formatted)
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Tem certeza?')) return
    const { error } = await supabase.from('proposals').delete().eq('id', id)
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id))
      toast({ title: 'Proposta excluída.' })
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const handleCreateProposal = async () => {
    if (!newProposalTag) {
      toast({ title: 'Selecione uma tag', variant: 'destructive' })
      return
    }
    setCreating(true)
    try {
      const { data, error } = await supabase
        .from('proposals')
        .insert({
          client_name: 'Nova Proposta',
          title: 'Plano de Aceleração',
          content: { tags: [newProposalTag] },
          tags: [newProposalTag],
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      navigate('/editor', { state: { proposalId: data.id } })
    } catch (e: any) {
      toast({
        title: 'Erro ao criar',
        description: e.message,
        variant: 'destructive',
      })
    } finally {
      setCreating(false)
    }
  }

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              OCEAN PROPOSAL
            </h1>
            <p className="text-slate-500">
              Gerenciador de Propostas de Performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="pl-9 w-64"
                placeholder="Buscar projetos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden outline-none ring-offset-2 focus:ring-2 focus:ring-slate-400 transition-all flex items-center justify-center">
                  {user?.email?.charAt(0).toUpperCase() || (
                    <User className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <User className="w-4 h-4 mr-2" /> {user?.email}
                </DropdownMenuItem>
                <Link to="/perfil">
                  <DropdownMenuItem>
                    <UserCircle className="w-4 h-4 mr-2" /> Perfil
                  </DropdownMenuItem>
                </Link>
                <Link to="/biblioteca">
                  <DropdownMenuItem>
                    <LayoutTemplate className="w-4 h-4 mr-2" /> Biblioteca
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Propostas Recentes
          </h2>
          <Button
            className="bg-sky-500 hover:bg-sky-600 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Nova Proposta
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow border-slate-200 group flex flex-col"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <FileText className="w-5 h-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle
                  className="text-lg mb-1 truncate"
                  title={project.name}
                >
                  {project.name}
                </CardTitle>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Criado em: {project.date}</p>
                  <p className="font-medium text-slate-600">
                    Atualizado: {project.updatedAt}
                  </p>
                </div>
                <div className="flex gap-1 mt-3">
                  {project.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${project.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                >
                  {project.status === 'draft' ? 'Rascunho' : project.status}
                </span>
                <Button
                  variant="link"
                  className="text-sky-500 p-0 h-auto"
                  onClick={() =>
                    navigate('/editor', { state: { proposalId: project.id } })
                  }
                >
                  Abrir Editor &rarr;
                </Button>
              </CardFooter>
            </Card>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p>Nenhuma proposta encontrada.</p>
              <Button
                variant="link"
                className="text-sky-500"
                onClick={() => setIsModalOpen(true)}
              >
                Criar primeira proposta
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Proposta</DialogTitle>
            <DialogDescription>
              Selecione a categoria da proposta para iniciar.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Tag da Proposta</Label>
            <Select value={newProposalTag} onValueChange={setNewProposalTag}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Comercial">Comercial</SelectItem>
                <SelectItem value="CS">CS (Customer Success)</SelectItem>
                <SelectItem value="Personalizada">Personalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateProposal} disabled={creating}>
              {creating ? 'Criando...' : 'Criar Proposta'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
