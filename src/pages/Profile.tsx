import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, User, Building, Mail, Lock, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [formData, setFormData] = useState({
    representative_name: '',
    company_name: '',
    representative_email: '',
  })
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (user) fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (data) {
      setFormData({
        representative_name: data.representative_name || '',
        company_name: data.company_name || '',
        representative_email: data.representative_email || user.email || '',
      })
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          representative_name: formData.representative_name,
          company_name: formData.company_name,
          representative_email: formData.representative_email,
        })
        .eq('id', user.id)
      if (error) throw error
      toast({ title: 'Perfil atualizado!' })
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.password !== passwordData.confirmPassword) {
      toast({
        title: 'Erro',
        description: 'Senhas não coincidem.',
        variant: 'destructive',
      })
      return
    }
    setPasswordLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.password,
      })
      if (error) throw error
      toast({ title: 'Senha atualizada!' })
      setPasswordData({ password: '', confirmPassword: '' })
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>Atualize suas informações</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={formData.representative_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representative_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={formData.representative_email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        representative_email: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}{' '}
                  Salvar
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Alterar senha</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdatePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nova Senha</Label>
                  <Input
                    type="password"
                    value={passwordData.password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirmar</Label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  variant="outline"
                >
                  {passwordLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}{' '}
                  Atualizar Senha
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
