// Dieser Controller ist für das Modell „Rss Feed.cs“ geschrieben.
// Dies dient als Brücke zwischen der Client-App und dem Backend.
using Microsoft.AspNetCore.Mvc;
using RSSFeeds.Model;

namespace RSSFeeds.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class RSSFeedController : ControllerBase
    {
        private readonly ILogger<RSSFeedController> _logger;
        public RSSFeedController(ILogger<RSSFeedController> logger)
        {
            _logger = logger;
        }

        // REST API Get veröffentlichen
        [HttpGet]

        //Diese Methode gibt eine Liste von RSS-Feeds zurück
        public IEnumerable<RssFeed> Get()
        {
            RssFeed rssFeed = new RssFeed();
            Console.WriteLine(rssFeed.GetRssFeeds());
            return rssFeed.GetRssFeeds();

        }
    }
}
