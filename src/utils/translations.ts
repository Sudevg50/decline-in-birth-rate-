export type Language = 'en' | 'ml';

export const translations = {
  en: {
    // General
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    otherPlaceholder: 'Please specify',
    required: 'This field is required',
    
    // Landing Page
    landingTitle: 'Kerala Birth Rate Survey',
    landingSubtitle: 'This survey aims to understand public opinions on the declining birth rate in Kerala. Your responses are anonymous and will be used only for research purposes.',
    startSurvey: 'Start Survey',

    // Survey Progress
    page1of2: 'Page 1 of 2',
    page2of2: 'Page 2 of 2',

    // Page 1: Personal Info
    personalInfo: 'Personal Information',
    name: 'Name',
    age: 'Age',
    ageMinError: 'Minimum age is 18',
    ageMaxError: 'Maximum age is 100',
    district: 'District',
    selectDistrict: 'Select your district',
    areaType: 'Area Type',
    urban: 'Urban',
    semiUrban: 'Semi Urban',
    rural: 'Rural',
    profession: 'Profession',
    student: 'Student',
    govtEmployee: 'Government Employee',
    privateEmployee: 'Private Employee',
    business: 'Business',
    dailyWage: 'Daily Wage Worker',
    homemaker: 'Homemaker',
    retired: 'Retired',
    notWorking: 'Not Working',
    other: 'Other',
    maritalStatus: 'Marital Status',
    married: 'Married',
    unmarried: 'Unmarried',

    // Page 2: Questions
    q1: 'What is the main reason for the decrease in the birth rate in Kerala?',
    q1Options: {
      cost: 'High cost of living',
      delay: 'Delay in marriage',
      career: 'Job and career',
      migration: 'Migration to other countries',
      lifestyle: 'Lifestyle changes',
      health: 'Health problems',
    },

    q2: 'Do you think raising children has become expensive?',
    yes: 'Yes',
    no: 'No',

    q3: 'Which government support measures would be most helpful for you?',
    q3Options: {
      financial: 'Financial support for raising children',
      childcare: 'Affordable childcare/daycare',
      leave: 'Better maternity and paternity leave',
      education: 'Free or low-cost education',
      housing: 'Affordable housing support',
      tax: 'Tax benefits or monthly financial support',
    },

    q4: 'Do you think having fewer children gives a better life for the family?',

    q5: 'In your opinion, why is the birth rate decreasing in Kerala?',

    q6: 'What should the government or society do to encourage families to have children?',
    q6Options: {
      financial: 'Financial support for raising children',
      childcare: 'Affordable childcare/daycare',
      leave: 'Better maternity and paternity leave',
      education: 'Free or low-cost education',
      housing: 'Affordable housing support',
      tax: 'Tax benefits or monthly financial support',
    },

    q7: 'Do you think migration to other countries is a significant reason for Kerala\'s declining birth rate?',

    // Thank You Page
    thankYou: 'Thank You',
    thankYouMessage: 'Thank you for participating.',
    successMessage: 'Your response has been successfully submitted.',
    
    // Admin Dashboard
    adminLogin: 'Admin Login',
    password: 'Password',
    login: 'Login',
    dashboard: 'Admin Dashboard',
    totalResponses: 'Total Responses',
    todayResponses: 'Today\'s Responses',
    avgAge: 'Average Age',
    mostSelectedReason: 'Most Selected Reason',
    migrationPct: 'Migration %',
    marriedPct: 'Married %',
    unmarriedPct: 'Unmarried %',
    urbanPct: 'Urban %',
    ruralPct: 'Rural %',
    semiUrbanPct: 'Semi Urban %',
    exportCsv: 'Export CSV',
    exportExcel: 'Export Excel',
    exportFiltered: 'Export Filtered Data',
    logout: 'Logout',
    responsesTable: 'All Responses',
    search: 'Search...',
  },
  ml: {
    // General
    next: 'അടുത്തത്',
    previous: 'മുമ്പത്തേത്',
    submit: 'സമർപ്പിക്കുക',
    otherPlaceholder: 'ദയവായി വ്യക്തമാക്കുക',
    required: 'ഈ ഫീൽഡ് നിർബന്ധമാണ്',

    // Landing Page
    landingTitle: 'കേരളത്തിലെ ജനനനിരക്ക് സർവേ',
    landingSubtitle: 'ഈ സർവേ കേരളത്തിലെ ജനനനിരക്ക് കുറയുന്നതിനുള്ള കാരണങ്ങൾ മനസ്സിലാക്കുന്നതിനായി തയ്യാറാക്കിയതാണ്. നിങ്ങളുടെ മറുപടികൾ രഹസ്യമായി സൂക്ഷിക്കുന്നതാണ്.',
    startSurvey: 'സർവേ ആരംഭിക്കുക',

    // Survey Progress
    page1of2: 'പേജ് 1 ന്റെ 2',
    page2of2: 'പേജ് 2 ന്റെ 2',

    // Page 1: Personal Info
    personalInfo: 'വ്യക്തിഗത വിവരങ്ങൾ',
    name: 'പേര്',
    age: 'പ്രായം',
    ageMinError: 'കുറഞ്ഞ പ്രായം 18',
    ageMaxError: 'പരമാവധി പ്രായം 100',
    district: 'ജില്ല',
    selectDistrict: 'നിങ്ങളുടെ ജില്ല തിരഞ്ഞെടുക്കുക',
    areaType: 'പ്രദേശത്തിന്റെ തരം',
    urban: 'നഗരം',
    semiUrban: 'അർധ നഗരപ്രദേശം',
    rural: 'ഗ്രാമപ്രദേശം',
    profession: 'തൊഴിൽ',
    student: 'വിദ്യാർത്ഥി',
    govtEmployee: 'സർക്കാർ ജീവനക്കാരൻ',
    privateEmployee: 'സ്വകാര്യ ജീവനക്കാരൻ',
    business: 'ബിസിനസ്',
    dailyWage: 'ദിനവേതന തൊഴിലാളി',
    homemaker: 'വീട്ടമ്മ',
    retired: 'വിരമിച്ചവർ',
    notWorking: 'ജോലിയില്ല',
    other: 'മറ്റുള്ളത്',
    maritalStatus: 'വൈവാഹിക സ്ഥിതി',
    married: 'വിവാഹിതൻ',
    unmarried: 'അവിവാഹിതൻ',

    // Page 2: Questions
    q1: 'കേരളത്തിൽ ജനനനിരക്ക് കുറയുന്നതിനുള്ള പ്രധാന കാരണം എന്താണെന്ന് നിങ്ങൾ കരുതുന്നു?',
    q1Options: {
      cost: 'ഉയർന്ന ജീവിതച്ചെലവ്',
      delay: 'വിവാഹം വൈകുന്നത്',
      career: 'ജോലിയും കരിയറും',
      migration: 'വിദേശ രാജ്യങ്ങളിലേക്കുള്ള കുടിയേറ്റം',
      lifestyle: 'ജീവിതശൈലിയിലെ മാറ്റങ്ങൾ',
      health: 'ആരോഗ്യ പ്രശ്നങ്ങൾ',
    },

    q2: 'കുട്ടികളെ വളർത്തുന്നത് ഇന്ന് ചെലവേറിയതാണെന്ന് നിങ്ങൾ കരുതുന്നുണ്ടോ?',
    yes: 'അതെ',
    no: 'അല്ല',

    q3: 'നിങ്ങൾക്ക് ഏറ്റവും ഉപകാരപ്രദമാകുന്ന സർക്കാർ സഹായങ്ങൾ ഏതൊക്കെയാണ്?',
    q3Options: {
      financial: 'കുട്ടികളെ വളർത്താൻ സാമ്പത്തിക സഹായം',
      childcare: 'കുറഞ്ഞ ചെലവിൽ ശിശുപരിപാലനം/ഡേകെയർ',
      leave: 'മെച്ചപ്പെട്ട പ്രസവാവധി/പിതൃത്വ അവധി',
      education: 'സൗജന്യ അല്ലെങ്കിൽ കുറഞ്ഞ നിരക്കിൽ വിദ്യാഭ്യാസം',
      housing: 'ഭവന സഹായം',
      tax: 'നികുതി ഇളവുകൾ അല്ലെങ്കിൽ പ്രതിമാസ സാമ്പത്തിക സഹായം',
    },

    q4: 'കുറച്ച് കുട്ടികളുള്ള കുടുംബങ്ങൾക്ക് മികച്ച ജീവിതനിലവാരം ലഭിക്കുമെന്ന് നിങ്ങൾ കരുതുന്നുണ്ടോ?',

    q5: 'കേരളത്തിലെ ജനനനിരക്ക് കുറയാൻ കാരണം എന്താണെന്ന് നിങ്ങൾ കരുതുന്നു?',

    q6: 'കുടുംബങ്ങളെ കുട്ടികൾ ഉണ്ടാക്കാൻ പ്രോത്സാഹിപ്പിക്കാൻ സർക്കാർ അല്ലെങ്കിൽ സമൂഹം എന്ത് ചെയ്യണം?',
    q6Options: {
      financial: 'കുട്ടികളെ വളർത്താൻ സാമ്പത്തിക സഹായം',
      childcare: 'കുറഞ്ഞ ചെലവിൽ ശിശുപരിപാലനം/ഡേകെയർ',
      leave: 'മെച്ചപ്പെട്ട പ്രസവാവധി/പിതൃത്വ അവധി',
      education: 'സൗജന്യ അല്ലെങ്കിൽ കുറഞ്ഞ നിരക്കിൽ വിദ്യാഭ്യാസം',
      housing: 'ഭവന സഹായം',
      tax: 'നികുതി ഇളവുകൾ അല്ലെങ്കിൽ പ്രതിമാസ സാമ്പത്തിക സഹായം',
    },

    q7: 'വിദേശരാജ്യങ്ങളിലേക്കുള്ള കുടിയേറ്റം കേരളത്തിലെ ജനനനിരക്ക് കുറയുന്നതിനുള്ള പ്രധാന കാരണമാണെന്ന് നിങ്ങൾ കരുതുന്നുണ്ടോ?',

    // Thank You Page
    thankYou: 'നന്ദി',
    thankYouMessage: 'പങ്കെടുത്തതിന് നന്ദി.',
    successMessage: 'നിങ്ങളുടെ പ്രതികരണം വിജയകരമായി രേഖപ്പെടുത്തി.',

    // Admin Dashboard
    adminLogin: 'അഡ്മിൻ ലോഗിൻ',
    password: 'പാസ്‌വേഡ്',
    login: 'ലോഗിൻ ചെയ്യുക',
    dashboard: 'അഡ്മിൻ ഡാഷ്‌ബോർഡ്',
    totalResponses: 'ആകെ പ്രതികരണങ്ങൾ',
    todayResponses: 'ഇന്നത്തെ പ്രതികരണങ്ങൾ',
    avgAge: 'ശരാശരി പ്രായം',
    mostSelectedReason: 'ഏറ്റവും കൂടുതൽ തിരഞ്ഞെടുത്ത കാരണം',
    migrationPct: 'കുടിയേറ്റം %',
    marriedPct: 'വിവാഹിതർ %',
    unmarriedPct: 'അവിവാഹിതർ %',
    urbanPct: 'നഗരം %',
    ruralPct: 'ഗ്രാമം %',
    semiUrbanPct: 'അർദ്ധനഗരം %',
    exportCsv: 'CSV ആയി ഡൗൺലോഡ് ചെയ്യുക',
    exportExcel: 'Excel ആയി ഡൗൺലോഡ് ചെയ്യുക',
    exportFiltered: 'ഫിൽറ്റർ ചെയ്ത ഡാറ്റ ഡൗൺലോഡ് ചെയ്യുക',
    logout: 'ലോഗൗട്ട്',
    responsesTable: 'എല്ലാ പ്രതികരണങ്ങളും',
    search: 'തിരയുക...',
  }
};
