import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { templatesApi } from '@/lib/api'
import { FileText, Upload, Calendar, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Template {
  templateId: string
  name: string
  version: number
  createdAt: string
  fields: Array<{
    key: string
    type: string
    format?: string
  }>
}

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef(false)
  const isInitialLoadRef = useRef(true)

  useEffect(() => {
    // Prevent double API calls in React StrictMode (development)
    if (hasFetchedRef.current) return
    
    hasFetchedRef.current = true
    fetchTemplates()
  }, [])

  const fetchTemplates = async (showSuccessToast: boolean = false) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await templatesApi.getUserTemplates()
      // Handle the response format: { success: true, data: [...], count: number }
      const userTemplates = response.data || response.templates || response
      setTemplates(Array.isArray(userTemplates) ? userTemplates : [])
      
      // Only show success toast if explicitly requested (manual refresh)
      if (showSuccessToast && userTemplates.length > 0) {
        toast.success(`Loaded ${userTemplates.length} template${userTemplates.length > 1 ? 's' : ''}`)
      }
      
      // Mark as no longer initial load after first successful fetch
      isInitialLoadRef.current = false
    } catch (err: any) {
      console.error('Failed to fetch templates:', err)
      const errorMessage = err?.response?.data?.error || err?.message || 'Failed to load templates'
      setError(errorMessage)
      
      // Always show error toasts
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md mx-auto border-destructive/50 bg-destructive/5">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Failed to load templates
                </h3>
                <p className="text-destructive/80">
                  {error}
                </p>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={() => fetchTemplates(true)} 
                  variant="outline"
                  size="lg"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">Your Templates</h2>
          <p className="text-muted-foreground mt-1">
            Manage and create documents from your uploaded templates
          </p>
        </div>
        {templates.length > 0 && (
          <div className="flex-shrink-0">
            <Link to="/upload">
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload New Template</span>
                <span className="sm:hidden">Upload</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full mx-auto flex flex-col items-center justify-center">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    No templates yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Upload your first DOCX template to get started creating dynamic documents
                  </p>
                </div>

                <div className="pt-2 flex justify-center">
                  <Link to="/upload">
                    <Button size="lg" className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Your First Template
                    </Button>
                  </Link>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Supported format: DOCX files
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <motion.div
              key={template.templateId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-center gap-2 text-base">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="truncate" title={template.name}>
                      {template.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Template Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="truncate">{formatDate(template.createdAt)}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-muted-foreground">Version: </span>
                        <span className="font-medium">{template.version}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm bg-muted/30 px-3 py-2 rounded">
                      <span className="text-muted-foreground">Fields extracted:</span>
                      <span className="font-medium text-foreground">
                        {template.fields.length} fields
                      </span>
                    </div>

                    {/* Field Types Preview */}
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full"
                        >
                          {field.type}
                        </span>
                      ))}
                      {template.fields.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{template.fields.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex justify-center">
                      <Button 
                        className="w-full"
                        onClick={() => {
                          // Store template info for render page
                          localStorage.setItem('templateSpec', JSON.stringify({
                            templateId: template.templateId,
                            version: template.version,
                            fields: template.fields
                          }))
                          toast.success(`Selected "${template.name}" - redirecting to document creator...`)
                          window.location.href = '/render'
                        }}
                        disabled={template.fields.length === 0}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Create Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default TemplateManager
