# [Myth] Music

Does not contain actual music. Sorry. :(

Disclaimer: **Please backup your save file before installing this mod.**

This mod should be safe to install and uninstall at any time, however the game is designed to automatically delete data for mods that aren't loaded. **So if you uninstall this mod and load your save game, the Music data will be deleted by the game.** If you re-install the mod after the data is deleted, the skill will be reset to level 1, including masteries. If you uninstall and re-install without ever loading your save game, the data should be safe and retained.

Please provide any feedback or bug reports, would love to hear your thoughts.

![Music](images/music.png)

## Design Methodology

When designing this skill, my aims were to take pressure off early game gold, while also providing a late game gold siphon. This makes it an attractive early game skill for adventure mode, and late game, especially once Township is up and running, the buffs are designed to be powerful enough that spending the gold is deemed worth it. By limiting to only a couple of bards, the player will need to spend their masses of gold to get the bonuses for the skills they are training.

## Change Log
 Has been moved to the end of the mod description page.

## Training

Music is a brand new skill which combines themes from Astrology, Thieving and Agility. It provides an easy way to obtain gold and powerful bonuses that benefit other skills.

Earn tips (GP) while you train bards with various instruments, then hire the bards you have trained to provide you with powerful bonuses while you train other skills.

This mod includes a new mastery token for the skill and both skill cape and superior skill cape.

## Hiring a Bard

You can hire various bards to play on your behalf. These bards provide powerful bonuses to help you while you train other skills, however the more skilled a bard is, the more expensive it will become to hire them.

You can only hire a single bard at a time (two if you purchase the Band Practice upgrade).

The cost of hiring a bard grows exponentially more expensive per mastery level.

![Hire a Bard](images/hire-bard.png)

### Drops

While training you have a chance to obtain Signet Ring Half A, Circlet of Rhaelyx and Mysterious Stones, just like any other non combat skill.

Tips (GP) earned while training do scale with global gold increases.

### Sheet Music, Essence of Music, Gems and Utilities

Training Music has a 2% chance to drop sheet music, these are used for hired bard instrument upgrades.

Sheet Music drop chance is a flat 2% and is not modified by any rarity increases, the only other boost to sheet music drop chance is applying Diamond String to your hired bards instrument. With two bards, this means you can get a total of 12% drop chance for Sheet Music.

![Items](images/items.png)

## Hired Bard Instrument

Hired bard instruments can be enhanced in various ways. They can be upgraded, socketed with a gem and applied with an utility.

Upgrades are destroyed if you hire a new bard. Re-hiring a previously hired bard will require upgrading, socketing and applying the instrument again.

![Upgrade Instrument](images/upgrade-bard-instrument.png)

### Upgrade

Upgrading a hired bards instrument unlocks a 5th modifier, to do so, you require an Essence of Music.

Essence of Music
Upgrade from Sheet Music
1,000,000GP + 50 Sheet Music
Unlocks a 5th modifier on hired bard instrument when upgraded.

![Upgrade](images/upgrade.png)

### Gem Socket

You can select one of three gems to socket into your bards instrument. Only one can be active at a time, and you may freely switch provided you have the resources.

Polished Topaz Gem
Upgrade from Topaz
50,000 GP + 50 Topaz + 10 Sheet Music
+5% Music GP

Polished Ruby Gem
Upgrade from Ruby
50,000 GP + 50 Ruby + 10 Sheet Music
+5% Music Skill XP

Polished Sapphire Gem
Upgrade from Sapphire
50,000 GP + 50 Sapphire + 10 Sheet Music
+5% Music Mastery XP

![Socket](images/gem.png)

### Utility

You can select one of three utilities to apply onto your bards instrument. Only one can be active at a time, and you may freely switch provided you have the resources.

Diamond String
Upgrade from Bowstring
50,000 GP + 100 Diamond + 100 Bowstring + 50 Music Sheet
+5% Sheet Music drop chance

Pristine Leather
Upgrade from Leather
50,000 GP + 100 Diamond + 100 Leather + 50 Music Sheet
-5% Music Interval

Mystic Oil
Upgrade from Weird Gloop
50,000 GP + 100 Diamond + 100 Weird Gloop + 50 Music Sheet
+1 Unlock tier for instrument without needing to meet mastery level

Mystic Oil will unlock the next modifier available even if you don't have the mastery level for it.

For example: You are mastery level 1, and apply Mystic Oil. You will get the level 1 and level 40 modifiers.

Once you reach level 40 mastery, you'll also unlock the level 75 modifier.

This means that when you reach level 99 mastery, this utility does nothing, so switch to one of the others.

![Apply](images/apply.png)

## Band Practice

The shop sells an upgrade which unlocks a second bard slot. This upgrade requires Level 110 Music and costs 1B GP.

![Band Practice](images/band-practice.png)

![Double Bard](images/double-bard.png)

## Concert Pass

![Concert Pass Purchase](images/concert-pass-purchase.png)

The shop sells item charges for a Concert Pass.
* Purchase Cost: Concert Pass Half (A) + Concert Pass Half (B) + 10M GP
* When equipped in the offhand and has charges, the concert pass will provide skill xp for the skills the instrument supports.
* Drop rate for Concert Pass Halves is 0.00075% or roughly equivalent to the Ancient Ring of Skill and Ancient Ring of Mastery drop chance from Fishing with a special chance of 5%.

![Concert Pass](images/concert-pass.png)

For example, the Guitar supports Woodcutting and Firemaking, while training the Guitar with the Concert Pass equipped and charges available. Woodcutting and Firemaking will also gain Skill XP.

**The skill must be unlocked to gain skill xp in Adventure mode.**

The amount of Skill XP should be roughly 1 level worth for every 1,000 charges. This is done by finding the xp difference between the current level and the next level, then dividing the amount by 1,000.

For example:
* level 55 requires 166,636 total experience and level 56 requires 184,040 total experience.
* 184,040 - 166,636 = 15,764 experience to level up from 55 to 56
* 15,764 / 1,000 = 15 experience per charge used

When you level up, it will shift the calculation to the next level.

The level calculation is clamped to a max skill level of 120, which roughly equates to ~10,000 xp per charge used at max level, and the minimum xp gained is clamped to 1, so the early levels will progress faster then 1 level per 1,000 charges since they would grant less then 1 xp without the clamp.

![Concert Pass Charges](images/concert-pass-charges.png)

## Skill Unlocks

Leveling the Music skill unlocks additional musical instruments to train your bards with.

![Skill Unlocks](images/instrument-unlocks.png)

## Mastery Pool Unlocks

Mastery Pool checkpoints provide additional xp, mastery xp, music interval and hire cost reduction.

![Mastery Pool Unlocks](images/mastery-pool-unlocks.png)

## Mastery Unlocks

As you level up an instruments mastery, the tips you earn increases, but the cost to hire the bard for that instrument also increases. You also unlock additional bonuses and reduce the hire cost.

![Mastery Unlocks](images/mastery-unlocks.png)

## Skill Capes

The Music Skill Cape

![Music Skillcape](images/music-skillcape.png)

The Superior Music Skill Cape

![Superior Music Skillcape](images/superior-music-skillcape.png)

## Pet

The Music skill also contains a pet: Muse which provides -0.15s Music Interval

![Muse](images/muse-pet.png)

## Herblore

The Generous Gratuity Potion can be brewed using the Herblore skill.

![Potion](images/potion.png)

* Herblore Unlock Level: 80
* Materials: 1 Pigtayle Herb + 1,000 GP
* Tier 1: +10% Music GP, 15 Charges
* Tier 2: +20% Music GP, 25 Charges
* Tier 3: +30% Music GP, 35 Charges
* Tier 4: +50% Music GP, 50 Charges

The potion has also been added to Potion Box II from Township, at the same rarity as the Herblore Potion.

![Potion Box](images/potion-box.png)

## Summoning

The Music skill has its own tablet. The Bard! The Bard is both a combat and skill tablet.

![Bard Tablet](images/bard-tablet.png)

![Bard Mark](images/bard-mark.png)

* Tier: 3
* Summoning Level Requirement: 90
* Summoning Max Hit: 192
* Skill Bonus: +5% Music GP

In addition, the Bard has synergies with every single other tablet. Since Music is a skill that focuses on boosting other skills, its synergy helps all other skills. It basically doubles the tablet effect of the tablet it is synergizing with (by granting the same tablet modifiers via the synergy).

Example: Devil gives -5% Firemaking Interval, if synergized with the Bard, the synergy will provide an addition -5% Firemaking Interval for a total of -10% Firemaking Interval being provided from the tablets.

The Fox synergy actually works in reverse, kind of... the Bard synergy doubles the Fox tablet modifier, which then boosts the Bards Summoning max hit.

![Summoning](images/summoning-1.png)

![Summoning](images/summoning-2.png)

## Agility

Agility has been modified so that the Obstacle 10 - Waterfall now also benefits the Music skill.

![Agility](images/agility.png)

## Astrology

Astrology has been modified so that the Variel constellation now also benefits the Music skill.

![Astrology](images/astrology.png)

## Township

The Music skill adds a Music Scroll of XP granting +3% Music Skill XP. It functions the same as other scrolls of xp.

It requires level 15 Township and level 15 Music to purchase, with a default value of 80 planks per scroll.

![Township](images/township-xp-scroll.png)

The Music skill adds a Music Outfit, which is fully integrated just like all the other skilling outfits.

![Bards Outfit](images/bard-outfit.png)

![Skiller Upgrade](images/skiller-upgrade.png)

## The Circus

The jesters have emerged from The Circus. The jesters are notorious pranksters. They have been rivals with the bards since the beginning of time, known for stealing instruments, many tussles have broken out between the bards and the jesters.

The Circus is a new combat area that contains 3 types of jesters to fight.

![The Circus](images/the-circus.png)

### Jester

![Jester](images/jester.png)

### Enchanted Jester

![Enchanted Jester](images/enchanted-jester.png)

### Mystic Jester

![Mystic Jester](images/mystic-jester.png)

### Guitar Weapon

The Jester can drop a Guitar which is a new 2H Weapon which requires attack and music levels to equip. The Guitar can be upgraded twice.

![Guitars](images/guitar-items.png)

### Guitar

Drops from the Jester

![Guitar](images/guitar.png)

### Enchanted Guitar

Upgrade Cost: 100K GP + 50 Enchanted Essence + 1 Guitar

Enchanted Essence is dropped from the Enchanted Jester

![Enchanted Guitar](images/enchanted-guitar.png)

### Mystic Guitar

Upgrade Cost: 1M GP + 50 Mystic Essence + 1 Enchanted Guitar

Mystic Essence is dropped from the Mystic Jester

![Mystic Guitar](images/mystic-guitar.png)

## Bard Bonuses

The bonuses each bard provides is as follows:

Guitar: Unlocked at skill level 1
* Mastery Level 1: +5% Chance for Bird Nests to drop in Woodcutting
* Mastery Level 40: -10% Firemaking Interval
* Mastery Level 75: +15% Firemaking Mastery XP
* Mastery Level 99: +2 minimum Bird Nest's received from Woodcutting
* Upgrade: Bonfires in Firemaking require no logs to light. Automatically relights Bonfires when depleted

Banjo: Unlocked at skill level 10
* Mastery Level 1: -0.5s Fishing Interval
* Mastery Level 40: -10% Cooking Interval
* Mastery Level 75: +15% chance to find a Lost Chest while Fishing (This is separate to the Special Fishing Chance)
* Mastery Level 99: -30% Passive Cook Interval
* Upgrade: +25% chance to gain 1 cooked version of a fish when Fishing

Snare Drum: Unlocked at skill level 20
* Mastery Level 1: -0.2s Mining Interval
* Mastery Level 40: -0.2s Smithing Interval
* Mastery Level 75: -3 Coal Ore Cost when Smithing
* Mastery Level 99: x4 Ores received from Mining
* Upgrade: x4 Rune Essence received from Mining

Accordion: Unlocked at skill level 30
* Mastery Level 1: +5% Hitpoint Regeneration
* Mastery Level 40: +15% Auto Eat Efficiency
* Mastery Level 75: +10% Chance To Double Loot in Combat
* Mastery Level 99: Target Damage Reduction is decreased by flat 10%
* Upgrade: +10% Auto Eat Threshold

Bouzouki: Unlocked at skill level 40
* Mastery Level 1: +10% Chance to Preserve Resources in Skills
* Mastery Level 40: +10% Global GP (except Item Sales)
* Mastery Level 75: +15% Chance to Double Items Globally
* Mastery Level 99: 10% increased chance to receive Global Rare Items, Mastery Tokens, Bird Nests from Woodcutting, Gems from Mining, and Coal from Firemaking
* Upgrade: +15% GP From Sales

Maracas: Unlocked at skill level 50
* Mastery Level 1: +5% Crafting Skill XP
* Mastery Level 40: +5% Fletching Skill XP
* Mastery Level 75: x4 Items received from Fletching
* Mastery Level 99: x4 Items received from Crafting
* Upgrade: +2 base Javelins produced per action in Fletching

Xylophone: Unlocked at skill level 60
* Mastery Level 1: -10% Agility Obstacle Build Costs
* Mastery Level 40: +15% GP From Agility
* Mastery Level 75: -15% Agility Interval
* Mastery Level 99: -10% Agility Pillar build costs
* Upgrade: +25% GP from Agility per active Obstacle

Saxaphone: Unlocked at skill level 70
* Mastery Level 1: +5% Global Evasion
* Mastery Level 40: +10% Lifesteal
* Mastery Level 75: +100 Maximum Hitpoints
* Mastery Level 99: +10% Damage Reduction
* Upgrade: +5% Maximum Hitpoints

Violin: Unlocked at skill level 80
* Mastery Level 1: +10% chance to preserve resources when Runecrafting runes
* Mastery Level 40: Gain +1 Prayer Points for each successful Enemy hit on you
* Mastery Level 75: Create +6 Additional Runes of the same type in Runecrafting
* Mastery Level 99: -3 Prayer Point Cost for Prayers
* Upgrade: +50% Chance to receive random Elemental Runes from Runecrafting when creating Runes

Djembe: Unlocked at skill level 90
* Mastery Level 1: -5% Slayer Task monster Accuracy Rating
* Mastery Level 40: +10% Damage To Slayer Tasks
* Mastery Level 75: +40% Slayer Coins
* Mastery Level 99: +25% Flat Slayer Area Effect Negation
* Upgrade: +20% Slayer Skill XP

French Horn: Unlocked at skill level 100
* Mastery Level 1: +5% chance to locate a Meteorite in Astrology
* Mastery Level 40: -0.5s Astrology Interval
* Mastery Level 75: -1s Summoning Interval
* Mastery Level 99: +15 Base Quantity for Summoning Tablet Creation
* Upgrade: +35% Summoning Maximum Hit

Harp: Unlocked at skill level 105
* Mastery Level 1: +10% Chance to receive a Random Tier of the same Potion in Herblore
* Mastery Level 40: +50 Stealth while Thieving
* Mastery Level 75: x4 Items received from Herblore
* Mastery Level 99: +15% chance to receive Thieving Area Unique Item
* Upgrade: +20% Chance to Double Items in Thieving

Tambourine: Unlocked at skill level 110
* Mastery Level 1: +10% Farming Yield
* Mastery Level 40: +15 harvest quantity from Farming (Cannot be doubled or multiplied)
* Mastery Level 75: +10% Township GP Production
* Mastery Level 99: +50% Township Happiness
* Upgrade: +25% Chance to Double Farming Yield

Trumpet: Unlocked at skill level 115
* Mastery Level 1: +5% Accuracy Rating
* Mastery Level 40: +5% of Maximum Hit added to Minimum Hit
* Mastery Level 75: +10% Maximum Hit
* Mastery Level 99: -0.5s Attack Interval
* Upgrade: +20% chance to apply Decay Curse to the Target per hit

## Cost to Hire a Bard

The cost for hiring a bard is as follows: (Starts at 10,000 GP and maxes out at 200M GP)

* Mastery Level: 1 - GP Cost:10,000
* Mastery Level: 2 - GP Cost:11,000
* Mastery Level: 3 - GP Cost:12,000
* Mastery Level: 4 - GP Cost:14,000
* Mastery Level: 5 - GP Cost:15,000
* Mastery Level: 6 - GP Cost:17,000
* Mastery Level: 7 - GP Cost:18,000
* Mastery Level: 8 - GP Cost:20,000
* Mastery Level: 9 - GP Cost:22,000
* Mastery Level: 10 - GP Cost: 25,000
* Mastery Level: 11 - GP Cost: 27,000
* Mastery Level: 12 - GP Cost: 30,000
* Mastery Level: 13 - GP Cost: 34,000
* Mastery Level: 14 - GP Cost: 37,000
* Mastery Level: 15 - GP Cost: 41,000
* Mastery Level: 16 - GP Cost: 46,000
* Mastery Level: 17 - GP Cost: 50,000
* Mastery Level: 18 - GP Cost: 56,000
* Mastery Level: 19 - GP Cost: 62,000
* Mastery Level: 20 - GP Cost: 68,000
* Mastery Level: 21 - GP Cost: 75,000
* Mastery Level: 22 - GP Cost: 83,000
* Mastery Level: 23 - GP Cost: 92,000
* Mastery Level: 24 - GP Cost: 102,000
* Mastery Level: 25 - GP Cost: 113,000
* Mastery Level: 26 - GP Cost: 125,000
* Mastery Level: 27 - GP Cost: 138,000
* Mastery Level: 28 - GP Cost: 153,000
* Mastery Level: 29 - GP Cost: 169,000
* Mastery Level: 30 - GP Cost: 187,000
* Mastery Level: 31 - GP Cost: 207,000
* Mastery Level: 32 - GP Cost: 229,000
* Mastery Level: 33 - GP Cost: 254,000
* Mastery Level: 34 - GP Cost: 281,000
* Mastery Level: 35 - GP Cost: 311,000
* Mastery Level: 36 - GP Cost: 344,000
* Mastery Level: 37 - GP Cost: 380,000
* Mastery Level: 38 - GP Cost: 421,000
* Mastery Level: 39 - GP Cost: 465,000
* Mastery Level: 40 - GP Cost: 515,000
* Mastery Level: 41 - GP Cost: 570,000
* Mastery Level: 42 - GP Cost: 630,000
* Mastery Level: 43 - GP Cost: 697,000
* Mastery Level: 44 - GP Cost: 771,000
* Mastery Level: 45 - GP Cost: 853,000
* Mastery Level: 46 - GP Cost: 944,000
* Mastery Level: 47 - GP Cost: 1,044,000
* Mastery Level: 48 - GP Cost: 1,155,000
* Mastery Level: 49 - GP Cost: 1,278,000
* Mastery Level: 50 - GP Cost: 1,414,000
* Mastery Level: 51 - GP Cost: 1,565,000
* Mastery Level: 52 - GP Cost: 1,731,000
* Mastery Level: 53 - GP Cost: 1,915,000
* Mastery Level: 54 - GP Cost: 2,119,000
* Mastery Level: 55 - GP Cost: 2,344,000
* Mastery Level: 56 - GP Cost: 2,593,000
* Mastery Level: 57 - GP Cost: 2,869,000
* Mastery Level: 58 - GP Cost: 3,174,000
* Mastery Level: 59 - GP Cost: 3,512,000
* Mastery Level: 60 - GP Cost: 3,885,000
* Mastery Level: 61 - GP Cost: 4,298,000
* Mastery Level: 62 - GP Cost: 4,755,000
* Mastery Level: 63 - GP Cost: 5,261,000
* Mastery Level: 64 - GP Cost: 5,820,000
* Mastery Level: 65 - GP Cost: 6,439,000
* Mastery Level: 66 - GP Cost: 7,124,000
* Mastery Level: 67 - GP Cost: 7,882,000
* Mastery Level: 68 - GP Cost: 8,720,000
* Mastery Level: 69 - GP Cost: 9,647,000
* Mastery Level: 70 - GP Cost: 10,673,000
* Mastery Level: 71 - GP Cost: 11,808,000
* Mastery Level: 72 - GP Cost: 13,063,000
* Mastery Level: 73 - GP Cost: 14,452,000
* Mastery Level: 74 - GP Cost: 15,989,000
* Mastery Level: 75 - GP Cost: 17,690,000
* Mastery Level: 76 - GP Cost: 19,571,000
* Mastery Level: 77 - GP Cost: 21,652,000
* Mastery Level: 78 - GP Cost: 23,954,000
* Mastery Level: 79 - GP Cost: 26,501,000
* Mastery Level: 80 - GP Cost: 29,320,000
* Mastery Level: 81 - GP Cost: 32,437,000
* Mastery Level: 82 - GP Cost: 35,887,000
* Mastery Level: 83 - GP Cost: 39,703,000
* Mastery Level: 84 - GP Cost: 43,925,000
* Mastery Level: 85 - GP Cost: 48,596,000
* Mastery Level: 86 - GP Cost: 53,763,000
* Mastery Level: 87 - GP Cost: 59,480,000
* Mastery Level: 88 - GP Cost: 65,805,000
* Mastery Level: 89 - GP Cost: 72,803,000
* Mastery Level: 90 - GP Cost: 80,545,000
* Mastery Level: 91 - GP Cost: 89,110,000
* Mastery Level: 92 - GP Cost: 98,586,000
* Mastery Level: 93 - GP Cost: 109,069,000
* Mastery Level: 94 - GP Cost: 120,667,000
* Mastery Level: 95 - GP Cost: 133,499,000
* Mastery Level: 96 - GP Cost: 147,695,000
* Mastery Level: 97 - GP Cost: 163,401,000
* Mastery Level: 98 - GP Cost: 180,776,000
* Mastery Level: 99 - GP Cost: 200,000,000

## Change Log

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

## Attribution

Images obtained from the following sources, attribution provided.

<a href="https://www.freepik.com/free-vector/cute-red-panda-playing-guitar-cartoon-vector-icon-illustration-animal-music-icon-concept-isolated_31966379.htm">Image by catalyststuff on Freepik</a>

<a href="https://www.freepik.com/free-vector/musical-instrument-set_8610228.htm#query=cartoon%20instrument&position=0&from_view=keyword&track=ais">Image by pch.vector on Freepik</a>

<a href="https://www.flaticon.com/free-icons/troubadour">Troubadour icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/sheet-music" title="sheet music icons">Sheet music icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Dragon Icons - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/gemstone" title="gemstone icons">Gemstone icons created by Kroffle - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/access" title="access icons">Access icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/famous" title="famous icons">Famous icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/guitar" title="guitar icons">Guitar icons created by Freepik - Flaticon</a>

<a href="https://www.freepik.com/free-vector/aesthetic-jazz-background-musical-instrument-border-blue-vector_20346432.htm#query=musical%20background&position=16&from_view=search&track=ais">Image by rawpixel.com on Freepik</a>

<a href="https://www.flaticon.com/free-icons/music-and-multimedia" title="music and multimedia icons">Music and multimedia icons created by Mihimihi - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/circus-tent" title="circus tent icons">Circus tent icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/professions-and-jobs" title="professions and jobs icons">Professions and jobs icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/jester" title="jester icons">Jester icons created by Freepik - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/jester" title="jester icons">Jester icons created by Freepik - Flaticon</a>
