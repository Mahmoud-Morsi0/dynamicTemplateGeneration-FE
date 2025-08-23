import toast from 'react-hot-toast'

// Custom toast utilities with consistent styling and timing
export const toastUtils = {
    // Success messages
    success: (message: string, options?: any) => {
        return toast.success(message, {
            duration: 4000,
            ...options,
        })
    },

    // Error messages
    error: (message: string, options?: any) => {
        return toast.error(message, {
            duration: 5000, // Slightly longer for errors
            ...options,
        })
    },

    // Loading messages
    loading: (message: string, options?: any) => {
        return toast.loading(message, options)
    },

    // Generic info messages
    info: (message: string, options?: any) => {
        return toast(message, {
            icon: 'ℹ️',
            duration: 4000,
            ...options,
        })
    },

    // Promise-based toasts for async operations
    promise: <T>(
        promise: Promise<T>,
        {
            loading,
            success,
            error,
        }: {
            loading: string
            success: string | ((data: T) => string)
            error: string | ((err: any) => string)
        }
    ) => {
        return toast.promise(promise, {
            loading,
            success,
            error,
        })
    },

    // Dismiss specific toast
    dismiss: (toastId: string) => {
        toast.dismiss(toastId)
    },

    // Dismiss all toasts
    dismissAll: () => {
        toast.dismiss()
    },
}

// Shorthand exports
export const successToast = toastUtils.success
export const errorToast = toastUtils.error
export const loadingToast = toastUtils.loading
export const infoToast = toastUtils.info

export default toastUtils
