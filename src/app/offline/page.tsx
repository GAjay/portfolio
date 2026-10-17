import {
  PortfolioBody,
  PortfolioH1,
} from "@/shared/components/portfolio-typography";

export default function OfflinePage() {
  return (
    <main className="portfolio-page offline-page">
      <PortfolioH1 className="offline-page__title">You are offline</PortfolioH1>
      <PortfolioBody className="offline-page__text">
        Cached content may still be available. Reconnect to load the latest version
        of this portfolio.
      </PortfolioBody>
      <a href="/" className="offline-page__link">
        Try again
      </a>
    </main>
  );
}
