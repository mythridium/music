## Change Log

# 1.14.7
* fixed bard + owl synergy not functioning
* added xp and mastery source tooltips

# 1.14.6
* fixed ancient relics not being rolled twice with the mystic oil upgrade

# 1.14.5
* while jesters love to play a good prank, they were being too harsh to the locals
* reduced the damage of all jesters at the circus to be more inline with monsters of the same slayer tier
* mystic jester is now a master task, previously an elite task
* adjusted enchanted jester and mystic jester stat allocations

# 1.14.4
* fixed default sort order of music mastery token

# 1.14.3
* fixed variel not showing that it also affects the music skill, this was purely visual on the tile
* fixed chinese traditional translation for bard

# 1.14.2
* fixed ancient relics not being rolled
* fixed chinese traditional translation for snare drum

# 1.14.1
* fixed hired bards view not updating as expected

# 1.14.0
* added support for game version 1.3
* no new content has been added, sorry :(
* replaced 99 fishing modifier with 'chance to receive one random special item from Fishing when catching a special item'

# 1.13.15
* fixed incorrect bards being loaded when using Quicksave and Quickload mod

# 1.13.14
* fixed save files not loading when disabling other mods that add instruments to the music mod

# 1.13.13
* fixed superior max cape and superior cape of completion not inheriting music skillcape modifiers

# 1.13.12
* improved compatibility with tiny passive icons

# 1.13.11
* fixed compatibility with tiny passive icons

# 1.13.10
* fixed skill completion statistic count being doubled

# 1.13.9
* fixed music gp gains not considering flat gp increases such as golden wreath

# 1.13.8
* replaced Bouzouki upgrade modifier from GP From Sales to GP gained when earning GP, except Alt. Magic and Item Sales

# 1.13.7
* added summoning synergy for tortoise + bard

# 1.13.6
* minor code cleanup, no change in functionality

# 1.13.5
* removed 'ancient coin token', 'ancient mask token' and 'ancient skull token'
* music skill level cap in the ancient relics gamemode now scales with combat stats level cap
* music is no longer offered as a choice for skill cap level increases
* improved logic for unlocking music skill to support custom ancient relic gamemodes

# 1.13.4
* added a new instrument, the flute which focuses on cartography and archaeology

# 1.13.3
* added ancient relics for music
* added a lesser relic for music

# 1.13.2
* fixed music being locked in ancient relics gamemode on existing saves when enabling the mod for the first time
* added one time rewards for undead graveyard, air god dungeon and lava lake dungeon
* these one time rewards are tokens which when consumed grant level cap increases in the ancient relics gamemode, they do nothing in other gamemodes and can be sold
* these tokens are equivalent to clearing 2 base game dungeons and 1 toth dungeon to help offset the additional skill

# 1.13.1
* fixed music being locked in ancient relics gamemode
* fixed skill cape exception check

# 1.13.0
* added support for atlas of discovery

## 1.12.0
* added settings to control the base bard hire cost
* added a hardcore setting which significantly reduces the power of hired bard modifiers
* fixed djembe being named bongo, it is now correctly labelled as a djembe again

## 1.11.2
* fixed german translations being in dutch

### 1.11.1
* fixed chinese simplified and chinese traditional translations for bard

### 1.11.0
* significantly reduced hiring cost of bards from 10k, 100k, 20m, 200m to 10k, 100k, 1m, 10m
* unlocking modifiers now also cost gp in addition to essence of music, costs are 100k for level 40 modifier, 1m for level 75 modifier and 10m for level 99 modifier
* bard hire cost for 95% mastery checkpoint has been reduced from -10% to -5%
* bard hire cost for mastery level 90 has been reduced from -10% to -5%
* switched and reduced the power of some instrument modifiers:
  * Banjo (75) now provides Passive Cook Interval
  * Banjo (99) now provides Chance to find a Lost Chest while Fishing and reduced from 15% to 10%
  * Accordion (75) now provides Target Damage Reduction is decreased by flat
  * Accordion (99) now provides Auto Eat Threshold and reduced from 10% to 5%
  * Accordion (U) now provides Chance To Double Loot in Combat and reduced from 10% to 5%
  * Bouzouki (75) Chance to Double Items Globally reduced from 15% to 10%
  * Saxophone (75) now provides Damage Reduction and reduced from 10% to 5%
  * Saxophone (99) now provides +5% Maximum Hitpoints
  * Saxophone (U) now provides + Maximum Hitpoints and reduced from +100 to +50
* adjusted some of the bard syngergies
  * Golbin Thief + Bard synergy now also grants +175 GP on monster kill
  * Ent + Bard synergy increased from 10% to 30%
  * Pig + Bard synergy increased from 10% to 25%
  * Salamander + Bard synergy increased from 5% to 25%

* Dev Note: These changes came from feedback that some modifiers are not worth unlocking as the hire cost grows too high for the value the modifier provides. It was more advantageous to simply leave some not unlocked which was not the intended way to interact with the bards. Hopefully, now that the gp costs of the skill have been reduced, the impact of unlocking some of the less desirable modifiers are not as painful. In addition a portion of the costs have been shifted to the one time cost of unlocking modifiers which should further reduce friction in switching bards that may not have as desirable modifiers. I'm aware this goes against the original design of wanting switching bards to be painful, but the design has evolved over time and no longer really fits with the current implementation.

### 1.10.0
* added translations for all languages supported by melvor idle
* please note, I only speak English, these were all fed through chat gpt, if you see an incorrect or missing translation please report this on github

### 1.9.1
* band practice shop purchase now correctly only shows if TotH has been purchased

### 1.9.0
* Throne of the Herald is now optional, all TotH data requires the expansion to load, this includes superior skillcape, instruments above level 99 and summoning synergies above level 99
* max skillcape and superior max skillcape no longer require the music skill to purchase
* eagle + bard synergy now grants -10% Music Interval, from -5% Agility Interval
* owl + bard synergy now grants +1.5% Music Mastery XP Per Maxed Star in Variel, from -5% Astrology Interval
* bard modifiers are no longer automatically unlocked based on mastery level
* once the required mastery level is reached, you may now choose to unlock the modifier whenever you feel like doing so
* previous save data will automatically migrate and have the appropriate mastery unlocks already for free
* hiring bard gp cost no longer scales with mastery level, instead the cost increases with the number of modifiers unlocked on the bard
* mystic oil no longer grants +1 modifier unlock, now rolls an additional time for rewards while training music

### 1.8.1
* reordered the music skillcapes to be listed/sorted in alphabetical order in the shop and bank

### 1.8.0
* the jesters have emerged from the circus, a new combat area
* added three new monsters found in the circus
* added the guitar, a 2H weapon that can be upgraded twice
* jesters drop the guitar, and the essence required to upgrade the guitar, among other music related drops

### 1.7.1
* reduced base drop chance of sheet music from 5% to 2%
* significantly reduced the sell value of music related items, these were not intended to be an easy way to generate gold

### 1.7.0
* agility obstacle 10 waterfall now also benefits the Music skill
* astrology variel constellation now also benefits the Music skill
* added compatibility between Tiny Passive Icons mod and the Music skill mod for Agility and Astrology
* switched the banjo and drum instruments
  * no functional change, just switched the type of instrument
  * the banjo now benefits fishing and cooking and is still unlocked at level 10
  * the drum now benefits mining and smithing and is still unlocked at level 20
* renamed the drum to snare drum
* renamed the bongo to djembe
* renamed the maraca to maracas

### 1.6.5
* added the ability to see the next available instrument in a locked state; like in Woodcutting and Mining

### 1.6.4
* workaround game bugs with completion log not correctly displaying for custom skills

### 1.6.3
* fixed concert pass halves dropping more often then intended
* adjusted the Music pet, Muse, to provide a flat -0.15s Music Interval from -1% Music Interval

### 1.6.2
* fixed message when the concert pass runs out to be more context specific

### 1.6.1
* fixed bank sort order for concert pass items

### 1.6.0
* added concert pass half a, concert pass half b and concert pass
* half a and half b can drop while training music
* both halves + 10M GP can be used to purchase 1,000 charges of a concert pass
* the concert pass can be equipped in the offhand and while training Music you also gain Skill XP for the skills the instrument supports

### 1.5.0
* increased drop rate of sheet music from 1% to 5%
* expanded the ability to upgrade hired bard instruments which boost the Music skill itself
  * one of three new gems can be socketed into a hired bards instrument
  * one of three new utilities can be applied onto a hired bards instrument

### 1.4.2
* fixed skill info header not displaying as intended on mobile
* fixed Aorpheats Signet Ring not providing +100% GP to Music
* fixed Max Skillcape, Cape of Completion, Superior Max Skillcape and Superior Cape of Completion not inheriting Music Skillcape modifiers (these capes still DO NOT require any Music skill levels, they just inherit the modifiers of the Music skillcapes)

### 1.4.1
* fixed trumpet mastery level 1 modifier incorrectly requiring mastery level 40

### 1.4.0
* reduced tips (GP) scaling from mastery level from +15 GP each level to +10 GP each level, base instrument GP is no longer the same across all instruments, higher level instruments have a higher base GP than lower level instruments. This should hopefully make higher instruments feel a little better, this does result in less GP from lower instruments than the previous version.
* added three more instruments; the accordion, bouzouki and xylophone
* modified some instrument unlock levels and bonuses
  * drum - Unlock Level 15 -> Level 10
  * banjo - Unlock Level 30 -> Level 20
  * saxophone - Unlock Level 45 -> Level 70, now focused on defensive modifiers only
  * maraca - Unlock Level 60 -> Level 50
  * violin - Unlock Level 75 -> Level 80
  * bongo - now focused entirely on slayer, agility has been moved to xylophone
  * french horn - switched level 1 and 40 modifier bonuses
  * tambourine - increased level 1 farming yield % from 5 to 10 and level 40 flat farming yield from 5 to 15
  * trumpet - now focused on damage dealing only
* added a new shop purchase which lets you hire two bards at once
* added a new item, sheet music which is dropped while training Music
* added a new item, essence of music, which is upgraded from sheet music
* added the ability to upgrade hired bard instruments which unlocks a 5th modifier

### 1.3.0
* added a potion to Herblore which increases GP obtained while training Music
* added a summoning tablet for the Music skill, the Bard
* added a Music Scroll of XP which can be purchased from the Township trader with Planks
* added a Music Outfit to the Township category of the shop, it functions the same all other skilling outfits

### 1.2.0

* updated description of mastery and mastery pool hire cost reduction to better align with skill capes (no functional change)
* updated exponential calculation to clamp mastery between level 1 and 99 instead of throwing an error if outside this range
* adjusted the level that instruments are available at
* adjusted the experience gained from training. The time it takes to level should be roughly equivalent to Astrology, assuming no interval increases, xp modifiers, etc and you train the highest level instrument available
* added 3 new instruments; the harp, tambourine and maraca

### 1.1.0

* fixed hire dialog allowing to hire without enough gold
* updated instrument icons

### 1.0.3

* fixed violin 99 mastery bonus to reduce prayer cost instead of increase it

### 1.0.2

* fixed music mastery token granting no experience

### 1.0.1

* fixed the spelling of saxophone
* removed mastery token, capes and pet from being required for completion log
* removed music from being required for max and superior max capes
* skill cape now also reduces bard hire cost by 5% and increased gold earned from music by 5%
* superior skill cape now also reduces bard hire cost by 10% and increased gold earned from music by 10%

### 1.0.0

* initial release
