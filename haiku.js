/***
 *  Haiku.js: generate random haiku.
 *
 *  Original code from: http://www.youhaventlived.com/haikumatic/haikum.htm
 *  Copyright (C) 2002, Richard A. Bartle <richard@mud.co.uk>
 *
 *  Modernized version
 *  Copyright (C) 2012, H. Dean Hudson <dean@ero.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
    var w, s, srq, std, vatd, ptd, vpl, uidx, used = [];

    /*** The haiku dictionary. ***
     * 
     * TODO: figure out how to keep these in seperate files for the 
     * browser.
     */
    var verb = ["abandons", 3, "aborts", 3, "abuses", 3, "accepts", 2, "accompanies", 4, "accompanied", 4, "accuses", 3, "admires", 2, "admits", 2, "admonishes", 4, "ages", 1, "agrees", 2, "awakens", 3, "awoke", 2, "allows", 2, "announces", 3, "annoys", 2, "asks", 1, "asked", 1, "assists", 2, "assures", 2, "attacks", 2, "balances", 3, "bans", 1, "beats", 1, "beat", 1, "becomes", 2, "became", 2, "beckons", 2, "beckoned", 2, "begs", 1, "begged", 1, "berates", 2, "berated", 3, "bites", 1, "bit", 1, "blooms", 1, "bloomed", 1, "blames", 1, "blamed", 1, "blows", 1, "blew", 1, "blushes", 2, "blushed", 1, "boils", 1, "boiled", 1, "bores", 1, "born", 1, "borrows", 2, "brings", 1, "brought", 1, "brushes", 2, "brushed", 2, "breaks", 1, "broke", 1, "brews", 1, "brewed", 1, "burns", 1, "buries", 2, "buys", 1, "calls", 1, "called", 1, "cancels", 2, "carresses", 3, "carressed", 2, "carries", 2, "carried", 2, "carves", 1, "castigates", 3, "catches", 1, "cought", 1, "censures", 2, "changes", 2, "chants", 1, "chanted", 2, "charms", 1, "chases", 2, "chased", 1, "chastises", 3, "cheats", 1, "chews", 1, "claps", 1, "clapped", 2, "cleans", 1, "climbs", 1, "climbed", 2, "clings", 1, "clung", 1, "collapses", 3, "comes", 1, "came", 1, "comforts", 2, "commands", 2, "commanded", 3, "commends", 2, "compliments", 3, "complimented", 4, "concurs", 2, "concurred", 2, "considers", 3, "constructs", 2, "consumes", 2, "contacts", 2, "contacted", 3, "continues", 3, "contracts", 2, "cooks", 1, "corrects", 2, "covers", 2, "covered", 2, "cracks", 1, "craves", 1, "craved", 1, "crawls", 1, "crawled", 1, "creases", 2, "cremates", 2, "cripples", 2, "croaks", 1, "croaked", 1, "crushes", 2, "cries", 1, "cried", 1, "curses", 2, "cursed", 2, "cuts", 1, "damages", 3, "dances", 2, "danced", 1, "dares", 1, "dared", 1, "dazzles", 2, "deafens", 2, "declines", 2, "declined", 2, "decreases", 3, "decreased", 2, "denies", 2, "derides", 2, "desires", 2, "destroys", 2, "detaches", 3, "detects", 2, "dies", 1, "died", 1, "digs", 1, "dug", 1, "disables", 3, "disagrees", 3, "disagreed", 3, "disbelieves", 3, "dismisses", 3, "disregards", 3, "dissolves", 2, "dissents", 2, "dissented", 3, "disturbs", 2, "distorts", 2, "dotes", 1, "doted", 2, "dozes", 2, "dozed", 2, "drains", 1, "drained", 2, "dreams", 1, "dreamt", 1, "drenches", 2, "drinks", 1, "drank", 1, "draws", 1, "drew", 1, "drops", 1, "eats", 1, "ate", 1, "embraces", 3, "embraced", 2, "emerges", 2, "enchants", 2, "encourages", 4, "enlightens", 3, "erases", 3, "erased", 2, "enters", 2, "entered", 1, "etches", 2, "etched", 1, "examines", 3, "examined", 3, "executes", 3, "expands", 2, "explodes", 2, "extinguishes", 4, "fades", 1, "favours", 2, "feeds", 1, "falls", 1, "fell", 1, "feels", 1, "fetches", 2, "fetched", 1, "fights", 1, "fought", 1, "fits", 1, "fitted", 2, "finds", 1, "flakes", 1, "flaked", 1, "flickers", 2, "flickered", 2, "flinches", 2, "flinched", 1, "flirts", 1, "flirted", 2, "floods", 1, "flooded", 2, "flourishes", 3, "flourished", 2, "flies", 1, "flew", 1, "follows", 2, "followed", 2, "forbids", 2, "forbade", 2, "forges", 2, "forgives", 2, "forgave", 2, "frowns", 1, "frowned", 1, "fumes", 1, "fumed", 1, "fusses", 2, "fussed", 1, "gapes", 1, "gaped", 1, "gathers", 2, "gazes", 2, "gazed", 1, "glances", 2, "glanced", 1, "glares", 1, "glared", 1, "gleams", 1, "gleamed", 1, "glimpses", 2, "glimpsed", 2, "gloats", 1, "gloated", 2, "glows", 1, "goes", 1, "went", 1, "grasps", 1, "grasped", 1, "grimaces", 3, "grimaced", 2, "gropes", 1, "groped", 1, "grows", 1, "grew", 1, "grumbles", 2, "grumbled", 2, "hangs", 1, "hears", 1, "heard", 1, "heeds", 1, "heeded", 2, "helps", 1, "helped", 1, "hides", 1, "hid", 1, "hits", 1, "hit", 1, "heals", 2, "holds", 1, "held", 1, "hurries", 2, "identifies", 4, "ignites", 2, "ignited", 3, "ignores", 2, "imitates", 3, "increases", 3, "increased", 2, "inserts", 2, "inserted", 3, "insists", 2, "insisted", 3, "inspects", 2, "insults", 2, "interests", 3, "interrupts", 3, "invents", 2, "invented", 3, "inverts", 2, "inverted", 3, "irritates", 3, "irritated", 4, "jeers", 1, "jeered", 1, "juggles", 2, "juggled", 2, "jumps", 1, "jumped", 1, "keeps", 1, "kills", 1, "killed", 1, "kneels", 1, "knelt", 1, "laments", 1, "laughs", 1, "laughed", 1, "leans", 1, "leant", 1, "learns", 1, "learnt", 1, "licks", 1, "licked", 2, "lifts", 1, "lifted", 2, "lines", 1, "lined", 1, "listens", 2, "listened", 2, "loathes", 1, "loans", 1, "locates", 2, "looks", 1, "looked", 1, "loses", 2, "lowers", 2, "lowered", 2, "marches", 2, "marched", 1, "marks", 1, "measures", 2, "meditates", 3, "meditated", 4, "melts", 1, "mocks", 1, "mourns", 1, "moves", 1, "nags", 1, "nagged", 1, "occupies", 3, "offends", 2, "orders", 2, "panics", 2, "parts", 1, "patronises", 4, "patronised", 3, "pauses", 2, "pecks", 1, "pecked", 1, "peeks", 1, "peeked", 1, "peers", 1, "peered", 1, "permits", 2, "perspires", 2, "perspired", 2, "pesters", 2, "picks", 1, "picked", 1, "pinches", 2, "pinched", 1, "pleases", 2, "plays", 1, "played", 1, "points", 1, "pokes", 1, "poked", 1, "ponders", 2, "pondered", 2, "poses", 2, "pounces", 2, "pounced", 1, "pours", 1, "poured", 1, "praises", 2, "prays", 1, "prayed", 1, "presses", 2, "pressed", 1, "pretends", 2, "proclaims", 2, "prods", 2, "profits", 2, "profited", 3, "protects", 2, "pulls", 1, "pulled", 1, "punches", 2, "pursues", 2, "pushes", 2, "pushed", 1, "quits", 1, "quit", 1, "quotes", 1, "raises", 2, "rattles", 2, "reads", 1, "read", 1, "reassures", 3, "rebukes", 2, "recalls", 2, "recants", 2, "recanted", 3, "recognises", 4, "recoils", 2, "recoiled", 2, "recommends", 3, "recovers", 3, "refreshes", 3, "refuses", 3, "rejects", 2, "relaxes", 3, "remembers", 3, "reminds", 2, "removes", 2, "removed", 2, "renounces", 3, "renounced", 2, "repairs", 2, "replaces", 3, "replies", 2, "replied", 2, "reports", 2, "reprimands", 3, "reproaches", 3, "rescues", 2, "reserves", 2, "resigns", 2, "rests", 1, "retaliates", 4, "retaliated", 5, "retches", 2, "retched", 1, "retreats", 2, "retreated", 3, "returns", 2, "returned", 2, "reveres", 2, "revolts", 2, "rolls", 1, "rolled", 1, "rises", 2, "rose", 1, "rubs", 1, "rubbed", 1, "runs", 1, "ran", 1, "rushes", 2, "sacrifices", 4, "sags", 1, "sagged", 1, "saves", 1, "scolds", 1, "scolded", 2, "scores", 1, "scored", 1, "screams", 1, "screamed", 1, "searches", 2, "searched", 2, "sees", 1, "saw", 1, "seethes", 1, "seethed", 1, "sells", 1, "senses", 2, "sensed", 1, "sets", 1, "shakes", 1, "shaked", 1, "shares", 1, "shelters", 2, "shines", 1, "shone", 1, "shudders", 2, "shuddered", 2, "shuffles", 2, "shuffled", 2, "shuns", 1, "shuts", 1, "sips", 1, "sipped", 1, "sits", 1, "sat", 1, "slaps", 1, "slices", 2, "slides", 1, "slid", 1, "slips", 1, "smells", 1, "smelled", 1, "snaps", 1, "snarls", 1, "snarled", 1, "sneers", 1, "sneered", 1, "sniffs", 1, "sniffed", 1, "snoozes", 2, "snoozed", 1, "snores", 1, "snored", 1, "snubs", 1, "soaks", 1, "sobs", 1, "sobbed", 1, "soothes", 1, "speaks", 1, "spoke", 1, "spins", 1, "span", 1, "spits", 1, "spat", 1, "splashes", 2, "squeezes", 2, "stabs", 1, "staggers", 2, "stains", 1, "stamps", 1, "stamped", 1, "stares", 1, "stared", 1, "starts", 1, "started", 2, "starves", 1, "steals", 1, "stimulates", 3, "stirs", 1, "stops", 1, "stretches", 2, "strikes", 1, "strips", 1, "strokes", 1, "studies", 2, "stumbles", 2, "stumbled", 2, "subdues", 2, "submits", 2, "submitted", 3, "suffers", 2, "suffered", 2, "suggests", 2, "summons", 2, "supports", 2, "surveys", 2, "surveyed", 2, "suspects", 2, "sways", 1, "swears", 1, "swore", 1, "sweats", 1, "sweated", 2, "swims", 2, "swam", 1, "talks", 1, "talked", 1, "takes", 1, "took", 1, "taps", 1, "tapped", 1, "tastes", 1, "tasted", 2, "taunts", 1, "tears", 2, "tore", 1, "teases", 2, "tells", 1, "told", 1, "tempts", 1, "terrifies", 3, "ties", 1, "thrashes", 2, "thrashed", 1, "threatens", 2, "throws", 1, "thrown", 1, "tickles", 2, "tightens", 2, "tortures", 2, "tosses", 2, "touches", 2, "trails", 1, "trailed", 1, "transports", 2, "travels", 2, "travelled", 2, "trembles", 2, "trembled", 2, "trips", 1, "tripped", 1, "trots", 1, "trotted", 2, "turns", 1, "turned", 1, "understands", 3, "updates", 2, "uproots", 2, "uses", 2, "used", 1, "using", 2, "venerates", 3, "views", 1, "vows", 1, "vowed", 1, "wails", 1, "wailed", 1, "waits", 1, "waited", 2, "walks", 1, "walked", 1, "wanders", 2, "wandered", 2, "warns", 1, "warned", 2, "washes", 2, "watches", 2, "waves", 1, "wavers", 2, "wavered", 2, "wears", 1, "weaves", 1, "wove", 1, "weeps", 1, "wept", 1, "welcomes", 2, "welcomed", 2, "whines", 1, "whined", 1, "whispers", 2, "wins", 1, "won", 1, "winces", 2, "winces", 2, "winks", 1, "winked", 1, "wipes", 1, "withdraws", 2, "withdrew", 2, "works", 1, "worked", 1, "worships", 2, "writhes", 1, "writhed", 1, "yawns", 1, "yawned", 1];
    var verbadj = ["abandoning", 4, "abandoned", 3, "aborting", 3, "aborted", 3, "abusing", 3, "abused", 2, "accepting", 3, "accepted", 3, "accompanying", 4, "accusing", 3, "accused", 2, "admiring", 3, "admired", 2, "admitting", 3, "admitted", 3, "admonishing", 4, "admonished", 3, "aging", 2, "aged", 1, "agreed", 2, "agreeing", 3, "allowing", 3, "allowed", 2, "announcing", 3, "announced", 2, "annoying", 3, "annoyed", 2, "asking", 2, "assisting", 3, "assisted", 3, "assuring", 3, "assured", 2, "attacking", 3, "attacked", 2, "awakening", 4, "awoken", 3, "balancing", 3, "balanced", 2, "banning", 2, "banned", 1, "beating", 2, "beaten", 2, "becoming", 3, "beckoning", 3, "begging", 2, "berating", 2, "biting", 2, "bitten", 2, "blaming", 2, "blooming", 2, "bloomed", 1, "blowing", 2, "blown", 1, "blushing", 2, "boiling", 2, "boring", 2, "bored", 1, "borrowing", 3, "borrowed", 2, "breaking", 2, "broken", 2, "brewing", 2, "brushing", 2, "burning", 2, "burnt", 1, "buried", 2, "bought", 1, "bringing", 2, "buying", 2, "calling", 2, "cancelling", 3, "cancelled", 2, "caressing", 3, "carrying", 3, "carving", 2, "carved", 1, "castigating", 4, "castigated", 4, "catching", 2, "censuring", 3, "censured", 2, "changing", 2, "changed", 1, "chanting", 2, "charming", 2, "charmed", 1, "chasing", 2, "chastising", 3, "chastised", 2, "cheating", 2, "cheated", 2, "chewing", 2, "chewed", 1, "clapping", 2, "cleaning", 2, "cleaned", 1, "climbing", 2, "clinging", 2, "collapsing", 3, "collapsed", 2, "coming", 2, "comforting", 3, "comforted", 3, "commanding", 3, "commending", 3, "commended", 3, "complimenting", 4, "concurring", 3, "considering", 4, "considered", 3, "constructing", 3, "constructed", 3, "consuming", 3, "consumed", 2, "contacting", 3, "continuing", 4, "continued", 3, "contracting", 3, "contracted", 3, "cooking", 2, "cooked", 1, "correcting", 3, "corrected", 3, "covering", 3, "covered", 2, "cracking", 2, "cracked", 1, "craving", 2, "craven", 2, "crawling", 2, "creasing", 2, "creased", 1, "cremating", 3, "cremated", 3, "crippling", 2, "crippled", 2, "croaking", 2, "crushing", 2, "crushed", 1, "crying", 2, "cursing", 2, "accursed", 3, "cutting", 2, "cut", 1, "damaging", 3, "damaged", 2, "dancing", 2, "daring", 2, "dazzling", 2, "dazzled", 2, "deafening", 3, "deafened", 2, "declining", 3, "decreasing", 3, "denying", 3, "denied", 2, "deriding", 3, "derided", 3, "desiring", 3, "desired", 3, "destroying", "destroyed", "detaching", 3, "detached", 2, "detecting", 3, "detected", 3, "dying", 2, "digging", 2, "disabling", 3, "disabled", 3, "disagreeing", 4, "disbelieving", 4, "disbelieved", 3, "dismissing", 3, "dismissed", 2, "disregarding", 4, "dissolving", 3, "dissolved", 2, "dissenting", 3, "disturbing", 3, "disturbed", 2, "distorting", 3, "distorted", 3, "doting", 2, "dozing", 2, "drained", 1, "drawing", 2, "drawn", 1, "dreaming", 2, "drenching", 2, "drenched", 1, "drinking", 2, "dropping", 2, "dropped", 1, "embracing", 3, "emerging", 2, "emerged", 2, "eating", 2, "enchanting", 3, "enchanted", 3, "encouraging", 4, "encouraged", 3, "enlightening", 4, "enlightened", 3, "erasing", 3, "entering", 3, "etching", 2, "examining", 4, "executing", 4, "executed", 4, "expanding", 3, "expanded", 3, "exploding", 3, "exploded", 3, "extinguishing", 4, "extinguished", 3, "fading", 2, "faded", 2, "falling", 2, "fallen", 2, "favouring", 3, "favoured", 2, "feeding", 2, "fed", 1, "feeling", 2, "felt", 1, "fetching", 2, "fighting", 2, "fitting", 2, "finding", 2, "found", 1, "flaking", 2, "flickering", 3, "flinching", 2, "flirting", 2, "flooding", 2, "flourishing", 3, "flying", 2, "flown", 1, "following", 3, "forbidding", 3, "forbidden", 3, "forging", 2, "forged", 1, "forgiving", 3, "forgiven", 3, "frowning", 2, "fuming", 2, "fussing", 2, "gaping", 2, "gathering", 3, "gathered", 2, "gazing", 2, "glancing", 2, "glaring", 2, "gleaming", 2, "glimpsing", 2, "gloating", 2, "glowing", 2, "going", 2, "gone", 1, "grasping", 2, "grimacing", 3, "groping", 2, "growing", 2, "grown", 1, "grumbling", 2, "hanging", 2, "hung", 1, "healing", 2, "healed", 2, "hearing", 2, "heeding", 2, "helping", 2, "hiding", 2, "hidden", 2, "hitting", 2, "holding", 2, "hurrying", 3, "hurried", 2, "identifying", 5, "identified", 4, "igniting", 3, "ignoring", 3, "ignored", 2, "imitating", 4, "imitated", 4, "increasing", 3, "inserting", 3, "insisting", 3, "insistent", 3, "inspecting", 3, "inspected", 3, "insulting", 3, "insulted", 3, "identifying", 5, "identified", 4, "interesting", 4, "interested", 4, "interrupting", 4, "interrupted", 4, "inventing", 3, "inverting", 3, "irritating", 4, "jeering", 2, "juggling", 2, "jumping", 2, "keeping", 2, "kept", 1, "killing", 2, "kneeling", 2, "lamenting", 3, "lamented", 3, "laughing", 2, "leaning", 2, "learning", 2, "leaving", 2, "licking", 2, "lifting", 2, "lining", 2, "listening", 2, "loathing", 2, "loathed", 1, "loaning", 2, "loaned", 1, "locating", 3, "located", 3, "looking", 2, "losing", 2, "lost", 1, "lowering", 3, "marching", 1, "marking", 2, "marked", 1, "measuring", 3, "measured", 2, "meditating", 4, "melting", 2, "melted", 2, "mocking", 2, "mocked", 1, "mourning", 2, "mourned", 1, "moving", 2, "moved", 1, "nagging", 2, "occupying", 4, "occupied", 3, "offending", 3, "offended", 3, "ordering", 3, "ordered", 2, "panicking", 3, "panicked", 2, "parting", 2, "parted", 2, "patronising", 4, "pausing", 2, "paused", 1, "pecking", 2, "peeking", 2, "peering", 2, "permitting", 3, "permitted", 3, "perspiring", 3, "picking", 2, "pinching", 2, "playing", 2, "pointed", 2, "pleasing", 2, "pleased", 2, "pointing", 2, "poking", 2, "pondering", 3, "posing", 2, "posed", 1, "pouncing", 2, "pouring", 2, "praising", 2, "praised", 1, "praying", 2, "pressing", 2, "pretending", 3, "pretended", 3, "proclaiming", 3, "proclaimed", 2, "prodding", 2, "prodded", 2, "profiting", 3, "protecting", 3, "protected", 3, "pulling", 2, "punching", 2, "punched", 1, "pursuing", 3, "pursued", 2, "pushing", 2, "putting away", 4, "quitting", 2, "quoting", 2, "quoted", 2, "raising", 2, "rattling", 2, "reading", 1, "reassuring", 4, "reassured", 3, "rebuking", 3, "rebuked", 2, "recalling", 3, "recalled", 2, "recanting", 3, "recognising", 4, "recognised", 3, "recoiling", 3, "recommending", 4, "recommended", 4, "recovering", 4, "recovered", 3, "refreshing", 3, "refreshed", 2, "refusing", 3, "refused", 2, "rejecting", 3, "rejected", 3, "relaxing", 3, "relaxed", 2, "remembering", 4, "remembered", 3, "reminding", 3, "reminded", 2, "removing", 3, "renouncing", 3, "repairing", 3, "repaired", 2, "replacing", 3, "replaced", 2, "replying", 3, "reporting", 3, "reported", 3, "reprimanding", 4, "reprimanded", 4, "reproaching", 3, "reproached", 2, "rescuing", 3, "rescued", 2, "reserving", 3, "reserved", 2, "resigning", 3, "resigned", 2, "resting", 2, "rested", 2, "retaliating", 5, "retching", 2, "retreating", 3, "returning", 3, "revering", 3, "revered", 2, "revolting", 3, "revolted", 3, "rising", 2, "risen", 2, "rolling", 2, "rubbing", 2, "running", 2, "rushing", 2, "rushed", 1, "sacrificing", 4, "sacrificed", 3, "sagging", 2, "saving", 2, "saved", 1, "scolding", 2, "scoring", 2, "screaming", 2, "searching", 2, "seeing", 2, "seen", 1, "seething", 2, "selling", 2, "sold", 1, "senses", 2, "setting", 1, "set", 1, "shaking", 2, "shaken", 2, "sharing", 2, "shared", 1, "sheltering", 3, "sheltered", 2, "shining", 2, "shuddering", 2, "shuffling", 2, "shunning", 2, "shunned", 1, "shutting", 2, "shut", 1, "sipping", 2, "sitting", 2, "seated", 2, "slapping", 2, "slapped", 2, "slicing", 2, "sliced", 1, "sliding", 2, "slipping", 2, "slips", 1, "smelling", 2, "snapping", 2, "snapped", 1, "snarling", 2, "sneering", 2, "sniffing", 2, "snoozing", 2, "snoring", 2, "snubbing", 2, "snubbed", 1, "soaking", 2, "soaked", 1, "sobbing", 2, "soothing", 2, "soothed", 1, "speaking", 2, "spoken", 2, "spinning", 2, "spun", 1, "spitting", 2, "splashing", 2, "splashed", 1, "squeezing", 2, "squeezed", 1, "stabbing", 2, "stabbed", 1, "staggering", 3, "staggered", 2, "staining", 2, "stained", 1, "stamping", 2, "staring", 2, "starting", 2, "starving", 2, "starved", 1, "stealing", 2, "stolen", 2, "stimulating", 4, "stimulated", 4, "stirring", 2, "stirred", 1, "stopping", 2, "stopped", 1, "stretching", 2, "stretched", 1, "striking", 2, "struck", 1, "stripping", 2, "stripped", 1, "stroking", 2, "stroked", 1, "studying", 3, "studied", 2, "stumbling", 2, "subduing", 3, "subdued", 2, "submitting", 3, "suffering", 3, "suggesting", 3, "suggested", 3, "summoning", 3, "summoned", 2, "supporting", 3, "supported", 3, "surveying", 3, "suspecting", 3, "suspected", 3, "swaying", 2, "swayed", 1, "swearing", 2, "sworn", 1, "sweating", 2, "swimming", 2, "taking", 2, "taken", 2, "talking", 2, "tapping", 2, "tasting", 2, "taunting", 2, "taunted", 2, "tearing", 2, "torn", 1, "teasing", 2, "teased", 1, "telling", 2, "tempting", 2, "tempted", 2, "terrifying", 4, "terrified", 3, "thrashing", 2, "threatening", 3, "threatened", 2, "throwing", 2, "tickling", 2, "tickled", 2, "tying", 2, "tied", 1, "tightening", 3, "tightened", 2, "torturing", 3, "tortured", 2, "tossing", 2, "tossed", 1, "touching", 2, "touched", 1, "trailing", 2, "transporting", 3, "transported", 3, "travelling", 3, "trembling", 2, "tripping", 2, "trotting", 2, "turning", 2, "turned", 1, "understanding", 4, "understood", 3, "updating", 3, "updated", 3, "uprooting", 3, "uprooted", 3, "venerating", 4, "venerated", 4, "viewing", 2, "viewed", 1, "vowing", 2, "wailing", 2, "waiting", 2, "walking", 2, "wandering", 3, "warning", 2, "washing", 2, "washed", 1, "watching", 2, "watched", 1, "waving", 2, "waved", 1, "wavering", 3, "wearing", 2, "worn", 1, "weaving", 2, "woven", 2, "weeping", 2, "welcoming", 3, "whining", 2, "whispering", 3, "whispered", 2, "winning", 2, "wincing", 2, "winking", 2, "wiping", 2, "withdrawing", 3, "withdrawn", 2, "wiped", 2, "working", 2, "worshipping", 2, "worshipped", 2, "writhing", 2, "yawning", 2];
    var prep = ["about", 2, "above", 2, "across", 2, "after", 2, "at", 1, "before", 2, "behind", 2, "below", 2, "beside", 2, "between", 2, "beyond", 2, "by", 1, "for", 1, "from", 1, "in", 1, "inside", 2, "of", 1, "on", 1, "onto", 2, "outside", 2, "over", 2, "past", 1, "through", 1, "under", 2, "with", 1, "without", 2];
    var season = ["ant", 1, "autumn", 2, "bean", 1, "bee", 1, "berry", 2, "blossom", 2, "bronze", 1, "bud", 1, "brown", 1, "carrot", 1, "cherry", 2, "clam", 1, "copper", 2, "corn", 1, "frog", 1, "frost", 1, "gold", 1, "green", 1, "harvest", 2, "haze", 1, "ice", 1, "icicle", 3, "owl", 1, "lamb", 1, "land", 1, "mist", 1, "moon", 1, "nut", 1, "oyster", 3, "rainbow", 2, "red", 1, "rice", 1, "russet", 2, "rust", 1, "salmon", 2, "seed", 1, "silver", 2, "sparrow", 2, "spring", 1, "springtime", 2, "snow", 1, "storm", 1, "summer", 2, "summertime", 3, "sunflower", 3, "thunder", 2, "warmth", 1, "white", 1, "winter", 2];
    var noun = ["acacia", 4, "acorn", 2, "actor", 2, "affection", 3, "air", 1, "amethyst", 3, "ancestor", 3, "animal", 3, "anvil", 2, "answer", 2, "ape", 1, "apology", 4, "apron", 2, "arc", 1, "arch", 1, "arm", 1, "armour", 2, "arrow", 1, "attachment", 3, "award", 2, "baby", 2, "bag", 1, "ball", 1, "barrier", 3, "basket", 2, "bay", 1, "beach", 1, "bear", 1, "beetle", 2, "belief", 2, "bell", 1, "belly", 2, "belt", 1, "birth", 1, "blade", 1, "blanket", 2, "blizzard", 2, "block", 1, "blood", 1, "boat", 1, "body", 2, "bone", 1, "book", 1, "boot", 1, "bottle", 2, "bough", 1, "boundary", 2, "bowl", 1, "box", 1, "boy", 1, "bracelet", 2, "branch", 1, "bread", 1, "breast", 1, "breath", 1, "briar", 2, "bride", 1, "bridge", 1, "brook", 1, "broth", 1, "brother", 2, "bruise", 1, "bucket", 2, "buckle", 2, "bundle", 1, "butterfly", 3, "cage", 1, "cake", 1, "calf", 1, "candle", 2, "cannon", 2, "cape", 1, "captain", 2, "card", 1, "carp", 1, "casket", 2, "castle", 2, "cart", 1, "cat", 1, "cave", 1, "cedar", 2, "celebration", 4, "chain", 1, "chair", 1, "chance", 1, "change", 1, "character", 3, "chart", 1, "chest", 1, "child", 1, "chime", 1, "chrysalis", 3, "chicken", 2, "circle", 2, "city", 2, "cliff", 1, "cloak", 1, "cloth", 1, "cloud", 1, "clover", 2, "club", 1, "cluster", 2, "coal", 1, "coat", 1, "coffin", 2, "coin", 1, "collection", 3, "colour", 2, "comb", 1, "compass", 1, "compliment", 3, "confession", 3, "confetti", 3, "container", 3, "conversation", 4, "corpse", 1, "coral", 2, "crab", 1, "creator", 3, "creature", 2, "cross", 1, "crow", 1, "crowd", 1, "crown", 1, "crypt", 1, "crystal", 2, "country", 2, "cup", 1, "cure", 1, "daisy", 2, "dagger", 2, "date", 1, "daughter", 2, "death", 1, "deity", 3, "demon", 2, "deposit", 3, "desert", 2, "desire", 2, "despair", 2, "destiny", 3, "diagnosis", 4, "direction", 3, "dish", 1, "dog", 1, "doll", 1, "door", 1, "dough", 1, "dove", 1, "drain", 1, "drawer", 1, "dress", 1, "drizzle", 2, "drum", 1, "eagle", 2, "ear", 2, "earth", 1, "egg", 1, "enamel", 3, "enemy", 3, "entrance", 2, "ewe", 1, "excuse", 2, "exit", 2, "experience", 4, "eye", 1, "face", 1, "fan", 1, "farm", 1, "farmer", 2, "father", 2, "feather", 2, "fence", 1, "festival", 3, "field", 1, "finger", 2, "firework", 3, "flail", 1, "flame", 1, "flour", 2, "flower", 2, "foe", 1, "fog", 1, "food", 1, "foot", 1, "force", 1, "forest", 1, "fork", 1, "fossil", 2, "fountain", 2, "fox", 1, "fruit", 1, "fungus", 2, "fur", 1, "gale", 1, "gas", 1, "gate", 1, "gauze", 1, "gem", 1, "generation", 4, "gesture", 2, "gift", 1, "girl", 1, "glade", 1, "glass", 1, "glory", 2, "goat", 1, "goblet", 2, "god", 1, "grain", 1, "grandfather", 3, "grandmother", 3, "granite", 2, "grape", 1, "grass", 1, "grasshopper", 3, "grave", 1, "gravestone", 2, "graveyard", 2, "greeting", 2, "groom", 1, "guest", 1, "gunpowder", 3, "hair", 1, "half", 1, "hall", 1, "hammer", 2, "hand", 1, "harmony", 2, "hat", 1, "hay", 1, "head", 1, "heart", 1, "heat", 1, "heaven", 2, "helmet", 2, "herb", 1, "hermit", 1, "hero", 2, "heroine", 3, "hill", 1, "hint", 1, "hip", 1, "hole", 1, "home", 1, "honey", 2, "honour", 2, "horn", 1, "horse", 1, "house", 1, "hug", 1, "hut", 1, "idea", 3, "incense", 2, "ink", 1, "insect", 2, "instrument", 3, "invitation", 4, "island", 2, "ivy", 2, "jar", 1, "jasmine", 2, "jewel", 2, "journey", 2, "key", 1, "king", 1, "kiss", 1, "knife", 1, "knuckle", 2, "lacquer", 2, "ladder", 2, "lake", 1, "lamp", 1, "lantern", 2, "larch", 1, "latch", 1, "leaf", 1, "leap", 1, "leg", 1, "legend", 2, "lightning", 1, "lily", 2, "lip", 1, "litter", 2, "lizard", 2, "load", 1, "lock", 1, "locket", 2, "log", 1, "longevity", 4, "lotus", 2, "lover", 2, "maiden", 2, "mallet", 2, "man", 1, "map", 1, "market", 2, "marsh", 1, "mat", 1, "matter", 2, "meadow", 2, "meal", 1, "meat", 1, "member", 2, "memory", 3, "message", 2, "milk", 1, "mind", 1, "mint", 1, "mirror", 2, "money", 2, "monk", 1, "monkey", 2, "monster", 2, "mortar", 2, "moss", 1, "moth", 1, "mother", 2, "mound", 1, "mouse", 1, "mouth", 1, "muscle", 2, "mushroom", 2, "music", 2, "nail", 1, "neck", 1, "necklace", 2, "needle", 2, "net", 1, "none", 1, "noose", 1, "nose", 1, "novice", 2, "nowhere", 2, "oak", 1, "object", 2, "ocean", 2, "orchard", 2, "orchid", 2, "ore", 1, "ornament", 3, "other", 2, "oval", 2, "ox", 1, "paddle", 2, "painting", 2, "palace", 2, "palm", 1, "parent", 2, "pastry", 2, "pasture", 2, "patch", 1, "path", 1, "pattern", 2, "peach", 1, "pear", 1, "pebble", 2, "peel", 1, "perfume", 2, "person", 2, "pet", 1, "petal", 2, "phoenix", 2, "picture", 2, "piece", 1, "pig", 1, "pilgrim", 2, "pillar", 2, "pine", 1, "pit", 1, "place", 1, "plan", 1, "plant", 1, "plate", 1, "plum", 1, "pocket", 2, "poem", 2, "poison", 2, "pond", 1, "pony", 2, "pool", 1, "poppy", 2, "porcelain", 3, "portrait", 2, "possession", 3, "pot", 1, "powder", 2, "prawn", 1, "prayer", 1, "price", 1, "proof", 1, "prophet", 2, "proposal", 3, "protector", 3, "protest", 2, "prune", 1, "pupil", 2, "puzzle", 2, "queen", 1, "question", 2, "rabbit", 2, "raft", 1, "rain", 1, "raindrop", 2, "ram", 1, "rank", 1, "rat", 1, "raven", 2, "reed", 1, "relic", 2, "reptile", 2, "ribbon", 2, "ridge", 1, "ring", 1, "river", 2, "road", 1, "rock", 1, "room", 1, "ruler", 2, "road", 1, "rock", 1, "rose", 1, "sack", 1, "saddle", 2, "sail", 1, "sanctuary", 4, "scholar", 2, "school", 1, "scorpion", 3, "screen", 1, "scythe", 1, "sea", 1, "serpent", 2, "servant", 2, "shaft", 1, "shawl", 1, "shell", 1, "shield", 1, "shoe", 1, "shovel", 2, "shower", 2, "shrew", 1, "shrimp", 1, "shroud", 1, "shrub", 1, "sign", 1, "sight", 1, "sister", 1, "skeleton", 3, "skin", 1, "skull", 1, "sky", 1, "smile", 1, "smith", 1, "smoke", 1, "snake", 1, "soldier", 2, "someone", 2, "something", 2, "son", 1, "song", 1, "someone", 1, "something", 2, "somewhere", 2, "soot", 1, "sorcerer", 3, "sorceress", 3, "soul", 1, "sound", 1, "soup", 1, "sovereign", 2, "spade", 1, "spear", 2, "speck", 1, "spectre", 2, "speed", 1, "spell", 1, "spice", 1, "spider", 2, "spoon", 1, "square", 1, "squirrel", 2, "staff", 1, "statue", 2, "stick", 1, "stillness", 2, "steam", 1, "stone", 1, "stool", 1, "store", 1, "stork", 1, "story", 2, "straw", 1, "stream", 1, "street", 1, "sunrise", 2, "sunset", 2, "surf", 1, "survivor", 3, "swamp", 1, "swan", 1, "sword", 1, "table", 2, "target", 2, "task", 1, "taste", 1, "tea", 1, "temper", 2, "temple", 2, "thief", 1, "thigh", 1, "thorn", 1, "thought", 1, "thread", 1, "throne", 1, "thumb", 1, "title", 2, "tomb", 1, "tombstone", 2, "tongue", 1, "tool", 1, "tooth", 1, "topaz", 2, "tower", 2, "toy", 1, "track", 1, "traveller", 2, "treasure", 2, "tree", 1, "trench", 1, "trophy", 2, "trunk", 1, "trust", 1, "tune", 1, "tunnel", 1, "urge", 1, "value", 2, "valve", 1, "vapour", 2, "vegetable", 3, "veil", 1, "vermin", 2, "vessel", 2, "view", 1, "village", 2, "virtue", 2, "volcano", 3, "volunteer", 3, "wall", 1, "warrior", 3, "wax", 1, "weapon", 2, "weather", 2, "weed", 1, "weight", 1, "wheat", 1, "wheel", 1, "wicker", 2, "wine", 1, "wisteria", 3, "wasp", 1, "way", 1, "web", 1, "wedding", 2, "well", 1, "whale", 1, "window", 2, "wine", 1, "wish", 1, "wolf", 1, "woman", 2, "womb", 1, "word", 1, "world", 1, "worm", 1, "worry", 2, "year", 1, "yew", 1];
    var nounadj = ["afternoon", 3, "air", 1, "alabaster", 4, "almond", 2, "amber", 2, "antique", 2, "back", 1, "bamboo", 2, "bedroom", 2, "beginning", 3, "carving", 2, "clay", 1, "cold", 1, "cross", 1, "dark", 1, "day", 1, "dead", 1, "diamond", 2, "emerald", 3, "enamel", 3, "end", 1, "evening", 2, "exterior", 4, "fat", 1, "fire", 2, "fluid", 1, "front", 1, "garden", 2, "ghost", 1, "giant", 2, "ginger", 2, "glass", 1, "harbour", 2, "immortal", 3, "interior", 4, "iron", 2, "ivory", 3, "jade", 1, "kitchen", 2, "leather", 2, "light", 1, "liquid", 1, "left", 1, "magic", 2, "marble", 2, "metal", 1, "middle", 2, "midnight", 2, "morning", 2, "mortal", 2, "mountain", 2, "night", 1, "noble", 2, "noon", 1, "nothing", 2, "one", 1, "onyx", 2, "opal", 2, "orange", 2, "paper", 2, "pearl", 2, "pot", 1, "principle", 3, "public", 2, "quartz", 1, "right", 1, "rogue", 1, "root", 1, "ruby", 1, "salt", 1, "sapphire", 2, "secret", 2, "shadow", 2, "side", 1, "silk", 1, "solid", 2, "spirit", 2, "stable", 2, "star", 1, "sun", 1, "terracotta", 4, "time", 1, "velvet", 2, "violet", 2, "willow", 2, "water", 2, "wind", 1];
    var adj = ["aloof", 2, "ancient", 2, "angry", 2, "appetising", 4, "athletic", 3, "auspicious", 3, "bald", 1, "bearded", 3, "beautiful", 3, "benign", 2, "best", 1, "big", 1, "bitter", 2, "black", 1, "blind", 1, "blue", 1, "blunt", 1, "boastful", 2, "bright", 1, "broad", 1, "bubbling", 2, "bushy", 2, "busy", 2, "calm", 1, "central", 2, "ceremonial", 5, "chaste", 1, "cheap", 1, "cheerful", 2, "cheerless", 2, "clean", 1, "clear", 1, "clumsy", 2, "coastal", 2, "comical", 3, "common", 2, "complete", 2, "cool", 1, "crafted", 2, "crimson", 2, "crisp", 1, "crude", 1, "cruel", 2, "curious", 3, "dangerous", 3, "deadly", 2, "deaf", 1, "dear", 2, "decorative", 3, "deep", 1, "deformed", 2, "delicate", 3, "delicious", 3, "delightful", 3, "dignified", 3, "dim", 1, "dirty", 2, "dishonest", 3, "disrespectful", 4, "disunited", 2, "disused", 2, "divine", 2, "drab", 1, "dry", 1, "dusty", 2, "early", 2, "earthen", 2, "elegant", 3, "empty", 2, "enormous", 3, "enslaved", 2, "entire", 2, "envious", 3, "even", 2, "every", 2, "evil", 2, "expensive", 3, "exquisite", 3, "external", 3, "fabulous", 3, "faint", 1, "fair", 1, "false", 1, "fancy", 2, "fast", 1, "fearful", 3, "ferocious", 3, "fine", 1, "fishy", 2, "fit", 1, "flawed", 1, "flawless", 2, "fragile", 2, "foolish", 2, "fortunate", 3, "free", 1, "fresh", 1, "fragrant", 2, "friendly", 2, "frilly", 2, "full", 1, "gaunt", 1, "gentle", 2, "gloomy", 2, "gnarled", 2, "good", 1, "gorgeous", 2, "great", 1, "grey", 1, "grotesque", 2, "guilty", 2, "happy", 2, "hard", 1, "healthy", 2, "heavy", 2, "hideous", 3, "high", 1, "hollow", 2, "honest", 2, "hooked", 1, "hot", 1, "huge", 1, "hungry", 2, "idle", 2, "ill", 1, "imaginary", 5, "immense", 2, "imperfect", 3, "impressive", 3, "inauspicious", 3, "incomplete", 3, "indigo", 3, "inelegant", 4, "inferior", 4, "inner", 2, "innocent", 3, "insincere", 3, "intelligent", 4, "intricate", 3, "internal", 3, "invisible", 4, "joint", 1, "joke", 1, "joyful", 1, "just", 1, "kind", 1, "lacy", 2, "late", 1, "lifelike", 2, "limp", 1, "lithe", 1, "little", 2, "lone", 1, "lonely", 2, "long", 1, "loose", 1, "lucky", 2, "mad", 1, "majestic", 3, "malignant", 3, "massive", 2, "menacing", 3, "mighty", 2, "mild", 1, "miniature", 3, "misshapen", 3, "modern", 2, "modest", 2, "mouldy", 2, "mundane", 2, "murderous", 3, "murky", 2, "musty", 2, "mysterious", 4, "mystical", 3, "narrow", 2, "nasty", 2, "neat", 1, "new", 1, "next", 1, "nice", 1, "normal", 2, "observant", 3, "odd", 1, "oily", 1, "old", 1, "opaque", 2, "open", 2, "oppressive", 3, "ornamental", 4, "ornate", 2, "outer", 2, "partial", 2, "peaceful", 2, "perfect", 2, "persuasive", 3, "pewter", 2, "pink", 1, "pitiful", 3, "placid", 2, "plain", 1, "pleasing", 2, "plucky", 2, "poor", 1, "powerful", 3, "powerless", 3, "precious", 2, "pretty", 2, "previous", 3, "progressive", 3, "prompt", 1, "proud", 1, "prying", 2, "quick", 1, "radiant", 3, "random", 2, "rare", 1, "real", 1, "recent", 2, "regal", 2, "resentful", 3, "respectful", 4, "rich", 1, "rickety", 3, "ripe", 1, "rocky", 2, "rough", 1, "round", 1, "sad", 1, "safe", 1, "sandy", 2, "savage", 2, "scarlet", 2, "scented", 2, "scratched", 1, "sedate", 2, "sepia", 3, "serene", 2, "severe", 2, "shaggy", 2, "shameful", 2, "sharp", 1, "short", 1, "silent", 2, "simple", 2, "sincere", 2, "single", 2, "slate", 1, "sleek", 1, "slimy", 2, "slithering", 3, "slow", 1, "small", 1, "smooth", 1, "snug", 1, "soft", 1, "sorrowful", 3, "sour", 1, "special", 2, "spiral", 2, "splendid", 2, "stale", 1, "still", 1, "strange", 1, "strong", 1, "sturdy", 2, "succulent", 3, "superior", 4, "suspicious", 3, "sweet", 1, "symbolic", 3, "tall", 1, "tame", 1, "tarnished", 2, "tender", 2, "thankful", 2, "thick", 1, "thin", 1, "tidy", 2, "tiny", 1, "traditional", 4, "translucent", 3, "true", 1, "turbulent", 3, "ugly", 2, "unimpressive", 3, "unfortunate", 4, "undignified", 4, "undreamt", 2, "unfair", 2, "unfit", 2, "unique", 2, "united", 2, "unjust", 1, "unkind", 2, "unripe", 2, "untidy", 3, "upright", 1, "useful", 2, "useless", 2, "vacant", 2, "verbose", 2, "vicious", 2, "virtual", 3, "visible", 3, "warlike", 2, "wet", 1, "weak", 1, "wealthy", 2, "whole", 1, "whore", 1, "wide", 1, "wild", 1, "wise", 1, "wooden", 1, "worst", 1, "worthless", 2, "wrought", 1, "yellow", 2, "young", 1];
    var quant = ["each", 1, "every", 2, "her", 1, "his", 1, "its", 1, "no", 1, "some", 1, "that", 1, "their", 1, "this", 1];
    var conj = ["although", 2, "always", 2, "as", 1, "and", 1, "because", 2, "but", 1, "farewell,", 2, "forever", 3, "goodbye,", 2, "hello,", 2, "how", 1, "instead,", 2, "later,", 2, "never", 2, "no,", 1, "not", 1, "or", 1, "rather,", 2, "so", 1, "somehow", 2, "then", 1, "though", 1, "together,", 3, "unless", 2, "until", 2, "what", 1, "when", 1, "where", 1, "yes,", 1, "yet", 1];


    /*** Functions ***
     *
     * TODO: Doco
     */
    var rnd = function (n) {
        return Math.floor(Math.random() * n);
    }


    var div = function (x, y) {
        return Math.floor(x / y);
    }


    var word = function (arr) {
        return rnd(arr.length / 2);
    }


    var syl = function (arr, wd) {
        return arr[2 * wd + 1];
    }


    var text = function (arr) {
        return arr[2 * w];
    }


    var select = function (arr, l) {
        while ((w = word(arr)) != -1) {
            if ((s = syl(arr, w)) <= l) {
                var b = true;
                for (var i = 0; i < uidx; ++i) {
                    if (used[i * 2] == w && used[i * 2 + 1] == arr) {
                        b = false;
                        break;
                    }
                }
                if (b) {
                    used[2 * uidx] = w;
                    used[2 * uidx++ + 1] = arr;
                    break;
                }
            }
        }
        if (arr == season) {
            srq = std = false;
        } else if (arr == verbadj) {
            vatd = false;
        }
    }


    var vp = function (l, va) {
        var t;
        var c = "";
        var arr = va || rnd(3) == 0 ? verbadj : verb;
        if (l >= 4 && vpl && rnd(2) == 0) {
            select(conj, l);
            l -= s;
            c = text(conj) + " ";
        }
        select(arr, l);
        l -= s;
        t = c + text(arr);
        if (l > 0) {
            t += l == 1 || rnd(2) == 0 ? " " + np(l) : " " + pp(l);
        }
        vpl = true;
        return t;
    }


    var pp = function (l) {
        vpl = false;
        select(prep, l - 1);
        return text(prep) + " " + np(l - s);
    }


    var np = function (l) {
        var t;
        var arr = rnd(3) == 0 ? nounadj : rnd(4) == 0 && std ? season : noun;
        var u = false;
        vpl = false;
        select(arr, l);
        l -= s;
        t = text(arr);
        if (l > 0 && rnd(2) == 0) {
            arr = rnd(4) == 0 && vatd ? verbadj : rnd(3) == 0 ? nounadj : rnd(2) == 0 && ptd ? noun : adj;
            select(arr, l);
            l -= s;
            t = text(arr) + (arr == noun ? "'s " : " ") + t;
            u = true;
            if (ptd && arr == noun) {
                ptd = false;
            }
        }
        if (l >= 2 + rnd(2)) {
            t += " " + (rnd(2) == 1 ? vp(l, true) : pp(l));
        } else {
            while (l > 0) {
                if (l == 1) {
                    if (rnd(2) == 0) {
                        t = "the " + t;
                        break;
                    } else {
                        select(quant, l);
                        t = text(quant) + " " + t;
                        break;
                    }
                } else {
                    select(adj, l);
                    l -= s;
                    t = text(adj) + (u ? ", " : " ") + t;
                    u = true;
                }
            }
        }
        return t;
    }


    var line = function (l, ssn) {
        vatd = true;
        if (ssn && srq) {
            vpl = false;
            select(season, l);
            l -= s;
            t = text(season);
            if (l >= 2) {
                t += " " + (rnd(2) == 0 ? vp(l, true) : pp(l));
            } else if (l > 0) {
                select(adj, l);
                t = text(adj) + " " + t;
            }
        } else {
            t = rnd(l + 2) < 2 || rnd(3) == 0 ? np(l) : rnd(2) == 0 ? vp(l, false) : pp(l);
        }
        return t;
    }

    var ucfirst = function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    var haiku = function (l1, l2, l3, s) {
        var now = new Date;
        var h1, h2, h3;
        uidx = 0;
        std = true;
        vpl = false;
        return (h1 = ucfirst(line(l1, false))) + "\n" 
            + (h2 = ucfirst(line(l2, false))) + "\n" + 
            (h3 = ucfirst(line(l3, s)));
    }


    var trad = function () {
        ptd = false;
        return haiku(5, 7, 5, srq = true);
    }


    var modern = function () {
        ptd = true;
        return haiku(2 + rnd(4), 2 + rnd(4) + rnd(3), 2 + rnd(4), srq = false);
    }

    // Export in node land.
    if (exports !== 'undefined') {
        exports.modern = modern;
        exports.trad   = trad;
    } 

    return { modern: modern, trad: trad };
})();