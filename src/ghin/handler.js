const cheerio = require('cheerio')
const axios = require('axios')
const R = require('ramda')
const responses = require('../../lib/responses')


module.exports.main = async (event, context, callback) => {
	const ghin = R.path(['pathParameters', 'ghin'], event)
	const slope = parseInt(R.path(['pathParameters', 'slope'], event))

	try {
		const html = await axios.get(`http://162.245.224.193/Widgets/HandicapLookupResults.aspx?ghinno=${ghin}`)
        const $ = cheerio.load(html.data)
        const name = $('#ctl00_bodyMP_lblName').first().text()
	    const index = parseFloat($('.ClubGridHandicapIndex').text())
	    const courseHandicap = Math.round(index * slope / 113)

	    callback(null, responses.success(JSON.stringify({
	    	name,
	    	ghin,
	    	index,
	    	courseHandicap
	    })))

	} catch (error) {
		callback(null, error)
	}
}