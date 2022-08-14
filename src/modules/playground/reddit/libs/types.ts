export type RedditPost = {
  id: string;
  author: string;
  created_utc: number;
  created: number;
  title: string;
  permalink: string;
  url: string;
  selftext: string;
  selftext_html: string | null;

  thumbnail?: string;
  thumbnail_height?: number;
  link_flair_background_color: string;
  link_flair_text: string;
};
export type RedditResponseData = {
  after: string;
  before: string | null;
  children: Array<{ kind: string; data: RedditPost }>;
  dist: number;
  modhash: string;
};
export type RedditResponse = {
  data: RedditResponseData;
  kind: string;
};

export type Flair = {
  text: string;
  background: string;
};

// State machine types ////////////////////////////////////////////////////////
