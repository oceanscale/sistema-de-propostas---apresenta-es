import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useProposal } from '@/context/ProposalContext'
import { useAuth } from '@/hooks/use-auth'
import { formatCPF, formatCNPJ } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { proposal, updateProposal } = useProposal()
  const { profile } = proposal
  const { user } = useAuth()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const updateProfile = (field: keyof typeof profile, value: string) => {
    let formattedValue = value
    if (field === 'cpf') formattedValue = formatCPF(value)
    if (field === 'cnpj') formattedValue = formatCNPJ(value)

    const newProfile = { ...profile, [field]: formattedValue }

    // Sync with old fields if necessary
    const updates: any = { profile: newProfile }
    if (field === 'company') updates.agencyName = formattedValue
    if (field === 'cnpj') updates.agencyCnpj = formattedValue
    if (field === 'name') updates.agencyRep = formattedValue

    updateProposal(updates)
  }

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        company_name: profile.company,
        cnpj: profile.cnpj,
        representative_name: profile.name,
        cpf: profile.cpf,
        logo_url: profile.logo,
      })

      if (error) throw error

      toast({
        title: 'Perfil salvo!',
        description: 'Informações atualizadas com sucesso.',
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Perfil da Agência</DialogTitle>
          <DialogDescription>
            Informações globais da sua agência.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Logo URL</Label>
            <Input
              value={profile.logo}
              onChange={(e) => updateProfile('logo', e.target.value)}
              className="col-span-3"
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex justify-center">
              {profile.logo && (
                <img
                  src={profile.logo}
                  alt="Logo"
                  className="h-12 object-contain"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Empresa</Label>
            <Input
              value={profile.company}
              onChange={(e) => updateProfile('company', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">CNPJ</Label>
            <Input
              value={profile.cnpj}
              onChange={(e) => updateProfile('cnpj', e.target.value)}
              className="col-span-3"
              maxLength={18}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Nome Rep.</Label>
            <Input
              value={profile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">CPF Rep.</Label>
            <Input
              value={profile.cpf}
              onChange={(e) => updateProfile('cpf', e.target.value)}
              className="col-span-3"
              maxLength={14}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={saveProfile} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Salvar Perfil
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
