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
    templates: "company/templates",
    customer: "company/customer",
    upload: "company/customer/upload",
  },
};
