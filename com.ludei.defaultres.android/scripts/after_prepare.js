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

// This script modifies the project root's config.xml
// This restores the content tag's src attribute to its original value.

var fs = require('fs');
var path = require('path');

module.exports = function (context) {
    if (context.opts.cordova.platforms.indexOf('android') <= -1)
        return;

    var config_xml_path = path.join(context.opts.projectRoot, 'config.xml');

    var et = context.requireCordovaModule('elementtree');
    var data = fs.readFileSync(config_xml_path).toString();
    var etree = et.parse(data);
    var item = null;
    var root = etree.getroot();

    for (var i = 0; i < root.getchildren().length; i++) {
        var item = root.getItem(i);
        if (item.tag === 'platform' && item.get("name", null) === 'android') {
            var hasHdpi = false;
            var hasLdpi = false;
            var hasMdpi = false;
            var hasXhdpi = false;
            for (var j = 0; j < item.getchildren().length; j++) {
                var icon = item.getItem(j);
                if (icon.tag === 'icon') {
                    if (icon.get('density') === 'hdpi')
                        hasHdpi = true;
                    if (icon.get('density') === 'ldpi')
                        hasLdpi = true;
                    if (icon.get('density') === 'mdpi')
                        hasMdpi = true;
                    if (icon.get('density') === 'xhdpi')
                        hasXhdpi = true;
                }
            }

            if (!hasLdpi) {
                var hdpi = et.Element('icon', { src: 'plugins/com.ludei.defaultres.android/res/android/mipmap-hdpi/icon.png', density: "hdpi" });
                item.append(hdpi);
            }

            if (!hasLdpi) {
                var ldpi = et.Element('icon', { src: 'plugins/com.ludei.defaultres.android/res/android/mipmap-ldpi/icon.png', density: "ldpi" });
                item.append(ldpi);
            }

            if (!hasMdpi) {
                var mdpi = et.Element('icon', { src: 'plugins/com.ludei.defaultres.android/res/android/mipmap-mdpi/icon.png', density: "mdpi" });
                item.append(mdpi);
            }

            if (!hasXhdpi) {
                var xhdpi = et.Element('icon', { src: 'plugins/com.ludei.defaultres.android/res/android/mipmap-xhdpi/icon.png', density: "xhdpi" });
                item.append(xhdpi);
            }
        }
    }

    data = etree.write({ 'indent': 4 });
    fs.writeFileSync(config_xml_path, data);
}