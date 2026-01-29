import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProposal } from '@/context/ProposalContext'

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { proposal, updateProposal } = useProposal()
  const { profile } = proposal

  const updateProfile = (field: keyof typeof profile, value: string) => {
    const newProfile = { ...profile, [field]: value }

    // Sync with old fields if necessary (as per user story)
    const updates: any = { profile: newProfile }
    if (field === 'company') updates.agencyName = value
    if (field === 'cnpj') updates.agencyCnpj = value
    if (field === 'name') updates.agencyRep = value

    updateProposal(updates)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Perfil da Agência</DialogTitle>
          <DialogDescription>
            Gerencie as informações da sua empresa e consultor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Logo URL</Label>
            <Input
              value={profile.logo}
              onChange={(e) => updateProfile('logo', e.target.value)}
              className="col-span-3"
            />
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Nome</Label>
            <Input
              value={profile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">CPF</Label>
            <Input
              value={profile.cpf}
              onChange={(e) => updateProfile('cpf', e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
