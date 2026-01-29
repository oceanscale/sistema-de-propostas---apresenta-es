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
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'

const INITIAL_PROJECTS = [
  {
    id: '1',
    name: 'Tyrreno Imóveis',
    date: '27 jan 2026',
    status: 'Em andamento',
  },
  { id: '2', name: 'Varejo Xperience', date: '25 jan 2026', status: 'Enviado' },
  { id: '3', name: 'Dr. Consultoria', date: '20 jan 2026', status: 'Aprovado' },
]

const Index = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

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
              <Input className="pl-9 w-64" placeholder="Buscar projetos..." />
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
          <Link to="/editor">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Nova Proposta
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow border-slate-200 group"
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
              <CardContent>
                <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                <p className="text-sm text-slate-500">
                  Criado em {project.date}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    project.status === 'Aprovado'
                      ? 'bg-emerald-100 text-emerald-700'
                      : project.status === 'Enviado'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {project.status}
                </span>
                <Link to="/editor">
                  <Button variant="link" className="text-sky-500 p-0 h-auto">
                    Abrir Editor &rarr;
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p>Nenhuma proposta encontrada.</p>
              <Link to="/editor">
                <Button variant="link" className="text-sky-500">
                  Criar primeira proposta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Index
