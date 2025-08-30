export const darkClerkTheme = {
  baseTheme: "dark",
  variables: {
    colorPrimary: "#ffffff",
    colorTextOnPrimaryBackground: "#000000",
    colorBackground: "#000000",
    colorInputBackground: "rgba(255, 255, 255, 0.1)",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#a3a3a3",
    colorNeutral: "#262626",
    colorDanger: "#ef4444",
    colorSuccess: "#22c55e",
    colorWarning: "#f59e0b",
    borderRadius: "0.75rem",
  },
  elements: {
    // Main containers
    card: "bg-black/90 backdrop-blur-md border border-white/20",
    headerTitle: "text-white text-2xl font-bold",
    headerSubtitle: "text-gray-300",
    
    // Form elements
    formButtonPrimary: 
      "bg-white text-black hover:bg-gray-200 font-semibold transition-all duration-300 rounded-xl",
    formButtonSecondary: 
      "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent rounded-xl",
    
    // Input fields
    formFieldInput: 
      "bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:bg-white/15 rounded-xl",
    formFieldLabel: "text-gray-300",
    
    // Links and text
    identityPreviewText: "text-white",
    identityPreviewEditButtonIcon: "text-white",
    formFieldErrorText: "text-red-400",
    formFieldSuccessText: "text-green-400",
    
    // Modal and popover
    modalContent: "bg-black/95 backdrop-blur-md border border-white/20",
    modalCloseButton: "text-white hover:text-gray-300",
    
    // Profile dropdown
    userButtonPopoverCard: "bg-black/95 backdrop-blur-md border border-white/20",
    userButtonPopoverText: "text-white",
    userButtonPopoverActionButton: "text-white hover:bg-white/10",
    userButtonPopoverActionButtonIcon: "text-white",
    
    // Avatar
    avatarBox: "ring-2 ring-white/20",
    
    // Footer
    footerActionText: "text-gray-400",
    footerActionLink: "text-white hover:text-gray-300",
    
    // Social buttons
    socialButtonsBlockButton: 
      "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent rounded-xl",
    socialButtonsBlockButtonText: "text-white",
    
    // Divider
    dividerLine: "bg-white/20",
    dividerText: "text-gray-400",
    
    // Alert
    alertText: "text-gray-300",
    
    // OTP/Verification
    formFieldInputShowPasswordButton: "text-white hover:text-gray-300",
    otpCodeFieldInput: "bg-white/10 border-white/20 text-white focus:border-white/40",
  },
};