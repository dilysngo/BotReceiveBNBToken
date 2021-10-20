import { MenuEntry } from 'claim-libs-uikit'

/**
 * label: string
 * icon: svg
 * href: https || /path
 * calloutClass: 'rainbow' || className => background rainbow and custom css
 * initialOpenState: true || false
 * items: array sample parent
 * att: attach => text || icon.png
 */

const config: MenuEntry[] = [
  {
    label: "HOME",
    icon: "HomeIcon",
    href: "https://jlaunchpad.com/",
    calloutClass: 'rainbow',
    target: '_blank'
  },
  {
    label: "DOCS",
    icon: "GroupsIcon",
    href: "https://docs.jlaunchpad.com/",
    target: '_blank'
  },
  {
    label: "CLAIM",
    icon: "SunIcon",
    href: "/claim",
  }
]

export default config
