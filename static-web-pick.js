#!/usr/bin/env node

/* global process */

var fs = require('fs');
var path = require('path');
var oknok = require('oknok');
var { queue } = require('d3-queue');
var StaticWebArchive = require('@jimkang/static-web-archive');

if (process.argv.length < 5) {
  console.error(
    'Usage: static-web-pick <path to config file> <directory with meta files> <path to JSON list of ids>'
  );
  process.exit(1);
}

const configPath = process.argv[2];
const metaDir = process.argv[3];
const idsFilePath = process.argv[4];

var config = require(configPath.startsWith('/')
  ? configPath
  : './' + configPath);
var ids = require(idsFilePath.startsWith('/')
  ? idsFilePath
  : './' + idsFilePath);

//var archiveStream = StaticWebArchive(config.archiveOpts);
//archiveStream.on('error', logError);
//var q = queue(1);
//ids.forEach((id) => q.defer(addEntry, id));
//q.awaitAll(oknok({ ok: endStream, nok: logError }));

var q = queue(1);
ids.forEach((id) => q.defer(addEntry, id));
q.awaitAll(oknok({ ok: () => console.log('Site built.'), nok: logError }));

// We're creating and destroying an archive for every single entry
// because static-web-archive has a bug probably related to it updating
// the last page record text file only once during a run. TODO: Verify that.
function addEntry(id, done) {
  var archiveStream = StaticWebArchive(config.archiveOpts);
  archiveStream.on('error', logError);
  fs.readFile(
    path.join(metaDir, id + '.json'),
    { encoding: 'utf8' },
    oknok({ ok: writePack, nok: done })
  );

  function writePack(text) {
    var pack = JSON.parse(text);
    console.log('Writing', pack);
    archiveStream.write(pack);
    archiveStream.end(() => setTimeout(done, 200));
  }
}

function logError(error) {
  console.log(error);
}
