export interface Pokedex {
  edges: Edge[];
}

export interface Edge {
  node: EdgeNode;
}

export interface EdgeNode {
  title: string;
  excerpt: string;
  slug: string;
  date: Date;
  featuredImage?: FeaturedImage;
  author: Author;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
  };
}

export interface Author {
  node: AuthorNode;
}

export interface AuthorNode {
  name: string;
  firstName: null;
  lastName: null;
  avatar: Avatar;
}

export interface Avatar {
  url: string;
}
