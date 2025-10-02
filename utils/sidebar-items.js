import {
  Squares2X2Icon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  DocumentArrowDownIcon,
  RectangleStackIcon,
  UserIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  HomeIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  PhotoIcon,
  VideoCameraIcon,
  SpeakerWaveIcon
} from '@heroicons/vue/24/outline'

// Function to filter items based on feature toggles
export const filterSidebarItems = (items, featuresStore) => {
  const filteredItems = []
  let currentSection = null
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    if (item.isSection) {
      // Track the current section
      currentSection = item.name
      
      // Filter out sections based on feature toggles
      if (!featuresStore.isWebsiteEnabled && (
          item.name === 'Website Layout' || 
          item.name === 'Website Only Content' || 
          item.name === 'Website Settings')) {
        // Skip website sections when website is disabled
        currentSection = 'SKIP_SECTION'
        continue
      } else if (!featuresStore.isMobileAppEnabled && (
          item.name === 'Mobile App Layout' || 
          item.name === 'Mobile App Settings')) {
        // Skip mobile app sections when mobile app is disabled
        currentSection = 'SKIP_SECTION'
        continue
      } else {
        const isContentSection =
          item.name === 'Web + Mobile Content' || item.name === 'Website Only Content'

        if (!featuresStore.isMobileAppEnabled && isContentSection) {
          // Skip content sections when mobile app is disabled to show a single list
          continue
        }

        // Handle dynamic section naming for "Web + Mobile Content"
        if (item.name === 'Web + Mobile Content') {
          // Change name to "General Content" if either feature is disabled
          if (!featuresStore.isWebsiteEnabled || !featuresStore.isMobileAppEnabled) {
            const modifiedItem = { ...item, name: 'General Content' }
            filteredItems.push(modifiedItem)
          } else {
            filteredItems.push(item)
          }
        } else {
          // Keep this section
          filteredItems.push(item)
        }
      }
    } else {
      // For non-section items, only include if we're not in a skipped section
      if (currentSection !== 'SKIP_SECTION') {
        filteredItems.push(item)
      }
    }
  }
  
  return filteredItems
}

// Define sidebar items for each top nav button

export const sidebarItemsMap = {
  '/': [ // Home page
    {
      name: 'Dashboard',
      icon: HomeIcon,
      route: '/home/dashboard',
      isActive: false,
      isExpanded: false
    },
  ],
  '/home/dashboard': [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      route: '/home/dashboard',
      isActive: true,
      isExpanded: false
    },
  ],
          '/website-layout': [
            {
              name: 'Website Layout',
              isSection: true
            },
            {
              name: 'Navigation',
              icon: RectangleStackIcon,
              route: '/website-layout/navigation',
              isActive: true,
              isExpanded: false
            },
            {
              name: 'Redirects',
              icon: Squares2X2Icon,
              route: '/website-layout/redirects',
              isActive: false,
              isExpanded: false,
              children: [
                { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
              ]
            },
            {
              name: 'Menus',
              icon: DocumentTextIcon,
              route: '/website-layout/menus',
              isActive: false,
              isExpanded: false,
              children: [
                { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
              ]
            },
            {
              name: 'Mobile App Layout',
              isSection: true
            },
            {
              name: 'Screens',
              icon: DevicePhoneMobileIcon,
              route: '/website-layout/screens',
              isActive: false,
              isExpanded: false
            }
          ],
  '/website-layout/navigation': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/redirects': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/redirects/add': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: true }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/menus': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/menus/add': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: true }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/content': [
    {
      name: 'Web + Mobile Content',
      isSection: true
    },
    {
      name: 'TheHub-AI Article Jobs',
      icon: DocumentTextIcon,
      route: '/content/thehub-ai-article-jobs',
      isActive: true,
      isExpanded: false,
      children: [
        { name: 'Add New TheHub-AI Article', route: '/content/thehub-ai-article-jobs/add', isActive: false }
      ]
    },
    {
      name: 'Article Management',
      icon: DocumentTextIcon,
      route: '/content/article-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Article', route: '/content/article-management/add', isActive: false },
        { name: 'Add New TheHub-AI Article', route: '/content/article-management/add-thehub-ai', isActive: false },
        { name: 'Article Ranking', route: '/content/article-management/ranking', isActive: false },
        { name: 'Article Categories', route: '/content/article-management/categories', isActive: false }
      ]
    },
    {
      name: 'Video Management',
      icon: VideoCameraIcon,
      route: '/content/video-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Video', route: '/content/video-management/add', isActive: false },
        { name: 'Video Management AI', route: '/content/video-management/ai', isActive: false }
      ]
    },
    {
      name: 'Audio Management',
      icon: SpeakerWaveIcon,
      route: '/content/audio-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Audio', route: '/content/audio-management/add', isActive: false }
      ]
    },
    {
      name: 'Schedule Management',
      icon: DocumentArrowDownIcon,
      route: '/content/schedule-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Schedule', route: '/content/schedule-management/add', isActive: false }
      ]
    },
    {
      name: 'Schedule Events',
      icon: DocumentArrowDownIcon,
      route: '/content/schedule-events',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Schedule Event', route: '/content/schedule-events/add', isActive: false }
      ]
    },
    {
      name: 'Roster Management',
      icon: UserGroupIcon,
      route: '/content/roster-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Roster', route: '/content/roster-management/add', isActive: false },
        { name: 'Import Roster', route: '/content/roster-management/import', isActive: false },
        { name: 'Add Player', route: '/content/roster-management/add-player', isActive: false }
      ]
    },
    {
      name: 'Player Management',
      icon: UserIcon,
      route: '/content/player-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Players Positions', route: '/content/player-management/positions', isActive: false },
        { name: 'Add Player Position', route: '/content/player-management/add-position', isActive: false }
      ]
    },
    {
      name: 'Staff Management',
      icon: UserGroupIcon,
      route: '/content/staff-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Staff', route: '/content/staff-management/add', isActive: false },
        { name: 'Import Staff', route: '/content/staff-management/import', isActive: false },
        { name: 'Staff Positions', route: '/content/staff-management/positions', isActive: false },
        { name: 'Add Member Position', route: '/content/staff-management/add-position', isActive: false }
      ]
    },
    {
      name: 'Media Management',
      icon: PhotoIcon,
      route: '/content/media-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Images', route: '/content/media-management/images', isActive: false },
        { name: 'Documents', route: '/content/media-management/documents', isActive: false },
        { name: 'WMT Video Platform', route: '/content/media-management/video-platform', isActive: false }
      ]
    },
    {
      name: 'Podcast Management',
      icon: SpeakerWaveIcon,
      route: '/content/podcast-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Podcast', route: '/content/podcast-management/add', isActive: false },
        { name: 'Podcast Categories', route: '/content/podcast-management/categories', isActive: false },
        { name: 'Add Podcast Category', route: '/content/podcast-management/add-category', isActive: false },
        { name: 'Podcast Episodes', route: '/content/podcast-management/episodes', isActive: false },
        { name: 'Add Podcast Episode', route: '/content/podcast-management/add-episode', isActive: false },
        { name: 'Podcast Seasons', route: '/content/podcast-management/seasons', isActive: false },
        { name: 'Add Podcast Season', route: '/content/podcast-management/add-season', isActive: false }
      ]
    },
    {
      name: 'Dictionaries',
      icon: DocumentTextIcon,
      route: '/content/dictionaries',
      isActive: false,
      isExpanded: false,
      children: [
        { 
          name: 'Sports', 
          route: '/content/dictionaries/sports', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Sport', route: '/content/dictionaries/sports/add', isActive: false }
          ]
        },
        { 
          name: 'Seasons', 
          route: '/content/dictionaries/seasons', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Season', route: '/content/dictionaries/seasons/add', isActive: false }
          ]
        },
        { 
          name: 'Class Levels', 
          route: '/content/dictionaries/class-levels', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Class Level', route: '/content/dictionaries/class-levels/add', isActive: false }
          ]
        },
        { 
          name: 'Conferences', 
          route: '/content/dictionaries/conferences', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Conference', route: '/content/dictionaries/conferences/add', isActive: false }
          ]
        },
        { 
          name: 'Tags', 
          route: '/content/dictionaries/tags', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Tag', route: '/content/dictionaries/tags/add', isActive: false }
          ]
        },
        { 
          name: 'Tournaments', 
          route: '/content/dictionaries/tournaments', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Tournament', route: '/content/dictionaries/tournaments/add', isActive: false }
          ]
        },
        { 
          name: 'Opponents', 
          route: '/content/dictionaries/opponents', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Opponent', route: '/content/dictionaries/opponents/add', isActive: false }
          ]
        },
        { 
          name: 'Categories', 
          route: '/content/dictionaries/categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Category', route: '/content/dictionaries/categories/add', isActive: false }
          ]
        },
        { 
          name: 'Departments', 
          route: '/content/dictionaries/departments', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Department', route: '/content/dictionaries/departments/add', isActive: false }
          ]
        },
        { 
          name: 'Media Categories', 
          route: '/content/dictionaries/media-categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Media Category', route: '/content/dictionaries/media-categories/add', isActive: false }
          ]
        },
        { 
          name: 'School Categories', 
          route: '/content/dictionaries/school-categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add School Category', route: '/content/dictionaries/school-categories/add', isActive: false }
          ]
        }
      ]
    },
    {
      name: 'Others',
      icon: Squares2X2Icon,
      route: '/content/others',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Profile Fields', route: '/content/others/profile-fields', isActive: false },
        { name: 'Add Profile Field', route: '/content/others/add-profile-field', isActive: false },
        { name: 'Social Networks', route: '/content/others/social-networks', isActive: false },
        { name: 'Add Social Network', route: '/content/others/add-social-network', isActive: false }
      ]
    },
    {
      name: 'Website Only Content',
      isSection: true
    },
    {
      name: 'Page Management',
      icon: DocumentTextIcon,
      route: '/content/page-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Page', route: '/content/page-management/add', isActive: false },
        { name: 'Static Pages', route: '/content/page-management/static', isActive: false },
        { name: 'Add New Static Page', route: '/content/page-management/add-static', isActive: false }
      ]
    },
    {
      name: 'Contact Forms',
      icon: DocumentTextIcon,
      route: '/content/contact-forms',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Contact Form', route: '/content/contact-forms/add', isActive: false },
        { name: 'Contact Form Entries', route: '/content/contact-forms/entries', isActive: false },
        { name: 'Contact Form Notifications', route: '/content/contact-forms/notifications', isActive: false }
      ]
    },
    {
      name: 'Tables Management',
      icon: RectangleStackIcon,
      route: '/content/tables-management',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Banners',
      icon: PhotoIcon,
      route: '/content/banners',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Banner', route: '/content/banners/add', isActive: false }
      ]
    },
    {
      name: 'Zones',
      icon: GlobeAltIcon,
      route: '/content/zones',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Zone', route: '/content/zones/add', isActive: false }
      ]
    },
    {
      name: 'Sticky Pages',
      icon: DocumentTextIcon,
      route: '/content/sticky-pages',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Sticky Page(s)', route: '/content/sticky-pages/add', isActive: false }
      ]
    }
  ],
  '/content/thehub-ai-article-jobs': [
    {
      name: 'Web + Mobile Content',
      isSection: true
    },
    {
      name: 'TheHub-AI Article Jobs',
      icon: DocumentTextIcon,
      route: '/content/thehub-ai-article-jobs',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add New TheHub-AI Article', route: '/content/thehub-ai-article-jobs/add', isActive: false }
      ]
    },
    {
      name: 'Article Management',
      icon: DocumentTextIcon,
      route: '/content/article-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Article', route: '/content/article-management/add', isActive: false },
        { name: 'Add New TheHub-AI Article', route: '/content/article-management/add-thehub-ai', isActive: false },
        { name: 'Article Ranking', route: '/content/article-management/ranking', isActive: false },
        { name: 'Article Categories', route: '/content/article-management/categories', isActive: false }
      ]
    },
    {
      name: 'Video Management',
      icon: VideoCameraIcon,
      route: '/content/video-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Video', route: '/content/video-management/add', isActive: false },
        { name: 'Video Management AI', route: '/content/video-management/ai', isActive: false }
      ]
    },
    {
      name: 'Audio Management',
      icon: SpeakerWaveIcon,
      route: '/content/audio-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Audio', route: '/content/audio-management/add', isActive: false }
      ]
    },
    {
      name: 'Schedule Management',
      icon: DocumentArrowDownIcon,
      route: '/content/schedule-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Schedule', route: '/content/schedule-management/add', isActive: false }
      ]
    },
    {
      name: 'Schedule Events',
      icon: DocumentArrowDownIcon,
      route: '/content/schedule-events',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Schedule Event', route: '/content/schedule-events/add', isActive: false }
      ]
    },
    {
      name: 'Roster Management',
      icon: UserGroupIcon,
      route: '/content/roster-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Roster', route: '/content/roster-management/add', isActive: false },
        { name: 'Import Roster', route: '/content/roster-management/import', isActive: false },
        { name: 'Add Player', route: '/content/roster-management/add-player', isActive: false }
      ]
    },
    {
      name: 'Player Management',
      icon: UserIcon,
      route: '/content/player-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Players Positions', route: '/content/player-management/positions', isActive: false },
        { name: 'Add Player Position', route: '/content/player-management/add-position', isActive: false }
      ]
    },
    {
      name: 'Staff Management',
      icon: UserGroupIcon,
      route: '/content/staff-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Staff', route: '/content/staff-management/add', isActive: false },
        { name: 'Import Staff', route: '/content/staff-management/import', isActive: false },
        { name: 'Staff Positions', route: '/content/staff-management/positions', isActive: false },
        { name: 'Add Member Position', route: '/content/staff-management/add-position', isActive: false }
      ]
    },
    {
      name: 'Media Management',
      icon: PhotoIcon,
      route: '/content/media-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Images', route: '/content/media-management/images', isActive: false },
        { name: 'Documents', route: '/content/media-management/documents', isActive: false },
        { name: 'WMT Video Platform', route: '/content/media-management/video-platform', isActive: false }
      ]
    },
    {
      name: 'Podcast Management',
      icon: SpeakerWaveIcon,
      route: '/content/podcast-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Podcast', route: '/content/podcast-management/add', isActive: false },
        { name: 'Podcast Categories', route: '/content/podcast-management/categories', isActive: false },
        { name: 'Add Podcast Category', route: '/content/podcast-management/add-category', isActive: false },
        { name: 'Podcast Episodes', route: '/content/podcast-management/episodes', isActive: false },
        { name: 'Add Podcast Episode', route: '/content/podcast-management/add-episode', isActive: false },
        { name: 'Podcast Seasons', route: '/content/podcast-management/seasons', isActive: false },
        { name: 'Add Podcast Season', route: '/content/podcast-management/add-season', isActive: false }
      ]
    },
    {
      name: 'Dictionaries',
      icon: DocumentTextIcon,
      route: '/content/dictionaries',
      isActive: false,
      isExpanded: false,
      children: [
        { 
          name: 'Sports', 
          route: '/content/dictionaries/sports', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Sport', route: '/content/dictionaries/sports/add', isActive: false }
          ]
        },
        { 
          name: 'Seasons', 
          route: '/content/dictionaries/seasons', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Season', route: '/content/dictionaries/seasons/add', isActive: false }
          ]
        },
        { 
          name: 'Class Levels', 
          route: '/content/dictionaries/class-levels', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Class Level', route: '/content/dictionaries/class-levels/add', isActive: false }
          ]
        },
        { 
          name: 'Conferences', 
          route: '/content/dictionaries/conferences', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Conference', route: '/content/dictionaries/conferences/add', isActive: false }
          ]
        },
        { 
          name: 'Tags', 
          route: '/content/dictionaries/tags', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Tag', route: '/content/dictionaries/tags/add', isActive: false }
          ]
        },
        { 
          name: 'Tournaments', 
          route: '/content/dictionaries/tournaments', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Tournament', route: '/content/dictionaries/tournaments/add', isActive: false }
          ]
        },
        { 
          name: 'Opponents', 
          route: '/content/dictionaries/opponents', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Opponent', route: '/content/dictionaries/opponents/add', isActive: false }
          ]
        },
        { 
          name: 'Categories', 
          route: '/content/dictionaries/categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Category', route: '/content/dictionaries/categories/add', isActive: false }
          ]
        },
        { 
          name: 'Departments', 
          route: '/content/dictionaries/departments', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Department', route: '/content/dictionaries/departments/add', isActive: false }
          ]
        },
        { 
          name: 'Media Categories', 
          route: '/content/dictionaries/media-categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add Media Category', route: '/content/dictionaries/media-categories/add', isActive: false }
          ]
        },
        { 
          name: 'School Categories', 
          route: '/content/dictionaries/school-categories', 
          isActive: false,
          isExpanded: false,
          children: [
            { name: 'Add School Category', route: '/content/dictionaries/school-categories/add', isActive: false }
          ]
        }
      ]
    },
    {
      name: 'Others',
      icon: Squares2X2Icon,
      route: '/content/others',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Profile Fields', route: '/content/others/profile-fields', isActive: false },
        { name: 'Add Profile Field', route: '/content/others/add-profile-field', isActive: false },
        { name: 'Social Networks', route: '/content/others/social-networks', isActive: false },
        { name: 'Add Social Network', route: '/content/others/add-social-network', isActive: false }
      ]
    },
    {
      name: 'Website Only Content',
      isSection: true
    },
    {
      name: 'Page Management',
      icon: DocumentTextIcon,
      route: '/content/page-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add New Page', route: '/content/page-management/add', isActive: false },
        { name: 'Static Pages', route: '/content/page-management/static', isActive: false },
        { name: 'Add New Static Page', route: '/content/page-management/add-static', isActive: false }
      ]
    },
    {
      name: 'Contact Forms',
      icon: DocumentTextIcon,
      route: '/content/contact-forms',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Contact Form', route: '/content/contact-forms/add', isActive: false },
        { name: 'Contact Form Entries', route: '/content/contact-forms/entries', isActive: false },
        { name: 'Contact Form Notifications', route: '/content/contact-forms/notifications', isActive: false }
      ]
    },
    {
      name: 'Tables Management',
      icon: RectangleStackIcon,
      route: '/content/tables-management',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Banners',
      icon: PhotoIcon,
      route: '/content/banners',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Banner', route: '/content/banners/add', isActive: false }
      ]
    },
    {
      name: 'Zones',
      icon: GlobeAltIcon,
      route: '/content/zones',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Zone', route: '/content/zones/add', isActive: false }
      ]
    },
    {
      name: 'Sticky Pages',
      icon: DocumentTextIcon,
      route: '/content/sticky-pages',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Sticky Page(s)', route: '/content/sticky-pages/add', isActive: false }
      ]
    }
  ],
  '/messaging': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/push-notifications': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/manual-topics': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/manual-topics/add': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: true }
      ]
    }
  ],
  '/messaging/locations': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/locations/add': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: true }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/location-topics': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: false }
      ]
    }
  ],
  '/messaging/location-topics/add': [
    {
      name: 'Push Notifications',
      icon: SpeakerWaveIcon,
      route: '/messaging/push-notifications',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Manual Topics',
      icon: DocumentTextIcon,
      route: '/messaging/manual-topics',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Manual Topic', route: '/messaging/manual-topics/add', isActive: false }
      ]
    },
    {
      name: 'Locations',
      icon: GlobeAltIcon,
      route: '/messaging/locations',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Location', route: '/messaging/locations/add', isActive: false }
      ]
    },
    {
      name: 'Location Topics',
      icon: BuildingOfficeIcon,
      route: '/messaging/location-topics',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Location Topic', route: '/messaging/location-topics/add', isActive: true }
      ]
    }
  ],
  '/settings': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: true,
      isExpanded: false,
      children: [
        { name: 'Add User', route: '/settings/user-management/add-user', isActive: false }
      ]
    },
    {
      name: 'Features',
      icon: Squares2X2Icon,
      route: '/settings/features',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'General CMS Settings',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/settings/user-management': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add User', route: '/settings/user-management/add-user', isActive: false }
      ]
    },
    {
      name: 'Features',
      icon: Squares2X2Icon,
      route: '/settings/features',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'General CMS Settings',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/settings/user-management/add-user': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add User', route: '/settings/user-management/add-user', isActive: true }
      ]
    },
    {
      name: 'Features',
      icon: Squares2X2Icon,
      route: '/settings/features',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'General CMS Settings',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/settings/features': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add User', route: '/settings/user-management/add-user', isActive: false }
      ]
    },
    {
      name: 'Features',
      icon: Squares2X2Icon,
      route: '/settings/features',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'General CMS Settings',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/settings/general': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add User', route: '/settings/user-management/add-user', isActive: false }
      ]
    },
    {
      name: 'Features',
      icon: Squares2X2Icon,
      route: '/settings/features',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'General CMS Settings',
      icon: CogIcon,
      route: '/settings/general',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/settings/sports-settings': [
    {
      name: 'CMS Settings',
      isSection: true
    },
    {
      name: 'User Management',
      icon: UserGroupIcon,
      route: '/settings/user-management',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add User Features', route: '/settings/user-management/add-user-features', isActive: false }
      ]
    },
    {
      name: 'Website Settings',
      isSection: true
    },
    {
      name: 'General',
      icon: CogIcon,
      route: '/settings/general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Header',
      icon: RectangleStackIcon,
      route: '/settings/header',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule Ticket',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule-ticket',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Writing',
      icon: DocumentTextIcon,
      route: '/settings/writing',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Advertising',
      icon: SpeakerWaveIcon,
      route: '/settings/advertising',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Roster',
      icon: UserIcon,
      route: '/settings/roster',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Schedule',
      icon: DocumentArrowDownIcon,
      route: '/settings/schedule',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'SEO',
      icon: GlobeAltIcon,
      route: '/settings/seo',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Fonts',
      icon: PaintBrushIcon,
      route: '/settings/fonts',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Mobile App Settings',
      isSection: true
    },
    {
      name: 'General Settings',
      icon: CogIcon,
      route: '/settings/mobile-general',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Sports Settings',
      icon: BuildingOfficeIcon,
      route: '/settings/sports-settings',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Devices',
      icon: ComputerDesktopIcon,
      route: '/settings/devices',
      isActive: false,
      isExpanded: false
    }
  ],
  '/home/hsnb3-sub1': [
    {
      name: 'HSNB1',
      icon: HomeIcon,
      route: '/home/hsnb1',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB2',
      icon: ChartBarIcon,
      route: '/home/hsnb2',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB3',
      icon: RectangleStackIcon,
      route: '/home/hsnb3',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'HSNB3 - Sub1', route: '/home/hsnb3-sub1', isActive: true },
        { name: 'HSNB3 - Sub2', route: '/home/hsnb3-sub2', isActive: false },
        { name: 'HSNB3 - Sub3', route: '/home/hsnb3-sub3', isActive: false }
      ]
    },
    {
      name: 'HSNB4',
      icon: Squares2X2Icon,
      route: '/home/hsnb4',
      isActive: false,
      isExpanded: false
    }
  ],
  '/home/hsnb3-sub2': [
    {
      name: 'HSNB1',
      icon: HomeIcon,
      route: '/home/hsnb1',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB2',
      icon: ChartBarIcon,
      route: '/home/hsnb2',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB3',
      icon: RectangleStackIcon,
      route: '/home/hsnb3',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'HSNB3 - Sub1', route: '/home/hsnb3-sub1', isActive: false },
        { name: 'HSNB3 - Sub2', route: '/home/hsnb3-sub2', isActive: true },
        { name: 'HSNB3 - Sub3', route: '/home/hsnb3-sub3', isActive: false }
      ]
    },
    {
      name: 'HSNB4',
      icon: Squares2X2Icon,
      route: '/home/hsnb4',
      isActive: false,
      isExpanded: false
    }
  ],
  '/home/hsnb3-sub3': [
    {
      name: 'HSNB1',
      icon: HomeIcon,
      route: '/home/hsnb1',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB2',
      icon: ChartBarIcon,
      route: '/home/hsnb2',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'HSNB3',
      icon: RectangleStackIcon,
      route: '/home/hsnb3',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'HSNB3 - Sub1', route: '/home/hsnb3-sub1', isActive: false },
        { name: 'HSNB3 - Sub2', route: '/home/hsnb3-sub2', isActive: false },
        { name: 'HSNB3 - Sub3', route: '/home/hsnb3-sub3', isActive: true }
      ]
    },
    {
      name: 'HSNB4',
      icon: Squares2X2Icon,
      route: '/home/hsnb4',
      isActive: false,
      isExpanded: false
    }
  ],
  '/website-layout/screens': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    }
  ],
  '/website-layout/screens/add': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: true }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/page-slots': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: true,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/mobile-navigation': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: true,
      isExpanded: true,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: false }
      ]
    }
  ],
  '/website-layout/mobile-navigation/add': [
    {
      name: 'Website Layout',
      isSection: true
    },
    {
      name: 'Navigation',
      icon: RectangleStackIcon,
      route: '/website-layout/navigation',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Redirects',
      icon: Squares2X2Icon,
      route: '/website-layout/redirects',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Redirects', route: '/website-layout/redirects/add', isActive: false }
      ]
    },
    {
      name: 'Menus',
      icon: DocumentTextIcon,
      route: '/website-layout/menus',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Menu', route: '/website-layout/menus/add', isActive: false }
      ]
    },
    {
      name: 'Mobile App Layout',
      isSection: true
    },
    {
      name: 'Screens',
      icon: DevicePhoneMobileIcon,
      route: '/website-layout/screens',
      isActive: false,
      isExpanded: false,
      children: [
        { name: 'Add Mobile Screen', route: '/website-layout/screens/add', isActive: false }
      ]
    },
    {
      name: 'Page Slots',
      icon: RectangleStackIcon,
      route: '/website-layout/page-slots',
      isActive: false,
      isExpanded: false
    },
    {
      name: 'Navigation',
      icon: ComputerDesktopIcon,
      route: '/website-layout/mobile-navigation',
      isActive: false,
      isExpanded: true,
      children: [
        { name: 'Add Menu', route: '/website-layout/mobile-navigation/add', isActive: true }
      ]
    }
  ]
}

const flattenSidebarItems = (items) => {
  const results = []

  for (const item of items) {
    if (item.isSection) {
      continue
    }

    if (item.route) {
      results.push({
        name: item.name,
        route: item.route
      })
    }

    if (item.children) {
      results.push(...flattenSidebarItems(item.children))
    }
  }

  return results
}

export const getAllSidebarLinks = (featuresStore) => {
  const deduped = new Map()

  for (const items of Object.values(sidebarItemsMap)) {
    const cloned = JSON.parse(JSON.stringify(items))
    const filtered = filterSidebarItems(cloned, featuresStore)

    for (const link of flattenSidebarItems(filtered)) {
      if (!link.route || deduped.has(link.route)) {
        continue
      }

      deduped.set(link.route, link)
    }
  }

  return Array.from(deduped.values()).sort((a, b) => a.name.localeCompare(b.name))
}

const cloneSidebarItemsForMobile = (items = []) => {
  return items.map(item => ({
    ...item,
    icon: item.icon,
    children: item.children ? cloneSidebarItemsForMobile(item.children) : undefined
  }))
}

const transformItemForMobileNavigation = (item) => {
  if (item.isSection) {
    return {
      type: 'section',
      name: item.name
    }
  }

  const entry = {
    type: 'link',
    name: item.name,
    route: item.route || null,
    id: item.route || item.name,
    defaultExpanded: !!item.isExpanded
  }

  if (item.children && item.children.length > 0) {
    entry.children = item.children
      .map(transformItemForMobileNavigation)
      .filter(Boolean)
  }

  return entry
}

const mobileNavigationConfig = [
  { name: 'Home', path: '/', keys: ['/home/dashboard', '/'], defaultExpanded: true },
  { name: 'Layout', path: '/website-layout', keys: ['/website-layout'] },
  { name: 'Content', path: '/content', keys: ['/content'] },
  { name: 'Messaging', path: '/messaging', keys: ['/messaging'], requiresMobileApp: true },
  { name: 'Settings', path: '/settings', keys: ['/settings'] }
]

const getSidebarItemsForKeys = (keys = [], featuresStore) => {
  for (const key of keys) {
    if (!sidebarItemsMap[key]) {
      continue
    }

    const cloned = cloneSidebarItemsForMobile(sidebarItemsMap[key])
    const filtered = filterSidebarItems(cloned, featuresStore)
    return filtered.map(transformItemForMobileNavigation)
  }

  return []
}

export const getMobileNavigationSections = (featuresStore) => {
  return mobileNavigationConfig
    .filter(config => !config.requiresMobileApp || featuresStore.isMobileAppEnabled)
    .map(config => ({
      name: config.name,
      route: config.path,
      id: config.path || config.name,
      defaultExpanded: !!config.defaultExpanded,
      items: getSidebarItemsForKeys(config.keys, featuresStore)
    }))
}
