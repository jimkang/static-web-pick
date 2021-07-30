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

var archiveStream = StaticWebArchive(config.archiveOpts);
archiveStream.on('error', logError);
var q = queue(4);
ids.forEach((id) => q.defer(addEntry, id));
q.awaitAll(oknok({ ok: endStream, nok: logError }));

function endStream() {
  console.log('Site built.');
  archiveStream.end();
}

function addEntry(id, done) {
  fs.readFile(
    path.join(metaDir, id + '.json'),
    { encoding: 'utf8' },
    oknok({ ok: writePack, nok: done })
  );

  function writePack(text) {
    archiveStream.write(JSON.parse(text));
    done();
  }
}

function logError(error) {
  console.log(error);
}
