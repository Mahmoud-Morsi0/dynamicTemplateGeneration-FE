import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useDirection = () => {
    const { i18n } = useTranslation()

    useEffect(() => {
        const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'

        // Set direction on html element
        document.documentElement.dir = direction

        // Update document language
        document.documentElement.lang = i18n.language

        // Optional: Add class for styling
        document.documentElement.className = document.documentElement.className
            .replace(/\b(rtl|ltr)\b/g, '')
            .trim() + ` ${direction}`

    }, [i18n.language])

    return {
        direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        isRTL: i18n.language === 'ar'
    }
}
