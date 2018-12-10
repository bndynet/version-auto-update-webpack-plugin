'use strict';

const PLUGIN_NAME = 'vau';

const fs = require('fs');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const semver = require('semver');
const weblog = require('webpack-log');
const log = weblog({
    name: PLUGIN_NAME
});

const VersionAutoUpdateWebpackPluginDefaultOptions = {
    package: './package.json',
    packageJsonIndent: '  ',
    versionType: '', // major, minor or patch, if empty, will prerelease with build.x
};

class VersionAutoUpdateWebpackPlugin {
    constructor(options) {
        this.options = Object.assign({}, VersionAutoUpdateWebpackPluginDefaultOptions, options);
        if (args.vau && args.vau.versionType) {
            this.options.versionType = args.vau.versionType;
        }
    }

    getPackageFile() {
        try {
            return JSON.parse(
                fs.readFileSync(this.packageFilePath, 'utf8')
            );
        } catch (err) {
            log.error(err);
            return null;
        }
    }

    updatePackageVersion() {
        if (!this.packageFile) {
            return;
        }

        const originVersion = this.packageFile.version;
        if (this.options.versionType) {
            this.packageFile.version = semver.inc(this.packageFile.version, this.options.versionType);
        } else {
            this.packageFile.version = semver.inc(this.packageFile.version, 'prerelease', 'build');
        }
        if (!this.packageFile.version) {
            log.error('The version type MUST be one of major, minor or patch!');
            return;
        }

        fs.writeFile(
            this.packageFilePath,
            JSON.stringify(this.packageFile, null, this.options.packageJsonIndent), (err) => {
                if (err) {
                    log.error(err);
                    return false;
                }
                log.info(`Version (${originVersion}) in package.json has been updated to ${this.packageFile.version}`);
                return true;
            });
    }

    apply() {
        this.packageFilePath = path.resolve(process.cwd(), this.options.package);
        this.packageFile = this.getPackageFile();
        this.updatePackageVersion();

    }
}

module.exports = VersionAutoUpdateWebpackPlugin;