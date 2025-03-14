
import { NewsItem } from "@/components/news/types";

export interface Article extends NewsItem {
  content: string;
  sources?: {
    name: string;
    url: string;
  }[];
  relatedArticles?: NewsItem[];
}
