import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";

const DEFAULT_SEO = {
  title: "Odra Leather Blog | مدونة جلود أودرا",
  description: "جلود أودرا | منتجات جلدية عالية الجودة في مصر | Know more about leather with Odra Leather",
  openGraph: {
    type: "website",
    locale: "en",
    title: "Odra Leather Blog | مدونة جلود أودرا",
    description: "جلود أودرا | منتجات جلدية عالية الجودة في مصر | ",
    site_name: "Odra Leather"
  }
};

export default class CustomApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }

  componentDidCatch(error: any, errorInfo: any) {
    // console.log(error);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />;
      </>
    );
  }
}
