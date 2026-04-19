export interface TriviaEntry {
	id: string;
	term: string;
	language: 'en' | 'de' | 'ch';
	meaning: string;
	example: string;
	giphySearchTerm: string;
	trivia?: string;
}

export const triviaDatabase: TriviaEntry[] = [
	// English slang
	{
		id: 'shotgun',
		term: 'Shotgun',
		language: 'en',
		meaning: 'Calling dibs on the front passenger seat of a car. Must be said when the car is in sight.',
		example: '"Shotgun!" yelled Mike as they walked towards the car.',
		giphySearchTerm: 'car front seat'
	},
	{
		id: 'no-cap',
		term: 'No Cap',
		language: 'en',
		meaning: 'No lie, for real, being completely honest. "Cap" means lying.',
		example: 'This pizza is amazing, no cap.',
		giphySearchTerm: 'no lie truth'
	},
	{
		id: 'slay',
		term: 'Slay',
		language: 'en',
		meaning: 'To do something exceptionally well, to kill it, to succeed impressively.',
		example: 'You absolutely slayed that presentation!',
		giphySearchTerm: 'slay queen'
	},
	{
		id: 'bussin',
		term: 'Bussin',
		language: 'en',
		meaning: 'Really good, usually referring to food but can apply to anything amazing.',
		example: 'This burger is bussin!',
		giphySearchTerm: 'delicious food'
	},
	{
		id: 'lowkey',
		term: 'Lowkey',
		language: 'en',
		meaning: 'Secretly, somewhat, or subtly. The opposite is "highkey" which means obviously.',
		example: 'I lowkey want to skip the party tonight.',
		giphySearchTerm: 'secret sneaky'
	},
	{
		id: 'bet',
		term: 'Bet',
		language: 'en',
		meaning: 'An affirmation meaning "okay", "sure", or "sounds good". Expression of agreement.',
		example: '"Wanna grab food later?" "Bet."',
		giphySearchTerm: 'deal agreement'
	},
	{
		id: 'salty',
		term: 'Salty',
		language: 'en',
		meaning: 'Being upset, bitter, or annoyed about something, often something minor.',
		example: "He's still salty about losing that game last week.",
		giphySearchTerm: 'angry upset'
	},
	{
		id: 'ghosting',
		term: 'Ghosting',
		language: 'en',
		meaning: 'Suddenly cutting off all communication with someone without explanation.',
		example: 'She ghosted him after their third date.',
		giphySearchTerm: 'ghost disappear'
	},
	{
		id: 'vibe-check',
		term: 'Vibe Check',
		language: 'en',
		meaning: 'Assessing the mood or energy of a person or situation.',
		example: 'Before we go in, quick vibe check - everyone feeling good?',
		giphySearchTerm: 'good vibes'
	},
	{
		id: 'sus',
		term: 'Sus',
		language: 'en',
		meaning: 'Short for suspicious or suspect. Something or someone that seems off or untrustworthy.',
		example: 'That excuse sounds kinda sus to me.',
		giphySearchTerm: 'suspicious among us'
	},
	{
		id: 'rizz',
		term: 'Rizz',
		language: 'en',
		meaning: 'Charisma or charm, especially in the context of attracting romantic interest.',
		example: 'He has so much rizz, everyone falls for him.',
		giphySearchTerm: 'charming flirt'
	},
	{
		id: 'simp',
		term: 'Simp',
		language: 'en',
		meaning: 'Someone who does way too much for a person they like, often without getting anything in return.',
		example: "He bought her flowers every day - he's such a simp.",
		giphySearchTerm: 'simp love desperate'
	},
	{
		id: 'fomo',
		term: 'FOMO',
		language: 'en',
		meaning: 'Fear Of Missing Out - anxiety that something exciting is happening elsewhere.',
		example: "I have major FOMO seeing everyone's vacation pics.",
		giphySearchTerm: 'missing out sad'
	},
	{
		id: 'yeet',
		term: 'Yeet',
		language: 'en',
		meaning: 'To throw something with force, or an exclamation of excitement.',
		example: 'He yeeted the ball across the field.',
		giphySearchTerm: 'yeet throw'
	},
	{
		id: 'goat',
		term: 'GOAT',
		language: 'en',
		meaning: 'Greatest Of All Time - the best ever in a particular field.',
		example: 'Michael Jordan is the GOAT of basketball.',
		giphySearchTerm: 'champion greatest'
	},

	// German slang
	{
		id: 'cringe',
		term: 'Cringe',
		language: 'de',
		meaning: 'Fremdschämen, peinlich berührt sein. Wenn etwas so unangenehm ist, dass man sich schämt.',
		example: 'Das Video von ihm ist so cringe.',
		giphySearchTerm: 'cringe awkward'
	},
	{
		id: 'isso',
		term: 'Isso',
		language: 'de',
		meaning: 'Kurzform von "ist so". Bedeutet Zustimmung oder Bestätigung einer Aussage.',
		example: '"Das Wetter ist heute echt mies." "Isso."',
		giphySearchTerm: 'agree nodding'
	},
	{
		id: 'digga',
		term: 'Digga / Digger',
		language: 'de',
		meaning: 'Freundschaftliche Anrede unter Kumpels, ähnlich wie "Alter" oder "Bro".',
		example: 'Ey Digga, was geht?',
		giphySearchTerm: 'friends bro'
	},
	{
		id: 'sheesh',
		term: 'Sheesh',
		language: 'de',
		meaning: 'Ausruf der Bewunderung oder des Erstaunens, wenn etwas beeindruckend ist.',
		example: 'Sheesh, deine neuen Sneaker sind krass!',
		giphySearchTerm: 'impressed wow'
	},
	{
		id: 'alter',
		term: 'Alter',
		language: 'de',
		meaning: 'Anrede für Freunde, Ausdruck von Überraschung oder Frustration.',
		example: 'Alter, das hast du echt gut gemacht!',
		giphySearchTerm: 'dude bro'
	},
	{
		id: 'ehrenmann',
		term: 'Ehrenmann / Ehrenfrau',
		language: 'de',
		meaning: 'Jemand der sich ehrenhaft verhält, ein guter Mensch, jemand der Respekt verdient.',
		example: 'Er hat mir sein Essen abgegeben - totaler Ehrenmann!',
		giphySearchTerm: 'respect honor'
	},
	{
		id: 'lost',
		term: 'Lost',
		language: 'de',
		meaning: 'Ahnungslos, verwirrt, oder ohne Plan. Jugendwort des Jahres 2020.',
		example: 'Ich bin so lost in Mathe, ich verstehe gar nichts.',
		giphySearchTerm: 'confused lost'
	},
	{
		id: 'fly',
		term: 'Fly sein',
		language: 'de',
		meaning: 'Cool sein, gut drauf sein, etwas Besonderes ausstrahlen.',
		example: 'Mit dem Outfit bist du mega fly!',
		giphySearchTerm: 'cool stylish'
	},
	{
		id: 'safe',
		term: 'Safe',
		language: 'de',
		meaning: 'Sicher, auf jeden Fall, definitiv. Bestätigung einer Aussage.',
		example: '"Kommst du morgen zur Party?" "Safe!"',
		giphySearchTerm: 'sure definitely'
	},
	{
		id: 'merkwuerdig',
		term: 'Merkwürdig / Komisch',
		language: 'de',
		meaning: 'Im Jugendslang: Seltsam oder verdächtig, ähnlich wie "sus".',
		example: 'Der Typ da drüben ist irgendwie merkwürdig.',
		giphySearchTerm: 'weird strange'
	},
	{
		id: 'krass',
		term: 'Krass',
		language: 'de',
		meaning: 'Extrem, heftig, unglaublich - kann positiv oder negativ sein.',
		example: 'Das Konzert war echt krass!',
		giphySearchTerm: 'extreme amazing'
	},
	{
		id: 'babo',
		term: 'Babo',
		language: 'de',
		meaning: 'Der Boss, Anführer, die wichtigste Person. Vom Kurdischen "Bav" (Vater).',
		example: 'Er ist der Babo in unserer Gruppe.',
		giphySearchTerm: 'boss leader'
	},
	{
		id: 'flexen',
		term: 'Flexen',
		language: 'de',
		meaning: 'Angeben, protzen, seinen Reichtum oder Erfolg zeigen.',
		example: 'Er flext ständig mit seinem neuen Auto.',
		giphySearchTerm: 'flex showing off'
	},
	{
		id: 'gönnung',
		term: 'Gönnung',
		language: 'de',
		meaning: 'Sich etwas gönnen, sich verwöhnen, etwas Gutes für sich selbst tun.',
		example: 'Heute Abend Netflix und Pizza - pure Gönnung!',
		giphySearchTerm: 'treat yourself'
	},
	{
		id: 'wyld',
		term: 'Wyld / Wild',
		language: 'de',
		meaning: 'Verrückt, übertrieben, unglaublich. Kann bewundernd oder kritisch gemeint sein.',
		example: 'Die Party gestern war wyld!',
		giphySearchTerm: 'wild crazy party'
	},
	{
		id: 'smash',
		term: 'Smash',
		language: 'de',
		meaning: 'Jugendwort des Jahres 2022. Bedeutet, dass man jemanden attraktiv findet.',
		example: 'Die Person ist definitiv ein Smash.',
		giphySearchTerm: 'attractive crush'
	},
	{
		id: 'glow-up',
		term: 'Glow Up',
		language: 'de',
		meaning: 'Eine positive Veränderung im Aussehen oder Selbstbewusstsein über Zeit.',
		example: 'Hast du ihren Glow Up gesehen? Krass!',
		giphySearchTerm: 'glow up transformation'
	},
	{
		id: 'slayyy',
		term: 'Slayyy',
		language: 'de',
		meaning: 'Jemandem gratulieren oder bewundern, wenn er/sie etwas richtig gut macht.',
		example: 'Dein Make-up heute - Slayyy!',
		giphySearchTerm: 'slay queen'
	},

	// Swiss German slang 2025
	{
		id: 'checkst-du',
		term: 'Checkst du',
		language: 'ch',
		meaning: 'Wird genutzt, um sicherzugehen, dass das Gegenüber wirklich versteht, worum es gerade geht. Diese neue Variante des "Verstehst du?" steht meist am Ende eines Satzes.',
		example: 'Das ist mega wichtig für morgen, checkst du?',
		giphySearchTerm: 'understand got it'
	},
	{
		id: 'das-crazy',
		term: 'Das crazy',
		language: 'ch',
		meaning: 'Allzweckwaffe der Sprachlosigkeit. Wird verwendet, wenn jemand nicht weiss, was er sagen soll, keine Lust hat zu antworten oder einfach nur höflich bleiben will. Vergleichbar mit "Aha, cool" oder "Okay".',
		example: '"Ich habe gestern 12 Stunden durchgezockt." "Das crazy."',
		giphySearchTerm: 'wow crazy'
	},
	{
		id: 'goonen',
		term: 'Goonen',
		language: 'ch',
		meaning: 'Ein Slangwort für Selbstbefriedigung.',
		example: 'Er war den ganzen Tag am Goonen.',
		giphySearchTerm: 'awkward embarrassed'
	},
	{
		id: 'lowkey-ch',
		term: 'Lowkey',
		language: 'ch',
		meaning: 'Bedeutet so viel wie "ein bisschen", "unauffällig" oder "unterschwellig". Wird benutzt, um etwas auszudrücken, ohne dabei zu dramatisch zu wirken – beispielsweise bei Gefühlen, Ansichten oder Geschmäckern.',
		example: 'Ich bin lowkey müde heute.',
		giphySearchTerm: 'subtle quiet'
	},
	{
		id: 'rede',
		term: 'Rede',
		language: 'ch',
		meaning: 'Meint "Lauter! Alle sollen es hören!" und wird genutzt, wenn jemand genau das ausspricht, was alle fühlen und denken. Diese Zustimmung mit Nachdruck ist besonders beliebt in Gesprächen.',
		example: '"Die Prüfung war viel zu schwer!" "Rede!"',
		giphySearchTerm: 'speak up loud'
	},
	{
		id: 'schere',
		term: 'Schere',
		language: 'ch',
		meaning: 'Ein Begriff aus der Gaming-Szene, der als digitaler Handschlag funktioniert und "Mein Fehler!" ausdrückt. Wer Mist baut und dazu steht, hebt metaphorisch die Schere.',
		example: 'Sorry, das war meine Schuld. Schere.',
		giphySearchTerm: 'my bad sorry'
	},
	{
		id: 'sybau',
		term: 'Sybau',
		language: 'ch',
		meaning: 'Steht für "Shut your bitch ass up" und wird gerne in Videos und Kommentarspalten geschrieben. Im Gegensatz zu "Halt die Fresse" kann es auch ironisch und mit Augenzwinkern rüberkommen.',
		example: 'Sybau, du weisst doch gar nichts davon!',
		giphySearchTerm: 'shut up shush'
	},
	{
		id: 'tot',
		term: 'Tot',
		language: 'ch',
		meaning: 'Beschreibt etwas oder eine Situation, die komplett daneben ist – lahm, peinlich oder unbeabsichtigt uncool.',
		example: 'Stehst mit Freundinnen auf ner Homeparty, Musik leise, alle sitzen am Handy. Tot.',
		giphySearchTerm: 'boring lame party'
	},
	{
		id: 'tuff',
		term: 'Tuff',
		language: 'ch',
		meaning: 'Ein Slangwort, das für "krass" oder "cool" steht. Eine positive Art zu sagen, wie beeindruckt man ist. Ob Aussehen, Skills oder Aktionen – "tuff" passt immer, wenn es richtig "ballert".',
		example: 'Dein neuer Style ist echt tuff!',
		giphySearchTerm: 'cool impressive'
	},
	{
		id: 'shotgun-de',
		term: 'Shotgun',
		language: 'ch',
		meaning: '"Shotgun" (Englisch für Schrotflinte) ist ein in der Jugendsprache verbreiteter Anglizismus, um den Beifahrersitz in einem Auto zu beanspruchen. Wer das Wort beim Gang zum Auto als Erster ruft, sichert sich den Platz neben dem Fahrer. Der Begriff stammt aus der Zeit des Wilden Westens, als der Begleiter neben dem Kutscher eine Flinte trug.',
		example: '"Shotgun!" rief Max, als sie zum Auto liefen.',
		giphySearchTerm: 'car front seat',
		trivia: '"Riding shotgun" was a phrase used to describe the guard who rides alongside a stagecoach driver, typically armed with a break-action shotgun, called a coach gun, to ward off bandits or hostile Native Americans. In modern use, it refers to the practice of sitting alongside the driver in a moving vehicle. The coining of this phrase dates to 1905 at the latest.'
	}
];

export function searchTrivia(query: string): TriviaEntry[] {
	if (!query.trim()) return [];
	
	const normalizedQuery = query.toLowerCase().trim();
	
	return triviaDatabase
		.filter(entry => 
			entry.term.toLowerCase().includes(normalizedQuery) ||
			entry.meaning.toLowerCase().includes(normalizedQuery)
		)
		.sort((a, b) => {
			const aStartsWith = a.term.toLowerCase().startsWith(normalizedQuery);
			const bStartsWith = b.term.toLowerCase().startsWith(normalizedQuery);
			if (aStartsWith && !bStartsWith) return -1;
			if (!aStartsWith && bStartsWith) return 1;
			return a.term.localeCompare(b.term);
		});
}

export function getTriviaById(id: string): TriviaEntry | undefined {
	return triviaDatabase.find(entry => entry.id === id);
}
