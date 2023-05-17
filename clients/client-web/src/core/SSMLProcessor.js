"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSMLProcessor = exports.SUPPORTED_TAGS = exports.TAG_BREAK = exports.TAG_AUDIO = void 0;
const __1 = require("..");
exports.TAG_AUDIO = 'audio';
exports.TAG_BREAK = 'break';
exports.SUPPORTED_TAGS = [exports.TAG_AUDIO, exports.TAG_BREAK];
class SSMLProcessor {
    constructor(client) {
        this.client = client;
    }
    isPlainText(ssml) {
        return !/(?:(<[^>]*[/]>)|(<[^>]*>.*?<[/][^>]*>))/g.test(ssml);
    }
    isSupportedTag(ssml) {
        return exports.SUPPORTED_TAGS.some((tag) => {
            return new RegExp(`(?:(<${tag}[^>]*[/]>)|(<${tag}[^>]*>.*?<[/][^>]*>))`, 'g').test(ssml);
        });
    }
    async processSSML(ssml) {
        const ssmlParts = this.getSSMLParts(ssml);
        for (let i = 0, len = ssmlParts.length; i < len; i++) {
            if (this.isPlainText(ssmlParts[i])) {
                await this.client.speechSynthesizer.speak(ssmlParts[i]);
            }
            else if (this.isSupportedTag(ssmlParts[i])) {
                await this.processSSMLPart(ssmlParts[i]);
            }
        }
    }
    removeSSML(ssml, keepTags) {
        let noSSMLText = ssml.replace(/<speak>/g, '').replace(/<\/speak>/g, '');
        let regexPattern = '<[^>]*>';
        if (keepTags && keepTags.length > 0) {
            let exclusionPattern = '';
            keepTags.forEach((tag) => {
                exclusionPattern += `(?![/]?${tag})`;
            });
            regexPattern = `<${exclusionPattern}[^>]*[^>]*>`;
        }
        noSSMLText = noSSMLText.replace(new RegExp(regexPattern, 'g'), '');
        return noSSMLText;
    }
    async processSSMLPart(part) {
        switch (this.getTag(part)) {
            case exports.TAG_AUDIO:
                const audioSource = this.getAudioSource(part);
                return this.client.audioPlayer.play(audioSource);
            case exports.TAG_BREAK:
                const amount = this.getBreakTime(part);
                if (amount) {
                    return (0, __1.delay)(amount);
                }
                return;
        }
    }
    getTag(ssml) {
        const regexp = /<\s*([^>/\s]+)/g;
        const matches = regexp.exec(ssml);
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
    getAudioSource(ssml) {
        const regex = /<audio[^>]*src\s*=\s*"(.*)"/g;
        const match = regex.exec(ssml);
        return (match === null || match === void 0 ? void 0 : match[1]) || '';
    }
    getBreakTime(ssml) {
        const regex = /<break[^>]*time\s*=\s*"(.*)"/g;
        const match = regex.exec(ssml);
        if (match) {
            const rawValue = match[1];
            let value = 0;
            if (rawValue.endsWith('ms')) {
                value = +rawValue.replace('ms', '');
            }
            else if (rawValue.endsWith('s')) {
                value = +rawValue.replace('s', '') * 1000;
            }
            return value;
        }
        return 0;
    }
    getSSMLParts(ssml) {
        const regex = /(?:(<[^>]*[/]>)|(<[^>]*>.*?<[/][^>]*>))/g;
        const supportedSSMLOnly = this.removeSSML(ssml, exports.SUPPORTED_TAGS);
        return supportedSSMLOnly.split(regex).filter((part) => {
            return part === null || part === void 0 ? void 0 : part.trim().length;
        });
    }
}
exports.SSMLProcessor = SSMLProcessor;
//# sourceMappingURL=SSMLProcessor.js.map