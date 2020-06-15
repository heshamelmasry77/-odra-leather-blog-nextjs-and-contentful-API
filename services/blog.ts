import { ContentfulClientApi, createClient } from "contentful";
import { Author, HeroImage, BlogPost } from "./blog.types";
import moment from "moment";

export class BlogApi {
  client: ContentfulClientApi;
  constructor() {
    // console.log(process.env.CONTENTFUL_SPACE_ID)
    // console.log(process.env.CONTENTFUL_ACCESS_TOKEN)

    this.client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });
  }

  convertImage = (rawImage): HeroImage => {
    if (rawImage) {
      return {
        imageUrl: rawImage.file.url.replace("//", "http://"), // may need to put null check as well here
        description: rawImage.description,
        title: rawImage.title
      };
    }
    return null;
  };

  convertAuthor = (rawAuthor): Author => {
    if (rawAuthor) {
      return {
        name: rawAuthor.name,
        phone: rawAuthor.phone,
        shortBio: rawAuthor.shortBio,
        title: rawAuthor.title,
        email: rawAuthor.email,
        company: rawAuthor.company,
        twitter: rawAuthor.twitter,
        facebook: rawAuthor.facebook,
        github: rawAuthor.github
      };
    }
    return null;
  };

  convertPost = (rawData): BlogPost => {
    const rawPost = rawData.fields;
    const rawHeroImage = rawPost.heroImage ? rawPost.heroImage.fields : null;
    const rawAuthor = rawPost.author ? rawPost.author.fields : null;
    return {
      id: rawData.sys.id,
      body: rawPost.body,
      description: rawPost.description,
      publishedDate: moment(rawPost.publishedDate).format("DD MMM YYYY"),
      slug: rawPost.slug,
      tags: rawPost.tags,
      title: rawPost.title,
      heroImage: this.convertImage(rawHeroImage),
      author: this.convertAuthor(rawAuthor),
      metaTitle: rawPost.metaTitle,
      metaDescription: rawPost.metaDescription,
      metaImage: rawPost.metaImage
        ? rawPost.metaImage.fields.file.url.replace("//", "http://")
        : ""
    };
  };

  async fetchBlogEntries(): Promise<Array<BlogPost>> {
    return await this.client
      .getEntries({
        content_type: "blogPost" // only fetch blog post entry
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          const blogPosts = entries.items.map(entry => this.convertPost(entry));
          return blogPosts;
        }
        return [];
      });
  }

  async fetchBlogById(slug: string): Promise<BlogPost> {
    return await this.client
      .getEntries({
        content_type: "blogPost",
        "fields.slug[in]": slug
      })
      .then(entries => {
        if (entries && entries.items && entries.items.length > 0) {
          // Assuming it always have unique slug for every blog entry
          const post = this.convertPost(entries.items[0]);
          return post;
        }
        return null;
      });
  }
}
