// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1'
  }
  public: {
    Tables: {
      agency_config: {
        Row: {
          created_at: string | null
          fixed_costs: number | null
          id: string
          total_capacity: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          fixed_costs?: number | null
          id?: string
          total_capacity?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          fixed_costs?: number | null
          id?: string
          total_capacity?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      agency_costs: {
        Row: {
          cancelled_at: string | null
          category: string | null
          contract_date: string | null
          cost_center_split: Json | null
          created_at: string | null
          id: string
          monthly_amount: number
          name: string
          purpose: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          cancelled_at?: string | null
          category?: string | null
          contract_date?: string | null
          cost_center_split?: Json | null
          created_at?: string | null
          id?: string
          monthly_amount?: number
          name: string
          purpose?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          cancelled_at?: string | null
          category?: string | null
          contract_date?: string | null
          cost_center_split?: Json | null
          created_at?: string | null
          id?: string
          monthly_amount?: number
          name?: string
          purpose?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      budget_limits: {
        Row: {
          amount: number
          category: string
          created_at: string
          id: string
          period: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          id?: string
          period: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          id?: string
          period?: string
        }
        Relationships: []
      }
      checklist_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          order_index: number | null
          parent_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order_index?: number | null
          parent_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order_index?: number | null
          parent_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'checklist_folders_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'checklist_folders'
            referencedColumns: ['id']
          },
        ]
      }
      checklist_items: {
        Row: {
          assigned_to: string | null
          category: string | null
          checklist_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          is_completed: boolean | null
          order_index: number | null
          priority: string | null
          reminder_sent: boolean | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          checklist_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          priority?: string | null
          reminder_sent?: boolean | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          checklist_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          order_index?: number | null
          priority?: string | null
          reminder_sent?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'checklist_items_assigned_to_fkey'
            columns: ['assigned_to']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'checklist_items_checklist_id_fkey'
            columns: ['checklist_id']
            isOneToOne: false
            referencedRelation: 'checklists'
            referencedColumns: ['id']
          },
        ]
      }
      checklists: {
        Row: {
          allow_external_completion: boolean | null
          created_at: string
          folder_id: string | null
          id: string
          is_external: boolean | null
          is_shared: boolean | null
          is_template: boolean | null
          order_index: number | null
          share_token: string | null
          title: string
        }
        Insert: {
          allow_external_completion?: boolean | null
          created_at?: string
          folder_id?: string | null
          id?: string
          is_external?: boolean | null
          is_shared?: boolean | null
          is_template?: boolean | null
          order_index?: number | null
          share_token?: string | null
          title: string
        }
        Update: {
          allow_external_completion?: boolean | null
          created_at?: string
          folder_id?: string | null
          id?: string
          is_external?: boolean | null
          is_shared?: boolean | null
          is_template?: boolean | null
          order_index?: number | null
          share_token?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'checklists_folder_id_fkey'
            columns: ['folder_id']
            isOneToOne: false
            referencedRelation: 'checklist_folders'
            referencedColumns: ['id']
          },
        ]
      }
      client_metrics: {
        Row: {
          ads_spend: number | null
          agency_fee: number | null
          cost_goods_sold: number | null
          created_at: string | null
          estimated_ltv: number | null
          funnel_data: Json | null
          id: string
          lead_id: string | null
          period_end: string | null
          period_start: string | null
          pipeline_data: Json | null
          platform_data: Json | null
          report_name: string | null
          revenue: number | null
          updated_at: string | null
        }
        Insert: {
          ads_spend?: number | null
          agency_fee?: number | null
          cost_goods_sold?: number | null
          created_at?: string | null
          estimated_ltv?: number | null
          funnel_data?: Json | null
          id?: string
          lead_id?: string | null
          period_end?: string | null
          period_start?: string | null
          pipeline_data?: Json | null
          platform_data?: Json | null
          report_name?: string | null
          revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          ads_spend?: number | null
          agency_fee?: number | null
          cost_goods_sold?: number | null
          created_at?: string | null
          estimated_ltv?: number | null
          funnel_data?: Json | null
          id?: string
          lead_id?: string | null
          period_end?: string | null
          period_start?: string | null
          pipeline_data?: Json | null
          platform_data?: Json | null
          report_name?: string | null
          revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'client_metrics_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          cnpj: string | null
          company_name: string
          contract_date: string | null
          contract_details: Json | null
          contract_value: number | null
          created_at: string | null
          follow_up_date: string | null
          id: string
          renewal_date: string | null
          representative: string | null
        }
        Insert: {
          address?: string | null
          cnpj?: string | null
          company_name: string
          contract_date?: string | null
          contract_details?: Json | null
          contract_value?: number | null
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          renewal_date?: string | null
          representative?: string | null
        }
        Update: {
          address?: string | null
          cnpj?: string | null
          company_name?: string
          contract_date?: string | null
          contract_details?: Json | null
          contract_value?: number | null
          created_at?: string | null
          follow_up_date?: string | null
          id?: string
          renewal_date?: string | null
          representative?: string | null
        }
        Relationships: []
      }
      contract_reminders: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string
          remind_at: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id: string
          remind_at: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string
          remind_at?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'contract_reminders_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      contract_versions: {
        Row: {
          author: string | null
          changes: string | null
          created_at: string | null
          date: string | null
          id: string
          lead_id: string | null
          snapshot: Json | null
        }
        Insert: {
          author?: string | null
          changes?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          lead_id?: string | null
          snapshot?: Json | null
        }
        Update: {
          author?: string | null
          changes?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          lead_id?: string | null
          snapshot?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'contract_versions_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      form_submissions: {
        Row: {
          created_at: string | null
          data: Json
          form_id: string | null
          id: string
          is_archived: boolean | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          form_id?: string | null
          id?: string
          is_archived?: boolean | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          form_id?: string | null
          id?: string
          is_archived?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: 'form_submissions_form_id_fkey'
            columns: ['form_id']
            isOneToOne: false
            referencedRelation: 'forms'
            referencedColumns: ['id']
          },
        ]
      }
      forms: {
        Row: {
          created_at: string | null
          description: string | null
          fields: Json | null
          id: string
          logic_config: Json | null
          thank_you_video_url: string | null
          theme_config: Json | null
          title: string
          views: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          fields?: Json | null
          id?: string
          logic_config?: Json | null
          thank_you_video_url?: string | null
          theme_config?: Json | null
          title: string
          views?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          fields?: Json | null
          id?: string
          logic_config?: Json | null
          thank_you_video_url?: string | null
          theme_config?: Json | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      funnel_elements: {
        Row: {
          category: string
          color: string | null
          created_at: string
          folder_id: string | null
          icon: string
          id: string
          image_url: string | null
          is_global: boolean | null
          name: string
          order_index: number | null
          user_id: string | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          folder_id?: string | null
          icon: string
          id?: string
          image_url?: string | null
          is_global?: boolean | null
          name: string
          order_index?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          folder_id?: string | null
          icon?: string
          id?: string
          image_url?: string | null
          is_global?: boolean | null
          name?: string
          order_index?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'funnel_elements_folder_id_fkey'
            columns: ['folder_id']
            isOneToOne: false
            referencedRelation: 'funnel_folders'
            referencedColumns: ['id']
          },
        ]
      }
      funnel_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      funnels: {
        Row: {
          created_at: string
          description: string | null
          drawings: Json | null
          edges: Json | null
          id: string
          nodes: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          drawings?: Json | null
          edges?: Json | null
          id?: string
          nodes?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          drawings?: Json | null
          edges?: Json | null
          id?: string
          nodes?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      kanban_columns: {
        Row: {
          color: string | null
          id: string
          order: number | null
          title: string
        }
        Insert: {
          color?: string | null
          id: string
          order?: number | null
          title: string
        }
        Update: {
          color?: string | null
          id?: string
          order?: number | null
          title?: string
        }
        Relationships: []
      }
      lead_activity_logs: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          lead_id: string | null
          new_value: string | null
          old_value: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string | null
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string | null
          new_value?: string | null
          old_value?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lead_activity_logs_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_activity_logs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      lead_notes: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          lead_id: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          lead_id?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          lead_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'lead_notes_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lead_notes_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      leads: {
        Row: {
          additional_info: string | null
          address: string | null
          archived_at: string | null
          assigned_to: string | null
          birth_date: string | null
          city: string | null
          cnpj: string | null
          column_entry_at: string | null
          company_name: string
          contract_data: Json | null
          cpf: string | null
          created_at: string | null
          email: string | null
          estimated_value: number | null
          follow_up_date: string | null
          id: string
          is_archived: boolean | null
          is_new: boolean | null
          municipal_registration: string | null
          origin_form_id: string | null
          phone: string | null
          priority: string | null
          renewal_date: string | null
          representative: string | null
          state: string | null
          state_registration: string | null
          status: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          additional_info?: string | null
          address?: string | null
          archived_at?: string | null
          assigned_to?: string | null
          birth_date?: string | null
          city?: string | null
          cnpj?: string | null
          column_entry_at?: string | null
          company_name: string
          contract_data?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          estimated_value?: number | null
          follow_up_date?: string | null
          id?: string
          is_archived?: boolean | null
          is_new?: boolean | null
          municipal_registration?: string | null
          origin_form_id?: string | null
          phone?: string | null
          priority?: string | null
          renewal_date?: string | null
          representative?: string | null
          state?: string | null
          state_registration?: string | null
          status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          additional_info?: string | null
          address?: string | null
          archived_at?: string | null
          assigned_to?: string | null
          birth_date?: string | null
          city?: string | null
          cnpj?: string | null
          column_entry_at?: string | null
          company_name?: string
          contract_data?: Json | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          estimated_value?: number | null
          follow_up_date?: string | null
          id?: string
          is_archived?: boolean | null
          is_new?: boolean | null
          municipal_registration?: string | null
          origin_form_id?: string | null
          phone?: string | null
          priority?: string | null
          renewal_date?: string | null
          representative?: string | null
          state?: string | null
          state_registration?: string | null
          status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'leads_assigned_to_fkey'
            columns: ['assigned_to']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'leads_origin_form_id_fkey'
            columns: ['origin_form_id']
            isOneToOne: false
            referencedRelation: 'forms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'leads_status_fkey'
            columns: ['status']
            isOneToOne: false
            referencedRelation: 'kanban_columns'
            referencedColumns: ['id']
          },
        ]
      }
      market_studies: {
        Row: {
          client_name: string
          created_at: string
          data: Json | null
          id: string
          share_token: string | null
          status: string
          theme_config: Json | null
          updated_at: string
        }
        Insert: {
          client_name: string
          created_at?: string
          data?: Json | null
          id?: string
          share_token?: string | null
          status?: string
          theme_config?: Json | null
          updated_at?: string
        }
        Update: {
          client_name?: string
          created_at?: string
          data?: Json | null
          id?: string
          share_token?: string | null
          status?: string
          theme_config?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      onboarding_progress: {
        Row: {
          accepted_term: boolean | null
          completed_steps: Json | null
          created_at: string
          id: string
          is_archived: boolean | null
          is_new: boolean | null
          lead_id: string | null
          score: number | null
          status: string | null
          trail_id: string | null
          updated_at: string
        }
        Insert: {
          accepted_term?: boolean | null
          completed_steps?: Json | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_new?: boolean | null
          lead_id?: string | null
          score?: number | null
          status?: string | null
          trail_id?: string | null
          updated_at?: string
        }
        Update: {
          accepted_term?: boolean | null
          completed_steps?: Json | null
          created_at?: string
          id?: string
          is_archived?: boolean | null
          is_new?: boolean | null
          lead_id?: string | null
          score?: number | null
          status?: string | null
          trail_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'onboarding_progress_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'onboarding_progress_trail_id_fkey'
            columns: ['trail_id']
            isOneToOne: false
            referencedRelation: 'onboarding_trails'
            referencedColumns: ['id']
          },
        ]
      }
      onboarding_steps: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_index: number
          quiz_data: Json | null
          resources: Json | null
          step_type: string | null
          title: string
          trail_id: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          quiz_data?: Json | null
          resources?: Json | null
          step_type?: string | null
          title: string
          trail_id?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          quiz_data?: Json | null
          resources?: Json | null
          step_type?: string | null
          title?: string
          trail_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'onboarding_steps_trail_id_fkey'
            columns: ['trail_id']
            isOneToOne: false
            referencedRelation: 'onboarding_trails'
            referencedColumns: ['id']
          },
        ]
      }
      onboarding_trails: {
        Row: {
          category: string | null
          created_at: string
          custom_term: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          custom_term?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          custom_term?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          cnpj: string | null
          company_name: string | null
          cpf: string | null
          created_at: string | null
          favicon_url: string | null
          id: string
          integrations: Json | null
          landing_bg_color: string | null
          landing_bg_image_url: string | null
          landing_font_color: string | null
          landing_form_color: string | null
          logo_url: string | null
          logo_white_url: string | null
          representative_email: string | null
          representative_name: string | null
          representative_phone: string | null
          role: string | null
          support_links: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          cnpj?: string | null
          company_name?: string | null
          cpf?: string | null
          created_at?: string | null
          favicon_url?: string | null
          id: string
          integrations?: Json | null
          landing_bg_color?: string | null
          landing_bg_image_url?: string | null
          landing_font_color?: string | null
          landing_form_color?: string | null
          logo_url?: string | null
          logo_white_url?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          role?: string | null
          support_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          cnpj?: string | null
          company_name?: string | null
          cpf?: string | null
          created_at?: string | null
          favicon_url?: string | null
          id?: string
          integrations?: Json | null
          landing_bg_color?: string | null
          landing_bg_image_url?: string | null
          landing_font_color?: string | null
          landing_form_color?: string | null
          logo_url?: string | null
          logo_white_url?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          role?: string | null
          support_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_services: {
        Row: {
          created_at: string | null
          id: string
          project_id: string | null
          service_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          service_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'project_services_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'project_services_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      proposal_items: {
        Row: {
          created_at: string
          description: string | null
          hours: number | null
          id: string
          name: string
          proposal_id: string | null
          quantity: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          hours?: number | null
          id?: string
          name: string
          proposal_id?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          hours?: number | null
          id?: string
          name?: string
          proposal_id?: string | null
          quantity?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'proposal_items_proposal_id_fkey'
            columns: ['proposal_id']
            isOneToOne: false
            referencedRelation: 'proposals'
            referencedColumns: ['id']
          },
        ]
      }
      proposals: {
        Row: {
          client_name: string
          company_name: string | null
          considerations: string | null
          content: Json | null
          contract_duration: string | null
          created_at: string
          email: string | null
          follow_up_form_id: string | null
          general_description: string | null
          id: string
          is_template: boolean | null
          lead_id: string | null
          payment_condition: string | null
          payment_installments: number | null
          phone: string | null
          status: string | null
          tags: string[] | null
          template_name: string | null
          thank_you_video_url: string | null
          title: string | null
          total_value: number | null
          updated_at: string
          validity_date: string | null
        }
        Insert: {
          client_name: string
          company_name?: string | null
          considerations?: string | null
          content?: Json | null
          contract_duration?: string | null
          created_at?: string
          email?: string | null
          follow_up_form_id?: string | null
          general_description?: string | null
          id?: string
          is_template?: boolean | null
          lead_id?: string | null
          payment_condition?: string | null
          payment_installments?: number | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          template_name?: string | null
          thank_you_video_url?: string | null
          title?: string | null
          total_value?: number | null
          updated_at?: string
          validity_date?: string | null
        }
        Update: {
          client_name?: string
          company_name?: string | null
          considerations?: string | null
          content?: Json | null
          contract_duration?: string | null
          created_at?: string
          email?: string | null
          follow_up_form_id?: string | null
          general_description?: string | null
          id?: string
          is_template?: boolean | null
          lead_id?: string | null
          payment_condition?: string | null
          payment_installments?: number | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          template_name?: string | null
          thank_you_video_url?: string | null
          title?: string | null
          total_value?: number | null
          updated_at?: string
          validity_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'proposals_follow_up_form_id_fkey'
            columns: ['follow_up_form_id']
            isOneToOne: false
            referencedRelation: 'forms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'proposals_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          },
        ]
      }
      service_folders: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'service_folders_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'service_folders'
            referencedColumns: ['id']
          },
        ]
      }
      service_items: {
        Row: {
          created_at: string | null
          hours_allocated: number | null
          id: string
          member_id: string | null
          service_id: string | null
        }
        Insert: {
          created_at?: string | null
          hours_allocated?: number | null
          id?: string
          member_id?: string | null
          service_id?: string | null
        }
        Update: {
          created_at?: string | null
          hours_allocated?: number | null
          id?: string
          member_id?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'service_items_member_id_fkey'
            columns: ['member_id']
            isOneToOne: false
            referencedRelation: 'team_members'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'service_items_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
        ]
      }
      service_versions: {
        Row: {
          created_at: string | null
          id: string
          service_id: string | null
          snapshot: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id?: string | null
          snapshot: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string | null
          snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: 'service_versions_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
        ]
      }
      services: {
        Row: {
          category: string | null
          clauses: Json | null
          commission_rate: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          duration: number | null
          folder_id: string | null
          id: string
          margin: number | null
          name: string
          price: number | null
          pricing_model: string | null
          tax_rate: number | null
        }
        Insert: {
          category?: string | null
          clauses?: Json | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration?: number | null
          folder_id?: string | null
          id?: string
          margin?: number | null
          name: string
          price?: number | null
          pricing_model?: string | null
          tax_rate?: number | null
        }
        Update: {
          category?: string | null
          clauses?: Json | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration?: number | null
          folder_id?: string | null
          id?: string
          margin?: number | null
          name?: string
          price?: number | null
          pricing_model?: string | null
          tax_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'services_folder_id_fkey'
            columns: ['folder_id']
            isOneToOne: false
            referencedRelation: 'service_folders'
            referencedColumns: ['id']
          },
        ]
      }
      team_members: {
        Row: {
          benefits: number | null
          contract_type: string
          created_at: string | null
          hours_month: number | null
          id: string
          name: string
          salary_fee: number | null
          tax_percent: number | null
        }
        Insert: {
          benefits?: number | null
          contract_type: string
          created_at?: string | null
          hours_month?: number | null
          id?: string
          name: string
          salary_fee?: number | null
          tax_percent?: number | null
        }
        Update: {
          benefits?: number | null
          contract_type?: string
          created_at?: string | null
          hours_month?: number | null
          id?: string
          name?: string
          salary_fee?: number | null
          tax_percent?: number | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string | null
          content: Json | null
          created_at: string | null
          dependencies: Json | null
          description: string | null
          id: string
          name: string
          sections: Json | null
          tags: string[] | null
          thumbnail_url: string | null
          type: string | null
        }
        Insert: {
          category?: string | null
          content?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          id?: string
          name: string
          sections?: Json | null
          tags?: string[] | null
          thumbnail_url?: string | null
          type?: string | null
        }
        Update: {
          category?: string | null
          content?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          id?: string
          name?: string
          sections?: Json | null
          tags?: string[] | null
          thumbnail_url?: string | null
          type?: string | null
        }
        Relationships: []
      }
      terms: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          id: string
          paragraphs: Json | null
          title: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          content: string
          created_at?: string
          id?: string
          paragraphs?: Json | null
          title: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          paragraphs?: Json | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive_old_data: { Args: never; Returns: undefined }
      archive_old_leads: { Args: never; Returns: undefined }
      check_contract_renewals: { Args: never; Returns: undefined }
      convert_lead_to_client: {
        Args: { contract_val: number; lead_id: string }
        Returns: undefined
      }
      toggle_checklist_item: {
        Args: { is_completed: boolean; item_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
