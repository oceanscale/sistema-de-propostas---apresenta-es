import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search, FileText, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOCK_PROJECTS = [
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
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              GrowthProposal OS
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
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img
                src="https://img.usecurling.com/ppl/thumbnail?gender=male"
                alt="User"
              />
            </div>
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
          {MOCK_PROJECTS.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow border-slate-200"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <FileText className="w-5 h-5" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
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
        </div>
      </main>
    </div>
  )
}

export default Index
