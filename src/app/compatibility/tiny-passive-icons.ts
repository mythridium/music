import { Music } from '../music/music';

export class TinyPassiveIconsCompatibility {
    private readonly tinyIconTags = {
        increasedMusicHireCost: ['myth_music', 'gp'],
        decreasedMusicHireCost: ['myth_music', 'gp'],
        increasedMusicGP: ['myth_music', 'gp'],
        decreasedMusicGP: ['myth_music', 'gp'],
        bandPractice: ['myth_music'],
        masterAncientRelic: ['myth_music'],
        increasedChanceToObtainShrimpWhileTrainingMusic: ['myth_music', 'shrimp'],
        decreasedChanceToObtainShrimpWhileTrainingMusic: ['myth_music', 'shrimp'],
        increasedSheetMusicDropRate: ['myth_music', 'Sheet_Music'],
        decreasedSheetMusicDropRate: ['myth_music', 'Sheet_Music'],
        increasedMusicAdditionalRewardRoll: ['myth_music'],
        decreasedMusicAdditionalRewardRoll: ['myth_music'],
        increasedSkillMasteryXPPerVariel: ['skill']
    };

    constructor(private readonly context: Modding.ModContext, private readonly music: Music) {}

    public patch() {
        this.context.onModsLoaded(() => {
            if (!this.isLoaded()) {
                return;
            }

            const tinyIcons = mod.api.tinyIcons;

            const mythTags: Record<string, string> = {
                myth_music: this.music.media,
                shrimp: tinyIcons.getIconResourcePath('bank', 'shrimp'),
                Sheet_Music: this.context.getResourceUrl('assets/items/sheet-music.png')
            };

            for (const instrument of this.music.actions.allObjects) {
                mythTags[instrument.localID] = instrument.media;
            }

            for (const rareDrop of this.music.rareDrops) {
                mythTags[rareDrop.item.localID] = rareDrop.item.media;
            }

            tinyIcons.addTagSources(mythTags);
            tinyIcons.addCustomModifiers(this.tinyIconTags);
        });
    }

    private isLoaded() {
        return mod.manager.getLoadedModList().includes('Tiny Icons');
    }
}
