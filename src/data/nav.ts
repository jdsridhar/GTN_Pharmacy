type NavItem = {
    label: string;
    href: string;
    mega?: { title: string; href: string; desc: string }[];
    children?: { label: string; href: string }[]; // For mobile nav, if needed
};

const nav: NavItem[] = [
  { label: "About", href: "/about", mega: [
    { title: "History", href: "/about/history", desc: "Founding, milestones, heritage" },
    { title: "Leadership", href: "/about/leadership", desc: "Chancellor, provost, deans" },
    { title: "Administration", href: "/about/administration", desc: "Offices, governance, policies" },
  ]},
  { label: "Academics", href: "/academics", mega: [
    { title: "Undergraduate", href: "/academics/undergraduate", desc: "Programs & advisors" },
    { title: "Graduate", href: "/academics/graduate", desc: "Masters & PhD" },
    { title: "Schools & Depts", href: "/academics/schools", desc: "Faculties & departments" },
  ]},
  // { label: "Admission", href: "/admission" },
  // { label: "Research", href: "/research" },
  // { label: "Campus Life", href: "/campus-life" },
  // { label: "Health Care", href: "/health-care" },
  { label: "A–Z", href: "/atoz" },
];

export default nav;