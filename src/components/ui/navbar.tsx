import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { 
  Moon, 
  Sun, 
  Globe, 
  Menu, 
  X, 
  FileText,
  Upload,
  Home,
  Book,
  User,
  LogOut
} from 'lucide-react'
import { Button } from './button'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const { t, i18n } = useTranslation()
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    ...(isAuthenticated ? [{ name: 'Dashboard', href: '/dashboard', icon: User }] : []),
    { name: t('nav.upload'), href: '/upload', icon: Upload },
    { name: t('nav.render'), href: '/render', icon: FileText },
    { name: t('nav.docs'), href: '/docs', icon: Book },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white dark:bg-card minimal-shadow border-b border-gray-200 dark:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground hidden md:block xl:text-xl">
                DynamicFormGen
              </span>
              <span className="text-base font-bold text-foreground md:hidden">
                DFG
              </span>
            </Link>
          </div>

          {/* Desktop navigation - only show on larger screens */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  title={item.name}
                  className={`flex items-center space-x-1 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden 2xl:inline text-xs">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-1">
            {/* Auth section - desktop */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-xs text-muted-foreground hidden xl:inline whitespace-nowrap">
                  {user?.name?.split(' ')[0] || user?.email?.split('@')[0]}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="px-2 py-1"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden 2xl:inline ml-1 text-xs">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="px-2 py-1" title="Sign In">
                    <User className="w-4 h-4" />
                    <span className="hidden xl:inline ml-1 text-xs">Sign In</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="hidden xl:inline-flex px-2 py-1 text-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Settings controls - ultra compact */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="hidden md:flex px-2 py-1"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden 2xl:inline ml-1 text-xs">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
              className="hidden md:flex px-2 py-1"
              title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden 2xl:inline ml-1 text-xs">
                {i18n.language === 'ar' ? 'عربي' : 'EN'}
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden px-2 py-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white dark:bg-card border-t border-gray-200 dark:border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Navigation items */}
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Settings section */}
            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3">
              <button
                onClick={() => {
                  toggleTheme()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={() => {
                  changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left"
              >
                <Globe className="w-5 h-5" />
                <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>

            {/* Mobile auth section */}
            <div className="border-t border-gray-200 dark:border-border pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm text-muted-foreground">Signed in as:</p>
                    <p className="text-base font-medium text-foreground">{user?.name || user?.email}</p>
                    {user?.name && user?.email && (
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center space-x-2 px-3 py-3 mx-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
