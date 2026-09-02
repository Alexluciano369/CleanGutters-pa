import { useEffect, useState } from "react";

function getCurrentPath(): string {
  const path = window.location.pathname;
  const normalized = path.replace(/\/+$/, "") || "/";
  return normalized;
}

export function useRoute(): string {
  const [path, setPath] = useState<string>(() => getCurrentPath());

  useEffect(() => {
    function handlePopState() {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      if (!href.startsWith("/")) return;

      e.preventDefault();
      const normalized = href.replace(/\/+$/, "") || "/";
      if (normalized !== getCurrentPath()) {
        window.history.pushState({}, "", normalized);
        setPath(normalized);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return path;
}

export function navigate(to: string): void {
  const normalized = to.replace(/\/+$/, "") || "/";
  window.history.pushState({}, "", normalized);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
