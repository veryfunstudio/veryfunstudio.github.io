import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { type BlogPost, getBlogPath } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export function NoteCard({ post }: { post: BlogPost }) {
  return (
    <Link to={getBlogPath(post)} className="note-card">
      <div className="note-card__image">
        <img src={post.image} alt="" width={1200} height={630} loading="lazy" />
      </div>
      <div className="note-card__body">
        <div className="note-card__meta">
          <span>{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="note-card__link">
          Read the note <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
