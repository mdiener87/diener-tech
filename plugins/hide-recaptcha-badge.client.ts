/**
 * Plugin to ensure reCAPTCHA badge is always hidden
 * This runs on the client-side only to handle any potential badge persistence issues
 */

export default defineNuxtPlugin(() => {
  // Only run on client
  if (process.client) {
    // Create and add style immediately
    const addHideBadgeStyle = () => {
      // Check if style already exists
      if (!document.getElementById('global-recaptcha-badge-style')) {
        const style = document.createElement('style')
        style.id = 'global-recaptcha-badge-style'
        style.textContent = `
          .grecaptcha-badge { 
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
        `
        document.head.appendChild(style)
      }
    }

    // Hide badges function
    const hideAllBadges = () => {
      const badges = document.getElementsByClassName('grecaptcha-badge')
      if (badges && badges.length > 0) {
        for (let i = 0; i < badges.length; i++) {
          const badge = badges[i] as HTMLElement
          badge.style.visibility = 'hidden'
          badge.style.opacity = '0'
          badge.style.display = 'none'
        }
      }
    }

    // Add style immediately
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      addHideBadgeStyle()
      hideAllBadges()
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        addHideBadgeStyle()
        hideAllBadges()
      })
    }

    // Set up recurring check to ensure badge stays hidden
    const intervalId = setInterval(() => {
      hideAllBadges()
    }, 1000)

    // Stop checking after 30 seconds to save resources
    setTimeout(() => clearInterval(intervalId), 30000)

    // Also run on page navigation events
    window.addEventListener('popstate', hideAllBadges)
    
    // Run when leaving the page
    window.addEventListener('beforeunload', hideAllBadges)
    
    // If using router, also listen for route changes
    const router = useRouter()
    if (router) {
      router.afterEach(() => {
        // Delay slightly to allow DOM to update
        setTimeout(hideAllBadges, 100)
      })
    }
  }
})
