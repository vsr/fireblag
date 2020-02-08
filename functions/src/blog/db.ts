import { db } from "../admin";

interface Blog {
  title: string;
  slug: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
  content: string;
  category: string;
  tags: string[];
}

interface Category {
  name: string;
  content: string;
}

interface Tag {
  name: string;
  content: string;
}

const BLOG_COLLECTION = "BLOG";

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  return db
    .collection(BLOG_COLLECTION)
    .doc(slug)
    .get()
    .then(res => res.data() as Blog)
    .catch(err => {
      console.error("Error fetching blog", slug, err);
      return null;
    });
};

const getBlogsByCategory = async (
  category: string,
  limit: 10
): Promise<Blog[]> => {
  return db
    .collection(BLOG_COLLECTION)
    .where("category", "==", category)
    .limit(limit)
    .get()
    .then(res => res.docs.map(doc => doc.data() as Blog));
};

const getBlogsByTag = async (tag: string, limit: 10): Promise<Blog[]> => {
  return db
    .collection(BLOG_COLLECTION)
    .where("tag", "array-contains", tag)
    .limit(limit)
    .get()
    .then(res => res.docs.map(doc => doc.data() as Blog));
};

const getLatestBlogs = async (limit = 10): Promise<Blog[]> => {
  return db
    .collection(BLOG_COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()
    .then(res => res.docs.map(doc => doc.data() as Blog));
};

export {
  Blog,
  Category,
  Tag,
  getBlogBySlug,
  getBlogsByCategory,
  getBlogsByTag,
  getLatestBlogs
};
