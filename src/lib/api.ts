import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Handle common errors
        // For now, using English error messages in API interceptor
        // since we can't easily access i18n context here
        if (error.response?.status === 401) {
            toast.error('Session expired. Please log in again.')
            // Clear auth data
            localStorage.removeItem('authToken')
            localStorage.removeItem('authUser')
            // Redirect to login if not already there
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
        } else if (error.response?.status === 403) {
            toast.error('Access denied. You don\'t have permission for this action.')
        } else if (error.response?.status >= 500) {
            toast.error('Server error. Please try again later.')
        } else if (error.response?.status === 429) {
            toast.error('Too many requests. Please slow down.')
        } else if (!error.response) {
            // Network error
            toast.error('Network error. Please check your connection.')
        }

        return Promise.reject(error)
    }
)

export interface FieldSpec {
    key: string
    type: 'text' | 'number' | 'date' | 'select' | 'image' | 'array'
    label?: { en: string; ar: string }
    required?: boolean
    maxLength?: number
    min?: number
    max?: number
    step?: number
    options?: string[]
    default?: string | number
    constraints?: { width?: number; height?: number }
    itemShape?: Record<string, FieldSpec>
    format?: 'email'
}

export interface InspectResponse {
    success: boolean
    data: {
        templateId: string
        version: number
        fields: FieldSpec[]
    }
}

export interface RenderRequest {
    templateId?: string
    fileHash?: string
    data: Record<string, any>
}

// API functions
export const templatesApi = {
    inspect: async (file: File): Promise<InspectResponse> => {
        const formData = new FormData()
        formData.append('template', file)

        const response = await api.post('/templates/inspect', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    },

    render: async (request: RenderRequest): Promise<Blob> => {
        const response = await api.post('/templates/render', request, {
            responseType: 'blob',
        })
        return response.data
    },

    getSpec: async (templateId: string, version?: number): Promise<InspectResponse> => {
        const params = version ? { version } : {}
        const response = await api.get(`/templates/${templateId}/spec`, { params })
        return response.data
    },

    getUserTemplates: async (): Promise<any> => {
        const response = await api.get('/templates/')
        return response.data
    },

    deleteTemplate: async (templateId: string, version: number) => {
        const response = await api.delete(`/templates/${templateId}/version/${version}`)
        return response.data
    }
}
