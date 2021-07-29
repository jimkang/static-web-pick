# static-web-pick

A tool that lets you build a static weblog cherry picking specific entries from an existing static weblog.

## Why

Say you've been using [static-web-archive](https://github.com/jimkang/static-web-archive)as your blog platform and now have thousands of entries. You want to start another smaller blog that includes just a handful of those entries. Fortunately, static-web-archive keeps a JSON file with everything needed to create an entry in a directory, usually `meta/`.

With this tool, you can create a list of the entries you want in this second blog, then tell the tool to build a new site, complete with RSS, if you want it.

## Installing

    npm i -g static-web-pick

## Usage

    static-web-pick <path to config file> <directory with meta files> <path to JSON list of ids>

### Parameters

- path to config file: The static-web-archive configuration module containing options that will be passed to the [static-web-archive constructor](https://github.com/jimkang/static-web-archive/blob/master/create-posting-stream-chain.js#L13). [Here is an example.](testbed/test-config.js)
- directory with meta files: The directory containing files, each of which is a JSON dictionary containing a metadatum about a weblog entry. By default, static-web-archive stores these in the `meta/` under the root of your archive directory. [Example metadatum.](testbed/meta/deathmtn-sqTtXnEA.json)
- path to JSON list of ids: This is a file containing a JSON array of the ids you want to be in your site. [Example.](testbed/ids.json)

### Testing

There aren't real tests, but you can run `make try`, then look in testbed/output. It should generate a weblog with three entries.
