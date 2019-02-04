#!/usr/bin/env node

/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

 var fs = require('fs');
 var path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getResourcesPath(srcpath) {
    var result = null;
    getDirectories(srcpath).forEach(function(entry1) {
        getDirectories(path.join(srcpath, entry1)).forEach(function(entry2) {
            if (entry2 === "Images.xcassets") {
                result = path.join(srcpath, entry1, entry2);
            }
        });
    });

    return result;
}

module.exports = function(context) {
    var shell = context.requireCordovaModule('shelljs');

    var resources_path = getResourcesPath(path.join(context.opts.projectRoot, 'platforms', 'ios'));

    var icons_src_path = path.join(context.opts.plugin.dir, 'res', 'ios', 'icons', '*');
    var icons_dst_path = path.join(resources_path, 'AppIcon.appiconset');
    if (icons_dst_path) {
        shell.cp('-Rf', icons_src_path, icons_dst_path);
        if(shell.error()) 
            throw shell.error();

    } else {
        console.error("iOS Icons folder not found");
    }

    var launchimages_src_path = path.join(context.opts.plugin.dir, 'res', 'ios', 'splash', '*');
    var launchimages_dst_path = path.join(resources_path, 'LaunchImage.launchimage');
    if (launchimages_dst_path) {
        shell.cp('-Rf', launchimages_src_path, launchimages_dst_path);
        if(shell.error()) 
            throw shell.error();

    } else {
        console.error("iOS LaunchImages folder not found");
    }
}