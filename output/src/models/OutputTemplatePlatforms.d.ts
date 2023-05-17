import { NormalizedOutputTemplatePlatforms } from './NormalizedOutputTemplatePlatforms';
import { DenormalizePlatformOutputTemplate } from './PlatformOutputTemplate';
export type OutputTemplatePlatforms = {
    [P in keyof NormalizedOutputTemplatePlatforms]: DenormalizePlatformOutputTemplate<Exclude<NormalizedOutputTemplatePlatforms[P], undefined>> | undefined;
};
