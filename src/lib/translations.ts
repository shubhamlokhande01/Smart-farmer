export type SupportedLanguage = "en" | "hi" | "mr" | "te" | "ta" | "pa";

export interface LanguageOption {
    code: SupportedLanguage;
    label: string;       // native name shown in the selector
    englishLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { code: "en", label: "English", englishLabel: "English" },
    { code: "hi", label: "हिन्दी", englishLabel: "Hindi" },
    { code: "mr", label: "मराठी", englishLabel: "Marathi" },
    { code: "te", label: "తెలుగు", englishLabel: "Telugu" },
    { code: "ta", label: "தமிழ்", englishLabel: "Tamil" },
    { code: "pa", label: "ਪੰਜਾਬੀ", englishLabel: "Punjabi" },
];

// ─── Translation map ───────────────────────────────────────────────────────────

export type TranslationKeys = {
    // Header nav
    nav_home: string;
    nav_dashboard: string;
    nav_addFarm: string;
    nav_signIn: string;
    nav_getStarted: string;
    nav_signOut: string;

    // Hero
    hero_badge: string;
    hero_heading1: string;
    hero_heading2: string;
    hero_subheading: string;
    hero_cta_primary: string;
    hero_cta_secondary: string;
    hero_pill_growth: string;
    hero_pill_irrigation: string;
    hero_pill_fertilizer: string;
    hero_pill_weather: string;

    // Features section
    features_heading: string;
    features_subheading: string;
    feat1_title: string;
    feat1_desc: string;
    feat2_title: string;
    feat2_desc: string;
    feat3_title: string;
    feat3_desc: string;
    feat4_title: string;
    feat4_desc: string;
    feat5_title: string;
    feat5_desc: string;
    feat6_title: string;
    feat6_desc: string;

    // How It Works section
    how_heading: string;
    how_subheading: string;
    step1_title: string;
    step1_desc: string;
    step2_title: string;
    step2_desc: string;
    step3_title: string;
    step3_desc: string;
    step4_title: string;
    step4_desc: string;

    // CTA section
    cta_heading: string;
    cta_subheading: string;
    cta_button: string;

    // Footer
    footer_tagline: string;

    // Login page
    login_welcome: string;
    login_subtitle: string;
    login_google: string;
    login_signing_in: string;
    login_or_email: string;
    login_email: string;
    login_password: string;
    login_email_placeholder: string;
    login_submit: string;
    login_submitting: string;
    login_no_account: string;
    login_signup_link: string;
    login_err_invalid: string;
    login_err_too_many: string;
    login_err_cancelled: string;
    login_err_default: string;

    // Signup page
    signup_title: string;
    signup_subtitle: string;
    signup_google: string;
    signup_signing_up: string;
    signup_or_email: string;
    signup_email: string;
    signup_password: string;
    signup_password_placeholder: string;
    signup_confirm_password: string;
    signup_submit: string;
    signup_submitting: string;
    signup_has_account: string;
    signup_signin_link: string;
    signup_err_exists: string;
    signup_err_weak: string;
    signup_err_cancelled: string;
    signup_err_default: string;

    // Dashboard
    dash_welcome: string;
    dash_no_farms_desc: string;
    dash_add_first_farm: string;
    dash_add_crop: string;
    dash_no_crops: string;
    dash_no_crops_desc: string;
    dash_add_a_crop: string;
    dash_generating: string;
    dash_general_rec: string;

    // AddFarm page
    addfarm_step1: string;
    addfarm_step2: string;
    addfarm_step3: string;
    addfarm_back: string;
    addfarm_generating_title: string;
    addfarm_generating_desc: string;
    addfarm_done_title: string;
    addfarm_done_desc: string;

    // FarmSetupForm
    farm_form_title: string;
    farm_form_desc: string;
    farm_name_label: string;
    farm_name_placeholder: string;
    farm_location_label: string;
    farm_location_placeholder: string;
    farm_size_label: string;
    farm_unit_label: string;
    farm_unit_hectares: string;
    farm_unit_acres: string;
    farm_irrigation_label: string;
    farm_irr_drip: string;
    farm_irr_sprinkler: string;
    farm_irr_flood: string;
    farm_irr_furrow: string;
    farm_irr_rainfed: string;
    farm_submit: string;

    // CropForm
    crop_form_title: string;
    crop_form_desc: string;
    crop_info_section: string;
    crop_name_label: string;
    crop_name_placeholder: string;
    crop_date_label: string;
    crop_soil_section: string;
    crop_soil_type_label: string;
    crop_soil_clay: string;
    crop_soil_sandy: string;
    crop_soil_loamy: string;
    crop_soil_silt: string;
    crop_soil_peat: string;
    crop_soil_chalky: string;
    crop_whc_label: string;
    crop_whc_low: string;
    crop_whc_medium: string;
    crop_whc_high: string;
    crop_nitrogen: string;
    crop_phosphorus: string;
    crop_potassium: string;
    crop_ph: string;
    crop_ph_desc: string;
    crop_cancel: string;
    crop_submit: string;

    // IrrigationCard
    irr_title: string;
    irr_frequency: string;
    irr_per_hectare: string;
    irr_next: string;
    irr_calendar_title: string;
    irr_today: string;
    irr_label_irrigate: string;
    irr_label_skip_rain: string;
    irr_label_done: string;
    irr_tips: string;
    irr_sending: string;
    irr_sent: string;
    irr_remind_me: string;

    // FertilizerCard
    fert_title: string;
    fert_quantity: string;
    fert_timing: string;
    fert_method: string;
    fert_how_to_apply: string;
    fert_precautions: string;
    fert_schedule: string;

    // WeatherAlertCard
    weather_alerts_title: string;
    weather_status_title: string;
    weather_all_clear: string;
    weather_all_clear_desc: string;
    weather_all_clear_desc_no_current: string;
    weather_humidity: string;
    weather_wind: string;
    weather_preventive: string;

    // YieldEstimateCard
    yield_title: string;
    yield_per_unit: string;
    yield_farm_size: string;
    yield_total_label: string;

    // GrowthStageCard
    growth_planted: string;
    growth_days_until_next: string;
    growth_stage_progress: string;
    growth_stage_germination: string;
    growth_stage_seedling: string;
    growth_stage_vegetative: string;
    growth_stage_flowering: string;
    growth_stage_fruiting: string;
    growth_stage_maturity: string;
    growth_stage_harvest: string;

    // Dashboard farm header
    dash_crops_label: string;
};

const translations: Record<SupportedLanguage, TranslationKeys> = {
    // ─── English ──────────────────────────────────────────────────────────────
    en: {
        nav_home: "Home",
        nav_dashboard: "Dashboard",
        nav_addFarm: "Add Farm",
        nav_signIn: "Sign In",
        nav_getStarted: "Get Started",
        nav_signOut: "Sign Out",

        hero_badge: "AI-Powered Smart Farming",
        hero_heading1: "Grow Smarter,",
        hero_heading2: "Harvest Better",
        hero_subheading:
            "Your intelligent farming companion that provides personalized crop management plans, irrigation schedules, and real-time recommendations based on your soil, climate, and crops.",
        hero_cta_primary: "Start Planning Your Farm",
        hero_cta_secondary: "View Demo Dashboard",
        hero_pill_growth: "Growth Tracking",
        hero_pill_irrigation: "Smart Irrigation",
        hero_pill_fertilizer: "Fertilizer Plans",
        hero_pill_weather: "Weather Alerts",

        features_heading: "Everything You Need to Farm Smarter",
        features_subheading:
            "Our AI analyzes your farm data and provides actionable guidance at every stage of crop growth.",
        feat1_title: "Growth Stage Detection",
        feat1_desc:
            "Automatically calculates your crop's current stage based on plantation date and provides timely action recommendations.",
        feat2_title: "Smart Irrigation Planning",
        feat2_desc:
            "Customized watering schedules based on soil type, crop needs, and regional climate patterns.",
        feat3_title: "Region-Specific Fertilization",
        feat3_desc:
            "Fertilizer recommendations tailored to your soil nutrients, crop type, and local agricultural practices.",
        feat4_title: "Weather Risk Alerts",
        feat4_desc:
            "Early warnings for drought, frost, excess rain, and heat stress with preventive measures.",
        feat5_title: "Yield Estimation",
        feat5_desc:
            "Get expected harvest ranges to plan your income, storage, and market timing.",
        feat6_title: "Multi-Crop Management",
        feat6_desc:
            "Manage multiple crops with separate, non-conflicting plans for each cultivation.",

        how_heading: "How It Works",
        how_subheading:
            "Get personalized farming guidance in a few simple steps.",
        step1_title: "Add Your Farm",
        step1_desc:
            "Enter your farm details including location, size, and irrigation method.",
        step2_title: "Add Your Crops",
        step2_desc:
            "Tell us what you're growing and your soil conditions for each crop.",
        step3_title: "Get AI Analysis",
        step3_desc:
            "Our AI generates a complete management plan customized to your conditions.",
        step4_title: "Follow Recommendations",
        step4_desc:
            "Receive timely alerts and step-by-step guidance throughout the growing season.",

        cta_heading: "Ready to Transform Your Farming?",
        cta_subheading:
            "Join thousands of farmers using AI-powered insights to grow better crops and increase yields.",
        cta_button: "Start Your Free Plan",

        footer_tagline: "© 2025 AgriWise. Smart Farming for a Sustainable Future.",

        login_welcome: "Welcome back",
        login_subtitle: "Sign in to your farming dashboard",
        login_google: "Continue with Google",
        login_signing_in: "Signing in...",
        login_or_email: "or continue with email",
        login_email: "Email",
        login_password: "Password",
        login_email_placeholder: "you@example.com",
        login_submit: "Sign In",
        login_submitting: "Signing in...",
        login_no_account: "Don't have an account?",
        login_signup_link: "Sign up free",
        login_err_invalid: "Invalid email or password.",
        login_err_too_many: "Too many attempts. Please try again later.",
        login_err_cancelled: "Google sign-in was cancelled.",
        login_err_default: "Something went wrong. Please try again.",

        signup_title: "Create your account",
        signup_subtitle: "Start growing smarter today — it's free",
        signup_google: "Continue with Google",
        signup_signing_up: "Signing up...",
        signup_or_email: "or sign up with email",
        signup_email: "Email",
        signup_password: "Password",
        signup_password_placeholder: "Min. 6 characters",
        signup_confirm_password: "Confirm Password",
        signup_submit: "Create Account",
        signup_submitting: "Creating account...",
        signup_has_account: "Already have an account?",
        signup_signin_link: "Sign in",
        signup_err_exists: "This email is already registered. Try signing in instead.",
        signup_err_weak: "Password is too weak. Use at least 6 characters.",
        signup_err_cancelled: "Google sign-up was cancelled.",
        signup_err_default: "Something went wrong. Please try again.",

        dash_welcome: "Welcome to your Farm Dashboard",
        dash_no_farms_desc: "You haven't added any farms yet. Add your first farm to get personalized AI-powered recommendations.",
        dash_add_first_farm: "Add Your First Farm",
        dash_add_crop: "Add Crop",
        dash_no_crops: "No crops added yet",
        dash_no_crops_desc: "Add your first crop to see management plans.",
        dash_add_a_crop: "Add a Crop",
        dash_generating: "Management plan is being generated…",
        dash_general_rec: "General Recommendations",

        addfarm_step1: "Farm Setup",
        addfarm_step2: "Add Crop",
        addfarm_step3: "Get Plan",
        addfarm_back: "Back to Farm Details",
        addfarm_generating_title: "Generating Your Plan",
        addfarm_generating_desc: "AI is crafting your personalized farming recommendations…",
        addfarm_done_title: "All Set!",
        addfarm_done_desc: "Your personalized farming plan is ready. Redirecting to dashboard…",

        farm_form_title: "Farm Details",
        farm_form_desc: "Enter your farm information to get started",
        farm_name_label: "Farm Name",
        farm_name_placeholder: "My Farm",
        farm_location_label: "Location",
        farm_location_placeholder: "Enter your farm location or address",
        farm_size_label: "Farm Size",
        farm_unit_label: "Unit",
        farm_unit_hectares: "Hectares",
        farm_unit_acres: "Acres",
        farm_irrigation_label: "Irrigation Method",
        farm_irr_drip: "Drip Irrigation",
        farm_irr_sprinkler: "Sprinkler System",
        farm_irr_flood: "Flood Irrigation",
        farm_irr_furrow: "Furrow Irrigation",
        farm_irr_rainfed: "Rainfed (No Irrigation)",
        farm_submit: "Continue to Add Crops",

        crop_form_title: "Add Crop",
        crop_form_desc: "Enter crop and soil details for personalized recommendations",
        crop_info_section: "Crop Information",
        crop_name_label: "Crop Name",
        crop_name_placeholder: "e.g., Wheat, Rice, Tomato",
        crop_date_label: "Plantation Date",
        crop_soil_section: "Soil Information",
        crop_soil_type_label: "Soil Type",
        crop_soil_clay: "Clay",
        crop_soil_sandy: "Sandy",
        crop_soil_loamy: "Loamy",
        crop_soil_silt: "Silt",
        crop_soil_peat: "Peat",
        crop_soil_chalky: "Chalky",
        crop_whc_label: "Water Holding Capacity",
        crop_whc_low: "Low",
        crop_whc_medium: "Medium",
        crop_whc_high: "High",
        crop_nitrogen: "Nitrogen (N)",
        crop_phosphorus: "Phosphorus (P)",
        crop_potassium: "Potassium (K)",
        crop_ph: "Soil pH",
        crop_ph_desc: "Acidic (0-6) • Neutral (6-7) • Alkaline (7-14)",
        crop_cancel: "Cancel",
        crop_submit: "Add Crop & Generate Plan",

        // IrrigationCard
        irr_title: "Irrigation Schedule",
        irr_frequency: "Frequency",
        irr_per_hectare: "Per Hectare",
        irr_next: "Next Irrigation",
        irr_calendar_title: "14-Day Irrigation Calendar",
        irr_today: "Today",
        irr_label_irrigate: "Irrigate",
        irr_label_skip_rain: "Skip – Rain",
        irr_label_done: "Done",
        irr_tips: "Tips",
        irr_sending: "Sending…",
        irr_sent: "Sent!",
        irr_remind_me: "Remind Me",

        // FertilizerCard
        fert_title: "Fertilizer Plan",
        fert_quantity: "Quantity",
        fert_timing: "Timing",
        fert_method: "Method",
        fert_how_to_apply: "How to Apply",
        fert_precautions: "Precautions",
        fert_schedule: "Fertilizer schedule:",

        // WeatherAlertCard
        weather_alerts_title: "Weather Alerts",
        weather_status_title: "Weather Status",
        weather_all_clear: "All Clear",
        weather_all_clear_desc: "No weather risks detected for your region right now.",
        weather_all_clear_desc_no_current: "No weather risks detected for your region",
        weather_humidity: "Humidity",
        weather_wind: "Wind",
        weather_preventive: "Preventive Measures:",

        // YieldEstimateCard
        yield_title: "Expected Yield",
        yield_per_unit: "Per",
        yield_farm_size: "Farm Size",
        yield_total_label: "total for",

        // GrowthStageCard
        growth_planted: "Planted:",
        growth_days_until_next: "days until next stage",
        growth_stage_progress: "Stage Progress",
        growth_stage_germination: "Germination",
        growth_stage_seedling: "Seedling",
        growth_stage_vegetative: "Vegetative",
        growth_stage_flowering: "Flowering",
        growth_stage_fruiting: "Fruiting",
        growth_stage_maturity: "Maturity",
        growth_stage_harvest: "Harvest Ready",

        // Dashboard farm header
        dash_crops_label: "crop",
    },

    // ─── Hindi ────────────────────────────────────────────────────────────────
    hi: {
        nav_home: "होम",
        nav_dashboard: "डैशबोर्ड",
        nav_addFarm: "खेत जोड़ें",
        nav_signIn: "साइन इन",
        nav_getStarted: "शुरू करें",
        nav_signOut: "साइन आउट",

        hero_badge: "AI-संचालित स्मार्ट खेती",
        hero_heading1: "स्मार्ट उगाएँ,",
        hero_heading2: "बेहतर काटें",
        hero_subheading:
            "आपका बुद्धिमान खेती साथी जो आपकी मिट्टी, जलवायु और फसलों के आधार पर व्यक्तिगत फसल प्रबंधन योजनाएँ, सिंचाई कार्यक्रम और वास्तविक समय की सिफारिशें प्रदान करता है।",
        hero_cta_primary: "अपने खेत की योजना शुरू करें",
        hero_cta_secondary: "डेमो डैशबोर्ड देखें",
        hero_pill_growth: "विकास ट्रैकिंग",
        hero_pill_irrigation: "स्मार्ट सिंचाई",
        hero_pill_fertilizer: "उर्वरक योजनाएँ",
        hero_pill_weather: "मौसम अलर्ट",

        features_heading: "स्मार्ट खेती के लिए सब कुछ",
        features_subheading:
            "हमारी AI आपके खेत के डेटा का विश्लेषण करती है और फसल वृद्धि के हर चरण में कार्रवाई योग्य मार्गदर्शन प्रदान करती है।",
        feat1_title: "विकास चरण का पता लगाना",
        feat1_desc:
            "रोपण तिथि के आधार पर फसल के वर्तमान चरण की स्वचालित गणना और समय पर कार्रवाई की सिफारिशें।",
        feat2_title: "स्मार्ट सिंचाई योजना",
        feat2_desc:
            "मिट्टी के प्रकार, फसल की जरूरतों और क्षेत्रीय जलवायु पैटर्न के आधार पर अनुकूलित पानी देने का कार्यक्रम।",
        feat3_title: "क्षेत्र-विशिष्ट उर्वरक",
        feat3_desc:
            "मिट्टी के पोषक तत्वों, फसल के प्रकार और स्थानीय कृषि प्रथाओं के अनुसार उर्वरक सिफारिशें।",
        feat4_title: "मौसम जोखिम अलर्ट",
        feat4_desc:
            "सूखा, पाला, अत्यधिक बारिश और गर्मी के तनाव के लिए प्रारंभिक चेतावनियाँ।",
        feat5_title: "उपज अनुमान",
        feat5_desc:
            "अपनी आय, भंडारण और बाजार समय की योजना बनाने के लिए अपेक्षित फसल की सीमाएँ जानें।",
        feat6_title: "बहु-फसल प्रबंधन",
        feat6_desc:
            "प्रत्येक खेती के लिए अलग, गैर-संघर्षकारी योजनाओं के साथ कई फसलों का प्रबंधन करें।",

        how_heading: "यह कैसे काम करता है",
        how_subheading: "कुछ सरल चरणों में व्यक्तिगत खेती मार्गदर्शन प्राप्त करें।",
        step1_title: "अपना खेत जोड़ें",
        step1_desc: "स्थान, आकार और सिंचाई विधि सहित अपने खेत का विवरण दर्ज करें।",
        step2_title: "अपनी फसलें जोड़ें",
        step2_desc: "हमें बताएं कि आप क्या उगा रहे हैं और प्रत्येक फसल की मिट्टी की स्थिति क्या है।",
        step3_title: "AI विश्लेषण प्राप्त करें",
        step3_desc: "हमारी AI आपकी परिस्थितियों के अनुकूल एक पूर्ण प्रबंधन योजना तैयार करती है।",
        step4_title: "सिफारिशों का पालन करें",
        step4_desc: "उगाने के मौसम में समय पर अलर्ट और चरण-दर-चरण मार्गदर्शन प्राप्त करें।",

        cta_heading: "अपनी खेती बदलने के लिए तैयार हैं?",
        cta_subheading:
            "हजारों किसानों के साथ जुड़ें जो बेहतर फसल उगाने और उपज बढ़ाने के लिए AI-संचालित अंतर्दृष्टि का उपयोग कर रहे हैं।",
        cta_button: "अपनी मुफ्त योजना शुरू करें",

        footer_tagline: "© 2025 AgriWise. टिकाऊ भविष्य के लिए स्मार्ट खेती।",

        login_welcome: "वापस स्वागत है",
        login_subtitle: "अपने कृषि डैशबोर्ड में साइन इन करें",
        login_google: "Google से जारी रखें",
        login_signing_in: "साइन इन हो रहा है...",
        login_or_email: "या ईमेल से जारी रखें",
        login_email: "ईमेल",
        login_password: "पासवर्ड",
        login_email_placeholder: "you@example.com",
        login_submit: "साइन इन करें",
        login_submitting: "साइन इन हो रहा है...",
        login_no_account: "खाता नहीं है?",
        login_signup_link: "मुफ्त में साइन अप करें",
        login_err_invalid: "अमान्य ईमेल या पासवर्ड।",
        login_err_too_many: "बहुत अधिक प्रयास। कृपया बाद में पुनः प्रयास करें।",
        login_err_cancelled: "Google साइन-इन रद्द कर दिया गया।",
        login_err_default: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",

        signup_title: "अपना खाता बनाएं",
        signup_subtitle: "आज से स्मार्ट खेती शुरू करें — यह मुफ्त है",
        signup_google: "Google से जारी रखें",
        signup_signing_up: "साइन अप हो रहा है...",
        signup_or_email: "या ईमेल से साइन अप करें",
        signup_email: "ईमेल",
        signup_password: "पासवर्ड",
        signup_password_placeholder: "न्यूनतम 6 अक्षर",
        signup_confirm_password: "पासवर्ड की पुष्टि करें",
        signup_submit: "खाता बनाएं",
        signup_submitting: "खाता बनाया जा रहा है...",
        signup_has_account: "पहले से खाता है?",
        signup_signin_link: "साइन इन करें",
        signup_err_exists: "यह ईमेल पहले से पंजीकृत है। इसके बजाय साइन इन करने का प्रयास करें।",
        signup_err_weak: "पासवर्ड बहुत कमजोर है। कम से कम 6 अक्षरों का उपयोग करें।",
        signup_err_cancelled: "Google साइन-अप रद्द कर दिया गया।",
        signup_err_default: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",

        dash_welcome: "आपके कृषि डैशबोर्ड में आपका स्वागत है",
        dash_no_farms_desc: "आपने अभी तक कोई खेत नहीं जोड़ा है। व्यक्तिगत AI-संचालित सिफारिशें प्राप्त करने के लिए अपना पहला खेत जोड़ें।",
        dash_add_first_farm: "अपना पहला खेत जोड़ें",
        dash_add_crop: "फसल जोड़ें",
        dash_no_crops: "अभी तक कोई फसल नहीं जोड़ी गई",
        dash_no_crops_desc: "प्रबंधन योजनाएँ देखने के लिए अपनी पहली फसल जोड़ें।",
        dash_add_a_crop: "एक फसल जोड़ें",
        dash_generating: "प्रबंधन योजना तैयार की जा रही है…",
        dash_general_rec: "सामान्य सिफारिशें",

        addfarm_step1: "खेत सेटअप",
        addfarm_step2: "फसल जोड़ें",
        addfarm_step3: "योजना प्राप्त करें",
        addfarm_back: "खेत विवरण पर वापस जाएं",
        addfarm_generating_title: "आपकी योजना तैयार की जा रही है",
        addfarm_generating_desc: "AI आपकी व्यक्तिगत कृषि सिफारिशें तैयार कर रहा है…",
        addfarm_done_title: "सब तैयार!",
        addfarm_done_desc: "आपकी व्यक्तिगत कृषि योजना तैयार है। डैशबोर्ड पर पुनर्निर्देशित किया जा रहा है…",

        farm_form_title: "खेत का विवरण",
        farm_form_desc: "शुरू करने के लिए अपने खेत की जानकारी भरें",
        farm_name_label: "खेत का नाम",
        farm_name_placeholder: "मेरा खेत",
        farm_location_label: "स्थान",
        farm_location_placeholder: "क्षेत्र का स्थान या पता दर्ज करें",
        farm_size_label: "खेत का आकार",
        farm_unit_label: "इकाई",
        farm_unit_hectares: "हेक्टेयर",
        farm_unit_acres: "एकड़",
        farm_irrigation_label: "सिंचाई विधि",
        farm_irr_drip: "ड्रिप सिंचाई",
        farm_irr_sprinkler: "स्प्रिंकलर प्रणाली",
        farm_irr_flood: "बाढ़ सिंचाई",
        farm_irr_furrow: "नाली सिंचाई",
        farm_irr_rainfed: "वर्षा आधारित",
        farm_submit: "फसल जोड़ने के लिए आगे बढ़ें",

        crop_form_title: "फसल जोड़ें",
        crop_form_desc: "व्यक्तिगत सिफारिशों के लिए फसल और मिट्टी का विवरण भरें",
        crop_info_section: "फसल जानकारी",
        crop_name_label: "फसल का नाम",
        crop_name_placeholder: "उदा. गेहूँ, चावल, टमाटर",
        crop_date_label: "बुवाई की तारीख",
        crop_soil_section: "मिट्टी की जानकारी",
        crop_soil_type_label: "मिट्टी का प्रकार",
        crop_soil_clay: "चिकनी मिट्टी",
        crop_soil_sandy: "रेतीली मिट्टी",
        crop_soil_loamy: "दोमट मिट्टी",
        crop_soil_silt: "गाद मिट्टी",
        crop_soil_peat: "पीट मिट्टी",
        crop_soil_chalky: "चूनी मिट्टी",
        crop_whc_label: "जल धारण क्षमता",
        crop_whc_low: "कम",
        crop_whc_medium: "मध्यम",
        crop_whc_high: "अधिक",
        crop_nitrogen: "नाइट्रोजन (N)",
        crop_phosphorus: "फास्फोरस (P)",
        crop_potassium: "पोटैशियम (K)",
        crop_ph: "मिट्टी pH",
        crop_ph_desc: "अम्लीय (0-6) • निरपेक्ष (6-7) • क्षारीय (7-14)",
        crop_cancel: "रद्द करें",
        crop_submit: "फसल जोड़ें और योजना तैयार करें",

        // IrrigationCard
        irr_title: "सिंचाई अनुसूची",
        irr_frequency: "आवृत्ति",
        irr_per_hectare: "प्रति हेक्टेयर",
        irr_next: "अगली सिंचाई",
        irr_calendar_title: "14-दिन सिंचाई कैलेंडर",
        irr_today: "आज",
        irr_label_irrigate: "सिंचाई करें",
        irr_label_skip_rain: "छोड़ें – बारिश",
        irr_label_done: "हो गया",
        irr_tips: "सुझाव",
        irr_sending: "भेजा जा रहा है…",
        irr_sent: "भेजा!",
        irr_remind_me: "याद दिलाएं",

        // FertilizerCard
        fert_title: "उर्वरक योजना",
        fert_quantity: "मात्रा",
        fert_timing: "समय",
        fert_method: "विधि",
        fert_how_to_apply: "कैसे लगाएं",
        fert_precautions: "सावधानियाँ",
        fert_schedule: "उर्वरक कार्यक्रम:",

        // WeatherAlertCard
        weather_alerts_title: "मौसम अलर्ट",
        weather_status_title: "मौसम स्थिति",
        weather_all_clear: "सब ठीक है",
        weather_all_clear_desc: "अभी आपके क्षेत्र में कोई मौसम जोखिम नहीं।",
        weather_all_clear_desc_no_current: "आपके क्षेत्र में कोई मौसम जोखिम नहीं",
        weather_humidity: "आर्द्रता",
        weather_wind: "हवा",
        weather_preventive: "सावधानी के उपाय:",

        // YieldEstimateCard
        yield_title: "अपेक्षित उपज",
        yield_per_unit: "प्रति",
        yield_farm_size: "खेत का आकार",
        yield_total_label: "के लिए कुल",

        // GrowthStageCard
        growth_planted: "लगाया:",
        growth_days_until_next: "दिन अगले चरण तक",
        growth_stage_progress: "चरण प्रगति",
        growth_stage_germination: "अंकुरण",
        growth_stage_seedling: "पौध",
        growth_stage_vegetative: "वानस्पतिक",
        growth_stage_flowering: "फूलना",
        growth_stage_fruiting: "फल",
        growth_stage_maturity: "परिपक्वता",
        growth_stage_harvest: "कटाई के लिए तैयार",

        // Dashboard farm header
        dash_crops_label: "फसल",
    },

    // ─── Marathi ──────────────────────────────────────────────────────────────
    mr: {
        nav_home: "मुखपृष्ठ",
        nav_dashboard: "डॅशबोर्ड",
        nav_addFarm: "शेत जोडा",
        nav_signIn: "साइन इन",
        nav_getStarted: "सुरुवात करा",
        nav_signOut: "साइन आउट",

        hero_badge: "AI-चालित स्मार्ट शेती",
        hero_heading1: "स्मार्ट पिकवा,",
        hero_heading2: "अधिक कापणी करा",
        hero_subheading:
            "तुमचा बुद्धिमान शेती साथी जो तुमची माती, हवामान आणि पिकांच्या आधारे वैयक्तिक पीक व्यवस्थापन योजना, सिंचन वेळापत्रक आणि वास्तविक वेळेच्या शिफारसी प्रदान करतो।",
        hero_cta_primary: "तुमच्या शेताची योजना सुरू करा",
        hero_cta_secondary: "डेमो डॅशबोर्ड पाहा",
        hero_pill_growth: "वाढ ट्रॅकिंग",
        hero_pill_irrigation: "स्मार्ट सिंचन",
        hero_pill_fertilizer: "खत योजना",
        hero_pill_weather: "हवामान अलर्ट",

        features_heading: "स्मार्ट शेतीसाठी सर्व काही",
        features_subheading:
            "आमची AI तुमच्या शेताच्या डेटाचे विश्लेषण करते आणि पीक वाढीच्या प्रत्येक टप्प्यावर कृती करण्यायोग्य मार्गदर्शन प्रदान करते।",
        feat1_title: "वाढीचा टप्पा शोध",
        feat1_desc:
            "लागवडीच्या तारखेच्या आधारे पिकाच्या सध्याच्या टप्प्याची स्वयंचलित गणना आणि वेळेवर कृतीच्या शिफारसी।",
        feat2_title: "स्मार्ट सिंचन नियोजन",
        feat2_desc:
            "मातीचा प्रकार, पिकांच्या गरजा आणि प्रादेशिक हवामान पॅटर्नवर आधारित सानुकूल पाणी देण्याचे वेळापत्रक।",
        feat3_title: "क्षेत्र-विशिष्ट सार",
        feat3_desc:
            "मातीतील पोषक तत्त्वे, पिकाचा प्रकार आणि स्थानिक कृषी पद्धतींनुसार खत शिफारसी।",
        feat4_title: "हवामान धोका अलर्ट",
        feat4_desc:
            "दुष्काळ, दंव, जास्त पाऊस आणि उष्णतेच्या तणावाबद्दल प्रारंभिक इशारे।",
        feat5_title: "उत्पादन अंदाज",
        feat5_desc:
            "तुमचे उत्पन्न, साठवण आणि बाजार वेळ नियोजित करण्यासाठी अपेक्षित कापणी श्रेणी जाणून घ्या।",
        feat6_title: "बहु-पीक व्यवस्थापन",
        feat6_desc:
            "प्रत्येक लागवडीसाठी स्वतंत्र, विरोध नसलेल्या योजनांसह अनेक पिकांचे व्यवस्थापन करा।",

        how_heading: "हे कसे कार्य करते",
        how_subheading: "काही सोप्या चरणांमध्ये वैयक्तिक शेती मार्गदर्शन मिळवा।",
        step1_title: "तुमचे शेत जोडा",
        step1_desc: "स्थान, आकार आणि सिंचन पद्धतीसह तुमच्या शेताचे तपशील प्रविष्ट करा।",
        step2_title: "तुमची पिके जोडा",
        step2_desc: "तुम्ही काय पिकवत आहात आणि प्रत्येक पिकाची माती स्थिती सांगा।",
        step3_title: "AI विश्लेषण मिळवा",
        step3_desc: "आमची AI तुमच्या परिस्थितींनुसार एक संपूर्ण व्यवस्थापन योजना तयार करते।",
        step4_title: "शिफारसींचे पालन करा",
        step4_desc: "वाढत्या हंगामात वेळेवर अलर्ट आणि चरण-दर-चरण मार्गदर्शन मिळवा।",

        cta_heading: "तुमची शेती बदलण्यास तयार आहात?",
        cta_subheading:
            "हजारो शेतकऱ्यांसोबत जोडा जे AI-चालित अंतर्दृष्टी वापरून चांगली पिके वाढवत आहेत।",
        cta_button: "तुमची विनामूल्य योजना सुरू करा",

        footer_tagline: "© 2025 AgriWise. शाश्वत भविष्यासाठी स्मार्ट शेती।",

        login_welcome: "परत स्वागत आहे",
        login_subtitle: "तुमच्या शेती डॅशबोर्डमध्ये साइन इन करा",
        login_google: "Google द्वारे सुरू ठेवा",
        login_signing_in: "साइन इन होत आहे...",
        login_or_email: "किंवा ईमेलद्वारे सुरू ठेवा",
        login_email: "ईमेल",
        login_password: "पासवर्ड",
        login_email_placeholder: "you@example.com",
        login_submit: "साइन इन करा",
        login_submitting: "साइन इन होत आहे...",
        login_no_account: "खाते नाही?",
        login_signup_link: "मोफत साइन अप करा",
        login_err_invalid: "अवैध ईमेल किंवा पासवर्ड.",
        login_err_too_many: "खूप प्रयत्न. कृपया नंतर पुन्हा प्रयत्न करा.",
        login_err_cancelled: "Google साइन-इन रद्द केले.",
        login_err_default: "काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.",

        signup_title: "तुमचे खाते तयार करा",
        signup_subtitle: "आजच स्मार्ट पद्धतीने शेती सुरू करा — मोफत आहे",
        signup_google: "Google द्वारे सुरू ठेवा",
        signup_signing_up: "साइन अप होत आहे...",
        signup_or_email: "किंवा ईमेलद्वारे साइन अप करा",
        signup_email: "ईमेल",
        signup_password: "पासवर्ड",
        signup_password_placeholder: "किमान 6 अक्षरे",
        signup_confirm_password: "पासवर्डची पुष्टी करा",
        signup_submit: "खाते तयार करा",
        signup_submitting: "खाते तयार होत आहे...",
        signup_has_account: "आधीच खाते आहे?",
        signup_signin_link: "साइन इन करा",
        signup_err_exists: "हा ईमेल आधीच नोंदणीकृत आहे. त्याऐवजी साइन इन करण्याचा प्रयत्न करा.",
        signup_err_weak: "पासवर्ड खूप कमकुवत आहे. किमान 6 अक्षरे वापरा.",
        signup_err_cancelled: "Google साइन-अप रद्द केले.",
        signup_err_default: "काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.",

        dash_welcome: "तुमच्या शेती डॅशबोर्डमध्ये आपले स्वागत आहे",
        dash_no_farms_desc: "तुम्ही अद्याप कोणतेही शेत जोडलेले नाही. वैयक्तिक AI-चालित शिफारसी मिळवण्यासाठी तुमचे पहिले शेत जोडा.",
        dash_add_first_farm: "तुमचे पहिले शेत जोडा",
        dash_add_crop: "पीक जोडा",
        dash_no_crops: "अद्याप कोणतीही पिके जोडलेली नाहीत",
        dash_no_crops_desc: "व्यवस्थापन योजना पाहण्यासाठी तुमचे पहिले पीक जोडा.",
        dash_add_a_crop: "एक पीक जोडा",
        dash_generating: "व्यवस्थापन योजना तयार केली जात आहे…",
        dash_general_rec: "सामान्य शिफारसी",

        addfarm_step1: "शेत सेटअप",
        addfarm_step2: "पीक जोडा",
        addfarm_step3: "योजना मिळवा",
        addfarm_back: "शेत तपशीलांवर परत जा",
        addfarm_generating_title: "तुमची योजना तयार होत आहे",
        addfarm_generating_desc: "AI तुमच्या वैयक्तिक शेती शिफारसी तयार करत आहे…",
        addfarm_done_title: "सर्व तयार!",
        addfarm_done_desc: "तुमची वैयक्तिक शेती योजना तयार आहे. डॅशबोर्डवर पुनर्निर्देशित केले जात आहे…",

        farm_form_title: "शेताचे तपशील",
        farm_form_desc: "सुरुवात करण्यासाठी तुमची शेताची माहिती भरा",
        farm_name_label: "शेताचे नाव",
        farm_name_placeholder: "माझे शेत",
        farm_location_label: "स्थान",
        farm_location_placeholder: "शेताचे स्थान किंवा पत्ता प्रविष्ट करा",
        farm_size_label: "शेताचा आकार",
        farm_unit_label: "एकक",
        farm_unit_hectares: "हेक्टर",
        farm_unit_acres: "एकर",
        farm_irrigation_label: "सिंचन पद्धत",
        farm_irr_drip: "ठिबक सिंचन",
        farm_irr_sprinkler: "तुषार प्रणाली",
        farm_irr_flood: "पूर सिंचन",
        farm_irr_furrow: "सरी सिंचन",
        farm_irr_rainfed: "पावसावर अवलंबुन",
        farm_submit: "पीक जोडण्यासाठी पुढे चला",

        crop_form_title: "पीक जोडा",
        crop_form_desc: "वैयक्तिक शिफारसींसाठी पीक आणि माती तपशील भरा",
        crop_info_section: "पीक माहिती",
        crop_name_label: "पीकाचे नाव",
        crop_name_placeholder: "उदा. गहू, तांदूळ, टमाटो",
        crop_date_label: "लागवड तारीख",
        crop_soil_section: "माती माहिती",
        crop_soil_type_label: "मातीचा प्रकार",
        crop_soil_clay: "चिकण माती",
        crop_soil_sandy: "वाळू माती",
        crop_soil_loamy: "जमीन माती",
        crop_soil_silt: "गाळ माती",
        crop_soil_peat: "पीट माती",
        crop_soil_chalky: "खडू माती",
        crop_whc_label: "पाणी धरण क्षमता",
        crop_whc_low: "कमी",
        crop_whc_medium: "मध्यम",
        crop_whc_high: "जास्त",
        crop_nitrogen: "नायट्रोजन (N)",
        crop_phosphorus: "फॉस्फरस (P)",
        crop_potassium: "पोटॅशियम (K)",
        crop_ph: "माती pH",
        crop_ph_desc: "आम्लीय (0-6) • तटस्थ (6-7) • अल्कलीय (7-14)",
        crop_cancel: "रद्द करा",
        crop_submit: "पीक जोडा आणि योजना तयार करा",

        // IrrigationCard
        irr_title: "सिंचन वेळापत्रक",
        irr_frequency: "वारंवारता",
        irr_per_hectare: "प्रति हेक्टर",
        irr_next: "पुढील सिंचन",
        irr_calendar_title: "१४ दिवसांचे सिंचन वेळापत्रक",
        irr_today: "आज",
        irr_label_irrigate: "सिंचन करा",
        irr_label_skip_rain: "वगळा – पाऊस",
        irr_label_done: "झाले",
        irr_tips: "टिप्स",
        irr_sending: "पाठवत आहे…",
        irr_sent: "पाठवले!",
        irr_remind_me: "आठवण करा",

        // FertilizerCard
        fert_title: "खत योजना",
        fert_quantity: "प्रमाण",
        fert_timing: "वेळ",
        fert_method: "पद्धत",
        fert_how_to_apply: "कसे वापरावे",
        fert_precautions: "काळजी घ्या",
        fert_schedule: "खत वेळापत्रक:",

        // WeatherAlertCard
        weather_alerts_title: "हवामान सूचना",
        weather_status_title: "हवामान स्थिती",
        weather_all_clear: "सर्व ठीक आहे",
        weather_all_clear_desc: "सध्या तुमच्या क्षेत्रात कोणताही हवामान धोका नाही.",
        weather_all_clear_desc_no_current: "तुमच्या क्षेत्रात कोणताही हवामान धोका नाही",
        weather_humidity: "आर्द्रता",
        weather_wind: "वारा",
        weather_preventive: "प्रतिबंधात्मक उपाय:",

        // YieldEstimateCard
        yield_title: "अपेक्षित उत्पादन",
        yield_per_unit: "प्रति",
        yield_farm_size: "शेताचा आकार",
        yield_total_label: "साठी एकूण",

        // GrowthStageCard
        growth_planted: "लागवड:",
        growth_days_until_next: "दिवस पुढील टप्प्यापर्यंत",
        growth_stage_progress: "टप्प्याची प्रगती",
        growth_stage_germination: "उगवण",
        growth_stage_seedling: "रोपटे",
        growth_stage_vegetative: "वाढीचा टप्पा",
        growth_stage_flowering: "फुलोरा",
        growth_stage_fruiting: "फळधारणा",
        growth_stage_maturity: "परिपक्वता",
        growth_stage_harvest: "कापणीसाठी तयार",

        // Dashboard farm header
        dash_crops_label: "पीक",
    },

    // ─── Telugu ───────────────────────────────────────────────────────────────
    te: {
        nav_home: "హోమ్",
        nav_dashboard: "డాష్‌బోర్డ్",
        nav_addFarm: "పొలం జోడించు",
        nav_signIn: "సైన్ ఇన్",
        nav_getStarted: "ప్రారంభించండి",
        nav_signOut: "సైన్ అవుట్",

        hero_badge: "AI-ఆధారిత స్మార్ట్ వ్యవసాయం",
        hero_heading1: "తెలివిగా పండించండి,",
        hero_heading2: "మెరుగ్గా పంటలు కోయండి",
        hero_subheading:
            "మీ నేల, వాతావరణం మరియు పంటల ఆధారంగా వ్యక్తిగతీకరించిన పంట నిర్వహణ ప్రణాళికలు, నీటిపారుదల షెడ్యూళ్లు మరియు రియల్-టైమ్ సిఫారసులు అందించే మీ తెలివైన వ్యవసాయ సహాయకుడు.",
        hero_cta_primary: "మీ పొలం ప్రణాళికను ప్రారంభించండి",
        hero_cta_secondary: "డెమో డాష్‌బోర్డ్ చూడండి",
        hero_pill_growth: "వృద్ధి ట్రాకింగ్",
        hero_pill_irrigation: "స్మార్ట్ నీటిపారుదల",
        hero_pill_fertilizer: "ఎరువు ప్రణాళికలు",
        hero_pill_weather: "వాతావరణ హెచ్చరికలు",

        features_heading: "తెలివైన వ్యవసాయానికి అవసరమైన అన్నీ",
        features_subheading:
            "మా AI మీ పొలం డేటాను విశ్లేషించి పంట వృద్ధిలోని ప్రతి దశలో చర్య తీసుకోగల మార్గదర్శకత్వాన్ని అందిస్తుంది.",
        feat1_title: "వృద్ధి దశ గుర్తింపు",
        feat1_desc:
            "నాటిన తేదీ ఆధారంగా పంట ప్రస్తుత దశను స్వయంచాలకంగా లెక్కించి సకాలంలో చర్య సిఫారసులు అందిస్తుంది.",
        feat2_title: "స్మార్ట్ నీటిపారుదల ప్రణాళిక",
        feat2_desc:
            "నేల రకం, పంట అవసరాలు మరియు ప్రాంతీయ వాతావరణ నమూనాల ఆధారంగా అనుకూలీకరించిన నీటి షెడ్యూళ్లు.",
        feat3_title: "ప్రాంత-నిర్దిష్ట ఎరువు",
        feat3_desc:
            "నేల పోషకాలు, పంట రకం మరియు స్థానిక వ్యవసాయ పద్ధతులకు అనుగుణంగా ఎరువు సిఫారసులు.",
        feat4_title: "వాతావరణ ప్రమాద హెచ్చరికలు",
        feat4_desc:
            "కరువు, మంచు, అధిక వర్షం మరియు వేడి ఒత్తిడికి ముందస్తు హెచ్చరికలు.",
        feat5_title: "దిగుబడి అంచనా",
        feat5_desc:
            "మీ ఆదాయం, నిల్వ మరియు మార్కెట్ సమయాన్ని ప్లాన్ చేయడానికి అంచనా పంట పరిధులు తెలుసుకోండి.",
        feat6_title: "బహుళ-పంట నిర్వహణ",
        feat6_desc:
            "ప్రతి సాగుకు వేర్వేరు, విరుద్ధంగాని ప్రణాళికలతో బహుళ పంటలను నిర్వహించండి.",

        how_heading: "ఇది ఎలా పని చేస్తుంది",
        how_subheading: "కొన్ని సరళమైన దశలలో వ్యక్తిగతీకరించిన వ్యవసాయ మార్గదర్శకత్వాన్ని పొందండి.",
        step1_title: "మీ పొలాన్ని జోడించండి",
        step1_desc: "స్థానం, పరిమాణం మరియు నీటిపారుదల పద్ధతితో సహా మీ పొలం వివరాలను నమోదు చేయండి.",
        step2_title: "మీ పంటలను జోడించండి",
        step2_desc: "మీరు ఏమి పండిస్తున్నారు మరియు ప్రతి పంటకు నేల పరిస్థితులు చెప్పండి.",
        step3_title: "AI విశ్లేషణ పొందండి",
        step3_desc: "మా AI మీ పరిస్థితులకు అనుసరించిన సంపూర్ణ నిర్వహణ ప్రణాళికను రూపొందిస్తుంది.",
        step4_title: "సిఫారసులను అనుసరించండి",
        step4_desc: "పెరుగుదల సీజన్ అంతటా సకాలంలో హెచ్చరికలు మరియు దశల వారీ మార్గదర్శకత్వాన్ని పొందండి.",

        cta_heading: "మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?",
        cta_subheading:
            "మెరుగైన పంటలు పండించి దిగుబడులు పెంచుకోవడానికి AI-ఆధారిత అంతర్దృష్టులు వాడుతున్న వేలాది రైతులతో చేరండి.",
        cta_button: "మీ ఉచిత ప్రణాళికను ప్రారంభించండి",

        footer_tagline: "© 2025 AgriWise. స్థిరమైన భవిష్యత్తు కోసం స్మార్ట్ వ్యవసాయం.",

        login_welcome: "తిరిగి స్వాగతం",
        login_subtitle: "మీ వ్యవసాయ డాష్‌బోర్డ్‌లో సైన్ ఇన్ చేయండి",
        login_google: "Googleతో కొనసాగించండి",
        login_signing_in: "సైన్ ఇన్ అవుతోంది...",
        login_or_email: "లేదా ఇమెయిల్‌తో కొనసాగించండి",
        login_email: "ఇమెయిల్",
        login_password: "పాస్‌వర్డ్",
        login_email_placeholder: "you@example.com",
        login_submit: "సైన్ ఇన్ చేయండి",
        login_submitting: "సైన్ ఇన్ అవుతోంది...",
        login_no_account: "అకౌంట్ లేదా?",
        login_signup_link: "ఉచితంగా సైన్ అప్ చేయండి",
        login_err_invalid: "చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్.",
        login_err_too_many: "చాలా ప్రయత్నాలు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
        login_err_cancelled: "Google సైన్-ఇన్ రద్దు చేయబడింది.",
        login_err_default: "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",

        signup_title: "మీ ఖాతా సృష్టించండి",
        signup_subtitle: "ఈరోజే స్మార్ట్‌గా వ్యవసాయం చేయడం ప్రారంభించండి — ఉచితం",
        signup_google: "Googleతో కొనసాగించండి",
        signup_signing_up: "సైన్ అప్ అవుతోంది...",
        signup_or_email: "లేదా ఇమెయిల్‌తో సైన్ అప్ చేయండి",
        signup_email: "ఇమెయిల్",
        signup_password: "పాస్‌వర్డ్",
        signup_password_placeholder: "కనిష్టం 6 అక్షరాలు",
        signup_confirm_password: "పాస్‌వర్డ్ నిర్ధారించండి",
        signup_submit: "ఖాతా సృష్టించండి",
        signup_submitting: "ఖాతా సృష్టిస్తోంది...",
        signup_has_account: "ఇప్పటికే ఖాతా ఉందా?",
        signup_signin_link: "సైన్ ఇన్ చేయండి",
        signup_err_exists: "ఈ ఇమెయిల్ ఇప్పటికే నమోదు చేయబడింది.",
        signup_err_weak: "పాస్‌వర్డ్ చాలా బలహీనంగా ఉంది. కనిష్టం 6 అక్షరాలు ఉపయోగించండి.",
        signup_err_cancelled: "Google సైన్-అప్ రద్దు చేయబడింది.",
        signup_err_default: "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",

        dash_welcome: "మీ వ్యవసాయ డాష్‌బోర్డ్‌కు స్వాగతం",
        dash_no_farms_desc: "మీరు ఇంకా పొలం జోడించలేదు. వ్యక్తిగతీకరించిన AI సిఫారసులు పొందడానికి మీ మొదటి పొలాన్ని జోడించండి.",
        dash_add_first_farm: "మీ మొదటి పొలాన్ని జోడించండి",
        dash_add_crop: "పంట జోడించు",
        dash_no_crops: "ఇంకా పంటలు జోడించలేదు",
        dash_no_crops_desc: "నిర్వహణ ప్రణాళికలు చూడటానికి మీ మొదటి పంటను జోడించండి.",
        dash_add_a_crop: "ఒక పంట జోడించు",
        dash_generating: "నిర్వహణ ప్రణాళిక రూపొందించబడుతోంది…",
        dash_general_rec: "సాధారణ సిఫారసులు",

        addfarm_step1: "పొలం సెటప్",
        addfarm_step2: "పంట జోడించు",
        addfarm_step3: "ప్రణాళిక పొందు",
        addfarm_back: "పొలం వివరాలకు తిరిగి వెళ్ళు",
        addfarm_generating_title: "మీ ప్రణాళిక రూపొందించబడుతోంది",
        addfarm_generating_desc: "AI మీ వ్యక్తిగతీకరించిన వ్యవసాయ సిఫారసులు సిద్ధం చేస్తోంది…",
        addfarm_done_title: "సిద్ధంగా ఉంది!",
        addfarm_done_desc: "మీ వ్యక్తిగతీకరించిన వ్యవసాయ ప్రణాళిక సిద్ధంగా ఉంది. డాష్‌బోర్డ్‌కు దారి మళ్లిస్తోంది…",

        farm_form_title: "పొలం వివరాలు",
        farm_form_desc: "ప్రారంభించడానికి మీ పొలం సమాచారాన్ని నింపండి",
        farm_name_label: "పొలం పేరు",
        farm_name_placeholder: "నా పొలం",
        farm_location_label: "స్థళం",
        farm_location_placeholder: "పొలం స్థళం లేదా చిరునామా నమోదు చేయండి",
        farm_size_label: "పొలం విస్తీర్ణం",
        farm_unit_label: "యూనిట్",
        farm_unit_hectares: "హెక్టార్లు",
        farm_unit_acres: "ఎకరాలు",
        farm_irrigation_label: "నీటిపారుదల పద్ధతి",
        farm_irr_drip: "డ్రిప్ నీటిపారుదల",
        farm_irr_sprinkler: "స్ప్రింక్లర్ వ్యవస్థ",
        farm_irr_flood: "వరద నీటిపారుదల",
        farm_irr_furrow: "కప్ప నీటిపారుదల",
        farm_irr_rainfed: "వర్షాధారితం",
        farm_submit: "పంటలు జోడించడానికి కొనసాగండి",

        crop_form_title: "పంట జోడించు",
        crop_form_desc: "వ్యక్తిగత సిఫారసులకు పంట మరియు నేల వివరాలు నమోదు చేయండి",
        crop_info_section: "పంట సమాచారం",
        crop_name_label: "పంట పేరు",
        crop_name_placeholder: "ఉదా. గోధుమ, వరి, టొమాటో",
        crop_date_label: "నాటు తేది",
        crop_soil_section: "నేల సమాచారం",
        crop_soil_type_label: "నేల రకం",
        crop_soil_clay: "మిట్టి నేల",
        crop_soil_sandy: "ఇసుక నేల",
        crop_soil_loamy: "మెత్తని నేల",
        crop_soil_silt: "పూడిక నేల",
        crop_soil_peat: "పీట్ నేల",
        crop_soil_chalky: "సుణ్ణం నేల",
        crop_whc_label: "నీటి నిలుపు సామర్థ్యం",
        crop_whc_low: "తక్కువ",
        crop_whc_medium: "మధ్యమ",
        crop_whc_high: "ఎక్కువ",
        crop_nitrogen: "నైట్రజన్ (N)",
        crop_phosphorus: "ఫాస్ఫరస్ (P)",
        crop_potassium: "పొటాషియం (K)",
        crop_ph: "నేల pH",
        crop_ph_desc: "ఆమ్లం (0-6) • తటస్థం (6-7) • క్షారం (7-14)",
        crop_cancel: "రద్దు చేయి",
        crop_submit: "పంట జోడించి ప్రణాళిక రూపొందించు",

        // IrrigationCard
        irr_title: "నీటిపారుదల షెడ్యూల్",
        irr_frequency: "పౌనఃపున్యం",
        irr_per_hectare: "హెక్టారుకు",
        irr_next: "తదుపరి నీటిపారుదల",
        irr_calendar_title: "14-రోజుల నీటిపారుదల క్యాలెండర్",
        irr_today: "నేడు",
        irr_label_irrigate: "నీరు పెట్టు",
        irr_label_skip_rain: "వదిలెయ్ – వర్షం",
        irr_label_done: "పూర్తైంది",
        irr_tips: "చిట్కాలు",
        irr_sending: "పంపుతోంది…",
        irr_sent: "పంపారు!",
        irr_remind_me: "గుర్తు చేయి",

        // FertilizerCard
        fert_title: "ఎరువు ప్రణాళిక",
        fert_quantity: "పరిమాణం",
        fert_timing: "సమయం",
        fert_method: "పద్ధతి",
        fert_how_to_apply: "ఎలా వేయాలి",
        fert_precautions: "జాగ్రత్తలు",
        fert_schedule: "ఎరువు షెడ్యూల్:",

        // WeatherAlertCard
        weather_alerts_title: "వాతావరణ హెచ్చరికలు",
        weather_status_title: "వాతావరణ స్థితి",
        weather_all_clear: "అంతా సరే",
        weather_all_clear_desc: "ప్రస్తుతం మీ ప్రాంతంలో వాతావరణ ప్రమాదాలు లేవు.",
        weather_all_clear_desc_no_current: "మీ ప్రాంతంలో వాతావరణ ప్రమాదాలు లేవు",
        weather_humidity: "తేమ",
        weather_wind: "గాలి",
        weather_preventive: "నివారణ చర్యలు:",

        // YieldEstimateCard
        yield_title: "అంచనా దిగుబడి",
        yield_per_unit: "ఒక్కొక్క",
        yield_farm_size: "పొలం విస్తీర్ణం",
        yield_total_label: "కోసం మొత్తం",

        // GrowthStageCard
        growth_planted: "నాటారు:",
        growth_days_until_next: "రోజులు తదుపరి దశకు",
        growth_stage_progress: "దశ పురోగతి",
        growth_stage_germination: "మొలకెత్తడం",
        growth_stage_seedling: "మొక్క",
        growth_stage_vegetative: "పెరుగుదల దశ",
        growth_stage_flowering: "పూత దశ",
        growth_stage_fruiting: "కాత దశ",
        growth_stage_maturity: "పరిపక్వత",
        growth_stage_harvest: "పంట కోయడానికి సిద్ధం",

        // Dashboard farm header
        dash_crops_label: "పంట",
    },

    // ─── Tamil ────────────────────────────────────────────────────────────────
    ta: {
        nav_home: "முகப்பு",
        nav_dashboard: "டாஷ்போர்டு",
        nav_addFarm: "பண்ணை சேர்",
        nav_signIn: "உள்நுழைய",
        nav_getStarted: "தொடங்குங்கள்",
        nav_signOut: "வெளியேறு",

        hero_badge: "செயற்கை நுண்ணறிவு சாகுபடி",
        hero_heading1: "புத்திசாலித்தனமாக வளர்க்கவும்,",
        hero_heading2: "சிறப்பாக அறுவடை செய்யவும்",
        hero_subheading:
            "உங்கள் மண், காலநிலை மற்றும் பயிர்களின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட பயிர் மேலாண்மை திட்டங்கள், நீர்ப்பாசன அட்டவணைகள் மற்றும் நிகழ்நேர பரிந்துரைகளை வழங்கும் உங்கள் சாகுபடி உதவியாளர்.",
        hero_cta_primary: "உங்கள் பண்ணை திட்டமிட தொடங்குங்கள்",
        hero_cta_secondary: "டெமோ டாஷ்போர்டு காண்க",
        hero_pill_growth: "வளர்ச்சி கண்காணிப்பு",
        hero_pill_irrigation: "நுட்பமான நீர்பாசனம்",
        hero_pill_fertilizer: "உர திட்டங்கள்",
        hero_pill_weather: "வானிலை எச்சரிக்கைகள்",

        features_heading: "சாகுபடியை மேம்படுத்த தேவையான அனைத்தும்",
        features_subheading:
            "நமது AI உங்கள் பண்ணை தரவை பகுப்பாய்வு செய்து பயிர் வளர்ச்சியின் ஒவ்வொரு கட்டத்திலும் செயல்படக்கூடிய வழிகாட்டலை வழங்குகிறது.",
        feat1_title: "வளர்ச்சி நிலை கண்டறிதல்",
        feat1_desc:
            "நடவு தேதியின் அடிப்படையில் பயிரின் தற்போதைய நிலையை தானாகவே கணக்கிட்டு சரியான நேரத்தில் பரிந்துரைகளை வழங்குகிறது.",
        feat2_title: "நுட்பமான நீர்பாசன திட்டமிடல்",
        feat2_desc:
            "மண் வகை, பயிரின் தேவைகள் மற்றும் பிராந்திய காலநிலை முறைகளின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட நீர்பாசன அட்டவணை.",
        feat3_title: "பிராந்திய சிறப்பு உரம்",
        feat3_desc:
            "மண் ஊட்டச்சத்துக்கள், பயிர் வகை மற்றும் உள்ளூர் விவசாய நடைமுறைகளுக்கு ஏற்ப உர பரிந்துரைகள்.",
        feat4_title: "வானிலை அபாய எச்சரிக்கைகள்",
        feat4_desc:
            "வறட்சி, உறைபனி, அதிக மழை மற்றும் வெப்ப அழுத்தத்திற்கு ஆரம்ப எச்சரிக்கைகள்.",
        feat5_title: "மகசூல் மதிப்பீடு",
        feat5_desc:
            "உங்கள் வருமானம், சேமிப்பு மற்றும் சந்தை நேரத்தை திட்டமிட எதிர்பார்க்கப்படும் அறுவடை வரம்புகளை அறியுங்கள்.",
        feat6_title: "பல பயிர் மேலாண்மை",
        feat6_desc:
            "ஒவ்வொரு சாகுபடிக்கும் தனித்தனி, முரண்படாத திட்டங்களுடன் பல பயிர்களை நிர்வகிக்கவும்.",

        how_heading: "இது எவ்வாறு செயல்படுகிறது",
        how_subheading: "சில எளிய படிகளில் தனிப்பயனாக்கப்பட்ட சாகுபடி வழிகாட்டலைப் பெறுங்கள்.",
        step1_title: "உங்கள் பண்ணையை சேர்க்கவும்",
        step1_desc: "இருப்பிடம், அளவு மற்றும் நீர்பாசன முறை உட்பட உங்கள் பண்ணை விவரங்களை உள்ளிடவும்.",
        step2_title: "உங்கள் பயிர்களை சேர்க்கவும்",
        step2_desc: "நீங்கள் என்ன வளர்க்கிறீர்கள் என்றும் ஒவ்வொரு பயிருக்கும் மண் நிலைமைகளும் சொல்லுங்கள்.",
        step3_title: "AI பகுப்பாய்வு பெறவும்",
        step3_desc: "நமது AI உங்கள் நிலைமைகளுக்கு ஏற்ப முழுமையான மேலாண்மை திட்டத்தை உருவாக்குகிறது.",
        step4_title: "பரிந்துரைகளைப் பின்பற்றவும்",
        step4_desc: "வளர்ச்சி பருவம் முழுவதும் சரியான நேரத்தில் எச்சரிக்கைகள் மற்றும் படிப்படியான வழிகாட்டலைப் பெறுங்கள்.",

        cta_heading: "உங்கள் விவசாயத்தை மாற்ற தயாரா?",
        cta_subheading:
            "சிறந்த பயிர்களை வளர்க்கவும் மகசூலை அதிகரிக்கவும் AI-ஆதாரமான நுண்ணறிவுகளைப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் சேருங்கள்.",
        cta_button: "இலவச திட்டத்தை தொடங்குங்கள்",

        footer_tagline: "© 2025 AgriWise. நிலையான எதிர்காலத்திற்கான சாகுபடி.",

        login_welcome: "மீண்டும் வரவேற்கிறோம்",
        login_subtitle: "உங்கள் வேளாண்மை டாஷ்போர்டில் உள்நுழையவும்",
        login_google: "Googleமூலம் தொடரவும்",
        login_signing_in: "உள்நுழைகிறது...",
        login_or_email: "அல்லது மின்னஞ்சல் மூலம் தொடரவும்",
        login_email: "மின்னஞ்சல்",
        login_password: "கடவுச்சொல்",
        login_email_placeholder: "you@example.com",
        login_submit: "உள்நுழைக",
        login_submitting: "உள்நுழைகிறது...",
        login_no_account: "கணக்கு இல்லையா?",
        login_signup_link: "இலவசமாக பதிவு செய்யவும்",
        login_err_invalid: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்.",
        login_err_too_many: "அதிக முயற்சிகள். தயவுசெய்து பிறகு மீண்டும் முயற்சிக்கவும்.",
        login_err_cancelled: "Google உள்நுழைவு ரத்தானது.",
        login_err_default: "ஏதோ தவறு நடந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",

        signup_title: "உங்கள் கணக்கை உருவாக்கவும்",
        signup_subtitle: "இன்றே புத்திசாலித்தனமாக வேளாண்மை தொடங்குங்கள் — இலவசம்",
        signup_google: "Googleமூலம் தொடரவும்",
        signup_signing_up: "பதிவு ஆகிறது...",
        signup_or_email: "அல்லது மின்னஞ்சல் மூலம் பதிவு செய்யவும்",
        signup_email: "மின்னஞ்சல்",
        signup_password: "கடவுச்சொல்",
        signup_password_placeholder: "குறைந்தது 6 எழுத்துகள்",
        signup_confirm_password: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        signup_submit: "கணக்கை உருவாக்கவும்",
        signup_submitting: "கணக்கை உருவாக்குகிறது...",
        signup_has_account: "ஏற்கனவே கணக்கு உள்ளதா?",
        signup_signin_link: "உள்நுழைக",
        signup_err_exists: "இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.",
        signup_err_weak: "கடவுச்சொல் மிகவும் பலவீனமாக உள்ளது. குறைந்தது 6 எழுத்துகள் பயன்படுத்தவும்.",
        signup_err_cancelled: "Google பதிவு ரத்தானது.",
        signup_err_default: "ஏதோ தவறு நடந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",

        dash_welcome: "உங்கள் வேளாண்மை டாஷ்போர்டுக்கு வரவேற்கிறோம்",
        dash_no_farms_desc: "நீங்கள் இன்னும் எந்த பண்ணையும் சேர்க்கவில்லை. தனிப்பயனாக்கப்பட்ட AI பரிந்துரைகளைப் பெற உங்கள் முதல் பண்ணையை சேர்க்கவும்.",
        dash_add_first_farm: "உங்கள் முதல் பண்ணையை சேர்க்கவும்",
        dash_add_crop: "பயிர் சேர்",
        dash_no_crops: "இன்னும் பயிர்கள் சேர்க்கப்படவில்லை",
        dash_no_crops_desc: "மேலாண்மை திட்டங்களை காண உங்கள் முதல் பயிரை சேர்க்கவும்.",
        dash_add_a_crop: "ஒரு பயிர் சேர்க்கவும்",
        dash_generating: "மேலாண்மை திட்டம் உருவாக்கப்படுகிறது…",
        dash_general_rec: "பொது பரிந்துரைகள்",

        addfarm_step1: "பண்ணை அமைப்பு",
        addfarm_step2: "பயிர் சேர்",
        addfarm_step3: "திட்டம் பெறு",
        addfarm_back: "பண்ணை விவரங்களுக்கு திரும்பு",
        addfarm_generating_title: "உங்கள் திட்டம் உருவாக்கப்படுகிறது",
        addfarm_generating_desc: "AI உங்கள் தனிப்பயனாக்கப்பட்ட வேளாண்மை பரிந்துரைகளை தயாரிக்கிறது…",
        addfarm_done_title: "அனைத்தும் தயார்!",
        addfarm_done_desc: "உங்கள் தனிப்பயனாக்கப்பட்ட வேளாண்மை திட்டம் தயார். டாஷ்போர்டுக்கு திருப்பி அனுப்பப்படுகிறது…",

        farm_form_title: "பண்ணை விவரங்கள்",
        farm_form_desc: "தொடங்க உங்கள் பண்ணை தகவல்களை உள்ளிடவும்",
        farm_name_label: "பண்ணை பெயர்",
        farm_name_placeholder: "என் பண்ணை",
        farm_location_label: "இடம்",
        farm_location_placeholder: "பண்ணை இடம் அல்லது முகவரியை உள்ளிடவும்",
        farm_size_label: "பண்ணை பரப்பளவு",
        farm_unit_label: "அலகு",
        farm_unit_hectares: "ஹெக்டேர்",
        farm_unit_acres: "ஏக்கர்",
        farm_irrigation_label: "நீர்பாசன முறை",
        farm_irr_drip: "துளிப்பயன் நீர்பாசனம்",
        farm_irr_sprinkler: "தெளிப்படிப்பு முறைமை",
        farm_irr_flood: "வெள்ள நீர்பாசனம்",
        farm_irr_furrow: "சால் நீர்பாசனம்",
        farm_irr_rainfed: "மழையில் தங்கியது",
        farm_submit: "பயிர் சேர்க்க தொடரவும்",

        crop_form_title: "பயிர் சேர்",
        crop_form_desc: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகளுக்கு பயிர் மற்றும் மண் விவரங்கள் உள்ளிடவும்",
        crop_info_section: "பயிர் தகவல்",
        crop_name_label: "பயிர் பெயர்",
        crop_name_placeholder: "உதா. கோதுமை, நெல், தக்காளி",
        crop_date_label: "நடவு தேதி",
        crop_soil_section: "மண் தகவல்",
        crop_soil_type_label: "மண் வகை",
        crop_soil_clay: "செங்கள் மண்",
        crop_soil_sandy: "மணறு மண்",
        crop_soil_loamy: "செழும்பொருள் மண்",
        crop_soil_silt: "எக்கர மண்",
        crop_soil_peat: "பீட் மண்",
        crop_soil_chalky: "சுண்ணாம்பு மண்",
        crop_whc_label: "நீர் தக்கவைப்பு திறன்",
        crop_whc_low: "குறைவ்",
        crop_whc_medium: "மெரும்",
        crop_whc_high: "அதிகம்",
        crop_nitrogen: "நைட்ரஜன் (N)",
        crop_phosphorus: "பாஸ்பரஸ் (P)",
        crop_potassium: "பொட்டாசியம் (K)",
        crop_ph: "மண் pH",
        crop_ph_desc: "அமிலம் (0-6) • சமதுலம் (6-7) • காரம் (7-14)",
        crop_cancel: "ரத்துசெய்",
        crop_submit: "பயிர் சேர்த்து திட்டம் உருவாக்கு",

        // IrrigationCard
        irr_title: "நீர்பாசன அட்டவணை",
        irr_frequency: "அதிர்வெண்",
        irr_per_hectare: "ஹெக்டேருக்கு",
        irr_next: "அடுத்த நீர்பாசனம்",
        irr_calendar_title: "14-நாள் நீர்பாசன அட்டவணை",
        irr_today: "இன்று",
        irr_label_irrigate: "நீர் பாய்ச்சு",
        irr_label_skip_rain: "தவிர் – மழை",
        irr_label_done: "முடிந்தது",
        irr_tips: "குறிப்புகள்",
        irr_sending: "அனுப்புகிறது…",
        irr_sent: "அனுப்பியது!",
        irr_remind_me: "நினைவூட்டு",

        // FertilizerCard
        fert_title: "உர திட்டம்",
        fert_quantity: "அளவு",
        fert_timing: "நேரம்",
        fert_method: "முறை",
        fert_how_to_apply: "எவ்வாறு இடுவது",
        fert_precautions: "முன்னெச்சரிக்கைகள்",
        fert_schedule: "உர அட்டவணை:",

        // WeatherAlertCard
        weather_alerts_title: "வானிலை எச்சரிக்கைகள்",
        weather_status_title: "வானிலை நிலை",
        weather_all_clear: "அனைத்தும் சரி",
        weather_all_clear_desc: "இப்போது உங்கள் பகுதியில் வானிலை அபாயங்கள் இல்லை.",
        weather_all_clear_desc_no_current: "உங்கள் பகுதியில் வானிலை அபாயங்கள் இல்லை",
        weather_humidity: "ஈரப்பதம்",
        weather_wind: "காற்று",
        weather_preventive: "தடுப்பு நடவடிக்கைகள்:",

        // YieldEstimateCard
        yield_title: "எதிர்பார்க்கப்படும் மகசூல்",
        yield_per_unit: "ஒவ்வொரு",
        yield_farm_size: "பண்ணை பரப்பளவு",
        yield_total_label: "க்கான மொத்தம்",

        // GrowthStageCard
        growth_planted: "நடவு:",
        growth_days_until_next: "நாட்கள் அடுத்த கட்டம் வரை",
        growth_stage_progress: "கட்ட முன்னேற்றம்",
        growth_stage_germination: "முளைத்தல்",
        growth_stage_seedling: "நாற்று",
        growth_stage_vegetative: "வளர்ச்சி நிலை",
        growth_stage_flowering: "பூக்கும் நிலை",
        growth_stage_fruiting: "காய் நிலை",
        growth_stage_maturity: "முதிர்ச்சி",
        growth_stage_harvest: "அறுவடைக்கு தயார்",

        // Dashboard farm header
        dash_crops_label: "பயிர்",
    },

    // ─── Punjabi ──────────────────────────────────────────────────────────────
    pa: {
        nav_home: "ਹੋਮ",
        nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
        nav_addFarm: "ਖੇਤ ਜੋੜੋ",
        nav_signIn: "ਸਾਈਨ ਇਨ",
        nav_getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
        nav_signOut: "ਸਾਈਨ ਆਊਟ",

        hero_badge: "AI-ਚਾਲਿਤ ਸਮਾਰਟ ਖੇਤੀ",
        hero_heading1: "ਸਮਾਰਟ ਉਗਾਓ,",
        hero_heading2: "ਬਿਹਤਰ ਵਾਢੀ ਕਰੋ",
        hero_subheading:
            "ਤੁਹਾਡਾ ਬੁੱਧੀਮਾਨ ਖੇਤੀ ਸਾਥੀ ਜੋ ਤੁਹਾਡੀ ਮਿੱਟੀ, ਮੌਸਮ ਅਤੇ ਫ਼ਸਲਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਨਿੱਜੀ ਫ਼ਸਲ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾਵਾਂ, ਸਿੰਚਾਈ ਸਮਾਂ-ਸਾਰਣੀਆਂ ਅਤੇ ਅਸਲ-ਸਮੇਂ ਦੀਆਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
        hero_cta_primary: "ਆਪਣੇ ਖੇਤ ਦੀ ਯੋਜਨਾ ਸ਼ੁਰੂ ਕਰੋ",
        hero_cta_secondary: "ਡੈਮੋ ਡੈਸ਼ਬੋਰਡ ਵੇਖੋ",
        hero_pill_growth: "ਵਿਕਾਸ ਟਰੈਕਿੰਗ",
        hero_pill_irrigation: "ਸਮਾਰਟ ਸਿੰਚਾਈ",
        hero_pill_fertilizer: "ਖਾਦ ਯੋਜਨਾਵਾਂ",
        hero_pill_weather: "ਮੌਸਮ ਅਲਰਟ",

        features_heading: "ਸਮਾਰਟ ਖੇਤੀ ਲਈ ਸਭ ਕੁਝ",
        features_subheading:
            "ਸਾਡੀ AI ਤੁਹਾਡੇ ਖੇਤ ਦੇ ਡੇਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦੀ ਹੈ ਅਤੇ ਫ਼ਸਲ ਵਿਕਾਸ ਦੇ ਹਰ ਪੜਾਅ 'ਤੇ ਕਾਰਵਾਈ ਕਰਨ ਯੋਗ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
        feat1_title: "ਵਿਕਾਸ ਪੜਾਅ ਖੋਜ",
        feat1_desc:
            "ਬਿਜਾਈ ਦੀ ਤਾਰੀਖ਼ ਦੇ ਆਧਾਰ 'ਤੇ ਫ਼ਸਲ ਦੇ ਮੌਜੂਦਾ ਪੜਾਅ ਦੀ ਆਪਣੇ ਆਪ ਗਣਨਾ ਅਤੇ ਸਮੇਂ ਸਿਰ ਸਿਫ਼ਾਰਸ਼ਾਂ।",
        feat2_title: "ਸਮਾਰਟ ਸਿੰਚਾਈ ਯੋਜਨਾਬੰਦੀ",
        feat2_desc:
            "ਮਿੱਟੀ ਦੀ ਕਿਸਮ, ਫ਼ਸਲ ਦੀਆਂ ਲੋੜਾਂ ਅਤੇ ਖੇਤਰੀ ਮੌਸਮੀ ਪੈਟਰਨਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਕਸਟਮਾਈਜ਼ਡ ਪਾਣੀ ਦੇਣ ਦੀ ਸਮਾਂ-ਸਾਰਣੀ।",
        feat3_title: "ਖੇਤਰ-ਵਿਸ਼ੇਸ਼ ਖਾਦ",
        feat3_desc:
            "ਮਿੱਟੀ ਦੇ ਪੌਸ਼ਟਿਕ ਤੱਤਾਂ, ਫ਼ਸਲ ਦੀ ਕਿਸਮ ਅਤੇ ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਅਭਿਆਸਾਂ ਦੇ ਅਨੁਸਾਰ ਖਾਦ ਸਿਫ਼ਾਰਸ਼ਾਂ।",
        feat4_title: "ਮੌਸਮ ਜੋਖ਼ਮ ਅਲਰਟ",
        feat4_desc: "ਸੋਕੇ, ਠੰਡ, ਵਧੇਰੇ ਬਾਰਸ਼ ਅਤੇ ਗਰਮੀ ਦੇ ਤਣਾਅ ਲਈ ਸ਼ੁਰੂਆਤੀ ਚੇਤਾਵਨੀਆਂ।",
        feat5_title: "ਝਾੜ ਅਨੁਮਾਨ",
        feat5_desc:
            "ਆਪਣੀ ਆਮਦਨੀ, ਸਟੋਰੇਜ ਅਤੇ ਮਾਰਕੀਟ ਸਮੇਂ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਲਈ ਅਨੁਮਾਨਿਤ ਵਾਢੀ ਸੀਮਾਵਾਂ ਜਾਣੋ।",
        feat6_title: "ਬਹੁ-ਫ਼ਸਲ ਪ੍ਰਬੰਧਨ",
        feat6_desc:
            "ਹਰ ਕਾਸ਼ਤ ਲਈ ਵੱਖਰੀਆਂ, ਅਟਕਲਾਂ-ਰਹਿਤ ਯੋਜਨਾਵਾਂ ਨਾਲ ਕਈ ਫ਼ਸਲਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।",

        how_heading: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
        how_subheading: "ਕੁਝ ਸਧਾਰਨ ਕਦਮਾਂ ਵਿੱਚ ਨਿੱਜੀ ਖੇਤੀ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ।",
        step1_title: "ਆਪਣਾ ਖੇਤ ਜੋੜੋ",
        step1_desc: "ਸਥਾਨ, ਆਕਾਰ ਅਤੇ ਸਿੰਚਾਈ ਵਿਧੀ ਸਮੇਤ ਆਪਣੇ ਖੇਤ ਦੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।",
        step2_title: "ਆਪਣੀਆਂ ਫ਼ਸਲਾਂ ਜੋੜੋ",
        step2_desc: "ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕੀ ਉਗਾ ਰਹੇ ਹੋ ਅਤੇ ਹਰ ਫ਼ਸਲ ਲਈ ਮਿੱਟੀ ਦੀਆਂ ਸਥਿਤੀਆਂ ਕੀ ਹਨ।",
        step3_title: "AI ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ",
        step3_desc: "ਸਾਡੀ AI ਤੁਹਾਡੀਆਂ ਸਥਿਤੀਆਂ ਦੇ ਅਨੁਸਾਰ ਇੱਕ ਸੰਪੂਰਨ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ ਤਿਆਰ ਕਰਦੀ ਹੈ।",
        step4_title: "ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ",
        step4_desc: "ਉੱਗਣ ਦੇ ਮੌਸਮ ਵਿੱਚ ਸਮੇਂ ਸਿਰ ਅਲਰਟ ਅਤੇ ਕਦਮ-ਦਰ-ਕਦਮ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ।",

        cta_heading: "ਆਪਣੀ ਖੇਤੀ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?",
        cta_subheading:
            "ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ ਜੋ ਬਿਹਤਰ ਫ਼ਸਲਾਂ ਉਗਾਉਣ ਅਤੇ ਝਾੜ ਵਧਾਉਣ ਲਈ AI-ਚਾਲਿਤ ਸੂਝ ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਨ।",
        cta_button: "ਆਪਣੀ ਮੁਫ਼ਤ ਯੋਜਨਾ ਸ਼ੁਰੂ ਕਰੋ",

        footer_tagline: "© 2025 AgriWise. ਟਿਕਾਊ ਭਵਿੱਖ ਲਈ ਸਮਾਰਟ ਖੇਤੀ।",

        login_welcome: "ਵਾਪਸ ਜੀ ਆਇਆਂ",
        login_subtitle: "ਆਪਣੇ ਖੇਤੀ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
        login_google: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
        login_signing_in: "ਸਾਈਨ ਇਨ ਹੋ ਰਿਹਾ ਹੈ...",
        login_or_email: "ਜਾਂ ਈਮੇਲ ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
        login_email: "ਈਮੇਲ",
        login_password: "ਪਾਸਵਰਡ",
        login_email_placeholder: "you@example.com",
        login_submit: "ਸਾਈਨ ਇਨ ਕਰੋ",
        login_submitting: "ਸਾਈਨ ਇਨ ਹੋ ਰਿਹਾ ਹੈ...",
        login_no_account: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
        login_signup_link: "ਮੁਫ਼ਤ ਸਾਈਨ ਅਪ ਕਰੋ",
        login_err_invalid: "ਗਲਤ ਈਮੇਲ ਜਾਂ ਪਾਸਵਰਡ।",
        login_err_too_many: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਕੋਸ਼ਿਸ਼ਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        login_err_cancelled: "Google ਸਾਈਨ-ਇਨ ਰੱਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।",
        login_err_default: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

        signup_title: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ",
        signup_subtitle: "ਅੱਜ ਤੋਂ ਹੀ ਸਮਾਰਟ ਖੇਤੀ ਸ਼ੁਰੂ ਕਰੋ — ਮੁਫ਼ਤ ਹੈ",
        signup_google: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
        signup_signing_up: "ਸਾਈਨ ਅਪ ਹੋ ਰਿਹਾ ਹੈ...",
        signup_or_email: "ਜਾਂ ਈਮੇਲ ਨਾਲ ਸਾਈਨ ਅਪ ਕਰੋ",
        signup_email: "ਈਮੇਲ",
        signup_password: "ਪਾਸਵਰਡ",
        signup_password_placeholder: "ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰ",
        signup_confirm_password: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        signup_submit: "ਖਾਤਾ ਬਣਾਓ",
        signup_submitting: "ਖਾਤਾ ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...",
        signup_has_account: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?",
        signup_signin_link: "ਸਾਈਨ ਇਨ ਕਰੋ",
        signup_err_exists: "ਇਹ ਈਮੇਲ ਪਹਿਲਾਂ ਤੋਂ ਰਜਿਸਟਰਡ ਹੈ।",
        signup_err_weak: "ਪਾਸਵਰਡ ਬਹੁਤ ਕਮਜ਼ੋਰ ਹੈ। ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
        signup_err_cancelled: "Google ਸਾਈਨ-ਅਪ ਰੱਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।",
        signup_err_default: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

        dash_welcome: "ਤੁਹਾਡੇ ਖੇਤੀ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਜੀ ਆਇਆਂ",
        dash_no_farms_desc: "ਤੁਸੀਂ ਅਜੇ ਕੋਈ ਖੇਤ ਨਹੀਂ ਜੋੜਿਆ। ਵਿਅਕਤੀਗਤ AI ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣਾ ਪਹਿਲਾ ਖੇਤ ਜੋੜੋ।",
        dash_add_first_farm: "ਆਪਣਾ ਪਹਿਲਾ ਖੇਤ ਜੋੜੋ",
        dash_add_crop: "ਫ਼ਸਲ ਜੋੜੋ",
        dash_no_crops: "ਅਜੇ ਕੋਈ ਫ਼ਸਲ ਨਹੀਂ ਜੋੜੀ ਗਈ",
        dash_no_crops_desc: "ਪ੍ਰਬੰਧਨ ਯੋਜਨਾਵਾਂ ਦੇਖਣ ਲਈ ਆਪਣੀ ਪਹਿਲੀ ਫ਼ਸਲ ਜੋੜੋ।",
        dash_add_a_crop: "ਇੱਕ ਫ਼ਸਲ ਜੋੜੋ",
        dash_generating: "ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ…",
        dash_general_rec: "ਆਮ ਸਿਫ਼ਾਰਸ਼ਾਂ",

        addfarm_step1: "ਖੇਤ ਸੈੱਟਅਪ",
        addfarm_step2: "ਫ਼ਸਲ ਜੋੜੋ",
        addfarm_step3: "ਯੋਜਨਾ ਪ੍ਰਾਪਤ ਕਰੋ",
        addfarm_back: "ਖੇਤ ਵੇਰਵਿਆਂ 'ਤੇ ਵਾਪਸ ਜਾਓ",
        addfarm_generating_title: "ਤੁਹਾਡੀ ਯੋਜਨਾ ਤਿਆਰ ਹੋ ਰਹੀ ਹੈ",
        addfarm_generating_desc: "AI ਤੁਹਾਡੀਆਂ ਵਿਅਕਤੀਗਤ ਖੇਤੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰ ਰਿਹਾ ਹੈ…",
        addfarm_done_title: "ਸਭ ਕੁਝ ਤਿਆਰ!",
        addfarm_done_desc: "ਤੁਹਾਡੀ ਵਿਅਕਤੀਗਤ ਖੇਤੀ ਯੋਜਨਾ ਤਿਆਰ ਹੈ। ਡੈਸ਼ਬੋਰਡ ਵੱਲ ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ…",

        farm_form_title: "ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ",
        farm_form_desc: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣੇ ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ ਭਰੋ",
        farm_name_label: "ਖੇਤ ਦਾ ਨਾਂ",
        farm_name_placeholder: "ਮੇਰਾ ਖੇਤ",
        farm_location_label: "ਸ਼ਾਨ",
        farm_location_placeholder: "ਖੇਤ ਦਾ ਸ਼ਾਨ ਜਾਂ ਪਤਾ ਦਰਜ ਕਰੋ",
        farm_size_label: "ਖੇਤ ਦਾ ਆਕਾਰ",
        farm_unit_label: "ਇਕਾਈ",
        farm_unit_hectares: "ਹੈਕਟੇਅਰ",
        farm_unit_acres: "ਏਕੜ",
        farm_irrigation_label: "ਸਿੰਚਾਈ ਤਰੀਕਾ",
        farm_irr_drip: "ਡ੍ਰਿੰਪ ਸਿੰਚਾਈ",
        farm_irr_sprinkler: "ਸ਼ਪ੍ਰਿੰਕਲਰ ਪ੍ਰਣਾਲੀ",
        farm_irr_flood: "ਹੜ੍ਹ ਸਿੰਚਾਈ",
        farm_irr_furrow: "ਨਾਲੀ ਸਿੰਚਾਈ",
        farm_irr_rainfed: "ਬਰਸਾਤ ਆਧਾਰਿਤ",
        farm_submit: "ਫ਼ਸਲ ਜੋੜਨ ਲਈ ਅੱਗੇ ਜਾਓ",

        crop_form_title: "ਫ਼ਸਲ ਜੋੜੋ",
        crop_form_desc: "ਨਿੱਜੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਲਈ ਫ਼ਸਲ ਅਤੇ ਮਿੱਟੀ ਦੀ ਜਾਣਕਾਰੀ ਭਰੋ",
        crop_info_section: "ਫ਼ਸਲ ਜਾਣਕਾਰੀ",
        crop_name_label: "ਫ਼ਸਲ ਦਾ ਨਾਂ",
        crop_name_placeholder: "ਉਦਾ. ਕਣਕ, ਚਾਵਲ, ਟਮਾਟਰ",
        crop_date_label: "ਬਿਜਾਈ ਦੀ ਤਾਰੀਖ਼",
        crop_soil_section: "ਮਿੱਟੀ ਦੀ ਜਾਣਕਾਰੀ",
        crop_soil_type_label: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
        crop_soil_clay: "ਚਿਕਨੀ ਮਿੱਟੀ",
        crop_soil_sandy: "ਰੇਤੀਲੀ ਮਿੱਟੀ",
        crop_soil_loamy: "ਦੋਮਟ ਮਿੱਟੀ",
        crop_soil_silt: "ਗਾਦ ਮਿੱਟੀ",
        crop_soil_peat: "ਪੀਟ ਮਿੱਟੀ",
        crop_soil_chalky: "ਚੂਨੇ ਵਾਲੀ ਮਿੱਟੀ",
        crop_whc_label: "ਪਾਣੀ ਧਾਰਨ ਸਮਰੱਥਾ",
        crop_whc_low: "ਘੱਟ",
        crop_whc_medium: "ਮੱਧਮ",
        crop_whc_high: "ਵੱਧ",
        crop_nitrogen: "ਨਾਈਟ੍ਰੋਜਨ (N)",
        crop_phosphorus: "ਫ਼ਾਸਫ਼ੋਰਸ (P)",
        crop_potassium: "ਪੋਟੈਸ਼ੀਅਮ (K)",
        crop_ph: "ਮਿੱਟੀ pH",
        crop_ph_desc: "ਤੇਜ਼ਾਬੀ (0-6) • ਨਿਰਪੱਖ (6-7) • ਜ਼ਾਰੀ (7-14)",
        crop_cancel: "ਰੱਦ ਕਰੋ",
        crop_submit: "ਫ਼ਸਲ ਜੋੜੋ ਅਤੇ ਯੋਜਨਾ ਤਿਆਰ ਕਰੋ",

        // IrrigationCard
        irr_title: "ਸਿੰਚਾਈ ਸਮਾਂ-ਸਾਰਣੀ",
        irr_frequency: "ਆਵਿਰਤੀ",
        irr_per_hectare: "ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ",
        irr_next: "ਅਗਲੀ ਸਿੰਚਾਈ",
        irr_calendar_title: "14-ਦਿਨ ਸਿੰਚਾਈ ਕੈਲੰਡਰ",
        irr_today: "ਅੱਜ",
        irr_label_irrigate: "ਸਿੰਚਾਈ ਕਰੋ",
        irr_label_skip_rain: "ਛੱਡੋ – ਮੀਂਹ",
        irr_label_done: "ਹੋ ਗਿਆ",
        irr_tips: "ਸੁਝਾਅ",
        irr_sending: "ਭੇਜਿਆ ਜਾ ਰਿਹਾ ਹੈ…",
        irr_sent: "ਭੇਜਿਆ!",
        irr_remind_me: "ਯਾਦ ਕਰਾਓ",

        // FertilizerCard
        fert_title: "ਖਾਦ ਯੋਜਨਾ",
        fert_quantity: "ਮਾਤਰਾ",
        fert_timing: "ਸਮਾਂ",
        fert_method: "ਤਰੀਕਾ",
        fert_how_to_apply: "ਕਿਵੇਂ ਲਾਉਣਾ ਹੈ",
        fert_precautions: "ਸਾਵਧਾਨੀਆਂ",
        fert_schedule: "ਖਾਦ ਸਮਾਂ-ਸਾਰਣੀ:",

        // WeatherAlertCard
        weather_alerts_title: "ਮੌਸਮ ਅਲਰਟ",
        weather_status_title: "ਮੌਸਮ ਸਥਿਤੀ",
        weather_all_clear: "ਸਭ ਠੀਕ ਹੈ",
        weather_all_clear_desc: "ਹੁਣ ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਕੋਈ ਮੌਸਮ ਜੋਖ਼ਮ ਨਹੀਂ।",
        weather_all_clear_desc_no_current: "ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਕੋਈ ਮੌਸਮ ਜੋਖ਼ਮ ਨਹੀਂ",
        weather_humidity: "ਨਮੀ",
        weather_wind: "ਹਵਾ",
        weather_preventive: "ਬਚਾਅ ਉਪਾਅ:",

        // YieldEstimateCard
        yield_title: "ਅਨੁਮਾਨਿਤ ਝਾੜ",
        yield_per_unit: "ਪ੍ਰਤੀ",
        yield_farm_size: "ਖੇਤ ਦਾ ਆਕਾਰ",
        yield_total_label: "ਲਈ ਕੁੱਲ",

        // GrowthStageCard
        growth_planted: "ਬੀਜਿਆ:",
        growth_days_until_next: "ਦਿਨ ਅਗਲੇ ਪੜਾਅ ਤੱਕ",
        growth_stage_progress: "ਪੜਾਅ ਪ੍ਰਗਤੀ",
        growth_stage_germination: "ਉਗਣਾ",
        growth_stage_seedling: "ਪਨੀਰੀ",
        growth_stage_vegetative: "ਵਧਣ ਦਾ ਪੜਾਅ",
        growth_stage_flowering: "ਫੁੱਲਣ ਦਾ ਪੜਾਅ",
        growth_stage_fruiting: "ਫਲਣ ਦਾ ਪੜਾਅ",
        growth_stage_maturity: "ਪਰਿਪੱਕਤਾ",
        growth_stage_harvest: "ਕਟਾਈ ਲਈ ਤਿਆਰ",

        // Dashboard farm header
        dash_crops_label: "ਫ਼ਸਲ",
    },
};

export default translations;
