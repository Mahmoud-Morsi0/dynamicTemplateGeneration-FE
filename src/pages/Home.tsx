import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, FileText, Sparkles } from 'lucide-react'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      // For now, redirect to upload page
      // Later this could be enhanced to use the prompt for AI generation
      if (isAuthenticated) {
        navigate('/upload')
      } else {
        navigate('/login')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('home.heroSubtitle')}
          </p>
        </motion.div>

        {/* Main Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Text Input Area */}
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('home.promptPlaceholder')}
                    className="w-full h-32 p-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute bottom-3 right-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      title="Template suggestions"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-3">
                    <Link to={isAuthenticated ? "/upload" : "/login"} className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        {t('common.upload')}
                      </Button>
                    </Link>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      {t('home.document')}
                      <span className="ml-1 text-xs">×</span>
                    </Button>
                  </div>
                  <Button 
                    onClick={handleGenerateClick}
                    className="ml-auto bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t('home.startCreating')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {t('home.featureTitle')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t('home.featureDesc')}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t('home.getStartedFree')}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {t('home.signIn')}
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={isAuthenticated ? "/upload" : "/login"}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Upload className="mr-2 h-5 w-5" />
                  {t('home.uploadTemplate')}
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/render" : "/login"}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  {t('home.createDocument')}
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('home.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
