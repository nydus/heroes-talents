'use strict'

const fs = require('fs-extra');
const path = require('path');
const download = require("download-github-repo");

const repository = 'heroespatchnotes/heroes-talents';
const cloneDir = path.normalize(__dirname+'/heroes-talents');

function downloadRepo() {
  return new Promise((resolve, reject) => {
    fs.mkdirp(cloneDir, err => {
      if (err) reject;

      fs.readdir(cloneDir, (err, contents) => {
        if (err) reject;

        console.log("Downloading https://github.com/" + repository + " ...");

        download(repository, cloneDir, err => {
          if (!err)
            resolve();
          else {
            console.error(err);
            console.error("Error downloading https://github.com/" + repository);
            process.exit(1);
          }
        });
      });
    });
  });
};

downloadRepo();