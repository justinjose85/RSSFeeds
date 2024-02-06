/*
 * Dieses Modell übernimmt Backend-Funktionen für den Zugriff auf die RSS-Feeds
 * Die Quelle der RSS-Feeds sind die Infodienste der tagesschau
 */
using System.Xml.Linq;

namespace RSSFeeds.Model
{
    
    public class RssFeed
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public string PublishedDate { get; set; }

        public RssFeed() {}

        /*
         * Diese Methode verarbeitet die XML-Quelle und gibt eine Liste mit allen relevanten Daten zurück.
         * */
        public IEnumerable<RssFeed> GetRssFeeds()
        {
            List<RssFeed> RSSList = new List<RssFeed>();

            // Laden die XML-Datei von tagesschau Infor Services
            XDocument doc = XDocument.Load("https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml");

            // Die XML-Daten durchlaufen
            foreach (XElement rssFeedElement in doc.Descendants("item"))
                {
                    RssFeed rssFeed = new RssFeed();
                    rssFeed.Title = rssFeedElement.Element("title").Value;
                    rssFeed.Link = rssFeedElement.Element("link").Value;
                    rssFeed.Description = rssFeedElement.Element("description").Value;
                    rssFeed.PublishedDate = rssFeedElement.Element("pubDate").Value;

                    RSSList.Add(rssFeed);
                }
            return RSSList;

        }
    }
}
