import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            // Common
            'common.loading': 'Loading...',
            'common.error': 'Error',
            'common.success': 'Success',
            'common.cancel': 'Cancel',
            'common.save': 'Save',
            'common.submit': 'Submit',
            'common.back': 'Back',
            'common.next': 'Next',
            'common.continue': 'Continue',
            'common.download': 'Download',
            'common.upload': 'Upload',
            'common.delete': 'Delete',
            'common.edit': 'Edit',
            'common.view': 'View',
            'common.add': 'Add',
            'common.remove': 'Remove',
            'common.required': 'Required',
            'common.optional': 'Optional',

            // Navigation
            'nav.home': 'Home',
            'nav.upload': 'Upload Template',
            'nav.render': 'Render Document',
            'nav.docs': 'Documentation',

            // Theme
            'theme.light': 'Light Mode',
            'theme.dark': 'Dark Mode',

            // Home page
            'home.title': 'Dynamic Form Generator',
            'home.subtitle': 'Upload DOCX templates and generate dynamic forms for document creation',
            'home.uploadButton': 'Upload Template',
            'home.renderButton': 'Render Document',

            // Upload page
            'upload.title': 'Upload Template',
            'upload.subtitle': 'Upload a DOCX file to extract form fields',
            'upload.dragDrop': 'Drag and drop a DOCX file here, or click to select',
            'upload.selectFile': 'Select File',
            'upload.fileType': 'Only DOCX files are supported',
            'upload.maxSize': 'Maximum file size: {{size}}MB',
            'upload.inspecting': 'Inspecting template...',
            'upload.success': 'Template inspected successfully!',
            'upload.error': 'Failed to inspect template',

            // Render page
            'render.title': 'Render Document',
            'render.subtitle': 'Fill in the form and generate your document',
            'render.rendering': 'Generating document...',
            'render.success': 'Document generated successfully!',
            'render.error': 'Failed to generate document',
            'render.download': 'Download Document',

            // Form fields
            'field.text': 'Text',
            'field.number': 'Number',
            'field.date': 'Date',
            'field.select': 'Select',
            'field.image': 'Image URL',
            'field.array': 'List',

            // Validation
            'validation.required': 'This field is required',
            'validation.invalidEmail': 'Invalid email address',
            'validation.invalidUrl': 'Invalid URL',
            'validation.minLength': 'Minimum {{min}} characters required',
            'validation.maxLength': 'Maximum {{max}} characters allowed',
            'validation.min': 'Minimum value is {{min}}',
            'validation.max': 'Maximum value is {{max}}',
            'validation.invalidDate': 'Invalid date format (YYYY-MM-DD)',
            'validation.confirmPassword': 'Confirm Password',
            'validation.confirmPasswordPlaceholder': 'Confirm your password',
            'validation.passwordsMatch': 'Passwords do not match',
            'validation.passwordLength': 'Password must be at least 6 characters long',

            // Authentication
            'auth.welcome': 'Welcome Back',
            'auth.signInSubtitle': 'Sign in to your account to continue',
            'auth.createAccount': 'Create Account',
            'auth.signUpSubtitle': 'Create your account to get started',
            'auth.email': 'Email',
            'auth.password': 'Password',
            'auth.fullName': 'Full Name',
            'auth.emailPlaceholder': 'Enter your email',
            'auth.passwordPlaceholder': 'Enter your password',
            'auth.namePlaceholder': 'Enter your full name',
            'auth.signIn': 'Sign In',
            'auth.signUp': 'Sign Up',
            'auth.noAccount': 'Don\'t have an account?',
            'auth.hasAccount': 'Already have an account?',
            'auth.signUpLink': 'Sign up',
            'auth.signInLink': 'Sign in',
            'auth.logout': 'Logout',

            // Dashboard
            'dashboard.welcome': 'Welcome back, {{name}}!',
            'dashboard.subtitle': 'Manage your templates and documents from your personal dashboard',
            'dashboard.accountInfo': 'Account Information',
            'dashboard.fullName': 'Full Name',
            'dashboard.emailAddress': 'Email Address',
            'dashboard.memberSince': 'Member Since',
            'dashboard.accountId': 'Account ID',

            // Templates
            'templates.yourTemplates': 'Your Templates',
            'templates.manageSubtitle': 'Manage and create documents from your uploaded templates',
            'templates.uploadNew': 'Upload New Template',
            'templates.upload': 'Upload',
            'templates.noTemplates': 'No templates yet',
            'templates.noTemplatesDesc': 'Upload your first DOCX template to get started creating dynamic documents',
            'templates.uploadFirst': 'Upload Your First Template',
            'templates.supportedFormat': 'Supported format: DOCX files',
            'templates.failedToLoad': 'Failed to load templates',
            'templates.tryAgain': 'Try Again',
            'templates.version': 'Version',
            'templates.fieldsExtracted': 'Fields extracted',
            'templates.fields': 'fields',
            'templates.createDocument': 'Create Document',
            'templates.deleteTemplate': 'Delete Template',
            'templates.deleteConfirmTitle': 'Delete Template',
            'templates.deleteConfirmDesc': 'Are you sure you want to delete "{{name}}"? This action cannot be undone and will permanently remove the template from your account.',
            'templates.fieldTypes': 'Field Types',
            'templates.more': 'more',

            // Toast Messages
            'toast.uploadSuccess': '{{name}} uploaded successfully',
            'toast.uploadError': 'Please upload a valid DOCX file',
            'toast.analysisSuccess': 'Template analyzed! Found {{count}} fields',
            'toast.analysisError': 'Failed to analyze template',
            'toast.templateReady': 'Template ready! Redirecting to document creator...',
            'toast.formSaved': 'Form data saved! Click "Download Document" to generate your file.',
            'toast.documentSuccess': 'Document generated successfully! Download started.',
            'toast.documentError': 'Failed to generate document',
            'toast.templatesLoaded': 'Loaded {{count}} template{{s}}',
            'toast.templateSelected': 'Selected "{{name}}" - redirecting to document creator...',
            'toast.deleteSuccess': '"{{name}}" deleted successfully',
            'toast.deleteError': 'Failed to delete template',
            'toast.sessionExpired': 'Session expired. Please log in again.',
            'toast.accessDenied': 'Access denied. You don\'t have permission for this action.',
            'toast.serverError': 'Server error. Please try again later.',
            'toast.networkError': 'Network error. Please check your connection.',
            'toast.rateLimited': 'Too many requests. Please slow down.',

            // Loading States
            'loading.signIn': 'Signing you in...',
            'loading.signUp': 'Creating your account...',
            'loading.analyzing': 'Analyzing template and extracting fields...',
            'loading.generating': 'Generating your document...',
            'loading.deleting': 'Deleting "{{name}}"...',

            // Success Messages
            'success.welcomeBack': 'Welcome back, {{name}}!',
            'success.welcomeNew': 'Welcome to DynamicFormGen, {{name}}!',
            'success.logout': 'Goodbye {{name}}! You\'ve been logged out.',

            // Errors
            'error.loginFailed': 'Login failed',
            'error.registrationFailed': 'Registration failed',
            'error.analysisDefault': 'Failed to analyze template',
            'error.documentDefault': 'Failed to generate document',
            'error.templatesDefault': 'Failed to load templates',
            'error.deleteDefault': 'Failed to delete template',

            // No Template Found (Render Page)
            'render.noTemplate': 'No Template Found',
            'render.noTemplateDesc': 'Please upload and inspect a template first to generate documents.',
            'render.goToUpload': 'Go to Upload',

            // Home Page
            'home.heroTitle': 'Free Dynamic Document Generator',
            'home.heroSubtitle': 'Create official, editable documents from templates in seconds. Upload DOCX templates and generate dynamic forms to fill and create complete documents. No sign-up needed. It\'s fast, fully customizable, and free.',
            'home.promptPlaceholder': 'Describe the type of document you want to create (e.g., contract, letter, form)',
            'home.startCreating': 'Start Creating',
            'home.document': 'Document',
            'home.getStartedFree': 'Get Started Free',
            'home.signIn': 'Sign In',
            'home.uploadTemplate': 'Upload Template',
            'home.createDocument': 'Create Document',
            'home.learnMore': 'Learn More',
            'home.featureTitle': 'Generate Documents from Templates with Dynamic Form Editor',
            'home.featureDesc': 'DocGen\'s Template-Based Document Generator helps you instantly create accurate, branded documents from DOCX templates. Upload your templates, extract form fields automatically, fill dynamic forms, and generate complete documents. Whether you\'re managing contracts, letters, or reports, the system ensures consistency, clarity, and compliance. Export or share in minutes.',

            // Template Information
            'template.information': 'Template Information',
            'template.id': 'Template ID',
            'template.version': 'Version',
            'template.fields': 'Fields',
            'template.language': 'Language',
            'template.fillForm': 'Fill Form',
        },
    },
    ar: {
        translation: {
            // Common
            'common.loading': 'جاري التحميل...',
            'common.error': 'خطأ',
            'common.success': 'نجح',
            'common.cancel': 'إلغاء',
            'common.save': 'حفظ',
            'common.submit': 'إرسال',
            'common.back': 'رجوع',
            'common.next': 'التالي',
            'common.continue': 'متابعة',
            'common.download': 'تحميل',
            'common.upload': 'رفع',
            'common.delete': 'حذف',
            'common.edit': 'تعديل',
            'common.view': 'عرض',
            'common.add': 'إضافة',
            'common.remove': 'إزالة',
            'common.required': 'مطلوب',
            'common.optional': 'اختياري',

            // Navigation
            'nav.home': 'الرئيسية',
            'nav.upload': 'رفع قالب',
            'nav.render': 'إنشاء مستند',
            'nav.docs': 'التوثيق',

            // Theme
            'theme.light': 'الوضع الفاتح',
            'theme.dark': 'الوضع الداكن',

            // Home page
            'home.title': 'مولد النماذج الديناميكية',
            'home.subtitle': 'ارفع قوالب DOCX وأنشئ نماذج ديناميكية لإنشاء المستندات',
            'home.uploadButton': 'رفع قالب',
            'home.renderButton': 'إنشاء مستند',

            // Upload page
            'upload.title': 'رفع قالب',
            'upload.subtitle': 'ارفع ملف DOCX لاستخراج حقول النموذج',
            'upload.dragDrop': 'اسحب وأفلت ملف DOCX هنا، أو انقر للاختيار',
            'upload.selectFile': 'اختر ملف',
            'upload.fileType': 'يتم دعم ملفات DOCX فقط',
            'upload.maxSize': 'الحد الأقصى لحجم الملف: {{size}} ميجابايت',
            'upload.inspecting': 'جاري فحص القالب...',
            'upload.success': 'تم فحص القالب بنجاح!',
            'upload.error': 'فشل في فحص القالب',

            // Render page
            'render.title': 'إنشاء مستند',
            'render.subtitle': 'املأ النموذج وأنشئ مستندك',
            'render.rendering': 'جاري إنشاء المستند...',
            'render.success': 'تم إنشاء المستند بنجاح!',
            'render.error': 'فشل في إنشاء المستند',
            'render.download': 'تحميل المستند',

            // Form fields
            'field.text': 'نص',
            'field.number': 'رقم',
            'field.date': 'تاريخ',
            'field.select': 'اختيار',
            'field.image': 'رابط الصورة',
            'field.array': 'قائمة',

            // Validation
            'validation.required': 'هذا الحقل مطلوب',
            'validation.invalidEmail': 'عنوان بريد إلكتروني غير صحيح',
            'validation.invalidUrl': 'رابط غير صحيح',
            'validation.minLength': 'الحد الأدنى {{min}} حرف مطلوب',
            'validation.maxLength': 'الحد الأقصى {{max}} حرف مسموح',
            'validation.min': 'الحد الأدنى للقيمة هو {{min}}',
            'validation.max': 'الحد الأقصى للقيمة هو {{max}}',
            'validation.invalidDate': 'تنسيق تاريخ غير صحيح (YYYY-MM-DD)',
            'validation.confirmPassword': 'تأكيد كلمة المرور',
            'validation.confirmPasswordPlaceholder': 'أكد كلمة المرور',
            'validation.passwordsMatch': 'كلمات المرور غير متطابقة',
            'validation.passwordLength': 'يجب أن تكون كلمة المرور على الأقل 6 أحرف',

            // Authentication
            'auth.welcome': 'مرحباً بك مرة أخرى',
            'auth.signInSubtitle': 'سجل دخولك إلى حسابك للمتابعة',
            'auth.createAccount': 'إنشاء حساب',
            'auth.signUpSubtitle': 'أنشئ حسابك للبدء',
            'auth.email': 'البريد الإلكتروني',
            'auth.password': 'كلمة المرور',
            'auth.fullName': 'الاسم الكامل',
            'auth.emailPlaceholder': 'أدخل بريدك الإلكتروني',
            'auth.passwordPlaceholder': 'أدخل كلمة المرور',
            'auth.namePlaceholder': 'أدخل اسمك الكامل',
            'auth.signIn': 'تسجيل الدخول',
            'auth.signUp': 'إنشاء حساب',
            'auth.noAccount': 'ليس لديك حساب؟',
            'auth.hasAccount': 'لديك حساب بالفعل؟',
            'auth.signUpLink': 'إنشاء حساب',
            'auth.signInLink': 'تسجيل الدخول',
            'auth.logout': 'تسجيل الخروج',

            // Dashboard
            'dashboard.welcome': 'مرحباً بك مرة أخرى، {{name}}!',
            'dashboard.subtitle': 'أدر قوالبك ومستنداتك من لوحة التحكم الشخصية',
            'dashboard.accountInfo': 'معلومات الحساب',
            'dashboard.fullName': 'الاسم الكامل',
            'dashboard.emailAddress': 'عنوان البريد الإلكتروني',
            'dashboard.memberSince': 'عضو منذ',
            'dashboard.accountId': 'معرف الحساب',

            // Templates
            'templates.yourTemplates': 'قوالبك',
            'templates.manageSubtitle': 'أدر وأنشئ مستندات من القوالب التي رفعتها',
            'templates.uploadNew': 'رفع قالب جديد',
            'templates.upload': 'رفع',
            'templates.noTemplates': 'لا توجد قوالب بعد',
            'templates.noTemplatesDesc': 'ارفع قالب DOCX الأول للبدء في إنشاء مستندات ديناميكية',
            'templates.uploadFirst': 'ارفع قالبك الأول',
            'templates.supportedFormat': 'التنسيق المدعوم: ملفات DOCX',
            'templates.failedToLoad': 'فشل في تحميل القوالب',
            'templates.tryAgain': 'حاول مرة أخرى',
            'templates.version': 'الإصدار',
            'templates.fieldsExtracted': 'الحقول المستخرجة',
            'templates.fields': 'حقول',
            'templates.createDocument': 'إنشاء مستند',
            'templates.deleteTemplate': 'حذف القالب',
            'templates.deleteConfirmTitle': 'حذف القالب',
            'templates.deleteConfirmDesc': 'هل أنت متأكد من أنك تريد حذف "{{name}}"؟ هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف القالب نهائياً من حسابك.',
            'templates.fieldTypes': 'أنواع الحقول',
            'templates.more': 'أكثر',

            // Toast Messages
            'toast.uploadSuccess': 'تم رفع {{name}} بنجاح',
            'toast.uploadError': 'يرجى رفع ملف DOCX صحيح',
            'toast.analysisSuccess': 'تم تحليل القالب! تم العثور على {{count}} حقل',
            'toast.analysisError': 'فشل في تحليل القالب',
            'toast.templateReady': 'القالب جاهز! جاري التوجيه إلى منشئ المستندات...',
            'toast.formSaved': 'تم حفظ بيانات النموذج! انقر على "تحميل المستند" لإنشاء ملفك.',
            'toast.documentSuccess': 'تم إنشاء المستند بنجاح! بدأ التحميل.',
            'toast.documentError': 'فشل في إنشاء المستند',
            'toast.templatesLoaded': 'تم تحميل {{count}} قالب{{s}}',
            'toast.templateSelected': 'تم اختيار "{{name}}" - جاري التوجيه إلى منشئ المستندات...',
            'toast.deleteSuccess': 'تم حذف "{{name}}" بنجاح',
            'toast.deleteError': 'فشل في حذف القالب',
            'toast.sessionExpired': 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.',
            'toast.accessDenied': 'تم رفض الوصول. ليس لديك صلاحية لهذا الإجراء.',
            'toast.serverError': 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
            'toast.networkError': 'خطأ في الشبكة. يرجى التحقق من اتصالك.',
            'toast.rateLimited': 'طلبات كثيرة جداً. يرجى الإبطاء.',

            // Loading States
            'loading.signIn': 'جاري تسجيل دخولك...',
            'loading.signUp': 'جاري إنشاء حسابك...',
            'loading.analyzing': 'جاري تحليل القالب واستخراج الحقول...',
            'loading.generating': 'جاري إنشاء مستندك...',
            'loading.deleting': 'جاري حذف "{{name}}"...',

            // Success Messages
            'success.welcomeBack': 'مرحباً بك مرة أخرى، {{name}}!',
            'success.welcomeNew': 'مرحباً بك في DynamicFormGen، {{name}}!',
            'success.logout': 'وداعاً {{name}}! تم تسجيل خروجك.',

            // Errors
            'error.loginFailed': 'فشل في تسجيل الدخول',
            'error.registrationFailed': 'فشل في التسجيل',
            'error.analysisDefault': 'فشل في تحليل القالب',
            'error.documentDefault': 'فشل في إنشاء المستند',
            'error.templatesDefault': 'فشل في تحميل القوالب',
            'error.deleteDefault': 'فشل في حذف القالب',

            // No Template Found (Render Page)
            'render.noTemplate': 'لم يتم العثور على قالب',
            'render.noTemplateDesc': 'يرجى رفع وفحص قالب أولاً لإنشاء المستندات.',
            'render.goToUpload': 'الذهاب للرفع',

            // Home Page
            'home.heroTitle': 'مولد المستندات الديناميكية المجاني',
            'home.heroSubtitle': 'أنشئ مستندات رسمية وقابلة للتعديل من القوالب في ثوانٍ. ارفع قوالب DOCX وأنشئ نماذج ديناميكية للملء وإنشاء مستندات كاملة. لا حاجة للتسجيل. سريع وقابل للتخصيص بالكامل ومجاني.',
            'home.promptPlaceholder': 'اوصف نوع المستند الذي تريد إنشاؤه (مثل، عقد، رسالة، نموذج)',
            'home.startCreating': 'ابدأ الإنشاء',
            'home.document': 'مستند',
            'home.getStartedFree': 'ابدأ مجاناً',
            'home.signIn': 'تسجيل الدخول',
            'home.uploadTemplate': 'رفع قالب',
            'home.createDocument': 'إنشاء مستند',
            'home.learnMore': 'تعلم المزيد',
            'home.featureTitle': 'إنشاء المستندات من القوالب مع محرر النماذج الديناميكية',
            'home.featureDesc': 'مولد المستندات القائم على القوالب من DocGen يساعدك في إنشاء مستندات دقيقة ومميزة بالعلامة التجارية فوراً من قوالب DOCX. ارفع قوالبك، واستخرج حقول النماذج تلقائياً، واملأ النماذج الديناميكية، وأنشئ مستندات كاملة. سواء كنت تدير عقوداً أو رسائل أو تقارير، يضمن النظام الاتساق والوضوح والامتثال. صدِّر أو شارك في دقائق.',

            // Template Information
            'template.information': 'معلومات القالب',
            'template.id': 'معرف القالب',
            'template.version': 'الإصدار',
            'template.fields': 'الحقول',
            'template.language': 'اللغة',
            'template.fillForm': 'املأ النموذج',
        },
    },
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: import.meta.env.DEV,

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },

        react: {
            useSuspense: false,
        },
    })

export default i18n
