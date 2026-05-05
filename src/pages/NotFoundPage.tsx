import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { SITE } from "../hooks/useSEO";

export default function NotFoundPage() {
  const { pathname } = useLocation();

  // SPAs always serve 200, so the next best thing for SEO is a noindex hint.
  // Done inline (not via useSEO) because we want a single-purpose head state
  // that won't pollute OG/Twitter tags from previous routes.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Page Not Found — The Ski Awards";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    meta.id = "notfound-robots";
    document.head.appendChild(meta);

    const desc =
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = desc?.content;
    if (desc) desc.content = "The page you requested could not be found on The Ski Awards.";

    const canonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href;
    if (canonical) canonical.href = `${SITE.origin}/404`;

    return () => {
      document.title = prevTitle;
      document.getElementById("notfound-robots")?.remove();
      if (desc && prevDesc !== undefined) desc.content = prevDesc;
      if (canonical && prevCanonical !== undefined) canonical.href = prevCanonical;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-6">
            Error 404
          </p>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 leading-none">
            Off-piste.
          </h1>
          <p className="text-lg text-white/60 font-light leading-relaxed mb-10">
            We couldn't find <code className="font-mono text-white/80">{pathname}</code>.
            It may have been retired, renamed, or never existed in our rankings database.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to The Ski Awards
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
