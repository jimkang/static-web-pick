const rootPath = 'testbed/output';

module.exports = {
  name: 'cherry-pick-test',
  archiveOpts: {
    title: 'Paintings',
    homeLink: 'https://jimkang.com/cherry-pick-test',
    rootPath,
    maxEntriesPerPage: 25,
    fileAbstractionType: 'fs',
    footerHTML: `<footer id="footer">
    <div>This site is updated via <a href="https://github.com/jimkang/note-taker">note-taker</a> and <a href="https://github.com/jimkang/note-sender">note-sender</a>. note-taker is an adapter for <a href="https://github.com/jimkang/static-web-archive">static-web-archive</a>.
    </div>
    <div>
      <a href="https://jimkang.com/cherry-pick-test/rss/index.rss">RSS feed</a>
    </div>
    <div>
      <a href="mailto:jimkang@fastmail.com">jimkang@fastmail.com</a>
    </div>
    <div>
      Want to see more stuff?
      <ul>
        <li><a href="https://tinyletter.com/jimkang">A newsletter about projects and plans</a></li>
        <li><a href="https://smidgeo.com/bots/">Automatically generated art</a></li>
        <li><a href="https://jimkang.com">jimkang.com</a></li>
      </ul>
    </div>
    </footer>
    `,
    generateRSS: true,
    archiveBaseURL: 'https://jimkang.com/cherry-pick-test',
    rssFeedOpts: {
      feed_url: 'https://jimkang.com/cherry-pick-test/rss/index.rss',
      site_url: 'https://jimkang.com/cherry-pick-test/',
    },
  },
};
