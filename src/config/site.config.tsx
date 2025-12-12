import { Metadata } from "next";
import logoImg from "../../public/delta-logo.png";
import logoIconImg from "../../public/favicon.png";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Omniversal Nexus Suite",
  description: `ONS is Unlocking Institutional Crypto Trading Potential. Revolutionize your institution's approach to trading digital assets with ONS – Your gateway to unprecedented success in the digital asset landscape.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ONS` : title,
      description,
      url: "https://onstrading.com/",
      siteName: "ONS is Unlocking Institutional Crypto Trading Potential", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "https://onstrading.com/ons_home_page.png",
        width: 1920,
        height: 1080,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
