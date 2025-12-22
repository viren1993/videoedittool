export const routes = {
  accessDenied: "/access-denied",
  notFound: "/not-found",

  // main project routes
  signIn: "/signin",
  home: "/home",
  newsevent: "/news-event",
  organization: {
    dashboard: "/",
    profile: "organization/profile",
    companies: "organization/companies",
  },
  company: {
    dashboard: "/",
    profile: "company/profile",
    media: "company/media",
    customer: "company/customer",
    templates: "company/templates", // List of templates
    templatesCreate: "company/templates/create", // Create new template
    templateEdit: (id: string) => `company/templates/${id}/edit`, // Edit existing template
    templatePublic: (id: string) => `company/templates/${id}/public`, // Public view of template preview video ya imge template crate public data input data fill data filled download templete privew video remove download json remove all other thisngs
  },
};
