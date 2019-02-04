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

module.exports = function(context) {
    if (context.opts.cordova.platforms.indexOf('ubuntu') <= -1)
        return;

    var shell = context.requireCordovaModule('shelljs');

    var src_path = path.join(context.opts.projectRoot, 'www', 'img');
    var cmd = shell.exec("mkdir -p " + src_path);
    if(cmd.code !== 0) {
        console.error("Error calling: " + "mkdir -p " + src_path);
    }

    var src_icon_path = path.join(context.opts.plugin.dir, 'res', 'ubuntu', 'icon.png');
    var dst_icon_path = path.join(context.opts.projectRoot, 'www', 'img', "logo.png");
    if (!fs.existFileSync(dst_icon_path)) {
        var data = fs.readFileSync(src_icon_path);
        fs.writeFileSync(dst_image_path, data);     
    }
}