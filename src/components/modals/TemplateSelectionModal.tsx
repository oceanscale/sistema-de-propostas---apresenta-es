import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { LayoutTemplate, Loader2, Plus } from 'lucide-react'

interface Template {
  id: string
  name: string
  thumbnail_url: string
  content: any
  type: string
}

interface TemplateSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (template: Template) => void
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
  onSelect,
}: TemplateSelectionModalProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      fetchTemplates()
    }
  }, [open])

  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setTemplates(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-slate-100">
          <DialogTitle>Adicionar Página</DialogTitle>
          <DialogDescription>
            Escolha um modelo da biblioteca ou uma página em branco.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-slate-50">
          <ScrollArea className="h-full p-6">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="group cursor-pointer bg-white rounded-lg border border-slate-200 overflow-hidden hover:ring-2 hover:ring-sky-500 transition-all hover:shadow-md"
                    onClick={() => {
                      onSelect(template)
                      onOpenChange(false)
                    }}
                  >
                    <div className="aspect-video bg-slate-100 relative">
                      {template.thumbnail_url ? (
                        <img
                          src={template.thumbnail_url}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <LayoutTemplate className="w-10 h-10 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Plus className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transform scale-50 group-hover:scale-100 transition-all" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {template.name}
                      </h4>
                      <p className="text-xs text-slate-500 capitalize">
                        {template.type || 'Slide'}
                      </p>
                    </div>
                  </div>
                ))}

                {templates.length === 0 && (
                  <div className="col-span-full py-10 text-center text-slate-400">
                    <p>Nenhum modelo salvo na biblioteca.</p>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
