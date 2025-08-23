import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useInspectTemplate } from '@/lib/queries'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const UploadInspect: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [inspectResult, setInspectResult] = useState<any>(null)
  
  const inspectMutation = useInspectTemplate()

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast.error('Please upload a valid DOCX file')
      return
    }
    
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setInspectResult(null)
      toast.success(`${file.name} uploaded successfully`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  })

  const handleInspect = async () => {
    if (!uploadedFile) return

    const loadingToast = toast.loading('Analyzing template and extracting fields...')

    try {
      const result = await inspectMutation.mutateAsync(uploadedFile)
      setInspectResult(result.data)
      toast.success(`Template analyzed! Found ${result.data.fields.length} fields`, { id: loadingToast })
    } catch (error: any) {
      console.error('Inspection failed:', error)
      const errorMessage = error?.response?.data?.error || error?.message || 'Failed to analyze template'
      toast.error(errorMessage, { id: loadingToast })
    }
  }

  const handleContinue = () => {
    if (inspectResult) {
      // Store the result in localStorage or state management
      localStorage.setItem('templateSpec', JSON.stringify(inspectResult))
      toast.success('Template ready! Redirecting to document creator...')
      navigate('/render')
    }
  }

  return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Upload Template
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a DOCX file to extract form fields and create dynamic documents
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {t('common.upload')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {uploadedFile ? (
                  <div>
                    <FileText className="mx-auto h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Drag and drop a DOCX file here, or click to select
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Only DOCX files are supported
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum file size: 10MB
                    </p>
                  </div>
                )}
              </div>

              {uploadedFile && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={handleInspect}
                    disabled={inspectMutation.isPending}
                    className="min-w-[120px]"
                  >
                    {inspectMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t('upload.inspecting')}
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        {t('nav.upload')}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inspection Results */}
          {inspectMutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-destructive/50 bg-destructive/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Failed to inspect template</p>
                      <p className="text-sm">
                        {inspectMutation.error?.message || 'Unknown error occurred'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {inspectResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    {t('upload.success')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Template Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Template ID:</span>
                          <p className="font-mono text-xs bg-muted p-2 rounded">
                            {inspectResult.templateId}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Version:</span>
                          <p className="font-medium text-foreground bg-muted p-2 rounded">
                            {inspectResult.version}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">
                        Extracted Fields ({inspectResult.fields.length})
                      </h4>
                      <div className="grid gap-3">
                        {inspectResult.fields.map((field: any) => (
                          <div
                            key={field.key}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">{field.key}</span>
                              <span className="text-xs text-muted-foreground">
                                ({field.type})
                              </span>
                            </div>
                            {field.required && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                                Required
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                      <Button onClick={handleContinue} className="min-w-[120px]">
                        {t('common.continue')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
  )
}

export default UploadInspect
