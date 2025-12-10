// types.ts

export type MenuLink = {
  id: string;
  name: string;
  href: string;
  type: "link";
};

export type MenuDropdownChild = {
  name: string;
  href: string;
  desc?: string;
};

export type MenuDropdown = {
  id: string;
  name: string;
  type: "dropdown";
  children: MenuDropdownChild[];
};

// Union Type for Both Link & Dropdown
export type MenuItem = MenuLink | MenuDropdown;

// ---------------- MENUS ------------------

export const companyMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "company",
    href: "/company",
    type: "link",
  },
  {
    id: "2",
    name: "customer",
    href: "/company/customer",
    type: "link",
  },
  {
    id: "3",
    name: "media",
    href: "/company/media",
    type: "link",
  },
  {
    id: "4",
    name: "templates",
    type: "dropdown",
    children: [
      {
        name: "Video Templates",
        href: "/company/templates/video",
        desc: "Browse & customize video templates.",
      },
      {
        name: "Image Templates",
        href: "/company/templates/image",
        desc: "Browse & customize image templates.",
      },
    ],
  },
  {
    id: "5",
    name: "profile",
    href: "/company/profile",
    type: "link",
  },
];

export const orgMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Dashboard",
    href: "/organization",
    type: "link",
  },
  {
    id: "2",
    name: "companies",
    href: "/organization/companies",
    type: "link",
  },
  {
    id: "3",
    name: "profile",
    href: "/organization/profile",
    type: "link",
  },
];
