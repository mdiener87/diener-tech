CREATE TABLE IF NOT EXISTS post_likes (
  post_path TEXT PRIMARY KEY,
  like_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS post_like_visitors (
  post_path TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (post_path, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_post_like_visitors_post_path
  ON post_like_visitors (post_path);
