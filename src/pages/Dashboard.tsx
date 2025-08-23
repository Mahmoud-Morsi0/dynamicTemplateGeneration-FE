import React from 'react'
import { motion } from 'framer-motion'
import UserDashboard from '@/components/dashboard/UserDashboard'
import TemplateManager from '@/components/templates/TemplateManager'

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* User Dashboard */}
        <UserDashboard />
        
        {/* Templates Section */}
        <TemplateManager />
      </motion.div>
    </div>
  )
}

export default Dashboard
